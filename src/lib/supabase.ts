import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export type Inquiry = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  location?: string;
  message: string;
  status?: string;
  created_at?: string;
};

export type NewsletterSub = {
  id?: string;
  email: string;
  created_at?: string;
};
