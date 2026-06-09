"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Shield } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";

const featuredStudies = [
  {
    title: "Predictive Maintenance for Indian Railways Fleet",
    client: "Indian Railways",
    metrics: ["60% reduction in failures", "45% cost savings", "99% system availability"],
    image: "bg-gradient-to-br from-primary/20 to-primary/5",
    icon: TrendingUp,
  },
  {
    title: "IoT-Based Coach Monitoring for Metro Rail",
    client: "Metro Rail Corporation",
    metrics: ["40% energy savings", "35% maintenance reduction", "Real-time passenger analytics"],
    image: "bg-gradient-to-br from-secondary/20 to-secondary/5",
    icon: Clock,
  },
  {
    title: "Safety Intelligence for Level Crossing Protection",
    client: "Government Railway Organization",
    metrics: ["70% incident reduction", "90% faster response", "100% compliance achieved"],
    image: "bg-gradient-to-br from-primary/20 to-secondary/5",
    icon: Shield,
  },
];

export function CaseStudiesOverview() {
  return (
    <SectionWrapper className="bg-neutral" id="case-studies">
      <SectionHeader
        title="Featured Case Studies"
        subtitle="Real-world impact delivered through our enterprise solutions."
      />
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {featuredStudies.map((study, index) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-xl overflow-hidden border border-border bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className={`h-48 ${study.image} p-6 flex items-end`}>
              <div className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center">
                <study.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs font-medium text-secondary mb-2">{study.client}</div>
              <h3 className="font-semibold text-foreground mb-3">{study.title}</h3>
              <ul className="space-y-2">
                {study.metrics.map((metric) => (
                  <li key={metric} className="text-sm text-neutral-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/case-studies">
          <Button variant="outline" size="lg" className="group">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
