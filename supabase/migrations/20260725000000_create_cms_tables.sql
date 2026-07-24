-- Migration: Create CMS Tables for Blogs, Products, Testimonials, Site Settings

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'General',
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  read_time text DEFAULT '5 min read',
  cover_image text,
  status text NOT NULL DEFAULT 'published', -- 'published' | 'draft'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Products / Pricing Cards Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Digital Product',
  description text NOT NULL DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  original_price numeric,
  badge text,
  features text[] DEFAULT '{}',
  image_url text,
  download_url text,
  whatsapp_link text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text,
  avatar text,
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  is_featured boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 4. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Security & RLS Policies
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ access
DROP POLICY IF EXISTS "Public can view published blogs" ON blogs;
CREATE POLICY "Public can view published blogs" ON blogs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view products" ON products;
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Authenticated / Admin WRITE access
DROP POLICY IF EXISTS "Admin can manage blogs" ON blogs;
CREATE POLICY "Admin can manage blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage products" ON products;
CREATE POLICY "Admin can manage products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage testimonials" ON testimonials;
CREATE POLICY "Admin can manage testimonials" ON testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can manage site settings" ON site_settings;
CREATE POLICY "Admin can manage site settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
