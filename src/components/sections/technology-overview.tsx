"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Radio, Cloud, Shield, Cpu, Eye, Network, Lock } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";

const technologies = [
  { icon: Brain, title: "Artificial Intelligence", description: "ML models for predictive analytics and decision automation" },
  { icon: Radio, title: "IoT Architecture", description: "Scalable sensor networks for real-time asset monitoring" },
  { icon: Cloud, title: "Cloud Infrastructure", description: "Enterprise-grade cloud platform with 99.9% uptime" },
  { icon: Cpu, title: "Edge Computing", description: "Real-time processing at the network edge for low latency" },
  { icon: Eye, title: "Computer Vision", description: "AI-powered visual inspection and safety monitoring" },
  { icon: Network, title: "Predictive Analytics", description: "Advanced analytics for failure prediction and optimization" },
  { icon: Shield, title: "Safety Systems", description: "Multi-layered safety architecture for critical operations" },
  { icon: Lock, title: "Cyber Security", description: "Enterprise security with encryption and access control" },
];

export function TechnologyOverview() {
  return (
    <SectionWrapper id="technology">
      <SectionHeader
        title="Our Technology Stack"
        subtitle="Cutting-edge technology infrastructure powering intelligent railway operations and digital transformation."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="p-6 rounded-xl border border-border bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <tech.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-foreground mb-2">{tech.title}</h3>
            <p className="text-sm text-neutral-400">{tech.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/technology">
          <Button variant="outline" size="lg" className="group">
            Explore Technology
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
