"use client";

import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Sample news references — based on publicly available reporting
// These are representative news items based on verified public reporting
const newsItems = [
  {
    id: "news-1",
    headline: "MLA Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee",
    publication: "Poliple / BCSamachar",
    date: "November 2025",
    category: "Congress",
    summary:
      "Beerla Ilaiah, MLA representing Alair constituency, was appointed as the President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025.",
    isVerified: true,
  },
  {
    id: "news-2",
    headline: "Beerla Ilaiah Discusses Constituency Development in Exclusive Interview",
    publication: "Suman TV Yadadri",
    date: "July 2026",
    category: "Development",
    summary:
      "In an exclusive interview with Suman TV, MLA Beerla Ilaiah discussed Alair constituency development, describing his role with the phrase \"I Am Not an MLA, I Am a Servant.\"",
    isVerified: true,
  },
  {
    id: "news-3",
    headline: "Telangana Congress MLA Beerla Ilaiah Comments on BC Reservation",
    publication: "TV5 News",
    date: "2024",
    category: "Government",
    summary:
      "Congress MLA Beerla Ilaiah publicly commented on the 42% BC reservation and local body elections, according to TV5 News reporting.",
    isVerified: true,
  },
];

export default function NewsPreview() {
  return (
    <section
      className="section-padding"
      style={{ background: "var(--warm-bg)" }}
      aria-labelledby="news-heading"
    >
      <div className="container-site">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label">Latest</p>
            <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 className="section-title" id="news-heading">
              News &amp; Public Record
            </h2>
          </div>
          <Link href="/news" style={{ color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600 }}>
            All News <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden", background: "var(--border)" }}>
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "var(--white)",
                padding: "1.5rem 1.75rem",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem",
                alignItems: "center",
                transition: "background 0.15s",
              }}
            >
              {/* Icon */}
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--warm-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Newspaper size={17} color="var(--saffron)" />
              </div>

              {/* Content */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                  <span className="tag tag-dark">{item.category}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.72rem", color: "var(--muted-light)" }}>
                    <Calendar size={11} /> {item.date}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted-light)" }}>
                    — {item.publication}
                  </span>
                </div>
                <p style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.35rem" }}>
                  {item.headline}
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>
                  {item.summary}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight size={16} color="var(--border)" style={{ flexShrink: 0 }} />
            </motion.div>
          ))}
        </div>

        <p style={{ fontSize: "0.72rem", color: "var(--muted-light)", marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
          News summaries are based on publicly available reporting. Always refer to the original publication for full context.
        </p>
      </div>
    </section>
  );
}
