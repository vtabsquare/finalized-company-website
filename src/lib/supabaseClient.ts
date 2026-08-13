/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Supabase rejects empty values during module initialization. Local previews
// intentionally use harmless loopback values so the static website can render
// without private production credentials; data hooks already fall back to the
// bundled product and innovation content when requests are unavailable.
const localPreviewUrl = 'http://127.0.0.1:54321';
const localPreviewKey = 'local-preview-anon-key';
const clientUrl = isSupabaseConfigured ? supabaseUrl : localPreviewUrl;
const clientAnonKey = isSupabaseConfigured ? supabaseAnonKey : localPreviewKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.info('Supabase is not configured. Running with bundled local preview content.');
}

// Regular client: used for reading public data (products, employees, innovations)
export const supabase = createClient(clientUrl, clientAnonKey);

// Service client: used for writing leads (demo_requests, subscribers)
// Uses the service role key to bypass RLS insert policies
export const supabaseService = createClient(clientUrl, isSupabaseConfigured ? (supabaseServiceKey || supabaseAnonKey) : localPreviewKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});
