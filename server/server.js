const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Zoho Mail SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: 'preethi.jb@kodivian.com', // Replace with your Zoho Mail address
        pass: 'ea99CHS6JNm7'      // Replace with your Zoho Mail password/app-specific password
    }
});

app.post('/api/send-demo-enquiry', async (req, res) => {
    const { name, email, company, purpose, product } = req.body;
    const mailOptions = {
        from: '${email}', // Replace with your Zoho Mail address
        to: 'preethi.jb@kodivian.com',   // Replace with the recipient email address (can be the same for now)
        subject: 'New Demo Enquiry',
        text: `
            Name: ${name}
            Email: ${email}
            Company: ${company}
            Purpose: ${purpose}
            Product: ${product}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending enquiry email:', error);
        res.sendStatus(500);
    }
});

app.post('/api/book-demo-email', async (req, res) => {
    const { name, email, company, purpose, product, selectedDate, selectedTime } = req.body;

    const mailOptions = {
        from: '${email}', // Replace with your Zoho Mail address
        to: 'preethi.jb@kodivian.com',   // Replace with the recipient email address (your Zoho Mail)
        subject: 'New Demo Booking',
        text: `
            Name: ${name}
            Email: ${email}
            Company: ${company}
            Purpose: ${purpose}
            Product: ${product}
            Selected Date (IST): ${selectedDate}
            Selected Time (IST): ${selectedTime}
        `
    };

    // In your Node.js server (for testing purposes)
transporter.sendMail({
    from: 'preethi.jb@kodivian.com',
    to: 'preethi.jb@kodivian.com',
    subject: 'Test Email',
    text: 'This is a test email from my Node.js server.'
}, (error, info) => {
    if (error) {
        console.error('Error sending test email:', error);
    } else {
        console.log('Test email sent:', info.response);
    }
});

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Successfully booked demo and sent confirmation email.' });
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        res.status(500).json({ error: 'Failed to book demo and send confirmation email.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});