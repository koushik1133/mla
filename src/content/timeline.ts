// Political journey milestones — all entries verified against public sources
// Sources: Wikipedia, Hans India, HelloHyderabad, PRS India

export interface TimelineEntry {
  id: string;
  year: string;
  period?: string;
  title: string;
  titleTelugu?: string;
  description: string;
  category: "education" | "community" | "party" | "government" | "election";
  source: string;
  confidence: "high" | "medium" | "low";
  isMilestone?: boolean;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "birth",
    year: "1975",
    title: "Born in Saidapur",
    titleTelugu: "సైదాపూర్‌లో జన్మించారు",
    description:
      "Beerla Ilaiah was born on June 6, 1975, in Saidapur village, Yadadri Bhuvanagiri district, Telangana, to Beerla Somajaru and Beerla Buchamma. He belongs to the Golla-Kuruma community.",
    category: "community",
    source: "Wikipedia / HelloHyderabad.org",
    confidence: "medium",
  },
  {
    id: "schooling",
    year: "1991",
    title: "Completed Schooling",
    description:
      "Completed secondary schooling at Zilla Parishad High School, Saidapur.",
    category: "education",
    source: "HelloHyderabad.org / Wikipedia",
    confidence: "medium",
  },
  {
    id: "nsui",
    year: "Early 1990s",
    period: "1990s",
    title: "Joined NSUI — Student Wing of INC",
    titleTelugu: "ఎన్.ఎస్.యు.ఐ లో చేరారు",
    description:
      "His political journey began at Sri Laxmi Narasimha Degree College, Bhongir, where he joined the National Students' Union of India (NSUI), the student wing of the Indian National Congress. He was subsequently elected College Secretary, reflecting early leadership recognition.",
    category: "party",
    source: "Wikipedia / Hans India",
    confidence: "medium",
  },
  {
    id: "ba",
    year: "2000",
    title: "B.A. Degree, Sri Laxmi Narasimha Degree College",
    description:
      "Completed his Bachelor of Arts degree from Sri Laxmi Narasimha Degree College, Bhongir.",
    category: "education",
    source: "Wikipedia / HelloHyderabad.org",
    confidence: "medium",
  },
  {
    id: "sarpanch",
    year: "2006",
    title: "Elected Sarpanch of Saidapur",
    titleTelugu: "సైదాపూర్ సర్పంచ్‌గా ఎన్నికయ్యారు",
    description:
      "Elected as the Sarpanch (village head) of his home village, Saidapur. During his tenure, he focused on infrastructure development, clean water access, and healthcare, establishing a reputation as a grassroots leader.",
    category: "community",
    source: "Wikipedia / Hans India",
    confidence: "medium",
    isMilestone: true,
  },
  {
    id: "mandal-president",
    year: "2008",
    title: "Mandal President, Yadadri Bhuvanagiri",
    titleTelugu: "మండల అధ్యక్షుడు",
    description:
      "Advanced to become Mandal President of Yadadri Bhuvanagiri for the Indian National Congress, expanding his organizational role within the party.",
    category: "party",
    source: "Hans India",
    confidence: "medium",
  },
  {
    id: "alair-incharge",
    year: "2010s",
    period: "Pre-2023",
    title: "Congress In-charge, Alair Assembly Constituency",
    titleTelugu: "ఆలేరు నియోజకవర్గ ఇన్‌చార్జ్",
    description:
      "Appointed as the Indian National Congress in-charge for the Alair Assembly constituency, taking a leading organizational role in building the party's presence and constituency outreach across all eight mandals.",
    category: "party",
    source: "Multiple public sources",
    confidence: "medium",
  },
  {
    id: "election-2023",
    year: "2023",
    title: "Won Alair MLA Election — INC",
    titleTelugu: "ఆలేరు ఎమ్మెల్యేగా ఎన్నికయ్యారు",
    description:
      "Contested and won the 2023 Telangana Legislative Assembly election from Alair Constituency No. 97, receiving 122,140 votes (57.41% vote share) and defeating incumbent BRS candidate Gongidi Sunitha by a margin of 49,636 votes.",
    category: "election",
    source: "Election Commission of India / Business Standard / ADR",
    confidence: "high",
    isMilestone: true,
  },
  {
    id: "mla-sworn",
    year: "2023",
    period: "December 3, 2023",
    title: "Sworn in as MLA",
    titleTelugu: "శాసన సభ్యుడిగా ప్రమాణం",
    description:
      "Took oath as a Member of the Telangana Legislative Assembly on December 3, 2023, representing Alair Constituency No. 97 for the Indian National Congress.",
    category: "government",
    source: "PRS India Legislative Research",
    confidence: "high",
  },
  {
    id: "whip",
    year: "2023",
    period: "December 2023",
    title: "Appointed Government Whip",
    titleTelugu: "ప్రభుత్వ విప్ నియమితులయ్యారు",
    description:
      "Appointed as a Government Whip in the Telangana Legislative Assembly by the Congress government, responsible for ensuring party discipline and coordinating legislative attendance.",
    category: "government",
    source: "News18 / Multiple Telugu news publications",
    confidence: "high",
    isMilestone: true,
  },
  {
    id: "dcc-president",
    year: "2025",
    period: "November 2025",
    title: "President, Yadadri Bhuvanagiri DCC",
    titleTelugu: "యాదాద్రి భువనగిరి డిసిసి అధ్యక్షుడు",
    description:
      "Appointed as the President of the Yadadri Bhuvanagiri District Congress Committee (DCC), further cementing his role as a key Congress leader in the district.",
    category: "party",
    source: "Poliple / BCSamachar",
    confidence: "medium",
    isMilestone: true,
  },
];
