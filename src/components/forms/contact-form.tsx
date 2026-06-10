"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  defaultType?: string;
}

export function ContactForm({ defaultType }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: (defaultType as ContactFormData["type"]) || "general" },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handled
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent Successfully</h3>
        <p className="text-neutral-400">We will get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="cf_name">Full Name *</Label>
          <Input id="cf_name" {...register("name")} placeholder="Your full name" />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf_email">Email *</Label>
          <Input id="cf_email" type="email" {...register("email")} placeholder="your@email.com" />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="cf_phone">Phone</Label>
          <Input id="cf_phone" type="tel" maxLength={10} {...register("phone")} placeholder="10-digit mobile number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf_company">Company</Label>
          <Input id="cf_company" {...register("company")} placeholder="Company name" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cf_type">Inquiry Type *</Label>
        <Select id="cf_type" {...register("type")} defaultValue={defaultType || "general"}>
          <option value="general">General Inquiry</option>
          <option value="demo">Request Demo</option>
          <option value="business">Business Inquiry</option>
          <option value="partnership">Partnership</option>
        </Select>
        {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cf_message">Message *</Label>
        <Textarea id="cf_message" {...register("message")} placeholder="Tell us about your requirements..." />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
