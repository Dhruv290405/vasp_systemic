"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";

const testimonials = [
  {
    quote: "VASP Systemic's predictive maintenance platform has transformed our fleet operations. The AI-driven insights have significantly reduced unplanned downtime.",
    author: "Senior Operations Director",
    role: "Indian Railways",
  },
  {
    quote: "The IoT monitoring system implemented by VASP has given us real-time visibility into our entire metro network. A game-changer for our operations.",
    author: "Chief Technology Officer",
    role: "Metro Rail Corporation",
  },
  {
    quote: "Their safety intelligence system has helped us achieve regulatory compliance while improving worker safety across our infrastructure projects.",
    author: "Safety & Compliance Head",
    role: "Government Infrastructure Organization",
  },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        title="What Our Clients Say"
        subtitle="Trusted by leading railway and infrastructure organizations across India."
      />
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative p-8 rounded-xl border border-border bg-white"
          >
            <Quote className="w-8 h-8 text-primary/20 mb-4" />
            <p className="text-sm text-neutral-400 leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <div className="font-medium text-foreground text-sm">{item.author}</div>
              <div className="text-xs text-neutral-300 mt-1">{item.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
