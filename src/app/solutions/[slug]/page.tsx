"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Cpu, Train, Cog, Brain, Shield, Bell, BarChart3, LayoutDashboard, ClipboardCheck } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Train, Cog, Brain, Shield, Bell, BarChart3, LayoutDashboard, ClipboardCheck,
};

export default function SolutionDetailPage() {
  const params = useParams();
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);

  if (!solution) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Solution not found</h1>
        <Link href="/solutions" className="mt-4 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Solutions</Button>
        </Link>
      </div>
    );
  }

  const Icon = iconMap[solution.icon] || Cpu;

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/solutions" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Solutions
            </Link>
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{solution.title}</h1>
            <p className="text-lg text-white/70 max-w-2xl">{solution.overview}</p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
            <div className="space-y-4">
              {solution.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <span className="text-neutral-400">{f}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Business Benefits</h2>
            <div className="space-y-4">
              {solution.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-neutral-400">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-foreground mb-6">Use Cases</h2>
            <div className="space-y-3 mb-8">
              {solution.useCases.map((uc) => (
                <div key={uc} className="p-4 rounded-lg bg-neutral border border-border">
                  <p className="text-sm text-neutral-400">{uc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">Technical Architecture</h2>
            <div className="p-6 rounded-lg bg-neutral border border-border mb-8">
              <p className="text-sm text-neutral-400 leading-relaxed">{solution.architecture}</p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 mb-8">
              <h3 className="font-semibold text-foreground mb-2">Business Impact</h3>
              <p className="text-sm text-neutral-400">{solution.impact}</p>
            </div>

            <Link href={`/contact?type=demo&solution=${solution.slug}`}>
              <Button variant="secondary" size="lg" className="group">
                Request Demo
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
