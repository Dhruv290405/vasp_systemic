"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Monitor, Cpu, Radio, Shield, BarChart3, Bell, ClipboardCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const iconMap: Record<string, any> = { Monitor, Cpu, Radio, Shield, BarChart3, Bell, ClipboardCheck };
const iconList = [Monitor, Cpu, Radio, Shield, BarChart3, Bell, ClipboardCheck];

interface ProductItem {
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  iconName: string | any;
  slug: string;
}

export default function ProductDetailClient({ products: initialProducts, slug }: { products: ProductItem[]; slug: string }) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const mapped = data.filter((p: any) => p.published).map((p: any) => ({
            name: p.name,
            category: p.category || "Software",
            description: p.description || "",
            features: p.features || [],
            specifications: p.specifications || {},
            iconName: p.icon_name || iconList[Math.floor(Math.random() * iconList.length)],
            slug: p.slug || p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          }));
          if (mapped.length) setProducts(prev => {
            const existingNames = new Set(prev.map((p: ProductItem) => p.name));
            const newItems = mapped.filter((p: any) => !existingNames.has(p.name));
            return [...newItems, ...prev];
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const product = products.find((p) => p.slug === slug);

  if (!product && !loading) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link href="/products" className="mt-4 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  const Icon = typeof product.iconName === "string" ? (iconMap[product.iconName] || Monitor) : (product.iconName || Monitor);

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                {product.category}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-lg text-white/70 max-w-2xl">{product.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border flex items-center justify-center mb-8">
                <Icon className="w-32 h-32 text-primary/30" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Features</h2>
                <ul className="space-y-3">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-3 text-neutral-400">
                      <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Specifications</h2>
                  <div className="p-6 rounded-xl bg-neutral border border-border">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-neutral-400">{key}</span>
                          <span className="font-medium text-foreground">{val as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Link href={`/contact?type=demo&product=${slug}`}>
                <Button variant="primary" size="xl" className="w-full sm:w-auto group">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
