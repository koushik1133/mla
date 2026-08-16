"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { politician } from "@/content/politician";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { HandSymbolIcon } from "@/components/icons/SocialIcons";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { safeImageSrc } from "@/lib/supabase";

const PORTRAIT = "/images/beerla-standing.jpg";
const BACKDROP = "/images/hero-bg.jpg";

export default function Hero() {
  const { lang } = useLang();
  const { heroConfig } = useSiteConfig();
  const t = translations[lang].hero;

  const portrait = safeImageSrc(heroConfig.sideImage, PORTRAIT);
  const backdrop = safeImageSrc(heroConfig.bgImage, BACKDROP);
  const te = lang === "te";

  // The hero fills "viewport minus everything above it". That chrome height
  // varies per breakpoint (the announcement bar wraps on tablet, and is hidden
  // on phones), so hardcoding it made the hero overflow the first screen.
  // Measured from the hero's own offset — exact however many bars there are.
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const chrome = Math.round(el.getBoundingClientRect().top + window.scrollY);
      if (chrome >= 0) {
        document.documentElement.style.setProperty("--hero-chrome", `${chrome}px`);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    document
      .querySelectorAll("[data-chrome='ticker'], header, .announcement-bar")
      .forEach((el) => ro.observe(el));
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" aria-label="Introduction">
      {/* Constituency landscape — desktop/tablet only. The tiny mobile `sizes`
          makes phones fetch a near-zero-byte candidate instead of the full image. */}
      <div className="hero-bg" aria-hidden="true">
        <Image
          src={backdrop}
          alt=""
          fill
          priority
          quality={78}
          sizes="(max-width: 640px) 10px, 100vw"
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
      </div>

      {/* Portrait. Framed card beside the copy on desktop/tablet (the original
          treatment); full-bleed behind the copy on mobile. */}
      <div className="hero-figure">
        <Image
          src={portrait}
          alt={`${politician.name} — ${politician.role}, ${politician.constituency}`}
          fill
          priority
          quality={85}
          sizes="(max-width: 640px) 160vw, 420px"
          className="hero-figure-img"
        />
        <div className="hero-figure-fade" aria-hidden="true" />
        <div className="hero-figure-caption">
          <p className="hero-figure-kicker">PORTRAIT</p>
          <p className="hero-figure-name" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-display)" }}>
            {te ? "బీర్ల ఐలయ్య — ఎమ్మెల్యే, ఆలేరు" : `${politician.name} — MLA, ${politician.constituency}`}
          </p>
        </div>
      </div>

      <div className="hero-scrim" aria-hidden="true" />

      <div className="container-site hero-inner">
        <div className="hero-copy">
          <span className="congress-badge hero-party" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-body)" }}>
            <HandSymbolIcon size={12} style={{ fill: "#4CAF6E" }} />
            {t.partyBadge}
          </span>

          <p className="hero-eyebrow" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.whipBadge}
          </p>

          <h1
            lang={te ? "te" : "en"}
            className="hero-headline"
            style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-display)", letterSpacing: te ? "-0.01em" : "-0.035em" }}
          >
            {te ? politician.nameTelugu : politician.name}
          </h1>

          <p className="hero-altname" lang={te ? "en" : "te"} style={{ fontFamily: te ? "var(--font-display)" : "var(--font-telugu)" }}>
            {te ? politician.name : politician.nameTelugu}
          </p>

          <span className="hero-rule" />

          <p className="hero-role" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-display)" }}>
            {t.role}
          </p>
          <p className="hero-constituency" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.constituency}
          </p>

          <div className="hero-btn-group">
            <Link href="/public-service" className="btn-primary hero-btn" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-display)" }}>
              {t.ctaPrimary} <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-outline-white hero-btn" style={{ fontFamily: te ? "var(--font-telugu)" : "var(--font-display)" }}>
              {translations[lang].contact.btnContact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
