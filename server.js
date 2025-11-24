/* Simple Express server to receive contact form submissions and send email via SMTP (Nodemailer)
   Usage:
     1. copy .env.example to .env and fill SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL
     2. npm install
     3. npm start
   The server exposes POST /send-email that accepts JSON: { name, email, subject, message }
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.TO_EMAIL) {
  console.warn('Warning: missing SMTP configuration in environment. See .env.example');
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!subject || !message) {
      return res.status(400).json({ ok: false, error: 'Subject and message are required' });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: subject,
      replyTo: email || undefined,
      text: `Name: ${name || 'n/a'}\nEmail: ${email || 'n/a'}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name || 'n/a'}</p><p><strong>Email:</strong> ${email || 'n/a'}</p><hr/><div>${(message || '').replace(/\n/g, '<br/>')}</div>`
    };

    const info = await transporter.sendMail(mailOptions);
    return res.json({ ok: true, info });
  } catch (err) {
    console.error('Error sending email', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email', details: err.message });
  }
});

app.get('/', (req, res) => res.json({ ok: true, msg: 'Email server running' }));

app.listen(PORT, () => {
  console.log(`Email server listening on port ${PORT}`);
});
