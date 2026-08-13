"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { politician } from "@/content/politician";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { HandSymbolIcon } from "@/components/icons/SocialIcons";

export default function Hero() {
  const { lang } = useLang();
  const t = translations[lang].hero;

  return (
    <section className="hero-section" aria-label="Introduction">
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Alair constituency, Telangana — agricultural landscape at golden hour"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.8) 50%, rgba(10,10,10,0.45) 80%, rgba(10,10,10,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.7))",
          }}
        />
      </div>

      <div className="container-site" style={{ position: "relative", zIndex: 1, paddingTop: " clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="grid-2-col" style={{ minHeight: "auto", gap: "clamp(2rem, 5vw, 4rem)" }}>
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

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
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
                color: "rgba(255,255,255,0.5)",
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
              style={{ marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}
            >
              <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 }}>
                {t.role}
              </p>
              <p style={{ fontSize: "clamp(0.875rem, 1.4vw, 1.05rem)", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
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
                background: "rgba(238,90,28,0.15)",
                border: "1px solid rgba(238,90,28,0.3)",
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
              style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
            >
              <Link href="/public-service" className="btn-primary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.ctaPrimary} <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" className="btn-outline-white" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
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
                src="/images/beerla-portrait.jpg"
                alt="Beerla Ilaiah — Member of Telangana Legislative Assembly, Alair"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.25rem",
                  background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)",
                }}
              >
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  {t.portraitTag}
                </p>
                <p style={{ fontSize: "0.85rem", color: "white", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? "బీర్ల ఇలయ్య - ఆలేరు ఎమ్మెల్యే" : "Beerla Ilaiah — MLA, Alair"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
          {t.scroll}
        </span>
        <ChevronDown size={14} color="rgba(255,255,255,0.3)" />
      </motion.div>
    </section>
  );
}
