import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const ext = file.name.split(".").pop();
    const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    let { error } = await supabase.storage.from("products").upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error && error.message?.includes("bucket")) {
      const { error: createError } = await supabase.storage.createBucket("products", { public: true });
      if (createError) return NextResponse.json({ error: createError.message }, { status: 500 });
      const retry = await supabase.storage.from("products").upload(fileName, buffer, {
        contentType: file.type, upsert: false,
      });
      if (retry.error) return NextResponse.json({ error: retry.error.message }, { status: 500 });
    } else if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from("products").getPublicUrl(fileName);
    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
