"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const deploymentMetrics = [
  { value: "250+", label: "Railway Depots", sub: "Production Deployment" },
  { value: "20,000+", label: "Trains Monitored", sub: "Real-time Operations" },
  { value: "50,000+", label: "Workforce Managed", sub: "Daily Active Users" },
  { value: "98%", label: "RDSO Compliance", sub: "Audit Ready" },
];

const productTags = ["MCC Platform", "Smart Coach", "Water Level Monitor", "Asset Tracking"];

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral/50 via-white to-white" />
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-primary/[0.02] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md border border-primary/20 bg-primary/[0.04] mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary tracking-wide">
                  RDSO Approved Railway System
                </span>
              </div>

              <h1 className="text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold text-primary leading-[1.08] tracking-tight">
                Railway Operations Technology — Deployed Across India
              </h1>

              <p className="mt-5 text-base lg:text-lg text-neutral-500 leading-relaxed max-w-lg">
                VASP Systemic builds operational monitoring, workforce management, and compliance platforms for Indian Railways, Metro organizations, and railway contractors.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {productTags.map((product) => (
                  <span key={product} className="px-3 py-1.5 text-xs font-medium text-neutral-500 bg-neutral border border-border rounded-md">
                    {product}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products">
                  <button className="px-6 py-3 text-sm font-bold rounded-md bg-primary text-white hover:bg-primary-dark transition-colors shadow-sm">
                    View Platform
                  </button>
                </Link>
                <Link href="/contact?type=demo">
                  <button className="px-6 py-3 text-sm font-semibold rounded-md border border-primary/30 text-primary hover:bg-primary/[0.04] transition-colors">
                    Request Demo
                  </button>
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
                  Production Deployment
                </div>
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {deploymentMetrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-2xl lg:text-3xl font-bold text-primary">{m.value}</div>
                      <div className="text-sm font-semibold text-neutral-700 mt-0.5">{m.label}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-xl ring-1 ring-black/5">
                <div className="absolute top-0 left-0 right-0 h-7 bg-[#0A2A88] flex items-center px-3 gap-1.5 z-10">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="ml-3 text-[10px] text-white/50 font-medium tracking-wide">VASP OPERATIONS SUITE — LIVE</span>
                </div>
                <Image
                  src="/heroic_dashboard.jpg"
                  alt="VASP Systemic MCC Platform — Railway Operations Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto pt-7"
                  priority
                />
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
