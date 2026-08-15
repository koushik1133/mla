"use client";

import { useState, useEffect } from "react";
import { Play, ExternalLink, Filter } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { fetchMediaVideos, extractYouTubeId, MediaRecord } from "@/lib/supabase";
import { videos as staticVideos } from "@/content/videos";

type Category = "all" | "interview" | "public-event" | "government" | "congress" | "development" | string;

// Adapt static videos (src/content/videos.ts format) to MediaRecord shape
const staticFallback: MediaRecord[] = staticVideos.map((v) => ({
  id: v.id,
  title: v.title,
  title_telugu: v.titleTelugu || v.title,
  youtube_id: v.youtubeSearchQuery || "",   // static videos store a search query
  category: v.category === "interview" ? "Interview" :
            v.category === "public-event" ? "Public Event" :
            v.category === "government" ? "Government" :
            v.category === "congress" ? "Congress" :
            v.category === "development" ? "Development" : "Assembly Speech",
  category_telugu: v.category,
  date: v.date,
  channel: v.publisher,
  channel_telugu: v.publisher,
  is_featured: false,
}));

export default function MediaPage() {
  const { lang } = useLang();
  const t = translations[lang].media;
  const [allVideos, setAllVideos] = useState<MediaRecord[]>(staticFallback);
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [videoList, setVideoList] = useState<VideoItem[]>(defaultVideos);

  useEffect(() => {
    async function loadVideos() {
      try {
        const dynamicVideos = await fetchMediaVideos();
        if (dynamicVideos && dynamicVideos.length > 0) {
          const mapped: VideoItem[] = dynamicVideos.map((v) => ({
            id: v.id || `vid_${Math.random()}`,
            title: v.title,
            titleTelugu: v.title_telugu || v.title,
            publisher: v.channel || "Telugu News",
            date: v.date,
            dateTelugu: v.date,
            category: (v.category?.toLowerCase().includes("interview") ? "interview" : "public-event") as any,
            youtubeId: extractYouTubeId(v.youtube_id),
            thumbnailUrl: v.thumbnail_url,
            youtubeSearchQuery: `Beerla Ilaiah ${v.title}`,
          }));
          setVideoList(mapped);
        }
      } catch (e) {
        console.error("Using default video list:", e);
      }
    }
    loadVideos();
  }, []);

  useEffect(() => {
    fetchMediaVideos().then((dynamic) => {
      if (dynamic && dynamic.length > 0) setAllVideos(dynamic);
    }).catch(() => {/* keep static fallback */});
  }, []);

  // Collect distinct categories from loaded videos
  const categories = Array.from(new Set(allVideos.map((v) => v.category.toLowerCase().replace(/\s+/g, "-"))));

  const filtered = activeFilter === "all"
    ? allVideos
    : allVideos.filter((v) => v.category.toLowerCase().replace(/\s+/g, "-") === activeFilter);

  // Render a single video card
  const renderCard = (video: MediaRecord, idx: number) => {
    const ytId = extractYouTubeId(video.youtube_id || "");
    const hasYtId = Boolean(ytId && ytId.length === 11);
    const thumb = video.thumbnail_url || "/images/alair-agriculture.jpg";
    const ytUrl = hasYtId
      ? `https://www.youtube.com/watch?v=${ytId}`
      : `https://www.google.com/search?q=${encodeURIComponent("Beerla Ilaiah MLA " + video.title)}`;

    const title = lang === "te" ? (video.title_telugu || video.title) : video.title;
    const channel = lang === "te" ? (video.channel_telugu || video.channel || "") : (video.channel || "");
    const catLabel = lang === "te" ? (video.category_telugu || video.category) : video.category;

    return (
      <a
        key={video.id || idx}
        href={ytUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="video-card"
        style={{ display: "block", textDecoration: "none" }}
        aria-label={title}
      >
        <div className="video-thumbnail" style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#0F172A" }}>
          <img
            src={thumb}
            alt={title}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/alair-agriculture.jpg";
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="play-button" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--saffron)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
              <Play size={18} color="white" fill="white" style={{ marginLeft: "2px" }} />
            </div>
          </div>
          {video.is_featured && (
            <span style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "var(--saffron)", color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "4px", textTransform: "uppercase" }}>Featured</span>
          )}
        </div>

        <div style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
            <span className="tag tag-saffron" style={{ fontSize: "0.65rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {catLabel}
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {video.date}
            </span>
          </div>
          <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "0.4rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {title}
          </p>
          {channel && (
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {channel}
            </p>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--saffron)", fontWeight: 600 }}>
            <ExternalLink size={12} /> {t.searchYoutube || "Watch on YouTube"}
          </div>
        </div>
      </a>
    );
  };

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            {t.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.65, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: "var(--white)", padding: "1.25rem 0", borderBottom: "1px solid var(--border)", position: "sticky", top: "64px", zIndex: 10 }}>
        <div className="container-site">
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Filter size={14} color="var(--muted-light)" />
            <button
              onClick={() => setActiveFilter("all")}
              style={{ padding: "0.35rem 0.875rem", border: "1.5px solid", borderColor: activeFilter === "all" ? "var(--saffron)" : "var(--border)", borderRadius: "100px", background: activeFilter === "all" ? "var(--saffron)" : "transparent", color: activeFilter === "all" ? "white" : "var(--muted)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}
            >
              {lang === "te" ? "అన్నీ" : "All"}
            </button>
            {categories.map((cat) => {
              const sample = allVideos.find((v) => v.category.toLowerCase().replace(/\s+/g, "-") === cat);
              const label = lang === "te" ? (sample?.category_telugu || cat) : (sample?.category || cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{ padding: "0.35rem 0.875rem", border: "1.5px solid", borderColor: activeFilter === cat ? "var(--saffron)" : "var(--border)", borderRadius: "100px", background: activeFilter === cat ? "var(--saffron)" : "transparent", color: activeFilter === cat ? "white" : "var(--muted)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Videos grid */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid-3-col">
            {filtered.map((video, idx) => renderCard(video, idx))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
              <p style={{ fontSize: "1.1rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? "ఈ వర్గంలో వీడియోలు లేవు." : "No videos in this category."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

