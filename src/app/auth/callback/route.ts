import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_EMAILS = ["vaspsystemic@gmail.com", "dhruvtiwari864@gmail.com"];

export async function GET(request: Request) {
  const fullUrl = request.url;
  const { searchParams, origin: requestOrigin } = new URL(fullUrl);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "NOT_SET";
  const origin = requestOrigin.includes("localhost") && siteUrl !== "NOT_SET"
    ? siteUrl
    : requestOrigin;

  // Debug log
  console.log("=== AUTH CALLBACK DEBUG ===");
  console.log("FULL REQUEST URL:", fullUrl);
  console.log("REQUEST ORIGIN:", requestOrigin);
  console.log("SITE_URL ENV:", process.env.NEXT_PUBLIC_SITE_URL);
  console.log("USING ORIGIN:", origin);
  console.log("NEXT PARAM:", next);
  console.log("CODE PRESENT:", !!code);

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const userEmail = data.user?.email;
      console.log("EXCHANGE SUCCESS. USER:", userEmail);
      console.log("REDIRECTING TO:", `${origin}${next}`);
      if (userEmail && ALLOWED_EMAILS.includes(userEmail)) {
        return NextResponse.redirect(`${origin}${next}`, {
          headers: {
            "X-Debug-Origin": requestOrigin,
            "X-Debug-SiteUrl": siteUrl,
            "X-Debug-FinalOrigin": origin,
          },
        });
      }
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`);
    } else {
      console.log("EXCHANGE ERROR:", error.message);
    }
  }

  console.log("FALLBACK REDIRECT TO:", `${origin}/admin/login?error=auth_failed`);
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`, {
    headers: {
      "X-Debug-Origin": requestOrigin,
      "X-Debug-SiteUrl": siteUrl,
      "X-Debug-FinalOrigin": origin,
    },
  });
}
