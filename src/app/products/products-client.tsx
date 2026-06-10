"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Users, Zap, ChevronRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const bigIconMap: Record<string, any> = {
  Hardware: Shield, Software: TrendingUp,
};

export default function ProductsClient({ products: initialProducts }: { products: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const mapped = data.filter((p: any) => p.published);
          if (mapped.length) {
            setProducts(prev => {
              const existing = new Set(prev.map((p: any) => p.id));
              const newItems = mapped.filter((p: any) => !existing.has(p.id));
              return [...newItems, ...prev];
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Products</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Enterprise-grade hardware and software products engineered for the toughest railway environments.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <SectionHeader title="Product Catalog" subtitle="Built for reliability, designed for scale." />
        {products.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p>No products available yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const ext = product.extended_data || {};
              const slug = product.slug || product.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              const Icon = bigIconMap[product.category] || Shield;
              const stats = ext.deployment_statistics || {};
              const statEntries = Object.entries(stats).slice(0, 2);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/products/${slug}`} className="block p-6 rounded-xl border border-border bg-white hover:shadow-lg transition-all group h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">{product.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {ext.hero_title || product.name}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{ext.subheadline || product.description}</p>

                    {statEntries.length > 0 && (
                      <div className="flex gap-4 mb-4">
                        {statEntries.map(([key, val]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm font-bold text-foreground">{val as string}</div>
                            <div className="text-xs text-neutral-400">{key}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </SectionWrapper>

      <CTASection />
    </>
  );
}
