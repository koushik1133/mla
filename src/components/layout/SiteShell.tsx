"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsTicker from "@/components/layout/NewsTicker";
import BeerlaAIAssistant from "@/components/ai/BeerlaAIAssistant";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { ReactNode } from "react";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SiteConfigProvider>
      <NewsTicker />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BeerlaAIAssistant />
    </SiteConfigProvider>
  );
}
