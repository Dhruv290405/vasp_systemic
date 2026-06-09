"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CareerForm } from "@/components/forms/career-form";
import { CTASection } from "@/components/sections/cta";

type Position = { id: string; title: string; department: string; location: string; type: "full-time" | "part-time" | "contract" | "internship"; description: string };

const typeColors: Record<string, "primary" | "secondary" | "success" | "warning" | "neutral"> = {
  "full-time": "primary", "part-time": "secondary", "contract": "warning", "internship": "success",
};

export default function ApplyPage() {
  const params = useParams();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const position = positions.find((p) => p.id === params.id);

  if (!position && !loading) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Position not found</h1>
        <Link href="/careers" className="mt-4 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers</Button>
        </Link>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="pt-40 pb-20 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Careers
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={typeColors[position.type]}>{position.type}</Badge>
              <span className="text-sm text-white/60">{position.department}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{position.title}</h1>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span>{position.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-xl border border-border bg-white shadow-sm">
            <CareerForm positionId={position.id} positionTitle={position.title} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
