"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Monitor, Cpu, Radio, Shield, BarChart3, Bell, ClipboardCheck } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
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
}

export default function ProductsClient({ products: initialProducts }: { products: ProductItem[] }) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);

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
          }));
          if (mapped.length) setProducts(prev => {
            const existingNames = new Set(prev.map((p: ProductItem) => p.name));
            const newItems = mapped.filter((p: any) => !existingNames.has(p.name));
            return [...newItems, ...prev];
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Products</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Enterprise-grade hardware and software products engineered for the toughest railway environments.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <SectionHeader
          title="Product Catalog"
          subtitle="Built for reliability, designed for scale. Each product undergoes rigorous testing for railway environments."
        />
        <div className="space-y-16">
          {products.map((product, index) => {
            const isReversed = index % 2 !== 0;
            const Icon = typeof product.iconName === "string" ? (iconMap[product.iconName] || Monitor) : (product.iconName || Monitor);
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={isReversed ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-4">
                    {product.category}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="text-neutral-400 mb-6">{product.description}</p>
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((f: string) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {product.specifications && Object.keys(product.specifications).length > 0 && (
                    <div className="p-4 rounded-lg bg-neutral border border-border mb-6">
                      <h3 className="font-semibold text-foreground mb-3 text-sm">Specifications</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(product.specifications).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-neutral-400">{key}</span>
                            <span className="font-medium text-foreground">{val as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Link href={`/contact?type=demo&product=${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="primary" className="group">
                      Request Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div className={isReversed ? "lg:order-1" : ""}>
                  <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border flex items-center justify-center hover:shadow-lg transition-all cursor-pointer">
                      <Icon className="w-24 h-24 text-primary/30" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
