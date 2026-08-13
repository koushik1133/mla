"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { TwitterXIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons";
import { politician } from "@/content/politician";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100, "Name too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(150, "Email too long."),
  phone: z.string().trim().max(20, "Phone number too long.").optional(),
  message: z.string().trim().min(20, "Message must be at least 20 characters.").max(2000, "Message must be under 2000 characters."),
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      return fieldErrors;
    }
    return {};
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    // Simulate submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
  };

  return (
    <div style={{ background: "var(--warm-bg)" }}>
      {/* Header */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 0 4rem" }}>
        <div className="container-site">
          <p className="section-label" style={{ color: "var(--saffron-light)" }}>Connect</p>
          <span style={{ display: "block", width: "3rem", height: "3px", background: "var(--saffron)", borderRadius: "2px", marginBottom: "1rem" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            Contact the Public Office
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.65 }}>
            Reach the office of Beerla Ilaiah, MLA Alair, for constituency matters, public enquiries, or general correspondence.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem", alignItems: "start" }}>
            {/* Left — info */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
                Public Contact Information
              </h2>

              {/* Note on contact info */}
              <div style={{ padding: "1rem", background: "rgba(238,90,28,0.05)", border: "1px solid rgba(238,90,28,0.15)", borderRadius: "8px", marginBottom: "2rem" }}>
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.55 }}>
                  Verified office contact details are not currently available from authoritative public sources. The contact form below is available for general enquiries. For urgent constituency matters, please reach out via the official social media channels listed.
                </p>
              </div>

              {/* Social handles */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
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
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  <TwitterXIcon size={20} color="#1DA1F2" />
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>X (Twitter)</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>{politician.social.twitterHandle}</p>
                  </div>
                </a>
                <a
                  href={politician.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  <InstagramIcon size={20} color="#E1306C" />
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>Instagram</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>{politician.social.instagramHandle}</p>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/results?search_query=Beerla+Ilaiah"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: "var(--white)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    textDecoration: "none",
                  }}
                >
                  <YoutubeIcon size={20} color="#FF0000" />
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--muted-light)", marginBottom: "0.1rem" }}>YouTube</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--charcoal)" }}>Search: Beerla Ilaiah</p>
                  </div>
                </a>
              </div>

              {/* Constituency */}
              <div style={{ padding: "1.25rem", background: "var(--charcoal)", borderRadius: "12px", color: "white" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Constituency
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", marginBottom: "0.2rem" }}>
                  Alair Assembly Constituency No. 97
                </p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
                  Yadadri Bhuvanagiri District, Telangana
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--saffron-light)", marginTop: "0.5rem", fontWeight: 600 }}>
                  Indian National Congress
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--charcoal)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
                  Send a Message
                </h2>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "2rem" }}>
                  For public enquiries and constituency matters only. Please do not submit personal sensitive information.
                </p>

                {status === "sent" ? (
                  <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
                    <CheckCircle size={48} color="var(--congress-green)" style={{ margin: "0 auto 1rem" }} />
                    <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                      Message received.
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>
                      Thank you for reaching out. We will respond through the appropriate channel.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input
                          id="name"
                          type="text"
                          className="form-input"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          aria-required="true"
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" style={{ color: "var(--saffron-dark)", fontSize: "0.78rem", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <AlertCircle size={12} /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          id="email"
                          type="email"
                          className="form-input"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          aria-required="true"
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" style={{ color: "var(--saffron-dark)", fontSize: "0.78rem", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone (optional) */}
                      <div>
                        <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
                        <input
                          id="phone"
                          type="tel"
                          className="form-input"
                          placeholder="+91 XXXXX XXXXX"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="form-label">Message *</label>
                        <textarea
                          id="message"
                          className="form-input"
                          placeholder="Please describe your enquiry or constituency matter…"
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          aria-required="true"
                          aria-describedby={errors.message ? "message-error" : undefined}
                          style={{ resize: "vertical", minHeight: "120px" }}
                        />
                        {errors.message && (
                          <p id="message-error" style={{ color: "var(--saffron-dark)", fontSize: "0.78rem", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <AlertCircle size={12} /> {errors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={status === "sending"}
                        style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
                      >
                        {status === "sending" ? "Sending…" : "Send Message"}
                        {status !== "sending" && <Send size={16} />}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @media (max-width: 768px) {
            div[style*="gridTemplateColumns: 1fr 1.5fr"] {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
