"use client";

import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/sections/animated-counter";

export function StatsSection() {
  return (
    <section className="py-20 bg-neutral">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
