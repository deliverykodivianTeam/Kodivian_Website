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
<head>
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
</head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f2f8; padding: 20px; color: #1e293b;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #BFDBFE; box-shadow: 0 4px 20px rgba(106, 5, 127, 0.08);">
        <div style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); padding: 24px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; color: #ffffff;">📅 New Demo Booking Request</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #BFDBFE;">Kodivian Website Portal</p>
        </div>
        <div style="padding: 24px;">
          <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-size: 13.5px;">
            <tr style="background-color: #EFF6FF;"><td width="35%" style="font-weight: 600; color: #2563EB;">Full Name:</td><td style="font-weight: 700;">{name}</td></tr>
            <tr><td style="font-weight: 600; color: #2563EB;">Corporate Email:</td><td><a href="mailto:{email}" style="color: #2563EB;">{email}</a></td></tr>
            <tr style="background-color: #EFF6FF;"><td style="font-weight: 600; color: #2563EB;">Company Name:</td><td><strong>{company or 'Not Specified'}</strong></td></tr>
            <tr><td style="font-weight: 600; color: #2563EB;">Product Interest:</td><td><strong>{product or 'Scanify AI'}</strong></td></tr>
            <tr style="background-color: #EFF6FF;"><td style="font-weight: 600; color: #2563EB;">Preferred Date:</td><td>{date}</td></tr>
            <tr><td style="font-weight: 600; color: #2563EB;">Preferred Time:</td><td>{time} ({timezone})</td></tr>
          </table>
        </div>
      </div>
    </body>
    </html>
    """

    Thread(target=send_email, args=(internal_subject, internal_html, INTERNAL_EMAILS)).start()

    client_subject = "Thank you from Kodivian"
    client_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Thank you from Kodivian</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.65;">

  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">

        <!-- Main Card Container -->
        <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px;">

          <!-- ═══════ TOP BRAND HEADER ═══════ -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #1E3A8A; letter-spacing: -0.5px;">
                Thank you from Kodivian
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b; font-weight: 500;">
                Demo Request Confirmed
              </p>
            </td>
          </tr>

          <!-- ═══════ BODY CONTENT ═══════ -->
          <tr>
            <td style="padding: 20px 40px 40px 40px;">

              <p style="font-size: 16px; color: #1e293b; margin: 0 0 16px 0;">
                Dear <strong>{name}</strong>,
              </p>

              <p style="font-size: 15px; color: #334155; margin: 0 0 24px 0; line-height: 1.7;">
                Thank you for your interest in <strong>{product or 'Scanify AI'}</strong>. We have received your demonstration request for <strong>{company or 'your organization'}</strong>.
              </p>

              <p style="font-size: 15px; color: #334155; margin: 0 0 24px 0; line-height: 1.7;">
                Our solution architecture team will showcase a live product demonstration tailored to your exact requirements and workflows. Our team will follow up with you shortly regarding the next action and confirm the meeting schedule.
              </p>

              <p style="font-size: 15px; color: #334155; margin: 0 0 32px 0; line-height: 1.7;">
                <strong>📅 Requested Demo Schedule:</strong><br>
                Date: {date}<br>
                Time: {time} ({timezone})
              </p>

              <!-- ═══════ SIGNATURE BLOCK ═══════ -->
              <p style="font-size: 15px; color: #64748b; margin: 0 0 8px 0;">Warm regards,</p>
              <p style="font-size: 16px; font-weight: 700; color: #1E3A8A; margin: 0 0 2px 0;">Manoranjan KS</p>
              <p style="font-size: 14px; color: #2563EB; margin: 0 0 2px 0;">Business Analyst | Enterprise Solutions</p>
              <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin: 0 0 12px 0;">Kodivian Technologies LLP</p>
              
              <p style="font-size: 13.5px; color: #475569; margin: 0;">
                ✉️ Email: <a href="mailto:manoranjan.ks@kodivian.com" style="color: #2563EB; font-weight: 600; text-decoration: none;">manoranjan.ks@kodivian.com</a><br>
                🌐 Web: <a href="https://kodivian.com" style="color: #2563EB; font-weight: 600; text-decoration: none;">www.kodivian.com</a>
              </p>
            </td>
          </tr>

          <!-- ═══════ FOOTER ═══════ -->
          <tr>
            <td style="padding: 24px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
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
<head>
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
</head>
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
