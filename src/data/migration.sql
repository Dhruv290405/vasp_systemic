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
