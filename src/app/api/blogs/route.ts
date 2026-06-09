import { NextRequest } from "next/server";
import { handleGetAll, handlePost } from "@/lib/supabase/admin-api";

export async function GET() {
  return handleGetAll("blog_posts");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return handlePost("blog_posts", body);
}
