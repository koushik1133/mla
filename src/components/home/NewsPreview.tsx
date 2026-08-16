"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { fetchNewsArticles, NewsRecord, safeExternalUrl } from "@/lib/supabase";

const staticNews: NewsRecord[] = [
  {
    id: "news-1",
    title: "MLA Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee",
    title_telugu: "యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ అధ్యక్షుడిగా ఎమ్మెల్యే బీర్ల ఐలయ్య నియామకం",
    source: "Poliple / BCSamachar",
    date: "November 2025",
    category: "Congress",
    category_telugu: "కాంగ్రెస్",
    summary:
      "Beerla Ilaiah, MLA representing Alair constituency, was appointed as the President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025.",
    summary_telugu:
      "ఆలేరు శాసనసభ్యులు బీర్ల ఐలయ్య గారు 2025 నవంబర్‌లో యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డీసీసీ) అధ్యక్షుడిగా నియమితులయ్యారు.",
  },
  {
    id: "news-2",
    title: 'Beerla Ilaiah Discusses Constituency Development — "I Am a Servant"',
    title_telugu: 'ఆలేరు నియోజకవర్గ అభివృద్ధిపై బీర్ల ఐలయ్య ప్రత్యేక ఇంటర్వ్యూ — "నేను సేవకుడిని"',
    source: "Suman TV Yadadri",
    date: "July 2026",
    category: "Interview",
    category_telugu: "ఇంటర్వ్యూ",
    summary:
      "In an exclusive interview with Suman TV, MLA Beerla Ilaiah discussed Alair constituency development, describing his role with the phrase \"I Am Not an MLA, I Am a Servant.\"",
    summary_telugu:
      "సుమన్ టీవీ యాదాద్రికి ఇచ్చిన ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఐలయ్య గారు ఆలేరు నియోజకవర్గ అభివృద్ధి, ప్రజా సేవ గురించి వివరించారు.",
  },
  {
    id: "news-3",
    title: "Telangana Congress MLA Beerla Ilaiah Comments on BC Reservation",
    title_telugu: "బీసీ రిజర్వేషన్లపై వ్యాఖ్యానించిన కాంగ్రెస్ ఎమ్మెల్యే బీర్ల ఐలయ్య",
    source: "TV5 News",
    date: "2024",
    category: "Government",
    category_telugu: "ప్రభుత్వం",
    summary:
      "Congress MLA Beerla Ilaiah publicly commented on the 42% BC reservation and local body elections, according to TV5 News reporting.",
    summary_telugu:
      "తెలంగాణలో 42% బీసీ రిజర్వేషన్లు మరియు స్థానిక సంస్థల ఎన్నికలపై కాంగ్రెస్ ఎమ్మెల్యే బీర్ల ఐలయ్య వ్యాఖ్యానించినట్లు టీవీ5 వార్తలు పేర్కొన్నాయి.",
  },
];

export default function NewsPreview() {
  const { lang } = useLang();
  const t = translations[lang].news;
  const [items, setItems] = useState<NewsRecord[]>(staticNews);

  useEffect(() => {
    fetchNewsArticles()
      .then((dynamic) => {
        if (dynamic && dynamic.length > 0) {
          setItems(dynamic.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

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
          {items.map((item, i) => {
            const headline = lang === "te" ? (item.title_telugu || item.title) : item.title;
            const summary = lang === "te" ? (item.summary_telugu || item.summary) : item.summary;
            const category = lang === "te" ? (item.category_telugu || item.category) : item.category;
            const linkUrl = safeExternalUrl(item.url) || `https://www.google.com/search?q=${encodeURIComponent("Beerla Ilaiah MLA " + item.title)}`;

            return (
              <motion.a
                key={item.id || i}
                href={linkUrl}
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
                      {category}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.72rem", color: "var(--muted-light)" }}>
                      <Calendar size={11} /> {item.date}
                    </span>
                    {item.source && (
                      <span style={{ fontSize: "0.72rem", color: "var(--muted-light)" }}>
                        — {item.source}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.35rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {headline}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {summary}
                  </p>
                </div>

                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(238,90,28,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ArrowRight size={16} color="var(--saffron)" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
