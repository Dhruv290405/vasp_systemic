import { NextRequest } from "next/server";
import { handleGetAll, handlePost } from "@/lib/supabase/admin-api";

export async function GET() {
  return handleGetAll("products");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return handlePost("products", body);
}
