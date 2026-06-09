"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Train, Building2, Warehouse, Factory, Network } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Train, Building2, Warehouse, Factory, Network,
};

export function IndustriesOverview() {
  return (
    <SectionWrapper className="bg-neutral" id="industries">
      <SectionHeader
        title="Industries We Serve"
        subtitle="Domain expertise across railway and industrial sectors, delivering tailored solutions for each industry's unique challenges."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {INDUSTRIES.map((industry, index) => {
          const Icon = iconMap[industry.icon] || Train;
          return (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/industries/${industry.slug}`} className="block group h-full">
                <div className="h-full p-8 rounded-xl border border-border bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{industry.name}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">{industry.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {industry.challenges.slice(0, 3).map((challenge) => (
                      <span key={challenge} className="text-xs px-3 py-1 rounded-full bg-neutral text-neutral-500">
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div className="text-center">
        <Link href="/industries">
          <Button variant="outline" size="lg" className="group">
            Explore Industries
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
