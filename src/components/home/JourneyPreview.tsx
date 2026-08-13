"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { timelineEntries } from "@/content/timeline";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

const milestones = timelineEntries.filter((e) => e.isMilestone).slice(0, 4);

export default function JourneyPreview() {
  const { lang } = useLang();
  const t = translations[lang].journey;

  return (
    <section
      className="section-padding section-dark"
      style={{ background: "var(--charcoal)" }}
      aria-labelledby="journey-heading"
    >
      <div className="container-site">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
            <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 className="section-title" id="journey-heading" style={{ color: "white", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.title}
            </h2>
          </div>
          <Link href="/journey" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.viewFull} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid-4-col">
          {milestones.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: "1.75rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: i === 0 ? "var(--congress-green)" : "var(--saffron)",
                }}
              />
              <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--saffron)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.75rem" }}>
                {entry.year}
              </p>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "white", lineHeight: 1.3, marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? entry.titleTelugu : entry.title}
              </p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? entry.descriptionTelugu.slice(0, 90) + "…" : entry.description.slice(0, 100) + "…"}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <Link href="/journey" className="btn-outline-white" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
            {t.viewComplete} <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
