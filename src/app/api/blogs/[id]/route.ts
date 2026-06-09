import { NextRequest } from "next/server";
import { handleGetOne, handlePut, handleDelete } from "@/lib/supabase/admin-api";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleGetOne("blog_posts", id);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return handlePut("blog_posts", id, body);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleDelete("blog_posts", id);
}
