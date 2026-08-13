import type { Metadata } from "next";
import AlairPageContent from "@/components/alair/AlairPageContent";

export const metadata: Metadata = {
  title: "Alair Constituency No. 97 — Yadadri Bhuvanagiri, Telangana",
  description:
    "Alair Assembly Constituency No. 97, Yadadri Bhuvanagiri District, Telangana. Eight mandals, 2.27 lakh registered voters. Home to the Yadadri Sri Lakshmi Narasimha Swamy Temple.",
};

export default function AlairPage() {
  return <AlairPageContent />;
}
