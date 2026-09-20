/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
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

// Compatibility alias for existing lead and admin UI calls. Browser code must
// only use the public anon/publishable key, never a Supabase service-role key.
// Database RLS and server-side functions enforce authorization.
export const supabaseService = supabase;
