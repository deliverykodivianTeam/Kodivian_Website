from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from threading import Thread
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# ======================================
# ✉️ Brevo (SendinBlue) API Configuration
# ======================================
load_dotenv()  # loads variables from .env
BREVO_API_KEY = os.getenv("BREVO_API_KEY")

BREVO_URL = "https://api.brevo.com/v3/smtp/email"

# Sender details (who sends the mail)
SENDER_EMAIL = "kaviya.arivaratharaj@kodivian.com"
SENDER_NAME = "Team Kodivian"

# Internal recipients (team)
INTERNAL_EMAILS = [
    "vijaysabari.m@kodivian.com",
    "preethi.jb@kodivian.com",
    "kaviya.arivaratharaj@kodivian.com"
]

# ======================================
# 🔹 Root Route (for Render health check)
# ======================================
@app.route('/')
def home():
    return "✅ Kodivian Flask App is running successfully!"

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
        print(f"❌ Error sending email to {to_emails}: {str(e)}")


# ======================================
# 📅 Demo Booking Endpoint
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

    # ------------------------------
    # 📨 Internal Team Email
    # ------------------------------
    internal_subject = f"📅 New Demo Booking Received - {name}"
    internal_html = f"""
    <html>
    <body style="font-family:Arial,sans-serif;">
        <h2>New Demo Booking Details</h2>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
            <tr><td><b>Name</b></td><td>{name}</td></tr>
            <tr><td><b>Email</b></td><td>{email}</td></tr>
            <tr><td><b>Company</b></td><td>{company}</td></tr>
            <tr><td><b>Product</b></td><td>{product}</td></tr>
            <tr><td><b>Date</b></td><td>{date}</td></tr>
            <tr><td><b>Time</b></td><td>{time} ({timezone})</td></tr>
        </table>
        <p style="margin-top:15px;">📩 This notification was automatically sent from Kodivian website.</p>
    </body>
    </html>
    """

    Thread(target=send_email, args=(internal_subject, internal_html, INTERNAL_EMAILS)).start()

    # ------------------------------
    # 📨 Client Thank You Email
    # ------------------------------
    client_subject = "✅ Thank You for Booking a Demo with Kodivian!"
    client_html = f"""
    <html>
    <body style="font-family:Arial,sans-serif;">
        <h2>Hi {name},</h2>
        <p>Thank you for booking a demo with <b>Kodivian</b>!</p>
        <p>Here are your demo details:</p>
        <ul>
            <li><b>Product:</b> {product}</li>
            <li><b>Date:</b> {date}</li>
            <li><b>Time:</b> {time} ({timezone})</li>
        </ul>
        <p>Our team will contact you soon to confirm your slot.</p>
        <p>Warm regards,<br><b>Team Kodivian</b></p>
    </body>
    </html>
    """

    Thread(target=send_email, args=(client_subject, client_html, [email])).start()

    return jsonify({"message": "✅ Demo booking processed and emails sent successfully."})


# ======================================
# 🚀 Test Email Route
# ======================================
@app.route("/test_email", methods=["GET"])
def test_email():
    test_subject = "Test Email from Flask via Brevo"
    test_html = "<h3>✅ Brevo Email setup is working successfully!</h3>"
    send_email(test_subject, test_html, INTERNAL_EMAILS)
    return "✅ Test email sent successfully to internal team!"


# ======================================
# 🟢 Run Flask App (Render-compatible)
# ======================================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
