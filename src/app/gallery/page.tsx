"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

// Gallery items — using generated landscape/constituency images
// Note: In production, replace with authenticated photographs from official sources
const galleryItems = [
  {
    id: "g1",
    src: "/images/yadadri-temple.jpg",
    alt: "Yadadri Sri Lakshmi Narasimha Swamy Temple — Yadagirigutta mandal, Alair constituency",
    caption: "Yadadri Temple, Yadagirigutta",
    category: "Constituency",
    credit: "Illustrative image",
    aspectClass: "tall",
  },
  {
    id: "g2",
    src: "/images/alair-agriculture.jpg",
    alt: "Agricultural farmlands of Alair constituency, Yadadri Bhuvanagiri district",
    caption: "Alair Agriculture — Paddy & Sugarcane Fields",
    category: "Constituency",
    credit: "Illustrative image",
    aspectClass: "wide",
  },
  {
    id: "g3",
    src: "/images/hero-bg.jpg",
    alt: "Telangana countryside at golden hour — Alair region",
    caption: "Alair Region — Golden Hour",
    category: "Constituency",
    credit: "Illustrative image",
    aspectClass: "wide",
  },
  {
    id: "g4",
    src: "/images/beerla-portrait.jpg",
    alt: "Beerla Ilaiah — MLA, Alair Constituency, Telangana",
    caption: "Beerla Ilaiah — MLA, Alair",
    category: "Portrait",
    credit: "Placeholder — replace with authenticated photograph",
    aspectClass: "tall",
  },
  {
    id: "g5",
    src: "/images/constituency-map.jpg",
    alt: "Alair constituency map — eight mandals",
    caption: "Alair Constituency Map — Eight Mandals",
    category: "Constituency",
    credit: "Illustrative map",
    aspectClass: "square",
  },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)" }}>Gallery</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Photo Gallery
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: "520px", lineHeight: 1.65 }}>
            Photographs of Alair constituency, public events, and constituency visits.
          </p>
          <div style={{ marginTop: "1rem", padding: "0.875rem 1rem", background: "rgba(238,90,28,0.1)", border: "1px solid rgba(238,90,28,0.2)", borderRadius: "8px", maxWidth: "540px" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Note: The current gallery contains illustrative images of Alair constituency, Yadadri temple, and the region.
              In the production version, replace with authenticated photographs from official sources, public social media,
              or licensed press photography. All photographs should carry proper source attribution.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-site">
          <div className="gallery-masonry">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => setLightbox(item)}
                role="button"
                tabIndex={0}
                aria-label={`View: ${item.caption}`}
                onKeyDown={(e) => e.key === "Enter" && setLightbox(item)}
              >
                <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={item.aspectClass === "tall" ? 800 : item.aspectClass === "wide" ? 450 : 600}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                  <div className="gallery-overlay">
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", opacity: 0, transition: "opacity 0.25s" }} className="overlay-content">
                      <div>
                        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "white" }}>{item.caption}</p>
                        <span className="tag tag-saffron" style={{ fontSize: "0.6rem" }}>{item.category}</span>
                      </div>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ZoomIn size={14} color="white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1001,
            }}
          >
            <X size={20} color="white" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "900px", width: "100%", position: "relative" }}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={900}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
            />
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", marginBottom: "0.25rem" }}>
                {lightbox.caption}
              </p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                {lightbox.credit}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-item:hover .overlay-content {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
