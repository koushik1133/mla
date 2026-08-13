"use client";

import React from "react";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLang } from "@/lib/lang-context";

export default function NewsTicker() {
  const { tickerItems } = useSiteConfig();
  const { lang } = useLang();

  const activeItems = tickerItems.filter((item) => item.active);

  if (activeItems.length === 0) return null;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #111111 0%, #1a1a1a 50%, #111111 100%)",
        color: "#FFFFFF",
        borderBottom: "1px solid rgba(238,90,28,0.25)",
        fontSize: "0.78rem",
        fontWeight: 600,
        overflow: "hidden",
        position: "relative",
        zIndex: 50,
        height: "36px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Label Badge */}
      <div
        style={{
          background: "var(--saffron)",
          color: "white",
          padding: "0 0.875rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontWeight: 800,
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          flexShrink: 0,
          zIndex: 2,
          boxShadow: "4px 0 12px rgba(0,0,0,0.3)",
          fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
        }}
      >
        <Megaphone size={13} color="white" />
        {lang === "te" ? "తాజా సమాచారం" : "UPDATES"}
      </div>

      {/* Marquee Track */}
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "ticker-scroll 28s linear infinite",
            gap: "3rem",
            paddingLeft: "2rem",
          }}
        >
          {activeItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.link ? (
                <Link
                  href={item.link}
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--saffron-light)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.92)")}
                >
                  {lang === "te" ? item.textTe : item.textEn}
                </Link>
              ) : (
                <span
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                  }}
                >
                  {lang === "te" ? item.textTe : item.textEn}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate Track for Infinite Loop */}
        <div
          style={{
            display: "inline-flex",
            animation: "ticker-scroll 28s linear infinite",
            gap: "3rem",
            paddingLeft: "3rem",
          }}
          aria-hidden="true"
        >
          {activeItems.map((item) => (
            <React.Fragment key={`dup_${item.id}`}>
              {item.link ? (
                <Link
                  href={item.link}
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                  }}
                >
                  {lang === "te" ? item.textTe : item.textEn}
                </Link>
              ) : (
                <span
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                  }}
                >
                  {lang === "te" ? item.textTe : item.textEn}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
