"use client";

import React, { useEffect } from "react";
import Hero from "@/components/home/Hero";
import FactStrip from "@/components/home/FactStrip";
import AboutPreview from "@/components/home/AboutPreview";
import JourneyPreview from "@/components/home/JourneyPreview";
import AlairSection from "@/components/home/AlairSection";
import ElectionStats from "@/components/home/ElectionStats";
import VideoSection from "@/components/home/VideoSection";
import NewsPreview from "@/components/home/NewsPreview";
import ContactCTA from "@/components/home/ContactCTA";
import { useTheme } from "@/context/ThemeContext";

export default function GreenThemePage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Automatically set Congress Green theme when entering /green
    setTheme("green");
  }, [setTheme]);

  return (
    <div>
      {/* Full Homepage Components in Green Theme */}
      <Hero />
      <FactStrip />
      <AboutPreview />
      <JourneyPreview />
      <AlairSection />
      <ElectionStats />
      <VideoSection />
      <NewsPreview />
      <ContactCTA />
    </div>
  );
}
