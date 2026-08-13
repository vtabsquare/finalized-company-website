-- Run this SQL in your Supabase Dashboard → SQL Editor
-- URL: https://supabase.com/dashboard/project/jqxqujrldlutwgkaqwkb/sql/new

-- ============================================================
-- TABLE: demo_requests (captures all "Book Executive Demo" bookings)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     text NOT NULL,
  work_email    text NOT NULL,
  company_name  text,
  team_size     text,
  interest_area text,
  preferred_date text DEFAULT 'Flexible',
  message       text,
  created_at    timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (submit form)
CREATE POLICY "Allow anon insert" ON public.demo_requests
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated + service_role to SELECT (admin dashboard)
CREATE POLICY "Allow service select" ON public.demo_requests
  FOR SELECT TO service_role USING (true);

CREATE POLICY "Allow authenticated select" ON public.demo_requests
  FOR SELECT TO authenticated USING (true);

-- Allow service_role to DELETE (admin dashboard cleanup)
CREATE POLICY "Allow service delete" ON public.demo_requests
  FOR DELETE TO service_role USING (true);

-- ============================================================
-- TABLE: subscribers (captures all newsletter signups from footer)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email        text NOT NULL UNIQUE,
  name         text,
  subscribed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (subscribe)
CREATE POLICY "Allow anon insert sub" ON public.subscribers
  FOR INSERT TO anon WITH CHECK (true);

-- Allow service_role to SELECT (admin dashboard)
CREATE POLICY "Allow service select sub" ON public.subscribers
  FOR SELECT TO service_role USING (true);

CREATE POLICY "Allow authenticated select sub" ON public.subscribers
  FOR SELECT TO authenticated USING (true);

-- Allow service_role to DELETE (admin dashboard cleanup)  
CREATE POLICY "Allow service delete sub" ON public.subscribers
  FOR DELETE TO service_role USING (true);

-- ============================================================
-- Done! Both tables created.
-- ============================================================
