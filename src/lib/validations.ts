import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits").or(z.literal("")).optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["general", "demo", "business", "partnership"]),
});

export const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().optional(),
  solution: z.string().min(1, "Please select a solution"),
  message: z.string().optional(),
});

export const careerApplicationSchema = z.object({
  positionId: z.string().min(1, "Please select a position"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  resumeUrl: z.string().optional(),
  coverLetter: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(2, "Author name is required"),
  image_url: z.string().url("Must be a valid URL"),
  published: z.boolean().default(false),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;
export type CareerApplicationFormData = z.infer<typeof careerApplicationSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
