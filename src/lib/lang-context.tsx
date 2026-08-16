"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "te";

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "en", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "te" : "en"));

  // Keep the document language in sync: screen readers pick the right voice,
  // and :lang(te) selectors (Telugu line-height / tracking) can match.
  useEffect(() => {
    document.documentElement.lang = lang === "te" ? "te-IN" : "en-IN";
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
