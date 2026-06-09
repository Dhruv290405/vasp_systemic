import { NextRequest } from "next/server";
import { handleGetOne, handlePut, handleDelete } from "@/lib/supabase/admin-api";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleGetOne("demo_requests", id);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  return handlePut("demo_requests", id, body);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return handleDelete("demo_requests", id);
}
