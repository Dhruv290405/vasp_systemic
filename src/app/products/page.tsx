import { getAdminClient } from "@/lib/supabase/admin-api";
import ProductsClient from "./products-client";

export default async function ProductsPage() {
  let products: any[] = [];
  try {
    const supabase = getAdminClient();
    const { data } = await supabase.from("products").select("*").eq("published", true).order("created_at", { ascending: false });
    if (data) products = data;
  } catch {}
  return <ProductsClient products={products} />;
}
