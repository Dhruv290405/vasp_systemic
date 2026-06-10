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

  let emailSent = false;
  let emailError = "";

  if (updates.status && data) {
    try {
      const { data: position } = await supabase.from("career_positions").select("title").eq("id", data.position_id).single();
      const positionTitle = position?.title || "a position at VASP Systemic";
      const emailPromise = sendEmail({
        to: data.email,
        ...statusUpdateEmail({ name: data.name, positionTitle, status: updates.status }),
      });
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Email sending timed out")), 15000));
      await Promise.race([emailPromise, timeout]);
      emailSent = true;
    } catch (err) {
      emailError = err instanceof Error ? err.message : "Unknown email error";
      console.error("Failed to send status update email:", emailError);
    }
  }

  return Response.json({ ...data, emailSent, emailError });
}
