"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { politician } from "@/content/politician";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

export default function AboutPageContent() {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
        aria-labelledby="about-hero-heading"
      >
        <div className="container-site">
          <div className="grid-2-col">
            <div>
              <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.label}
              </p>
              <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
              <h1
                id="about-hero-heading"
                style={{
                  fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: lang === "te" ? "0" : "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                {lang === "te" ? politician.nameTelugu : politician.name}
              </h1>
              <p style={{ fontFamily: lang === "te" ? "var(--font-display)" : "var(--font-telugu)", fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
                {lang === "te" ? politician.name : politician.nameTelugu}
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "480px", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.heroSubtitle}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "350px", maxWidth: "100%", aspectRatio: "3/4", borderRadius: "16px", overflow: "hidden", position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
                <Image
                  src="/images/beerla-portrait.jpg"
                  alt="Beerla Ilaiah — MLA, Alair Constituency"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="350px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            {t.earlyLifeTitle}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.earlyLifeP1}
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.earlyLifeP2}
            </p>
          </div>

          <p style={{ fontSize: "0.72rem", color: "var(--muted-light)", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid var(--border)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            <Info size={13} /> {t.sourcesNote}
          </p>

          <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            {t.journeyTitle}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.journeyP1}
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.journeyP2}
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.journeyP3}
            </p>
          </div>

          <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            {t.electionTitle}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.electionP1}
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.electionP2}
            </p>
          </div>

          <div style={{ padding: "1.5rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.sourcesLabel}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                { text: lang === "te" ? "PRS India శాసన పరిశోధన — ఎమ్మెల్యే వివరాలు, 2023 డిసెంబర్ 3 నుండి కాలపరిమితి" : "PRS Legislative Research — MLA profile, term from December 3, 2023", confidence: "High" },
                { text: lang === "te" ? "భారత ఎన్నికల సంఘం — 2023 ఆలేరు నియోజకవర్గ ఫలితాలు" : "Election Commission of India — 2023 election results, Alair constituency", confidence: "High" },
                { text: lang === "te" ? "వికీపీడియా — జీవిత చరిత్ర, రాజకీయ రంగం" : "Wikipedia — biographical details, political career", confidence: "Medium" },
                { text: lang === "te" ? "ది హన్స్ ఇండియా / హలోహైదరాబాద్ — విద్య, తొలి జీవితం" : "Hans India / HelloHyderabad — community, education, early career", confidence: "Medium" },
                { text: lang === "te" ? "పాలిపుల్ / బిసిసమాచార్ — డిసిసి అధ్యక్షుడుగా నియామకం, 2025 నవంబర్" : "Poliple / BCSamachar — DCC President appointment, November 2025", confidence: "Medium" },
              ].map((src) => (
                <li key={src.text} style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem" }}>
                  <span style={{ color: src.confidence === "High" ? "var(--congress-green)" : "var(--muted-light)", fontWeight: 700, minWidth: "50px" }}>
                    {src.confidence}
                  </span>
                  <span style={{ color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{src.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link href="/journey" className="btn-primary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.btnTimeline} <ArrowRight size={16} />
            </Link>
            <Link href="/election-2023" className="btn-secondary" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.btnElectionResults}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
