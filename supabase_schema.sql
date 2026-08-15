-- ==========================================================
-- STEP 1: DROP EVERYTHING (clean slate)
-- ==========================================================
DROP TABLE IF EXISTS public.gallery_categories CASCADE;
DROP TABLE IF EXISTS public.public_services CASCADE;
DROP TABLE IF EXISTS public.hero_images CASCADE;
DROP TABLE IF EXISTS public.gallery_images CASCADE;
DROP TABLE IF EXISTS public.media_videos CASCADE;
DROP TABLE IF EXISTS public.news_articles CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.site_config CASCADE;
DROP TABLE IF EXISTS public.ticker_items CASCADE;

-- ==========================================================
-- STEP 2: MESSAGES (Contact Form Submissions & Grievances)
-- ==========================================================
CREATE TABLE public.messages (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    phone       TEXT NOT NULL,
    email       TEXT,
    mandal      TEXT NOT NULL DEFAULT 'Alair',
    subject     TEXT,
    message     TEXT NOT NULL,
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON public.messages
    FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow admin read" ON public.messages
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin update" ON public.messages
    FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow admin delete" ON public.messages
    FOR DELETE TO anon, authenticated USING (true);

-- ==========================================================
-- STEP 3: PUBLIC SERVICES & DEVELOPMENT INITIATIVES
-- ==========================================================
CREATE TABLE public.public_services (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category           TEXT NOT NULL DEFAULT 'Education & Youth',
    category_telugu    TEXT NOT NULL DEFAULT 'విద్య & యువజన సంక్షేమం',
    title              TEXT NOT NULL,
    title_telugu       TEXT NOT NULL DEFAULT '',
    description        TEXT NOT NULL DEFAULT '',
    description_telugu TEXT NOT NULL DEFAULT '',
    nature             TEXT NOT NULL DEFAULT 'Constituency Work',
    nature_telugu      TEXT NOT NULL DEFAULT 'నియోజకవర్గ పని',
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.public_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.public_services
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.public_services
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STEP 4: MEDIA VIDEOS (YouTube Links & Custom Thumbnails)
-- ==========================================================
CREATE TABLE public.media_videos (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    title_telugu    TEXT NOT NULL DEFAULT '',
    youtube_id      TEXT NOT NULL,
    category        TEXT NOT NULL DEFAULT 'Assembly Speech',
    category_telugu TEXT NOT NULL DEFAULT 'అసెంబ్లీ ప్రసంగం',
    date            TEXT NOT NULL DEFAULT '',
    channel         TEXT NOT NULL DEFAULT '',
    channel_telugu  TEXT NOT NULL DEFAULT '',
    thumbnail_url   TEXT,
    is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.media_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.media_videos
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.media_videos
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STEP 5: GALLERY IMAGES (Photos with English & Telugu Details)
-- ==========================================================
CREATE TABLE public.gallery_images (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    src              TEXT NOT NULL,
    title            TEXT NOT NULL DEFAULT 'Gallery Image',
    title_telugu     TEXT NOT NULL DEFAULT 'గ్యాలరీ ఫోటో',
    category         TEXT NOT NULL DEFAULT 'Leadership',
    category_telugu  TEXT NOT NULL DEFAULT 'నాయకత్వం',
    caption          TEXT,
    caption_telugu   TEXT,
    object_fit       TEXT NOT NULL DEFAULT 'cover',
    object_position  TEXT NOT NULL DEFAULT 'center center',
    display_order    INTEGER NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.gallery_images
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.gallery_images
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STEP 6: GALLERY CATEGORIES (Dynamic Categories)
-- ==========================================================
CREATE TABLE public.gallery_categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    en          TEXT NOT NULL UNIQUE,
    te          TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.gallery_categories
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.gallery_categories
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

INSERT INTO public.gallery_categories (en, te) VALUES
    ('Leadership', 'నాయకత్వం'),
    ('Development', 'అభివృద్ధి'),
    ('Agriculture', 'వ్యవసాయం'),
    ('Heritage', 'పుణ్యక్షేత్రం'),
    ('Landscape', 'ప్రకృతి దృశ్యం'),
    ('People & Community', 'ప్రజలు & సమాజం'),
    ('Education & Youth', 'విద్య & యువజన సంక్షేమం'),
    ('Constituency Works', 'నియోజకవర్గ పనులు')
ON CONFLICT (en) DO NOTHING;

-- ==========================================================
-- STEP 7: NEWS ARTICLES & PRESS RELEASES (With Outbound URLs)
-- ==========================================================
CREATE TABLE public.news_articles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    title_telugu    TEXT NOT NULL DEFAULT '',
    summary         TEXT NOT NULL DEFAULT '',
    summary_telugu  TEXT NOT NULL DEFAULT '',
    category        TEXT NOT NULL DEFAULT 'Press Release',
    category_telugu TEXT NOT NULL DEFAULT 'పత్రికా ప్రకటన',
    date            TEXT NOT NULL DEFAULT '',
    source          TEXT NOT NULL DEFAULT 'MLA Public Office',
    url             TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.news_articles
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.news_articles
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STEP 8: HERO BANNER CAROUSEL IMAGES
-- ==========================================================
CREATE TABLE public.hero_images (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    src           TEXT NOT NULL,
    title         TEXT NOT NULL DEFAULT 'Hero Image',
    title_telugu  TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.hero_images
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.hero_images
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STEP 9: TICKER BAR ITEMS (Live Announcement Marquee)
-- ==========================================================
CREATE TABLE public.ticker_items (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_en     TEXT NOT NULL,
    text_te     TEXT NOT NULL,
    link        TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ticker_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.ticker_items
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.ticker_items
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================================
-- STEP 10: SITE CONFIG (Hero text, contact info, settings)
-- ==========================================================
CREATE TABLE public.site_config (
    id                   TEXT PRIMARY KEY DEFAULT 'default',
    banner_enabled       BOOLEAN NOT NULL DEFAULT TRUE,
    banner_text          TEXT,
    banner_text_telugu   TEXT,
    contact_phone        TEXT NOT NULL DEFAULT '+91 99590 26888',
    contact_email        TEXT NOT NULL DEFAULT 'beerla.ilaiah.mla@gmail.com',
    hero_bg_image        TEXT NOT NULL DEFAULT '/images/hero-bg.jpg',
    hero_side_image      TEXT NOT NULL DEFAULT '/images/beerla-standing.jpg',
    hero_headline        TEXT NOT NULL DEFAULT 'Beerla Ilaiah',
    hero_headline_telugu TEXT NOT NULL DEFAULT 'బీర్ల ఇలయ్య',
    hero_subtitle        TEXT NOT NULL DEFAULT 'Member of the Telangana Legislative Assembly — Alair No. 97',
    hero_subtitle_telugu TEXT NOT NULL DEFAULT 'తెలంగాణ శాసనసభ సభ్యులు — ఆలేరు సంఖ్య 97',
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.site_config
    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow admin write" ON public.site_config
    FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Insert default row
INSERT INTO public.site_config (id) VALUES ('default')
    ON CONFLICT (id) DO NOTHING;
