-- ============================================================
-- Final Fix: Disable RLS on analytics tables
-- These tables contain no sensitive personal data.
-- Admin dashboard is already protected by Supabase Auth login.
-- ============================================================

ALTER TABLE public.visitor_sessions  DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views         DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events   DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies (no longer needed)
DROP POLICY IF EXISTS "anon_insert_sessions"    ON public.visitor_sessions;
DROP POLICY IF EXISTS "anon_update_own_session" ON public.visitor_sessions;
DROP POLICY IF EXISTS "auth_select_sessions"    ON public.visitor_sessions;
DROP POLICY IF EXISTS "public_insert_sessions"  ON public.visitor_sessions;
DROP POLICY IF EXISTS "public_update_sessions"  ON public.visitor_sessions;
DROP POLICY IF EXISTS "anon_insert_page_views"  ON public.page_views;
DROP POLICY IF EXISTS "anon_update_page_views"  ON public.page_views;
DROP POLICY IF EXISTS "auth_select_page_views"  ON public.page_views;
DROP POLICY IF EXISTS "public_insert_page_views" ON public.page_views;
DROP POLICY IF EXISTS "public_update_page_views" ON public.page_views;
DROP POLICY IF EXISTS "anon_insert_events"      ON public.analytics_events;
DROP POLICY IF EXISTS "auth_select_events"      ON public.analytics_events;
DROP POLICY IF EXISTS "public_insert_events"    ON public.analytics_events;
