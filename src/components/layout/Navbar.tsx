"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/navigation";
import { HandSymbolIcon } from "@/components/icons/SocialIcons";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { politician } from "@/content/politician";

import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { lang, toggle } = useLang();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang].nav;
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem" }}>◆</span>
            <span>{t.whipBanner}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span>{t.mlaBanner}</span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span style={{ color: "#EE5A1C", fontWeight: 600 }}>{t.partyBanner}</span>
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
          background: scrolled ? "rgba(255,255,255,0.98)" : "#ffffff",
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
            <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.25, maxWidth: "60%" }}>
              <span style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontWeight: 800, fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "var(--charcoal)", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {lang === "te" ? politician.nameTelugu : politician.name}
              </span>
              <span className="logo-subtext" style={{ fontSize: "0.68rem", color: "var(--muted)", fontWeight: 500, letterSpacing: "0.03em", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {lang === "te" ? "ఆలేరు ఎమ్మెల్యే · కాంగ్రెస్" : "MLA · Alair · INC"}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                  style={{
                    padding: "0.35rem 0.75rem",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                  }}
                >
                  {lang === "te" ? link.labelTe : link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Theme Switcher Button (Saffron vs Green #138808) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme Version"
                title={theme === "green" ? "Current: Congress Green (#138808). Click to switch to Saffron." : "Current: Saffron Orange. Click to switch to Congress Green (#138808)."}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.35rem 0.65rem",
                  minHeight: "36px",
                  border: "1.5px solid",
                  borderColor: theme === "green" ? "#138808" : "var(--saffron)",
                  borderRadius: "100px",
                  background: theme === "green" ? "rgba(19,136,8,0.1)" : "rgba(238,90,28,0.06)",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: theme === "green" ? "#138808" : "var(--saffron-dark)",
                  whiteSpace: "nowrap",
                }}
              >
                {theme === "green" ? "🟢 Green (#138808)" : "🟠 Orange"}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggle}
                aria-label={`Switch to ${lang === "en" ? "Telugu" : "English"}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.35rem",
                  padding: "0.35rem 0.75rem",
                  minHeight: "36px",
                  border: "1.5px solid var(--saffron)",
                  borderRadius: "100px",
                  background: "rgba(238,90,28,0.06)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--saffron-dark)",
                  transition: "all 0.2s ease",
                  fontFamily: lang === "en" ? "var(--font-telugu)" : "var(--font-body)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.switchLang}
              </button>

              {/* Congress Badge */}
              <div
                className="header-inc-badge"
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
                <HandSymbolIcon size={12} style={{ fill: "#166A2F" }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--congress-green)", letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{lang === "te" ? "ఐఎన్‌సి" : "INC"}</span>
              </div>

              {/* Hamburger Menu Button */}
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "none",
                  padding: "0.5rem",
                  minWidth: "44px",
                  minHeight: "44px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}
              >
                <Menu size={24} color="var(--charcoal)" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "var(--white)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div style={{ padding: "1.25rem var(--container-padding)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <Link href="/" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
                <span style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--charcoal)" }}>
                  {lang === "te" ? politician.nameTelugu : politician.name}
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={26} color="var(--charcoal)" />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.875rem 0",
                    borderBottom: "1px solid var(--border-light)",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: isActive(link.href) ? "var(--saffron)" : "var(--charcoal)",
                    textDecoration: "none",
                  }}
                >
                  {lang === "te" ? link.labelTe : link.label}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: "1.75rem", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={() => { toggle(); setMobileOpen(false); }}
                style={{
                  padding: "0.75rem 1.5rem",
                  minHeight: "44px",
                  border: "1.5px solid var(--saffron)",
                  borderRadius: "100px",
                  background: "rgba(238,90,28,0.08)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--saffron-dark)",
                  cursor: "pointer",
                  fontFamily: lang === "en" ? "var(--font-telugu)" : "var(--font-body)",
                }}
              >
                {t.switchLang}
              </button>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(22,106,47,0.08)",
                  border: "1px solid rgba(22,106,47,0.2)",
                  borderRadius: "100px",
                }}
              >
                <HandSymbolIcon size={14} style={{ fill: "#166A2F" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--congress-green)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{lang === "te" ? "ఐఎన్‌సి" : "INC"}</span>
              </div>
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--warm-bg)", borderRadius: "10px" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.5, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? "ప్రజా సమాచార జాలగూడు. సమాచార ప్రయోజనాల కోసం మాత్రమే." : "Public information website. Party affiliation presented for informational purposes only."}
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
