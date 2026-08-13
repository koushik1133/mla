import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FactStrip from "@/components/home/FactStrip";
import AboutPreview from "@/components/home/AboutPreview";
import JourneyPreview from "@/components/home/JourneyPreview";
import AlairSection from "@/components/home/AlairSection";
import ElectionStats from "@/components/home/ElectionStats";
import VideoSection from "@/components/home/VideoSection";
import NewsPreview from "@/components/home/NewsPreview";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Beerla Ilaiah | MLA, Alair | Telangana Legislative Assembly",
  description:
    "Beerla Ilaiah — Member of the Telangana Legislative Assembly, Alair Constituency No. 97. Government Whip & District Congress President, Yadadri Bhuvanagiri. Indian National Congress.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FactStrip />
      <AboutPreview />
      <JourneyPreview />
      <AlairSection />
      <ElectionStats />
      <VideoSection />
      <NewsPreview />
      <ContactCTA />
    </>
  );
}
