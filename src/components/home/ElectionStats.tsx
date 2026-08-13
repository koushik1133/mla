"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { electionResults2023 } from "@/content/election";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

export default function ElectionStats() {
  const result = electionResults2023;

  return (
    <section
      className="section-padding"
      style={{ background: "var(--warm-bg)" }}
      aria-labelledby="election-heading"
    >
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="section-label">Election 2023</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", margin: "0 auto 1rem" }} />
          <h2 className="section-title" id="election-heading" style={{ maxWidth: "600px", margin: "0 auto 1rem" }}>
            2023 Telangana Legislative Assembly Election Results
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-light)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
            <Info size={13} />
            Source: Election Commission of India / ADR India. Results from November 30, 2023.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "center" }}>
          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { label: "Votes Received", value: 122140, suffix: "", highlight: true },
              { label: "Vote Share", value: 57.41, suffix: "%", highlight: false },
              { label: "Victory Margin", value: 49636, suffix: "", highlight: false },
              { label: "Total Registered Voters", value: 227738, suffix: "", highlight: false },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  {stat.label}
                </p>
                <p
                  className="number-display"
                  style={{ color: stat.highlight ? "var(--saffron)" : "var(--charcoal)" }}
                >
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Candidate Comparison — Alair Constituency 2023
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {result.candidates.map((candidate, i) => (
                <div key={candidate.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <div>
                      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>
                        {candidate.name}
                        {candidate.isWinner && (
                          <span style={{ marginLeft: "0.5rem", fontSize: "0.65rem", background: "rgba(22,106,47,0.12)", color: "var(--congress-green)", padding: "0.15rem 0.5rem", borderRadius: "100px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                            Winner
                          </span>
                        )}
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{candidate.party}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: "var(--charcoal)", letterSpacing: "-0.02em" }}>
                        {candidate.votePercentage}%
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                        {candidate.votes.toLocaleString("en-IN")} votes
                      </p>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="stat-bar">
                    <motion.div
                      className="stat-bar-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: `${candidate.votePercentage}%`,
                        background: candidate.isWinner ? "var(--saffron)" : "var(--muted-light)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.7rem", color: "var(--muted-light)", marginTop: "1.5rem", lineHeight: 1.5 }}>
              {result.notes}
            </p>
          </motion.div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/election-2023" className="btn-secondary">
            Full Election Report <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
