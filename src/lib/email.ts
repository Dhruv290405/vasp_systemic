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

  const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: (process.env.SMTP_PASSWORD || "").replace(/\s/g, ""),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };

  const recipient = to || "vaspsystemic@gmail.com";

  const transporter = nodemailer.createTransport(config);

  await transporter.verify();

  await transporter.sendMail({
    from: `"VASP Systemic" <${process.env.SMTP_EMAIL}>`,
    to: recipient,
    subject,
    html,
  });
}
