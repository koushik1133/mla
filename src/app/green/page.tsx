"use client";

import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import FactStrip from "@/components/home/FactStrip";
import AboutPreview from "@/components/home/AboutPreview";
import JourneyPreview from "@/components/home/JourneyPreview";
import AlairSection from "@/components/home/AlairSection";
import ElectionStats from "@/components/home/ElectionStats";
import VideoSection from "@/components/home/VideoSection";
import NewsPreview from "@/components/home/NewsPreview";
import ContactCTA from "@/components/home/ContactCTA";
import { useTheme } from "@/context/ThemeContext";
import { useLang } from "@/lib/lang-context";
import { CheckCircle2, Palette, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GreenThemePage() {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();

  useEffect(() => {
    // Automatically set Congress Green theme when entering /green
    setTheme("green");
  }, []);

  return (
    <div>
      {/* Green Version Active Banner Bar */}
      <div
        style={{
          background: "#009A44",
          color: "white",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          boxShadow: "0 4px 12px rgba(0,154,68,0.3)",
          position: "relative",
          zIndex: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <CheckCircle2 size={18} color="#FFFFFF" />
          <span style={{ fontSize: "0.85rem", fontWeight: 800, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
            {lang === "te" ? "🟢 కాంగ్రెస్ గ్రీన్ వర్షన్ సక్రియంగా ఉంది (#009A44)" : "🟢 Congress Green Theme Version Active (#009A44)"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setTheme(theme === "green" ? "saffron" : "green")}
            style={{
              padding: "0.35rem 0.875rem",
              borderRadius: "100px",
              background: "white",
              color: "#009A44",
              border: "none",
              fontSize: "0.78rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
            }}
          >
            <Palette size={14} />
            {theme === "green"
              ? (lang === "te" ? "సాఫ్రాన్ (ఆరెంజ్) చూడండి" : "Switch to Saffron (Orange)")
              : (lang === "te" ? "కాంగ్రెస్ గ్రీన్ చూడండి" : "Switch to Congress Green")}
          </button>

          <Link
            href="/"
            style={{
              color: "white",
              fontSize: "0.78rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
            }}
          >
            <ArrowLeft size={14} /> {lang === "te" ? "ముఖ్య పేజీకి వెళ్లండి" : "Main Route"}
          </Link>
        </div>
      </div>

      {/* Full Homepage Components in Green Theme */}
      <Hero />
      <FactStrip />
      <AboutPreview />
      <JourneyPreview />
      <AlairSection />
      <ElectionStats />
      <VideoSection />
      <NewsPreview />
      <ContactCTA />
    </div>
  );
}
