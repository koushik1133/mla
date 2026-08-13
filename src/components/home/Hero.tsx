"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { politician } from "@/content/politician";

export default function Hero() {
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
        {/* Gradient overlay — left side darker for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.3) 75%, rgba(10,10,10,0.15) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to bottom, transparent, rgba(10,10,10,0.6))",
          }}
        />
      </div>

      <div className="container-site" style={{ position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          {/* Left — Content */}
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
              style={{ marginBottom: "1.25rem" }}
            >
              <span className="congress-badge" style={{ borderColor: "rgba(22,106,47,0.5)", color: "#4CAF6E" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C10.9 2 10 2.9 10 4V11C10 11.6 9.6 12 9 12C8.4 12 8 11.6 8 11V7C8 5.9 7.1 5 6 5C4.9 5 4 5.9 4 7V14C4 17.3 6.7 20 10 20H14C17.3 20 20 17.3 20 14V8C20 6.9 19.1 6 18 6C16.9 6 16 6.9 16 8V11C16 11.6 15.6 12 15 12C14.4 12 14 11.6 14 11V4C14 2.9 13.1 2 12 2Z" fill="#4CAF6E"/>
                </svg>
                Indian National Congress
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: "0.5rem",
              }}
            >
              Beerla Ilaiah
            </motion.h1>

            {/* Telugu Name */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{
                fontFamily: "var(--font-telugu)",
                fontSize: "1.3rem",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "1.25rem",
                letterSpacing: "0.02em",
              }}
            >
              {politician.nameTelugu}
            </motion.p>

            {/* Saffron divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1.5rem" }}
            />

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ marginBottom: "0.5rem" }}
            >
              <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 }}>
                Member of the Telangana Legislative Assembly
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)", color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>
                Alair Constituency No. 97 · Yadadri Bhuvanagiri
              </p>
            </motion.div>

            {/* Government Whip Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{ marginBottom: "2rem", marginTop: "0.75rem" }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.875rem",
                background: "rgba(238,90,28,0.15)",
                border: "1px solid rgba(238,90,28,0.3)",
                borderRadius: "100px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--saffron-light)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                <span style={{ width: "6px", height: "6px", background: "var(--saffron)", borderRadius: "50%", display: "inline-block" }} />
                Government Whip · Telangana
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
            >
              <Link href="/public-service" className="btn-primary">
                Explore Public Work <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" className="btn-outline-white">
                View Gallery
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}
          >
            <div
              style={{
                position: "relative",
                width: "min(420px, 90%)",
                aspectRatio: "3/4",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Image
                src="/images/beerla-portrait.jpg"
                alt="Beerla Ilaiah — Member of Telangana Legislative Assembly, Alair"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 768px) 0px, 420px"
              />
              {/* Bottom info overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                  background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)",
                }}
              >
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                  Portrait — Placeholder
                </p>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>
                  Replace with authenticated photograph
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
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={16} color="rgba(255,255,255,0.3)" />
      </motion.div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          div[style*="justifyContent: flex-end"] {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
