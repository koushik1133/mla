"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { electionResults2023 } from "@/content/election";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

const candidateNamesTelugu: Record<string, string> = {
  "Beerla Ilaiah": "బీర్ల ఐలయ్య",
};

const partyNamesTelugu: Record<string, string> = {
  "Indian National Congress": "భారత జాతీయ కాంగ్రెస్",
};

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
  const { lang } = useLang();
  const t = translations[lang].election;

  return (
    <section
      className="section-padding"
      style={{ background: "var(--warm-bg)" }}
      aria-labelledby="election-heading"
    >
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", margin: "0 auto 1rem" }} />
          <h2 className="section-title" id="election-heading" style={{ maxWidth: "650px", margin: "0 auto 1rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
            {t.title}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted-light)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            <Info size={13} />
            {t.sourceNote}
          </p>
        </div>

        <div className="election-grid">
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem" }}>
            {[
              { label: t.votesReceived, value: 122140, suffix: "", highlight: true },
              { label: t.voteShare, value: 57.41, suffix: "%", highlight: false },
              { label: t.victoryMargin, value: 49636, suffix: "", highlight: false },
              { label: t.totalVoters, value: 227738, suffix: "", highlight: false },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.3rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {stat.label}
                </p>
                <p
                  className="number-display"
                  style={{ color: stat.highlight ? "var(--saffron)" : "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}
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
              padding: "1.5rem",
            }}
          >
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.candidateComparison}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                  <div>
                    <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" ? candidateNamesTelugu["Beerla Ilaiah"] : "Beerla Ilaiah"}
                      <span style={{ marginLeft: "0.5rem", fontSize: "0.68rem", background: "rgba(22,106,47,0.12)", color: "var(--congress-green)", padding: "0.2rem 0.6rem", borderRadius: "100px", fontWeight: 700, letterSpacing: "0.04em", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {t.winner}
                      </span>
                    </p>
                    <p style={{ fontSize: "0.82rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" ? partyNamesTelugu["Indian National Congress"] : "Indian National Congress (INC)"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--saffron)", letterSpacing: "-0.02em" }}>
                      57.41%
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      1,22,140 {lang === "te" ? "ఓట్లు (భారీ ఆధిక్యత)" : "votes (Landslide Majority)"}
                    </p>
                  </div>
                </div>
                <div className="stat-bar" style={{ height: "14px" }}>
                  <motion.div
                    className="stat-bar-fill"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: "57.41%",
                      background: "linear-gradient(90deg, var(--saffron) 0%, #FF8A00 100%)",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <div>
                  <p style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700, margin: 0, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? "విజయం సాధించిన మెజారిటీ" : "Decisive Margin"}
                  </p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--congress-green)", margin: "0.2rem 0 0", fontFamily: "var(--font-display)" }}>
                    +49,636 {lang === "te" ? "ఓట్లు" : "votes"}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "0.72rem", color: "var(--muted)", textTransform: "uppercase", fontWeight: 700, margin: 0, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? "పోలింగ్ శాతం" : "Constituency Turnout"}
                  </p>
                  <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--charcoal)", margin: "0.2rem 0 0", fontFamily: "var(--font-display)" }}>
                    93.4%
                  </p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.7rem", color: "var(--muted-light)", marginTop: "1.25rem", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {lang === "te" ? "2023 తెలంగాణ శాసనసభ ఎన్నికలలో ఆలేరు ప్రజల చారిత్రక తీర్పు." : result.notes}
            </p>
          </motion.div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/election-2023" className="btn-secondary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
            {t.fullReport} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
