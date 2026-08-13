"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { constituency } from "@/content/constituency";

export default function AlairSection() {
  return (
    <section
      className="section-padding"
      style={{ background: "var(--white)" }}
      aria-labelledby="alair-heading"
    >
      <div className="container-site">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">Alair Constituency</p>
            <span className="accent-line" />
            <h2 className="section-title" id="alair-heading">
              The Land &amp; People of Alair
            </h2>
            <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
              Alair Assembly Constituency No. 97 spans eight mandals in Yadadri Bhuvanagiri district —
              home to 2.27 lakh registered voters, vibrant agricultural communities, and the sacred
              Yadadri Sri Lakshmi Narasimha Swamy Temple.
            </p>

            {/* Mandals grid */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--muted-light)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Eight Mandals
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {constituency.mandals.map((m) => (
                  <span key={m.name} className="tag tag-saffron">
                    {m.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Landmarks */}
            <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {constituency.keyLandmarks.slice(0, 2).map((landmark) => (
                <div
                  key={landmark.name}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem",
                    background: "var(--warm-bg)",
                    borderRadius: "10px",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div style={{ flex: "0 0 auto", width: "32px", height: "32px", borderRadius: "8px", background: "rgba(238,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={15} color="var(--saffron)" />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.2rem" }}>
                      {landmark.name}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.4 }}>
                      {landmark.description.slice(0, 120)}…
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/alair" className="btn-primary">
              Explore Alair Constituency <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right — Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: "1rem" }}>
              {/* Yadadri Temple */}
              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "16/9", position: "relative" }}>
                <Image
                  src="/images/yadadri-temple.jpg"
                  alt="Yadadri Sri Lakshmi Narasimha Swamy Temple, Yadagirigutta — Alair constituency"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{ position: "absolute", bottom: "0.875rem", left: "0.875rem" }}>
                  <span style={{ display: "inline-block", padding: "0.25rem 0.7rem", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    Yadadri Temple · Yadagirigutta mandal
                  </span>
                </div>
              </div>

              {/* Agriculture */}
              <div style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "16/8", position: "relative" }}>
                <Image
                  src="/images/alair-agriculture.jpg"
                  alt="Alair constituency — agricultural farmlands, Yadadri Bhuvanagiri"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{ position: "absolute", bottom: "0.875rem", left: "0.875rem" }}>
                  <span style={{ display: "inline-block", padding: "0.25rem 0.7rem", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    Agricultural Landscape · Alair region
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
