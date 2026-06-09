import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to?: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || process.env.SMTP_PASSWORD === "your-gmail-app-password") {
    console.warn("SMTP not configured, skipping email send");
    return;
  }

  transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: to || "vaspsystemic@gmail.com",
    subject,
    html,
  }).catch((err) => console.error("Email send failed:", err.message));
}
