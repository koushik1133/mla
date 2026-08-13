"use client";

import { motion } from "framer-motion";
import { electionResults2023 } from "@/content/election";
import { Info, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
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
  }, [started, target]);

  return <span ref={ref}>{display.toLocaleString("en-IN")}{suffix}</span>;
}

export default function Election2023Page() {
  const result = electionResults2023;
  const { lang } = useLang();
  const t = translations[lang].election;

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
            {t.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {lang === "te" ? "ఆలేరు శాసనసభ నియోజకవర్గం 97 · యాదాద్రి భువనగిరి జిల్లా" : "Alair Assembly Constituency No. 97 · Yadadri Bhuvanagiri District"}
          </p>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "1rem" }}>
            <Info size={14} color="rgba(255,255,255,0.3)" />
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.sourceNote}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-site">
          {/* Winner highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "var(--charcoal)",
              borderRadius: "20px",
              padding: "2.5rem 3rem",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: "6px", height: "100%", background: "var(--saffron)", borderRadius: "3px 0 0 3px" }} />
            <div style={{ paddingLeft: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--congress-green-light)", letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(22,106,47,0.15)", padding: "0.2rem 0.6rem", borderRadius: "100px", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {t.winner}
                </span>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? "ఆలేరు నియోజకవర్గం 97" : "Alair Constituency No. 97"}
                </span>
              </div>
              <p style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                {lang === "te" ? "బీర్ల ఇలయ్య" : "Beerla Ilaiah"}
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? "భారత జాతీయ కాంగ్రెస్" : "Indian National Congress"}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, color: "var(--saffron)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                <AnimatedNumber target={122140} />
              </p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.votesReceived}
              </p>
            </div>
          </motion.div>

          {/* Key numbers */}
          <div className="grid-4-col" style={{ marginBottom: "3rem" }}>
            {[
              { label: t.voteShare, value: result.winner.votePercentage, suffix: "%" },
              { label: t.victoryMargin, value: result.margin, suffix: "" },
              { label: t.totalVoters, value: result.totalElectors, suffix: "" },
              { label: t.votesCast, value: result.totalVotesCast, suffix: "" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: "1.5rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px" }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Candidate comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem" }}
          >
            <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              {t.candidateComparison}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {result.candidates.map((candidate) => (
                <div key={candidate.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.75rem" }}>
                    <div>
                      <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "0.2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {lang === "te"
                          ? candidate.name === "Beerla Ilaiah" ? "బీర్ల ఇలయ్య" : candidate.name === "Gongidi Sunitha" ? "గొంగిడి సునీత" : candidate.name === "Kallu Sanjeeva Reddy" ? "కల్లు సంజీవ రెడ్డి" : candidate.name
                          : candidate.name}
                        {candidate.isWinner && (
                          <span style={{ marginLeft: "0.5rem", fontSize: "0.65rem", background: "rgba(22,106,47,0.12)", color: "var(--congress-green)", padding: "0.15rem 0.5rem", borderRadius: "100px", fontWeight: 700, letterSpacing: "0.04em", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                            {t.winner}
                          </span>
                        )}
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {lang === "te"
                          ? candidate.party === "Indian National Congress" ? "భారత జాతీయ కాంగ్రెస్" : candidate.party === "Bharat Rashtra Samithi" ? "భారత రాష్ట్ర సమితి" : candidate.party === "Bharatiya Janata Party" ? "భారతీయ జనతా పార్టీ" : candidate.party
                          : candidate.party}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "var(--charcoal)", letterSpacing: "-0.03em" }}>
                        {candidate.votePercentage}%
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {candidate.votes.toLocaleString("en-IN")} {lang === "te" ? "ఓట్లు" : "votes"}
                      </p>
                    </div>
                  </div>
                  <div className="stat-bar" style={{ height: "12px" }}>
                    <motion.div
                      className="stat-bar-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        width: `${candidate.votePercentage}%`,
                        background: candidate.isWinner ? "var(--saffron)" : "#D1D5DB",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--warm-bg)", borderRadius: "8px", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <Info size={14} color="var(--muted-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5, marginBottom: "0.35rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? "ఫలితాలు 2023 ఎన్నికల అధికారిక రికార్డుల ఆధారంగా అందించబడ్డాయి." : result.notes}
                </p>
                <a
                  href={result.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.75rem", color: "var(--saffron)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}
                >
                  {lang === "te" ? "మూలం చూడండి: ఏడీఆర్ ఇండియా" : "View source: ADR India"} <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
