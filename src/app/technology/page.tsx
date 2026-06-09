"use client";

import { motion } from "framer-motion";
import { Brain, Radio, Cloud, Shield, Cpu, Eye, Network, Lock, CheckCircle2 } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { CTASection } from "@/components/sections/cta";

const techStack = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description: "Advanced ML models for predictive analytics, pattern recognition, and intelligent decision-making in railway operations.",
    capabilities: ["Predictive maintenance algorithms", "Anomaly detection models", "Natural language processing", "Reinforcement learning for optimization", "Computer vision systems"],
  },
  {
    icon: Radio,
    title: "IoT Architecture",
    description: "Scalable and secure IoT infrastructure connecting thousands of sensors across railway assets.",
    capabilities: ["Distributed sensor networks", "Real-time data acquisition", "Protocol translation layer", "Device management platform", "OTA firmware updates"],
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Enterprise-grade cloud platform built for scale, reliability, and security.",
    capabilities: ["Multi-cloud support (AWS, Azure, GCP)", "Auto-scaling architecture", "Disaster recovery", "99.9% uptime SLA", "Global CDN delivery"],
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    description: "Real-time processing at the network edge for sub-millisecond response times.",
    capabilities: ["On-device ML inference", "Local data buffering", "Offline operation capability", "Low-latency processing", "Bandwidth optimization"],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "AI-powered visual inspection and monitoring for safety and quality assurance.",
    capabilities: ["Real-time object detection", "Track and infrastructure inspection", "Platform safety monitoring", "Pantograph and OHE inspection", "Passenger flow analysis"],
  },
  {
    icon: Network,
    title: "Predictive Analytics",
    description: "Advanced analytics engine that predicts failures and optimizes maintenance schedules.",
    capabilities: ["Failure prediction models", "Remaining useful life estimation", "Maintenance optimization", "Root cause analysis", "Trend forecasting"],
  },
  {
    icon: Shield,
    title: "Safety Systems",
    description: "Multi-layered safety architecture designed for mission-critical railway operations.",
    capabilities: ["Fail-safe system design", "Redundant communication paths", "Safety integrity level (SIL) compliance", "Automated emergency response", "Continuous system monitoring"],
  },
  {
    icon: Lock,
    title: "Cyber Security",
    description: "Comprehensive security framework protecting railway infrastructure from cyber threats.",
    capabilities: ["End-to-end encryption", "Zero-trust architecture", "Intrusion detection systems", "Security information and event management", "Compliance monitoring"],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Technology</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Cutting-edge technology infrastructure powering intelligent railway operations and digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <SectionHeader
          title="Technology Stack"
          subtitle="Our technology architecture combines the best of AI, IoT, cloud, and edge computing to deliver enterprise-grade solutions."
        />
        <div className="space-y-20">
          {techStack.map((tech, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center`}
              >
                <div className={isReversed ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <tech.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{tech.title}</h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">{tech.description}</p>
                  <div className="space-y-3">
                    {tech.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                        <span className="text-sm text-neutral-400">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={isReversed ? "lg:order-1" : ""}>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] border border-border flex items-center justify-center p-12">
                    <tech.icon className="w-32 h-32 text-primary/10" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      <section className="py-20 bg-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">System Architecture</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Our end-to-end architecture ensures seamless data flow from sensors to insights.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { layer: "Edge Layer", components: "Sensors, Gateways, Edge Controllers", color: "bg-blue-100 border-blue-200 text-blue-700" },
                { layer: "Connectivity", components: "4G/LTE, LoRaWAN, WiFi, Ethernet", color: "bg-green-100 border-green-200 text-green-700" },
                { layer: "Cloud Platform", components: "Data Lake, ML Engine, Dashboards", color: "bg-purple-100 border-purple-200 text-purple-700" },
                { layer: "Applications", components: "Analytics, Alerts, Ops Dashboard", color: "bg-orange-100 border-orange-200 text-orange-700" },
              ].map((layer) => (
                <div key={layer.layer} className="text-center">
                  <div className={`p-4 rounded-lg ${layer.color} mb-3`}>
                    <div className="font-semibold text-sm">{layer.layer}</div>
                  </div>
                  <p className="text-xs text-neutral-400">{layer.components}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Technology Partnerships</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
            We partner with leading technology providers to bring the best solutions to our clients.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["AWS", "Microsoft Azure", "Google Cloud", "NVIDIA", "ARM", "Texas Instruments"].map((p) => (
              <span key={p} className="px-6 py-3 rounded-lg border border-border bg-white text-sm font-medium text-neutral-500">
                {p}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
