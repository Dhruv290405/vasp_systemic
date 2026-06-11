-- Add extended_data JSONB column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS extended_data JSONB DEFAULT '{}';

-- Create products storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anonymous users to upload files to products bucket
CREATE POLICY IF NOT EXISTS "anon_insert_products" ON storage.objects
FOR INSERT TO anon
WITH CHECK (bucket_id = 'products');

-- Allow anonymous users to read files from products bucket
CREATE POLICY IF NOT EXISTS "anon_select_products" ON storage.objects
FOR SELECT TO anon
USING (bucket_id = 'products');

-- Page views analytics table
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT DEFAULT '',
  user_agent TEXT DEFAULT '',
  ip_hash TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Allow anon key to insert page views (no auth needed for tracking)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "anon_insert_page_views" ON page_views
FOR INSERT TO anon
WITH CHECK (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
