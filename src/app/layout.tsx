import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://beerla-ilaiah.in"),
  title: {
    default: "Beerla Ilaiah | MLA, Alair | Telangana Legislative Assembly",
    template: "%s | Beerla Ilaiah MLA",
  },
  description:
    "Official public profile of Beerla Ilaiah, Member of the Telangana Legislative Assembly representing Alair Constituency No. 97, Yadadri Bhuvanagiri District. Indian National Congress.",
  keywords: [
    "Beerla Ilaiah",
    "Alair MLA",
    "Telangana MLA",
    "Yadadri Bhuvanagiri",
    "Indian National Congress Telangana",
    "Alair constituency",
    "బీర్ల ఐలయ్య",
    "ఆలేరు ఎమ్మెల్యే",
    "తెలంగాణ శాసనసభ",
  ],
  authors: [{ name: "Beerla Ilaiah MLA Office" }],
  openGraph: {
    title: "Beerla Ilaiah | MLA, Alair | Telangana",
    description:
      "Public profile of Beerla Ilaiah, MLA representing Alair Constituency No. 97, Yadadri Bhuvanagiri, Telangana. Indian National Congress.",
    type: "profile",
    locale: "en_IN",
    images: [
      {
        url: "/images/beerla-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Beerla Ilaiah — MLA, Alair, Telangana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beerla Ilaiah | MLA, Alair",
    description:
      "Public profile of Beerla Ilaiah, MLA Alair No. 97, Telangana. Indian National Congress.",
    creator: "@IlaiahBeerla",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/congress-hand.png",
    shortcut: "/congress-hand.png",
    apple: "/congress-hand.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Beerla Ilaiah",
              alternateName: "బీర్ల ఐలయ్య",
              jobTitle: "Member of the Telangana Legislative Assembly",
              description:
                "MLA representing Alair Constituency No. 97, Yadadri Bhuvanagiri District, Telangana. Indian National Congress.",
              memberOf: {
                "@type": "GovernmentOrganization",
                name: "Telangana Legislative Assembly",
                url: "https://tslegislature.telangana.gov.in",
              },
              affiliation: {
                "@type": "Organization",
                name: "Indian National Congress",
                url: "https://inc.in",
              },
              sameAs: [
                "https://twitter.com/IlaiahBeerla",
                "https://instagram.com/beerla_ilaiah_inc",
              ],
            }),
          }}
        />
      </head>
      <body>
        <LangProvider>
          <SiteShell>{children}</SiteShell>
        </LangProvider>
      </body>
    </html>
  );
}
