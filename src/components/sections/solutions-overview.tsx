"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Train, Cog, Brain, Shield, Bell, BarChart3, LayoutDashboard } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Cpu, Train, Cog, Brain, Shield, Bell, BarChart3, LayoutDashboard,
};

export function SolutionsOverview() {
  return (
    <SectionWrapper id="solutions">
      <SectionHeader
        title="Our Solutions"
        subtitle="Comprehensive enterprise solutions designed to modernize railway operations through AI, IoT, and advanced analytics."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {SOLUTIONS.slice(0, 8).map((solution, index) => {
          const Icon = iconMap[solution.icon] || Cpu;
          return (
            <motion.div
              key={solution.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/solutions/${solution.slug}`} className="block group h-full">
                <div className="h-full p-6 rounded-xl border border-border bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{solution.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{solution.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center">
        <Link href="/solutions">
          <Button variant="outline" size="lg" className="group">
            View All Solutions
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
