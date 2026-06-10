export async function sendEmail({
  to,
  subject,
  html,
}: {
  to?: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = to || "vaspsystemic@gmail.com";

  if (apiKey && apiKey !== "your-resend-api-key") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VASP Systemic <onboarding@resend.dev>",
        to: [recipient],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Resend API error (${res.status}): ${err}`);
    }
    return;
  }

  throw new Error("Email not configured. Set RESEND_API_KEY in environment variables.");
}
