"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

export default function AboutPreview() {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <section
      className="section-padding"
      style={{ background: "var(--warm-bg)" }}
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  position: "relative",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
                }}
              >
                <Image
                  src="/images/beerla-portrait.jpg"
                  alt="Beerla Ilaiah — MLA, Alair constituency, Telangana"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "-1.5rem",
                  background: "var(--charcoal)",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  maxWidth: "220px",
                }}
              >
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {t.bornIn}
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "white", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  {lang === "te" ? "సైదాపూర్" : "Saidapur"}
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {t.saidapurLocation}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  left: "-1rem",
                  width: "5px",
                  height: "80px",
                  background: "var(--saffron)",
                  borderRadius: "3px",
                }}
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.label}
            </p>
            <span className="accent-line" />
            <h2 className="section-title" id="about-heading" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.title}
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "1.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.subtitle}
            </p>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.para2}
            </p>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.para3}
            </p>

            {/* Key facts */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "2rem",
                padding: "1.5rem",
                background: "var(--white)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              {[
                { label: t.educationLabel, value: lang === "te" ? "బి.ఏ, ఎస్‌ఎల్ఎన్ఎస్ డిగ్రీ కళాశాల, భువనగిరి" : "B.A., SLNS Degree College, Bhongir" },
                { label: t.communityLabel, value: lang === "te" ? "గొల్ల-కురుమ" : "Golla-Kuruma" },
                { label: t.partyLabel, value: lang === "te" ? "భారత జాతీయ కాంగ్రెస్" : "Indian National Congress" },
                { label: t.lifeLabel, value: lang === "te" ? "1990ల నుండి (ఎన్.ఎస్.యు.ఐ)" : "1990s (NSUI)" },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <Link href="/about" className="btn-primary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.btnBio} <ArrowRight size={16} />
              </Link>
              <Link href="/journey" className="btn-secondary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {t.btnJourney}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          div[style*="right: -1.5rem"] {
            right: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
