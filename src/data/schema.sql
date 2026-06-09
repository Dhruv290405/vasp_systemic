-- VASP Systemic Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('general', 'demo', 'business', 'partnership')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Demo requests table
CREATE TABLE demo_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(255) NOT NULL,
  job_title VARCHAR(255),
  solution VARCHAR(255) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_demo_requests_status ON demo_requests(status);
CREATE INDEX idx_demo_requests_created_at ON demo_requests(created_at DESC);

-- Career applications table
CREATE TABLE career_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  position_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_career_applications_position ON career_applications(position_id);
CREATE INDEX idx_career_applications_status ON career_applications(status);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  image_url TEXT,
  dashboard_url TEXT,
  category VARCHAR(255) NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_published ON products(published);

-- Case studies table
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  client VARCHAR(255) NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  technology TEXT[] DEFAULT '{}',
  implementation TEXT NOT NULL,
  results TEXT NOT NULL,
  impact TEXT NOT NULL,
  metrics JSONB DEFAULT '{}',
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_published ON case_studies(published);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Career positions table
CREATE TABLE career_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  department VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_career_positions_department ON career_positions(department);
CREATE INDEX idx_career_positions_published ON career_positions(published);

-- Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_positions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read for published content
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published products"
  ON products FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published case studies"
  ON case_studies FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published positions"
  ON career_positions FOR SELECT
  USING (published = true);

-- RLS Policies: Public insert for forms
CREATE POLICY "Public can insert contacts"
  ON contacts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert demo requests"
  ON demo_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert newsletter subscribers"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert career applications"
  ON career_applications FOR INSERT
  WITH CHECK (true);

-- RLS Policies: Admin full access
CREATE POLICY "Admin full access contacts"
  ON contacts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access demo_requests"
  ON demo_requests FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access career_applications"
  ON career_applications FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access blog_posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access case_studies"
  ON case_studies FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access newsletter_subscribers"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access career_positions"
  ON career_positions FOR ALL
  USING (auth.role() = 'authenticated');
