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
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error("SMTP credentials not configured");
  }

  if (process.env.SMTP_PASSWORD === "your-gmail-app-password") {
    throw new Error("SMTP password is still set to placeholder value");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.verify();

  await transporter.sendMail({
    from: `"VASP Systemic" <${process.env.SMTP_EMAIL}>`,
    to: to || "vaspsystemic@gmail.com",
    subject,
    html,
  });
}
