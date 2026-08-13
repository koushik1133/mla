"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react";
import { TwitterXIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { politician } from "@/content/politician";
import { useLang } from "@/lib/lang-context";
import { translations } from "@/content/translations";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100, "Name too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email too long."),
  phone: z.string().trim().max(20, "Phone number too long.").optional(),
  message: z.string().trim().min(20, "Message must be at least 20 characters.").max(2000, "Message must be under 2000 characters."),
});

export default function ContactPage() {
  const { lang } = useLang();
  const t = translations[lang].contact;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          if (lang === "te") {
            if (field === "name") fieldErrors[field] = "దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.";
            else if (field === "email") fieldErrors[field] = "దయచేసి చెల్లుబాటు అయ్యే ఈమెయిల్ నమోదు చేయండి.";
            else if (field === "message") fieldErrors[field] = "సందేశం కనీసం 20 అక్షరాలు ఉండాలి.";
            else fieldErrors[field] = issue.message;
          } else {
            fieldErrors[field] = issue.message;
          }
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.label}</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            {t.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.65, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-site">
          <div className="grid-2-col" style={{ alignItems: "start", gap: "clamp(2rem, 5vw, 4rem)" }}>
            {/* Left — info */}
            <div>
              <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
                {t.infoTitle}
              </h2>

              <div style={{ padding: "1rem", background: "rgba(238,90,28,0.05)", border: "1px solid rgba(238,90,28,0.15)", borderRadius: "8px", marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.55, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {t.note}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
                {/* Official Phone */}
                <a
                  href={`tel:${politician.contact.phone}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(238,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Phone size={18} color="var(--saffron)" />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>{lang === "te" ? "ఫోన్ నంబర్" : "Mobile Phone"}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>{politician.contact.phone}</p>
                  </div>
                </a>

                {/* Official Email */}
                <a
                  href={`mailto:${politician.contact.email}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(238,90,28,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Mail size={18} color="var(--saffron)" />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>{lang === "te" ? "ఇమెయిల్ చిరునామా" : "Email Address"}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>{politician.contact.email}</p>
                  </div>
                </a>

                {/* Facebook 43K Followers */}
                <a
                  href={politician.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                    <FacebookIcon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>Facebook Page ({politician.social.facebookFollowers})</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>Beerla Ilaiah INC</p>
                  </div>
                </a>

                {/* Instagram Foundation */}
                <a
                  href={politician.social.instagramFoundation}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                    <InstagramIcon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>Instagram Team / Foundation</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>{politician.social.instagramFoundationHandle}</p>
                  </div>
                </a>

                {/* Twitter / X */}
                <a
                  href={politician.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "14px",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#101010", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                    <TwitterXIcon size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>X (Twitter)</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>{politician.social.twitterHandle}</p>
                  </div>
                </a>
              </div>

              <div style={{ padding: "1.25rem", background: "var(--charcoal)", borderRadius: "12px", color: "white" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {t.constituencyHeader}
                </p>
                <p style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontWeight: 800, fontSize: "1rem", marginBottom: "0.2rem" }}>
                  {lang === "te" ? "ఆలేరు శాసనసభ నియోజకవర్గం 97" : "Alair Assembly Constituency No. 97"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? "యాదాద్రి భువనగిరి జిల్లా, తెలంగాణ" : "Yadadri Bhuvanagiri District, Telangana"}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--saffron-light)", marginTop: "0.5rem", fontWeight: 600, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {lang === "te" ? "భారత జాతీయ కాంగ్రెస్" : "Indian National Congress"}
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem" }}>
                <h2 style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  {t.formTitle}
                </h2>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "2rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                  {t.formSubtitle}
                </p>

                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
                    <CheckCircle size={48} color="var(--congress-green)" style={{ margin: "0 auto 1rem" }} />
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.5rem", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {t.sentTitle}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted)", fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>
                      {t.sentDesc}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label htmlFor="name" className="form-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.fullName}</label>
                        <input
                          id="name"
                          type="text"
                          className="form-input"
                          maxLength={100}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          aria-required="true"
                        />
                        {errors.name && (
                          <p style={{ color: "var(--saffron-dark)", fontSize: "0.78rem", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="form-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.email}</label>
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          maxLength={150}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          aria-required="true"
                        />
                        {errors.email && (
                          <p style={{ color: "var(--saffron-dark)", fontSize: "0.78rem", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="form-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.phone}</label>
                        <input
                          id="phone"
                          type="tel"
                          className="form-input"
                          maxLength={20}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="form-label" style={{ fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-body)" }}>{t.message}</label>
                        <textarea
                          id="message"
                          className="form-input"
                          rows={5}
                          maxLength={2000}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          aria-required="true"
                          style={{ resize: "vertical", minHeight: "120px" }}
                        />
                        {errors.message && (
                          <p style={{ color: "var(--saffron-dark)", fontSize: "0.78rem", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <AlertCircle size={12} /> {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={status === "sending"}
                        style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1, fontFamily: lang === "te" ? "var(--font-telugu)" : "var(--font-display)" }}
                      >
                        {status === "sending" ? t.sending : t.sendBtn}
                        {status !== "sending" && <Send size={16} />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
