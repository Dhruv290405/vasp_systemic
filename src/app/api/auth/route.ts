import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const AUTHORIZED_EMAILS = ["vaspsystemic@gmail.com", "dhruvtiwari864@gmail.com"];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!AUTHORIZED_EMAILS.includes(email)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message?.includes("Invalid login credentials")) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError?.message?.includes("User already registered")) {
        return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
      }

      if (signUpError) throw signUpError;

      const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (retryError) throw retryError;

      return NextResponse.json({ user: retryData.user, session: retryData.session });
    }

    if (error) throw error;

    return NextResponse.json({ user: data.user, session: data.session });
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
