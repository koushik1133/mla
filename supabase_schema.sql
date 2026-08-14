-- ====================================================================
-- SUPABASE FRESH DATABASE INITIALIZATION & INSTALLATION SCRIPT
-- Project: Beerla Ilaiah MLA Official Portal (Alair Assembly No. 97)
-- Copy and run this script in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ====================================================================

-- 1. DROP EXISTING TABLES IF THEY REMAIN (Clean Start)
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.news_articles CASCADE;
DROP TABLE IF EXISTS public.media_videos CASCADE;
DROP TABLE IF EXISTS public.gallery_images CASCADE;
DROP TABLE IF EXISTS public.site_config CASCADE;

-- 2. CREATE MESSAGES TABLE
CREATE TABLE public.messages (
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

-- 3. CREATE NEWS ARTICLES TABLE
CREATE TABLE public.news_articles (
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

-- 4. CREATE MEDIA VIDEOS TABLE
CREATE TABLE public.media_videos (
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

-- 5. CREATE GALLERY IMAGES TABLE
CREATE TABLE public.gallery_images (
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

-- 6. CREATE SITE CONFIGURATION TABLE
CREATE TABLE public.site_config (
    id TEXT PRIMARY KEY DEFAULT 'default',
    banner_enabled BOOLEAN DEFAULT FALSE,
    banner_text TEXT DEFAULT '',
    banner_text_telugu TEXT DEFAULT '',
    contact_phone TEXT DEFAULT '+91 98666 52347',
    contact_email TEXT DEFAULT 'beerlailaiah@gmail.com',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS) & SET OPEN POLICIES
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public all messages" ON public.messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all news_articles" ON public.news_articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all media_videos" ON public.media_videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all gallery_images" ON public.gallery_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all site_config" ON public.site_config FOR ALL USING (true) WITH CHECK (true);

-- 8. SEED INITIAL PORTAL DATA
INSERT INTO public.site_config (id, banner_enabled, banner_text, banner_text_telugu)
VALUES ('default', false, 'Welcome to the Official Portal of Beerla Ilaiah MLA', 'ఆలేరు శాసనసభ్యులు బీర్ల ఐలయ్య గారి అధికారిక పోర్టల్‌కు స్వాగతం');

INSERT INTO public.news_articles (title, title_telugu, summary, summary_telugu, category, category_telugu, date, source)
VALUES 
('Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee', 'యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా ఎమ్మెల్యే బీర్ల ఐలయ్య నియామకం', 'MLA Beerla Ilaiah was appointed as President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025.', 'ఆలేరు శాసనసభ్యులు బీర్ల ఐలయ్య గారు 2025 నవంబర్‌లో యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా నియమితులయ్యారు.', 'Congress', 'కాంగ్రెస్', 'November 2025', 'Poliple / BCSamachar'),
('"I Am Not an MLA, I Am a Servant" — Beerla Ilaiah in Exclusive Interview', '"నేను ఎమ్మెల్యేని కాదు, ప్రజల సేవకుడిని" — ప్రత్యేక ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఐలయ్య', 'In an exclusive interview with Suman TV Yadadri, MLA Beerla Ilaiah described his public role and approach to constituency service.', 'సుమన్ టీవీ యాదాద్రికి ఇచ్చిన ప్రత్యేక ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఐలయ్య గారు తమ ప్రజా సేవా దృక్పథాన్ని వివరించారు.', 'Interview', 'ఇంటర్వ్యూ', 'July 29, 2026', 'Suman TV Yadadri'),
('MLA Beerla Ilaiah Discusses Alair Developments with Telangana Velugu', 'ఆలేరు నియోజకవర్గ అభివృద్ధిపై తెలంగాణ వెలుగు ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఐలయ్య', 'An exclusive interview covering constituency development, the Revanth Reddy government, and public welfare matters.', 'తెలంగాణ వెలుగు ఇంటర్వ్యూలో ఆలేరు అభివృద్ధి, రేవంత్ రెడ్డి ప్రభుత్వ సంక్షేమ పథకాల గురించి మాట్లాడారు.', 'Development', 'అభివృద్ధి', 'July 31, 2026', 'Telangana Velugu');

INSERT INTO public.media_videos (title, title_telugu, youtube_id, category, category_telugu, date, channel, is_featured)
VALUES 
('"I Am Not an MLA, I Am a Servant" — Beerla Ilaiah Exclusive Interview', '"నేను ఎమ్మెల్యేని కాదు, ప్రజల సేవకుడిని" — బీర్ల ఐలయ్య ప్రత్యేక ఇంటర్వ్యూ', 'vB6J-L5oXJ0', 'interview', 'ఇంటర్వ్యూ', 'July 29, 2026', 'Suman TV Yadadri', true),
('Exclusive Interview — Alair Developments & Political Outlook', 'ప్రత్యేక ఇంటర్వ్యూ — ఆలేరు అభివృద్ధి & రాజకీయ విశ్లేషణ', 'dQw4w9WgXcQ', 'development', 'అభివృద్ధి', 'July 31, 2026', 'Telangana Velugu', true),
('Face to Face Interview — Government Whip Beerla Ilaiah', 'ముఖాముఖి ఇంటర్వ్యూ — ప్రభుత్వ విప్ బీర్ల ఐలయ్య', 'kJQP7kiw5Fk', 'interview', 'ఇంటర్వ్యూ', 'May 17, 2025', 'Signature Studios', false);

INSERT INTO public.gallery_images (src, title, title_telugu, category, category_telugu, caption, caption_telugu, object_fit, object_position)
VALUES 
('/images/hero-bg.jpg', 'Alair Countryside & Farmlands', 'ఆలేరు గ్రామీణ ప్రాంతం & వ్యవసాయ భూములు', 'Landscape', 'ప్రకృతి దృశ్యం', 'Golden hour over the agricultural farmlands of Alair assembly constituency, Yadadri Bhuvanagiri district.', 'యాదాద్రి భువనగిరి జిల్లా ఆలేరు నియోజకవర్గ వ్యవసాయ భూముల దృశ్యం.', 'cover', 'center center'),
('/images/yadadri-temple.jpg', 'Yadadri Sri Lakshmi Narasimha Swamy Temple', 'యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం', 'Heritage', 'పుణ్యక్షేత్రం', 'The magnificent 4K stone-carved Yadadri temple complex in Yadagirigutta mandal.', 'యాదగిరిగుట్ట మండలంలో కొలువైన 4K ఆధ్యాత్మిక క్షేత్రం యాదాద్రి ఆలయం.', 'cover', 'center 25%'),
('/images/beerla-portrait.jpg', 'Beerla Ilaiah — MLA, Alair', 'బీర్ల ఐలయ్య — ఆలేరు శాసనసభ్యులు', 'Leadership', 'నాయకత్వం', 'Beerla Ilaiah, Member of Telangana Legislative Assembly representing Alair Constituency No. 97.', 'ఆలేరు నియోజకవర్గం 97 శాసనసభ్యులు బీర్ల ఐలయ్య గారు.', 'cover', 'center top');
