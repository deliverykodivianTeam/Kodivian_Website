# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime, timezone
from zoneinfo import ZoneInfo
from uuid import uuid4
import os

app = Flask(__name__)
CORS(app)

VISITOR_FILE = "visitors.json"
# optional: set IPINFO token as env var, fallback to None
IPINFO_TOKEN = os.environ.get("IPINFO_TOKEN")  # set to your token if you have one


def load_visitors():
    try:
        with open(VISITOR_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def save_visitors(data):
    with open(VISITOR_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def now_utc_str():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def get_ist_time_str(dt=None):
    dt = dt or datetime.now(timezone.utc)
    return dt.astimezone(ZoneInfo("Asia/Kolkata")).strftime("%Y-%m-%d %H:%M:%S")


def get_location(ip):
    """
    Try ipinfo.io first (if token provided), fallback to ipapi.co,
    otherwise return unknowns.
    """
    try:
        if IPINFO_TOKEN:
            url = f"https://ipinfo.io/{ip}/json?token={IPINFO_TOKEN}"
            res = requests.get(url, timeout=4).json()
            loc = res.get("loc", "0,0").split(",")
            return {
                "city": res.get("city") or "Unknown",
                "region": res.get("region") or "",
                "country": res.get("country") or "Unknown",
                "lat": float(loc[0]) if loc and loc[0] else None,
                "lon": float(loc[1]) if loc and loc[1] else None,
                "timezone": res.get("timezone") or "UTC",
            }
        else:
            # fallback to ipapi.co
            url = f"https://ipapi.co/{ip}/json/"
            res = requests.get(url, timeout=4).json()
            return {
                "city": res.get("city") or "Unknown",
                "region": res.get("region") or "",
                "country": res.get("country_name") or "Unknown",
                "lat": float(res.get("latitude")) if res.get("latitude") else None,
                "lon": float(res.get("longitude")) if res.get("longitude") else None,
                "timezone": res.get("timezone") or "UTC",
            }
    except Exception:
        return {"city": "Unknown", "region": "", "country": "Unknown", "lat": None, "lon": None, "timezone": "UTC"}


@app.route("/track", methods=["POST"])
def track():
    """
    Expects optional client-sent fields:
    ip, city, region, country, lat, lon, timezone
    If lat/lon absent, try to resolve from IP on server-side.
    """
    data = (request.get_json() or {})
    ip = data.get("ip") or request.remote_addr or "0.0.0.0"

    # Accept client-provided lat/lon if present (prefer user-allowed browser geolocation)
    lat = data.get("lat")
    lon = data.get("lon")
    client_city = data.get("city")
    client_region = data.get("region")
    client_country = data.get("country")
    timezone_str = data.get("timezone") or "UTC"

    if lat is None or lon is None:
        geo = get_location(ip)
        lat = geo.get("lat")
        lon = geo.get("lon")
        city = client_city or geo.get("city")
        region = client_region or geo.get("region")
        country = client_country or geo.get("country")
        timezone_str = timezone_str or geo.get("timezone", "UTC")
    else:
        # ensure numeric
        try:
            lat = float(lat)
            lon = float(lon)
        except Exception:
            lat = None
            lon = None
        city = client_city or "Unknown"
        region = client_region or ""
        country = client_country or "Unknown"

    now_utc = datetime.now(timezone.utc)
    local_time = now_utc.astimezone(ZoneInfo(timezone_str)) if timezone_str else now_utc

    visitor = {
        "id": str(uuid4()),
        "ip": ip,
        "city": city or "Unknown",
        "state": region or "",
        "country": country or "Unknown",
        "lat": lat,
        "lon": lon,
        "timestamp_utc": now_utc.strftime("%Y-%m-%d %H:%M:%S"),
        "timestamp_local": local_time.strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": timezone_str
    }

    visitors = load_visitors()
    visitors.append(visitor)
    # keep only last 5000 visitors to avoid huge file (optional)
    if len(visitors) > 5000:
        visitors = visitors[-5000:]
    save_visitors(visitors)

    return jsonify({"status": "success", "visitor": visitor})


@app.route("/visitors", methods=["GET"])
def get_visitors():
    visitors = load_visitors()
    # sort descending by UTC timestamp string (ISO-like format) - newer first
    visitors.sort(key=lambda x: x.get("timestamp_utc", ""), reverse=True)
    return jsonify(visitors)


@app.route("/delete/<visitor_id>", methods=["DELETE"])
def delete_visitor(visitor_id):
    visitors = load_visitors()
    new_visitors = [v for v in visitors if v.get("id") != visitor_id]
    save_visitors(new_visitors)
    return jsonify({"status": "deleted"})


@app.route("/clear", methods=["DELETE"])
def clear_all():
    save_visitors([])
    return jsonify({"status": "cleared"})


if __name__ == "__main__":
    # when deployed make sure port and host are set by platform
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
