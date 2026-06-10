import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const log: string[] = [];

  log.push(`SMTP_EMAIL: ${process.env.SMTP_EMAIL ? "SET (" + process.env.SMTP_EMAIL + ")" : "NOT SET"}`);
  log.push(`SMTP_PASSWORD: ${process.env.SMTP_PASSWORD ? "SET (length: " + process.env.SMTP_PASSWORD.length + ")" : "NOT SET"}`);

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return NextResponse.json({ error: "Missing SMTP credentials", log });
  }

  // Test 1: service: "gmail" (current production config)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: "VASP Test Email - service gmail",
      html: "<p>Test from VASP Systemic using service: gmail</p>",
    });
    log.push("service:gmail - SUCCESS");
  } catch (err) {
    log.push(`service:gmail - FAILED: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Test 2: port 587 explicit
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: "VASP Test Email - port 587",
      html: "<p>Test from VASP Systemic using port 587</p>",
    });
    log.push("port:587 - SUCCESS");
  } catch (err) {
    log.push(`port:587 - FAILED: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Test 3: port 465 explicit
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: "VASP Test Email - port 465",
      html: "<p>Test from VASP Systemic using port 465</p>",
    });
    log.push("port:465 - SUCCESS");
  } catch (err) {
    log.push(`port:465 - FAILED: ${err instanceof Error ? err.message : String(err)}`);
  }

  return NextResponse.json({ log });
}
