import { NextRequest } from "next/server";
import { handleGetOne, handlePut, handleDelete } from "@/lib/supabase/admin-api";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleGetOne("career_applications", id);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return handlePut("career_applications", id, body);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleDelete("career_applications", id);
}
