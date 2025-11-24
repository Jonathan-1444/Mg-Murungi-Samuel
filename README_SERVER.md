Email server for contact form

This repository contains a small Node.js Express server that accepts contact form submissions and sends them via SMTP using Nodemailer.

Setup
1. Copy `.env.example` to `.env` and fill your SMTP settings and recipient email.
2. Install dependencies:

   npm install

3. Start the server:

   npm start

By default the server listens on port 3000. Ensure your static site is served from the same origin or proxy requests so the front-end can POST to `/send-email`.

Security
- Keep SMTP credentials private. Do not commit `.env` to source control.
- For production, deploy to a secure environment (Heroku, Render, DigitalOcean App Platform, VPS) and set environment variables there.

Notes
- This server is intentionally minimal. Use transactional email services (SendGrid, Mailgun, Amazon SES) for higher volume and better deliverability.
