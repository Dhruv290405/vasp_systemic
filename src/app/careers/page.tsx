"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Heart, Users, TrendingUp, GraduationCap, Shield, ArrowRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta";

const benefits = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance and wellness programs." },
  { icon: TrendingUp, title: "Growth Opportunities", description: "Continuous learning, certifications, and career advancement." },
  { icon: Users, title: "Collaborative Culture", description: "Work with top talent in a supportive environment." },
  { icon: GraduationCap, title: "Learning & Development", description: "Access to courses, conferences, and training programs." },
  { icon: Shield, title: "Job Security", description: "Stable career with a rapidly growing enterprise company." },
  { icon: Clock, title: "Flexible Work", description: "Flexible hours and remote work options." },
];

const typeColors: Record<string, "primary" | "secondary" | "success" | "warning" | "neutral"> = {
  "full-time": "primary", "part-time": "secondary", "contract": "warning", "internship": "success",
};

type Position = { id: string; title: string; department: string; location: string; type: "full-time" | "part-time" | "contract" | "internship"; description: string };

export default function CareersPage() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    fetch("/api/careers/positions")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const mapped = data
            .filter((p: any) => p.published)
            .map((p: any) => ({
              id: p.id,
              title: p.title,
              department: p.department || "Engineering",
              location: p.location || "India",
              type: (p.type || "full-time") as "full-time" | "part-time" | "contract" | "internship",
              description: p.description || "",
            }));
            if (mapped.length) setPositions(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Careers at VASP Systemic</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Join us in building India&apos;s intelligent railway future. We&apos;re looking for passionate minds to transform transportation.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper className="bg-neutral">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Join Us?</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">Be part of a mission-driven team building technology that moves India forward.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-shadow"
            >
              <benefit.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-neutral-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionHeader title="Open Positions" subtitle="Explore current opportunities and find your place in our team." />
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {positions.map((position, index) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-xl border border-border bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{position.title}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{position.department}</p>
                </div>
                <Badge variant={typeColors[position.type]}>{position.type}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-400 mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {position.location}</span>
              </div>
              <p className="text-sm text-neutral-400 mb-4">{position.description}</p>
              <Link href={`/careers/apply/${position.id}`}>
                <Button variant="outline" size="sm" className="group">
                  Apply Now
                  <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
