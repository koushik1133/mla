"use client";

import { serviceCategories } from "@/content/publicService";
import { GraduationCap, Sprout, Building2, Home, Landmark, Users, Info } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={22} />,
  Sprout: <Sprout size={22} />,
  Building2: <Building2 size={22} />,
  Home: <Home size={22} />,
  Landmark: <Landmark size={22} />,
  Users: <Users size={22} />,
};

export default function PublicServicePageContent() {
  const { lang } = useLang();
  const t = translations[lang].nav;

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {lang === "te" ? "నియోజకవర్గ ప్రజా సేవ" : "Constituency Engagement"}
          </p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            {lang === "te" ? "ప్రజా సేవ & నియోజకవర్గ పనులు" : "Public Service & Constituency Work"}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "560px", lineHeight: 1.65, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {lang === "te" ? "ఆలేరు శాసనసభ్యులు బీర్ల ఇలయ్య గారి నియోజకవర్గ అభివృద్ది మరియు ప్రజా సేవ రంగాలు." : "Areas of constituency engagement and public activity by Beerla Ilaiah, MLA, Alair No. 97."}
          </p>


        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid-3-col">
            {serviceCategories.map((category) => (
              <div
                key={category.id}
                className="card"
                style={{ padding: "2rem" }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: "rgba(238,90,28,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--saffron)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {iconMap[category.icon]}
                </div>

                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.01em", marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? category.titleTelugu : category.title}
                </h2>
                <p style={{ fontFamily: lang === "te" ? "var(--font-body)" : "var(--font-telugu)", fontSize: "0.85rem", color: "var(--muted-light)", marginBottom: "0.875rem" }}>
                  {lang === "te" ? category.title : category.titleTelugu}
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "1.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {category.description}
                </p>

                {/* Activities */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {category.activities.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        padding: "0.875rem",
                        background: "var(--warm-bg)",
                        borderRadius: "8px",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <span className="tag tag-dark" style={{ fontSize: "0.6rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{activity.nature}</span>
                      </div>
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {activity.title}
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {activity.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
