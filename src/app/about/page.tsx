"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb, Award, Shield, Users } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const values = [
  { icon: Heart, title: "Integrity", description: "Uncompromising ethical standards in every solution we deliver." },
  { icon: Lightbulb, title: "Innovation", description: "Continuous pursuit of technological advancement and creative solutions." },
  { icon: Users, title: "Collaboration", description: "Working closely with clients to understand and solve their unique challenges." },
  { icon: Shield, title: "Excellence", description: "Commitment to the highest quality standards in engineering and service." },
];

const timeline = [
  { year: "2020", title: "Company Founded", description: "VASP Systemic established with a vision to transform railway operations." },
  { year: "2021", title: "First Enterprise Contract", description: "Secured first major contract with Indian Railways for IoT monitoring." },
  { year: "2022", title: "AI Platform Launch", description: "Launched AI-powered predictive maintenance and analytics platform." },
  { year: "2023", title: "Expanded Operations", description: "Expanded to metro rail and industrial IoT sectors across India." },
  { year: "2024", title: "Safety Systems Division", description: "Launched dedicated safety intelligence and computer vision solutions." },
  { year: "2025", title: "Pan-India Presence", description: "Established operations across multiple states with 50+ enterprise clients." },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About VASP Systemic</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Pioneering the future of railway technology through AI, IoT, and intelligent systems.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Company Overview</h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              VASP Systemic is a leading enterprise technology company specializing in AI-powered IoT solutions for railway operations, safety systems, and smart infrastructure. We combine deep domain expertise with cutting-edge technology to deliver transformative solutions for Indian Railways, Metro Rail Corporations, and Government Infrastructure Organizations.
            </p>
            <p className="text-neutral-400 leading-relaxed mb-4">
              Our team of engineers, data scientists, and railway domain experts work tirelessly to build solutions that enhance safety, improve efficiency, and reduce operational costs across the railway ecosystem.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              With a proven track record of enterprise deployments and a commitment to innovation, we are positioning India's railway infrastructure for the future.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Enterprise Clients", value: "50+" },
              { label: "Projects Delivered", value: "100+" },
              { label: "Team Members", value: "200+" },
              { label: "Years Experience", value: "5+" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl border border-border bg-neutral text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-neutral-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <section className="py-20 bg-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-white border border-border"
            >
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-neutral-400 leading-relaxed">
                To revolutionize railway operations through intelligent technology solutions that enhance safety, improve efficiency, and enable data-driven decision-making across India's railway infrastructure.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-xl bg-white border border-border"
            >
              <Eye className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-neutral-400 leading-relaxed">
                To be India's most trusted railway technology partner, setting global benchmarks for AI-driven railway safety, efficiency, and innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">The principles that guide every solution we build and every partnership we forge.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-white text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-neutral-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <section className="py-20 bg-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Key milestones in our growth and evolution.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-0 md:pl-20"
                >
                  <div className="hidden md:flex absolute left-4 top-1 w-8 h-8 rounded-full bg-primary text-white items-center justify-center text-sm font-bold -translate-x-1/2">
                    {item.year.slice(2)}
                  </div>
                  <div className="md:hidden text-sm font-bold text-primary mb-1">{item.year}</div>
                  <div className="p-6 rounded-xl bg-white border border-border">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <div className="text-center max-w-3xl mx-auto">
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Certifications & Compliance</h2>
          <p className="text-neutral-400 mb-8">
            We adhere to the highest industry standards and regulatory requirements. Our solutions are built to meet enterprise compliance needs including ISO standards, railway safety regulations, and government security protocols.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["ISO 9001:2015", "ISO 27001", "Railway Safety Certified", "Government Empaneled", "MSME Registered"].map((cert) => (
              <span key={cert} className="px-4 py-2 rounded-full bg-neutral text-sm font-medium text-neutral-500 border border-border">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Want to Know More?</h2>
          <p className="text-white/70 mb-8">Get in touch with our team to learn how we can transform your railway operations.</p>
          <Link href="/contact">
            <Button variant="secondary" size="xl">Contact Us Today</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
