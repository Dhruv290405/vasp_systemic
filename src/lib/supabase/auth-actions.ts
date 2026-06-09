"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGoogle(origin?: string) {
  const supabase = await createClient();
  const redirectTo = origin
    ? `${origin}/auth/callback`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  return data.url;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email is required" };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`,
  });

  if (error) return { error: error.message };
  return { success: true };
}
