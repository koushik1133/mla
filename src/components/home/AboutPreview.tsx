"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPreview() {
  return (
    <section
      className="section-padding"
      style={{ background: "var(--warm-bg)" }}
      aria-labelledby="about-heading"
    >
      <div className="container-site">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "relative" }}>
              {/* Main image */}
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  position: "relative",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
                }}
              >
                <Image
                  src="/images/beerla-portrait.jpg"
                  alt="Beerla Ilaiah — MLA, Alair constituency, Telangana"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Accent card overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "-1.5rem",
                  background: "var(--charcoal)",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  maxWidth: "200px",
                }}
              >
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                  Born in
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 800, color: "white", fontFamily: "var(--font-display)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                  Saidapur
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.2rem" }}>
                  Yadadri Bhuvanagiri, Telangana
                </p>
              </div>
              {/* Saffron accent block */}
              <div
                style={{
                  position: "absolute",
                  top: "2rem",
                  left: "-1rem",
                  width: "5px",
                  height: "80px",
                  background: "var(--saffron)",
                  borderRadius: "3px",
                }}
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Who is Beerla Ilaiah?</p>
            <span className="accent-line" />
            <h2 className="section-title" id="about-heading">
              From Saidapur to the Telangana Assembly
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "1.5rem" }}>
              Born on June 6, 1975, in Saidapur village, Beerla Ilaiah's journey in public life began with
              student activism in NSUI at Sri Laxmi Narasimha Degree College in Bhongir, where he completed
              his B.A. in 2000.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              From serving as Sarpanch of his home village in 2006 to Mandal President of Yadadri
              Bhuvanagiri in 2008, and later as Congress in-charge for Alair constituency — his rise has
              been a steady, grassroots progression through public service.
            </p>
            <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
              In the 2023 Telangana Legislative Assembly election, he won Alair Constituency No. 97 with
              122,140 votes and 57.41% vote share. He has since served as Government Whip and, from
              November 2025, as President of the Yadadri Bhuvanagiri District Congress Committee.
            </p>

            {/* Key facts */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "2rem",
                padding: "1.5rem",
                background: "var(--white)",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              {[
                { label: "Education", value: "B.A., SLNS Degree College, Bhongir" },
                { label: "Community", value: "Golla-Kuruma" },
                { label: "Party", value: "Indian National Congress" },
                { label: "In Public Life Since", value: "1990s (NSUI)" },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--charcoal)" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <Link href="/about" className="btn-primary">
                Full Biography <ArrowRight size={16} />
              </Link>
              <Link href="/journey" className="btn-secondary">
                Political Journey
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          div[style*="right: -1.5rem"] {
            right: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
