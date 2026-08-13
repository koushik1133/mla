import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { constituency } from "@/content/constituency";

export const metadata: Metadata = {
  title: "Alair Constituency No. 97 — Yadadri Bhuvanagiri, Telangana",
  description:
    "Alair Assembly Constituency No. 97, Yadadri Bhuvanagiri District, Telangana. Eight mandals, 2.27 lakh registered voters. Home to the Yadadri Sri Lakshmi Narasimha Swamy Temple.",
};

export default function AlairPage() {
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
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--saffron-light)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Assembly Constituency
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Alair — No. 97
          </h1>
          <p style={{ fontFamily: "var(--font-telugu)", fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>
            {constituency.nameTelugu} నియోజకవర్గం
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)" }}>
            Yadadri Bhuvanagiri District · Telangana · Bhongir Lok Sabha Constituency
          </p>
        </div>
      </section>

      {/* Overview stats */}
      <section style={{ background: "var(--white)", padding: "2rem 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container-site">
          <div className="grid-4-col">
            {[
              { value: "No. 97", label: "Constituency Number" },
              { value: "8", label: "Mandals" },
              { value: "2,27,738", label: "Registered Voters (2023)" },
              { value: "General", label: "Category" },
            ].map((stat) => (
              <div key={stat.label} className="fact-item">
                <span className="fact-value">{stat.value}</span>
                <span className="fact-label">{stat.label}</span>
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
              <p className="section-label">Geography</p>
              <span className="accent-line" />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "1.25rem" }}>
                Eight Mandals of Alair Constituency
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Alair Assembly Constituency spans eight mandals in the Yadadri Bhuvanagiri district — a predominantly rural region with agriculture, pilgrimage tourism, and emerging industrial activity.
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
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--charcoal)" }}>
                        {mandal.name}
                        {mandal.isHeadquarters && (
                          <span style={{ marginLeft: "0.4rem", fontSize: "0.6rem", color: "var(--saffron)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>HQ</span>
                        )}
                      </p>
                      <p style={{ fontFamily: "var(--font-telugu)", fontSize: "0.78rem", color: "var(--muted-light)" }}>
                        {mandal.nameTelugu}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.72rem", color: "var(--muted-light)", marginTop: "1rem" }}>
                Source: Wikipedia / Election Commission of India
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
              <p style={{ fontSize: "0.72rem", color: "var(--muted-light)", lineHeight: 1.5, textAlign: "center" }}>
                Illustrative map showing Alair constituency region. For official boundaries, refer to the Election Commission of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Landmarks */}
      <section className="section-padding" style={{ background: "var(--white)" }}>
        <div className="container-site">
          <p className="section-label">Heritage &amp; Places</p>
          <span className="accent-line" />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            Key Landmarks in Alair Constituency
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
                  <span className="tag tag-saffron" style={{ marginBottom: "0.5rem", display: "inline-block" }}>
                    {landmark.significance}
                  </span>
                  <p style={{ fontSize: "0.975rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                    {landmark.name}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.55 }}>
                    {landmark.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electoral Data */}
      <section className="section-padding" style={{ background: "var(--warm-bg)" }}>
        <div className="container-site">
          <p className="section-label">Demographics</p>
          <span className="accent-line" />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            Electoral Profile
          </h2>

          <div className="grid-3-col">
            {[
              { label: "Total Registered Electors", value: "2,27,738", sub: "2023 General Election", source: "ECI / News18" },
              { label: "Female Voters per 1000 Male", value: "991", sub: "Near gender-equal electorate", source: "ECI 2023" },
              { label: "SC Population", value: "~17.13%", sub: "Estimated per delimitation data", source: "News18 / ECI" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "1.5rem",
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: "var(--saffron)", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: "0.5rem" }}>{stat.sub}</p>
                <p style={{ fontSize: "0.68rem", color: "var(--muted-light)" }}>Source: {stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agriculture section with image */}
      <section className="section-padding" style={{ background: "var(--white)" }}>
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
              <p className="section-label">Economy</p>
              <span className="accent-line" />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2vw, 1.75rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                Agriculture &amp; Rural Economy
              </h2>
              <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7 }}>
                {constituency.character}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
