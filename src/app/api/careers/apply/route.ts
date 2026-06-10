import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { careerEmail } from "@/lib/email-templates";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const checkRes = await fetch(
      `${supabaseUrl}/rest/v1/career_applications?email=eq.${encodeURIComponent(body.email)}&position_id=eq.${encodeURIComponent(body.positionId)}&select=id`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (checkRes.ok) {
      const existing = await checkRes.json();
      if (Array.isArray(existing) && existing.length > 0) {
        return NextResponse.json({ error: "You have already applied for this position." }, { status: 409 });
      }
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/career_applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        position_id: body.positionId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        resume_url: body.resumeUrl || "",
        cover_letter: body.coverLetter || null,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    let emailSent = false;
    let emailError = "";
    try {
      await sendEmail(careerEmail({
        ...body,
        position: body.positionId,
        resumeUrl: body.resumeUrl,
      }));
      emailSent = true;
    } catch (err) {
      emailError = err instanceof Error ? err.message : "Unknown email error";
      console.error("Failed to send admin notification:", emailError);
    }

    return NextResponse.json({ success: true, emailSent, emailError });
  } catch (err) {
    console.error("Application submit error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
