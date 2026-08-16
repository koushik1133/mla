"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { videos as staticVideos } from "@/content/videos";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { fetchMediaVideos, extractYouTubeId, MediaRecord } from "@/lib/supabase";

// Telugu labels for the video category slugs used in src/content/videos.ts
const categoryTeluguBySlug: Record<string, string> = {
  interview: "ఇంటర్వ్యూ",
  "public-event": "ప్రజా కార్యక్రమం",
  government: "ప్రభుత్వం",
  congress: "కాంగ్రెస్",
  development: "అభివృద్ధి",
};

export default function VideoSection() {
  const { lang } = useLang();
  const t = translations[lang].media;
  const [videoList, setVideoList] = useState<MediaRecord[]>([]);

  useEffect(() => {
    fetchMediaVideos()
      .then((dynamic) => {
        if (dynamic && dynamic.length > 0) {
          setVideoList(dynamic.slice(0, 3));
        } else {
          setVideoList(
            staticVideos.slice(0, 3).map((v) => ({
              id: v.id,
              title: v.title,
              title_telugu: v.titleTelugu || v.title,
              youtube_id: v.youtubeSearchQuery || "",
              category: v.category === "interview" ? "Interview" : "Assembly Speech",
              category_telugu: categoryTeluguBySlug[v.category] || "అసెంబ్లీ ప్రసంగం",
              date: v.date,
              date_telugu: v.dateTelugu || v.date,
              channel: v.publisher,
              channel_telugu: v.publisher,
            }))
          );
        }
      })
      .catch(() => {
        setVideoList(
          staticVideos.slice(0, 3).map((v) => ({
            id: v.id,
            title: v.title,
            title_telugu: v.titleTelugu || v.title,
            youtube_id: v.youtubeSearchQuery || "",
            category: v.category === "interview" ? "Interview" : "Assembly Speech",
            category_telugu: categoryTeluguBySlug[v.category] || "అసెంబ్లీ ప్రసంగం",
            date: v.date,
            date_telugu: v.dateTelugu || v.date,
            channel: v.publisher,
            channel_telugu: v.publisher,
          }))
        );
      });
  }, []);

  return (
    <section
      className="section-padding"
      style={{ background: "var(--charcoal)" }}
      aria-labelledby="video-heading"
    >
      <div className="container-site">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
            <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 className="section-title" id="video-heading" style={{ color: "white", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.title}
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", lineHeight: 1.6, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.subtitle}
            </p>
          </div>
          <Link href="/media" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.allMedia} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid-3-col">
          {videoList.map((video, i) => {
            const ytId = extractYouTubeId(video.youtube_id || "");
            const hasValidYt = Boolean(ytId && ytId.length === 11);
            const thumb = video.thumbnail_url || "/images/alair-agriculture.jpg";
            const ytUrl = hasValidYt
              ? `https://www.youtube.com/watch?v=${ytId}`
              : `https://www.google.com/search?q=${encodeURIComponent("Beerla Ilaiah MLA " + video.title)}`;
            const title = lang === "te" ? (video.title_telugu || video.title) : video.title;
            const channel = lang === "te" ? (video.channel_telugu || video.channel || "") : (video.channel || "");
            const catLabel = lang === "te" ? (video.category_telugu || video.category) : video.category;

            return (
              <motion.div
                key={video.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <a
                  href={ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card"
                  style={{ display: "block", textDecoration: "none" }}
                  aria-label={`Watch: ${title}`}
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
                    <div className="play-button">
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "var(--saffron)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                      }}>
                        <Play size={18} color="white" fill="white" style={{ marginLeft: "2px" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <span className="tag tag-saffron" style={{ fontSize: "0.65rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {catLabel}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--muted-light)" }}>{lang === "te" ? (video.date_telugu || video.date) : video.date}</span>
                    </div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {title}
                    </p>
                    {channel && (
                      <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.4, margin: 0, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {channel}
                      </p>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--saffron)", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      <ExternalLink size={12} /> {t.searchYoutube || "Watch on YouTube"}
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Link href="/media" className="btn-outline-white" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
            {t.allMedia}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
