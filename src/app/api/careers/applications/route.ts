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

  console.log("=== STATUS UPDATE START ===");
  console.log("APPLICATION ID:", id);
  console.log("NEW STATUS:", updates.status);
  console.log("FULL BODY:", JSON.stringify(body));

  const supabase = (await import("@/lib/supabase/admin-api")).getAdminClient();
  const { data, error } = await supabase.from("career_applications").update(updates).eq("id", id).select().single();

  if (error) {
    console.error("DB UPDATE FAILED:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }

  console.log("DB UPDATE SUCCESS");
  console.log("CANDIDATE DATA:", JSON.stringify(data));
  console.log("CANDIDATE NAME:", data?.name);
  console.log("CANDIDATE EMAIL:", data?.email);
  console.log("CANDIDATE EMAIL EXISTS:", !!data?.email);

  let emailSent = false;
  let emailError = "";

  if (updates.status && data) {
    console.log("ENTERING EMAIL BLOCK - status:", updates.status);

    try {
      const { data: position } = await supabase.from("career_positions").select("title").eq("id", data.position_id).single();
      const positionTitle = position?.title || "a position at VASP Systemic";
      console.log("POSITION TITLE:", positionTitle);

      const emailPayload = {
        to: data.email,
        ...statusUpdateEmail({ name: data.name, positionTitle, status: updates.status }),
      };
      console.log("EMAIL PAYLOAD:", JSON.stringify({ to: emailPayload.to, subject: emailPayload.subject }));

      console.log("SENDING EMAIL TO:", data.email);
      await sendEmail(emailPayload);
      console.log("EMAIL SENT SUCCESSFULLY");
      emailSent = true;
    } catch (err) {
      emailError = err instanceof Error ? err.message : "Unknown email error";
      console.error("EMAIL SEND FAILED:", emailError);
    }
  } else {
    console.log("SKIPPING EMAIL - updates.status:", updates.status, "data:", !!data);
  }

  console.log("RESPONSE - emailSent:", emailSent, "emailError:", emailError);
  console.log("=== STATUS UPDATE END ===");

  return Response.json({ ...data, emailSent, emailError });
}
