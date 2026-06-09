"use client";

import { motion } from "framer-motion";
import { CORE_STRENGTHS } from "@/lib/constants";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";

export function WhyVaspSection() {
  return (
    <SectionWrapper id="why-vasp">
      <SectionHeader
        title="Why VASP Systemic"
        subtitle="We deliver enterprise-grade railway technology solutions that combine artificial intelligence, IoT, and deep domain expertise to transform railway operations."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CORE_STRENGTHS.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group p-8 rounded-xl border border-border bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
