// Political journey milestones — all entries verified against public sources
// Sourced from Wikipedia, Hans India, HelloHyderabad, PRS India

export interface TimelineEntry {
  id: string;
  year: string;
  period?: string;
  title: string;
  titleTelugu: string;
  description: string;
  descriptionTelugu: string;
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
    titleTelugu: "సైదాపూర్‌లో జననం",
    description:
      "Beerla Ilaiah was born on June 6, 1975, in Saidapur village, Yadadri Bhuvanagiri district, Telangana, to Beerla Somajaru and Beerla Buchamma. He belongs to the Golla-Kuruma community.",
    descriptionTelugu:
      "బీర్ల ఇలయ్య గారు 1975 జూన్ 6న తెలంగాణలోని యాదాద్రి భువనగిరి జిల్లా సైదాపూర్ గ్రామంలో బీర్ల సోమజారు, బీర్ల బుచ్చమ్మ దంపతులకు జన్మించారు. వీరు గొల్ల-కురుమ సామాజిక వర్గానికి చెందినవారు.",
    category: "community",
    source: "Wikipedia / HelloHyderabad.org",
    confidence: "medium",
  },
  {
    id: "schooling",
    year: "1991",
    title: "Completed Schooling",
    titleTelugu: "పాఠశాల విద్య పూర్తి",
    description:
      "Completed secondary schooling at Zilla Parishad High School, Saidapur.",
    descriptionTelugu:
      "సైదాపూర్ జిల్లా పరిషత్ ఉన్నత పాఠశాలలో పదవ తరగతి (ఎస్ఎస్సి) విద్యను పూర్తి చేశారు.",
    category: "education",
    source: "HelloHyderabad.org / Wikipedia",
    confidence: "medium",
  },
  {
    id: "nsui",
    year: "Early 1990s",
    period: "1990s",
    title: "Joined NSUI — Student Wing of INC",
    titleTelugu: "ఎన్.ఎస్.యు.ఐ లో ప్రవేశం",
    description:
      "His political journey began at Sri Laxmi Narasimha Degree College, Bhongir, where he joined the National Students' Union of India (NSUI), the student wing of the Indian National Congress. He was subsequently elected College Secretary.",
    descriptionTelugu:
      "భువనగిరి శ్రీ లక్ష్మీ నరసింహ డిగ్రీ కళాశాలలో చదువుతున్న సమయంలో భారత జాతీయ కాంగ్రెస్ విద్యార్థి విభాగమైన ఎన్.ఎస్.యు.ఐ ద్వారా రాజకీయాల్లోకి వచ్చి, కళాశాల కార్యదర్శిగా ఎన్నికయ్యారు.",
    category: "party",
    source: "Wikipedia / Hans India",
    confidence: "medium",
  },
  {
    id: "ba",
    year: "2000",
    title: "B.A. Degree, Sri Laxmi Narasimha Degree College",
    titleTelugu: "బి.ఏ డిగ్రీ పూర్తి",
    description:
      "Completed his Bachelor of Arts degree from Sri Laxmi Narasimha Degree College, Bhongir.",
    descriptionTelugu:
      "భువనగిరి శ్రీ లక్ష్మీ నరసింహ డిగ్రీ కళాశాల నుండి బ్యాచిలర్ ఆఫ్ ఆర్ట్స్ (బి.ఏ) పట్టా పొందారు.",
    category: "education",
    source: "Wikipedia / HelloHyderabad.org",
    confidence: "medium",
  },
  {
    id: "sarpanch",
    year: "2006",
    title: "Elected Sarpanch of Saidapur",
    titleTelugu: "సైదాపూర్ సర్పంచ్‌గా విజయం",
    description:
      "Elected as the Sarpanch (village head) of his home village, Saidapur. During his tenure, he focused on infrastructure development, clean water access, and healthcare, establishing a reputation as a grassroots leader.",
    descriptionTelugu:
      "తమ స్వగ్రామమైన సైదాపూర్ సర్పంచ్‌గా ఘన విజయం సాధించి, గ్రామంలో రోడ్లు, మంచినీరు, వైద్య సదుపాయాల కల్పనకు కృషి చేసి ప్రజాదరణ పొందారు.",
    category: "community",
    source: "Wikipedia / Hans India",
    confidence: "medium",
    isMilestone: true,
  },
  {
    id: "mandal-president",
    year: "2008",
    title: "Mandal President, Yadadri Bhuvanagiri",
    titleTelugu: "మండల కాంగ్రెస్ అధ్యక్షుడు",
    description:
      "Advanced to become Mandal President of Yadadri Bhuvanagiri for the Indian National Congress, expanding his organizational role within the party.",
    descriptionTelugu:
      "భారత జాతీయ కాంగ్రెస్ పార్టీ యాదాద్రి భువనగిరి మండల అధ్యక్షుడిగా ఎన్నికై పార్టీ బలోపేతానికి కృషి చేశారు.",
    category: "party",
    source: "Hans India",
    confidence: "medium",
  },
  {
    id: "alair-incharge",
    year: "2010s",
    period: "Pre-2023",
    title: "Congress In-charge, Alair Assembly Constituency",
    titleTelugu: "ఆలేరు నియోజకవర్గ కాంగ్రెస్ ఇన్‌చార్జ్",
    description:
      "Appointed as the Indian National Congress in-charge for the Alair Assembly constituency, taking a leading organizational role in building the party's presence and constituency outreach across all eight mandals.",
    descriptionTelugu:
      "ఆలేరు శాసనసభ నియోజకవర్గ కాంగ్రెస్ పార్టీ ఇన్‌చార్జ్‌గా బాధ్యతలు చేపట్టి ఎనిమిది మండలాల్లో ప్రజాపోరాటాలు, పార్టీ కార్యక్రమాలు నిర్వహించారు.",
    category: "party",
    source: "Multiple public sources",
    confidence: "medium",
  },
  {
    id: "election-2023",
    year: "2023",
    title: "Won Alair MLA Election — INC",
    titleTelugu: "ఆలేరు ఎమ్మెల్యేగా ఘన విజయం",
    description:
      "Contested and won the 2023 Telangana Legislative Assembly election from Alair Constituency No. 97, receiving 122,140 votes (57.41% vote share) and defeating incumbent BRS candidate Gongidi Sunitha by a margin of 49,636 votes.",
    descriptionTelugu:
      "2023 తెలంగాణ శాసనసభ ఎన్నికలలో ఆలేరు నియోజకవర్గం 97 నుండి పోటీ చేసి 1,22,140 ఓట్లు (57.41% ఓట్ల శాతం) సాధించి 49,636 ఓట్ల భారీ మెజార్టీతో విజయం సాధించారు.",
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
    titleTelugu: "శాసనసభ్యుడిగా ప్రమాణస్వీకారం",
    description:
      "Took oath as a Member of the Telangana Legislative Assembly on December 3, 2023, representing Alair Constituency No. 97 for the Indian National Congress.",
    descriptionTelugu:
      "2023 డిసెంబర్ 3న తెలంగాణ శాసనసభలో ఆలేరు శాసనసభ్యుడిగా ప్రమాణస్వీకారం చేశారు.",
    category: "government",
    source: "PRS India Legislative Research",
    confidence: "high",
  },
  {
    id: "whip",
    year: "2023",
    period: "December 2023",
    title: "Appointed Government Whip",
    titleTelugu: "తెలంగాణ ప్రభుత్వ విప్‌గా నియామకం",
    description:
      "Appointed as a Government Whip in the Telangana Legislative Assembly by the Congress government, responsible for ensuring party discipline and coordinating legislative attendance.",
    descriptionTelugu:
      "తెలంగాణ శాసనసభలో కాంగ్రెస్ ప్రభుత్వం తరఫున ప్రభుత్వ విప్‌గా నియమితులయ్యారు.",
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
    descriptionTelugu:
      "యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డిసిసి) అధ్యక్షుడిగా నియామకమయ్యారు.",
    category: "party",
    source: "Poliple / BCSamachar",
    confidence: "medium",
    isMilestone: true,
  },
];
