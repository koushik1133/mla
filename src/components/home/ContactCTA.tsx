"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TwitterXIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section
      className="section-padding"
      style={{ background: "var(--white)" }}
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <div
          style={{
            background: "var(--charcoal)",
            borderRadius: "20px",
            padding: "clamp(2.5rem, 5vw, 4rem)",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "3rem",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(238,90,28,0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              transform: "translate(30%, -30%)",
            }}
          />

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--saffron)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Connect
            </p>
            <h2
              id="contact-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Reach the Public Office of<br />Beerla Ilaiah MLA
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, maxWidth: "480px", marginBottom: "2rem" }}>
              For constituency matters, public enquiries, or to connect with MLA Beerla Ilaiah&apos;s office, reach out through the contact page or social media.
            </p>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Contact the Office <ArrowRight size={16} />
              </Link>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <a
                  href="https://twitter.com/IlaiahBeerla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Beerla Ilaiah on X (Twitter)"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                >
                  <TwitterXIcon size={17} />
                </a>
                <a
                  href="https://instagram.com/beerla_ilaiah_inc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Beerla Ilaiah on Instagram"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1.5px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                >
                  <InstagramIcon size={17} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — handles display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
              minWidth: "200px",
            }}
          >
            {[
              { icon: TwitterXIcon, label: "X (Twitter)", handle: "@IlaiahBeerla", url: "https://twitter.com/IlaiahBeerla" },
              { icon: InstagramIcon, label: "Instagram", handle: "@beerla_ilaiah_inc", url: "https://instagram.com/beerla_ilaiah_inc" },
            ].map(({ icon: Icon, label, handle, url }) => (
              <a
                key={handle}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  padding: "0.875rem 1.125rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <Icon size={18} color="rgba(255,255,255,0.6)" />
                <div>
                  <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.1rem" }}>{label}</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "white" }}>{handle}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          div[style*="gridTemplateColumns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
