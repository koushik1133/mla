-- =============================================================================
-- RLS HARDENING — run this in the Supabase SQL editor, in one go.
--
-- WHY
-- supabase_schema.sql grants `anon` FOR ALL ... USING (true) on EVERY table.
-- RLS is enabled but every policy is `true`, which is equivalent to no RLS.
-- The anon key ships in the client bundle by design, so with no login at all
-- anyone can:
--   • read every citizen grievance in `messages` (name, phone, email, text)
--   • delete or rewrite all news / gallery / media / services
--   • rewrite `site_config` and deface the homepage
--
-- Restricting writes to `TO authenticated` is NOT sufficient: if Supabase email
-- signup is enabled (default), anyone can self-register and become
-- `authenticated`. Hence an explicit admin allowlist.
--
-- ⚠️ Apply this TOGETHER with the app-side auth change. Once these policies are
-- live, the dashboard only works for a real Supabase session whose user id is
-- in public.admin_users. Seed yourself (bottom of this file) before testing.
-- =============================================================================

BEGIN;

-- ── Admin allowlist ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email      TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
-- Intentionally no policies: only service_role may read/modify the allowlist.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL SECURITY DEFINER STABLE
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid());
$$;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT  EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ── messages: public may submit, only admins may read ───────────────────────
DROP POLICY IF EXISTS "Allow public insert" ON public.messages;
DROP POLICY IF EXISTS "Allow admin read"    ON public.messages;
DROP POLICY IF EXISTS "Allow admin update"  ON public.messages;
DROP POLICY IF EXISTS "Allow admin delete"  ON public.messages;

CREATE POLICY "messages_public_submit" ON public.messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    is_read = FALSE                                   -- block mass assignment
    AND char_length(name)    BETWEEN 2 AND 100
    AND char_length(phone)   BETWEEN 6 AND 20
    AND char_length(message) BETWEEN 20 AND 2000
    AND (email   IS NULL OR char_length(email)   <= 150)
    AND (subject IS NULL OR char_length(subject) <= 200)
  );
CREATE POLICY "messages_admin_read"   ON public.messages FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "messages_admin_update" ON public.messages FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "messages_admin_delete" ON public.messages FOR DELETE TO authenticated USING (public.is_admin());

-- Server owns identity/state columns; clients must not supply them.
ALTER TABLE public.messages
  ALTER COLUMN id         SET DEFAULT gen_random_uuid(),
  ALTER COLUMN created_at SET DEFAULT NOW(),
  ALTER COLUMN is_read    SET DEFAULT FALSE;
REVOKE INSERT (id, created_at, is_read) ON public.messages FROM anon, authenticated;

-- ── public content: world-readable, admin-writable ──────────────────────────
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['public_services','media_videos','gallery_images',
                           'gallery_categories','news_articles','hero_images',
                           'ticker_items','site_config']
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Allow public read" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow admin write" ON public.%I', t);
    EXECUTE format($f$CREATE POLICY "public_read_%1$s" ON public.%1$I
                        FOR SELECT TO anon, authenticated USING (true)$f$, t);
    EXECUTE format($f$CREATE POLICY "admin_write_%1$s" ON public.%1$I
                        FOR ALL TO authenticated
                        USING (public.is_admin()) WITH CHECK (public.is_admin())$f$, t);
  END LOOP;
END $$;

-- ── Content constraints: block javascript: hrefs and remote/oversized images ─
ALTER TABLE public.news_articles  DROP CONSTRAINT IF EXISTS news_url_scheme;
ALTER TABLE public.news_articles  ADD  CONSTRAINT news_url_scheme
  CHECK (url IS NULL OR url ~* '^https?://');

ALTER TABLE public.ticker_items   DROP CONSTRAINT IF EXISTS ticker_link_scheme;
ALTER TABLE public.ticker_items   ADD  CONSTRAINT ticker_link_scheme
  CHECK (link IS NULL OR link ~ '^/' OR link ~* '^https?://');

ALTER TABLE public.site_config    DROP CONSTRAINT IF EXISTS hero_img_local;
ALTER TABLE public.site_config    ADD  CONSTRAINT hero_img_local
  CHECK (hero_bg_image ~ '^(/images/|data:image/)' AND hero_side_image ~ '^(/images/|data:image/)');

ALTER TABLE public.gallery_images DROP CONSTRAINT IF EXISTS gallery_src_size;
ALTER TABLE public.gallery_images ADD  CONSTRAINT gallery_src_size CHECK (char_length(src) <= 3000000);
ALTER TABLE public.hero_images    DROP CONSTRAINT IF EXISTS hero_src_size;
ALTER TABLE public.hero_images    ADD  CONSTRAINT hero_src_size    CHECK (char_length(src) <= 3000000);
ALTER TABLE public.media_videos   DROP CONSTRAINT IF EXISTS media_thumb_size;
ALTER TABLE public.media_videos   ADD  CONSTRAINT media_thumb_size
  CHECK (thumbnail_url IS NULL OR char_length(thumbnail_url) <= 3000000);

-- ── Enforce RLS even for table owners, and drop blanket anon grants ─────────
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['messages','public_services','media_videos','gallery_images',
                           'gallery_categories','news_articles','hero_images',
                           'ticker_items','site_config']
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('ALTER TABLE public.%I FORCE  ROW LEVEL SECURITY', t);
  END LOOP;
END $$;

REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;
GRANT  INSERT (name, phone, email, mandal, subject, message) ON public.messages TO anon;

COMMIT;

-- =============================================================================
-- SEED YOURSELF AS ADMIN (required — otherwise nobody can administer the site)
-- 1. Supabase Dashboard → Authentication → Users → Add User
-- 2. Then run, with your address:
--
-- INSERT INTO public.admin_users (user_id, email)
-- SELECT id, email FROM auth.users WHERE email = 'you@example.com'
-- ON CONFLICT (user_id) DO NOTHING;
--
-- VERIFY (anon should have SELECT only, plus INSERT on messages):
-- SELECT tablename, policyname, roles, cmd FROM pg_policies
--  WHERE schemaname='public' ORDER BY tablename, cmd;
-- =============================================================================
