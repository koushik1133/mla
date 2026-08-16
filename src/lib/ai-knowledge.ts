export interface KnowledgeTopic {
  keywords: string[];
  responseEn: string;
  responseTe: string;
}

export interface KnowledgeTopic {
  id: string;
  keywords: string[];
  responseEn: string;
  responseTe: string;
  showSocialButtons?: boolean;
}

export const beerlaKnowledge: KnowledgeTopic[] = [
  // 1. TEMPLE & HERITAGE (Priority match for Yadadri / Kolanupaka queries)
  {
    id: "temple",
    keywords: ["yadadri", "temple", "narasimha", "kolanupaka", "jain", "స్వామి", "దేవాలయం", "యాదగిరిగుట్ట", "కొలనుపాక", "క్షేత్రం", "యాదాద్రి"],
    responseEn:
      "Alair Constituency No. 97 is world-renowned for its sacred heritage landmarks: the magnificent Yadadri Sri Lakshmi Narasimha Swamy Temple in Yadagirigutta mandal, the 2,000-year-old historic Kolanupaka Jain & Someswara Temple complex, and the historic Alair Fort. Under MLA Beerla Ilaiah's leadership, major pilgrim amenities, transport infrastructure, and heritage conservation projects are underway.",
    responseTe:
      "ఆలేరు నియోజకవర్గం (సంఖ్య 97) ప్రపంచ ప్రసిద్ధ పుణ్యక్షేత్రాలకు నిలయం: యాదగిరిగుట్ట మండలంలోని శ్రీ యాదగిరి లక్ష్మీ నరసింహ స్వామి ఆలయం, 2,000 సంవత్సరాల ప్రాచీన కొలనుపాక జైన మరియు సోమేశ్వర ఆలయ ప్రాంగణం మరియు ఆలేరు చారిత్రక కోట. ఎమ్మెల్యే బీర్ల ఐలయ్య గారి నేతృత్వంలో భక్తుల వసతులు, రహదారుల విస్తరణ మరియు క్షేత్ర అభివృద్ధి పనులు వేగవంతంగా జరుగుతున్నాయి.",
  },
  // 2. CONTACT & SOCIAL MEDIA (Priority match for Contact queries with action buttons)
  {
    id: "contact",
    keywords: ["contact", "office", "phone", "email", "address", "meet", "facebook", "instagram", "social", "twitter", "సంప్రదించండి", "ఆఫీస్", "ఫోన్", "అడ్రస్", "చిరునామా", "ఫేస్‌బుక్", "ఇన్‌స్టాగ్రామ్", "ట్విట్టర్"],
    responseEn:
      "You can contact MLA Beerla Ilaiah's Public Office at Alair Town, Yadadri Bhuvanagiri District. Click below to directly call, email, or visit official social media profiles:",
    responseTe:
      "బీర్ల ఐలయ్య గారి ఎమ్మెల్యే ప్రజా కార్యాలయం చిరునామా: ఆలేరు టౌన్, యాదాద్రి భువనగిరి జిల్లా. ఎమ్మెల్యే గారిని మరియు వారి బృందాన్ని సంప్రదించడానికి క్రింది సోషల్ మీడియా బటన్లను క్లిక్ చేయండి:",
    showSocialButtons: true,
  },
  // 3. ELECTION 2023 & MANDATES
  {
    id: "election",
    keywords: ["election", "2023", "votes", "margin", "win", "majority", "ఎన్నికలు", "ఓట్లు", "మెజారిటీ", "గెలుపు", "ఫలితాలు"],
    responseEn:
      "In the 2023 Telangana Legislative Assembly Elections, Beerla Ilaiah won Alair Constituency No. 97 as the INC candidate, securing a massive victory margin of 49,636 votes against BRS candidate Gongidi Sunitha.",
    responseTe:
      "2023 తెలంగాణ శాసనసభ ఎన్నికలలో బీర్ల ఐలయ్య గారు ఆలేరు నియోజకవర్గంలో కాంగ్రెస్ అభ్యర్థిగా పోటీ చేసి, 49,636 ఓట్ల భారీ మెజారిటీతో బీఆర్‌ఎస్ అభ్యర్థి గొంగిడి సునీతపై ఘన విజయం సాధించి ఎమ్మెల్యేగా గెలిచారు.",
  },
  // 4. MANDALS & GEOGRAPHY
  {
    id: "mandals",
    keywords: ["alair", "constituency", "mandals", "district", "ఆలేరు", "మండలాలు", "నియోజకవర్గం", "భువనగిరి"],
    responseEn:
      "Alair (Assembly Constituency No. 97) is located in Yadadri Bhuvanagiri district, Telangana. It encompasses 8 mandals: Alair, Rajapet, Yadagirigutta, Turkapally, Gundala, Atmakur (Mandal), Bommala Ramaram, and Motakonduru, with over 2.27 lakh registered voters.",
    responseTe:
      "ఆలేరు (శాసనసభ నియోజకవర్గం సంఖ్య 97) యాదాద్రి భువనగిరి జిల్లాలో ఉంది. ఇందులో 8 మండలాలు ఉన్నాయి: ఆలేరు, రాజాపేట, యాదగిరిగుట్ట, తుర్కపల్లి, గుండాల, ఆత్మకూరు (ఎం), బొమ్మలరామారం, మోటకొండూరు. ఇందులో సుమారు 2.27 లక్షల మంది నమోదిత ఓటర్లు ఉన్నారు.",
  },
  // 5. PARTY & ROLES
  {
    id: "party",
    keywords: ["party", "congress", "inc", "dcc", "whip", "president", "కాంగ్రెస్", "పార్టీ", "విప్", "అధ్యక్షుడు", "డీసీసీ", "డీసీసీ"],
    responseEn:
      "Beerla Ilaiah belongs to the Indian National Congress (INC). He was appointed as Government Whip in the Telangana Legislative Assembly on December 15, 2023, and was appointed President of the Yadadri Bhuvanagiri District Congress Committee (DCC) on November 22, 2025.",
    responseTe:
      "బీర్ల ఐలయ్య గారు భారత జాతీయ కాంగ్రెస్ పార్టీ నాయకులు. 2023 డిసెంబర్ 15న తెలంగాణ శాసనసభలో ప్రభుత్వ విప్‌గా నియామకమయ్యారు. అలాగే 2025 నవంబర్ 22న యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డీసీసీ) అధ్యక్షుడిగా నియమితులయ్యారు.",
  },
  // 6. CAREER & JOURNEY
  {
    id: "journey",
    keywords: ["journey", "career", "sarpanch", "nsui", "history", "ప్రయాణం", "సర్పంచ్", "రాజకీయ", "చరిత్ర", "పాలసంఘం", "ఎంపీటీసీ"],
    responseEn:
      "Beerla Ilaiah's public career began in 1991 as Chairman of the Saidapur Dairy Cooperative Society and NSUI College Secretary. He served as Saidapur Sarpanch (2006), Yadagirigutta Mandal Congress President (2008), MPTC Yadagirigutta Town (2013), TPCC Secretary, INC Alair In-charge, and was elected MLA in December 2023.",
    responseTe:
      "బీర్ల ఐలయ్య గారి ప్రజా సేవ ప్రస్థానం 1991లో సైదాపురం పాలసంఘం చైర్మన్‌గా మరియు ఎన్‌ఎస్‌యూఐ (NSUI) కాలేజీ సెక్రటరీగా ప్రారంభమైంది. 2006లో సైదాపురం సర్పంచ్‌గా, 2008లో యాదగిరిగుట్ట మండల కాంగ్రెస్ అధ్యక్షుడిగా, 2013లో యాదగిరిగుట్ట ఎంపీటీసీగా, టీపీసీసీ కార్యదర్శిగా మరియు ఆలేరు కాంగ్రెస్ ఇన్‌ఛార్జిగా సేవలు అందించి 2023లో ఎమ్మెల్యేగా ఎన్నికయ్యారు.",
  },
  // 7. DEVELOPMENT & SCHEMES
  {
    id: "development",
    keywords: ["development", "work", "bc", "reservation", "schemes", "అభివృద్ధి", "పనులు", "బీసీ", "రిజర్వేషన్లు", "పథకాలు"],
    responseEn:
      "MLA Beerla Ilaiah focuses on rural irrigation canals, drinking water distribution, handloom weaver support schemes, Yadadri pilgrim amenities, 42% BC reservation policy advocacy, and quality healthcare across all 8 mandals of Alair.",
    responseTe:
      "ఎమ్మెల్యే బీర్ల ఐలయ్య గారు ఆలేరు నియోజకవర్గంలోని 8 మండలాల్లో సాగునీటి కాలువల పునరుద్ధరణ, మంచినీటి సరఫరా, చేనేత కార్మికుల సంక్షేమం, యాదగిరిగుట్ట భక్తుల సౌకర్యాలు, 42% బీసీ రిజర్వేషన్ల సాధన మరియు ఉచిత వైద్య ఆరోగ్య సేవలపై ప్రత్యేక దృష్టి సారించారు.",
  },
  // 8. GENERAL BIO / WHO IS (Catch-all for bio queries)
  {
    id: "bio",
    keywords: ["who is", "about", "bio", "biography", "born", "birth", "saidapur", "education", "degree", "ఎవరు", "గురించి", "జననం", "చదువు", "నేపథ్యం"],
    responseEn:
      "Beerla Ilaiah is the Government Whip and Member of the Telangana Legislative Assembly (MLA) representing Alair Constituency No. 97, Yadadri Bhuvanagiri district. He was born on June 6, 1975 in Saidapur village, Yadagirigutta mandal to Beerla Samaraju and Buchamma. His spouse is Anita. He completed schooling at ZPHS Bhongir (1991), Intermediate at Sri Yadagiri Lakshmi Narasimha Swamy College, Alair (1994), and earned his B.A. from Sri Laxmi Narasimha Degree College, Bhongir in 1997.",
    responseTe:
      "బీర్ల ఐలయ్య గారు యాదాద్రి భువనగిరి జిల్లాలోని ఆలేరు శాసనసభ నియోజకవర్గం (సంఖ్య 97) ఎమ్మెల్యే మరియు తెలంగాణ ప్రభుత్వ విప్. ఆయన 1975 జూన్ 6న సైదాపురం గ్రామంలో బీర్ల సామరాజు, బుచ్చమ్మ దంపతులకు జన్మించారు. వీరి జీవిత భాగస్వామి అనిత గారు. 1991లో జిల్లా పరిషత్ హైస్కూల్ భువనగిరిలో పాఠశాల విద్యను, 1994లో ఆలేరు శ్రీ యాదగిరి లక్ష్మీ నరసింహ స్వామి కళాశాలలో ఇంటర్మీడియట్, 1997లో భువనగిరి శ్రీ లక్ష్మీ నరసింహ డిగ్రీ కళాశాల నుండి బి.ఏ. పట్టాను పూర్తి చేశారు.",
  },
];

export function getAIResponseTopic(query: string): KnowledgeTopic | null {
  const normalized = query.toLowerCase().trim();

  // Find best topic match
  for (const topic of beerlaKnowledge) {
    if (topic.keywords.some((kw) => normalized.includes(kw))) {
      return topic;
    }
  }

  return null;
}

export function getAIResponse(query: string, lang: "en" | "te"): string {
  const topic = getAIResponseTopic(query);
  if (topic) {
    return lang === "te" ? topic.responseTe : topic.responseEn;
  }

  // Fallback polite intelligent response
  if (lang === "te") {
    return `ధన్యవాదాలు! బీర్ల ఐలయ్య గారి ఆలేరు నియోజకవర్గ సేవలు, 2023 ఎన్నికల ఫలితాలు, మండలాల వివరాలు, యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయ అభివృద్ధి మరియు ఎమ్మెల్యే కార్యాలయ సమాచారం కోసం మీరు నన్ను అడగవచ్చు.`;
  }
  return `Thank you for reaching out! I can answer any questions regarding Beerla Ilaiah MLA, Alair Constituency No. 97, 2023 election statistics, public welfare works, Yadadri temple, and how to contact the MLA Public Office.`;
}
