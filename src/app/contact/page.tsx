"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { DemoRequestForm } from "@/components/forms/demo-request-form";
import { COMPANY } from "@/lib/constants";

function ContactContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const isDemo = type === "demo";

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {isDemo ? "Request a Demo" : "Contact Us"}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {isDemo
                ? "See our solutions in action. Schedule a personalized demo with our team."
                : "Get in touch with our team for inquiries, partnerships, or business discussions."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {isDemo ? "Let Us Show You What&apos;s Possible" : "Let&apos;s Start a Conversation"}
                </h2>
                <p className="text-neutral-400 mb-8">
                  {isDemo
                    ? "Fill in your details and our team will reach out to schedule a personalized demo tailored to your requirements."
                    : "Whether you have a question about our solutions, want to discuss a partnership, or need support — we&apos;re here to help."}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Email</div>
                      <a href={`mailto:${COMPANY.email}`} className="text-sm text-neutral-400 hover:text-secondary transition-colors">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Phone</div>
                      <span className="text-sm text-neutral-400">{COMPANY.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Location</div>
                      <span className="text-sm text-neutral-400">{COMPANY.address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Business Hours</div>
                      <span className="text-sm text-neutral-400">Monday - Friday: 9:00 AM - 6:00 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-xl bg-neutral border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Looking for something else?</h3>
                  <div className="space-y-3">
                    <a href="/solutions" className="flex items-center justify-between p-3 rounded-lg bg-white hover:bg-neutral transition-colors">
                      <span className="text-sm text-neutral-400">Explore our solutions</span>
                      <ArrowRight className="w-4 h-4 text-neutral-300" />
                    </a>
                    <a href="/case-studies" className="flex items-center justify-between p-3 rounded-lg bg-white hover:bg-neutral transition-colors">
                      <span className="text-sm text-neutral-400">Read case studies</span>
                      <ArrowRight className="w-4 h-4 text-neutral-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-xl border border-border bg-white shadow-sm">
                {isDemo ? <DemoRequestForm /> : <ContactForm />}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14719.768106216084!2d75.8573!3d22.7206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d4a6f1c9a3d%3A0x7e5f5e5a5b5a5b5a!2sPrakash%20Tower!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VASP Systemic - Prakash Tower, Indore"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-neutral-400">Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
