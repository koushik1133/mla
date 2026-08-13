"use client";

import React, { useState, useEffect } from "react";
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
  Newspaper,
  Video,
  Image as ImageIcon,
  Database,
  Pencil,
  Check,
} from "lucide-react";
import { useSiteConfig, TickerItem } from "@/context/SiteConfigContext";
import { useLang } from "@/lib/lang-context";
import {
  supabase,
  isSupabaseConfigured,
  fetchContactMessages,
  deleteContactMessage,
  fetchNewsArticles,
  saveNewsArticle,
  deleteNewsArticle,
  fetchMediaVideos,
  saveMediaVideo,
  deleteMediaVideo,
  fetchGalleryImages,
  saveGalleryImage,
  deleteGalleryImage,
  MessageRecord,
  NewsRecord,
  MediaRecord,
  GalleryRecord,
} from "@/lib/supabase";

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
    resetPinWithMasterKey,
  } = useSiteConfig();

  const { lang } = useLang();

  // Login PIN state
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Supabase Auth State (optional email login)
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authMode, setAuthMode] = useState<"pin" | "supabase">("pin");

  // Reset PIN modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [masterKeyInput, setMasterKeyInput] = useState("");
  const [resetPinNewInput, setResetPinNewInput] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  // New PIN update state
  const [newPinInput, setNewPinInput] = useState("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState("");

  // New Ticker Form State
  const [newTickerEn, setNewTickerEn] = useState("");
  const [newTickerTe, setNewTickerTe] = useState("");
  const [newTickerLink, setNewTickerLink] = useState("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "messages" | "news" | "media" | "gallery" | "ticker" | "hero" | "security"
  >("messages");

  // Dynamic Data Lists
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [newsList, setNewsList] = useState<NewsRecord[]>([]);
  const [mediaList, setMediaList] = useState<MediaRecord[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryRecord[]>([]);

  // Form Editing States
  const [editingNews, setEditingNews] = useState<Partial<NewsRecord> | null>(null);
  const [editingMedia, setEditingMedia] = useState<Partial<MediaRecord> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryRecord> | null>(null);
  const [actionNotice, setActionNotice] = useState("");

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  // Fetch initial data when authenticated or activeTab changes
  useEffect(() => {
    if (!isAdminAuthenticated) return;
    loadAllData();
  }, [isAdminAuthenticated, activeTab]);

  const loadAllData = async () => {
    try {
      if (activeTab === "messages") {
        const data = await fetchContactMessages();
        setMessages(data);
      } else if (activeTab === "news") {
        const data = await fetchNewsArticles();
        setNewsList(data);
      } else if (activeTab === "media") {
        const data = await fetchMediaVideos();
        setMediaList(data);
      } else if (activeTab === "gallery") {
        const data = await fetchGalleryImages();
        setGalleryList(data);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const showTempNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(""), 3500);
  };

  const sanitizeInput = (str: string): string => {
    return str
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  // ---------------------------------------------------------
  // LOGIN HANDLERS
  // ---------------------------------------------------------
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    if (authMode === "supabase" && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password: passwordInput,
      });
      if (error) {
        setPinError(error.message);
      } else if (data.session) {
        loginAdmin(adminPin); // Authorize local session
        setPinError("");
      }
    } else {
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
    }
  };

  const handleResetPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = resetPinWithMasterKey(masterKeyInput, resetPinNewInput);
    if (success) {
      setForgotMsg(lang === "te" ? "పాస్‌కోడ్ విజయవంతంగా మార్చబడింది! ఆ రీసెట్ పాస్‌కోడ్‌తో లాగిన్ అవ్వండి." : "Passcode updated successfully! Please login with your new passcode.");
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotMsg("");
        setMasterKeyInput("");
        setResetPinNewInput("");
      }, 2000);
    } else {
      setForgotMsg(lang === "te" ? "తప్పు మాస్టర్ కీ! దయచేసి సరైన కీ నమోదు చేయండి." : "Invalid Master Key! Emergency override failed.");
    }
  };

  // ---------------------------------------------------------
  // MESSAGES HANDLER
  // ---------------------------------------------------------
  const handleDeleteMsg = async (id: string) => {
    await deleteContactMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    showTempNotice(lang === "te" ? "సందేశం తొలగించబడింది." : "Message deleted successfully.");
  };

  // ---------------------------------------------------------
  // NEWS CRUD
  // ---------------------------------------------------------
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews?.title || !editingNews?.title_telugu) return;

    const payload: NewsRecord = {
      id: editingNews.id,
      title: sanitizeInput(editingNews.title),
      title_telugu: sanitizeInput(editingNews.title_telugu),
      summary: sanitizeInput(editingNews.summary || ""),
      summary_telugu: sanitizeInput(editingNews.summary_telugu || ""),
      category: editingNews.category || "Press Release",
      category_telugu: editingNews.category_telugu || "పత్రికా ప్రకటన",
      date: editingNews.date || new Date().toISOString().split("T")[0],
      url: editingNews.url || "",
    };

    await saveNewsArticle(payload);
    setEditingNews(null);
    loadAllData();
    showTempNotice(lang === "te" ? "వార్త విజయవంతంగా సేవ్ చేయబడింది." : "News article saved successfully.");
  };

  const handleDeleteNews = async (id: string) => {
    await deleteNewsArticle(id);
    setNewsList((prev) => prev.filter((n) => n.id !== id));
    showTempNotice(lang === "te" ? "వార్త తొలగించబడింది." : "News article deleted.");
  };

  // ---------------------------------------------------------
  // MEDIA CRUD
  // ---------------------------------------------------------
  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedia?.title || !editingMedia?.youtube_id) return;

    const payload: MediaRecord = {
      id: editingMedia.id,
      title: sanitizeInput(editingMedia.title),
      title_telugu: sanitizeInput(editingMedia.title_telugu || editingMedia.title),
      youtube_id: sanitizeInput(editingMedia.youtube_id),
      category: editingMedia.category || "Assembly Speech",
      category_telugu: editingMedia.category_telugu || "అసెంబ్లీ ప్రసంగం",
      date: editingMedia.date || new Date().toISOString().split("T")[0],
      is_featured: editingMedia.is_featured || false,
    };

    await saveMediaVideo(payload);
    setEditingMedia(null);
    loadAllData();
    showTempNotice(lang === "te" ? "వీడియో విజయవంతంగా సేవ్ చేయబడింది." : "Media video saved successfully.");
  };

  const handleDeleteMedia = async (id: string) => {
    await deleteMediaVideo(id);
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    showTempNotice(lang === "te" ? "వీడియో తొలగించబడింది." : "Media video deleted.");
  };

  // ---------------------------------------------------------
  // GALLERY CRUD
  // ---------------------------------------------------------
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery?.title || !editingGallery?.src) return;

    const payload: GalleryRecord = {
      id: editingGallery.id,
      src: sanitizeInput(editingGallery.src),
      title: sanitizeInput(editingGallery.title),
      title_telugu: sanitizeInput(editingGallery.title_telugu || editingGallery.title),
      category: editingGallery.category || "Leadership",
      category_telugu: editingGallery.category_telugu || "నాయకత్వం",
      caption: editingGallery.caption || "",
      caption_telugu: editingGallery.caption_telugu || "",
      object_fit: editingGallery.object_fit || "cover",
      object_position: editingGallery.object_position || "center center",
    };

    await saveGalleryImage(payload);
    setEditingGallery(null);
    loadAllData();
    showTempNotice(lang === "te" ? "ఫోటో విజయవంతంగా జోడించబడింది." : "Gallery image saved successfully.");
  };

  const handleDeleteGallery = async (id: string) => {
    await deleteGalleryImage(id);
    setGalleryList((prev) => prev.filter((g) => g.id !== id));
    showTempNotice(lang === "te" ? "ఫోటో తొలగించబడింది." : "Gallery image deleted.");
  };

  // ---------------------------------------------------------
  // LOGIN SCREEN (UNAUTHENTICATED)
  // ---------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", background: "var(--warm-bg)" }}>
        <div style={{ maxWidth: "440px", width: "100%", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "20px", boxShadow: "var(--shadow-xl)", padding: "2.5rem 2rem", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", background: "var(--saffron-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--saffron)" }}>
            <Lock size={32} />
          </div>

          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--charcoal)", marginBottom: "0.5rem" }}>
            {lang === "te" ? "ఎమ్మెల్యే అడ్మిన్ పోర్టల్" : "MLA Admin Portal"}
          </h1>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
            {lang === "te" ? "పోర్టల్ నియంత్రణల కోసం మీ భద్రతా పిన్ నమోదు చేయండి." : "Enter your passcode to access portal controls & content manager."}
          </p>

          {/* Database Status Indicator */}
          <div style={{ marginBottom: "1.5rem", padding: "0.6rem 1rem", borderRadius: "10px", background: isSupabaseConfigured ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${isSupabaseConfigured ? "#10B981" : "#F59E0B"}`, fontSize: "0.8rem", color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <Database size={15} color={isSupabaseConfigured ? "#10B981" : "#F59E0B"} />
            <span>
              {isSupabaseConfigured
                ? "Supabase Live Database Connected"
                : "Local Storage Mode (Setup Supabase ENV for Global Sync)"}
            </span>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {authMode === "pin" ? (
              <div>
                <input
                  type="password"
                  placeholder={lang === "te" ? "పాస్‌కోడ్ నమోదు చేయండి" : "Enter Passcode"}
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  disabled={lockoutTimer > 0}
                  style={{ width: "100%", padding: "0.85rem 1rem", fontSize: "1.1rem", borderRadius: "12px", border: "1px solid var(--border)", textAlign: "center", letterSpacing: "0.2em" }}
                />
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Supabase Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ width: "100%", padding: "0.85rem 1rem", fontSize: "0.95rem", borderRadius: "12px", border: "1px solid var(--border)" }}
                />
                <input
                  type="password"
                  placeholder="Supabase Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ width: "100%", padding: "0.85rem 1rem", fontSize: "0.95rem", borderRadius: "12px", border: "1px solid var(--border)" }}
                />
              </>
            )}

            {pinError && (
              <p style={{ color: "#EF4444", fontSize: "0.82rem", fontWeight: 600 }}>{pinError}</p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <Unlock size={18} />
              {lang === "te" ? "అన్‌లాక్ చేయండి" : "Unlock Portal"}
            </button>
          </form>

          <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--saffron)" }}>
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              style={{ background: "none", border: "none", color: "var(--saffron)", cursor: "pointer", textDecoration: "underline", fontWeight: 600 }}
            >
              {lang === "te" ? "పాస్‌కోడ్ మరచిపోయారా?" : "Forgot Passcode?"}
            </button>
            {isSupabaseConfigured && (
              <button
                type="button"
                onClick={() => setAuthMode(authMode === "pin" ? "supabase" : "pin")}
                style={{ background: "none", border: "none", color: "var(--charcoal)", cursor: "pointer", fontWeight: 600 }}
              >
                {authMode === "pin" ? "Login with Supabase Email" : "Login with Passcode"}
              </button>
            )}
          </div>
        </div>

        {/* Forgot Passcode Modal */}
        {showForgotModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <div style={{ maxWidth: "400px", width: "100%", background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "var(--shadow-xl)" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                {lang === "te" ? "పాస్‌కోడ్ రీసెట్" : "Reset Passcode"}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1rem" }}>
                {lang === "te" ? "ఎమర్జెన్సీ మాస్టర్ కీ (97 లేదా alair) ఉపయోగించి మీ పాస్‌కోడ్ రీసెట్ చేయండి." : "Enter Emergency Master Key (97 / 9797 / alair / beerla2023) to reset passcode."}
              </p>
              <form onSubmit={handleResetPinSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <input
                  type="text"
                  placeholder="Master Key (e.g. 97)"
                  value={masterKeyInput}
                  onChange={(e) => setMasterKeyInput(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)" }}
                />
                <input
                  type="password"
                  placeholder="New Passcode (min 4 digits)"
                  value={resetPinNewInput}
                  onChange={(e) => setResetPinNewInput(e.target.value)}
                  style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)" }}
                />
                {forgotMsg && <p style={{ fontSize: "0.8rem", color: forgotMsg.includes("విజయవంతంగా") || forgotMsg.includes("successfully") ? "#10B981" : "#EF4444" }}>{forgotMsg}</p>}
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                    {lang === "te" ? "రీసెట్ చేయండి" : "Reset Passcode"}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={() => setShowForgotModal(false)}>
                    {lang === "te" ? "రద్దు" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------
  // MAIN AUTHENTICATED ADMIN DASHBOARD
  // ---------------------------------------------------------
  return (
    <div style={{ background: "var(--warm-bg)", minHeight: "90vh", padding: "2rem 0 5rem" }}>
      <div className="container-site">
        {/* Top Action Header */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--saffron)" }}>
              {lang === "te" ? "అధికారిక నిర్వాహక ప్యానెల్" : "Official Control Panel"}
            </span>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--charcoal)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sliders size={24} /> {lang === "te" ? "ఎమ్మెల్యే పోర్టల్ మేనేజర్" : "MLA Portal & Content Manager"}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Eye size={16} /> {lang === "te" ? "వెబ్‌సైట్ చూడండి" : "View Live Site"}
            </Link>
            <button onClick={logoutAdmin} className="btn" style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.2)" }}>
              <LogOut size={16} /> {lang === "te" ? "లాగ్ అవుట్" : "Log Out"}
            </button>
          </div>
        </div>

        {/* DB Connection Indicator */}
        <div style={{ marginBottom: "1.5rem", padding: "0.75rem 1.25rem", borderRadius: "12px", background: isSupabaseConfigured ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)", border: `1px solid ${isSupabaseConfigured ? "#10B981" : "#F59E0B"}`, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Database size={18} color={isSupabaseConfigured ? "#10B981" : "#F59E0B"} />
            <div>
              <strong>{isSupabaseConfigured ? "Supabase Cloud Database Active" : "Local Storage Mode Active"}</strong>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--muted)" }}>
                {isSupabaseConfigured
                  ? "All messages, news, media, and gallery updates sync globally."
                  : "All changes are saved locally. Connect NEXT_PUBLIC_SUPABASE_URL for global cloud sync."}
              </p>
            </div>
          </div>
          {actionNotice && <span style={{ padding: "0.3rem 0.75rem", background: "#10B981", color: "white", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>{actionNotice}</span>}
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
          <button onClick={() => setActiveTab("messages")} className={`btn ${activeTab === "messages" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <Inbox size={16} /> {lang === "te" ? "సందేశాలు" : "Messages"} ({messages.length})
          </button>
          <button onClick={() => setActiveTab("news")} className={`btn ${activeTab === "news" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <Newspaper size={16} /> {lang === "te" ? "వార్తలు" : "News & Press"}
          </button>
          <button onClick={() => setActiveTab("media")} className={`btn ${activeTab === "media" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <Video size={16} /> {lang === "te" ? "వీడియోలు" : "Media & Speeches"}
          </button>
          <button onClick={() => setActiveTab("gallery")} className={`btn ${activeTab === "gallery" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <ImageIcon size={16} /> {lang === "te" ? "గ్యాలరీ" : "Gallery Photos"}
          </button>
          <button onClick={() => setActiveTab("ticker")} className={`btn ${activeTab === "ticker" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <Megaphone size={16} /> {lang === "te" ? "ప్రకటనలు" : "Ticker Bar"}
          </button>
          <button onClick={() => setActiveTab("hero")} className={`btn ${activeTab === "hero" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <Layout size={16} /> {lang === "te" ? "హీరో బ్యానర్" : "Hero Banner"}
          </button>
          <button onClick={() => setActiveTab("security")} className={`btn ${activeTab === "security" ? "btn-primary" : "btn-outline"}`} style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}>
            <Key size={16} /> {lang === "te" ? "భద్రత" : "Security PIN"}
          </button>
        </div>

        {/* TAB 1: MESSAGES */}
        {activeTab === "messages" && (
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
              {lang === "te" ? "వచ్చిన ప్రజా అర్జీలు / సందేశాలు" : "Constituency Messages & Citizen Grievances"}
            </h3>
            {messages.length === 0 ? (
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                {lang === "te" ? "ఇంకా సందేశాలు రాలేదు." : "No citizen messages received yet."}
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {messages.map((m, idx) => (
                  <div key={m.id || idx} style={{ padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "#FAF6F0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                        <strong style={{ fontSize: "1rem", color: "var(--charcoal)" }}>{m.name}</strong>
                        <span style={{ fontSize: "0.75rem", background: "var(--saffron-light)", color: "var(--saffron-dark)", padding: "0.15rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
                          {m.mandal || "Constituency"}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: "0 0 0.5rem" }}>
                        📱 {m.phone} | ✉️ {m.email || "N/A"} | 🕒 {m.created_at ? new Date(m.created_at).toLocaleString() : "Recent"}
                      </p>
                      <p style={{ fontSize: "0.95rem", color: "var(--charcoal)", background: "white", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", margin: 0 }}>
                        {m.message}
                      </p>
                    </div>
                    <button onClick={() => handleDeleteMsg(m.id!)} className="btn btn-outline" style={{ color: "#EF4444", borderColor: "#EF4444", alignSelf: "flex-start" }}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEWS ARTICLES */}
        {activeTab === "news" && (
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>News & Press Release Manager</h3>
              <button onClick={() => setEditingNews({ date: new Date().toISOString().split("T")[0] })} className="btn btn-primary">
                <Plus size={16} /> Add News Article
              </button>
            </div>

            {/* Editing Form */}
            {editingNews && (
              <form onSubmit={handleSaveNews} style={{ background: "#FAF6F0", padding: "1.25rem", borderRadius: "12px", marginBottom: "1.5rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <h4 style={{ margin: 0 }}>{editingNews.id ? "Edit Article" : "New Article"}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <input type="text" placeholder="Title (English)" value={editingNews.title || ""} onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                  <input type="text" placeholder="Title (Telugu)" value={editingNews.title_telugu || ""} onChange={(e) => setEditingNews({ ...editingNews, title_telugu: e.target.value })} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <textarea placeholder="Summary (English)" rows={2} value={editingNews.summary || ""} onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })} style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                  <textarea placeholder="Summary (Telugu)" rows={2} value={editingNews.summary_telugu || ""} onChange={(e) => setEditingNews({ ...editingNews, summary_telugu: e.target.value })} style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" className="btn btn-primary"><Check size={16} /> Save Article</button>
                  <button type="button" onClick={() => setEditingNews(null)} className="btn btn-outline">Cancel</button>
                </div>
              </form>
            )}

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {newsList.map((n) => (
                <div key={n.id} style={{ padding: "1rem", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 0.25rem", color: "var(--charcoal)" }}>{n.title}</h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>{n.title_telugu}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditingNews(n)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem" }}><Pencil size={14} /></button>
                    <button onClick={() => handleDeleteNews(n.id!)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", color: "#EF4444", borderColor: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MEDIA VIDEOS */}
        {activeTab === "media" && (
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Media & Speeches Manager</h3>
              <button onClick={() => setEditingMedia({ date: new Date().toISOString().split("T")[0] })} className="btn btn-primary">
                <Plus size={16} /> Add Video
              </button>
            </div>

            {editingMedia && (
              <form onSubmit={handleSaveMedia} style={{ background: "#FAF6F0", padding: "1.25rem", borderRadius: "12px", marginBottom: "1.5rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <h4 style={{ margin: 0 }}>{editingMedia.id ? "Edit Video" : "New Video"}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <input type="text" placeholder="Video Title (English)" value={editingMedia.title || ""} onChange={(e) => setEditingMedia({ ...editingMedia, title: e.target.value })} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                  <input type="text" placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" value={editingMedia.youtube_id || ""} onChange={(e) => setEditingMedia({ ...editingMedia, youtube_id: e.target.value })} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" className="btn btn-primary"><Check size={16} /> Save Video</button>
                  <button type="button" onClick={() => setEditingMedia(null)} className="btn btn-outline">Cancel</button>
                </div>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {mediaList.map((m) => (
                <div key={m.id} style={{ padding: "1rem", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 0.25rem", color: "var(--charcoal)" }}>{m.title}</h4>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)" }}>YouTube ID: {m.youtube_id}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditingMedia(m)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem" }}><Pencil size={14} /></button>
                    <button onClick={() => handleDeleteMedia(m.id!)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", color: "#EF4444", borderColor: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY PHOTOS */}
        {activeTab === "gallery" && (
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Gallery & Photo Manager</h3>
              <button onClick={() => setEditingGallery({ object_fit: "cover", object_position: "center center" })} className="btn btn-primary">
                <Plus size={16} /> Add Photo
              </button>
            </div>

            {editingGallery && (
              <form onSubmit={handleSaveGallery} style={{ background: "#FAF6F0", padding: "1.25rem", borderRadius: "12px", marginBottom: "1.5rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <h4 style={{ margin: 0 }}>{editingGallery.id ? "Edit Photo" : "New Photo"}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <input type="text" placeholder="Title (English)" value={editingGallery.title || ""} onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                  <input type="text" placeholder="Image URL / Path (e.g. /images/hero-bg.jpg)" value={editingGallery.src || ""} onChange={(e) => setEditingGallery({ ...editingGallery, src: e.target.value })} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" className="btn btn-primary"><Check size={16} /> Save Photo</button>
                  <button type="button" onClick={() => setEditingGallery(null)} className="btn btn-outline">Cancel</button>
                </div>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {galleryList.map((g) => (
                <div key={g.id} style={{ padding: "1rem", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 0.25rem", color: "var(--charcoal)" }}>{g.title}</h4>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--muted)" }}>Path: {g.src}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditingGallery(g)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem" }}><Pencil size={14} /></button>
                    <button onClick={() => handleDeleteGallery(g.id!)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", color: "#EF4444", borderColor: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TICKER */}
        {activeTab === "ticker" && (
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>
                {lang === "te" ? "వార్తల టిక్కర్ నిర్వహణ" : "Announcement Ticker Items"}
              </h3>
              <button
                onClick={() => setEditingNews({ date: "new_ticker" })}
                className="btn btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <Plus size={16} /> {lang === "te" ? "కొత్త టిక్కర్ చేర్చండి" : "Add Ticker Item"}
              </button>
            </div>

            {/* Inline Add Ticker Form */}
            {editingNews?.date === "new_ticker" && (
              <form onSubmit={(e) => {
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
                setEditingNews(null);
                showTempNotice(lang === "te" ? "టిక్కర్ విజయవంతంగా జోడించబడింది." : "Ticker announcement added successfully.");
              }} style={{ background: "#FAF6F0", padding: "1.25rem", borderRadius: "12px", marginBottom: "1.5rem", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <h4 style={{ margin: 0 }}>{lang === "te" ? "కొత్త టిక్కర్ వార్త" : "New Ticker Announcement"}</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                  <input type="text" placeholder="Announcement Text (English)" value={newTickerEn} onChange={(e) => setNewTickerEn(e.target.value)} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                  <input type="text" placeholder="Announcement Text (Telugu)" value={newTickerTe} onChange={(e) => setNewTickerTe(e.target.value)} required style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                </div>
                <input type="text" placeholder="Optional Target Link (e.g. /news or /election-2023)" value={newTickerLink} onChange={(e) => setNewTickerLink(e.target.value)} style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid var(--border)" }} />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="submit" className="btn btn-primary"><Plus size={16} /> Add Ticker</button>
                  <button type="button" onClick={() => setEditingNews(null)} className="btn btn-outline">Cancel</button>
                </div>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {tickerItems.map((item) => (
                <div key={item.id} style={{ padding: "1rem", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "var(--charcoal)" }}>{item.textEn}</strong>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--muted)" }}>{item.textTe}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => toggleTickerItem(item.id)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem" }}>
                      {item.active ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => deleteTickerItem(item.id)} className="btn btn-outline" style={{ padding: "0.4rem 0.75rem", color: "#EF4444", borderColor: "#EF4444" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY */}
        {activeTab === "security" && (
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)", maxWidth: "500px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>
              {lang === "te" ? "భద్రతా పాస్‌కోడ్ మార్చండి" : "Update Admin Passcode"}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (newPinInput.length >= 4) {
                setAdminPin(newPinInput);
                setPinSuccessMsg("Passcode updated successfully!");
                setNewPinInput("");
              }
            }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="password" placeholder="New Passcode (min 4 digits)" value={newPinInput} onChange={(e) => setNewPinInput(e.target.value)} required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)" }} />
              {pinSuccessMsg && <p style={{ color: "#10B981", fontSize: "0.85rem", margin: 0 }}>{pinSuccessMsg}</p>}
              <button type="submit" className="btn btn-primary"><Key size={16} /> Save New Passcode</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
