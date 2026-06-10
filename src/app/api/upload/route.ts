import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some(b => b.name === "products")) {
      await supabase.storage.createBucket("products", { public: true });
    }

    const ext = file.name.split(".").pop();
    const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error } = await supabase.storage.from("products").upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName);
    return NextResponse.json({ url: urlData.publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
