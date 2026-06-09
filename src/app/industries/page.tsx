"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Train, Building2, Warehouse, Factory, Network, TrendingUp } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta";

const iconMap: Record<string, React.ElementType> = {
  Train, Building2, Warehouse, Factory, Network,
};

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Industries We Serve</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Deep domain expertise across railway and industrial sectors, delivering tailored solutions for each industry&apos;s unique challenges.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="space-y-24">
          {INDUSTRIES.map((industry, index) => {
            const Icon = iconMap[industry.icon] || Train;
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={isReversed ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{industry.name}</h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">{industry.description}</p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Challenges</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {industry.challenges.map((c) => (
                        <div key={c} className="flex items-center gap-2 text-sm text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">VASP Solution</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{industry.solution}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {industry.benefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-sm text-neutral-400">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20 mb-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      ROI Impact
                    </div>
                    <p className="text-sm text-neutral-400">{industry.roi}</p>
                  </div>

                  <Link href={`/contact?type=demo&industry=${industry.slug}`}>
                    <Button variant="primary" className="group">
                      Discuss Your Needs
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className={isReversed ? "lg:order-1" : ""}>
                  <div className="rounded-xl bg-neutral border border-border p-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Key Challenges We Solve</h4>
                        {industry.challenges.map((c) => (
                          <div key={c} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <span className="text-sm text-neutral-400">{c}</span>
                          </div>
                        ))}
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
