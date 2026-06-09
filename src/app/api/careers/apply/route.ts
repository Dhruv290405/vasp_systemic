import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { careerEmail } from "@/lib/email-templates";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
      const errText = await res.text();
      console.error("Supabase error:", errText);
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    await sendEmail(careerEmail({
      ...body,
      position: body.positionId,
      resumeUrl: body.resumeUrl,
    }));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
