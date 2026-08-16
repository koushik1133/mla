"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { constituency } from "@/content/constituency";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

export default function AlairSection() {
  const { lang } = useLang();
  const t = translations[lang].alair;

  return (
    <section
      className="section-padding"
      style={{ background: "var(--white)" }}
      aria-labelledby="alair-heading"
    >
      <div className="container-site">
        <div className="grid-2-col">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
            <span className="accent-line" />
            <h2 className="section-title" id="alair-heading" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.title}
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.subtitle}
            </p>

            {/* Mandals grid */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.eightMandals}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {constituency.mandals.map((m) => (
                  <span key={m.name} className="tag tag-saffron" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? m.nameTelugu : m.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Landmarks */}
            <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {constituency.keyLandmarks.slice(0, 2).map((landmark) => (
                <div
                  key={landmark.name}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem",
                    background: "var(--warm-bg)",
                    borderRadius: "10px",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div style={{ flex: "0 0 auto", width: "32px", height: "32px", borderRadius: "8px", background: "rgba(238,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={15} color="var(--saffron)" />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" && landmark.nameTelugu ? landmark.nameTelugu : landmark.name}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.4, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {(lang === "te" && landmark.descriptionTelugu ? landmark.descriptionTelugu : landmark.description).slice(0, 120)}…
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/alair" className="btn-primary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.exploreBtn} <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right — Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: "1rem" }}>
              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "16/9", position: "relative" }}>
                <Image
                  src="/images/yadadri-temple.jpg"
                  alt="Yadadri Sri Lakshmi Narasimha Swamy Temple, Yadagirigutta — Alair constituency"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{ position: "absolute", bottom: "0.875rem", left: "0.875rem" }}>
                  <span style={{ display: "inline-block", padding: "0.25rem 0.7rem", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {t.yadadriBadge}
                  </span>
                </div>
              </div>

              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "16/8", position: "relative" }}>
                <Image
                  src="/images/alair-agriculture.jpg"
                  alt="Alair constituency — agricultural farmlands, Yadadri Bhuvanagiri"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{ position: "absolute", bottom: "0.875rem", left: "0.875rem" }}>
                  <span style={{ display: "inline-block", padding: "0.25rem 0.7rem", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {t.agriBadge}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
