"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Radio, LineChart, Wrench, Settings, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const trustIndicators = [
  { icon: Shield, label: "RDSO Approved", sub: "Safety Standards" },
  { icon: Radio, label: "200+ Installations", sub: "Production Deployed" },
  { icon: LineChart, label: "Smart Coach Integrated", sub: "Real-time Analytics" },
  { icon: Wrench, label: "Railway Grade", sub: "Enterprise Reliability" },
  { icon: Settings, label: "Railway Field Ready", sub: "25+ Depots Covered" },
];

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-primary/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-neutral to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-36 w-full">
          <div className="grid lg:grid-cols-[42%_58%] gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-5 lg:mb-7">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[11px] lg:text-xs font-semibold text-primary uppercase tracking-[0.12em]">
                  Enterprise Railway Technology
                </span>
              </div>

              <h1 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold text-primary leading-[1.08] tracking-tight">
                {COMPANY.tagline}
              </h1>

              <p className="mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg text-neutral-500 max-w-lg leading-relaxed">
                AI + IoT Powered Solutions for Safer, Smarter and More Efficient Railway Operations — trusted by Indian Railways and metro rail authorities.
              </p>

              <div className="mt-6 lg:mt-8 flex flex-wrap gap-3 lg:gap-4">
                <Link href="/contact?type=demo">
                  <button className="group px-6 lg:px-7 py-3 lg:py-3.5 text-sm font-bold rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-all duration-200 shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 active:scale-[0.98]">
                    <span className="flex items-center gap-2">
                      Request Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-6 lg:px-7 py-3 lg:py-3.5 text-sm font-semibold rounded-lg border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 active:scale-[0.98]">
                    Contact Sales
                  </button>
                </Link>
                <Link href="/case-studies">
                  <button className="px-6 lg:px-7 py-3 lg:py-3.5 text-sm font-medium rounded-lg text-neutral-400 hover:text-primary hover:bg-primary/5 transition-all duration-200">
                    <span className="flex items-center gap-1.5">
                      Case Studies
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </Link>
              </div>

              <div className="mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                {trustIndicators.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex flex-col items-center text-center gap-2.5 p-4 lg:p-5 min-h-[120px] lg:min-h-[130px] justify-center rounded-xl bg-gradient-to-b from-white to-primary/[0.02] border border-primary/[0.08] hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 ring-1 ring-secondary/10">
                        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-secondary" />
                      </div>
                      <div>
                        <div className="text-sm lg:text-[15px] font-bold text-neutral-800 leading-snug">{item.label}</div>
                        <div className="text-xs lg:text-[13px] text-neutral-400 leading-snug mt-1">{item.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-3xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                  <Image
                    src="/heroic_dashboard.jpg"
                    alt="VASP Systemic Platform Dashboard"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-secondary/10 rounded-full blur-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <MetricsStripSection />
    </>
  );
}

function MetricsStripSection() {
  const metrics = [
    { value: "20,000+", label: "Trains Monitored", desc: "Across Indian Railways" },
    { value: "50,000+", label: "Workforce Managed", desc: "Daily Operations" },
    { value: "98%", label: "Compliance Rate", desc: "RDSO Standards" },
    { value: "250+", label: "Depots Covered", desc: "Production Deployed" },
    { value: "1M+", label: "Daily Transactions", desc: "System Processing" },
  ];

  return (
    <section className="relative bg-white border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border/60 border-x border-border/60">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative py-6 md:py-9 px-3 md:px-5 text-center group hover:bg-primary/[0.01] transition-colors"
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-neutral-500 mt-1 font-semibold">
                {metric.label}
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">
                {metric.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
