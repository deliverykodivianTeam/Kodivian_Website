from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
import json
from threading import Thread

app = Flask(__name__)
CORS(app)

# 📧 Zoho Mail Configuration (Testing Mode)
app.config.update(
    MAIL_SERVER='smtp.zoho.in',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='preethi.jb@kodivian.com',
    MAIL_PASSWORD='ajRMC3TdYZrs',  # <-- paste this app password exactly (no spaces)
    MAIL_DEFAULT_SENDER='preethi.jb@kodivian.com'
)


mail = Mail(app)

# 🔹 Helper: Send emails asynchronously
def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
            print(f"✅ Email sent successfully to: {msg.recipients}")
        except Exception as e:
            print(f"❌ Error sending email to {msg.recipients}: {e}")

@app.route('/')
def home():
    return "✅ Flask backend is live and email setup is configured!"

# 🔹 FAQ Query Endpoint
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
            recipients=['preethi.jb@kodivian.com'],  # 📨 send to you
            body=f"A user submitted a query:\n\nEmail: {email}\nQuery: {query}"
        )
        Thread(target=send_async_email, args=(app, msg)).start()
        print("📨 FAQ query email initiated.")
        return jsonify({"message": "Query initiated successfully"}), 200
    except Exception as e:
        print("Email send error:", str(e))
        return jsonify({"error": "Failed to send email"}), 500

# 🔹 Demo Booking Route
@app.route('/save_demo_data', methods=['POST'])
def save_demo_data():
    try:
        demo_data = request.get_json()
        print("✅ Received demo data:", demo_data)

        # Save locally
        with open('demo_data.json', 'a') as f:
            f.write(json.dumps(demo_data) + '\n')

        user_email = demo_data.get('email')
        user_name = demo_data.get('name')

        # 📤 Internal notification email
        msg_internal = Message(
            subject='📅 [TEST MODE] New Demo Booking Received',
            sender='preethi.jb@kodivian.com',
            recipients=['preethi.jb@kodivian.com'],  # send to yourself for test
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

        # 📩 Thank-you email (to you for now)
        thank_you_msg = Message(
            subject='[TEST MODE] Thank You for Booking a Demo!',
            sender='preethi.jb@kodivian.com',
            recipients=['preethi.jb@kodivian.com'],  # send to yourself in test
            body=f"""
Hi {user_name},

This is a test thank-you message confirming your booking request.
Once live, this will go to the actual user email.

Best regards,
Team Kodivian
"""
        )
        Thread(target=send_async_email, args=(app, thank_you_msg)).start()

        return jsonify({'message': '✅ Emails sent to preethi.jb@kodivian.com for testing'}), 200

    except Exception as e:
        print("❌ Error in save_demo_data:", str(e))
        return jsonify({'error': f'❌ Failed to process demo booking: {str(e)}'}), 500

# 🔹 Fetch saved demo data (debugging)
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

# 🔹 SMTP Test Endpoint
@app.route('/test_email')
def test_email():
    from flask_mail import Message
    from threading import Thread
    try:
        msg = Message(
            subject="Test Email from Flask (Zoho SMTP)",
            sender="preethi.jb@kodivian.com",
            recipients=["preethi.jb@kodivian.com"],  # send to yourself
            body="✅ If you see this email, your Zoho SMTP setup is working correctly!"
        )
        mail.send(msg)
        print("✅ Email sent successfully!")
        return "✅ Email sent successfully! Check your inbox."
    except Exception as e:
        print("❌ Error:", e)
        return f"❌ Error: {e}"


# 🔹 Run Flask App
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=port)
