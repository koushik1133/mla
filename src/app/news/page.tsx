"use client";

import { Calendar, Newspaper, Info, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

const newsItems = [
  {
    id: "news-dcc-2025",
    headline: "Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee",
    headlineTelugu: "యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా ఎమ్మెల్యే బీర్ల ఇలయ్య నియామకం",
    summary:
      "MLA Beerla Ilaiah was appointed as President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025, according to Poliple and BCSamachar reports.",
    summaryTelugu:
      "ఆలేరు శాసనసభ్యులు బీర్ల ఇలయ్య గారు 2025 నవంబర్‌లో యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా నియమితులయ్యారు.",
    publication: "Poliple / BCSamachar",
    publicationTelugu: "పాలిపుల్ / బిసిసమాచార్",
    date: "November 2025",
    dateTelugu: "నవంబర్ 2025",
    category: "Congress",
    categoryTelugu: "కాంగ్రెస్",
    note: null,
    noteTelugu: null,
  },
  {
    id: "news-suman-2026",
    headline: "\"I Am Not an MLA, I Am a Servant\" — Beerla Ilaiah in Exclusive Interview",
    headlineTelugu: "\"నేను ఎమ్మెల్యేని కాదు, ప్రజల సేవకుడిని\" — ప్రత్యేక ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఇలయ్య",
    summary:
      "In an exclusive interview with Suman TV Yadadri (July 29, 2026), MLA Beerla Ilaiah described his public role and approach to constituency service.",
    summaryTelugu:
      "సుమన్ టీవీ యాదాద్రికి ఇచ్చిన ప్రత్యేక ఇంటర్వ్యూలో (జూలై 29, 2026) ఎమ్మెల్యే బీర్ల ఇలయ్య గారు తమ ప్రజా సేవా దృక్పథాన్ని వివరించారు.",
    publication: "Suman TV Yadadri",
    publicationTelugu: "సుమన్ టీవీ యాదాద్రి",
    date: "July 29, 2026",
    dateTelugu: "జూలై 29, 2026",
    category: "Interview",
    categoryTelugu: "ఇంటర్వ్యూ",
    note: null,
    noteTelugu: null,
  },
  {
    id: "news-velugu-2026",
    headline: "MLA Beerla Ilaiah Discusses Alair Developments with Telangana Velugu",
    headlineTelugu: "ఆలేరు నియోజకవర్గ అభివృద్ధిపై 'తెలంగాణ వెలుగు' ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఇలయ్య",
    summary:
      "An exclusive interview with Telangana Velugu (July 31, 2026) covering constituency development, the Revanth Reddy government, and public welfare matters.",
    summaryTelugu:
      "తెలంగాణ వెలుగు (జూలై 31, 2026) ఇంటర్వ్యూలో ఆలేరు అభివృద్ధి, రేవంత్ రెడ్డి ప్రభుత్వ సంక్షేమ పథకాల గురించి మాట్లాడారు.",
    publication: "Telangana Velugu",
    publicationTelugu: "తెలంగాణ వెలుగు",
    date: "July 31, 2026",
    dateTelugu: "జూలై 31, 2026",
    category: "Development",
    categoryTelugu: "అభివృద్ధి",
    note: null,
    noteTelugu: null,
  },
  {
    id: "news-bc-2024",
    headline: "Congress MLA Beerla Ilaiah Comments on 42% BC Reservation",
    headlineTelugu: "42% బిసి రిజర్వేషన్లపై కాంగ్రెస్ ఎమ్మెల్యే బీర్ల ఇలయ్య కీలక వ్యాఖ్యలు",
    summary:
      "According to TV5 News, MLA Beerla Ilaiah publicly commented on the 42% BC reservation and local body elections in Telangana.",
    summaryTelugu:
      "తెలంగాణలో 42% బిసి రిజర్వేషన్లు మరియు స్థానిక సంస్థల ఎన్నికలపై ఎమ్మెల్యే బీర్ల ఇలయ్య గారు బహిరంగ ప్రకటన చేశారు.",
    publication: "TV5 News",
    publicationTelugu: "టీవీ5 న్యూస్",
    date: "2024",
    dateTelugu: "2024",
    category: "Government",
    categoryTelugu: "ప్రభుత్వం",
    note: "Reported by TV5 News; refer to original publication for full context.",
    noteTelugu: "టీవీ5 న్యూస్ వార్త ఆధారంగా ప్రచురించబడింది.",
  },
  {
    id: "news-idream-2024",
    headline: "Beerla Ilaiah in Sensational Interview — Congress Perspective on Telangana Politics",
    headlineTelugu: "తెలంగాణ రాజకీయాలు - ఐడ్రీమ్ ప్రత్యేక ఇంటర్వ్యూలో ఎమ్మెల్యే బీర్ల ఇలయ్య",
    summary:
      "iDream News conducted a wide-ranging interview with MLA Beerla Ilaiah in November 2024, covering Telangana political developments and the Congress government's position.",
    summaryTelugu:
      "2024 నవంబర్‌లో ఐడ్రీమ్ న్యూస్ ఇంటర్వ్యూలో తెలంగాణ రాజకీయ పరిణామాలు, కాంగ్రెస్ ప్రభుత్వ దృక్పథంపై మాట్లాడారు.",
    publication: "iDream News",
    publicationTelugu: "ఐడ్రీమ్ న్యూస్",
    date: "November 11, 2024",
    dateTelugu: "నవంబర్ 11, 2024",
    category: "Interview",
    categoryTelugu: "ఇంటర్వ్యూ",
    note: null,
    noteTelugu: null,
  },
  {
    id: "news-whip-2023",
    headline: "Beerla Ilaiah Among Government Whips Appointed by Telangana Congress",
    headlineTelugu: "తెలంగాణ శాసనసభ ప్రభుత్వ విప్‌గా ఎమ్మెల్యే బీర్ల ఇలయ్య నియామకం",
    summary:
      "Following the INC victory in the 2023 Telangana Assembly elections, Beerla Ilaiah was among the MLAs appointed as Government Whips in the Telangana Legislative Assembly in December 2023.",
    summaryTelugu:
      "2023 తెలంగాణ శాసనసభ ఎన్నికల విజయం అనంతరం డిసెంబర్ 2023లో శాసనసభ ప్రభుత్వ విప్‌గా నియమితులయ్యారు.",
    publication: "Multiple Telugu news publications",
    publicationTelugu: "ప్రముఖ తెలుగు పత్రికలు",
    date: "December 2023",
    dateTelugu: "డిసెంబర్ 2023",
    category: "Government",
    categoryTelugu: "ప్రభుత్వం",
    note: null,
    noteTelugu: null,
  },
];

const categoryColors: Record<string, string> = {
  Congress: "#166A2F",
  Interview: "#EE5A1C",
  Development: "#3B82F6",
  Government: "#8B5CF6",
};

export default function NewsPage() {
  const { lang } = useLang();
  const t = translations[lang].news;

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
            {newsItems.map((item) => (
              <a
                key={item.id}
                href={`https://www.google.com/search?q=${encodeURIComponent("Beerla Ilaiah MLA " + item.headline)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "var(--white)",
                  padding: "1.75rem 2rem",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "background 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.15rem 0.65rem",
                          borderRadius: "100px",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          background: `${categoryColors[item.category] || "#666"}18`,
                          color: categoryColors[item.category] || "#666",
                          fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                        }}
                      >
                        {lang === "te" ? item.categoryTelugu : item.category}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        <Calendar size={11} /> {lang === "te" ? item.dateTelugu : item.date}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        <Newspaper size={11} /> {lang === "te" ? item.publicationTelugu : item.publication}
                      </span>
                    </div>

                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.5rem", letterSpacing: "-0.01em", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" ? item.headlineTelugu : item.headline}
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {lang === "te" ? item.summaryTelugu : item.summary}
                    </p>
                  </div>

                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(238,90,28,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.25rem" }}>
                    <ArrowRight size={16} color="var(--saffron)" />
                  </div>
                </div>

                {(item.note || item.noteTelugu) && (
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-light)", marginTop: "0.75rem", padding: "0.5rem 0.75rem", background: "var(--warm-bg)", borderRadius: "6px", borderLeft: "3px solid var(--border)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    ℹ {lang === "te" ? item.noteTelugu : item.note}
                  </p>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
