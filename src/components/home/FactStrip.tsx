"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

export default function FactStrip() {
  const { lang } = useLang();
  const t = translations[lang].factStrip;

  const facts = [
    { value: t.constituencyNo, label: t.constituencyLabel },
    { value: t.mandalsNo, label: t.mandalsLabel },
    { value: t.votersNo, label: t.votersLabel },
    { value: t.voteShareNo, label: t.voteShareLabel },
    { value: t.termNo, label: t.termLabel },
  ];

  return (
    <section
      className="fact-strip"
      aria-label="Constituency overview"
      style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "1.25rem 0" }}
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              className="fact-item"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="fact-value" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {fact.value}
              </span>
              <span className="fact-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {fact.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
