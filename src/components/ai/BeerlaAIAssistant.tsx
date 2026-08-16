"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw, ExternalLink, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, TwitterXIcon } from "@/components/icons/SocialIcons";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { getAIResponse, getAIResponseTopic } from "@/lib/ai-knowledge";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  showSocialButtons?: boolean;
}

export default function BeerlaAIAssistant() {
  const pathname = usePathname();
  const { lang } = useLang();

  // Hide AI Assistant completely on Admin page
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text:
          lang === "te"
            ? "నమస్కారం! నేను బీర్ల ఐలయ్య గారి AI సహాయకుని (Beerla's AI Assistant). ఆలేరు నియోజకవర్గం, ఎమ్మెల్యే గారి సేవలు, యాదాద్రి ఆలయం లేదా సంప్రదింపు వివరాల గురించి నన్ను ఏమైనా అడగవచ్చు."
            : "Namaste! I am Beerla's AI Assistant. Ask me anything about MLA Beerla Ilaiah, Alair Constituency No. 97, Yadadri Temple, 2023 election results, or office contact details.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      // Check if Groq API endpoint is available
      const apiRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: query }],
          lang,
        }),
      });

      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.text) {
          const aiMsg: Message = {
            id: `a_${Date.now()}`,
            sender: "ai",
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            showSocialButtons: query.toLowerCase().includes("contact") || query.toLowerCase().includes("social") || query.includes("సంప్రదించ"),
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Fallthrough to client knowledge base
    }

    // Fallback to local knowledge base
    setTimeout(() => {
      const topic = getAIResponseTopic(query);
      const responseText = getAIResponse(query, lang);
      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showSocialButtons: topic?.showSocialButtons || query.toLowerCase().includes("contact") || query.includes("సంప్రదించ"),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const suggestedQueriesEn = [
    "Who is Beerla Ilaiah?",
    "Tell me about Yadadri Temple",
    "How to contact MLA office?",
    "2023 Alair election results",
  ];

  const suggestedQueriesTe = [
    "బీర్ల ఐలయ్య గారి గురించి చెప్పండి",
    "యాదాద్రి క్షేత్రం గురించి చెప్పండి",
    "ఎమ్మెల్యే కార్యాలయం సంప్రదించడం ఎలా?",
    "2023 ఆలేరు ఎన్నికల ఫలితాలు",
  ];

  const suggestions = lang === "te" ? suggestedQueriesTe : suggestedQueriesEn;

  // Helper to format text and replace long raw URLs with clean handle names
  const formatText = (txt: string) => {
    if (!txt) return "";
    return txt
      .replace(/https?:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_\-\.]+)\/?/gi, "@$2")
      .replace(/https?:\/\/(www\.)?facebook\.com\/([a-zA-Z0-9_\-\.]+)\/?/gi, "@$2")
      .replace(/https?:\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_\-\.]+)\/?/gi, "@$2")
      .replace(/https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_\-\.]+)\/?/gi, "@$2")
      .replace(/(https?:\/\/[^\s]+)/g, (url) => {
        try {
          const parsed = new URL(url);
          return parsed.hostname + (parsed.pathname.length > 10 ? parsed.pathname.slice(0, 10) + "..." : parsed.pathname);
        } catch {
          return url.length > 25 ? url.slice(0, 25) + "..." : url;
        }
      });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Beerla AI Assistant"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          zIndex: 9999,
          background: "linear-gradient(135deg, var(--saffron) 0%, var(--saffron-dark) 100%)",
          color: "white",
          border: "none",
          borderRadius: "100px",
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
          fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)",
          fontWeight: 700,
          fontSize: "0.875rem",
        }}
      >
        <div style={{ position: "relative", width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", border: "2px solid white" }}>
          <Image src="/images/images (1).jpeg" alt="Beerla AI Assistant" fill sizes="28px" style={{ objectFit: "cover" }} />
        </div>
        <span>{lang === "te" ? "బీర్ల AI సహాయకుడు" : "Beerla AI Assistant"}</span>
        <Sparkles size={16} color="#FFD700" />
      </motion.button>

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-drawer"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "5.5rem",
              right: "1.75rem",
              width: "min(390px, calc(100vw - 2rem))",
              height: "min(560px, calc(100vh - 7rem))",
              zIndex: 9999,
              background: "var(--white)",
              borderRadius: "20px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "var(--charcoal)",
                color: "white",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "2px solid var(--saffron)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ position: "relative", width: "38px", height: "38px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--saffron)" }}>
                  <Image src="/images/images (1).jpeg" alt="Beerla Ilaiah MLA" fill sizes="38px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "white", lineHeight: 1.2, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                    {lang === "te" ? "బీర్ల AI సహాయకుడు" : "Beerla's AI Assistant"}
                  </h3>
                  <p style={{ fontSize: "0.72rem", color: "#4CAF6E", display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 600, margin: 0 }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4CAF6E" }} />
                    {lang === "te" ? "ఆన్‌లైన్" : "Online"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
                style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Body */}
            <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.875rem", background: "var(--warm-bg)" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      padding: "0.75rem 1rem",
                      borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.sender === "user" ? "var(--saffron)" : "var(--white)",
                      color: msg.sender === "user" ? "white" : "var(--charcoal)",
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      border: msg.sender === "ai" ? "1px solid var(--border)" : "none",
                      wordBreak: "break-word",
                      overflowWrap: "anywhere",
                      whiteSpace: "pre-wrap",
                      fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                    }}
                  >
                    <p style={{ margin: 0 }}>{formatText(msg.text)}</p>

                    {/* Interactive Social Media Buttons */}
                    {msg.sender === "ai" && msg.showSocialButtons && (
                      <div style={{ marginTop: "0.85rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        <a
                          href="https://www.instagram.com/beerla_ilaiah_inc/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.35rem 0.65rem", borderRadius: "100px", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366)", color: "white", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}
                        >
                          <InstagramIcon style={{ width: "13px", height: "13px", fill: "white" }} /> Instagram
                        </a>
                        <a
                          href="https://www.facebook.com/BeerIaIlaiahINCAlairIncharge/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.35rem 0.65rem", borderRadius: "100px", background: "#1877F2", color: "white", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}
                        >
                          <FacebookIcon style={{ width: "13px", height: "13px", fill: "white" }} /> Facebook
                        </a>
                        <a
                          href="https://twitter.com/IlaiahBeerla"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.35rem 0.65rem", borderRadius: "100px", background: "#000000", color: "white", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}
                        >
                          <TwitterXIcon style={{ width: "13px", height: "13px", fill: "white" }} /> X (Twitter)
                        </a>
                        <a
                          href="tel:+919866652347"
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.35rem 0.65rem", borderRadius: "100px", background: "#10B981", color: "white", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}
                        >
                          <Phone size={12} /> Call Office
                        </a>
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: "0.65rem", color: "var(--muted-light)", marginTop: "0.25rem", padding: "0 0.25rem" }}>
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px 16px 16px 4px", width: "max-content" }}>
                  <Sparkles size={14} color="var(--saffron)" />
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                    {lang === "te" ? "సమాధానం విశ్లేషిస్తోంది..." : "Analyzing answer..."}
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div style={{ padding: "0.5rem 0.75rem", background: "var(--white)", borderTop: "1px solid var(--border)", display: "flex", gap: "0.4rem", overflowX: "auto" }}>
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => handleSend(sug)}
                  style={{
                    padding: "0.25rem 0.65rem",
                    minHeight: "44px",
                    borderRadius: "100px",
                    background: "rgba(238,90,28,0.08)",
                    border: "1px solid rgba(238,90,28,0.2)",
                    color: "var(--saffron-dark)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                  }}
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{ padding: "0.75rem", background: "var(--white)", borderTop: "1px solid var(--border)", display: "flex", gap: "0.5rem" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "te" ? "ప్రశ్నను ఇక్కడ నమోదు చేయండి..." : "Ask Beerla's AI Assistant..."}
                style={{
                  flex: 1,
                  padding: "0.6rem 0.875rem",
                  minHeight: "44px",
                  borderRadius: "100px",
                  border: "1px solid var(--border)",
                  fontSize: "0.85rem",
                  outline: "none",
                  fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: input.trim() ? "var(--saffron)" : "var(--border)",
                  color: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() ? "pointer" : "default",
                  transition: "background 0.2s",
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
