/*
# Create inquiries table for ARRJS Technologies contact form

1. New Tables
- `inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email
  - `phone` (text, nullable) — optional phone number
  - `service` (text, nullable) — which service they're interested in
  - `location` (text, nullable) — their city/area
  - `message` (text, not null) — the inquiry body
  - `status` (text, default 'new') — inquiry status for tracking
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `inquiries`.
- Allow anon + authenticated INSERT only (public contact form).
- No SELECT/UPDATE/DELETE for anon — only service role can read/manage inquiries.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  location text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);
