"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { TwitterXIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { politician } from "@/content/politician";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang].footer;
  const year = new Date().getFullYear();

  const footerLinks = {
    quick: [
      { label: lang === "te" ? "గురించి" : "About", href: "/about" },
      { label: lang === "te" ? "రాజకీయ ప్రస్థానం" : "Journey", href: "/journey" },
      { label: lang === "te" ? "ఆలేరు నియోజకవర్గం" : "Alair Constituency", href: "/alair" },
      { label: lang === "te" ? "ప్రజా సేవ" : "Public Service", href: "/public-service" },
      { label: lang === "te" ? "ఎన్నికలు 2023" : "Election 2023", href: "/election-2023" },
    ],
    media: [
      { label: lang === "te" ? "మీడియా వివరాలు" : "Media Archive", href: "/media" },
      { label: lang === "te" ? "ఫోటో గ్యాలరీ" : "Photo Gallery", href: "/gallery" },
      { label: lang === "te" ? "వార్తలు" : "News", href: "/news" },
      { label: lang === "te" ? "సంప్రదించండి" : "Contact", href: "/contact" },
    ],
  };

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
              <p style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "white", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                {lang === "te" ? politician.nameTelugu : politician.name}
              </p>
              <p style={{ fontFamily: lang === "te" ? "var(--font-display)" : "var(--font-telugu)", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem" }}>
                {lang === "te" ? politician.name : politician.nameTelugu}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>{t.role}</span>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>{t.constituency}</span>
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>{t.district}</span>
                <span style={{ fontSize: "0.82rem", color: "var(--saffron-light)", fontWeight: 600, marginTop: "0.25rem" }}>{t.party}</span>
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
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.aboutHeader}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Media Links */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.mediaHeader}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.media.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sources & External */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
              {t.sourcesHeader}
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
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            © {year} Beerla Ilaiah MLA, Alair. {t.copyright}
          </p>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.disclaimer}
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
