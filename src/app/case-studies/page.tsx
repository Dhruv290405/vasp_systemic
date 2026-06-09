"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, BarChart3 } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { CTASection } from "@/components/sections/cta";

const iconMap: Record<string, any> = { TrendingUp, Clock, Shield, BarChart3 };
const iconKeys = ["TrendingUp", "Clock", "Shield", "BarChart3"];

const fallbackStudies = [
  {
    title: "Predictive Maintenance for Indian Railways Locomotive Fleet",
    client: "Indian Railways", industry: "Railway",
    problem: "Indian Railways faced frequent unscheduled downtime due to locomotive failures...",
    solution: "Implemented VASP Predictive Maintenance platform with IoT sensors on critical locomotive components...",
    technology: ["IoT Sensors", "Machine Learning", "Edge Computing", "Real-time Analytics", "Cloud Platform"],
    implementation: "Deployed across 500+ locomotives over 12 months...",
    results: "60% reduction in unplanned failures, 45% decrease in maintenance costs...",
    impact: "The solution transformed maintenance operations from reactive to predictive...",
    metrics: { "Failures Reduced": "60%", "Cost Savings": "45%", "Availability": "99%", "ROI": "300% in 18 months" },
    gradient: "from-primary/20 to-primary/5",
    iconName: "TrendingUp",
  },
  {
    title: "IoT-Based Intelligent Coach Monitoring for Metro Rail",
    client: "Metro Rail Corporation", industry: "Metro Rail",
    problem: "Metro operations lacked real-time visibility into coach conditions...",
    solution: "Deployed comprehensive IoT sensor network across metro coaches...",
    technology: ["IoT Sensors", "Edge Gateways", "Cloud Analytics", "Mobile Dashboard", "Automated Alerts"],
    implementation: "Implemented across 200+ metro coaches...",
    results: "40% energy savings, 35% reduction in maintenance interventions...",
    impact: "Enhanced passenger experience with optimal climate control...",
    metrics: { "Energy Savings": "40%", "Maintenance Reduction": "35%", "Passenger Satisfaction": "+28%", "Response Time": "-60%" },
    gradient: "from-secondary/20 to-secondary/5",
    iconName: "Clock",
  },
  {
    title: "AI-Powered Safety Intelligence for Level Crossing Protection",
    client: "Government Railway Organization", industry: "Railway Safety",
    problem: "Level crossings faced high accident rates due to unauthorized crossing...",
    solution: "Implemented VASP Safety Intelligence system with AI computer vision cameras...",
    technology: ["Computer Vision", "Radar Sensors", "AI/ML", "Edge Processing", "Automated Alerts"],
    implementation: "Deployed at 150 high-risk level crossings...",
    results: "70% reduction in safety incidents, 90% faster incident response...",
    impact: "The system has prevented numerous potential accidents...",
    metrics: { "Incident Reduction": "70%", "Response Time": "-90%", "Compliance": "100%", "Sites Covered": "150+" },
    gradient: "from-primary/20 to-secondary/5",
    iconName: "Shield",
  },
  {
    title: "Comprehensive Asset Monitoring for Freight Rail Operations",
    client: "National Freight Rail Operator", industry: "Freight Rail",
    problem: "Freight rail operator struggled with asset tracking and cargo security...",
    solution: "End-to-end asset monitoring platform with GPS tracking and condition sensors...",
    technology: ["GPS Tracking", "Condition Monitoring", "Predictive Analytics", "Geofencing", "Inventory Management"],
    implementation: "Deployed across 10,000+ freight wagons and 200 locomotives...",
    results: "30% increase in asset utilization, 20% reduction in transit times...",
    impact: "Transformed freight operations with real-time visibility...",
    metrics: { "Asset Utilization": "+30%", "Transit Time": "-20%", "Theft Incidents": "-50%", "ROI": "250%" },
    gradient: "from-blue-100 to-blue-50",
    iconName: "BarChart3",
  },
];

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState(fallbackStudies);

  useEffect(() => {
    fetch("/api/case-studies")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const mapped = data
            .filter((p: any) => p.published)
            .map((p: any) => ({
              title: p.title,
              client: p.client || "",
              industry: p.industry || "",
              problem: p.problem || "",
              solution: p.solution || "",
              technology: p.technology || [],
              implementation: p.implementation || "",
              results: p.results || "",
              impact: p.impact || "",
              metrics: p.metrics || {},
              gradient: "from-primary/20 to-primary/5",
              iconName: iconKeys[Math.floor(Math.random() * iconKeys.length)],
            }));
          if (mapped.length) setStudies(prev => {
            const existingTitles = new Set(prev.map(p => p.title));
            const newItems = mapped.filter(p => !existingTitles.has(p.title));
            return [...prev, ...newItems];
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Case Studies</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real-world impact delivered through our enterprise solutions across railway and industrial sectors.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="space-y-16">
          {studies.map((study) => {
            const Icon = iconMap[study.iconName] || TrendingUp;
            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden border border-border bg-white"
              >
                <div className={`h-48 bg-gradient-to-br ${study.gradient} p-8 flex items-end`}>
                  <div>
                    <div className="text-sm font-medium text-secondary mb-2">{study.client}</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{study.title}</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div><h3 className="font-semibold text-foreground mb-2">Problem</h3><p className="text-sm text-neutral-400 leading-relaxed">{study.problem}</p></div>
                      <div><h3 className="font-semibold text-foreground mb-2">Solution</h3><p className="text-sm text-neutral-400 leading-relaxed">{study.solution}</p></div>
                      <div><h3 className="font-semibold text-foreground mb-2">Technology Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {study.technology.map((t: string) => (
                            <span key={t} className="px-3 py-1 text-xs rounded-lg bg-neutral text-neutral-500 border border-border">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div><h3 className="font-semibold text-foreground mb-2">Implementation</h3><p className="text-sm text-neutral-400 leading-relaxed">{study.implementation}</p></div>
                    </div>
                    <div className="space-y-6">
                      <div><h3 className="font-semibold text-foreground mb-2">Results</h3><p className="text-sm text-neutral-400 leading-relaxed">{study.results}</p></div>
                      <div><h3 className="font-semibold text-foreground mb-2">Impact</h3><p className="text-sm text-neutral-400 leading-relaxed">{study.impact}</p></div>
                      <div><h3 className="font-semibold text-foreground mb-3">Key Metrics</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(study.metrics).map(([key, val]) => (
                            <div key={key} className="p-3 rounded-lg bg-neutral border border-border">
                              <div className="text-lg font-bold text-primary">{val as string}</div>
                              <div className="text-xs text-neutral-400">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      <CTASection />
    </>
  );
}
