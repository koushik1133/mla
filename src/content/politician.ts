// Core verified profile data for Beerla Ilaiah
// Sources: PRS India, ECI, Wikipedia, Hans India, HelloHyderabad, Poliple

export const politician = {
  name: "Beerla Ilaiah",
  nameTelugu: "బీర్ల ఇలయ్య",
  role: "Member of the Telangana Legislative Assembly",
  roleShort: "MLA",
  roleTeluguShort: "ఎమ్మెల్యే",
  constituency: "Alair",
  constituencyNumber: 97,
  constituencyTelugu: "ఆలేరు",
  district: "Yadadri Bhuvanagiri",
  districtTelugu: "యాదాద్రి భువనగిరి",
  state: "Telangana",
  stateTelugu: "తెలంగాణ",
  party: "Indian National Congress",
  partyShort: "INC",
  partyTelugu: "భారత జాతీయ కాంగ్రెస్",
  termSince: "December 3, 2023",
  // Source: Wikipedia / multiple public profiles
  born: "June 6, 1975",
  birthplace: "Saidapur, Yadadri Bhuvanagiri, Telangana",
  community: "Golla-Kuruma",
  education: "B.A., Sri Laxmi Narasimha Degree College, Bhongir (2000)",
  // Source: Telangana government reporting, news (Dec 2023 appointment)
  additionalRoles: [
    {
      role: "Government Whip, Telangana Legislative Assembly",
      since: "December 2023",
      source: "Multiple news reports, including 2026 reporting",
      confidence: "high" as const,
    },
    {
      role: "President, Yadadri Bhuvanagiri District Congress Committee",
      since: "November 2025",
      source: "Poliple / BCSamachar",
      confidence: "medium" as const,
    },
  ],
  contact: {
    phone: "+91 98666 52347",
    email: "beerlailaiah@gmail.com",
    address: "Aleru (Alair), Yadadri Bhuvanagiri District, Telangana, India",
    office: "MLA Public Office, Main Road, Alair Town",
  },
  social: {
    twitter: "https://twitter.com/IlaiahBeerla",
    twitterHandle: "@IlaiahBeerla",
    instagram: "https://www.instagram.com/beerla_ilaiah_inc",
    instagramHandle: "@beerla_ilaiah_inc",
    instagramFoundation: "https://www.instagram.com/beerla_foundation/",
    instagramFoundationHandle: "@beerla_foundation",
    facebook: "https://www.facebook.com/BeerIaIlaiahINCAlairIncharge/",
    facebookReels: "https://www.facebook.com/BeerIaIlaiahINCAlairIncharge/reels/",
    facebookFollowers: "43K Followers",
  },
  // Hero tagline (neutral public service framing)
  tagline: "Leadership rooted in the people of Alair.",
  taglineTelugu: "ఆలేరు ప్రజల నుండి ఎదిగిన నాయకత్వం.",
} as const;
