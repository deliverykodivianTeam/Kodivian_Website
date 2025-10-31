from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import requests
from threading import Thread
import traceback

app = Flask(__name__)
CORS(app)

# =========================================================
# 🔐 Brevo API Key (add your key here)
# =========================================================
import os
BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_URL = "https://api.brevo.com/v3/smtp/email"
SENDER_EMAIL = "preethi.jb@kodivian.com"
SENDER_NAME = "Team Kodivian"


# =========================================================
# 🔹 Helper: Send Email via Brevo
# =========================================================
def send_email_brevo(to_email, subject, body):
    try:
        payload = {
            "sender": {"email": SENDER_EMAIL, "name": SENDER_NAME},
            "to": [{"email": to_email}],
            "subject": subject,
            "textContent": body
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": BREVO_API_KEY
        }
        response = requests.post(BREVO_URL, json=payload, headers=headers)
        print(f"📨 Email to {to_email}: {response.status_code}")
        print(response.text)
    except Exception as e:
        print(f"❌ Error sending email to {to_email}: {e}")
        traceback.print_exc()


# =========================================================
# 🔹 Home Route
# =========================================================
@app.route('/')
def home():
    return "✅ Flask backend is live and Brevo email setup is configured!"


# =========================================================
# 🔹 FAQ Query Endpoint
# =========================================================
@app.route('/api/send-query', methods=['POST'])
def send_query():
    data = request.get_json()
    email = data.get('email')
    query = data.get('query')

    if not email or not query:
        return jsonify({"error": "Missing email or query"}), 400

    try:
        subject = "New FAQ Query from Website"
        body = f"A user submitted a query:\n\nEmail: {email}\nQuery: {query}"

        Thread(target=send_email_brevo, args=('preethi.jb@kodivian.com', subject, body)).start()
        print("📨 FAQ query email sent via Brevo.")
        return jsonify({"message": "Query initiated successfully"}), 200
    except Exception as e:
        print("❌ Error:", e)
        traceback.print_exc()
        return jsonify({"error": "Failed to send email"}), 500


# =========================================================
# 🔹 Demo Booking Route
# =========================================================
@app.route('/save_demo_data', methods=['POST'])
def save_demo_data():
    try:
        demo_data = request.get_json()
        print("✅ Received demo data:", demo_data)

        # Save locally (for record)
        with open('demo_data.json', 'a') as f:
            f.write(json.dumps(demo_data) + '\n')

        user_email = demo_data.get('email')
        user_name = demo_data.get('name')

        # Internal notification
        internal_body = f"""
👤 Name: {user_name}
📧 Email: {user_email}
🏢 Company: {demo_data.get('company')}
🎯 Purpose: {demo_data.get('purpose')}
🛍️ Product: {demo_data.get('product')}
📅 Date: {demo_data.get('date')}
🕒 Time: {demo_data.get('time')} IST
🌐 Timezone: {demo_data.get('timezone')}
"""
        Thread(target=send_email_brevo, args=('preethi.jb@kodivian.com', '📅 New Demo Booking Received', internal_body)).start()

        # Thank-you message to user
        thank_you_body = f"""
Hi {user_name},

Thank you for booking a demo with Kodivian!
Our team will reach out to confirm your slot soon.

Best regards,  
Team Kodivian
"""
        Thread(target=send_email_brevo, args=(user_email, '✅ Thank You for Booking a Demo!', thank_you_body)).start()

        return jsonify({'message': '✅ Demo booking processed and emails sent successfully.'}), 200

    except Exception as e:
        print("❌ Error in save_demo_data:", str(e))
        traceback.print_exc()
        return jsonify({'error': f'❌ Failed to process demo booking: {str(e)}'}), 500


# =========================================================
# 🔹 Test Email Endpoint
# =========================================================
@app.route('/test_email')
def test_email():
    try:
        subject = "Test Email from Flask via Brevo"
        body = "✅ If you received this, your Brevo email setup works perfectly!"
        send_email_brevo("preethi.jb@kodivian.com", subject, body)
        return "✅ Test email sent successfully via Brevo!"
    except Exception as e:
        print("❌ Error:", e)
        traceback.print_exc()
        return f"❌ Error: {e}"


# =========================================================
# 🔹 Run Flask App
# =========================================================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    print(f"🚀 Starting Flask app on port {port}")
    app.run(host="0.0.0.0", port=port)
