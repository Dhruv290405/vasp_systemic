import { NextRequest } from "next/server";
import { handleGetAll } from "@/lib/supabase/admin-api";
import { sendEmail } from "@/lib/email";
import { contactEmail } from "@/lib/email-templates";

export async function GET() {
  return handleGetAll("contacts");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase.from("contacts").insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      company: body.company || null,
      type: body.type || "general",
      message: body.message,
    }).select().single();

    if (error) throw error;

    sendEmail(contactEmail(body));

    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to submit contact" }, { status: 500 });
  }
}
