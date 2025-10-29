from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
import json
from threading import Thread

app = Flask(__name__)
CORS(app)

# 📧 Zoho Mail Configuration
# IMPORTANT: For production, use environment variables for MAIL_PASSWORD
# e.g., os.environ.get('MAIL_PASSWORD')
app.config.update(
    MAIL_SERVER='smtp.zoho.in',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='preethi.jb@kodivian.com', # Ensure this sender is correctly configured in Zoho
    MAIL_PASSWORD='ea99CHS6JNm7', # !!! REPLACE WITH ENV VAR IN PROD !!!
    MAIL_DEFAULT_SENDER='vijaysabari.m@kodivian.com'
)

mail = Mail(app)

# Helper function to send emails asynchronously
def send_async_email(app, msg):
    with app.app_context(): # Essential for Flask-Mail to work in a separate thread
        try:
            mail.send(msg)
            print(f"✅ Email sent successfully to: {msg.recipients}")
        except Exception as e:
            print(f"❌ Error sending email to {msg.recipients}: {e}")

@app.route('/')
def home():
    return "Flask backend is live on Render! 🚀"

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
            recipients=['vijaysabari.m@kodivian.com'],  # Or another receiver if needed
            body=f"A user submitted a query:\n\nEmail: {email}\nQuery: {query}"
        )
        # Send query email asynchronously
        Thread(target=send_async_email, args=(app, msg)).start()
        print("📨 Initiated FAQ query email send (async)")
        return jsonify({"message": "Query initiated successfully"}), 200

    except Exception as e:
        print("Email send error:", str(e))
        return jsonify({"error": "Failed to initiate email send"}), 500

# ✅ Route to save data and send email
@app.route('/save_demo_data', methods=['POST'])
def save_demo_data():
    try:
        demo_data = request.get_json()
        print("✅ Received demo data:", demo_data)

        # Save data locally
        # Consider a more robust storage solution for production, e.g., a database
        with open('demo_data.json', 'a') as f:
            f.write(json.dumps(demo_data) + '\n')

        user_email = demo_data.get('email')
        user_name = demo_data.get('name')

        # 📤 Internal notification email to you
        msg_internal = Message(
            subject='📅 New Demo Booking Received',
            sender='kaviya.arivaratharaj@kodivian.com',
            recipients=['vijaysabari.m@kodivian.com', 'kaviya.arivaratharaj@kodivian.com'],
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
        # Send internal email asynchronously
        Thread(target=send_async_email, args=(app, msg_internal)).start()
        print("📨 Initiated internal email send (async)")

        # ✅ Automatic reply email to user
        thank_you_msg = Message(
            subject='Thank You for Booking a Demo!',
            sender='kaviya.arivaratharaj@kodivian.com',
            recipients=[user_email]
        )
        thank_you_msg.body = f"""
Hi {user_name},

Thank you for booking a demo with Kodivian! 🎉

We’ve received your request and will get in touch with you soon regarding the demo schedule.

If you have any immediate questions, feel free to reply to this email.

Best regards,
Team Kodivian
📧 vijaysabari.m@kodivian.com
"""
        # Send thank-you email asynchronously
        Thread(target=send_async_email, args=(app, thank_you_msg)).start()
        print("📨 Initiated thank-you email send to user (async)")

        # Immediately return a success response to the frontend
        return jsonify({'message': '✅ Data saved and emails initiated!'}), 200

    except Exception as e:
        print("❌ Error in save_demo_data:", str(e))
        return jsonify({'error': f'❌ Failed to process demo booking: {str(e)}'}), 500

# ✅ Route to view saved data (for debugging/monitoring)
@app.route('/get_demo_data', methods=['GET'])
def get_demo_data():
    data = []
    if os.path.exists('demo_data.json'):
        with open('demo_data.json', 'r') as f:
            for line in f:
                try:
                    data.append(json.loads(line.strip()))
                except json.JSONDecodeError:
                    print(f"Skipping malformed JSON line in demo_data.json: {line.strip()}")
                    pass # Skip malformed lines
    return jsonify(data), 200

# ✅ Test Zoho SMTP
@app.route('/test_email')
def test_email():
    try:
        msg = Message(
            subject='📨 Test Email from Render',
            sender='kaviya.arivaratharaj@kodivian.com', # Use an email configured to send from Zoho
            recipients=['vijaysabari.m@kodivian.com'], # Your recipient for testing
            body='✅ This is a test email from Flask on Render using Zoho SMTP. If you received this, email sending is configured!'
        )
        # Send test email asynchronously as well, for consistency
        Thread(target=send_async_email, args=(app, msg)).start()
        return '✅ Test email initiated! Check your inbox in a moment.'
    except Exception as e:
        return f'❌ Email test initiation failed: {str(e)}', 500

# ✅ Run the server
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3001))
    # In a production setup like Render, Gunicorn or Waitress is typically used
    # to serve the Flask app, not app.run() directly.
    # However, for simple testing or development, this is fine.
    app.run(host="0.0.0.0", port=port)