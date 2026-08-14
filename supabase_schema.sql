-- ==========================================================
-- SUPABASE COMPLETE DATABASE SCHEMA FOR BEERLA ILAIAH MLA PORTAL
-- Copy and run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==========================================================

-- 1. MESSAGES TABLE (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    mandal TEXT NOT NULL DEFAULT 'Alair Constituency',
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. NEWS ARTICLES TABLE (Press Releases & News Updates)
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_telugu TEXT NOT NULL,
    summary TEXT NOT NULL,
    summary_telugu TEXT NOT NULL,
    category TEXT DEFAULT 'Press Release',
    category_telugu TEXT DEFAULT 'పత్రికా ప్రకటన',
    date TEXT NOT NULL,
    url TEXT,
    source TEXT DEFAULT 'MLA Public Office',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MEDIA VIDEOS TABLE (Speeches & Assembly Coverage)
CREATE TABLE IF NOT EXISTS public.media_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_telugu TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    category TEXT DEFAULT 'Assembly Speech',
    category_telugu TEXT DEFAULT 'అసెంబ్లీ ప్రసంగం',
    date TEXT NOT NULL,
    channel TEXT DEFAULT 'Telugu News',
    channel_telugu TEXT DEFAULT 'తెలుగు న్యూస్',
    thumbnail_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY IMAGES TABLE (Photos & Constituency Heritage)
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    src TEXT NOT NULL,
    title TEXT NOT NULL,
    title_telugu TEXT NOT NULL,
    category TEXT DEFAULT 'Leadership',
    category_telugu TEXT DEFAULT 'నాయకత్వం',
    caption TEXT,
    caption_telugu TEXT,
    object_fit TEXT DEFAULT 'cover',
    object_position TEXT DEFAULT 'center center',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SITE CONFIGURATION TABLE (Global Portal Settings)
CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'default',
    banner_enabled BOOLEAN DEFAULT FALSE,
    banner_text TEXT DEFAULT '',
    banner_text_telugu TEXT DEFAULT '',
    contact_phone TEXT DEFAULT '+91 98666 52347',
    contact_email TEXT DEFAULT 'beerlailaiah@gmail.com',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- DROP OLD STRICT POLICIES IF THEY EXIST
DROP POLICY IF EXISTS "Allow public insert to messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public read news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Allow public read media_videos" ON public.media_videos;
DROP POLICY IF EXISTS "Allow public read gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow public read site_config" ON public.site_config;
DROP POLICY IF EXISTS "Allow admin full access to messages" ON public.messages;
DROP POLICY IF EXISTS "Allow admin full access to news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Allow admin full access to media_videos" ON public.media_videos;
DROP POLICY IF EXISTS "Allow admin full access to gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow admin full access to site_config" ON public.site_config;

DROP POLICY IF EXISTS "Allow public all messages" ON public.messages;
DROP POLICY IF EXISTS "Allow public all news_articles" ON public.news_articles;
DROP POLICY IF EXISTS "Allow public all media_videos" ON public.media_videos;
DROP POLICY IF EXISTS "Allow public all gallery_images" ON public.gallery_images;
DROP POLICY IF EXISTS "Allow public all site_config" ON public.site_config;

-- CREATE FULL OPEN POLICIES FOR PUBLIC / ANON + AUTHENTICATED ROLES
CREATE POLICY "Allow public all messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all news_articles" ON public.news_articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all media_videos" ON public.media_videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all gallery_images" ON public.gallery_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all site_config" ON public.site_config FOR ALL USING (true) WITH CHECK (true);

-- SEED DEFAULT DATA IF NOT EXISTS
INSERT INTO public.site_config (id, banner_enabled, banner_text, banner_text_telugu)
VALUES ('default', false, 'Welcome to the Official Portal of Beerla Ilaiah MLA', 'ఆలేరు శాసనసభ్యులు బీర్ల ఐలయ్య గారి அதிகாரిక పోర్టల్‌కు స్వాగతం')
ON CONFLICT (id) DO NOTHING;
