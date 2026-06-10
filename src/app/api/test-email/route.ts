import { NextResponse } from "next/server";

export async function GET() {
  const log: string[] = [];
  log.push(`SMTP_EMAIL: ${process.env.SMTP_EMAIL || "NOT SET"}`);
  log.push(`SMTP_PASSWORD length: ${(process.env.SMTP_PASSWORD || "").length}`);

  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 5000);
    const r = await fetch("https://jsonplaceholder.typicode.com/todos/1", { signal: ctrl.signal });
    const j = await r.json();
    log.push(`HTTP test OK: ${j.title}`);
  } catch (e) {
    log.push(`HTTP test FAILED: ${e instanceof Error ? e.message : String(e)}`);
  }

  return NextResponse.json({ log, note: "SMTP ports are likely blocked on Render free tier. Need to switch to HTTP-based email API (Resend/SendGrid)." });
}
