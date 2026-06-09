import { NextRequest } from "next/server";
import { handleGetAll, handlePost } from "@/lib/supabase/admin-api";

export async function GET() {
  return handleGetAll("career_positions");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return handlePost("career_positions", body);
}
