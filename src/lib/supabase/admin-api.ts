import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function handleGetAll(table: string, order?: string) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from(table).select("*").order(order || "created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function handleGetOne(table: string, id: string) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function handlePost(table: string, body: Record<string, unknown>) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from(table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function handlePut(table: string, id: string, body: Record<string, unknown>) {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from(table).update(body).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function handleDelete(table: string, id: string) {
  const supabase = getAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
