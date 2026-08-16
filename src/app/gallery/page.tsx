"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { fetchGalleryImages } from "@/lib/supabase";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  titleTelugu: string;
  category: string;
  categoryTelugu: string;
  caption: string;
  captionTelugu: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  bgColor?: string;
}

const defaultGalleryImages: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/hero-bg.jpg",
    title: "Alair Countryside & Farmlands",
    titleTelugu: "ఆలేరు గ్రామీణ ప్రాంతం & వ్యవసాయ భూములు",
    category: "Landscape",
    categoryTelugu: "ప్రకృతి దృశ్యం",
    caption: "Golden hour over the agricultural farmlands of Alair assembly constituency, Yadadri Bhuvanagiri district.",
    captionTelugu: "యాదాద్రి భువనగిరి జిల్లా ఆలేరు నియోజకవర్గ వ్యవసాయ భూముల దృశ్యం.",
    objectFit: "cover",
    objectPosition: "center center",
  },
  {
    id: "g2",
    src: "/images/beerla-portrait.jpg",
    title: "Beerla Ilaiah — MLA, Alair",
    titleTelugu: "బీర్ల ఐలయ్య — ఆలేరు శాసనసభ్యులు",
    category: "Leadership",
    categoryTelugu: "నాయకత్వం",
    caption: "Beerla Ilaiah, Member of Telangana Legislative Assembly representing Alair Constituency No. 97.",
    captionTelugu: "ఆలేరు నియోజకవర్గం 97 శాసనసభ్యులు బీర్ల ఐలయ్య గారు.",
    objectFit: "cover",
    objectPosition: "center top",
  },
  {
    id: "g3",
    src: "/images/constituency-map.jpg",
    title: "Alair Constituency Mandal Map",
    titleTelugu: "ఆలేరు నియోజకవర్గ మండలాల పటం",
    category: "Geography",
    categoryTelugu: "భౌగోళికం",
    caption: "Illustrative map showing the eight mandals of Alair Assembly Constituency.",
    captionTelugu: "ఆలేరు నియోజకవర్గ ఎనిమిది మండలాల ప్రాంత పటం.",
    objectFit: "contain",
    objectPosition: "center center",
    bgColor: "#FAF6F0",
  },
  {
    id: "g4",
    src: "/images/yadadri-temple.jpg",
    title: "Yadadri Sri Lakshmi Narasimha Swamy Temple",
    titleTelugu: "యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం",
    category: "Heritage",
    categoryTelugu: "పుణ్యక్షేత్రం",
    caption: "The magnificent stone-carved Yadadri temple complex in Yadagirigutta mandal.",
    captionTelugu: "యాదగిరిగుట్ట మండలంలో కొలువైన ప్రసిద్ధ ఆధ్యాత్మిక క్షేత్రం యాదాద్రి ఆలయం.",
    objectFit: "cover",
    objectPosition: "center 25%",
  },
  {
    id: "g5",
    src: "/images/alair-agriculture.jpg",
    title: "Agricultural Farmlands of Alair",
    titleTelugu: "ఆలేరు నియోజకవర్గ వ్యవసాయ క్షేత్రాలు",
    category: "Agriculture",
    categoryTelugu: "వ్యవసాయం",
    caption: "Lush green agricultural fields representing the rural farming economy of Alair.",
    captionTelugu: "ఆలేరు నియోజకవర్గ పచ్చని వ్యవసాయ పొలాలు.",
    objectFit: "cover",
    objectPosition: "center center",
  },
  {
    id: "g6",
    src: "/images/kolanupaka-temple.jpg",
    title: "Kolanupaka Jain & Someswara Temple",
    titleTelugu: "ప్రాచీన కొలనుపాక జైన దేవాలయం",
    category: "Heritage",
    categoryTelugu: "పుణ్యక్షేత్రం",
    caption: "2,000-year-old historic Kolanupaka Jain & Someswara temple heritage site in Alair constituency.",
    captionTelugu: "ఆలేరు నియోజకవర్గంలో 2000 సంవత్సరాల ప్రాచీన కొలనుపాక జైన దేవాలయం.",
    objectFit: "cover",
    objectPosition: "center 30%",
  },
  {
    id: "g7",
    src: "/images/alair-development.jpg",
    title: "Alair Infrastructure & Development",
    titleTelugu: "ఆలేరు మౌలిక సదుపాయాలు & అభివృద్ధి",
    category: "Development",
    categoryTelugu: "అభివృద్ధి",
    caption: "Modern infrastructure, roads, and constituency development projects under leadership of MLA Beerla Ilaiah.",
    captionTelugu: "ఎమ్మెల్యే బీర్ల ఐలయ్య గారి నాయకత్వంలో ఆలేరు రోడ్లు, ఉపాధి మరియు మౌలిక వసతుల కల్పన.",
    objectFit: "cover",
    objectPosition: "center 35%",
  },
];

export default function GalleryPage() {
  const { lang } = useLang();
  const t = translations[lang].gallery;
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [photos, setPhotos] = useState<GalleryItem[]>(defaultGalleryImages);

  useEffect(() => {
    async function loadGallery() {
      try {
        const dynamic = await fetchGalleryImages();
        if (dynamic && dynamic.length > 0) {
          const mapped: GalleryItem[] = dynamic.map((g) => ({
            id: g.id || `g_${Math.random()}`,
            src: g.src,
            title: g.title,
            titleTelugu: g.title_telugu || g.title,
            category: g.category || "Photo",
            categoryTelugu: g.category_telugu || "ఫోటో",
            caption: g.caption || g.title,
            captionTelugu: g.caption_telugu || g.title_telugu || g.title,
            objectFit: (g.object_fit as any) || (g.src.includes("map") ? "contain" : g.src.includes("portrait") ? "cover" : "cover"),
            objectPosition: g.object_position || (g.src.includes("portrait") ? "center top" : "center center"),
            bgColor: g.src.includes("map") ? "#FAF6F0" : undefined,
          }));
          setPhotos(mapped);
        }
      } catch (e) {
        console.error("Using default gallery photos:", e);
      }
    }
    loadGallery();
  }, []);

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
          <div className="grid-3-col">
            {photos.map((img) => {
              const isPortrait = img.src.includes("portrait");
              const isMap = img.src.includes("map");

              return (
                <div
                  key={img.id}
                  className="gallery-item"
                  onClick={() => setSelected(img)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View image: ${img.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(img); }}
                  style={{ borderRadius: "14px", overflow: "hidden", background: img.bgColor || "var(--white)", border: "1px solid var(--border)" }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: img.bgColor || "var(--charcoal)" }}>
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      unoptimized
                      style={{
                        objectFit: img.objectFit || (isMap ? "contain" : "cover"),
                        objectPosition: img.objectPosition || (isPortrait ? "center top" : "center center"),
                        padding: isMap ? "1rem" : "0",
                      }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="gallery-overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        padding: "0.85rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        gap: "0.35rem",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "fit-content",
                          background: "rgba(255, 245, 235, 0.88)",
                          backdropFilter: "blur(6px)",
                          WebkitBackdropFilter: "blur(6px)",
                          border: "1px solid rgba(255, 255, 255, 0.5)",
                          color: "#C85A17",
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          padding: "0.22rem 0.7rem",
                          borderRadius: "9999px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
                          fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                        }}
                      >
                        {lang === "te" ? img.categoryTelugu : img.category}
                      </span>
                      <div
                        style={{
                          display: "inline-block",
                          width: "fit-content",
                          maxWidth: "92%",
                          background: "rgba(15, 23, 42, 0.5)",
                          backdropFilter: "blur(6px)",
                          WebkitBackdropFilter: "blur(6px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: "8px",
                          padding: "0.35rem 0.65rem",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.88rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            lineHeight: 1.25,
                            margin: 0,
                            fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                          }}
                        >
                          {lang === "te" ? img.titleTelugu : img.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--white)",
              borderRadius: "16px",
              maxWidth: "760px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "420px", background: selected.bgColor || "var(--charcoal)" }}>
              <Image
                src={selected.src}
                alt={selected.title}
                fill
                unoptimized
                style={{
                  objectFit: selected.objectFit || (selected.src.includes("map") ? "contain" : "cover"),
                  objectPosition: selected.objectPosition || (selected.src.includes("portrait") ? "center top" : "center center"),
                  padding: selected.src.includes("map") ? "1.5rem" : "0",
                }}
              />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close modal"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  border: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <span className="tag tag-saffron" style={{ fontSize: "0.7rem", marginBottom: "0.5rem", display: "inline-block", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? selected.categoryTelugu : selected.category}
              </span>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? selected.titleTelugu : selected.title}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.6, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? selected.captionTelugu : selected.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
