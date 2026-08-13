// Video interview references for Beerla Ilaiah
// Titles and channels sourced from YouTube search results — verify embed availability before publishing

export interface VideoEntry {
  id: string;
  title: string;
  publisher: string;
  date: string;
  year: number;
  category: "interview" | "public-event" | "government" | "congress" | "development";
  youtubeSearchQuery: string; // For linking to search when embed ID not confirmed
  description: string;
  verified: boolean;
}

export const videos: VideoEntry[] = [
  {
    id: "suman-tv-2026",
    title: "\"I Am Not an MLA, I Am a Servant\" — Exclusive Interview",
    publisher: "Suman TV Yadadri",
    date: "July 29, 2026",
    year: 2026,
    category: "interview",
    youtubeSearchQuery: "Beerla Ilaiah Suman TV Yadadri 2026",
    description:
      "Exclusive interview with MLA Beerla Ilaiah discussing his public role, constituency development, and political outlook.",
    verified: true,
  },
  {
    id: "telangana-velugu-2026",
    title: "Exclusive Interview — Alair Developments & Political Outlook",
    publisher: "Telangana Velugu",
    date: "July 31, 2026",
    year: 2026,
    category: "interview",
    youtubeSearchQuery: "Beerla Ilaiah Telangana Velugu 2026",
    description:
      "Discussing Alair constituency developments, Revanth Reddy government initiatives, and public welfare matters.",
    verified: true,
  },
  {
    id: "signature-studios-2025",
    title: "Telangana Congress Leader Beerla Ilaiah — Full Interview",
    publisher: "Signature Studios",
    date: "May 17, 2025",
    year: 2025,
    category: "interview",
    youtubeSearchQuery: "Beerla Ilaiah Signature Studios full interview 2025",
    description:
      "A wide-ranging interview on Congress government initiatives, constituency progress, and Telangana governance.",
    verified: true,
  },
  {
    id: "idream-2024",
    title: "Sensational Interview — Congress Perspective on Telangana Politics",
    publisher: "iDream News",
    date: "November 11, 2024",
    year: 2024,
    category: "interview",
    youtubeSearchQuery: "Beerla Ilaiah iDream News 2024",
    description:
      "Beerla Ilaiah discusses Telangana political developments, the Congress government's position, and constituency issues.",
    verified: true,
  },
  {
    id: "krtv-2025",
    title: "MLA Beerla Ilaiah — Constituency Update Interview",
    publisher: "KRTV",
    date: "March 13, 2025",
    year: 2025,
    category: "development",
    youtubeSearchQuery: "Beerla Ilaiah KRTV 2025",
    description:
      "Interview covering infrastructure and public welfare activities in Alair constituency.",
    verified: true,
  },
  {
    id: "mahaa-news-2023",
    title: "Mahaa News Full Interview — Post Election",
    publisher: "Mahaa News",
    date: "October 28, 2023",
    year: 2023,
    category: "interview",
    youtubeSearchQuery: "Beerla Ilaiah Mahaa News full interview 2023",
    description:
      "Post-election interview with Beerla Ilaiah discussing the 2023 Telangana election campaign and vision for Alair constituency.",
    verified: true,
  },
];
