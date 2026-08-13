"use client";

import Link from "next/link";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { videos } from "@/content/videos";

export default function VideoSection() {
  const featured = videos.slice(0, 3);

  return (
    <section
      className="section-padding"
      style={{ background: "var(--charcoal)" }}
      aria-labelledby="video-heading"
    >
      <div className="container-site">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label" style={{ color: "var(--saffron-light)" }}>Media</p>
            <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 className="section-title" id="video-heading" style={{ color: "white" }}>
              Interviews &amp; Media
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "500px", lineHeight: 1.6 }}>
              Beerla Ilaiah&apos;s public statements, interviews, and media appearances across Telugu news channels.
            </p>
          </div>
          <Link href="/media" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600 }}>
            All Media <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {featured.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.youtubeSearchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card"
                style={{ display: "block", textDecoration: "none" }}
                aria-label={`Watch: ${video.title} on ${video.publisher}`}
              >
                {/* Thumbnail placeholder */}
                <div className="video-thumbnail">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, hsl(${i * 40 + 20}, 20%, 18%) 0%, hsl(${i * 40 + 30}, 15%, 12%) 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ textAlign: "center", padding: "1rem" }}>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        {video.publisher}
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
                        {video.title.slice(0, 60)}{video.title.length > 60 ? "…" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="play-button">
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(238,90,28,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(238,90,28,0.4)",
                    }}>
                      <Play size={18} color="white" fill="white" style={{ marginLeft: "2px" }} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span className="tag tag-saffron" style={{ fontSize: "0.65rem" }}>{video.category}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted-light)" }}>{video.date}</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "0.5rem" }}>
                    {video.title}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.4 }}>
                    {video.publisher}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--saffron)", fontWeight: 600 }}>
                    <ExternalLink size={12} /> Search on YouTube
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "2.5rem" }}
        >
          <Link href="/media" className="btn-outline-white">
            View All Media <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
