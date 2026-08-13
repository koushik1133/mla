"use client";

import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

const newsItems = [
  {
    id: "news-1",
    headline: "MLA Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee",
    headlineTelugu: "యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ అధ్యక్షుడిగా ఎమ్మెల్యే బీర్ల ఇలయ్య నియామకం",
    publication: "Poliple / BCSamachar",
    date: "November 2025",
    category: "Congress",
    categoryTelugu: "కాంగ్రెస్",
    summary:
      "Beerla Ilaiah, MLA representing Alair constituency, was appointed as the President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025.",
    summaryTelugu:
      "ఆలేరు శాసనసభ్యులు బీర్ల ఇలయ్య గారు 2025 నవంబర్‌లో యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా నియమితులయ్యారు.",
    isVerified: true,
  },
  {
    id: "news-2",
    headline: "Beerla Ilaiah Discusses Constituency Development in Exclusive Interview",
    headlineTelugu: "ఆలేరు నియోజకవర్గ అభివృద్ధిపై బీర్ల ఇలయ్య ప్రత్యేక ఇంటర్వ్యూ",
    publication: "Suman TV Yadadri",
    date: "July 2026",
    category: "Development",
    categoryTelugu: "అభివృద్ధి",
    summary:
      "In an exclusive interview with Suman TV, MLA Beerla Ilaiah discussed Alair constituency development, describing his role with the phrase \"I Am Not an MLA, I Am a Servant.\"",
    summaryTelugu:
      "సుమన్ టీవీ యాదాద్రికి ఇచ్చిన ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఇలయ్య గారు ఆలేరు నియోజకవర్గ అభివృద్ధి, ప్రజా సేవ గురించి వివరించారు.",
    isVerified: true,
  },
  {
    id: "news-3",
    headline: "Telangana Congress MLA Beerla Ilaiah Comments on BC Reservation",
    headlineTelugu: "బిసి రిజర్వేషన్లపై వ్యాఖ్యానించిన కాంగ్రెస్ ఎమ్మెల్యే బీర్ల ఇలయ్య",
    publication: "TV5 News",
    date: "2024",
    category: "Government",
    categoryTelugu: "ప్రభుత్వం",
    summary:
      "Congress MLA Beerla Ilaiah publicly commented on the 42% BC reservation and local body elections, according to TV5 News reporting.",
    summaryTelugu:
      "తెలంగాణలో 42% బిసి రిజర్వేషన్లు మరియు స్థానిక సంస్థల ఎన్నికలపై కాంగ్రెస్ ఎమ్మెల్యే బీర్ల ఇలయ్య వ్యాఖ్యానించినట్లు టీవీ5 వార్తలు పేర్కొన్నాయి.",
    isVerified: true,
  },
];

export default function NewsPreview() {
  const { lang } = useLang();
  const t = translations[lang].news;

  return (
    <section
      className="section-padding"
      style={{ background: "var(--warm-bg)" }}
      aria-labelledby="news-heading"
    >
      <div className="container-site">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
            <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
            <h2 className="section-title" id="news-heading" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.title}
            </h2>
          </div>
          <Link href="/news" style={{ color: "var(--muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.allNews} <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden", background: "var(--border)" }}>
          {newsItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={`https://www.google.com/search?q=${encodeURIComponent("Beerla Ilaiah MLA " + item.headline)}`}
              target="_blank"
              rel="noopener noreferrer"
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
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(238,90,28,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Newspaper size={17} color="var(--saffron)" />
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                  <span className="tag tag-dark" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? item.categoryTelugu : item.category}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.72rem", color: "var(--muted-light)" }}>
                    <Calendar size={11} /> {item.date}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--muted-light)" }}>
                    — {item.publication}
                  </span>
                </div>
                <p style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.35rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? item.headlineTelugu : item.headline}
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? item.summaryTelugu : item.summary}
                </p>
              </div>

              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(238,90,28,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ArrowRight size={16} color="var(--saffron)" />
              </div>
            </motion.a>
          ))}
        </div>


      </div>
    </section>
  );
}
