-- Add extended_data JSONB column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS extended_data JSONB DEFAULT '{}';
