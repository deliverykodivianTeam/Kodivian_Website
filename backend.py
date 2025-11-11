from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

VISITOR_FILE = "visitors.json"

def get_location(ip):
    try:
        res = requests.get(f"http://ip-api.com/json/{ip}").json()
        if res.get("status") == "success":
            return {
                "city": res.get("city", "Unknown"),
                "country": res.get("country", "Unknown")
            }
        else:
            return {"city": "Unknown", "country": "Unknown"}
    except Exception as e:
        print("Error getting location:", e)
        return {"city": "Unknown", "country": "Unknown"}

@app.route("/track", methods=["POST"])
def track():
    data = request.get_json()
    ip = data.get("ip")

    # If running locally, get public IP
    if not ip or ip.startswith("127.") or ip == "localhost":
        try:
            ip = requests.get("https://api.ipify.org").text
        except Exception as e:
            print("Error fetching public IP:", e)
            ip = "127.0.0.1"

    location = get_location(ip)
    visitor = {
        "ip": ip,
        "city": location["city"],
        "country": location["country"],
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
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

@app.route("/visitors", methods=["GET"])
def get_visitors():
    try:
        with open(VISITOR_FILE, "r") as f:
            visitors = json.load(f)
    except FileNotFoundError:
        visitors = []
    return jsonify(visitors)

@app.route("/clear", methods=["DELETE"])
def clear_visitors():
    with open(VISITOR_FILE, "w") as f:
        json.dump([], f)
    return jsonify({"status": "cleared"})

if __name__ == "__main__":
    app.run(debug=True)
