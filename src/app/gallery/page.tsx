"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Info } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

const galleryImages = [
  {
    id: "g1",
    src: "/images/hero-bg.jpg",
    title: "Alair Countryside & Farmlands",
    titleTelugu: "ఆలేరు గ్రామీణ ప్రాంతం & వ్యవసాయ భూములు",
    category: "Landscape",
    categoryTelugu: "ప్రకృతి దృశ్యం",
    caption: "Golden hour over the agricultural farmlands of Alair assembly constituency, Yadadri Bhuvanagiri district.",
    captionTelugu: "యాదాద్రి భువనగిరి జిల్లా ఆలేరు నియోజకవర్గ వ్యవసాయ భూముల దృశ్యం.",
  },
  {
    id: "g2",
    src: "/images/yadadri-temple.jpg",
    title: "Yadadri Sri Lakshmi Narasimha Swamy Temple",
    titleTelugu: "యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం",
    category: "Heritage",
    categoryTelugu: "పుణ్యక్షేత్రం",
    caption: "The magnificent stone-carved Yadadri temple complex in Yadagirigutta mandal.",
    captionTelugu: "యాదగిరిగుట్ట మండలంలో కొలువైన ఆధ్యాత్మిక క్షేత్రం యాదాద్రి ఆలయం.",
  },
  {
    id: "g3",
    src: "/images/beerla-portrait.jpg",
    title: "Beerla Ilaiah — MLA, Alair",
    titleTelugu: "బీర్ల ఇలయ్య — ఆలేరు శాసనసభ్యులు",
    category: "Leadership",
    categoryTelugu: "నాయకత్వం",
    caption: "Beerla Ilaiah, Member of Telangana Legislative Assembly representing Alair Constituency No. 97.",
    captionTelugu: "ఆలేరు నియోజకవర్గం 97 శాసనసభ్యులు బీర్ల ఇలయ్య గారు.",
  },
  {
    id: "g4",
    src: "/images/alair-agriculture.jpg",
    title: "Agricultural Farmlands of Alair",
    titleTelugu: "ఆలేరు నియోజకవర్గ వ్యవసాయ క్షేత్రాలు",
    category: "Agriculture",
    categoryTelugu: "వ్యవసాయం",
    caption: "Lush green agricultural fields representing the rural farming economy of Alair.",
    captionTelugu: "ఆలేరు నియోజకవర్గ పచ్చని వ్యవసాయ పొలాలు.",
  },
  {
    id: "g5",
    src: "/images/constituency-map.jpg",
    title: "Alair Constituency Mandal Map",
    titleTelugu: "ఆలేరు నియోజకవర్గ మండలాల పటం",
    category: "Geography",
    categoryTelugu: "భౌగోళికం",
    caption: "Illustrative map showing the eight mandals of Alair Assembly Constituency.",
    captionTelugu: "ఆలేరు నియోజకవర్గ ఎనిమిది మండలాల ప్రాంత పటం.",
  },
];

export default function GalleryPage() {
  const { lang } = useLang();
  const t = translations[lang].gallery;
  const [selected, setSelected] = useState<typeof galleryImages[0] | null>(null);

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

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-site">
          <div className="gallery-masonry">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setSelected(img)}
                tabIndex={0}
                role="button"
                aria-label={`View image: ${img.title}`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(img); }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden" }}>
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="gallery-overlay">
                    <span className="tag tag-saffron" style={{ marginBottom: "0.4rem", alignSelf: "flex-start", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" ? img.categoryTelugu : img.category}
                    </span>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "white", lineHeight: 1.25, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" ? img.titleTelugu : img.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "900px",
              width: "100%",
              background: "var(--charcoal)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                zIndex: 10,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="900px"
              />
            </div>

            <div style={{ padding: "1.5rem", color: "white" }}>
              <span className="tag tag-saffron" style={{ marginBottom: "0.5rem", display: "inline-block", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? selected.categoryTelugu : selected.category}
              </span>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.35rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? selected.titleTelugu : selected.title}
              </p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? selected.captionTelugu : selected.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
