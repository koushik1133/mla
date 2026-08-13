import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { politician } from "@/content/politician";

export const metadata: Metadata = {
  title: "About Beerla Ilaiah — MLA, Alair",
  description:
    "Biography of Beerla Ilaiah — from Saidapur village to the Telangana Legislative Assembly. His journey through NSUI, Sarpanch, Mandal President to MLA Alair constituency, Indian National Congress.",
};

export default function AboutPage() {
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
              <p className="section-label" style={{ color: "var(--saffron-light)" }}>About</p>
              <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
              <h1
                id="about-hero-heading"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                Beerla Ilaiah
              </h1>
              <p style={{ fontFamily: "var(--font-telugu)", fontSize: "1.2rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
                {politician.nameTelugu}
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: "480px" }}>
                Member of the Telangana Legislative Assembly representing Alair Constituency No. 97.
                Government Whip. President, Yadadri Bhuvanagiri DCC. Indian National Congress.
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
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            Early Life &amp; Education
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              Beerla Ilaiah was born on June 6, 1975, in Saidapur village, Yadadri Bhuvanagiri district, Telangana, to Beerla Somajaru and Beerla Buchamma. He belongs to the Golla-Kuruma community. He is married to Beerla Anitha, and they have three children.
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              He completed his secondary schooling at Zilla Parishad High School in 1991, and went on to earn a Bachelor of Arts degree from Sri Laxmi Narasimha Degree College, Bhongir, in 2000 — a college that would also be the beginning of his political engagement.
            </p>
          </div>

          <p style={{ fontSize: "0.72rem", color: "var(--muted-light)", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid var(--border)" }}>
            ℹ Sources: Wikipedia, HelloHyderabad.org, Hans India — biographical details are based on publicly reported information.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            Political Journey
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "3rem" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              Beerla Ilaiah&apos;s political journey began as a student activist at Sri Laxmi Narasimha Degree College, Bhongir, where he joined the National Students&apos; Union of India (NSUI), the student wing of the Indian National Congress. His commitment to student welfare and community issues led to his election as College Secretary.
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              In 2006, he was elected as the Sarpanch of his home village, Saidapur — a role in which he focused on infrastructure development, clean water access, and healthcare. By 2008, he had advanced to serve as Mandal President of Yadadri Bhuvanagiri for the Indian National Congress.
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              He subsequently served as the Congress in-charge for the Alair Assembly Constituency, building the party&apos;s organizational presence across all eight mandals — Alair, Rajapet, Yadagirigutta, Turkapally, Gundala, Atmakur, Bommala Ramaram, and Motakondur.
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            2023 Election &amp; Current Role
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              In the 2023 Telangana Legislative Assembly election, Beerla Ilaiah contested and won Alair Constituency No. 97 on an Indian National Congress ticket, securing 122,140 votes — representing a 57.41% vote share — and defeating the BRS candidate Gongidi Sunitha by a margin of 49,636 votes.
            </p>
            <p style={{ fontSize: "1.05rem", color: "var(--charcoal-60)", lineHeight: 1.75 }}>
              He was sworn in as a Member of the Telangana Legislative Assembly on December 3, 2023. He was subsequently appointed as a Government Whip in the Telangana Legislative Assembly. In November 2025, he was appointed as the President of the Yadadri Bhuvanagiri District Congress Committee (DCC).
            </p>
          </div>

          <div style={{ padding: "1.5rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Source References
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                { text: "PRS Legislative Research — MLA profile, term from December 3, 2023", confidence: "High" },
                { text: "Election Commission of India — 2023 election results, Alair constituency", confidence: "High" },
                { text: "Wikipedia — biographical details, political career", confidence: "Medium" },
                { text: "Hans India / HelloHyderabad — community, education, early career", confidence: "Medium" },
                { text: "Poliple / BCSamachar — DCC President appointment, November 2025", confidence: "Medium" },
              ].map((src) => (
                <li key={src.text} style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem" }}>
                  <span style={{ color: src.confidence === "High" ? "var(--congress-green)" : "var(--muted-light)", fontWeight: 700, minWidth: "50px" }}>
                    {src.confidence}
                  </span>
                  <span style={{ color: "var(--muted)" }}>{src.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link href="/journey" className="btn-primary">
              Full Political Timeline <ArrowRight size={16} />
            </Link>
            <Link href="/election-2023" className="btn-secondary">
              2023 Election Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
