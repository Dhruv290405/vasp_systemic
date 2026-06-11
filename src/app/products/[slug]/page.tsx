import { getAdminClient } from "@/lib/supabase/admin-api";
import ProductDetailClient from "./product-detail-client";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: any = null;
  try {
    const supabase = getAdminClient();
    const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (data && data.published) product = data;
  } catch {}
  return <ProductDetailClient product={product} slug={slug} />;
}
