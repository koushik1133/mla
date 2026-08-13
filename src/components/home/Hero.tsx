"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { politician } from "@/content/politician";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { HandSymbolIcon } from "@/components/icons/SocialIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";

const defaultSlides = [
  "/images/hero-bg.jpg",
  "/images/yadadri-temple.jpg",
  "/images/hero2.png",
  "/images/alair-agriculture.jpg",
  "/images/kolanupaka-temple.jpg",
  "/images/alair-development.jpg",
];

export default function Hero() {
  const { lang } = useLang();
  const { heroConfig } = useSiteConfig();
  const t = translations[lang].hero;

  // Build slides array from heroConfig or fallback
  const slides = Array.from(
    new Set([
      heroConfig.bgImage || "/images/hero-bg.jpg",
      "/images/yadadri-temple.jpg",
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

  const currentSlide = slides[currentSlideIndex] || "";
  const isTempleSlide = currentSlide.includes("yadadri") || currentSlide.includes("kolanupaka");

  return (
    <section className="hero-section" aria-label="Introduction" style={{ position: "relative", overflow: "hidden", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      {/* Background Slideshow with AnimatePresence */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={currentSlide}
              alt="Alair Constituency & Beerla Ilaiah MLA"
              fill
              priority={currentSlideIndex === 0}
              style={{
                objectFit: "cover",
                objectPosition: isTempleSlide ? "center 25%" : "center 40%",
              }}
              sizes="100vw"
              quality={95}
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer gradient overlays to guarantee perfect text contrast while highlighting temple architecture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isTempleSlide
              ? "linear-gradient(105deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.68) 45%, rgba(10,10,10,0.35) 80%, rgba(10,10,10,0.18) 100%)"
              : "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,0.3) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "220px",
            background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.85))",
          }}
        />

        {/* Carousel Prev/Next Chevron Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Hero Background"
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next Hero Background"
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Slide Dots / Progress Indicator */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "100px",
                background: "rgba(0,0,0,0.45)",
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
                    width: idx === currentSlideIndex ? "20px" : "8px",
                    height: "8px",
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

      <div className="container-site" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)", width: "100%" }}>
        <div className="grid-2-col" style={{ minHeight: "auto", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Congress Affiliation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ marginBottom: "1rem" }}
            >
              <span className="congress-badge" style={{ borderColor: "rgba(22,106,47,0.5)", color: "#4CAF6E", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                <HandSymbolIcon size={12} style={{ fill: "#4CAF6E" }} />
                {t.partyBadge}
              </span>
            </motion.div>

            {/* Name Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
                fontSize: "clamp(2.25rem, 6vw, 4.25rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: lang === "te" ? "0" : "-0.03em",
                lineHeight: 1.1,
                marginBottom: "0.5rem",
              }}
            >
              {lang === "te" ? politician.nameTelugu : politician.name}
            </motion.h1>

            {/* Subtitle / Alt language name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                fontFamily: lang === "te" ? "var(--font-display)" : "var(--font-telugu)",
                fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "1rem",
                letterSpacing: "0.02em",
              }}
            >
              {lang === "te" ? politician.name : politician.nameTelugu}
            </motion.p>

            {/* Saffron divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1.25rem" }}
            />

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ marginBottom: "0.5rem" }}
            >
              <p style={{
                fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(255,255,255,0.92)",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}>
                {t.role}
              </p>
              <p style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)", color: "rgba(255,255,255,0.65)", fontWeight: 400 }}>
                {t.constituency}
              </p>
            </motion.div>

            {/* Government Whip Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{ marginBottom: "1.75rem", marginTop: "0.75rem" }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.875rem",
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="hero-btn-group"
              style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", width: "100%" }}
            >
              <Link href="/public-service" className="btn-primary hero-btn" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.ctaPrimary} <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" className="btn-outline-white hero-btn" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "min(380px, 100%)",
                aspectRatio: "3/4",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
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
              <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", right: "1.25rem" }}>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  PORTRAIT
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "white", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
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
