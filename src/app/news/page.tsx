import type { Metadata } from "next";
import { Calendar, Newspaper, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "News — Beerla Ilaiah MLA, Alair",
  description:
    "News and public record of Beerla Ilaiah, MLA Alair, Telangana. Constituency activities, government role, and media coverage.",
};

const newsItems = [
  {
    id: "news-dcc-2025",
    headline: "Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee",
    summary:
      "MLA Beerla Ilaiah was appointed as President of the Yadadri Bhuvanagiri District Congress Committee (DCC) in November 2025, according to Poliple and BCSamachar reports.",
    publication: "Poliple / BCSamachar",
    date: "November 2025",
    category: "Congress",
    note: null,
  },
  {
    id: "news-suman-2026",
    headline: "\"I Am Not an MLA, I Am a Servant\" — Beerla Ilaiah in Exclusive Interview",
    summary:
      "In an exclusive interview with Suman TV Yadadri (July 29, 2026), MLA Beerla Ilaiah described his public role and approach to constituency service.",
    publication: "Suman TV Yadadri",
    date: "July 29, 2026",
    category: "Interview",
    note: null,
  },
  {
    id: "news-velugu-2026",
    headline: "MLA Beerla Ilaiah Discusses Alair Developments with Telangana Velugu",
    summary:
      "An exclusive interview with Telangana Velugu (July 31, 2026) covering constituency development, the Revanth Reddy government, and public welfare matters.",
    publication: "Telangana Velugu",
    date: "July 31, 2026",
    category: "Development",
    note: null,
  },
  {
    id: "news-bc-2024",
    headline: "Congress MLA Beerla Ilaiah Comments on 42% BC Reservation",
    summary:
      "According to TV5 News, MLA Beerla Ilaiah publicly commented on the 42% BC reservation and local body elections in Telangana.",
    publication: "TV5 News",
    date: "2024",
    category: "Government",
    note: "Reported by TV5 News; refer to original publication for full context.",
  },
  {
    id: "news-idream-2024",
    headline: "Beerla Ilaiah in Sensational Interview — Congress Perspective on Telangana Politics",
    summary:
      "iDream News conducted a wide-ranging interview with MLA Beerla Ilaiah in November 2024, covering Telangana political developments and the Congress government's position.",
    publication: "iDream News",
    date: "November 11, 2024",
    category: "Interview",
    note: null,
  },
  {
    id: "news-whip-2023",
    headline: "Beerla Ilaiah Among Government Whips Appointed by Telangana Congress",
    summary:
      "Following the INC victory in the 2023 Telangana Assembly elections, Beerla Ilaiah was among the MLAs appointed as Government Whips in the Telangana Legislative Assembly in December 2023.",
    publication: "Multiple Telugu news publications",
    date: "December 2023",
    category: "Government",
    note: null,
  },
];

const categoryColors: Record<string, string> = {
  Congress: "#166A2F",
  Interview: "#EE5A1C",
  Development: "#3B82F6",
  Government: "#8B5CF6",
};

export default function NewsPage() {
  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)" }}>Public Record</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            News &amp; Public Record
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.65 }}>
            A curated archive of publicly reported news and media coverage relating to Beerla Ilaiah, MLA Alair.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "1rem 0" }}>
        <div className="container-site">
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <Info size={14} color="var(--muted-light)" />
            <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5 }}>
              News summaries are based on verified public reporting. All statements are attributed to their source publication. Refer to the original publication for full context. No unverified claims are presented as fact.
            </p>
          </div>
        </div>
      </div>

      {/* News list */}
      <section className="section-padding">
        <div className="container-site" style={{ maxWidth: "900px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden", background: "var(--border)" }}>
            {newsItems.map((item) => (
              <div
                key={item.id}
                style={{ background: "var(--white)", padding: "1.75rem 2rem" }}
              >
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
                    }}
                  >
                    {item.category}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--muted-light)" }}>
                    <Calendar size={11} /> {item.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--muted-light)" }}>
                    <Newspaper size={11} /> {item.publication}
                  </span>
                </div>

                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.35, marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                  {item.headline}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  {item.summary}
                </p>

                {item.note && (
                  <p style={{ fontSize: "0.75rem", color: "var(--muted-light)", marginTop: "0.75rem", padding: "0.5rem 0.75rem", background: "var(--warm-bg)", borderRadius: "6px", borderLeft: "3px solid var(--border)", lineHeight: 1.5 }}>
                    ℹ {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
