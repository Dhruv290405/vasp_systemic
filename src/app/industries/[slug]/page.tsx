"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, TrendingUp, Train, Building2, Warehouse, Factory, Network } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const iconMap: Record<string, React.ElementType> = {
  Train, Building2, Warehouse, Factory, Network,
};

export default function IndustryDetailPage() {
  const params = useParams();
  const industry = INDUSTRIES.find((i) => i.slug === params.slug);

  if (!industry) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Industry not found</h1>
        <Link href="/industries" className="mt-4 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Industries</Button>
        </Link>
      </div>
    );
  }

  const Icon = iconMap[industry.icon] || Train;

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Industries
            </Link>
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{industry.name}</h1>
            <p className="text-lg text-white/70 max-w-2xl">{industry.description}</p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Challenges We Solve</h2>
            <div className="space-y-4 mb-12">
              {industry.challenges.map((c) => (
                <div key={c} className="flex items-start gap-3 p-4 rounded-lg bg-neutral border border-border">
                  <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span className="text-neutral-400">{c}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6">Business Benefits</h2>
            <div className="space-y-4">
              {industry.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-neutral-400">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Solution</h2>
            <div className="p-6 rounded-lg bg-neutral border border-border mb-8">
              <p className="text-neutral-400 leading-relaxed">{industry.solution}</p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">ROI Impact</h3>
              </div>
              <p className="text-sm text-neutral-400">{industry.roi}</p>
            </div>

            <Link href={`/contact?type=demo&industry=${industry.slug}`}>
              <Button variant="secondary" size="lg" className="group">
                Discuss Your Needs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
