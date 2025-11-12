from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

VISITOR_FILE = "visitors.json"
ADMIN_PASSWORD = "admin123"  # change this password


# 🌍 Get location by IP
def get_location(ip):
    try:
        res = requests.get(f"http://ip-api.com/json/{ip}").json()
        if res.get("status") == "success":
            return {
                "city": res.get("city", "Unknown"),
                "country": res.get("country", "Unknown"),
                "lat": res.get("lat"),
                "lon": res.get("lon"),
            }
        else:
            return {"city": "Unknown", "country": "Unknown", "lat": None, "lon": None}
    except Exception as e:
        print("Location error:", e)
        return {"city": "Unknown", "country": "Unknown", "lat": None, "lon": None}


# 🧾 Track new visitor
@app.route("/track", methods=["POST"])
def track():
    data = request.get_json()
    ip = data.get("ip")

    # fallback if local
    if not ip or ip.startswith("127.") or ip == "localhost":
        try:
            ip = requests.get("https://api.ipify.org").text
        except Exception:
            ip = "127.0.0.1"

    location = get_location(ip)
    visitor = {
        "ip": ip,
        "city": location["city"],
        "country": location["country"],
        "lat": location.get("lat"),
        "lon": location.get("lon"),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    try:
        with open(VISITOR_FILE, "r") as f:
            visitors = json.load(f)
    except FileNotFoundError:
        visitors = []

    visitors.append(visitor)
    with open(VISITOR_FILE, "w") as f:
        json.dump(visitors, f, indent=2)

    return jsonify({"status": "success", "visitor": visitor})


# 👁️ Public GET endpoint for map
@app.route("/visitors", methods=["GET"])
def get_visitors():
    try:
        with open(VISITOR_FILE, "r") as f:
            visitors = json.load(f)
    except FileNotFoundError:
        visitors = []
    return jsonify(visitors)


# 🔐 Admin endpoint
@app.route("/admin/visitors", methods=["POST"])
def admin_visitors():
    data = request.get_json()
    if data.get("password") != ADMIN_PASSWORD:
        return jsonify({"error": "Invalid password"}), 401
    try:
        with open(VISITOR_FILE, "r") as f:
            visitors = json.load(f)
    except FileNotFoundError:
        visitors = []
    visitors.sort(key=lambda x: x["timestamp"], reverse=True)
    return jsonify(visitors)


# 🗑 Delete a single visitor
@app.route("/delete/<timestamp>", methods=["DELETE"])
def delete_visitor(timestamp):
    try:
        with open(VISITOR_FILE, "r") as f:
            visitors = json.load(f)
    except FileNotFoundError:
        visitors = []

    new_visitors = [v for v in visitors if v["timestamp"] != timestamp]
    with open(VISITOR_FILE, "w") as f:
        json.dump(new_visitors, f, indent=2)
    return jsonify({"status": "deleted"})


# 🧹 Clear all visitors
@app.route("/clear", methods=["DELETE"])
def clear_visitors():
    with open(VISITOR_FILE, "w") as f:
        json.dump([], f)
    return jsonify({"status": "cleared"})


if __name__ == "__main__":
    app.run(debug=True)
