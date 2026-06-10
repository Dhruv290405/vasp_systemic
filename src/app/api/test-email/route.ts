import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const results: string[] = [];

  if (!process.env.SMTP_EMAIL) results.push("SMTP_EMAIL not set");
  if (!process.env.SMTP_PASSWORD) results.push("SMTP_PASSWORD not set");

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return NextResponse.json({ error: results.join(", ") }, { status: 500 });
  }

  const passStripped = (process.env.SMTP_PASSWORD || "").replace(/\s/g, "");
  results.push(`SMTP_EMAIL: ${process.env.SMTP_EMAIL}`);
  results.push(`Password length raw: ${process.env.SMTP_PASSWORD.length}, stripped: ${passStripped.length}`);

  for (const { port, secure } of [{ port: 465, secure: true }, { port: 587, secure: false }]) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port,
        secure,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: passStripped,
        },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
      });
      await transporter.verify();
      results.push(`Port ${port}: VERIFY SUCCESS`);
    } catch (err) {
      results.push(`Port ${port}: FAILED - ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return NextResponse.json({ results });
}
