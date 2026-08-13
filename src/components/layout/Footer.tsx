"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TwitterXIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { footerLinks } from "@/content/navigation";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-main" role="contentinfo">
      <div className="container-site">
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Identity */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "white", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                Beerla Ilaiah
              </p>
              <p style={{ fontFamily: "var(--font-telugu)", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem" }}>
                బీర్ల ఇలయ్య
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>Member of the Telangana Legislative Assembly</span>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>Alair Constituency No. 97</span>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>Yadadri Bhuvanagiri District</span>
                <span style={{ fontSize: "0.82rem", color: "var(--saffron-light)", fontWeight: 600, marginTop: "0.25rem" }}>Indian National Congress</span>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <a
                href="https://twitter.com/IlaiahBeerla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beerla Ilaiah on X (Twitter)"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  transition: "background 0.2s, color 0.2s",
                  textDecoration: "none",
                }}
              >
                <TwitterXIcon size={15} />
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
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  transition: "background 0.2s, color 0.2s",
                  textDecoration: "none",
                }}
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href={`https://www.youtube.com/results?search_query=Beerla+Ilaiah`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Beerla Ilaiah on YouTube"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  transition: "background 0.2s, color 0.2s",
                  textDecoration: "none",
                }}
              >
                <YoutubeIcon size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
              About
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media Links */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
              Media
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.media.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources & External */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
              Official Sources
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "PRS India", url: "https://prsindia.org" },
                { label: "ADR India", url: "https://adrindia.org" },
                { label: "ECI Results", url: "https://results.eci.gov.in" },
                { label: "Telangana Assembly", url: "https://tslegislature.telangana.gov.in" },
                { label: "Indian National Congress", url: "https://inc.in" },
              ].map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    {src.label} <ExternalLink size={10} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
            © {year} Beerla Ilaiah MLA, Alair. Public information website.
            Party affiliation and public-office information are presented for informational purposes.
            Not an official Government of Telangana or INC national website.
          </p>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
            Election data: Election Commission of India / ADR India
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
