"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function SectionWrapper({ children, className, id, dark }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 lg:py-32",
        dark && "bg-neutral",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  center = true,
  light = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl mb-16",
        center && "mx-auto text-center"
      )}
    >
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
        light ? "text-white" : "text-foreground"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg md:text-xl leading-relaxed",
          light ? "text-white/80" : "text-neutral-400"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function SectionDivider() {
  return <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-6" />;
}
