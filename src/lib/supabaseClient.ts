/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Please check your .env file.");
}

// Regular client: used for reading public data (products, employees, innovations)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Service client: used for writing leads (demo_requests, subscribers)
// Uses the service role key to bypass RLS insert policies
export const supabaseService = createClient(supabaseUrl || '', supabaseServiceKey || supabaseAnonKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
