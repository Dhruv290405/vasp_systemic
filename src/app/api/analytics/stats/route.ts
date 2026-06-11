import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { count: totalViews } = await supabase.from("page_views").select("*", { count: "exact", head: true });
    const { count: todayViews } = await supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", todayStart);
    const { count: weekViews } = await supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", weekAgo);
    const { count: monthViews } = await supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", monthAgo);

    const { data: topPages } = await supabase
      .from("page_views")
      .select("path")
      .gte("created_at", weekAgo);

    const pageCounts: Record<string, number> = {};
    if (topPages) {
      for (const p of topPages) {
        pageCounts[p.path] = (pageCounts[p.path] || 0) + 1;
      }
    }
    const sortedPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    return NextResponse.json({
      totalViews: totalViews ?? 0,
      todayViews: todayViews ?? 0,
      weekViews: weekViews ?? 0,
      monthViews: monthViews ?? 0,
      topPages: sortedPages,
    });
  } catch {
    return NextResponse.json({
      totalViews: 0, todayViews: 0, weekViews: 0, monthViews: 0, topPages: [],
    });
  }
}
