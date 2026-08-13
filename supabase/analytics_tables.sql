-- ============================================================
-- VTab Square — Visitor Analytics Tables
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────
-- 1. visitor_sessions
--    One row per browser session
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.visitor_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id      TEXT NOT NULL,          -- persisted in localStorage
  session_id      TEXT NOT NULL UNIQUE,   -- persisted in sessionStorage
  ip_address      TEXT,
  country         TEXT,
  country_code    TEXT,
  region          TEXT,
  city            TEXT,
  latitude        NUMERIC(9,6),
  longitude       NUMERIC(9,6),
  timezone        TEXT,
  browser         TEXT,
  browser_version TEXT,
  os              TEXT,
  device_type     TEXT DEFAULT 'Desktop', -- Desktop | Mobile | Tablet
  screen_width    INTEGER,
  screen_height   INTEGER,
  language        TEXT,
  traffic_source  TEXT,                   -- Google | Direct | LinkedIn | etc.
  referrer        TEXT,
  landing_page    TEXT,
  page_count      INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  last_seen       TIMESTAMPTZ DEFAULT NOW(),
  ended_at        TIMESTAMPTZ
);

-- RLS
ALTER TABLE public.visitor_sessions ENABLE ROW LEVEL SECURITY;

-- Public visitors can INSERT their own session
CREATE POLICY "anon_insert_sessions" ON public.visitor_sessions
  FOR INSERT TO anon WITH CHECK (true);

-- Public visitors can UPDATE only their own session (heartbeat / page_count / duration)
CREATE POLICY "anon_update_own_session" ON public.visitor_sessions
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin users (admin dashboard) can SELECT
CREATE POLICY "auth_select_sessions" ON public.visitor_sessions
  FOR SELECT TO authenticated USING (true);


-- ─────────────────────────────────────────────
-- 2. page_views
--    One row per page/tab visited within a session
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.page_views (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    TEXT NOT NULL REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE,
  visitor_id    TEXT NOT NULL,
  page_name     TEXT NOT NULL,   -- 'home' | 'products' | 'solutions' | etc.
  page_title    TEXT,
  entered_at    TIMESTAMPTZ DEFAULT NOW(),
  exited_at     TIMESTAMPTZ,
  time_on_page  INTEGER          -- seconds
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_page_views" ON public.page_views
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_update_page_views" ON public.page_views
  FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "auth_select_page_views" ON public.page_views
  FOR SELECT TO authenticated USING (true);


-- ─────────────────────────────────────────────
-- 3. analytics_events
--    Button clicks, form opens, chat interactions
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT NOT NULL REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE,
  visitor_id  TEXT NOT NULL,
  event_name  TEXT NOT NULL,  -- 'demo_modal_open' | 'chatbot_open' | 'product_click' | etc.
  event_data  JSONB,          -- arbitrary extra metadata
  page_name   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_events" ON public.analytics_events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "auth_select_events" ON public.analytics_events
  FOR SELECT TO authenticated USING (true);


-- ─────────────────────────────────────────────
-- Indexes for dashboard query performance
-- ─────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON public.visitor_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_last_seen  ON public.visitor_sessions(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON public.visitor_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_session  ON public.page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_entered  ON public.page_views(entered_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_session      ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_name         ON public.analytics_events(event_name);


-- ─────────────────────────────────────────────
-- Helper RPC: increment page_count on a session
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.increment_session_page_count(p_session_id TEXT)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE public.visitor_sessions
  SET page_count = page_count + 1,
      last_seen  = NOW()
  WHERE session_id = p_session_id;
$$;

-- Grant anon execution so the frontend can call it
GRANT EXECUTE ON FUNCTION public.increment_session_page_count(TEXT) TO anon;
