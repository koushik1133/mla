"use client";

import { useState, useEffect } from "react";
import { Calendar, Newspaper, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { fetchNewsArticles, NewsRecord } from "@/lib/supabase";

const staticNews: NewsRecord[] = [
  {
    id: "news-dcc-2025",
    title: "Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee",
    title_telugu: "యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా ఎమ్మెల్యే బీర్ల ఐలయ్య నియామకం",
    summary: "MLA Beerla Ilaiah was appointed as President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025, according to Poliple and BCSamachar reports.",
    summary_telugu: "ఆలేరు శాసనసభ్యులు బీర్ల ఐలయ్య గారు 2025 నవంబర్‌లో యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా నియమితులయ్యారు.",
    category: "Congress",
    category_telugu: "కాంగ్రెస్",
    date: "November 2025",
    source: "Poliple / BCSamachar",
    url: "https://www.deccanchronicle.com/telangana",
  },
  {
    id: "news-suman-2026",
    title: "\"I Am Not an MLA, I Am a Servant\" — Beerla Ilaiah in Exclusive Interview",
    title_telugu: "\"నేను ఎమ్మెల్యేని కాదు, ప్రజల సేవకుడిని\" — ప్రత్యేక ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఐలయ్య",
    summary: "In an exclusive interview with Suman TV Yadadri (July 29, 2026), MLA Beerla Ilaiah described his public role and approach to constituency service.",
    summary_telugu: "సుమన్ టీవీ యాదాద్రికి ఇచ్చిన ప్రత్యేక ఇంటర్వ్యూలో (జూలై 29, 2026) ఎమ్మెల్యే బీర్ల ఐలయ్య గారు తమ ప్రజా సేవా దృక్పథాన్ని వివరించారు.",
    category: "Interview",
    category_telugu: "ఇంటర్వ్యూ",
    date: "July 29, 2026",
    source: "Suman TV Yadadri",
    url: "https://www.youtube.com/results?search_query=Beerla+Ilaiah+MLA+Suman+TV",
  },
  {
    id: "news-velugu-2026",
    title: "MLA Beerla Ilaiah Discusses Alair Developments with Telangana Velugu",
    title_telugu: "ఆలేరు నియోజకవర్గ అభివృద్ధిపై తెలంగాణ వెలుగు ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఐలయ్య",
    summary: "An exclusive interview published on July 31, 2026, covering constituency development, the Revanth Reddy government, and public welfare matters.",
    summary_telugu: "తెలంగాణ వెలుగు ఇంటర్వ్యూలో (జూలై 31, 2026) ఆలేరు అభివృద్ధి, రేవంత్ రెడ్డి ప్రభుత్వ సంక్షేమ పథకాల గురించి మాట్లాడారు.",
    category: "Development",
    category_telugu: "అభివృద్ధి",
    date: "July 31, 2026",
    source: "Telangana Velugu",
    url: "https://telanganatoday.com/telangana",
  },
  {
    id: "news-whip-2023",
    title: "Beerla Ilaiah Among Government Whips Appointed by Telangana Congress",
    title_telugu: "తెలంగాణ శాసనసభ ప్రభుత్వ విప్‌గా ఎమ్మెల్యే బీర్ల ఇలయ్య నియామకం",
    summary: "Following the INC victory in the 2023 Telangana Assembly elections, Beerla Ilaiah was among the MLAs appointed as Government Whips in the Telangana Legislative Assembly in December 2023.",
    summary_telugu: "2023 తెలంగాణ శాసనసభ ఎన్నికల విజయం అనంతరం డిసెంబర్ 2023లో శాసనసభ ప్రభుత్వ విప్‌గా నియమితులయ్యారు.",
    category: "Government",
    category_telugu: "ప్రభుత్వం",
    date: "December 2023",
    source: "Telangana Legislative Assembly",
    url: "https://www.deccanchronicle.com/telangana",
  },
];

const categoryColors: Record<string, string> = {
  Congress: "#166A2F",
  Interview: "#EE5A1C",
  Development: "#3B82F6",
  Government: "#8B5CF6",
  Election: "#0891B2",
  "Press Release": "#475569",
};

export default function NewsPage() {
  const { lang } = useLang();
  const t = translations[lang].news;
  const [articles, setArticles] = useState<NewsRecord[]>(staticNews);

  useEffect(() => {
    fetchNewsArticles().then((dynamic) => {
      if (dynamic && dynamic.length > 0) setArticles(dynamic);
    }).catch(() => {/* keep static fallback */});
  }, []);

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            {t.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.65, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* News list */}
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden", background: "var(--border)" }}>
            {articles.map((item, idx) => {
              const color = categoryColors[item.category] || "#666";
              const headline = lang === "te" ? (item.title_telugu || item.title) : item.title;
              const summary = lang === "te" ? (item.summary_telugu || item.summary) : item.summary;
              const category = lang === "te" ? (item.category_telugu || item.category) : item.category;
              const searchUrl = item.url || `https://www.google.com/search?q=${encodeURIComponent("Beerla Ilaiah MLA " + item.title)}`;
              return (
                <a
                  key={item.id || idx}
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "var(--white)", padding: "1.75rem 2rem", textDecoration: "none", color: "inherit", display: "block", transition: "background 0.2s ease" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                        <span style={{ display: "inline-block", padding: "0.15rem 0.65rem", borderRadius: "100px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: `${color}18`, color, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                          {category}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                          <Calendar size={11} /> {item.date}
                        </span>
                        {item.source && (
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                            <Newspaper size={11} /> {item.source}
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.5rem", letterSpacing: "-0.01em", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {headline}
                      </h2>
                      <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {summary}
                      </p>
                    </div>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(238,90,28,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.25rem" }}>
                      <ArrowRight size={16} color="var(--saffron)" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
