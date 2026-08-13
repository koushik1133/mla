import type { Metadata } from "next";
import PublicServicePageContent from "@/components/public-service/PublicServicePageContent";

export const metadata: Metadata = {
  title: "Public Service — Beerla Ilaiah MLA, Alair",
  description:
    "Public service activities and constituency engagement by Beerla Ilaiah, MLA Alair No. 97. Education, agriculture, infrastructure, welfare, tourism, and community engagement across Alair constituency.",
};

export default function PublicServicePage() {
  return <PublicServicePageContent />;
}
