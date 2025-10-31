from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
import json
from threading import Thread
import traceback

app = Flask(__name__)
CORS(app)

# =========================================================
# 📧 Zoho Mail Configuration (App Password Required)
# =========================================================
app.config.update(
    MAIL_SERVER='smtp.zoho.in',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='preethi.jb@kodivian.com',
    MAIL_PASSWORD='uaNk95x9H2Z8',  # ✅ Your Zoho App Password
    MAIL_DEFAULT_SENDER='preethi.jb@kodivian.com'
)

mail = Mail(app)


# =========================================================
# 🔹 Helper: Send emails asynchronously
# =========================================================
def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
            print(f"✅ Email sent successfully to: {msg.recipients}")
        except Exception as e:
            print(f"❌ Error sending email to {msg.recipients}: {e}")
            traceback.print_exc()


# =========================================================
# 🔹 Home Route
# =========================================================
@app.route('/')
def home():
    return "✅ Flask backend is live and email setup is configured!"


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
        msg = Message(
            subject="New FAQ Query from Website",
            recipients=['preethi.jb@kodivian.com'],
            body=f"A user submitted a query:\n\nEmail: {email}\nQuery: {query}"
        )
        Thread(target=send_async_email, args=(app, msg)).start()
        print("📨 FAQ query email initiated.")
        return jsonify({"message": "Query initiated successfully"}), 200
    except Exception as e:
        print("❌ Error sending FAQ email:", e)
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

        # Save locally (simple log)
        with open('demo_data.json', 'a') as f:
            f.write(json.dumps(demo_data) + '\n')

        user_email = demo_data.get('email')
        user_name = demo_data.get('name')

        # --- Internal Notification (to you) ---
        msg_internal = Message(
            subject='📅 New Demo Booking Received',
            sender='preethi.jb@kodivian.com',
            recipients=['preethi.jb@kodivian.com'],
            reply_to=user_email
        )
        msg_internal.body = f"""
👤 Name: {user_name}
📧 Email: {user_email}
🏢 Company: {demo_data.get('company')}
🎯 Purpose: {demo_data.get('purpose')}
🛍️ Product: {demo_data.get('product')}
📅 Date: {demo_data.get('date')}
🕒 Time: {demo_data.get('time')} IST
🌐 Timezone: {demo_data.get('timezone')}
"""
        Thread(target=send_async_email, args=(app, msg_internal)).start()

        # --- Thank You Email (to User) ---
        thank_you_msg = Message(
            subject='✅ Thank You for Booking a Demo!',
            sender='preethi.jb@kodivian.com',
            recipients=[user_email],
            body=f"""
Hi {user_name},

Thank you for booking a demo with Kodivian! 
Our team will reach out to confirm your slot soon.

Best regards,  
Team Kodivian
"""
        )
        Thread(target=send_async_email, args=(app, thank_you_msg)).start()

        return jsonify({'message': '✅ Demo booking processed and emails sent successfully.'}), 200

    except Exception as e:
        print("❌ Error in save_demo_data:", str(e))
        traceback.print_exc()
        return jsonify({'error': f'❌ Failed to process demo booking: {str(e)}'}), 500


# =========================================================
# 🔹 Fetch saved demo data (for debugging)
# =========================================================
@app.route('/get_demo_data', methods=['GET'])
def get_demo_data():
    data = []
    if os.path.exists('demo_data.json'):
        with open('demo_data.json', 'r') as f:
            for line in f:
                try:
                    data.append(json.loads(line.strip()))
                except json.JSONDecodeError:
                    continue
    return jsonify(data), 200


# =========================================================
# 🔹 SMTP Test Endpoint
# =========================================================
@app.route('/test_email')
def test_email():
    try:
        msg = Message(
            subject="Test Email from Flask (Zoho SMTP)",
            sender="preethi.jb@kodivian.com",
            recipients=["preethi.jb@kodivian.com"],
            body="✅ If you see this email, your Zoho SMTP setup is working correctly!"
        )
        mail.send(msg)
        print("✅ Email sent successfully!")
        return "✅ Email sent successfully! Check your inbox."
    except Exception as e:
        print("❌ Error:", e)
        traceback.print_exc()
        return f"❌ Error: {e}"


# =========================================================
# 🔹 Run Flask App
# =========================================================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # Render auto-detects this port
    print(f"🚀 Starting Flask app on port {port}")
    app.run(host="0.0.0.0", port=port)
