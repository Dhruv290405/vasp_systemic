import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import net from "net";

export async function GET() {
  const log: string[] = [];

  log.push(`SMTP_EMAIL: ${process.env.SMTP_EMAIL || "NOT SET"}`);
  log.push(`SMTP_PASSWORD length: ${(process.env.SMTP_PASSWORD || "").length}`);
  log.push(`SMTP_PASSWORD stripped length: ${(process.env.SMTP_PASSWORD || "").replace(/\s/g, "").length}`);

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return NextResponse.json({ error: "Missing SMTP credentials", log });
  }

  // Test TCP connectivity to smtp.gmail.com
  for (const port of [465, 587]) {
    try {
      await new Promise<void>((resolve, reject) => {
        const socket = net.createConnection(port, "smtp.gmail.com", () => {
          socket.end();
          resolve();
        });
        socket.on("error", reject);
        socket.setTimeout(5000, () => {
          socket.destroy();
          reject(new Error("Connection timed out"));
        });
      });
      log.push(`TCP smtp.gmail.com:${port} - REACHABLE`);
    } catch (err) {
      log.push(`TCP smtp.gmail.com:${port} - BLOCKED: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Test with current production config (port 587, stripped password)
  try {
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
      to: process.env.SMTP_EMAIL,
      subject: "VASP SMTP Test - Production Config",
      html: "<p>Test email using current production SMTP config</p>",
    });
    log.push("PRODUCTION CONFIG (587, stripped password) - SUCCESS");
  } catch (err) {
    log.push(`PRODUCTION CONFIG (587, stripped password) - FAILED: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Test with original working config
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
      subject: "VASP SMTP Test - Original Config",
      html: "<p>Test email using original service:gmail config</p>",
    });
    log.push("ORIGINAL CONFIG (service:gmail) - SUCCESS");
  } catch (err) {
    log.push(`ORIGINAL CONFIG (service:gmail) - FAILED: ${err instanceof Error ? err.message : String(err)}`);
  }

  return NextResponse.json({ log });
}
