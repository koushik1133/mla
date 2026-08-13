"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { constituency } from "@/content/constituency";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";

export default function AlairPageContent() {
  const { lang } = useLang();
  const t = translations[lang].alair;

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "55vh", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/hero-bg.jpg"
            alt="Alair constituency — Telangana countryside"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 60%, transparent 100%)" }} />
        </div>
        <div className="container-site" style={{ position: "relative", zIndex: 1, paddingBottom: "4rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--saffron-light)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.label}
          </p>
          <h1 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", letterSpacing: lang === "te" ? "0" : "-0.03em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            {lang === "te" ? "ఆలేరు — నియోజకవర్గం 97" : "Alair — No. 97"}
          </h1>
          <p style={{ fontFamily: lang === "te" ? "var(--font-display)" : "var(--font-telugu)", fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
            {lang === "te" ? "Alair Assembly Constituency No. 97" : `${constituency.nameTelugu} నియోజకవర్గం`}
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {lang === "te" ? "యాదాద్రి భువనగిరి జిల్లా · తెలంగాణ · భువనగిరి లోక్‌సభ నియోజకవర్గం" : "Yadadri Bhuvanagiri District · Telangana · Bhongir Lok Sabha Constituency"}
          </p>
        </div>
      </section>

      {/* Overview stats */}
      <section style={{ background: "var(--white)", padding: "2rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container-site">
          <div className="grid-4-col">
            {[
              { value: lang === "te" ? "సంఖ్య 97" : "No. 97", label: lang === "te" ? "నియోజకవర్గ సంఖ్య" : "Constituency Number" },
              { value: "8", label: lang === "te" ? "మండలాలు" : "Mandals" },
              { value: lang === "te" ? "2,27,738" : "2,27,738", label: lang === "te" ? "నమోదిత ఓటర్లు (2023)" : "Registered Voters (2023)" },
              { value: lang === "te" ? "జనరల్" : "General", label: lang === "te" ? "వర్గం" : "Category" },
            ].map((stat) => (
              <div key={stat.label} className="fact-item">
                <span className="fact-value" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>{stat.value}</span>
                <span className="fact-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandals */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid-2-col" style={{ alignItems: "start" }}>
            <div>
              <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.eightMandals}</p>
              <span className="accent-line" />
              <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
                {t.geographyTitle}
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.geographyDesc}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {constituency.mandals.map((mandal) => (
                  <div
                    key={mandal.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.875rem 1rem",
                      background: mandal.isHeadquarters ? "rgba(238,90,28,0.06)" : "var(--white)",
                      border: `1px solid ${mandal.isHeadquarters ? "rgba(238,90,28,0.2)" : "var(--border)"}`,
                      borderRadius: "10px",
                    }}
                  >
                    <MapPin size={14} color={mandal.isHeadquarters ? "var(--saffron)" : "var(--muted-light)"} />
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                        {lang === "te" ? mandal.nameTelugu : mandal.name}
                        {mandal.isHeadquarters && (
                          <span style={{ marginLeft: "0.4rem", fontSize: "0.6rem", color: "var(--saffron)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>HQ</span>
                        )}
                      </p>
                      <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", fontFamily: lang === "te" ? "var(--font-body)" : "var(--font-telugu)" }}>
                        {lang === "te" ? mandal.name : mandal.nameTelugu}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.72rem", color: "var(--muted-light)", marginTop: "1rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.mapCaption}
              </p>
            </div>

            {/* Constituency Map Visual */}
            <div>
              <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", marginBottom: "1.5rem" }}>
                <Image
                  src="/images/constituency-map.jpg"
                  alt="Alair constituency map — mandal boundaries, Yadadri Bhuvanagiri"
                  width={600}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Landmarks */}
      <section className="section-padding" style={{ background: "var(--white)" }}>
        <div className="container-site">
          <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.landmarksTitle}</p>
          <span className="accent-line" />
          <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            {t.landmarksTitle}
          </h2>

          <div className="grid-3-col">
            {constituency.keyLandmarks.map((landmark) => (
              <div
                key={landmark.name}
                className="card"
                style={{ padding: "0" }}
              >
                {landmark.image && (
                  <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                    <Image
                      src={landmark.image}
                      alt={`${landmark.name} — Alair constituency`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div style={{ padding: "1.25rem" }}>
                  <span className="tag tag-saffron" style={{ marginBottom: "0.5rem", display: "inline-block", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {landmark.significance}
                  </span>
                  <p style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" && landmark.nameTelugu ? landmark.nameTelugu : landmark.name}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.55, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {landmark.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economy */}
      <section className="section-padding" style={{ background: "var(--warm-bg)" }}>
        <div className="container-site">
          <div className="grid-2-col">
            <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <Image
                src="/images/alair-agriculture.jpg"
                alt="Agricultural farmlands of Alair constituency, Yadadri Bhuvanagiri"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="section-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.economyTitle}</p>
              <span className="accent-line" />
              <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(1.3rem, 2vw, 1.75rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                {t.economyTitle}
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {t.economyDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
