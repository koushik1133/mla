import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Beerla Ilaiah — MLA, Alair",
  description:
    "Biography of Beerla Ilaiah — from Saidapur village to the Telangana Legislative Assembly. His journey through NSUI, Sarpanch, Mandal President to MLA Alair constituency, Indian National Congress.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
