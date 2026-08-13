"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/lang-context";
import { getAIResponse } from "@/lib/ai-knowledge";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function BeerlaAIAssistant() {
  const { lang } = useLang();
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
            ? "నమస్కారం! నేను బీర్ల ఇలయ్య గారి AI సహాయకుని (Beerla's AI Assistant). ఆలేరు నియోజకవర్గం, ఎమ్మెల్యే గారి సేవలు, ఎన్నికల ఫలితాలు లేదా కార్యాలయ వివరాల గురించి మీరు నన్ను ఏమైనా అడగవచ్చు."
            : "Namaste! I am Beerla's AI Assistant. Ask me anything about MLA Beerla Ilaiah, Alair Constituency No. 97, 2023 election results, public service schemes, or office contact details.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
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

    setTimeout(() => {
      const responseText = getAIResponse(query, lang);
      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const suggestedQueriesEn = [
    "Who is Beerla Ilaiah?",
    "2023 Alair election results",
    "How to contact MLA office?",
    "Tell me about Yadadri Temple",
  ];

  const suggestedQueriesTe = [
    "బీర్ల ఇలయ్య గారి గురించి చెప్పండి",
    "2023 ఆలేరు ఎన్నికల ఫలితాలు",
    "ఎమ్మెల్యే కార్యాలయం సంప్రదించడం ఎలా?",
    "యాదాద్రి క్షేత్ర అభివృద్ధి పనులు",
  ];

  const suggestions = lang === "te" ? suggestedQueriesTe : suggestedQueriesEn;

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
          <Image src="/images/images (1).jpeg" alt="Beerla AI Assistant" fill style={{ objectFit: "cover" }} />
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
              width: "min(380px, calc(100vw - 2.5rem))",
              height: "min(540px, calc(100vh - 7rem))",
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
                <div style={{ position: "relative", width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--saffron)" }}>
                  <Image src="/images/images (1).jpeg" alt="Beerla Ilaiah MLA" fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "white", lineHeight: 1.2, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}>
                    {lang === "te" ? "బీర్ల AI సహాయకుడు" : "Beerla's AI Assistant"}
                  </h3>
                  <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF6E" }} />
                    {lang === "te" ? "ఆలేరు ఎమ్మెల్యే సమాచార వ్యవస్థ" : "Trained Alair Knowledge Base"}
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
                      maxWidth: "85%",
                      padding: "0.75rem 1rem",
                      borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.sender === "user" ? "var(--saffron)" : "var(--white)",
                      color: msg.sender === "user" ? "white" : "var(--charcoal)",
                      fontSize: "0.85rem",
                      lineHeight: 1.55,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      border: msg.sender === "ai" ? "1px solid var(--border)" : "none",
                      fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)",
                    }}
                  >
                    {msg.text}
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
                    padding: "0.25rem 0.6rem",
                    minHeight: "44px",
                    borderRadius: "100px",
                    background: "rgba(238,90,28,0.08)",
                    border: "1px solid rgba(238,90,28,0.2)",
                    color: "var(--saffron-dark)",
                    fontSize: "0.72rem",
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
