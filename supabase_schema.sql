-- ==========================================================
-- SUPABASE COMPLETE DATABASE SCHEMA FOR BEERLA ILAIAH MLA PORTAL
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==========================================================

-- 1. MESSAGES TABLE (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    mandal TEXT NOT NULL,
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

-- Enable Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ & INSERT POLICIES
-- Allow anyone to insert contact form messages
CREATE POLICY "Allow public insert to messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Allow public read access to news, media, gallery, and site_config
CREATE POLICY "Allow public read news_articles" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Allow public read media_videos" ON public.media_videos FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery_images" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read site_config" ON public.site_config FOR SELECT USING (true);

-- ADMIN AUTHENTICATED FULL ACCESS POLICIES
CREATE POLICY "Allow admin full access to messages" ON public.messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access to news_articles" ON public.news_articles FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access to media_videos" ON public.media_videos FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access to gallery_images" ON public.gallery_images FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow admin full access to site_config" ON public.site_config FOR ALL TO authenticated USING (true);

-- SEED DEFAULT DATA
INSERT INTO public.site_config (id, banner_enabled, banner_text, banner_text_telugu)
VALUES ('default', false, 'Welcome to the Official Portal of Beerla Ilaiah MLA', 'ఆలేరు శాసనసభ్యులు బీర్ల ఐలయ్య గారి அதிகாரిక పోర్టల్‌కు స్వాగతం')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.news_articles (title, title_telugu, summary, summary_telugu, category, category_telugu, date)
VALUES 
('Government Whip Beerla Ilaiah Reviews Alair Water Projects', 'ఆలేరు సాగునీటి ప్రాజెక్టులను సమీక్షించిన ప్రభుత్వ విప్ బీర్ల ఐలయ్య', 'Government Whip Beerla Ilaiah held a high-level review meeting with irrigation engineers in Alair.', 'ఆలేరు నియోజకవర్గ సాగునీటి ఇంజనీర్లతో ఉన్నత స్థాయి సమీక్షా సమావేశం నిర్వహించిన ప్రభుత్వ విప్ బీర్ల ఐలయ్య.', 'Press Release', 'పత్రికా ప్రకటన', '2026-02-10')
ON CONFLICT DO NOTHING;

INSERT INTO public.media_videos (title, title_telugu, youtube_id, category, category_telugu, date, is_featured)
VALUES 
('Beerla Ilaiah Assembly Speech on BC Welfare & Reservations', 'బీసీ సంక్షేమం & రిజర్వేషన్లపై అసెంబ్లీలో బీర్ల ఐలయ్య గర్జన', 'dQw4w9WgXcQ', 'Assembly Speech', 'అసెంబ్లీ ప్రసంగం', '2026-01-20', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.gallery_images (src, title, title_telugu, category, category_telugu, caption, caption_telugu, object_fit, object_position)
VALUES 
('/images/beerla-portrait.jpg', 'Beerla Ilaiah — MLA, Alair', 'బీర్ల ఐలయ్య — ఆలేరు శాసనసభ్యులు', 'Leadership', 'నాయకత్వం', 'Member of Telangana Legislative Assembly representing Alair Constituency No. 97.', 'ఆలేరు నియోజకవర్గం 97 శాసనసభ్యులు బీర్ల ఐలయ్య గారు.', 'cover', 'center top')
ON CONFLICT DO NOTHING;
