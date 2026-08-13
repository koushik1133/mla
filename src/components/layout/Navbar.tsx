"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/navigation";

interface NavbarProps {
  lang: "en" | "te";
  onLangToggle: () => void;
}

export default function Navbar({ lang, onLangToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container-site">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>◆</span>
            <span>Government Whip · Telangana Legislative Assembly</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span>MLA, Alair No. 97 · Yadadri Bhuvanagiri</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span style={{ color: "#EE5A1C", fontWeight: 600 }}>Indian National Congress</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>◆</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
          transition: "box-shadow 0.2s ease",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="container-site">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "var(--charcoal)", letterSpacing: "-0.02em" }}>
                Beerla Ilaiah
              </span>
              <span style={{ fontSize: "0.68rem", color: "var(--muted)", fontWeight: 500, letterSpacing: "0.04em" }}>
                MLA · Alair · Indian National Congress
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                  style={{ padding: "0.35rem 0.75rem" }}
                >
                  {lang === "te" ? link.labelTe : link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* Language Switcher */}
              <button
                onClick={onLangToggle}
                aria-label={`Switch to ${lang === "en" ? "Telugu" : "English"}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "0.35rem 0.75rem",
                  border: "1.5px solid var(--border)",
                  borderRadius: "100px",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--charcoal-60)",
                  transition: "all 0.2s ease",
                  fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                }}
              >
                {lang === "en" ? "తెలుగు" : "English"}
              </button>

              {/* Congress Badge — compact */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  padding: "0.3rem 0.65rem",
                  background: "rgba(22,106,47,0.07)",
                  border: "1px solid rgba(22,106,47,0.2)",
                  borderRadius: "100px",
                }}
              >
                {/* INC Hand symbol — SVG */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C10.9 2 10 2.9 10 4V11C10 11.6 9.6 12 9 12C8.4 12 8 11.6 8 11V7C8 5.9 7.1 5 6 5C4.9 5 4 5.9 4 7V14C4 17.3 6.7 20 10 20H14C17.3 20 20 17.3 20 14V8C20 6.9 19.1 6 18 6C16.9 6 16 6.9 16 8V11C16 11.6 15.6 12 15 12C14.4 12 14 11.6 14 11V4C14 2.9 13.1 2 12 2Z" fill="#166A2F"/>
                </svg>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--congress-green)", letterSpacing: "0.04em", textTransform: "uppercase" }}>INC</span>
              </div>

              {/* Hamburger */}
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: "0.25rem" }}
              >
                <Menu size={22} color="var(--charcoal)" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "var(--white)",
            overflowY: "auto",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div style={{ padding: "1.25rem var(--container-padding)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
              <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--charcoal)" }}>
                  Beerla Ilaiah
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <X size={24} color="var(--charcoal)" />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--border-light)",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: isActive(link.href) ? "var(--saffron)" : "var(--charcoal)",
                    textDecoration: "none",
                  }}
                >
                  {lang === "te" ? link.labelTe : link.label}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                onClick={() => { onLangToggle(); setMobileOpen(false); }}
                style={{
                  padding: "0.6rem 1.25rem",
                  border: "1.5px solid var(--border)",
                  borderRadius: "100px",
                  background: "transparent",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                }}
              >
                {lang === "en" ? "తెలుగు" : "English"}
              </button>
            </div>

            <div style={{ marginTop: "2.5rem", padding: "1rem", background: "var(--warm-bg)", borderRadius: "8px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.5 }}>
                Public information website. Party affiliation presented for informational purposes only. Not affiliated with official Government of Telangana or INC national websites.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
