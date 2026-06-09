"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Train, Cog, Brain, Shield, Bell, BarChart3, LayoutDashboard, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Train, Cog, Brain, Shield, Bell, BarChart3, LayoutDashboard, ClipboardCheck,
};

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">VASP Systemic Enterprises</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Comprehensive technology solutions designed to transform railway operations through AI, IoT, and intelligent automation.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <SectionHeader
          title="All Solutions"
          subtitle="End-to-end enterprise solutions for every aspect of railway operations."
        />
        <div className="space-y-24">
          {SOLUTIONS.map((solution, index) => {
            const Icon = iconMap[solution.icon] || Cpu;
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={solution.slug}
                id={solution.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:direction-rtl" : ""}`}
              >
                <div className={isReversed ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{solution.title}</h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">{solution.overview}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {solution.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Business Benefits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {solution.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-neutral border border-border mb-6">
                    <div className="text-sm font-medium text-foreground mb-1">Business Impact</div>
                    <p className="text-sm text-neutral-400">{solution.impact}</p>
                  </div>

                  <Link href={`/contact?type=demo&solution=${solution.slug}`}>
                    <Button variant="primary" className="group">
                      Request Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className={isReversed ? "lg:order-1" : ""}>
                  <div className="rounded-xl bg-neutral border border-border p-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Use Cases</h4>
                        <div className="flex flex-wrap gap-2">
                          {solution.useCases.map((uc) => (
                            <span key={uc} className="text-sm px-3 py-1.5 rounded-lg bg-white border border-border text-neutral-500">
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Technical Architecture</h4>
                        <p className="text-sm text-neutral-400 leading-relaxed">{solution.architecture}</p>
                      </div>
                    </div>
                  </div>
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
