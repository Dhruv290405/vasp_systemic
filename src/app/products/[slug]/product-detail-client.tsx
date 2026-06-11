"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Shield, Zap, TrendingUp, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const statIcons: Record<string, any> = {
  Deployed: Shield, Uptime: Zap, "Data Points": TrendingUp, Clients: Users,
};

export default function ProductDetailClient({ product, slug }: { product: any; slug: string }) {
  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link href="/products" className="mt-4 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Button>
        </Link>
      </div>
    );
  }

  const ext = product.extended_data || {};
  const images = ext.images?.length ? ext.images : [product.image_url].filter(Boolean);
  const stats = ext.deployment_statistics || {};
  const hasStatIcons = Object.keys(statIcons).length > 0;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-4 w-fit">
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {ext.hero_title || product.name}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl">
              {ext.subheadline || product.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      {ext.trust_badges?.length > 0 && (
        <section className="py-8 bg-neutral border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {ext.trust_badges.map((badge: string, i: number) => (
                <motion.div key={badge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-500"
                >
                  <Shield className="w-4 h-4 text-primary" />
                  {badge}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      {ext.overview && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
                <div className="prose prose-neutral max-w-none text-neutral-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: ext.overview.replace(/\n/g, "<br/>") }} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                {images[0] ? (
                  <Image src={images[0]} alt={product.name} width={600} height={400} className="rounded-xl w-full object-cover border border-border" />
                ) : (
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border flex items-center justify-center">
                    <Shield className="w-24 h-24 text-primary/30" />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Problems Solved */}
      {ext.problems_solved?.length > 0 && (
        <section className="py-20 bg-neutral">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Problems We Solve</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">Challenges that organizations face and how this product addresses them.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ext.problems_solved.map((problem: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-white border border-border flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 text-sm font-bold">!</span>
                  </div>
                  <p className="text-sm text-neutral-400">{problem}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Smart Coach Integration */}
      {ext.smart_coach_integration && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="p-10 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-2 text-sm font-medium text-secondary mb-3">
                    <Zap className="w-4 h-4" /> Integration
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">VASP Smart Coach Integration</h2>
                  <p className="text-neutral-400 leading-relaxed">{ext.smart_coach_integration}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="p-6 rounded-xl bg-white border border-border text-center"
                >
                  <Zap className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Smart Coach Ready</h3>
                  <p className="text-sm text-neutral-400">Seamlessly integrates with VASP Smart Coach for unified operations.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {product.features?.length > 0 && (
        <section className="py-20 bg-neutral">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">Built to deliver performance, reliability, and scale.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((f: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-white border border-border"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-neutral-400">{f}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {product.benefits?.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Benefits</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">The value this product brings to your operations.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {product.benefits.map((b: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-white border border-border flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-neutral-400">{b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technology Statement */}
      {ext.technology_statement && (
        <section className="py-20 bg-neutral">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-10 rounded-2xl bg-white border border-border text-center max-w-4xl mx-auto"
            >
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Technology</h2>
              <p className="text-neutral-400 leading-relaxed max-w-3xl mx-auto">{ext.technology_statement}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Suitable For */}
      {ext.suitable_for?.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Who Is This For?</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ext.suitable_for.map((item: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl bg-white border border-border text-center hover:shadow-md transition-shadow"
                >
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deployment Statistics */}
      {Object.keys(stats).length > 0 && (
        <section className="py-20 bg-gradient-dark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white text-center mb-12">Deployment Statistics</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(stats).map(([key, val], i) => {
                  const StatIcon = statIcons[key] || Shield;
                  return (
                    <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center"
                    >
                      <StatIcon className="w-8 h-8 text-secondary mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">{val as string}</div>
                      <div className="text-sm text-white/60">{key}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Product Images Gallery */}
      {images.length > 1 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Gallery</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((url: string, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-xl overflow-hidden border border-border aspect-square bg-neutral"
                >
                  <Image src={url} alt={`${product.name} ${i + 1}`} width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <section className="py-20 bg-neutral">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground text-center mb-8">Specifications</h2>
              <div className="p-6 rounded-xl bg-white border border-border">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-neutral-400 text-sm">{key}</span>
                      <span className="font-medium text-foreground text-sm">{val as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {ext.cta_text || `Ready to Transform with ${product.name}?`}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Get in touch with our team to learn how {product.name} can enhance your operations.
            </p>
            <Link href={ext.cta_link || `/contact?type=demo&product=${slug}`}>
              <Button variant="secondary" size="xl" className="group">
                {ext.cta_text || "Request Demo"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
