import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Export boolean helper checking if Supabase credentials are valid
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-project.supabase.co"
);

// Initialize Supabase Client (or null fallback)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// =========================================================================
// TYPES
// =========================================================================
export interface MessageRecord {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  mandal: string;
  subject?: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface NewsRecord {
  id?: string;
  title: string;
  title_telugu: string;
  summary: string;
  summary_telugu: string;
  category: string;
  category_telugu: string;
  date: string;
  url?: string;
  source?: string;
  created_at?: string;
}

export interface MediaRecord {
  id?: string;
  title: string;
  title_telugu: string;
  youtube_id: string;
  category: string;
  category_telugu: string;
  date: string;
  channel?: string;
  channel_telugu?: string;
  thumbnail_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface GalleryRecord {
  id?: string;
  src: string;
  title: string;
  title_telugu: string;
  category: string;
  category_telugu: string;
  caption?: string;
  caption_telugu?: string;
  object_fit?: "cover" | "contain";
  object_position?: string;
  display_order?: number;
  created_at?: string;
}

export interface HeroImageRecord {
  id?: string;
  src: string;
  title: string;
  title_telugu?: string;
  display_order?: number;
  created_at?: string;
}

export interface PublicServiceRecord {
  id?: string;
  category: string;
  category_telugu: string;
  title: string;
  title_telugu: string;
  description: string;
  description_telugu: string;
  nature: string;
  nature_telugu: string;
  created_at?: string;
}

export interface GalleryCategoryRecord {
  id?: string;
  en: string;
  te: string;
}

// Utility: Extract pure YouTube Video ID from any URL or ID string
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  return trimmed;
}

// Utility: Generate YouTube Thumbnail URL automatically
export function getYouTubeThumbnail(youtubeId: string, customThumbnail?: string): string {
  if (customThumbnail && customThumbnail.trim()) {
    return customThumbnail.trim();
  }
  const cleanId = extractYouTubeId(youtubeId);
  if (!cleanId) return "/images/alair-agriculture.jpg";
  return `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
}

// =========================================================================
// MESSAGES API
// =========================================================================
export async function submitContactMessage(msg: MessageRecord) {
  const newMsg: MessageRecord = {
    ...msg,
    id: msg.id || "msg_" + Date.now(),
    created_at: msg.created_at || new Date().toISOString(),
    is_read: false,
  };

  try {
    const existing: MessageRecord[] = JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("beerla_messages") || "[]" : "[]"
    );
    existing.unshift(newMsg);
    if (typeof window !== "undefined") {
      localStorage.setItem("beerla_messages", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Local storage error:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase.from("messages").insert([newMsg]).select();
      if (error) {
        console.warn("Supabase insert error (stored locally):", error.message);
      } else if (data && data[0]) {
        return data[0];
      }
    } catch (e) {
      console.warn("Supabase network error (stored locally):", e);
    }
  }

  return newMsg;
}

export async function fetchContactMessages(): Promise<MessageRecord[]> {
  let localMessages: MessageRecord[] = [];
  try {
    if (typeof window !== "undefined") {
      localMessages = JSON.parse(localStorage.getItem("beerla_messages") || "[]");
    }
  } catch (e) {
    console.error("Error reading local messages:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const combinedMap = new Map<string, MessageRecord>();
        data.forEach((m) => combinedMap.set(m.id || `${m.created_at}_${m.name}`, m));
        localMessages.forEach((m) => combinedMap.set(m.id || `${m.created_at}_${m.name}`, m));
        return Array.from(combinedMap.values()).sort(
          (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
        );
      }
    } catch (e) {
      console.warn("Error fetching Supabase messages:", e);
    }
  }

  return localMessages;
}

export async function toggleMessageReadStatus(id: string, isRead: boolean) {
  try {
    if (typeof window !== "undefined") {
      const existing: MessageRecord[] = JSON.parse(localStorage.getItem("beerla_messages") || "[]");
      const idx = existing.findIndex((m) => m.id === id);
      if (idx !== -1) {
        existing[idx].is_read = isRead;
        localStorage.setItem("beerla_messages", JSON.stringify(existing));
      }
    }
  } catch (e) {
    console.error("Error updating local message read status:", e);
  }

  if (supabase) {
    try {
      await supabase.from("messages").update({ is_read: isRead }).eq("id", id);
    } catch (e) {
      console.warn("Error updating Supabase message read status:", e);
    }
  }
}

export async function deleteContactMessage(id: string) {
  try {
    if (typeof window !== "undefined") {
      const existing: MessageRecord[] = JSON.parse(localStorage.getItem("beerla_messages") || "[]");
      const filtered = existing.filter((m) => m.id !== id);
      localStorage.setItem("beerla_messages", JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Error deleting local message:", e);
  }

  if (supabase) {
    try {
      await supabase.from("messages").delete().eq("id", id);
    } catch (e) {
      console.warn("Error deleting Supabase message:", e);
    }
  }
}

// =========================================================================
// NEWS ARTICLES API
// =========================================================================
export async function fetchNewsArticles(): Promise<NewsRecord[]> {
  let localNews: NewsRecord[] = [];
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("beerla_news");
      if (stored) localNews = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading local news:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const map = new Map<string, NewsRecord>();
        data.forEach((n) => map.set(n.id || n.title, n));
        localNews.forEach((n) => map.set(n.id || n.title, n));
        return Array.from(map.values());
      }
    } catch (e) {
      console.warn("Error fetching Supabase news:", e);
    }
  }

  return localNews;
}

export async function saveNewsArticle(news: NewsRecord) {
  const item = { ...news, id: news.id || "news_" + Date.now() };

  try {
    if (typeof window !== "undefined") {
      const existing: NewsRecord[] = JSON.parse(localStorage.getItem("beerla_news") || "[]");
      const idx = existing.findIndex((n) => n.id === item.id);
      if (idx !== -1) existing[idx] = item;
      else existing.unshift(item);
      localStorage.setItem("beerla_news", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving local news:", e);
  }

  if (supabase) {
    try {
      if (news.id) {
        await supabase.from("news_articles").update(news).eq("id", news.id);
      } else {
        await supabase.from("news_articles").insert([item]);
      }
    } catch (e) {
      console.warn("Error saving Supabase news:", e);
    }
  }

  return item;
}

export async function deleteNewsArticle(id: string) {
  try {
    if (typeof window !== "undefined") {
      const existing: NewsRecord[] = JSON.parse(localStorage.getItem("beerla_news") || "[]");
      const filtered = existing.filter((n) => n.id !== id);
      localStorage.setItem("beerla_news", JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Error deleting local news:", e);
  }

  if (supabase) {
    try {
      await supabase.from("news_articles").delete().eq("id", id);
    } catch (e) {
      console.warn("Error deleting Supabase news:", e);
    }
  }
}

// =========================================================================
// MEDIA VIDEOS API
// =========================================================================
export async function fetchMediaVideos(): Promise<MediaRecord[]> {
  let localMedia: MediaRecord[] = [];
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("beerla_media");
      if (stored) localMedia = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading local media:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("media_videos")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const map = new Map<string, MediaRecord>();
        data.forEach((v) => map.set(v.id || v.youtube_id, v));
        localMedia.forEach((v) => map.set(v.id || v.youtube_id, v));
        return Array.from(map.values());
      }
    } catch (e) {
      console.warn("Error fetching Supabase media:", e);
    }
  }

  return localMedia;
}

export async function saveMediaVideo(video: MediaRecord) {
  const item = { ...video, id: video.id || "vid_" + Date.now() };

  try {
    if (typeof window !== "undefined") {
      const existing: MediaRecord[] = JSON.parse(localStorage.getItem("beerla_media") || "[]");
      const idx = existing.findIndex((v) => v.id === item.id);
      if (idx !== -1) existing[idx] = item;
      else existing.unshift(item);
      localStorage.setItem("beerla_media", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving local media:", e);
  }

  if (supabase) {
    try {
      if (video.id) {
        await supabase.from("media_videos").update(video).eq("id", video.id);
      } else {
        await supabase.from("media_videos").insert([item]);
      }
    } catch (e) {
      console.warn("Error saving Supabase media:", e);
    }
  }

  return item;
}

export async function deleteMediaVideo(id: string) {
  try {
    if (typeof window !== "undefined") {
      const existing: MediaRecord[] = JSON.parse(localStorage.getItem("beerla_media") || "[]");
      const filtered = existing.filter((v) => v.id !== id);
      localStorage.setItem("beerla_media", JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Error deleting local media:", e);
  }

  if (supabase) {
    try {
      await supabase.from("media_videos").delete().eq("id", id);
    } catch (e) {
      console.warn("Error deleting Supabase media:", e);
    }
  }
}

// =========================================================================
// GALLERY IMAGES API
// =========================================================================
export async function fetchGalleryImages(): Promise<GalleryRecord[]> {
  let localGallery: GalleryRecord[] = [];
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("beerla_gallery");
      if (stored) localGallery = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading local gallery:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const map = new Map<string, GalleryRecord>();
        data.forEach((g) => map.set(g.id || g.src, g));
        localGallery.forEach((g) => map.set(g.id || g.src, g));
        return Array.from(map.values());
      }
    } catch (e) {
      console.warn("Error fetching Supabase gallery:", e);
    }
  }

  return localGallery;
}

export async function saveGalleryImage(img: GalleryRecord) {
  const item = { ...img, id: img.id || "img_" + Date.now() };

  try {
    if (typeof window !== "undefined") {
      const existing: GalleryRecord[] = JSON.parse(localStorage.getItem("beerla_gallery") || "[]");
      const idx = existing.findIndex((g) => g.id === item.id);
      if (idx !== -1) existing[idx] = item;
      else existing.unshift(item);
      localStorage.setItem("beerla_gallery", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving local gallery:", e);
  }

  if (supabase) {
    try {
      if (img.id) {
        await supabase.from("gallery_images").update(img).eq("id", img.id);
      } else {
        await supabase.from("gallery_images").insert([item]);
      }
    } catch (e) {
      console.warn("Error saving Supabase gallery:", e);
    }
  }

  return item;
}

export async function deleteGalleryImage(id: string) {
  try {
    if (typeof window !== "undefined") {
      const existing: GalleryRecord[] = JSON.parse(localStorage.getItem("beerla_gallery") || "[]");
      const filtered = existing.filter((g) => g.id !== id);
      localStorage.setItem("beerla_gallery", JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Error deleting local gallery:", e);
  }

  if (supabase) {
    try {
      await supabase.from("gallery_images").delete().eq("id", id);
    } catch (e) {
      console.warn("Error deleting Supabase gallery:", e);
    }
  }
}

export async function reorderGalleryImages(images: GalleryRecord[]) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("beerla_gallery", JSON.stringify(images));
    }
  } catch (e) {
    console.error("Error reordering local gallery:", e);
  }
}

// =========================================================================
// HERO IMAGES API
// =========================================================================
export async function fetchHeroImages(): Promise<HeroImageRecord[]> {
  let localHero: HeroImageRecord[] = [];
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("beerla_hero_images");
      if (stored) localHero = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading local hero images:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("hero_images")
        .select("*")
        .order("display_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Error fetching Supabase hero images:", e);
    }
  }

  return localHero;
}

export async function saveHeroImage(img: HeroImageRecord) {
  const item = { ...img, id: img.id || "hero_" + Date.now() };

  try {
    if (typeof window !== "undefined") {
      const existing: HeroImageRecord[] = JSON.parse(localStorage.getItem("beerla_hero_images") || "[]");
      const idx = existing.findIndex((h) => h.id === item.id);
      if (idx !== -1) existing[idx] = item;
      else existing.push(item);
      localStorage.setItem("beerla_hero_images", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving local hero image:", e);
  }

  if (supabase) {
    try {
      if (img.id) {
        await supabase.from("hero_images").update(img).eq("id", img.id);
      } else {
        await supabase.from("hero_images").insert([item]);
      }
    } catch (e) {
      console.warn("Error saving Supabase hero image:", e);
    }
  }

  return item;
}

export async function deleteHeroImage(id: string) {
  try {
    if (typeof window !== "undefined") {
      const existing: HeroImageRecord[] = JSON.parse(localStorage.getItem("beerla_hero_images") || "[]");
      const filtered = existing.filter((h) => h.id !== id);
      localStorage.setItem("beerla_hero_images", JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Error deleting local hero image:", e);
  }

  if (supabase) {
    try {
      await supabase.from("hero_images").delete().eq("id", id);
    } catch (e) {
      console.warn("Error deleting Supabase hero image:", e);
    }
  }
}

export async function reorderHeroImages(images: HeroImageRecord[]) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("beerla_hero_images", JSON.stringify(images));
    }
  } catch (e) {
    console.error("Error reordering local hero images:", e);
  }
}

// =========================================================================
// PUBLIC SERVICES API
// =========================================================================
export async function fetchPublicServices(): Promise<PublicServiceRecord[]> {
  let localServices: PublicServiceRecord[] = [];
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("beerla_public_services");
      if (stored) localServices = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading local public services:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("public_services")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const map = new Map<string, PublicServiceRecord>();
        data.forEach((s) => map.set(s.id || s.title, s));
        localServices.forEach((s) => map.set(s.id || s.title, s));
        return Array.from(map.values());
      }
    } catch (e) {
      console.warn("Error fetching Supabase public services:", e);
    }
  }

  return localServices;
}

export async function savePublicService(srv: PublicServiceRecord) {
  const item = { ...srv, id: srv.id || "srv_" + Date.now() };

  try {
    if (typeof window !== "undefined") {
      const existing: PublicServiceRecord[] = JSON.parse(localStorage.getItem("beerla_public_services") || "[]");
      const idx = existing.findIndex((s) => s.id === item.id);
      if (idx !== -1) existing[idx] = item;
      else existing.unshift(item);
      localStorage.setItem("beerla_public_services", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving local public service:", e);
  }

  if (supabase) {
    try {
      if (srv.id) {
        await supabase.from("public_services").update(srv).eq("id", srv.id);
      } else {
        await supabase.from("public_services").insert([item]);
      }
    } catch (e) {
      console.warn("Error saving Supabase public service:", e);
    }
  }

  return item;
}

export async function deletePublicService(id: string) {
  try {
    if (typeof window !== "undefined") {
      const existing: PublicServiceRecord[] = JSON.parse(localStorage.getItem("beerla_public_services") || "[]");
      const filtered = existing.filter((s) => s.id !== id);
      localStorage.setItem("beerla_public_services", JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Error deleting local public service:", e);
  }

  if (supabase) {
    try {
      await supabase.from("public_services").delete().eq("id", id);
    } catch (e) {
      console.warn("Error deleting Supabase public service:", e);
    }
  }
}

// =========================================================================
// GALLERY CATEGORIES API
// =========================================================================
export const DEFAULT_GALLERY_CATEGORIES: GalleryCategoryRecord[] = [
  { id: "c1", en: "Leadership", te: "నాయకత్వం" },
  { id: "c2", en: "Development", te: "అభివృద్ధి" },
  { id: "c3", en: "Agriculture", te: "వ్యవసాయం" },
  { id: "c4", en: "Heritage", te: "పుణ్యక్షేత్రం" },
  { id: "c5", en: "Landscape", te: "ప్రకృతి దృశ్యం" },
  { id: "c6", en: "People & Community", te: "ప్రజలు & సమాజం" },
  { id: "c7", en: "Education & Youth", te: "విద్య & యువజన సంక్షేమం" },
  { id: "c8", en: "Constituency Works", te: "నియోజకవర్గ పనులు" },
];

export async function fetchGalleryCategories(): Promise<GalleryCategoryRecord[]> {
  let localCats: GalleryCategoryRecord[] = DEFAULT_GALLERY_CATEGORIES;
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("beerla_gallery_cats");
      if (stored) localCats = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error reading local gallery categories:", e);
  }

  if (supabase) {
    try {
      const { data, error } = await supabase.from("gallery_categories").select("*");
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn("Error fetching Supabase gallery categories:", e);
    }
  }

  return localCats;
}

export async function saveGalleryCategory(catOrEn: GalleryCategoryRecord | string, te?: string) {
  const item: GalleryCategoryRecord =
    typeof catOrEn === "string"
      ? { en: catOrEn, te: te || catOrEn, id: "cat_" + Date.now() }
      : { ...catOrEn, id: catOrEn.id || "cat_" + Date.now() };

  try {
    if (typeof window !== "undefined") {
      const existing = await fetchGalleryCategories();
      const idx = existing.findIndex((c) => c.en === item.en || c.id === item.id);
      if (idx !== -1) existing[idx] = item;
      else existing.push(item);
      localStorage.setItem("beerla_gallery_cats", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Error saving local gallery category:", e);
  }

  if (supabase) {
    try {
      await supabase.from("gallery_categories").upsert([item]);
    } catch (e) {
      console.warn("Error saving Supabase gallery category:", e);
    }
  }

  return item;
}

// =========================================================================
// SITE CONFIG API
// =========================================================================
export async function fetchSiteConfigFromSupabase(): Promise<any> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_config")
        .select("*")
        .eq("id", "default")
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn("Error fetching Supabase site config:", e);
    }
  }
  return null;
}

export async function saveSiteConfigToSupabase(cfg: any): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("site_config")
        .upsert({ id: "default", ...cfg, updated_at: new Date().toISOString() });
      if (!error) return true;
    } catch (e) {
      console.warn("Error saving Supabase site config:", e);
    }
  }
  return false;
}

// =========================================================================
// SUPABASE AUTH HELPERS
// =========================================================================
export async function supabaseAdminLogin(email: string, password: string) {
  if (!supabase) return { error: { message: "Supabase is not configured." } };
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function supabaseAdminLogout() {
  if (supabase) await supabase.auth.signOut();
}

export async function getSupabaseAdminUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}
