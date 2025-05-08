from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

# 📧 Zoho Mail Configuration
app.config.update(
    MAIL_SERVER='smtp.zoho.in',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME='preethi.jb@kodivian.com',
    MAIL_PASSWORD='ea99CHS6JNm7',
    MAIL_DEFAULT_SENDER='preethi.jb@kodivian.com'
)

mail = Mail(app)

# ✅ Route to save data and send email
@app.route('/save_demo_data', methods=['POST'])
def save_demo_data():
    try:
        demo_data = request.get_json()
        print("✅ Received demo data:", demo_data)

        # Save data locally
        with open('demo_data.json', 'a') as f:
            f.write(json.dumps(demo_data) + '\n')

        user_email = demo_data.get('email')
        user_name = demo_data.get('name')

        # 📤 Internal notification email to you
        msg = Message(
            subject='📅 New Demo Booking Received',
            sender='preethi.jb@kodivian.com',
            recipients=['preethi.jb@kodivian.com',  'kaviya.arivaratharaj@kodivian.com'],
            reply_to=user_email
        )
        msg.body = f"""
        👤 Name: {user_name}
        📧 Email: {user_email}
        🏢 Company: {demo_data.get('company')}
        🎯 Purpose: {demo_data.get('purpose')}
        🛍️ Product: {demo_data.get('product')}
        📅 Date: {demo_data.get('date')}
        🕒 Time: {demo_data.get('time')} IST
        🌐 Timezone: {demo_data.get('timezone')}
        """
        mail.send(msg)
        print("📨 Sent internal email")

        # ✅ Automatic reply email to user
        thank_you_msg = Message(
            subject='Thank You for Booking a Demo!',
            sender='preethi.jb@kodivian.com',
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
        mail.send(thank_you_msg)
        print("📨 Sent thank-you email to user")

        return jsonify({'message': '✅ Data saved, email sent, and reply sent!'}), 200

    except Exception as e:
        print("❌ Error in save_demo_data:", str(e))
        return jsonify({'error': f'❌ Failed to send/save: {str(e)}'}), 500

# ✅ Route to view saved data
@app.route('/get_demo_data', methods=['GET'])
def get_demo_data():
    data = []
    if os.path.exists('demo_data.json'):
        with open('demo_data.json', 'r') as f:
            for line in f:
                try:
                    data.append(json.loads(line.strip()))
                except:
                    pass
    return jsonify(data), 200

# ✅ Test Zoho SMTP
@app.route('/test_email')
def test_email():
    try:
        msg = Message(
            subject='📨 Test Email',
            sender='preethi.jb@kodivian.com',
            recipients=['preethi.jb@kodivian.com'],
            body='✅ This is a test email from Flask using Zoho SMTP.'
        )
        mail.send(msg)
        return '✅ Test email sent!'
    except Exception as e:
        return f'❌ Email send failed: {str(e)}', 500

# ✅ Run the server
if __name__ == '__main__':
    app.run(debug=True, port=3001)