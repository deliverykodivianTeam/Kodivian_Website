from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from threading import Thread
import os
from dotenv import load_dotenv

# ======================================
# 🔹 Flask App Initialization
# ======================================
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ======================================
# ✉️ Brevo (SendinBlue) API Configuration
# ======================================
load_dotenv()
BREVO_API_KEY = os.getenv("BREVO_API_KEY")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"

SENDER_EMAIL = "kaviya.arivaratharaj@kodivian.com"
SENDER_NAME = "Team Kodivian"

INTERNAL_EMAILS = [
    "vijaysabari.m@kodivian.com",
    "preethi.jb@kodivian.com",
    "kaviya.arivaratharaj@kodivian.com" 
]

<<<<<<< HEAD


=======
>>>>>>> d3a15afbd1d802fc1ccf4049503060adb05bc8ff
# ======================================
# 🔹 Helper Function to Send Email
# ======================================
def send_email(subject, html_content, to_emails):
    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }

    payload = {
        "sender": {"name": SENDER_NAME, "email": SENDER_EMAIL},
        "to": [{"email": email} for email in to_emails],
        "subject": subject,
        "htmlContent": html_content
    }

    try:
        response = requests.post(BREVO_URL, json=payload, headers=headers)
        print(f"📨 Email sent to {to_emails}: {response.status_code}")
        print(response.text)
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")

# ======================================
# 📅 Demo Booking Endpoint (UNCHANGED)
# ======================================
@app.route("/save_demo_data", methods=["POST"])
def save_demo_data():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    company = data.get("company")
    product = data.get("product")
    date = data.get("date")
    time = data.get("time")
    timezone = data.get("timezone")

    internal_subject = f"📅 New Demo Booking - {name}"
    internal_html = f"""
    <html><body>
        <h3>New Demo Booking</h3>
        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Company:</b> {company}</p>
        <p><b>Product:</b> {product}</p>
        <p><b>Date:</b> {date}</p>
        <p><b>Time:</b> {time} ({timezone})</p>
    </body></html>
    """

    Thread(target=send_email, args=(internal_subject, internal_html, INTERNAL_EMAILS)).start()

    client_subject = "Thank you for booking a demo with Kodivian"
    client_html = f"""
    <html><body>
        <p>Hi {name},</p>
        <p>Thank you for booking a demo.</p>
    </body></html>
    """

    Thread(target=send_email, args=(client_subject, client_html, [email])).start()

    return jsonify({"message": "Demo booking processed successfully"}), 200

# ======================================
# ❓ Website Query Endpoint (FIXED, NOT REMOVED)
# ======================================
@app.route("/send_query", methods=["POST"])
def send_query():
    data = request.get_json()
    print("Incoming Query Data:", data)

    name = data.get("name")
    phone = data.get("phone")
    user_email = data.get("email")
    query_text = data.get("query")
    page = data.get("page", "Website")

    if not query_text:
        return jsonify({"error": "Query is required"}), 400

    subject = f" Kodivian Website Query - {page}"

    html_content = f"""
    <html>
    <body style="font-family:Arial;">
        <h2>New Query Received</h2>
        <table border="1" cellpadding="8">
            <tr><td><b>Name</b></td><td>{name}</td></tr>
            <tr><td><b>Email</b></td><td>{user_email}</td></tr>
            <tr><td><b>Phone</b></td><td>{phone}</td></tr>
            <tr><td><b>Page</b></td><td>{page}</td></tr>
            <tr><td><b>Query</b></td><td>{query_text}</td></tr>
        </table>
        <p>📩 Sent from Kodivian Website (Scanify)</p>
    </body>
    </html>
    """

    Thread(
        target=send_email,
        args=(subject, html_content, INTERNAL_EMAILS)
    ).start()

    return jsonify({"message": "Query sent successfully"}), 200

# ======================================
# 🚀 Test Email Route (UNCHANGED)
# ======================================
@app.route("/test_email", methods=["GET"])
def test_email():
    test_subject = "Test Email from Flask via Brevo"
    test_html = "<h3>✅ Brevo Email setup is working!</h3>"
    send_email(test_subject, test_html, INTERNAL_EMAILS)
    return "Test email sent successfully"

# ======================================
# 🚀 Run Flask App
# ======================================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
