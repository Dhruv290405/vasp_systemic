import nodemailer from "nodemailer";

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
    throw new Error("SMTP not configured");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: (process.env.SMTP_PASSWORD || "").replace(/\s/g, ""),
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: to || "vaspsystemic@gmail.com",
    subject,
    html,
  });
}
