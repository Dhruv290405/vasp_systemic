"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Upload, FileText, X } from "lucide-react";
import { careerApplicationSchema, type CareerApplicationFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CareerFormProps {
  positionId: string;
  positionTitle: string;
}

export function CareerForm({ positionId, positionTitle }: CareerFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CareerApplicationFormData>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: { positionId, resumeUrl: "" },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const maxSize = 5 * 1024 * 1024;
    if (selected.size > maxSize) {
      setUploadError("File size must be under 5MB");
      return;
    }

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedTypes.includes(selected.type)) {
      setUploadError("Only PDF, DOC, DOCX files are allowed");
      return;
    }

    setFile(selected);
    setUploadError("");
  };

  const removeFile = () => {
    setFile(null);
    setValue("resumeUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: CareerApplicationFormData) => {
    if (!file) {
      setUploadError("Please select a resume file");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const formData = new FormData();
      formData.append("file", file, fileName);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/resumes/${fileName}`,
        {
          method: "POST",
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error("Upload failed: " + errText);
      }

      data.resumeUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${fileName}`;

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error("Application submission failed: " + errText);
      }

      setSubmitted(true);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed. Check console for details.");
    } finally {
      setUploading(false);
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
        <h3 className="text-xl font-semibold text-foreground mb-2">Application Submitted</h3>
        <p className="text-neutral-400">Thank you for applying to {positionTitle}. We&apos;ll review your application and get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...register("positionId")} />
      <div className="p-4 rounded-lg bg-neutral border border-border mb-4">
        <p className="text-sm text-neutral-400">Applying for: <span className="font-medium text-foreground">{positionTitle}</span></p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="ca_name">Full Name *</Label>
          <Input id="ca_name" {...register("name")} placeholder="Your full name" />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ca_email">Email *</Label>
          <Input id="ca_email" type="email" {...register("email")} placeholder="your@email.com" />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ca_phone">Phone *</Label>
        <Input id="ca_phone" type="tel" {...register("phone")} placeholder="+91 XXXXXXXXXX" />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Resume Upload *</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 rounded-lg border-2 border-dashed border-border bg-neutral text-center cursor-pointer hover:border-primary/50 hover:bg-neutral-100 transition-all group"
          >
            <Upload className="w-8 h-8 text-neutral-300 mx-auto mb-3 group-hover:text-primary transition-colors" />
            <p className="text-sm text-neutral-400">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-300 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        ) : (
          <div className="p-4 rounded-lg border border-border bg-neutral flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button type="button" onClick={removeFile} className="p-1 hover:bg-neutral-200 rounded transition-colors">
              <X className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        )}
        {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
        {errors.resumeUrl && <p className="text-xs text-red-500">{errors.resumeUrl.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ca_cover">Cover Letter</Label>
        <Textarea id="ca_cover" {...register("coverLetter")} placeholder="Tell us why you're a great fit..." />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting || uploading}>
        {uploading || isSubmitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading & Submitting...</>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
