"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Radio, Shield, Wrench, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const trustIndicators = [
  { icon: Brain, label: "AI Powered Intelligence" },
  { icon: Radio, label: "IoT Sensors" },
  { icon: Shield, label: "Safety First" },
  { icon: Wrench, label: "Predictive Maintenance" },
  { icon: Settings, label: "Operational Excellence" },
];

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0A2A88 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0A2A88]/[0.02] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
          <div className="grid lg:grid-cols-[40%_60%] gap-12 items-center">
            {/* LEFT SIDE (40%) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2A88]/5 border border-[#0A2A88]/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                <span className="text-xs font-semibold text-[#0A2A88] uppercase tracking-wider">Enterprise Railway Technology</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A2A88] leading-tight">
                {COMPANY.tagline}
              </h1>

              <p className="mt-5 text-base md:text-lg text-neutral-500 max-w-lg leading-relaxed">
                AI + IoT Powered Solutions for Safer, Smarter and More Efficient Railway Operations.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact?type=demo">
                  <button className="px-6 py-3 text-sm font-bold rounded-lg bg-[#F97316] text-white hover:bg-[#e56710] transition-all duration-200 shadow-md hover:shadow-lg">
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4 inline-block group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-6 py-3 text-sm font-semibold rounded-lg border-2 border-[#0A2A88] text-[#0A2A88] hover:bg-[#0A2A88] hover:text-white transition-all duration-200">
                    Contact Sales
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {trustIndicators.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#0A2A88]/[0.03] border border-[#0A2A88]/[0.06]">
                      <Icon className="w-4 h-4 text-[#F97316]" />
                      <span className="text-[11px] font-semibold text-neutral-500 leading-tight">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT SIDE (60%) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                <Image
                  src="/heroic_dashboard.jpg"
                  alt="VASP MCC Platform Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom Metrics Strip */}
      <MetricsStripSection />
    </>
  );
}

function MetricsStripSection() {
  const metrics = [
    { value: "20,000+", label: "Trains Monitored" },
    { value: "50,000+", label: "Workers Managed" },
    { value: "98%", label: "Compliance Rate" },
    { value: "250+", label: "Depots Covered" },
    { value: "1M+", label: "Daily Transactions" },
  ];

  return (
    <section className="relative bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-border border-x border-border">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="py-8 px-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#0A2A88]">{metric.value}</div>
              <div className="text-xs md:text-sm text-neutral-400 mt-1 font-medium">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
