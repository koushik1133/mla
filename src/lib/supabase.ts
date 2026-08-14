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

// Types
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

// Utility: Extract pure YouTube Video ID from any URL or ID string
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  // Match youtube.com/watch?v=ID or youtu.be/ID
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
  if (!cleanId) return "/images/hero-bg.jpg";
  return `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
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
  created_at?: string;
}

// ----------------------------------------------------------------------
// MESSAGES API (Hybrid Supabase + LocalStorage Fallback)
// ----------------------------------------------------------------------
export async function submitContactMessage(msg: MessageRecord) {
  const newMsg: MessageRecord = {
    ...msg,
    id: msg.id || "msg_" + Date.now(),
    created_at: msg.created_at || new Date().toISOString(),
    is_read: false,
  };

  // Always save locally so messages are NEVER lost
  try {
    const existing: MessageRecord[] = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("beerla_messages") || "[]" : "[]");
    existing.unshift(newMsg);
    if (typeof window !== "undefined") {
      localStorage.setItem("beerla_messages", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Local storage error:", e);
  }

  // Sync to Supabase if configured
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
        // Merge Supabase items and Local items, deduplicating by ID or timestamp
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

// ----------------------------------------------------------------------
// NEWS ARTICLES API
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// MEDIA VIDEOS API
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// GALLERY IMAGES API
// ----------------------------------------------------------------------
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
