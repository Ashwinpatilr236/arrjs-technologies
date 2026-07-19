/*
# Create newsletter table for ARRJS Technologies email subscriptions

1. New Tables
- `newsletter`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — subscriber email
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `newsletter`.
- Allow anon + authenticated INSERT only (public subscription form).
- No SELECT/UPDATE/DELETE for anon — only service role can manage subscribers.
*/

CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter;
CREATE POLICY "anon_insert_newsletter" ON newsletter FOR INSERT
  TO anon, authenticated WITH CHECK (true);
