"use client";

import { useState } from "react";
import { Play, ExternalLink, Filter } from "lucide-react";
import { videos } from "@/content/videos";

type Category = "all" | "interview" | "public-event" | "government" | "congress" | "development";

const categoryLabels: Record<Category, string> = {
  all: "All",
  interview: "Interviews",
  "public-event": "Public Events",
  government: "Government",
  congress: "Congress",
  development: "Development",
};

export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered = activeFilter === "all"
    ? videos
    : videos.filter((v) => v.category === activeFilter);

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)" }}>Media Archive</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Interviews &amp; Media
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.65 }}>
            Video interviews, press appearances, and media coverage of Beerla Ilaiah, MLA Alair, across Telugu news channels and publications.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: "var(--white)", padding: "1.25rem 0", borderBottom: "1px solid var(--border)", position: "sticky", top: "64px", zIndex: 10 }}>
        <div className="container-site">
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Filter size={14} color="var(--muted-light)" />
            {(Object.keys(categoryLabels) as Category[]).map((cat) => (
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
                  fontFamily: "var(--font-body)",
                }}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="section-padding">
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {filtered.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.youtubeSearchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card"
                style={{ display: "block", textDecoration: "none" }}
                aria-label={`Search for: ${video.title} on YouTube`}
              >
                {/* Thumbnail */}
                <div className="video-thumbnail">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, hsl(220, 20%, 16%) 0%, hsl(220, 15%, 10%) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1.5rem",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        {video.publisher}
                      </p>
                      <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
                        {video.title.slice(0, 70)}{video.title.length > 70 ? "…" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="play-button">
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(238,90,28,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Play size={18} color="white" fill="white" style={{ marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span className="tag tag-saffron" style={{ fontSize: "0.65rem" }}>{video.category}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted-light)" }}>{video.date}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "0.4rem" }}>
                    {video.title}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.75rem" }}>
                    {video.publisher}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                    {video.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--saffron)", fontWeight: 600 }}>
                    <ExternalLink size={12} /> Search on YouTube
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
              <p style={{ fontSize: "1.1rem", color: "var(--muted)" }}>No videos in this category.</p>
            </div>
          )}

          <div style={{ marginTop: "3rem", padding: "1.25rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px" }}>
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.55 }}>
              Video references link to YouTube search results for the respective interviews. Embed IDs are not directly included to avoid licensing issues. Please visit the publishers&apos; channels directly for official content.
            </p>
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 900px) {
            div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 580px) {
            div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </div>
  );
}
