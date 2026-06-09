"use client";

import { useCounter } from "@/hooks/useCounter";

export function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-primary">
        {count}
        <span className="text-secondary">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-neutral-400 font-medium">{label}</p>
    </div>
  );
}
