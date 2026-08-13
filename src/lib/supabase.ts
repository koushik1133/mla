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
// MESSAGES API
// ----------------------------------------------------------------------
export async function submitContactMessage(msg: MessageRecord) {
  if (supabase) {
    const { data, error } = await supabase.from("messages").insert([msg]).select();
    if (error) throw error;
    return data;
  } else {
    // LocalStorage Fallback
    const existing = JSON.parse(localStorage.getItem("beerla_messages") || "[]");
    const newMsg = {
      ...msg,
      id: "msg_" + Date.now(),
      created_at: new Date().toISOString(),
      is_read: false,
    };
    existing.unshift(newMsg);
    localStorage.setItem("beerla_messages", JSON.stringify(existing));
    return [newMsg];
  }
}

export async function fetchContactMessages(): Promise<MessageRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } else {
    // LocalStorage Fallback
    const existing = JSON.parse(localStorage.getItem("beerla_messages") || "[]");
    return existing;
  }
}

export async function deleteContactMessage(id: string) {
  if (supabase) {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) throw error;
  } else {
    const existing: MessageRecord[] = JSON.parse(localStorage.getItem("beerla_messages") || "[]");
    const filtered = existing.filter((m) => m.id !== id);
    localStorage.setItem("beerla_messages", JSON.stringify(filtered));
  }
}

// ----------------------------------------------------------------------
// NEWS ARTICLES API
// ----------------------------------------------------------------------
export async function fetchNewsArticles(): Promise<NewsRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  // LocalStorage / Default Fallback
  const stored = localStorage.getItem("beerla_news");
  if (stored) return JSON.parse(stored);
  return [];
}

export async function saveNewsArticle(news: NewsRecord) {
  if (supabase) {
    if (news.id) {
      const { data, error } = await supabase.from("news_articles").update(news).eq("id", news.id).select();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.from("news_articles").insert([news]).select();
      if (error) throw error;
      return data;
    }
  } else {
    const existing: NewsRecord[] = JSON.parse(localStorage.getItem("beerla_news") || "[]");
    if (news.id) {
      const idx = existing.findIndex((n) => n.id === news.id);
      if (idx !== -1) existing[idx] = news;
    } else {
      existing.unshift({ ...news, id: "news_" + Date.now() });
    }
    localStorage.setItem("beerla_news", JSON.stringify(existing));
    return existing;
  }
}

export async function deleteNewsArticle(id: string) {
  if (supabase) {
    const { error } = await supabase.from("news_articles").delete().eq("id", id);
    if (error) throw error;
  } else {
    const existing: NewsRecord[] = JSON.parse(localStorage.getItem("beerla_news") || "[]");
    const filtered = existing.filter((n) => n.id !== id);
    localStorage.setItem("beerla_news", JSON.stringify(filtered));
  }
}

// ----------------------------------------------------------------------
// MEDIA VIDEOS API
// ----------------------------------------------------------------------
export async function fetchMediaVideos(): Promise<MediaRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("media_videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  const stored = localStorage.getItem("beerla_media");
  if (stored) return JSON.parse(stored);
  return [];
}

export async function saveMediaVideo(video: MediaRecord) {
  if (supabase) {
    if (video.id) {
      const { data, error } = await supabase.from("media_videos").update(video).eq("id", video.id).select();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.from("media_videos").insert([video]).select();
      if (error) throw error;
      return data;
    }
  } else {
    const existing: MediaRecord[] = JSON.parse(localStorage.getItem("beerla_media") || "[]");
    if (video.id) {
      const idx = existing.findIndex((v) => v.id === video.id);
      if (idx !== -1) existing[idx] = video;
    } else {
      existing.unshift({ ...video, id: "vid_" + Date.now() });
    }
    localStorage.setItem("beerla_media", JSON.stringify(existing));
    return existing;
  }
}

export async function deleteMediaVideo(id: string) {
  if (supabase) {
    const { error } = await supabase.from("media_videos").delete().eq("id", id);
    if (error) throw error;
  } else {
    const existing: MediaRecord[] = JSON.parse(localStorage.getItem("beerla_media") || "[]");
    const filtered = existing.filter((v) => v.id !== id);
    localStorage.setItem("beerla_media", JSON.stringify(filtered));
  }
}

// ----------------------------------------------------------------------
// GALLERY IMAGES API
// ----------------------------------------------------------------------
export async function fetchGalleryImages(): Promise<GalleryRecord[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) return data;
  }
  const stored = localStorage.getItem("beerla_gallery");
  if (stored) return JSON.parse(stored);
  return [];
}

export async function saveGalleryImage(img: GalleryRecord) {
  if (supabase) {
    if (img.id) {
      const { data, error } = await supabase.from("gallery_images").update(img).eq("id", img.id).select();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.from("gallery_images").insert([img]).select();
      if (error) throw error;
      return data;
    }
  } else {
    const existing: GalleryRecord[] = JSON.parse(localStorage.getItem("beerla_gallery") || "[]");
    if (img.id) {
      const idx = existing.findIndex((g) => g.id === img.id);
      if (idx !== -1) existing[idx] = img;
    } else {
      existing.unshift({ ...img, id: "img_" + Date.now() });
    }
    localStorage.setItem("beerla_gallery", JSON.stringify(existing));
    return existing;
  }
}

export async function deleteGalleryImage(id: string) {
  if (supabase) {
    const { error } = await supabase.from("gallery_images").delete().eq("id", id);
    if (error) throw error;
  } else {
    const existing: GalleryRecord[] = JSON.parse(localStorage.getItem("beerla_gallery") || "[]");
    const filtered = existing.filter((g) => g.id !== id);
    localStorage.setItem("beerla_gallery", JSON.stringify(filtered));
  }
}
