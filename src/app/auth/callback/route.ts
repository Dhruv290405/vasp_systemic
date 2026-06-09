import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_EMAILS = ["vaspsystemic@gmail.com", "dhruvtiwari864@gmail.com"];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const userEmail = data.user?.email;
      if (userEmail && ALLOWED_EMAILS.includes(userEmail)) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
