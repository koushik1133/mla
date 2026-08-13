"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { politician } from "@/content/politician";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { HandSymbolIcon } from "@/components/icons/SocialIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";

const defaultSlides = [
  "/images/hero-bg.jpg",
  "/images/hero2.png",
  "/images/alair-agriculture.jpg",
  "/images/yadadri-temple.jpg",
];

export default function Hero() {
  const { lang } = useLang();
  const { heroConfig } = useSiteConfig();
  const t = translations[lang].hero;

  // Build slides array from heroConfig or fallback
  const slides = Array.from(
    new Set([
      heroConfig.bgImage || "/images/hero-bg.jpg",
      "/images/hero2.png",
      ...(heroConfig.bgImages || defaultSlides),
    ])
  ).filter(Boolean);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-advance slides every 5.5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex];
  const isGraphicSlide = currentSlide?.includes("hero2");

  return (
    <section className="hero-section" aria-label="Introduction" style={{ position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center", background: "#0a0a0a" }}>
      {/* Background Slideshow with AnimatePresence */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={currentSlide}
              alt="Alair Constituency & Beerla Ilaiah MLA"
              fill
              priority={currentSlideIndex === 0}
              style={{
                objectFit: isGraphicSlide ? "contain" : "cover",
                objectPosition: "center center",
              }}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isGraphicSlide
              ? "linear-gradient(180deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.92) 100%)"
              : "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.82) 50%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,0.35) 100%)",
          }}
        />

        {/* Controls: Next/Prev arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Hero Background"
              className="hero-arrow-btn hero-arrow-left"
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next Hero Background"
              className="hero-arrow-btn hero-arrow-right"
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
              }}
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Indicators */}
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "100px",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: idx === currentSlideIndex ? "18px" : "6px",
                    height: "6px",
                    borderRadius: "100px",
                    background: idx === currentSlideIndex ? "var(--saffron)" : "rgba(255,255,255,0.4)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="container-site" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)", width: "100%" }}>
        <div className="grid-2-col hero-mobile-grid" style={{ minHeight: "auto", gap: "clamp(1.5rem, 4vw, 3.5rem)", alignItems: "center" }}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Congress Affiliation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: "0.75rem" }}
            >
              <span className="congress-badge" style={{ borderColor: "rgba(22,106,47,0.5)", color: "#4CAF6E", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                <HandSymbolIcon size={12} style={{ fill: "#4CAF6E" }} />
                {t.partyBadge}
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
                fontSize: "clamp(2rem, 5.5vw, 4rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: lang === "te" ? "0" : "-0.03em",
                lineHeight: 1.1,
                marginBottom: "0.35rem",
              }}
            >
              {lang === "te" ? politician.nameTelugu : politician.name}
            </motion.h1>

            {/* Subtitle / Alt language name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                fontFamily: lang === "te" ? "var(--font-display)" : "var(--font-telugu)",
                fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "0.875rem",
                letterSpacing: "0.02em",
              }}
            >
              {lang === "te" ? politician.name : politician.nameTelugu}
            </motion.p>

            {/* Saffron divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }}
            />

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ marginBottom: "0.5rem" }}
            >
              <p style={{
                fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                color: "rgba(255,255,255,0.92)",
                fontWeight: 700,
                marginBottom: "0.2rem",
              }}>
                {t.role}
              </p>
              <p style={{ fontSize: "clamp(0.825rem, 1.3vw, 1rem)", color: "rgba(255,255,255,0.65)", fontWeight: 400 }}>
                {t.constituency}
              </p>
            </motion.div>

            {/* Government Whip Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ marginBottom: "1.5rem", marginTop: "0.5rem" }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.85rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid var(--saffron)",
                borderRadius: "100px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--saffron-light)",
                letterSpacing: "0.04em",
                fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                maxWidth: "100%",
              }}>
                <span style={{ width: "6px", height: "6px", background: "var(--saffron)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                {t.whipBadge}
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="hero-btn-group"
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", width: "100%" }}
            >
              <Link href="/public-service" className="btn-primary hero-btn" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.ctaPrimary} <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" className="btn-outline-white hero-btn" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Portrait Card (Optimized for Mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-portrait-container"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div
              className="hero-portrait-card"
              style={{
                position: "relative",
                width: "min(380px, 100%)",
                aspectRatio: "3/4",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <Image
                src={heroConfig.sideImage || "/images/beerla-standing.jpg"}
                alt="Beerla Ilaiah — Member of Telangana Legislative Assembly, Alair"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 40%, transparent 60%)",
                }}
              />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.55)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                  PORTRAIT
                </p>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "white", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                  {lang === "te" ? "బీర్ల ఇలయ్య — ఎమ్మెల్యే, ఆలేరు" : "Beerla Ilaiah — MLA, Alair"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
