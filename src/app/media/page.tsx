"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, ExternalLink, Filter } from "lucide-react";
import { videos as defaultVideos, VideoItem } from "@/content/videos";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { fetchMediaVideos, getYouTubeThumbnail, extractYouTubeId } from "@/lib/supabase";

type Category = "all" | "interview" | "public-event" | "government" | "congress" | "development";

export default function MediaPage() {
  const { lang } = useLang();
  const t = translations[lang].media;
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

  const filtered = activeFilter === "all"
    ? videoList
    : videoList.filter((v) => v.category === activeFilter);

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
            {(Object.keys(t.categories) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "0.35rem 0.875rem",
                  border: "1.5px solid",
                  borderColor: activeFilter === cat ? "var(--saffron)" : "var(--border)",
                  borderRadius: "100px",
                  background: activeFilter === cat ? "var(--saffron)" : "transparent",
                  color: activeFilter === cat ? "white" : "var(--muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                }}
              >
                {t.categories[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid-3-col">
            {filtered.map((video) => {
              const thumb = getYouTubeThumbnail(video.youtubeId, video.thumbnailUrl);
              const cleanId = extractYouTubeId(video.youtubeId);
              const videoUrl = cleanId && cleanId.length === 11
                ? `https://www.youtube.com/watch?v=${cleanId}`
                : `https://www.youtube.com/results?search_query=${encodeURIComponent(video.youtubeSearchQuery)}`;

              return (
                <a
                  key={video.id}
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card"
                  style={{ display: "block", textDecoration: "none", borderRadius: "14px", overflow: "hidden", background: "white", border: "1px solid var(--border)" }}
                  aria-label={`Watch ${video.title}`}
                >
                  <div className="video-thumbnail" style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "var(--charcoal)" }}>
                    <Image
                      src={thumb}
                      alt={video.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

                    {/* Channel Overlay Badge */}
                    <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", padding: "0.25rem 0.6rem", borderRadius: "6px", fontSize: "0.7rem", color: "white", fontWeight: 700 }}>
                      {video.publisher}
                    </div>

                    {/* Centered Play Button */}
                    <div className="play-button" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--saffron)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.4)" }}>
                        <Play size={20} color="white" fill="white" style={{ marginLeft: "3px" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <span className="tag tag-saffron" style={{ fontSize: "0.65rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {t.categories[video.category] || video.category}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {lang === "te" && video.dateTelugu ? video.dateTelugu : video.date}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.4rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" && video.titleTelugu ? video.titleTelugu : video.title}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {video.publisher}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--saffron)", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      <ExternalLink size={12} /> {t.searchYoutube}
                    </div>
                  </div>
                </a>
              );
            })}
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

