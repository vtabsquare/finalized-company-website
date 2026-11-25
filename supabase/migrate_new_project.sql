CREATE TABLE IF NOT EXISTS public."ai_employees" (
  "id" text NOT NULL,
  "title" text NOT NULL,
  "role" text NOT NULL,
  "description" text NOT NULL,
  "icon" text,
  "badge" text,
  "metrics" jsonb DEFAULT '[]'::jsonb,
  "capabilities" jsonb DEFAULT '[]'::jsonb,
  "tech_stack" jsonb DEFAULT '[]'::jsonb,
  "created_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE public."ai_employees" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."analytics_events" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "session_id" text NOT NULL,
  "visitor_id" text NOT NULL,
  "event_name" text NOT NULL,
  "event_data" jsonb,
  "page_name" text,
  "created_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE public."analytics_events" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."career_applications" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "full_name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "role_title" text,
  "linkedin_url" text,
  "resume_url" text,
  "message" text,
  "created_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE public."career_applications" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."career_roles" (
  "id" text NOT NULL,
  "title" text NOT NULL,
  "department" text NOT NULL,
  "location" text NOT NULL,
  "type" text NOT NULL,
  "experience" text NOT NULL,
  "description" text NOT NULL,
  "requirements" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE public."career_roles" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."contact_inquiries" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "full_name" text NOT NULL,
  "work_email" text,
  "company_name" text,
  "phone" text,
  "message" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  "email" text,
  "subject" text,
  PRIMARY KEY ("id")
);

ALTER TABLE public."contact_inquiries" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."demo_requests" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "full_name" text NOT NULL,
  "work_email" text,
  "company_name" text,
  "team_size" text,
  "interest_area" text,
  "preferred_date" text DEFAULT 'Flexible'::text,
  "message" text,
  "created_at" timestamp with time zone DEFAULT now(),
  "email" text,
  PRIMARY KEY ("id")
);

ALTER TABLE public."demo_requests" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."innovations" (
  "id" text NOT NULL,
  "title" text NOT NULL,
  "category" text,
  "description" text NOT NULL,
  "status" text,
  "readiness" text,
  "metrics" text,
  "tags" jsonb DEFAULT '[]'::jsonb,
  "created_at" timestamp with time zone DEFAULT now(),
  "tagline" text,
  "icon" text,
  "highlights" jsonb,
  PRIMARY KEY ("id")
);

ALTER TABLE public."innovations" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."iot_content" (
  "id" text NOT NULL,
  "header_badge" text,
  "header_title" text,
  "header_highlight" text,
  "header_description" text,
  "reference_app_badge" text,
  "reference_app_title" text,
  "benefits" jsonb DEFAULT '[]'::jsonb,
  "capabilities" jsonb DEFAULT '[]'::jsonb,
  "signals" jsonb DEFAULT '[]'::jsonb,
  "updated_at" timestamp with time zone DEFAULT now(),
  "demo_video_url" text,
  PRIMARY KEY ("id")
);

ALTER TABLE public."iot_content" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."page_views" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "session_id" text NOT NULL,
  "visitor_id" text NOT NULL,
  "page_name" text NOT NULL,
  "page_title" text,
  "entered_at" timestamp with time zone DEFAULT now(),
  "exited_at" timestamp with time zone,
  "time_on_page" integer,
  PRIMARY KEY ("id")
);

ALTER TABLE public."page_views" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."product_dashboards" (
  "id" text DEFAULT (gen_random_uuid())::text NOT NULL,
  "product_id" text DEFAULT 'ai-reporting-platform'::text,
  "title" text NOT NULL,
  "subtitle" text DEFAULT ''::text NOT NULL,
  "category" text DEFAULT 'Retail Performance Analysis'::text NOT NULL,
  "embed_url" text NOT NULL,
  "timeframe" text DEFAULT 'Live Production Model'::text NOT NULL,
  "report_type" text DEFAULT 'Interactive BI Report'::text NOT NULL,
  "badge" text DEFAULT 'LIVE BI'::text NOT NULL,
  "metrics" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "is_live_embed" boolean DEFAULT true NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  "display_order" integer DEFAULT 1 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  PRIMARY KEY ("id")
);

ALTER TABLE public."product_dashboards" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."products" (
  "id" text NOT NULL,
  "title" text NOT NULL,
  "short_description" text,
  "full_description" text,
  "category" text,
  "subcategory" text,
  "tags" jsonb,
  "impact_metric" text,
  "key_features" jsonb,
  "tech_stack" jsonb,
  "icon_name" text,
  "featured" boolean DEFAULT true,
  "image_url" text,
  "demo_snippet" jsonb,
  "detail_content" jsonb,
  "created_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE public."products" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."subscribers" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "email" text NOT NULL,
  "name" text,
  "subscribed_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE public."subscribers" ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public."visitor_sessions" (
  "id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "visitor_id" text NOT NULL,
  "session_id" text NOT NULL,
  "ip_address" text,
  "country" text,
  "country_code" text,
  "region" text,
  "city" text,
  "latitude" numeric(9,6),
  "longitude" numeric(9,6),
  "timezone" text,
  "browser" text,
  "browser_version" text,
  "os" text,
  "device_type" text DEFAULT 'Desktop'::text,
  "screen_width" integer,
  "screen_height" integer,
  "language" text,
  "traffic_source" text,
  "referrer" text,
  "landing_page" text,
  "page_count" integer DEFAULT 1,
  "duration_seconds" integer DEFAULT 0,
  "started_at" timestamp with time zone DEFAULT now(),
  "last_seen" timestamp with time zone DEFAULT now(),
  "ended_at" timestamp with time zone,
  PRIMARY KEY ("id")
);

ALTER TABLE public."visitor_sessions" ENABLE ROW LEVEL SECURITY;


-- Content tables: public SELECT, authenticated ALL
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['products', 'product_dashboards', 'ai_employees', 'innovations', 'career_roles', 'iot_content']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public read %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Public read %I" ON public.%I FOR SELECT USING (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth all %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Auth all %I" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;

-- Lead & submission tables: public INSERT, authenticated SELECT/ALL
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['demo_requests', 'contact_inquiries', 'subscribers', 'career_applications']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public insert %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Public insert %I" ON public.%I FOR INSERT WITH CHECK (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth all %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Auth all %I" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;

-- Analytics tables: public INSERT/UPDATE, authenticated SELECT/ALL
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['visitor_sessions', 'page_views', 'analytics_events']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public insert %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Public insert %I" ON public.%I FOR INSERT WITH CHECK (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Public update %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Public update %I" ON public.%I FOR UPDATE USING (true) WITH CHECK (true)', tbl, tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth all %I" ON public.%I', tbl, tbl);
    EXECUTE format('CREATE POLICY "Auth all %I" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;

-- Storage policies for product-media and resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('product-media', 'product-media', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true) ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read product-media" ON storage.objects;
CREATE POLICY "Public read product-media" ON storage.objects FOR SELECT USING (bucket_id = 'product-media');
DROP POLICY IF EXISTS "Auth write product-media" ON storage.objects;
CREATE POLICY "Auth write product-media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'product-media') WITH CHECK (bucket_id = 'product-media');

DROP POLICY IF EXISTS "Public insert resumes" ON storage.objects;
CREATE POLICY "Public insert resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
DROP POLICY IF EXISTS "Public read resumes" ON storage.objects;
CREATE POLICY "Public read resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes');


-- =========================================================================
-- VTAB SQUARE - ANNOUNCEMENT BANNERS SETUP SCRIPT
-- Run in Supabase SQL Editor (Project: wclpchjxdglhinoazxmr)
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.announcement_banners (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id TEXT,
  badge_text TEXT NOT NULL DEFAULT 'New Application',
  headline_prefix TEXT NOT NULL DEFAULT 'Meet',
  headline_highlight TEXT NOT NULL,
  description TEXT NOT NULL,
  cta_text TEXT NOT NULL DEFAULT 'Explore Reporting Tool',
  cta_mobile_text TEXT NOT NULL DEFAULT 'Explore',
  background_image TEXT,
  theme_preset TEXT DEFAULT 'cyan-purple',
  bg_gradient TEXT,
  highlight_gradient TEXT,
  cta_gradient TEXT,
  cta_shadow TEXT,
  badge_border_class TEXT,
  badge_bg_class TEXT,
  badge_pulse_color TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.announcement_banners ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for company website visitors)
DROP POLICY IF EXISTS "Public read access on announcement_banners" ON public.announcement_banners;
CREATE POLICY "Public read access on announcement_banners" 
  ON public.announcement_banners 
  FOR SELECT 
  USING (true);

-- Allow authenticated and admin anon access (for Admin Dashboard CRUD)
DROP POLICY IF EXISTS "Full access on announcement_banners" ON public.announcement_banners;
CREATE POLICY "Full access on announcement_banners" 
  ON public.announcement_banners 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);
