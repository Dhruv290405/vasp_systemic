import { NextRequest } from "next/server";
import { handleGetAll, handlePost } from "@/lib/supabase/admin-api";

export async function GET() {
  return handleGetAll("case_studies");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return handlePost("case_studies", body);
}
