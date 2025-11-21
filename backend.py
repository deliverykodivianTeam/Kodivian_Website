from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

from uuid import uuid4

app = Flask(__name__)
CORS(app)

VISITOR_FILE = "visitors.json"
ADMIN_PASSWORD = "admin123"

ist = now_utc.astimezone(ZoneInfo("Asia/Kolkata"))



# ---------- GEO LOCATION ----------
def get_location(ip):
    try:
        TOKEN = "b797850c677468"   # 🔥 paste your token here

        res = requests.get(f"https://ipinfo.io/{ip}/json?token={TOKEN}", timeout=5).json()

        # "loc" returns "lat,lon"
        loc = res.get("loc", "0,0").split(",")

        return {
            "city": res.get("city") or "Unknown",
            "country": res.get("country") or "Unknown",
            "lat": loc[0],
            "lon": loc[1],
        }
    except:
        return {"city": "Unknown", "country": "Unknown", "lat": None, "lon": None}



# ---------- READ/WRITE JSON ----------
def load_visitors():
    try:
        with open(VISITOR_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def save_visitors(data):
    with open(VISITOR_FILE, "w") as f:
        json.dump(data, f, indent=2)
        
def get_ist_time():
    return datetime.now(ZoneInfo("Asia/Kolkata")).strftime("%Y-%m-%d %H:%M:%S")


# ---------- TRACK VISITOR ----------
@app.route("/track", methods=["POST"])
def track():
    data = request.get_json() or {}

    # Use frontend geo-data if available
    ip = data.get("ip", "0.0.0.0")
    city = data.get("city", "Unknown")
    region = data.get("region", "")
    country = data.get("country", "Unknown")
    lat = data.get("lat", None)
    lon = data.get("lon", None)
    timezone_str = data.get("timezone", "Asia/Kolkata")

    # Correct time
    now_utc = datetime.now(timezone.utc)
    local_time = now_utc.astimezone(ZoneInfo(timezone_str))

    visitor = {
        "id": str(uuid4()),
        "ip": ip,
        "city": city,
        "state": region,
        "country": country,
        "lat": lat,
        "lon": lon,
        "timestamp_utc": now_utc.strftime("%Y-%m-%d %H:%M:%S"),
        "timestamp_local": local_time.strftime("%Y-%m-%d %H:%M:%S"),
        "timezone": timezone_str
    }

    visitors = load_visitors()
    visitors.append(visitor)
    save_visitors(visitors)

    return jsonify({"status": "success", "visitor": visitor})


# ---------- PUBLIC GET ----------
@app.route("/visitors", methods=["GET"])
def get_visitors():
    visitors = load_visitors()
    visitors.sort(key=lambda x: x["timestamp_utc"], reverse=True)
    return jsonify(visitors)


# ---------- DELETE ----------
@app.route("/delete/<visitor_id>", methods=["DELETE"])
def delete_visitor(visitor_id):
    visitors = load_visitors()
    visitors = [v for v in visitors if v["id"] != visitor_id]
    save_visitors(visitors)
    return jsonify({"status": "deleted"})


# ---------- CLEAR ----------
@app.route("/clear", methods=["DELETE"])
def clear_all():
    save_visitors([])
    return jsonify({"status": "cleared"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
