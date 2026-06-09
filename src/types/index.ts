export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  benefits: string[];
  image_url: string;
  dashboard_url?: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  problem: string;
  solution: string;
  technology: string[];
  implementation: string;
  results: string;
  impact: string;
  metrics: Record<string, string>;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  description: string;
  requirements: string[];
  responsibilities: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  type: "general" | "demo" | "business" | "partnership";
  created_at: string;
}

export interface CareerApplication {
  id: string;
  position_id: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  created_at: string;
}

export interface Solution {
  title: string;
  slug: string;
  description: string;
  overview: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  architecture: string;
  impact: string;
  icon: string;
}

export interface Industry {
  name: string;
  slug: string;
  description: string;
  challenges: string[];
  solution: string;
  benefits: string[];
  roi: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}
