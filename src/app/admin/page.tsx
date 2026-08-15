"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sliders,
  Megaphone,
  Layout,
  Key,
  Trash2,
  Eye,
  LogOut,
  RefreshCw,
  Mail,
  Inbox,
  Newspaper,
  Video,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  UploadCloud,
  Lock,
  Plus,
  X,
  Check,
  Briefcase,
  CheckCircle2,
  CircleDot,
  Loader2,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import {
  fetchContactMessages,
  deleteContactMessage,
  toggleMessageReadStatus,
  fetchNewsArticles,
  saveNewsArticle,
  deleteNewsArticle,
  fetchMediaVideos,
  saveMediaVideo,
  deleteMediaVideo,
  fetchGalleryImages,
  saveGalleryImage,
  deleteGalleryImage,
  reorderGalleryImages,
  fetchHeroImages,
  saveHeroImage,
  deleteHeroImage,
  reorderHeroImages,
  fetchPublicServices,
  savePublicService,
  deletePublicService,
  fetchGalleryCategories,
  saveGalleryCategory,
  DEFAULT_GALLERY_CATEGORIES,
  GalleryCategoryRecord,
  extractYouTubeId,
  getYouTubeThumbnail,
  supabaseAdminLogin,
  supabaseAdminLogout,
  getSupabaseAdminUser,
  MessageRecord,
  NewsRecord,
  MediaRecord,
  GalleryRecord,
  HeroImageRecord,
  PublicServiceRecord,
  isSupabaseConfigured,
} from "@/lib/supabase";

type Tab =
  | "messages"
  | "public-service"
  | "media"
  | "gallery"
  | "news"
  | "hero"
  | "ticker"
  | "security";

// ---------------------------------------------------------------------------
// HELPER STYLES
// ---------------------------------------------------------------------------
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.875rem",
  borderRadius: "8px",
  border: "1.5px solid #E2E8F0",
  fontSize: "0.9rem",
  color: "#1E293B",
  background: "#FFFFFF",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "80px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "#64748B",
  marginBottom: "0.35rem",
};

const sectionCard: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "14px",
  border: "1px solid #E2E8F0",
  padding: "1.5rem",
};

const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.6rem 1.2rem",
  borderRadius: "8px",
  background: "var(--saffron, #EE5A1C)",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.85rem",
  border: "none",
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.55rem 1rem",
  borderRadius: "8px",
  background: "transparent",
  color: "#475569",
  fontWeight: 600,
  fontSize: "0.85rem",
  border: "1px solid #E2E8F0",
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  padding: "0.35rem 0.65rem",
  borderRadius: "6px",
  background: "#FEE2E2",
  color: "#DC2626",
  fontWeight: 700,
  fontSize: "0.75rem",
  border: "none",
  cursor: "pointer",
};

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div style={{ textAlign: "center", padding: "3.5rem 1rem", color: "#94A3B8" }}>
      <div style={{ marginBottom: "0.75rem", opacity: 0.5 }}>{icon}</div>
      <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: 0 }}>{message}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function AdminPage() {
  const {
    tickerItems,
    addTickerItem,
    updateTickerItem,
    toggleTickerItem,
    deleteTickerItem,
    isAdminAuthenticated,
    logoutAdmin,
  } = useSiteConfig();

  // Tab State
  const [activeTab, setActiveTab] = useState<Tab>("messages");

  // Supabase Auth Login State
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Data Collections
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [newsList, setNewsList] = useState<NewsRecord[]>([]);
  const [mediaList, setMediaList] = useState<MediaRecord[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryRecord[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroImageRecord[]>([]);
  const [publicServices, setPublicServices] = useState<PublicServiceRecord[]>([]);
  const [categories, setCategories] = useState<GalleryCategoryRecord[]>(DEFAULT_GALLERY_CATEGORIES);
  const [loading, setLoading] = useState(false);

  // Upload Processing States
  const [isProcessingGallery, setIsProcessingGallery] = useState(false);
  const [isProcessingHero, setIsProcessingHero] = useState(false);

  // Form Display & Edit States
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showPsForm, setShowPsForm] = useState(false);

  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingPsId, setEditingPsId] = useState<string | null>(null);

  // Custom Category Add State
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatEn, setNewCatEn] = useState("");
  const [newCatTe, setNewCatTe] = useState("");

  // ---- News form ----
  const emptyNews = (): NewsRecord => ({
    title: "",
    title_telugu: "",
    summary: "",
    summary_telugu: "",
    category: "Press Release",
    category_telugu: "పత్రికా ప్రకటన",
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    source: "MLA Public Office",
    url: "",
  });
  const [newsForm, setNewsForm] = useState<NewsRecord>(emptyNews());

  // ---- Media form ----
  const emptyMedia = (): MediaRecord => ({
    title: "",
    title_telugu: "",
    youtube_id: "",
    category: "Assembly Speech",
    category_telugu: "అసెంబ్లీ ప్రసంగం",
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    channel: "Official MLA Channel",
    channel_telugu: "అధికారిక ఛానల్",
    thumbnail_url: "",
    is_featured: false,
  });
  const [mediaForm, setMediaForm] = useState<MediaRecord>(emptyMedia());

  // ---- Gallery form ----
  const emptyGallery = (): GalleryRecord => ({
    src: "",
    title: "",
    title_telugu: "",
    category: "Leadership",
    category_telugu: "నాయకత్వం",
    caption: "",
    caption_telugu: "",
    display_order: 0,
  });
  const [galleryForm, setGalleryForm] = useState<GalleryRecord>(emptyGallery());

  // ---- Public Service form ----
  const emptyPs = (): PublicServiceRecord => ({
    category: "Education & Youth",
    category_telugu: "విద్య & యువజన సంక్షేమం",
    title: "",
    title_telugu: "",
    description: "",
    description_telugu: "",
    nature: "Constituency Work",
    nature_telugu: "నియోజకవర్గ పని",
  });
  const [psForm, setPsForm] = useState<PublicServiceRecord>(emptyPs());

  // ---- Ticker ----
  const [newTickerEn, setNewTickerEn] = useState("");
  const [newTickerTe, setNewTickerTe] = useState("");
  const [editingTickerId, setEditingTickerId] = useState<string | null>(null);

  const handleSaveTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerEn.trim()) return;
    if (editingTickerId) {
      updateTickerItem(editingTickerId, { textEn: newTickerEn, textTe: newTickerTe });
      setEditingTickerId(null);
    } else {
      addTickerItem({ textEn: newTickerEn, textTe: newTickerTe, active: true });
    }
    setNewTickerEn("");
    setNewTickerTe("");
  };

  const handleEditTicker = (item: { id: string; textEn: string; textTe: string }) => {
    setEditingTickerId(item.id);
    setNewTickerEn(item.textEn);
    setNewTickerTe(item.textTe);
  };

  // ---- File upload refs ----
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const mediaThumbFileInputRef = useRef<HTMLInputElement>(null);

  // ---- Check active session ----
  useEffect(() => {
    async function checkUser() {
      const user = await getSupabaseAdminUser();
      if (user) setCurrentUserEmail(user.email || null);
    }
    checkUser();
  }, [isAdminAuthenticated]);

  // ---- Load data after login ----
  useEffect(() => {
    if (isAdminAuthenticated) loadAll();
  }, [isAdminAuthenticated]);

  async function loadAll() {
    setLoading(true);
    try {
      const [msgs, news, media, gallery, heroes, ps, cats] = await Promise.all([
        fetchContactMessages(),
        fetchNewsArticles(),
        fetchMediaVideos(),
        fetchGalleryImages(),
        fetchHeroImages(),
        fetchPublicServices(),
        fetchGalleryCategories(),
      ]);
      setMessages(msgs);
      setNewsList(news);
      setMediaList(media);
      setGalleryList(gallery);
      setHeroSlides(heroes);
      setPublicServices(ps);
      if (cats && cats.length > 0) setCategories(cats);
    } finally {
      setLoading(false);
    }
  }

  // ---- Supabase User Login Handler ----
  const handleAuthLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) return;
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await supabaseAdminLogin(authEmail, authPassword);
      if (res.success) {
        setCurrentUserEmail(res.user?.email || authEmail);
        window.location.reload();
      } else {
        setAuthError(res.error || "Authentication failed. Check your credentials.");
      }
    } catch (err: any) {
      setAuthError(err?.message || "An unexpected error occurred during login.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabaseAdminLogout();
    logoutAdmin();
    window.location.reload();
  };

  // ---- Message Handlers ----
  const handleToggleRead = async (id?: string, currentRead?: boolean) => {
    if (!id) return;
    const nextState = !currentRead;
    await toggleMessageReadStatus(id, nextState);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: nextState } : m))
    );
  };

  const handleDeleteMessage = async (id?: string) => {
    if (!id) return;
    await deleteContactMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // ---- News handlers ----
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) return;
    const payload = editingNewsId ? { ...newsForm, id: editingNewsId } : newsForm;
    const saved = await saveNewsArticle(payload);
    setNewsList((prev) => {
      const filtered = prev.filter((n) => n.id !== saved.id);
      return [saved, ...filtered];
    });
    setShowNewsForm(false);
    setEditingNewsId(null);
    setNewsForm(emptyNews());
  };

  const handleEditNews = (item: NewsRecord) => {
    setNewsForm(item);
    setEditingNewsId(item.id || null);
    setShowNewsForm(true);
  };

  const handleDeleteNews = async (id?: string) => {
    if (!id) return;
    await deleteNewsArticle(id);
    setNewsList((prev) => prev.filter((n) => n.id !== id));
  };

  // ---- Media handlers ----
  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.title.trim() || !mediaForm.youtube_id.trim()) return;
    const cleanId = extractYouTubeId(mediaForm.youtube_id.trim());
    const payload = {
      ...(editingMediaId ? { ...mediaForm, id: editingMediaId } : mediaForm),
      youtube_id: cleanId,
    };
    const saved = await saveMediaVideo(payload);
    setMediaList((prev) => {
      const filtered = prev.filter((v) => v.id !== saved.id);
      return [saved, ...filtered];
    });
    setShowMediaForm(false);
    setEditingMediaId(null);
    setMediaForm(emptyMedia());
  };

  const handleEditMedia = (item: MediaRecord) => {
    setMediaForm(item);
    setEditingMediaId(item.id || null);
    setShowMediaForm(true);
  };

  const handleDeleteMedia = async (id?: string) => {
    if (!id) return;
    await deleteMediaVideo(id);
    setMediaList((prev) => prev.filter((v) => v.id !== id));
  };

  // ---- Public Service handlers ----
  const handleSavePs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!psForm.title.trim()) return;
    const payload = editingPsId ? { ...psForm, id: editingPsId } : psForm;
    const saved = await savePublicService(payload);
    setPublicServices((prev) => {
      const filtered = prev.filter((p) => p.id !== saved.id);
      return [saved, ...filtered];
    });
    setShowPsForm(false);
    setEditingPsId(null);
    setPsForm(emptyPs());
  };

  const handleEditPs = (item: PublicServiceRecord) => {
    setPsForm(item);
    setEditingPsId(item.id || null);
    setShowPsForm(true);
  };

  const handleDeletePs = async (id?: string) => {
    if (!id) return;
    await deletePublicService(id);
    setPublicServices((prev) => prev.filter((p) => p.id !== id));
  };

  // ---- Category Dropdown Sync Handler ----
  const handleCategorySelect = (selectedEn: string) => {
    if (selectedEn === "__new__") {
      setIsAddingNewCat(true);
      return;
    }
    setIsAddingNewCat(false);
    const found = categories.find((c) => c.en === selectedEn);
    if (found) {
      setGalleryForm({
        ...galleryForm,
        category: found.en,
        category_telugu: found.te,
      });
    } else {
      setGalleryForm({
        ...galleryForm,
        category: selectedEn,
      });
    }
  };

  const handleSaveNewCustomCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatEn.trim() || !newCatTe.trim()) return;
    const saved = await saveGalleryCategory(newCatEn, newCatTe);
    setCategories((prev) => [...prev.filter((c) => c.en !== saved.en), saved]);
    setGalleryForm({
      ...galleryForm,
      category: saved.en,
      category_telugu: saved.te,
    });
    setIsAddingNewCat(false);
    setNewCatEn("");
    setNewCatTe("");
  };

  // ---- Gallery File & Form Handlers ----
  const handleSelectGalleryImageFile = (file: File) => {
    setIsProcessingGallery(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const src = ev.target?.result as string;
        if (src) {
          setGalleryForm((prev) => ({
            ...prev,
            src,
            title: prev.title || file.name.replace(/\.[^.]+$/, ""),
            title_telugu: prev.title_telugu || "నియోజకవర్గ ఫోటో",
          }));
        }
      } finally {
        setIsProcessingGallery(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.src) {
      alert("Please select or drop a photo file into the upload box.");
      return;
    }
    setIsProcessingGallery(true);

    try {
      const img: GalleryRecord = {
        ...(editingGalleryId ? { ...galleryForm, id: editingGalleryId } : galleryForm),
        title: galleryForm.title.trim() || "Constituency Photo",
        title_telugu: galleryForm.title_telugu?.trim() || "నియోజకవర్గ ఫోటో",
        category: galleryForm.category || "Leadership",
        category_telugu: galleryForm.category_telugu || "నాయకత్వం",
        display_order: galleryForm.display_order || galleryList.length + 1,
      };

      const saved = await saveGalleryImage(img);
      setGalleryList((prev) => {
        const filtered = prev.filter((g) => g.id !== saved.id);
        return [...filtered, saved].sort(
          (a, b) => (a.display_order || 0) - (b.display_order || 0)
        );
      });

      setShowGalleryForm(false);
      setEditingGalleryId(null);
      setGalleryForm(emptyGallery());
      setIsAddingNewCat(false);
    } finally {
      setIsProcessingGallery(false);
    }
  };

  // ---- Hero slide upload ----
  const handleHeroFile = (file: File) => {
    setIsProcessingHero(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const src = e.target?.result as string;
        if (!src) return;
        const slide: HeroImageRecord = {
          src,
          title: file.name.replace(/\.[^.]+$/, ""),
          display_order: heroSlides.length + 1,
        };
        const saved = await saveHeroImage(slide);
        setHeroSlides((prev) => [...prev, saved]);
      } finally {
        setIsProcessingHero(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // ---- Reorder handlers ----
  const moveGallery = async (idx: number, dir: "up" | "down") => {
    const next = dir === "up" ? idx - 1 : idx + 1;
    if (next < 0 || next >= galleryList.length) return;
    const updated = [...galleryList];
    [updated[idx], updated[next]] = [updated[next], updated[idx]];
    const reordered = updated.map((g, i) => ({ ...g, display_order: i + 1 }));
    setGalleryList(reordered);
    await reorderGalleryImages(reordered);
  };

  const moveHero = async (idx: number, dir: "up" | "down") => {
    const next = dir === "up" ? idx - 1 : idx + 1;
    if (next < 0 || next >= heroSlides.length) return;
    const updated = [...heroSlides];
    [updated[idx], updated[next]] = [updated[next], updated[idx]];
    const reordered = updated.map((h, i) => ({ ...h, display_order: i + 1 }));
    setHeroSlides(reordered);
    await reorderHeroImages(reordered);
  };

  const handleDeleteGallery = async (id?: string) => {
    if (!id) return;
    await deleteGalleryImage(id);
    setGalleryList((prev) => prev.filter((g) => g.id !== id));
  };

  const handleDeleteHero = async (id?: string) => {
    if (!id) return;
    await deleteHeroImage(id);
    setHeroSlides((prev) => prev.filter((h) => h.id !== id));
  };

  // =========================================================================
  // SUPABASE USER & PASSWORD LOGIN SCREEN
  // =========================================================================
  if (!isAdminAuthenticated) {
    return (
      <div style={{ minHeight: "88vh", background: "var(--warm-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem" }}>
        <div style={{ background: "#fff", borderRadius: "20px", padding: "2.5rem 2.25rem", maxWidth: "430px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
          
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(238,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <Lock size={28} color="var(--saffron, #EE5A1C)" />
            </div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0F172A", margin: "0 0 0.35rem" }}>Admin Portal Login</h1>
            <p style={{ fontSize: "0.85rem", color: "#64748B", margin: 0 }}>
              Sign in with your Supabase User ID / Email and Password
            </p>
          </div>

          <form onSubmit={handleAuthLogin}>
            <div style={{ marginBottom: "1.1rem" }}>
              <label style={labelStyle}>User Email / ID *</label>
              <input
                type="text"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>Password *</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {authError && (
              <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: "8px", padding: "0.65rem 0.85rem", color: "#DC2626", fontSize: "0.8rem", marginBottom: "1.25rem", lineHeight: 1.4 }}>
                {authError}
              </div>
            )}

            <button type="submit" disabled={authLoading} style={{ ...btnPrimary, width: "100%", justifyContent: "center", padding: "0.8rem" }}>
              {authLoading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <ShieldCheck size={16} />}
              {authLoading ? "Authenticating..." : "Sign In to Admin Portal"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
              Supabase Auth Enabled
            </span>
            <Link href="/" style={{ fontSize: "0.8rem", color: "#64748B", textDecoration: "none", fontWeight: 600 }}>
              ← Return to website
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Calculate unread messages count
  const unreadMessagesCount = messages.filter((m) => !m.is_read).length;

  // =========================================================================
  // TABS CONFIG
  // 1. Messages
  // 2. Public Service
  // 3. Media & Speeches
  // 4. Gallery Photos
  // 5. News & Press
  // 6. Hero Banner
  // 7. Ticker Bar
  // 8. Security PIN / Auth
  // =========================================================================
  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "messages", label: "Messages", icon: <Mail size={15} />, count: unreadMessagesCount },
    { id: "public-service", label: "Public Service", icon: <Briefcase size={15} /> },
    { id: "media", label: "Media & Speeches", icon: <Video size={15} /> },
    { id: "gallery", label: "Gallery Photos", icon: <ImageIcon size={15} /> },
    { id: "news", label: "News & Press", icon: <Newspaper size={15} /> },
    { id: "hero", label: "Hero Banner", icon: <Layout size={15} /> },
    { id: "ticker", label: "Ticker Bar", icon: <Megaphone size={15} /> },
    { id: "security", label: "Admin Auth & Security", icon: <Key size={15} /> },
  ];

  // =========================================================================
  // AUTHENTICATED DASHBOARD
  // =========================================================================
  return (
    <div style={{ background: "var(--warm-bg)", minHeight: "100vh", paddingBottom: "5rem" }}>

      {/* ── Top Header ── */}
      <header style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "1rem 0" }}>
        <div className="container-site" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--saffron, #EE5A1C)", margin: "0 0 0.15rem" }}>Official Control Panel</p>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#0F172A", display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <Sliders size={18} color="var(--saffron, #EE5A1C)" /> MLA Portal & Content Manager
            </h1>
          </div>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {currentUserEmail && (
              <span style={{ fontSize: "0.75rem", background: "#F1F5F9", color: "#475569", padding: "0.4rem 0.75rem", borderRadius: "8px", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <User size={13} color="var(--saffron, #EE5A1C)" /> {currentUserEmail}
              </span>
            )}
            <Link href="/" target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.45rem 0.9rem", borderRadius: "8px", background: "#F1F5F9", color: "#475569", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600 }}>
              <Eye size={13} /> View Live Site
            </Link>
            <button onClick={handleLogout} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.45rem 0.9rem", borderRadius: "8px", background: "#EF4444", color: "#fff", border: "none", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
              <LogOut size={13} /> Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="container-site" style={{ marginTop: "1.25rem" }}>

        {/* ── Supabase Status ── */}
        <div style={{ padding: "0.75rem 1.1rem", borderRadius: "10px", background: isSupabaseConfigured ? "rgba(16,185,129,0.07)" : "rgba(245,158,11,0.07)", border: `1px solid ${isSupabaseConfigured ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: isSupabaseConfigured ? "#10B981" : "#F59E0B" }} />
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: isSupabaseConfigured ? "#065F46" : "#92400E" }}>
              {isSupabaseConfigured
                ? "Supabase Cloud Database Active — Global sync & authenticated user management enabled."
                : "Local mode active. Configure Supabase for cloud sync."}
            </span>
          </div>
          <button onClick={loadAll} style={{ background: "none", border: "none", color: "var(--saffron, #EE5A1C)", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* ── Tab Nav ── */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.55rem 1rem",
                  borderRadius: "8px",
                  background: active ? "var(--saffron, #EE5A1C)" : "#fff",
                  color: active ? "#fff" : "#475569",
                  fontWeight: 700, fontSize: "0.82rem",
                  border: active ? "none" : "1px solid #E2E8F0",
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span style={{ background: active ? "rgba(255,255,255,0.25)" : "#EEF2FF", color: active ? "#fff" : "#4F46E5", borderRadius: "100px", padding: "0 0.45rem", fontSize: "0.7rem", fontWeight: 800 }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================================================================
            1. MESSAGES TAB
            ================================================================ */}
        {activeTab === "messages" && (
          <div style={sectionCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0F172A" }}>
                  Constituency Messages & Citizen Grievances
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                  Showing latest submissions on top. Mark items as read to track resolutions.
                </p>
              </div>
            </div>

            {messages.length === 0 ? (
              <EmptyState icon={<Inbox size={40} />} message="No citizen messages received yet." />
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {messages.map((msg) => {
                  const isRead = msg.is_read || false;
                  return (
                    <div
                      key={msg.id || `${msg.created_at}_${msg.phone}`}
                      style={{
                        background: isRead ? "#F8FAFC" : "#FFFFFF",
                        borderRadius: "12px",
                        padding: "1.2rem",
                        border: isRead ? "1px solid #E2E8F0" : "1.5px solid var(--saffron, #EE5A1C)",
                        boxShadow: isRead ? "none" : "0 4px 14px rgba(238,90,28,0.06)",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                          <strong style={{ fontSize: "1rem", color: "#0F172A" }}>{msg.name}</strong>
                          <span style={{ fontSize: "0.72rem", background: "#FFF7ED", color: "#C2410C", padding: "0.15rem 0.55rem", borderRadius: "100px", fontWeight: 700 }}>
                            {msg.mandal || "Alair Constituency"}
                          </span>
                          {!isRead && (
                            <span style={{ fontSize: "0.68rem", background: "var(--saffron, #EE5A1C)", color: "#fff", padding: "0.1rem 0.45rem", borderRadius: "100px", fontWeight: 800, textTransform: "uppercase" }}>
                              NEW
                            </span>
                          )}
                        </div>

                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <button
                            onClick={() => handleToggleRead(msg.id, isRead)}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "6px",
                              background: isRead ? "#F1F5F9" : "#ECFDF5",
                              color: isRead ? "#64748B" : "#059669",
                              border: "1px solid",
                              borderColor: isRead ? "#CBD5E1" : "#A7F3D0",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            {isRead ? <CircleDot size={13} /> : <CheckCircle2 size={13} />}
                            {isRead ? "Mark Unread" : "Mark as Read"}
                          </button>
                          <button onClick={() => handleDeleteMessage(msg.id)} style={btnDanger} title="Delete message">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div style={{ fontSize: "0.8rem", color: "#64748B", display: "flex", gap: "1.2rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                        <span>📞 {msg.phone}</span>
                        {msg.email && <span>✉️ {msg.email}</span>}
                        {msg.subject && <span>📌 {msg.subject}</span>}
                        <span>🕐 {msg.created_at ? new Date(msg.created_at).toLocaleString() : "Recent"}</span>
                      </div>

                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#1E293B", lineHeight: 1.6, background: isRead ? "#FFFFFF" : "#F8FAFC", padding: "0.85rem", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                        {msg.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            2. PUBLIC SERVICE TAB
            ================================================================ */}
        {activeTab === "public-service" && (
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div style={sectionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0F172A" }}>
                    Public Service & Development Initiatives
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                    Manage constituency welfare programs, development activities, and education support.
                  </p>
                </div>
                <button onClick={() => { setPsForm(emptyPs()); setEditingPsId(null); setShowPsForm(true); }} style={btnPrimary}>
                  <Plus size={14} /> Add Initiative
                </button>
              </div>

              {showPsForm && (
                <form onSubmit={handleSavePs} style={{ background: "#F8FAFC", borderRadius: "10px", padding: "1.25rem", border: "1px solid #E2E8F0", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                      {editingPsId ? "Edit Initiative" : "New Public Service Initiative"}
                    </h3>
                    <button type="button" onClick={() => setShowPsForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={16} /></button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Title (English) *</label>
                      <input required value={psForm.title} onChange={(e) => setPsForm({ ...psForm, title: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Title (Telugu)</label>
                      <input value={psForm.title_telugu} onChange={(e) => setPsForm({ ...psForm, title_telugu: e.target.value })} style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Description (English) *</label>
                      <textarea required value={psForm.description} onChange={(e) => setPsForm({ ...psForm, description: e.target.value })} style={textareaStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Description (Telugu)</label>
                      <textarea value={psForm.description_telugu} onChange={(e) => setPsForm({ ...psForm, description_telugu: e.target.value })} style={{ ...textareaStyle, fontFamily: "var(--font-telugu, serif)" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <input value={psForm.category} onChange={(e) => setPsForm({ ...psForm, category: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Nature of Work</label>
                      <input value={psForm.nature || ""} onChange={(e) => setPsForm({ ...psForm, nature: e.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" style={btnPrimary}><Check size={14} /> Save Initiative</button>
                    <button type="button" onClick={() => setShowPsForm(false)} style={btnGhost}>Cancel</button>
                  </div>
                </form>
              )}

              {publicServices.length === 0 ? (
                <EmptyState icon={<Briefcase size={40} />} message="No custom public service initiatives added yet. The site is currently showing standard constituency programs." />
              ) : (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {publicServices.map((ps) => (
                    <div key={ps.id} style={{ background: "#F8FAFC", borderRadius: "10px", padding: "1rem", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                          <span style={{ fontSize: "0.7rem", background: "#EEF2FF", color: "#4F46E5", padding: "0.15rem 0.5rem", borderRadius: "100px", fontWeight: 700 }}>{ps.category}</span>
                          {ps.nature && <span style={{ fontSize: "0.7rem", background: "#ECFDF5", color: "#059669", padding: "0.15rem 0.5rem", borderRadius: "100px", fontWeight: 700 }}>{ps.nature}</span>}
                        </div>
                        <h4 style={{ margin: "0 0 0.2rem", fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>{ps.title}</h4>
                        {ps.title_telugu && <p style={{ margin: "0 0 0.35rem", fontSize: "0.85rem", color: "#64748B", fontFamily: "var(--font-telugu, serif)" }}>{ps.title_telugu}</p>}
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>{ps.description}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                        <button onClick={() => handleEditPs(ps)} style={btnGhost}>Edit</button>
                        <button onClick={() => handleDeletePs(ps.id)} style={btnDanger}><Trash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================
            3. MEDIA & SPEECHES TAB
            ================================================================ */}
        {activeTab === "media" && (
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div style={sectionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0F172A" }}>
                    Media & Speeches Manager
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                    Paste full YouTube links — thumbnails are generated automatically from YouTube CDN.
                  </p>
                </div>
                <button onClick={() => { setMediaForm(emptyMedia()); setEditingMediaId(null); setShowMediaForm(true); }} style={btnPrimary}>
                  <Plus size={14} /> Add Video
                </button>
              </div>

              {showMediaForm && (
                <form onSubmit={handleSaveMedia} style={{ background: "#F8FAFC", borderRadius: "10px", padding: "1.25rem", border: "1px solid #E2E8F0", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                      {editingMediaId ? "Edit Video" : "New Video"}
                    </h3>
                    <button type="button" onClick={() => setShowMediaForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={16} /></button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Video Title (English) *</label>
                      <input required value={mediaForm.title} onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Video Title (Telugu)</label>
                      <input value={mediaForm.title_telugu} onChange={(e) => setMediaForm({ ...mediaForm, title_telugu: e.target.value })} style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={labelStyle}>YouTube URL or Video ID *</label>
                    <input
                      required
                      value={mediaForm.youtube_id}
                      onChange={(e) => setMediaForm({ ...mediaForm, youtube_id: e.target.value })}
                      style={inputStyle}
                    />
                    <p style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: "0.3rem" }}>
                      Paste full YouTube URL (e.g. <code>https://youtube.com/watch?v=...</code>) or 11-char ID. Thumbnail will be auto-generated.
                    </p>
                  </div>

                  {/* Clean Drop Zone for Custom Thumbnail */}
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={labelStyle}>Optional Custom Thumbnail (Click / Drop Image)</label>
                    <input
                      ref={mediaThumbFileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const r = new FileReader();
                          r.onload = (ev) => setMediaForm({ ...mediaForm, thumbnail_url: ev.target?.result as string });
                          r.readAsDataURL(file);
                        }
                      }}
                    />
                    <div
                      onClick={() => mediaThumbFileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type.startsWith("image/")) {
                          const r = new FileReader();
                          r.onload = (ev) => setMediaForm({ ...mediaForm, thumbnail_url: ev.target?.result as string });
                          r.readAsDataURL(file);
                        }
                      }}
                      style={{
                        border: "2px dashed #CBD5E1",
                        borderRadius: "10px",
                        padding: "1rem",
                        textAlign: "center",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {mediaForm.thumbnail_url ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
                          <img src={mediaForm.thumbnail_url} alt="Custom thumb" style={{ width: 80, height: 48, objectFit: "cover", borderRadius: 6 }} />
                          <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>Custom thumbnail attached. Click to change.</span>
                        </div>
                      ) : (
                        <div style={{ color: "#64748B", fontSize: "0.8rem" }}>
                          <UploadCloud size={22} style={{ margin: "0 auto 0.2rem", display: "block", color: "var(--saffron, #EE5A1C)" }} />
                          Drop custom thumbnail here (Optional — leave empty to use auto YouTube preview)
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <input value={mediaForm.category} onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Channel</label>
                      <input value={mediaForm.channel || ""} onChange={(e) => setMediaForm({ ...mediaForm, channel: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Date</label>
                      <input value={mediaForm.date} onChange={(e) => setMediaForm({ ...mediaForm, date: e.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600, color: "#334155" }}>
                      <input type="checkbox" checked={mediaForm.is_featured} onChange={(e) => setMediaForm({ ...mediaForm, is_featured: e.target.checked })} />
                      Mark as Featured Video
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" style={btnPrimary}><Check size={14} /> Save Video</button>
                    <button type="button" onClick={() => setShowMediaForm(false)} style={btnGhost}>Cancel</button>
                  </div>
                </form>
              )}

              {mediaList.length === 0 ? (
                <EmptyState icon={<Video size={40} />} message="No videos yet. Click '+ Add Video' to get started." />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                  {mediaList.map((item) => {
                    const thumb = getYouTubeThumbnail(item.youtube_id, item.thumbnail_url);
                    return (
                      <div key={item.id} style={{ background: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#0F172A" }}>
                          <img src={thumb} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          {item.is_featured && (
                            <span style={{ position: "absolute", top: 8, right: 8, background: "var(--saffron, #EE5A1C)", color: "#fff", fontSize: "0.68rem", fontWeight: 800, padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                              FEATURED
                            </span>
                          )}
                          <a href={`https://youtu.be/${extractYouTubeId(item.youtube_id)}`} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "12px solid #fff", marginLeft: "2px" }} />
                            </div>
                          </a>
                        </div>
                        <div style={{ padding: "0.85rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div>
                            <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.4 }}>{item.title}</h4>
                            <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B" }}>{item.date} {item.channel && `· ${item.channel}`}</p>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", paddingTop: "0.5rem", borderTop: "1px solid #F1F5F9" }}>
                            <button onClick={() => handleEditMedia(item)} style={btnGhost}>Edit</button>
                            <button onClick={() => handleDeleteMedia(item.id)} style={btnDanger}><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================
            4. GALLERY PHOTOS TAB (Category Dropdown + Only Icon Upload Zone)
            ================================================================ */}
        {activeTab === "gallery" && (
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div style={sectionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0F172A" }}>
                    Photo Gallery Manager
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                    Upload constituency photos with English & Telugu titles. Categories auto-sync between English and Telugu.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setGalleryForm(emptyGallery());
                    setEditingGalleryId(null);
                    setShowGalleryForm(!showGalleryForm);
                  }}
                  style={btnPrimary}
                >
                  <Plus size={14} /> {showGalleryForm ? "Close Form" : "Add Photo with Details"}
                </button>
              </div>

              {/* Processing Spinner */}
              {isProcessingGallery && (
                <div style={{ padding: "1.25rem", borderRadius: "10px", background: "rgba(238,90,28,0.08)", border: "1.5px dashed var(--saffron, #EE5A1C)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <Loader2 size={24} color="var(--saffron, #EE5A1C)" style={{ animation: "spin 1s linear infinite" }} />
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--saffron, #EE5A1C)" }}>
                    Processing & Optimizing Image for Cloud Storage...
                  </span>
                </div>
              )}

              {/* Add / Edit Photo Detailed Form */}
              {showGalleryForm && (
                <form onSubmit={handleSaveGallery} style={{ background: "#F8FAFC", borderRadius: "12px", padding: "1.25rem", border: "1px solid #E2E8F0", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                      {editingGalleryId ? "Edit Gallery Photo Details" : "Add New Gallery Photo"}
                    </h3>
                    <button type="button" onClick={() => setShowGalleryForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={16} /></button>
                  </div>

                  {/* Title Inputs */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Photo Title / Heading (English) *</label>
                      <input
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Photo Title / Heading (Telugu)</label>
                      <input
                        value={galleryForm.title_telugu || ""}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title_telugu: e.target.value })}
                        style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }}
                      />
                    </div>
                  </div>

                  {/* Category Dropdown & Auto Telugu Sync */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Category (English Dropdown) *</label>
                      <select
                        value={galleryForm.category || "Leadership"}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        style={inputStyle}
                      >
                        {categories.map((cat) => (
                          <option key={cat.en} value={cat.en}>
                            {cat.en} ({cat.te})
                          </option>
                        ))}
                        <option value="__new__">+ Add New Category Type...</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Category (Telugu Auto-Mapped)</label>
                      <input
                        value={galleryForm.category_telugu || "నాయకత్వం"}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category_telugu: e.target.value })}
                        style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }}
                      />
                    </div>
                  </div>

                  {/* If user selected '+ Add New Category', show new category inputs */}
                  {isAddingNewCat && (
                    <div style={{ background: "#FFFFFF", padding: "0.85rem", borderRadius: "8px", border: "1px dashed var(--saffron, #EE5A1C)", marginBottom: "0.75rem" }}>
                      <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", fontWeight: 700, color: "var(--saffron, #EE5A1C)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Sparkles size={14} /> Create New Category Type (Stores in Supabase)
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0.5rem", alignItems: "end" }}>
                        <div>
                          <label style={labelStyle}>New Category (English)</label>
                          <input value={newCatEn} onChange={(e) => setNewCatEn(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>New Category (Telugu)</label>
                          <input value={newCatTe} onChange={(e) => setNewCatTe(e.target.value)} style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }} />
                        </div>
                        <button type="button" onClick={handleSaveNewCustomCategory} style={btnPrimary}>
                          <Check size={14} /> Save Category
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ONLY THIS ICON / Drop Zone (No text input file element) */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Upload Photo *</label>
                    <input
                      ref={galleryFileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleSelectGalleryImageFile(f);
                      }}
                    />

                    <div
                      onClick={() => galleryFileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const f = e.dataTransfer.files?.[0];
                        if (f && f.type.startsWith("image/")) handleSelectGalleryImageFile(f);
                      }}
                      style={{
                        border: "2px dashed #CBD5E1",
                        borderRadius: "10px",
                        padding: "1.5rem 1rem",
                        textAlign: "center",
                        background: "#FFFFFF",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {galleryForm.src ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                          <img src={galleryForm.src} alt="Preview" style={{ width: 100, height: 75, objectFit: "cover", borderRadius: 8, border: "1.5px solid #CBD5E1" }} />
                          <div style={{ textAlign: "left" }}>
                            <p style={{ margin: "0 0 0.2rem", fontSize: "0.85rem", fontWeight: 700, color: "#059669" }}>✓ Photo Attached & Ready</p>
                            <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Click to replace or choose another photo</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "rgba(238,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.6rem" }}>
                            <UploadCloud size={26} color="var(--saffron, #EE5A1C)" />
                          </div>
                          <p style={{ margin: "0 0 0.2rem", fontSize: "0.85rem", fontWeight: 700, color: "#1E293B" }}>
                            Click or Drop Photo Here
                          </p>
                          <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>Supports JPG, PNG, WebP</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" disabled={isProcessingGallery} style={btnPrimary}>
                      {isProcessingGallery ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={14} />}
                      Save to Gallery
                    </button>
                    <button type="button" onClick={() => setShowGalleryForm(false)} style={btnGhost}>Cancel</button>
                  </div>
                </form>
              )}

              {/* Gallery Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
                {galleryList.map((img, idx) => (
                  <div key={img.id || img.src} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
                      <img src={img.src} alt={img.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: 6, left: 6, background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: "0.65rem", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700 }}>
                        #{idx + 1} {img.category}
                      </span>
                    </div>
                    <div style={{ padding: "0.75rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ margin: "0 0 0.2rem", fontSize: "0.82rem", fontWeight: 700, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {img.title}
                        </p>
                        {img.title_telugu && (
                          <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B", fontFamily: "var(--font-telugu, serif)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {img.title_telugu}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.6rem", paddingTop: "0.4rem", borderTop: "1px solid #F1F5F9" }}>
                        <div style={{ display: "flex", gap: "0.25rem" }}>
                          <button disabled={idx === 0} onClick={() => moveGallery(idx, "up")} style={{ padding: "0.3rem", borderRadius: "5px", border: "1px solid #E2E8F0", background: idx === 0 ? "#F1F5F9" : "#fff", cursor: idx === 0 ? "not-allowed" : "pointer" }}>
                            <ArrowUp size={13} color={idx === 0 ? "#CBD5E1" : "#475569"} />
                          </button>
                          <button disabled={idx === galleryList.length - 1} onClick={() => moveGallery(idx, "down")} style={{ padding: "0.3rem", borderRadius: "5px", border: "1px solid #E2E8F0", background: idx === galleryList.length - 1 ? "#F1F5F9" : "#fff", cursor: idx === galleryList.length - 1 ? "not-allowed" : "pointer" }}>
                            <ArrowDown size={13} color={idx === galleryList.length - 1 ? "#CBD5E1" : "#475569"} />
                          </button>
                        </div>
                        <div style={{ display: "flex", gap: "0.3rem" }}>
                          <button onClick={() => { setGalleryForm(img); setEditingGalleryId(img.id || null); setShowGalleryForm(true); }} style={{ ...btnGhost, padding: "0.25rem 0.5rem", fontSize: "0.72rem" }}>Edit</button>
                          <button onClick={() => handleDeleteGallery(img.id)} style={btnDanger}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            5. NEWS & PRESS TAB
            ================================================================ */}
        {activeTab === "news" && (
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div style={sectionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0F172A" }}>
                    News & Press Release Manager
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                    Manage newspaper reports, assembly releases, and media announcements.
                  </p>
                </div>
                <button onClick={() => { setNewsForm(emptyNews()); setEditingNewsId(null); setShowNewsForm(true); }} style={btnPrimary}>
                  <Plus size={14} /> Add News Article
                </button>
              </div>

              {showNewsForm && (
                <form onSubmit={handleSaveNews} style={{ background: "#F8FAFC", borderRadius: "10px", padding: "1.25rem", border: "1px solid #E2E8F0", marginBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                      {editingNewsId ? "Edit Article" : "New Article"}
                    </h3>
                    <button type="button" onClick={() => setShowNewsForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><X size={16} /></button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Title (English) *</label>
                      <input required value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Title (Telugu)</label>
                      <input value={newsForm.title_telugu} onChange={(e) => setNewsForm({ ...newsForm, title_telugu: e.target.value })} style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div>
                      <label style={labelStyle}>Summary (English)</label>
                      <textarea value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })} style={textareaStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Summary (Telugu)</label>
                      <textarea value={newsForm.summary_telugu} onChange={(e) => setNewsForm({ ...newsForm, summary_telugu: e.target.value })} style={{ ...textareaStyle, fontFamily: "var(--font-telugu, serif)" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Category</label>
                      <input value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Source / Publication</label>
                      <input value={newsForm.source} onChange={(e) => setNewsForm({ ...newsForm, source: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Date</label>
                      <input value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={labelStyle}>Article URL (Optional)</label>
                    <input value={newsForm.url || ""} onChange={(e) => setNewsForm({ ...newsForm, url: e.target.value })} style={inputStyle} />
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button type="submit" style={btnPrimary}><Check size={14} /> Save Article</button>
                    <button type="button" onClick={() => setShowNewsForm(false)} style={btnGhost}>Cancel</button>
                  </div>
                </form>
              )}

              {newsList.length === 0 ? (
                <EmptyState icon={<Newspaper size={40} />} message="No news articles yet. Click '+ Add News Article' to get started." />
              ) : (
                <div style={{ display: "grid", gap: "0.75rem" }}>
                  {newsList.map((item) => (
                    <div key={item.id} style={{ background: "#FFFFFF", borderRadius: "10px", padding: "1.1rem", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                          {item.category && <span style={{ fontSize: "0.68rem", background: "#FFF7ED", color: "#C2410C", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 700, textTransform: "uppercase" }}>{item.category}</span>}
                          <span style={{ fontSize: "0.75rem", color: "#64748B" }}>{item.date} {item.source && `· ${item.source}`}</span>
                        </div>
                        <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.95rem", fontWeight: 700, color: "#0F172A" }}>{item.title}</h4>
                        {item.title_telugu && <p style={{ margin: "0 0 0.4rem", fontSize: "0.82rem", color: "#64748B", fontFamily: "var(--font-telugu, serif)" }}>{item.title_telugu}</p>}
                        {item.summary && <p style={{ margin: 0, fontSize: "0.82rem", color: "#475569", lineHeight: 1.5 }}>{item.summary}</p>}
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                        <button onClick={() => handleEditNews(item)} style={btnGhost}>Edit</button>
                        <button onClick={() => handleDeleteNews(item.id)} style={btnDanger}><Trash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================
            6. HERO BANNER TAB
            ================================================================ */}
        {activeTab === "hero" && (
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div style={sectionCard}>
              <div style={{ marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0F172A" }}>
                  Hero Banner Carousel Slides
                </h2>
                <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                  Upload background images for the homepage hero carousel. Use ↑ ↓ to reorder. First slide is shown by default.
                </p>
              </div>

              {isProcessingHero && (
                <div style={{ padding: "1.25rem", borderRadius: "10px", background: "rgba(238,90,28,0.08)", border: "1.5px dashed var(--saffron, #EE5A1C)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <Loader2 size={24} color="var(--saffron, #EE5A1C)" style={{ animation: "spin 1s linear infinite" }} />
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--saffron, #EE5A1C)" }}>
                    Processing Hero Slide Image...
                  </span>
                </div>
              )}

              <input ref={heroFileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleHeroFile(f); }} />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
                {/* Dashed upload card */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files?.[0]; if (file && file.type.startsWith("image/")) handleHeroFile(file); }}
                  onClick={() => heroFileInputRef.current?.click()}
                  style={{
                    border: "2px dashed #CBD5E1",
                    borderRadius: "12px",
                    aspectRatio: "16/9",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    background: "#FAFAFA",
                  }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <UploadCloud size={22} color="var(--saffron, #EE5A1C)" />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    ADD HERO SLIDE {heroSlides.length + 1}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>Click or drag image</span>
                </div>

                {heroSlides.map((slide, idx) => (
                  <div key={slide.id || slide.src} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                      <img src={slide.src} alt={slide.title || "Hero slide"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: 6, left: 6, background: idx === 0 ? "var(--saffron, #EE5A1C)" : "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.65rem", padding: "0.15rem 0.45rem", borderRadius: "4px", fontWeight: 800 }}>
                        {idx === 0 ? "★ PRIMARY SLIDE" : `#${idx + 1} SLIDE`}
                      </span>
                    </div>
                    <div style={{ padding: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "0.25rem" }}>
                        <button disabled={idx === 0} onClick={() => moveHero(idx, "up")} style={{ padding: "0.3rem", borderRadius: "5px", border: "1px solid #E2E8F0", background: idx === 0 ? "#F1F5F9" : "#fff", cursor: idx === 0 ? "not-allowed" : "pointer" }}>
                          <ArrowUp size={13} color={idx === 0 ? "#CBD5E1" : "#475569"} />
                        </button>
                        <button disabled={idx === heroSlides.length - 1} onClick={() => moveHero(idx, "down")} style={{ padding: "0.3rem", borderRadius: "5px", border: "1px solid #E2E8F0", background: idx === heroSlides.length - 1 ? "#F1F5F9" : "#fff", cursor: idx === heroSlides.length - 1 ? "not-allowed" : "pointer" }}>
                          <ArrowDown size={13} color={idx === heroSlides.length - 1 ? "#CBD5E1" : "#475569"} />
                        </button>
                      </div>
                      <button onClick={() => handleDeleteHero(slide.id)} style={btnDanger}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            7. TICKER BAR TAB
            ================================================================ */}
        {activeTab === "ticker" && (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={sectionCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                  {editingTickerId ? "Edit Marquee Ticker Update" : "Add Marquee Ticker Update"}
                </h2>
                {editingTickerId && (
                  <button
                    type="button"
                    onClick={() => { setEditingTickerId(null); setNewTickerEn(""); setNewTickerTe(""); }}
                    style={{ ...btnGhost, fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                  >
                    <X size={12} /> Cancel Edit
                  </button>
                )}
              </div>
              <form onSubmit={handleSaveTicker}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "0.75rem", alignItems: "end" }}>
                  <div>
                    <label style={labelStyle}>Ticker Text (English) *</label>
                    <input required value={newTickerEn} onChange={(e) => setNewTickerEn(e.target.value)} style={inputStyle} placeholder="e.g. 🏛️ New development project launched..." />
                  </div>
                  <div>
                    <label style={labelStyle}>Ticker Text (Telugu)</label>
                    <input value={newTickerTe} onChange={(e) => setNewTickerTe(e.target.value)} style={{ ...inputStyle, fontFamily: "var(--font-telugu, serif)" }} placeholder="ఉదా. 🏛️ నూతన అభివృద్ధి కార్యక్రమం..." />
                  </div>
                  <button type="submit" style={btnPrimary}>
                    {editingTickerId ? <Check size={14} /> : <Plus size={14} />} {editingTickerId ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>

            <div style={sectionCard}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: "0.75rem", color: "#0F172A" }}>
                Active Ticker Updates ({tickerItems.length})
              </h3>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {tickerItems.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", borderRadius: "8px", background: item.active ? "#F8FAFC" : "#FFF1F2", border: `1px solid ${item.active ? "#E2E8F0" : "#FECDD3"}` }}>
                    <div style={{ flex: 1, marginRight: "1rem" }}>
                      <p style={{ margin: "0 0 0.15rem", fontWeight: 600, fontSize: "0.85rem", color: item.active ? "#0F172A" : "#94A3B8" }}>{item.textEn}</p>
                      {item.textTe && <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748B", fontFamily: "var(--font-telugu, serif)" }}>{item.textTe}</p>}
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      <button onClick={() => handleEditTicker(item)} style={{ ...btnGhost, fontSize: "0.72rem", padding: "0.25rem 0.55rem" }}>
                        Edit
                      </button>
                      <button onClick={() => toggleTickerItem(item.id)} style={{ ...btnGhost, fontSize: "0.72rem", padding: "0.25rem 0.55rem" }}>
                        {item.active ? "Enabled" : "Disabled"}
                      </button>
                      <button onClick={() => deleteTickerItem(item.id)} style={btnDanger}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            8. SECURITY & SUPABASE AUTH TAB
            ================================================================ */}
        {activeTab === "security" && (
          <div style={{ maxWidth: "560px" }}>
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <ShieldCheck size={22} color="var(--saffron, #EE5A1C)" />
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0, color: "#0F172A" }}>
                  Supabase User Authentication
                </h2>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#64748B", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                Admin portal is protected with Supabase Email & Password authentication. You can invite, create, and manage admin users directly from your Supabase Dashboard.
              </p>

              <div style={{ background: "#F8FAFC", borderRadius: "10px", padding: "1rem", border: "1px solid #E2E8F0", marginBottom: "1.25rem" }}>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Current Active Session</p>
                <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#0F172A", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <User size={16} color="var(--saffron, #EE5A1C)" /> {currentUserEmail || "Authenticated Administrator"}
                </p>
              </div>

              <div style={{ background: "rgba(238,90,28,0.06)", borderRadius: "10px", padding: "1rem", border: "1px solid rgba(238,90,28,0.2)", marginBottom: "1.25rem" }}>
                <h4 style={{ margin: "0 0 0.35rem", fontSize: "0.85rem", fontWeight: 800, color: "#C2410C" }}>
                  How to Add New Admin Users in Supabase:
                </h4>
                <ol style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.8rem", color: "#7C2D12", lineHeight: 1.6 }}>
                  <li>Open your <strong>Supabase Dashboard</strong>.</li>
                  <li>Click on <strong>Authentication</strong> in the left sidebar.</li>
                  <li>Click <strong>Users → Add User → Create User</strong>.</li>
                  <li>Enter the admin's email and choose their password.</li>
                  <li>They can now log in to this portal using that ID & password!</li>
                </ol>
              </div>

              <button onClick={handleLogout} style={{ ...btnDanger, padding: "0.6rem 1.2rem", fontSize: "0.85rem" }}>
                <LogOut size={14} /> Log Out Current Session
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
