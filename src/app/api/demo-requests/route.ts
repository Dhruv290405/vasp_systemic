import { NextRequest } from "next/server";
import { handleGetAll } from "@/lib/supabase/admin-api";
import { sendEmail } from "@/lib/email";
import { demoRequestEmail } from "@/lib/email-templates";

export async function GET() {
  return handleGetAll("demo_requests");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase.from("demo_requests").insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      job_title: body.jobTitle || null,
      solution: body.solution,
      message: body.message || null,
      status: "pending",
    }).select().single();

    if (error) throw error;

    sendEmail(demoRequestEmail(body));

    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to submit demo request" }, { status: 500 });
  }
}
