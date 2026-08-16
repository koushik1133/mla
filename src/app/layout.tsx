import type { Metadata } from "next";
import { Manrope, Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import SiteShell from "@/components/layout/SiteShell";

// Self-hosted via next/font: same typefaces as before, but served from our own
// origin with no render-blocking @import chain to fonts.googleapis.com.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display-src",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-src",
  display: "swap",
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-telugu-src",
  display: "swap",
});

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
        // Authentic photograph. The previous file (beerla-portrait.jpg) is a
        // stock-style image of a different person, and it was the image shown
        // whenever this site was shared. Dimensions below are the real ones —
        // a purpose-made 1200x630 share card should replace this when available.
        url: "/images/images.jpeg",
        width: 326,
        height: 417,
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
    <html lang="en-IN" className={`${manrope.variable} ${inter.variable} ${notoTelugu.variable}`}>
      <head>
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
