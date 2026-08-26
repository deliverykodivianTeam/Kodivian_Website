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
    "kaviya.arivaratharaj@kodivian.com",
    "manoranjan.ks@kodivian.com"
]


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

    internal_subject = f"📅 New Demo Booking - {name} ({company or 'Corporate'})"
    internal_html = f"""
    <!DOCTYPE html>
    <html>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f2f8; padding: 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e9d5ff; box-shadow: 0 4px 20px rgba(106, 5, 127, 0.08);">
        <div style="background: linear-gradient(135deg, #4A015E 0%, #6A057F 100%); padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; color: #ffffff;">📅 New Demo Booking Request</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #e9d5ff;">Kodivian Website Portal</p>
        </div>
        <div style="padding: 24px;">
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 13.5px;">
            <tr style="background-color: #FAF5FF;"><td width="35%" style="font-weight: 600; color: #6A057F;">Full Name:</td><td style="font-weight: 700;">{name}</td></tr>
            <tr><td style="font-weight: 600; color: #6A057F;">Corporate Email:</td><td><a href="mailto:{email}" style="color: #6A057F;">{email}</a></td></tr>
            <tr style="background-color: #FAF5FF;"><td style="font-weight: 600; color: #6A057F;">Company Name:</td><td><strong>{company or 'Not Specified'}</strong></td></tr>
            <tr><td style="font-weight: 600; color: #6A057F;">Product Interest:</td><td><strong>{product or 'Scanify AI'}</strong></td></tr>
            <tr style="background-color: #FAF5FF;"><td style="font-weight: 600; color: #6A057F;">Preferred Date:</td><td>{date}</td></tr>
            <tr><td style="font-weight: 600; color: #6A057F;">Preferred Time:</td><td>{time} ({timezone})</td></tr>
          </table>
        </div>
      </div>
    </body>
    </html>
    """

    Thread(target=send_email, args=(internal_subject, internal_html, INTERNAL_EMAILS)).start()

    client_subject = "✨ Thank You for Booking a Demo with Kodivian"
    client_html = f"""
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #f7f5fa; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.65;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f7f5fa; padding: 25px 15px;">
        <tr>
          <td align="center">
            <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 30px rgba(106, 5, 127, 0.08); border: 1px solid #e9d5ff;">
              <tr>
                <td style="background: linear-gradient(135deg, #6A057F 0%, #4A015E 100%); padding: 30px 32px; color: #ffffff;">
                  <div style="font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #e9d5ff; margin-bottom: 6px;">Kodivian Technologies</div>
                  <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Demo Request Confirmed</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 32px;">
                  <p style="font-size: 15px; color: #1e293b; margin: 0 0 14px 0;">Dear <strong>{name}</strong>,</p>
                  <p style="font-size: 14px; color: #334155; margin: 0 0 14px 0; line-height: 1.6;">
                    Thank you for your interest in <strong>{product or 'Scanify AI'}</strong>. We have received your demonstration request for <strong>{company or 'your organization'}</strong>.
                  </p>
                  <p style="font-size: 14px; color: #334155; margin: 0 0 20px 0; line-height: 1.6;">
                    Our solution architecture team will showcase a live product demonstration tailored to your exact requirements and workflows. Our team will follow up with you shortly regarding the next action and confirm the meeting schedule.
                  </p>

                  <div style="background-color: #FAF5FF; border: 1.5px solid #e9d5ff; border-radius: 10px; padding: 16px 18px; margin-bottom: 24px;">
                    <div style="font-size: 13.5px; font-weight: 700; color: #4A015E; margin-bottom: 8px;">Requested Demo Schedule:</div>
                    <div style="font-size: 13px; color: #475569;">📅 <strong>Date:</strong> {date}</div>
                    <div style="font-size: 13px; color: #475569;">⏰ <strong>Time:</strong> {time} ({timezone})</div>
                  </div>

                  <hr style="border: none; border-top: 1px solid #f1e4fa; margin: 24px 0 20px 0;">

                  <!-- Signature -->
                  <div style="font-size: 14px; color: #64748b; margin-bottom: 4px;">Warm regards,</div>
                  <div style="font-size: 16px; font-weight: 700; color: #4A015E;">Manoranjan KS</div>
                  <div style="font-size: 13px; font-weight: 600; color: #6A057F;">Business Analyst | Enterprise Solutions</div>
                  <div style="font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px;">Kodivian Technologies LLP</div>
                  <div style="font-size: 12.5px; color: #475569;">
                    ✉️ Email: <a href="mailto:manoranjan.ks@kodivian.com" style="color: #6A057F; font-weight: 600; text-decoration: none;">manoranjan.ks@kodivian.com</a><br>
                    🌐 Web: <a href="https://kodivian.com" style="color: #6A057F; font-weight: 600; text-decoration: none;">www.kodivian.com</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background-color: #FAF5FF; border-top: 1px solid #e9d5ff; padding: 16px; text-align: center; font-size: 11.5px; color: #7e22ce;">
                  © 2026 Kodivian Technologies LLP · All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
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
