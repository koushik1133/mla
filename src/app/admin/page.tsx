"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Sliders,
  Megaphone,
  Layout,
  Key,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  LogOut,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Palette,
  Mail,
  Inbox,
} from "lucide-react";
import { useSiteConfig, TickerItem } from "@/context/SiteConfigContext";
import { useLang } from "@/lib/lang-context";

export default function AdminPage() {
  const {
    tickerItems,
    heroConfig,
    showThemeSwitcher,
    setShowThemeSwitcher,
    addTickerItem,
    toggleTickerItem,
    deleteTickerItem,
    updateHeroConfig,
    resetToDefaults,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    adminPin,
    setAdminPin,
  } = useSiteConfig();

  const { lang } = useLang();

  // Login PIN state
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // New PIN update state
  const [newPinInput, setNewPinInput] = useState("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<"hero" | "ticker" | "security" | "messages">("ticker");
  const [messages, setMessages] = useState<any[]>([]);

  // Lockout countdown timer
  React.useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = JSON.parse(localStorage.getItem("beerla_contact_messages") || "[]");
        setMessages(stored);
      } catch {
        setMessages([]);
      }
    }
  }, [activeTab]);

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("beerla_contact_messages", JSON.stringify(updated));
  };

  // Input Sanitization helper (OWASP XSS defense)
  const sanitizeInput = (str: string): string => {
    return str
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  // New Ticker Form
  const [newTickerEn, setNewTickerEn] = useState("");
  const [newTickerTe, setNewTickerTe] = useState("");
  const [newTickerLink, setNewTickerLink] = useState("");

  // Hero Edit Form State
  const [heroForm, setHeroForm] = useState(heroConfig);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    const success = loginAdmin(enteredPin);
    if (!success) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutTimer(60);
        setFailedAttempts(0);
        setPinError(
          lang === "te"
            ? "పరిమితి దాటింది! భద్రతా కారణాల వల్ల 60 సెకన్ల పాటు లాగిన్ నిలిపివేయబడింది."
            : "Security Lockout! Too many failed attempts. Please wait 60 seconds."
        );
      } else {
        setPinError(
          lang === "te"
            ? `తప్పు పాస్‌కోడ్! మిగిలిన ప్రయత్నాలు: ${5 - newAttempts}`
            : `Invalid passcode! Remaining attempts: ${5 - newAttempts}`
        );
      }
    } else {
      setPinError("");
      setEnteredPin("");
      setFailedAttempts(0);
    }
  };

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerEn.trim() && !newTickerTe.trim()) return;
    addTickerItem({
      textEn: sanitizeInput(newTickerEn || newTickerTe),
      textTe: sanitizeInput(newTickerTe || newTickerEn),
      link: newTickerLink ? sanitizeInput(newTickerLink) : undefined,
      active: true,
    });
    setNewTickerEn("");
    setNewTickerTe("");
    setNewTickerLink("");
  };

  const handleHeroSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig(heroForm);
  };

  const handlePinChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length < 4) {
      setPinSuccessMsg(lang === "te" ? "పాస్‌కోడ్ కనీసం 4 అంకెలు ఉండాలి." : "Passcode must be at least 4 digits.");
      return;
    }
    setAdminPin(newPinInput);
    setNewPinInput("");
    setPinSuccessMsg(lang === "te" ? "పాస్‌కోడ్ విజయవంతంగా నవీకరించబడింది!" : "Admin passcode updated successfully!");
  };

  // ----------------------------------------------------
  // LOCK SCREEN IF NOT AUTHENTICATED
  // ----------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div style={{ minHeight: "85vh", background: "var(--warm-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "var(--white)",
            borderRadius: "20px",
            padding: "clamp(1.25rem, 5vw, 2.5rem)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(238,90,28,0.1)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.25rem",
            }}
          >
            <Lock size={28} color="var(--saffron)" />
          </div>

          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
            {lang === "te" ? "ఎడ్మిన్ పోర్టల్ లాగిన్" : "Secure Admin Portal"}
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {lang === "te" ? "సైట్ నిర్వహణ కోసం దయచేసి ఎడ్మిన్ పాస్‌కోడ్ నమోదు చేయండి." : "Enter your secure admin passcode to access live website controls."}
          </p>

          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: "1.25rem" }}>
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                placeholder={lang === "te" ? "పాస్‌కోడ్ నమోదు చేయండి (Default: 0000)" : "Enter PIN (Default: 0000)"}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  borderRadius: "10px",
                  border: "1.5px solid var(--border)",
                  fontSize: "1rem",
                  textAlign: "center",
                  letterSpacing: "0.2em",
                  outline: "none",
                  fontWeight: 700,
                }}
                autoFocus
              />
            </div>

            {pinError && (
              <p style={{ color: "#E53E3E", fontSize: "0.8rem", marginBottom: "1rem", fontWeight: 600 }}>
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}
            >
              <Unlock size={16} /> {lang === "te" ? "లాగిన్ చేయండి" : "Authenticate & Access"}
            </button>
          </form>

          <div style={{ marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
            <Link href="/" style={{ fontSize: "0.8rem", color: "var(--muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <ArrowLeft size={14} /> {lang === "te" ? "వెబ్‌సైట్‌కి తిరిగి వెళ్లండి" : "Back to Website"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div style={{ background: "var(--warm-bg)", minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Header Bar */}
      <div style={{ background: "var(--charcoal)", color: "white", padding: "1.25rem 0", borderBottom: "3px solid var(--saffron)" }}>
        <div className="container-site" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="tag tag-saffron">{lang === "te" ? "అధికారిక ఎడ్మిన్" : "Official Admin"}</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>| Beerla Ilaiah MLA Portal</span>
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
              {lang === "te" ? "వెబ్‌సైట్ నిర్వహణ పోర్టల్" : "Live Website Control Center"}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", width: "100%", maxWidth: "400px" }}>
            <Link href="/" target="_blank" className="btn-outline-white" style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "0.5rem 0.85rem", minHeight: "44px", display: "inline-flex", alignItems: "center", gap: "0.4rem", whiteSpace: "nowrap" }}>
              <Eye size={14} /> {lang === "te" ? "లైవ్ సైట్ చూడండి" : "View Live Site"}
            </Link>
            <button
              onClick={logoutAdmin}
              style={{
                flex: 1,
                justifyContent: "center",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                padding: "0.5rem 0.85rem",
                borderRadius: "100px",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                minHeight: "44px",
                whiteSpace: "nowrap",
              }}
            >
              <LogOut size={14} /> {lang === "te" ? "నిష్క్రమించు" : "Sign Out"}
            </button>
          </div>
        </div>
      </div>

      <div className="container-site" style={{ marginTop: "1.5rem" }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "0.75rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {[
            { id: "ticker", labelEn: "Scrolling News Ticker", labelTe: "స్క్రోలింగ్ బ్రేకింగ్ అప్‌డేట్లు", icon: Megaphone },
            { id: "hero", labelEn: "Hero Section Studio", labelTe: "హీరో సెక్షన్ డిజైన్", icon: Layout },
            { id: "messages", labelEn: `Citizen Messages (${messages.length})`, labelTe: `ప్రజా వినతులు (${messages.length})`, icon: Inbox },
            { id: "security", labelEn: "Security & Passcode", labelTe: "పాస్‌కోడ్ సెట్టింగ్‌లు", icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "0.65rem 1.25rem",
                  minHeight: "44px",
                  borderRadius: "100px",
                  border: "none",
                  background: isActive ? "var(--saffron)" : "var(--white)",
                  color: isActive ? "white" : "var(--charcoal)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  boxShadow: isActive ? "0 4px 12px rgba(238,90,28,0.25)" : "none",
                  transition: "all 0.2s ease",
                  fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                }}
              >
                <Icon size={16} />
                {lang === "te" ? tab.labelTe : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* TAB 1: SCROLLING TICKER MANAGER */}
        {activeTab === "ticker" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="grid-2-col">
            {/* Add New Ticker Item */}
            <div style={{ background: "var(--white)", padding: "clamp(1rem, 4vw, 1.75rem)", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                <Plus size={18} color="var(--saffron)" />
                {lang === "te" ? "క్రొత్త బ్రేకింగ్ అప్‌డేట్ జోడించండి" : "Add New Scrolling Update"}
              </h2>

              <form onSubmit={handleAddTicker}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    Update Text (English)
                  </label>
                  <input
                    type="text"
                    value={newTickerEn}
                    onChange={(e) => setNewTickerEn(e.target.value)}
                    placeholder="e.g. MLA Beerla Ilaiah Inspects Alair Canal Works"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.9rem" }}
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    అప్‌డేట్ పాఠం (తెలుగు)
                  </label>
                  <input
                    type="text"
                    value={newTickerTe}
                    onChange={(e) => setNewTickerTe(e.target.value)}
                    placeholder="ఉదా: ఎమ్మెల్యే బీర్ల ఇలయ్య గారి ఆలేరు కాలువల పరిశీలన"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.9rem", fontFamily: "var(--font-telugu)" }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={newTickerLink}
                    onChange={(e) => setNewTickerLink(e.target.value)}
                    placeholder="e.g. /news or /public-service"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.9rem" }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                  <Plus size={16} /> {lang === "te" ? "అప్‌డేట్ ప్రచురించండి" : "Publish Update to Marquee"}
                </button>
              </form>
            </div>

            {/* Existing Ticker Items List */}
            <div style={{ background: "var(--white)", padding: "clamp(1rem, 4vw, 1.75rem)", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                  {lang === "te" ? "ప్రస్తుత అప్‌డేట్ల జాబితా" : "Active Marquee Items"} ({tickerItems.length})
                </h2>
                <button
                  onClick={resetToDefaults}
                  style={{ background: "transparent", border: "none", color: "var(--muted-light)", fontSize: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}
                >
                  <RefreshCw size={12} /> Reset Defaults
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {tickerItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "1rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border)",
                      background: item.active ? "var(--white)" : "#F7F7F7",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.2rem" }}>
                        {item.textEn}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-telugu)" }}>
                        {item.textTe}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                      <button
                        onClick={() => toggleTickerItem(item.id)}
                        style={{
                          padding: "0.3rem 0.65rem",
                          borderRadius: "100px",
                          border: "none",
                          background: item.active ? "rgba(22,106,47,0.12)" : "rgba(0,0,0,0.06)",
                          color: item.active ? "var(--congress-green)" : "var(--muted)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {item.active ? "LIVE" : "PAUSED"}
                      </button>

                      <button
                        onClick={() => deleteTickerItem(item.id)}
                        style={{ background: "transparent", border: "none", color: "#E53E3E", cursor: "pointer", padding: "0.3rem" }}
                        aria-label="Delete ticker"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO SECTION CUSTOMIZER */}
        {activeTab === "hero" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem" }} className="grid-2-col">
            {/* Hero Form */}
            <div style={{ background: "var(--white)", padding: "clamp(1rem, 4vw, 1.75rem)", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "1.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                {lang === "te" ? "హీరో సెక్షన్ ఫోటోలు & పాఠం నవీకరించండి" : "Customize Hero Section Assets & Typography"}
              </h2>

              <form onSubmit={handleHeroSave}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    Background Image URL
                  </label>
                  <input
                    type="text"
                    value={heroForm.bgImage}
                    onChange={(e) => setHeroForm({ ...heroForm, bgImage: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.875rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {["/images/hero-bg.jpg", "/images/alair-agriculture.jpg", "/images/yadadri-temple.jpg"].map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setHeroForm({ ...heroForm, bgImage: url })}
                        style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--warm-bg)", cursor: "pointer" }}
                      >
                        Preset {url.split("/").pop()}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    Side Portrait Card Image URL
                  </label>
                  <input
                    type="text"
                    value={heroForm.sideImage}
                    onChange={(e) => setHeroForm({ ...heroForm, sideImage: e.target.value })}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.875rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {["/images/beerla-standing.jpg", "/images/images (1).jpeg"].map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setHeroForm({ ...heroForm, sideImage: url })}
                        style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid var(--border)", background: "var(--warm-bg)", cursor: "pointer" }}
                      >
                        Preset {url.split("/").pop()}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    Text Placement Alignment
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {(["left", "center", "right"] as const).map((align) => (
                      <button
                        key={align}
                        type="button"
                        onClick={() => setHeroForm({ ...heroForm, alignment: align })}
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          borderRadius: "8px",
                          border: "1.5px solid",
                          borderColor: heroForm.alignment === align ? "var(--saffron)" : "var(--border)",
                          background: heroForm.alignment === align ? "rgba(238,90,28,0.1)" : "var(--white)",
                          color: heroForm.alignment === align ? "var(--saffron)" : "var(--muted)",
                          fontWeight: 700,
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                  <CheckCircle size={16} /> {lang === "te" ? "మార్పులు సేవ్ చేయండి" : "Save Live Hero Customizations"}
                </button>
              </form>
            </div>

            {/* Live Card Preview */}
            <div style={{ background: "var(--charcoal)", padding: "1.75rem", borderRadius: "16px", color: "white" }}>
              <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
                Live Hero Section Preview
              </h3>

              <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Image src={heroForm.sideImage || "/images/beerla-standing.jpg"} alt="Preview" fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
                  <span className="tag tag-saffron" style={{ marginBottom: "0.3rem", display: "inline-block" }}>
                    {heroForm.partyBadgeEn}
                  </span>
                  <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "white" }}>{heroForm.headlineEn}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECURITY SETTINGS */}
        {activeTab === "security" && (
          <div style={{ maxWidth: "550px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Theme Switcher Display Settings */}
            <div style={{ background: "var(--white)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                <Palette size={20} color="var(--saffron)" />
                {lang === "te" ? "థీమ్ స్విచ్చర్ బాటన్ (ఆరెంజ్ / గ్రీన్)" : "Theme Version Switcher Button"}
              </h2>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "1.25rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                {lang === "te" ? "హెడర్‌లో ఆరెంజ్ / కాంగ్రెస్ గ్రీన్ థీమ్ మార్చే బటన్‌ను చూపించండి లేదా దాచండి." : "Show or hide the theme toggle button (Orange vs Congress Green #009A44) in the header."}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", borderRadius: "10px", background: "var(--warm-bg)", border: "1px solid var(--border)" }}>
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                    {lang === "te" ? "థీమ్ స్విచ్చర్ ప్రదర్శన" : "Header Theme Switcher"}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted-light)" }}>
                    {showThemeSwitcher ? (lang === "te" ? "ప్రస్తుతం కనిపిస్తోంది" : "Currently Visible in Header") : (lang === "te" ? "ప్రస్తుతం దాచబడింది" : "Currently Hidden")}
                  </p>
                </div>

                <button
                  onClick={() => setShowThemeSwitcher(!showThemeSwitcher)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "100px",
                    border: "none",
                    background: showThemeSwitcher ? "var(--congress-green)" : "var(--charcoal-60)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {showThemeSwitcher ? (lang === "te" ? "దాచండి (Hide)" : "Enabled (Hide)") : (lang === "te" ? "చూపించండి (Show)" : "Disabled (Show)")}
                </button>
              </div>
            </div>

            {/* Passcode Security */}
            <div style={{ background: "var(--white)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border)" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                <Key size={20} color="var(--saffron)" />
                {lang === "te" ? "ఎడ్మిన్ పాస్‌కోడ్ మార్చండి" : "Update Admin Passcode"}
              </h2>

              <form onSubmit={handlePinChange}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.35rem" }}>
                    New Security PIN / Passcode
                  </label>
                  <input
                    type="password"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Enter new 4+ digit PIN"
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "1rem", letterSpacing: "0.2em", textAlign: "center" }}
                  />
                </div>

                {pinSuccessMsg && (
                  <p style={{ color: pinSuccessMsg.includes("సఫలం") || pinSuccessMsg.includes("successfully") ? "var(--congress-green)" : "#E53E3E", fontSize: "0.82rem", marginBottom: "1rem", fontWeight: 600 }}>
                    {pinSuccessMsg}
                  </p>
                )}

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                  {lang === "te" ? "పాస్‌కోడ్ మార్చండి" : "Update Access Passcode"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab: Messages Inbox */}
        {activeTab === "messages" && (
          <div>
            <div style={{ background: "var(--white)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                    📬 {lang === "te" ? "ప్రజా వినతులు & సందేశాల నిధి" : "Citizen Submissions & Grievance Inbox"}
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? "ఆలేరు నియోజకవర్గ ప్రజలు సంప్రదింపుల ఫారమ్ ద్వారా పంపిన వినతులు." : "Messages sent directly by citizens via the website contact form."}
                  </p>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Clear all received messages?")) {
                        setMessages([]);
                        localStorage.removeItem("beerla_contact_messages");
                      }
                    }}
                    style={{ padding: "0.5rem 1rem", background: "rgba(229,62,62,0.1)", color: "#E53E3E", border: "none", borderRadius: "100px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    Clear All Inbox
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", background: "var(--warm-bg)", borderRadius: "12px", border: "1px dashed var(--border)" }}>
                  <Inbox size={40} color="var(--muted-light)" style={{ margin: "0 auto 0.75rem" }} />
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? "ఇంకా సందేశాలు ఏవీ రాలేదు." : "No citizen messages in inbox yet."}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? "సందేశాలు సంప్రదింపుల ఫారమ్ ద్వారా పంపినపుడు ఇక్కడ కనిపిస్తాయి." : "Messages submitted via /contact form will automatically land here."}
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ padding: "1.25rem", borderRadius: "12px", background: "var(--warm-bg)", border: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: "260px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                          <span style={{ fontSize: "1rem", fontWeight: 800, color: "var(--charcoal)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                            {msg.name}
                          </span>
                          <span style={{ fontSize: "0.72rem", background: "var(--white)", padding: "0.2rem 0.5rem", borderRadius: "4px", border: "1px solid var(--border)", color: "var(--muted)" }}>
                            {msg.date}
                          </span>
                        </div>

                        <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "var(--saffron-dark)", fontWeight: 600, marginBottom: "0.75rem", flexWrap: "wrap" }}>
                          <span>📧 {msg.email}</span>
                          {msg.phone && <span>📞 {msg.phone}</span>}
                        </div>

                        <p style={{ fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.6, background: "white", padding: "0.875rem", borderRadius: "8px", border: "1px solid var(--border-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                          "{msg.message}"
                        </p>
                      </div>

                      <button
                        onClick={() => deleteMessage(msg.id)}
                        aria-label="Delete message"
                        style={{ background: "none", border: "none", color: "#E53E3E", cursor: "pointer", padding: "0.5rem" }}
                        title="Delete Message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
