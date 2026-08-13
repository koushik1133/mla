"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/lang-context";
import { ReactNode } from "react";

export default function SiteShell({ children }: { children: ReactNode }) {
  const { lang, toggle } = useLang();
  return (
    <>
      <Navbar lang={lang} onLangToggle={toggle} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
