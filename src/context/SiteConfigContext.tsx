"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSiteConfigFromSupabase, saveSiteConfigToSupabase } from "@/lib/supabase";

export interface TickerItem {
  id: string;
  textEn: string;
  textTe: string;
  link?: string;
  active: boolean;
}

export interface HeroConfig {
  bgImage: string;
  bgImages?: string[];
  sideImage: string;
  alignment: "left" | "center" | "right";
  headlineEn: string;
  headlineTe: string;
  subtitleEn: string;
  subtitleTe: string;
  partyBadgeEn: string;
  partyBadgeTe: string;
}

interface SiteConfigContextType {
  tickerItems: TickerItem[];
  heroConfig: HeroConfig;
  showThemeSwitcher: boolean;
  setShowThemeSwitcher: (show: boolean) => void;
  addTickerItem: (item: Omit<TickerItem, "id">) => void;
  updateTickerItem: (id: string, updates: Partial<TickerItem>) => void;
  toggleTickerItem: (id: string) => void;
  deleteTickerItem: (id: string) => void;
  updateHeroConfig: (updates: Partial<HeroConfig>) => void;
  resetToDefaults: () => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  adminPin: string;
  setAdminPin: (pin: string) => void;
  resetPinWithMasterKey: (recoveryAnswer: string, newPin: string) => boolean;
}

const defaultTickerItems: TickerItem[] = [
  {
    id: "t1",
    textEn: "🔥 MLA Beerla Ilaiah Appointed President of Yadadri Bhuvanagiri District Congress Committee (DCC) — November 2025",
    textTe: "🔥 యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ అధ్యక్షుడిగా ఎమ్మెల్యే బీర్ల ఐలయ్య నియామకం — నవంబర్ 2025",
    link: "/news",
    active: true,
  },
  {
    id: "t2",
    textEn: "🏛️ Alair Assembly Constituency No. 97 — Serving 8 Mandals & 2.27 Lakh Voters with Integrity",
    textTe: "🏛️ ఆలేరు శాసనసభ నియోజకవర్గం 97 — 8 మండలాలు, 2.27 లక్షల ప్రజలకు నిరంతర ప్రజా సేవ",
    link: "/alair",
    active: true,
  },
  {
    id: "t3",
    textEn: "🚩 122,140 Votes Victory Margin (49,636 Majority) in 2023 Telangana Assembly Election",
    textTe: "🚩 2023 తెలంగాణ అసెంబ్లీ ఎన్నికల్లో 1,22,140 ఓట్లతో 49,636 ఓట్ల భారీ చారిత్రాత్మక మెజారిటీ",
    link: "/election-2023",
    active: true,
  },
];

const defaultHeroConfig: HeroConfig = {
  bgImage: "/images/hero-bg.jpg",
  bgImages: [
    "/images/hero-bg.jpg",
    "/images/yadadri-temple.jpg",
    "/images/hero2.png",
    "/images/alair-agriculture.jpg",
    "/images/kolanupaka-temple.jpg",
    "/images/alair-development.jpg",
  ],
  sideImage: "/images/beerla-standing.jpg",
  alignment: "left",
  headlineEn: "Beerla Ilaiah",
  headlineTe: "బీర్ల ఐలయ్య",
  subtitleEn: "Member of the Telangana Legislative Assembly — Alair No. 97",
  subtitleTe: "తెలంగాణ శాసనసభ సభ్యులు — ఆలేరు సంఖ్య 97",
  partyBadgeEn: "Indian National Congress",
  partyBadgeTe: "భారత జాతీయ కాంగ్రెస్",
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(defaultTickerItems);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(defaultHeroConfig);
  const [showThemeSwitcher, setShowThemeSwitcherState] = useState<boolean>(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPin, setAdminPinState] = useState<string>("0000");

  useEffect(() => {
    async function initConfig() {
      try {
        const savedTicker = localStorage.getItem("beerla_ticker_items");
        if (savedTicker) setTickerItems(JSON.parse(savedTicker));

        const savedHero = localStorage.getItem("beerla_hero_config");
        if (savedHero) setHeroConfig(JSON.parse(savedHero));

        const savedSwitcher = localStorage.getItem("beerla_show_switcher");
        if (savedSwitcher !== null) setShowThemeSwitcherState(savedSwitcher === "true");

        const savedPin = localStorage.getItem("beerla_admin_pin");
        if (savedPin) setAdminPinState(savedPin);

        const savedAuth = localStorage.getItem("beerla_admin_auth");
        if (savedAuth === "true") setIsAdminAuthenticated(true);

        // Fetch live Hero & Site Config from Supabase
        const cloudConfig = await fetchSiteConfigFromSupabase();
        if (cloudConfig) {
          setHeroConfig((prev) => ({
            ...prev,
            bgImage: cloudConfig.hero_bg_image || prev.bgImage,
            sideImage: cloudConfig.hero_side_image || prev.sideImage,
            headlineEn: cloudConfig.hero_headline || prev.headlineEn,
            headlineTe: cloudConfig.hero_headline_telugu || prev.headlineTe,
            subtitleEn: cloudConfig.hero_subtitle || prev.subtitleEn,
            subtitleTe: cloudConfig.hero_subtitle_telugu || prev.subtitleTe,
          }));
        }
      } catch (e) {
        console.warn("Using default site config:", e);
      }
    }
    initConfig();
  }, []);

  const setShowThemeSwitcher = (show: boolean) => {
    setShowThemeSwitcherState(show);
    localStorage.setItem("beerla_show_switcher", show ? "true" : "false");
  };

  const saveTicker = (items: TickerItem[]) => {
    setTickerItems(items);
    localStorage.setItem("beerla_ticker_items", JSON.stringify(items));
  };

  const saveHero = (config: HeroConfig) => {
    setHeroConfig(config);
    localStorage.setItem("beerla_hero_config", JSON.stringify(config));

    // Also sync Hero config to Supabase site_config table!
    saveSiteConfigToSupabase({
      hero_bg_image: config.bgImage,
      hero_side_image: config.sideImage,
      hero_headline: config.headlineEn,
      hero_headline_telugu: config.headlineTe,
      hero_subtitle: config.subtitleEn,
      hero_subtitle_telugu: config.subtitleTe,
    });
  };

  const addTickerItem = (item: Omit<TickerItem, "id">) => {
    const newItem = { ...item, id: `t_${Date.now()}` };
    saveTicker([newItem, ...tickerItems]);
  };

  const updateTickerItem = (id: string, updates: Partial<TickerItem>) => {
    const updated = tickerItems.map((it) => (it.id === id ? { ...it, ...updates } : it));
    saveTicker(updated);
  };

  const toggleTickerItem = (id: string) => {
    const updated = tickerItems.map((it) => (it.id === id ? { ...it, active: !it.active } : it));
    saveTicker(updated);
  };

  const deleteTickerItem = (id: string) => {
    const updated = tickerItems.filter((it) => it.id !== id);
    saveTicker(updated);
  };

  const updateHeroConfig = (updates: Partial<HeroConfig>) => {
    const updated = { ...heroConfig, ...updates };
    saveHero(updated);
  };

  const resetToDefaults = () => {
    saveTicker(defaultTickerItems);
    saveHero(defaultHeroConfig);
  };

  const loginAdmin = (pin: string): boolean => {
    // Allows stored PIN, emergency master key '9797', or default '0000'
    if (pin === adminPin || pin === "9797" || pin === "0000") {
      setIsAdminAuthenticated(true);
      localStorage.setItem("beerla_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("beerla_admin_auth");
  };

  const setAdminPin = (newPin: string) => {
    setAdminPinState(newPin);
    localStorage.setItem("beerla_admin_pin", newPin);
  };

  const resetPinWithMasterKey = (recoveryAnswer: string, newPin: string): boolean => {
    const cleanAnswer = recoveryAnswer.trim().toLowerCase();
    // Security verification: Answer '97', '9797', 'alair', or 'beerla2023'
    if (cleanAnswer === "97" || cleanAnswer === "9797" || cleanAnswer === "alair" || cleanAnswer === "beerla2023") {
      setAdminPinState(newPin);
      localStorage.setItem("beerla_admin_pin", newPin);
      setIsAdminAuthenticated(true);
      localStorage.setItem("beerla_admin_auth", "true");
      return true;
    }
    return false;
  };

  return (
    <SiteConfigContext.Provider
      value={{
        tickerItems,
        heroConfig,
        showThemeSwitcher,
        setShowThemeSwitcher,
        addTickerItem,
        updateTickerItem,
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
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}
