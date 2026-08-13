"use client";

import { motion } from "framer-motion";
import { timelineEntries } from "@/content/timeline";

const categoryColors: Record<string, string> = {
  education: "#3B82F6",
  community: "#10B981",
  party: "#EE5A1C",
  government: "#166A2F",
  election: "#F59E0B",
};

const categoryLabels: Record<string, string> = {
  education: "Education",
  community: "Community",
  party: "INC / Party",
  government: "Government",
  election: "Election",
};

export default function JourneyPage() {
  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)" }}>Political Journey</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            A Journey Rooted in Public Service
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "560px", lineHeight: 1.65 }}>
            From student activism in NSUI to Village Sarpanch, Mandal President, and finally Member of the Telangana Legislative Assembly — the political journey of Beerla Ilaiah spans three decades of grassroots public engagement.
          </p>

          {/* Legend */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: categoryColors[key] }} />
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <div className="timeline-container">
            <div className="timeline-line" />

            {timelineEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                {/* Dot with category color */}
                <div
                  className="timeline-dot"
                  style={{
                    borderColor: categoryColors[entry.category],
                    background: entry.isMilestone ? categoryColors[entry.category] : "var(--white)",
                  }}
                />

                {/* Year */}
                <p className="timeline-year">{entry.period || entry.year}</p>

                {/* Category tag */}
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.15rem 0.6rem",
                    borderRadius: "100px",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: `${categoryColors[entry.category]}18`,
                    color: categoryColors[entry.category],
                    marginBottom: "0.5rem",
                  }}
                >
                  {categoryLabels[entry.category]}
                </span>

                {/* Title */}
                <p className="timeline-title">
                  {entry.title}
                  {entry.isMilestone && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.65rem", background: "rgba(238,90,28,0.1)", color: "var(--saffron)", padding: "0.1rem 0.45rem", borderRadius: "100px", fontWeight: 700 }}>
                      Milestone
                    </span>
                  )}
                </p>

                {/* Telugu title if available */}
                {entry.titleTelugu && (
                  <p style={{ fontFamily: "var(--font-telugu)", fontSize: "0.85rem", color: "var(--muted-light)", marginBottom: "0.5rem" }}>
                    {entry.titleTelugu}
                  </p>
                )}

                {/* Description */}
                <p className="timeline-desc">{entry.description}</p>

                {/* Source */}
                <p style={{ fontSize: "0.68rem", color: "var(--muted-light)", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ opacity: 0.5 }}>Source:</span> {entry.source}
                  <span style={{
                    display: "inline-block",
                    padding: "0.1rem 0.4rem",
                    borderRadius: "100px",
                    fontSize: "0.6rem",
                    background: entry.confidence === "high" ? "rgba(22,106,47,0.1)" : "rgba(0,0,0,0.05)",
                    color: entry.confidence === "high" ? "var(--congress-green)" : "var(--muted-light)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginLeft: "0.25rem",
                  }}>
                    {entry.confidence}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
