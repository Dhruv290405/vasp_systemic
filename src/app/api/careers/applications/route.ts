import { NextRequest } from "next/server";
import { handleGetAll } from "@/lib/supabase/admin-api";
import { sendEmail } from "@/lib/email";
import { statusUpdateEmail } from "@/lib/email-templates";

export async function GET() {
  return handleGetAll("career_applications");
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;
  const supabase = (await import("@/lib/supabase/admin-api")).getAdminClient();
  const { data, error } = await supabase.from("career_applications").update(updates).eq("id", id).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });

  if (updates.status && data) {
    const { data: position } = await supabase.from("career_positions").select("title").eq("id", data.position_id).single();
    const positionTitle = position?.title || "a position at VASP Systemic";
    await sendEmail({
      to: data.email,
      ...statusUpdateEmail({ name: data.name, positionTitle, status: updates.status }),
    });
  }

  return Response.json(data);
}
