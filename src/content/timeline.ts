// Political journey milestones — all entries verified against public sources
// Sourced from Wikipedia, Hans India, HelloHyderabad, PRS India

export interface TimelineEntry {
  id: string;
  year: string;
  period?: string;
  periodTelugu?: string;
  title: string;
  titleTelugu: string;
  description: string;
  descriptionTelugu: string;
  category: "education" | "community" | "party" | "government" | "election";
  source: string;
  sourceTelugu: string;
  confidence: "high" | "medium" | "low";
  isMilestone?: boolean;
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "birth",
    year: "1975",
    title: "Born in Saidapur",
    titleTelugu: "సైదాపురంలో జననం",
    description:
      "Beerla Ilaiah was born on June 6, 1975, in Saidapur village, Yadagirigutta mandal, Yadadri Bhuvanagiri district, Telangana, to Beerla Samaraju and Beerla Buchamma. His spouse is Anita.",
    descriptionTelugu:
      "బీర్ల ఐలయ్య గారు 1975 జూన్ 6న యాదాద్రి భువనగిరి జిల్లా, యాదగిరిగుట్ట మండలం, సైదాపురం గ్రామంలో బీర్ల సామరాజు, బుచ్చమ్మ దంపతులకు జన్మించారు. వీరి జీవిత భాగస్వామి అనిత గారు.",
    category: "community",
    source: "Telugu Wikipedia / Official Bio",
    sourceTelugu: "తెలుగు వికీపీడియా / అధికారిక వివరాలు",
    confidence: "high",
  },
  {
    id: "schooling",
    year: "1991",
    title: "Completed High School & Milk Society Chairman",
    titleTelugu: "పాఠశాల విద్య & పాలసంఘం చైర్మన్",
    description:
      "Completed secondary education at Zilla Parishad High School, Bhongir in 1991. In the same year, he was elected Chairman of the Saidapur Dairy Cooperative Society.",
    descriptionTelugu:
      "1991లో యాదాద్రి భువనగిరిలోని జిల్లా పరిషత్ హైస్కూల్‌లో పదవ తరగతి విద్యను పూర్తి చేశారు. అదే ఏడాది సైదాపురం పాలసంఘం చైర్మన్‌గా ఎన్నికయ్యారు.",
    category: "education",
    source: "Telugu Wikipedia",
    sourceTelugu: "తెలుగు వికీపీడియా",
    confidence: "high",
  },
  {
    id: "nsui",
    year: "1994",
    period: "1994 - 1997",
    periodTelugu: "1994 - 1997",
    title: "Intermediate, NSUI Leadership & Degree",
    titleTelugu: "ఇంటర్మీడియట్, ఎన్‌ఎస్‌యూఐ నాయకత్వం & డిగ్రీ",
    description:
      "Completed Intermediate at Sri Yadagiri Lakshmi Narasimha Swamy College, Alair in 1994. Joined NSUI at Sri Laxmi Narasimha Degree College, Bhongir, served as College Secretary, and earned his B.A. degree in 1997.",
    descriptionTelugu:
      "1994లో ఆలేరులోని శ్రీ యాదగిరి లక్ష్మీ నరసింహ స్వామి కళాశాలలో ఇంటర్మీడియట్, 1997లో భువనగిరి శ్రీ లక్ష్మీ నరసింహ డిగ్రీ కళాశాల నుండి బి.ఏ. పట్టా పొందారు. కాలేజీ రోజుల్లోనే ఎన్‌ఎస్‌యూఐ (NSUI) కళాశాల సెక్రటరీగా బాధ్యతలు నిర్వర్తించారు.",
    category: "party",
    source: "Telugu Wikipedia",
    sourceTelugu: "తెలుగు వికీపీడియా",
    confidence: "high",
  },
  {
    id: "sarpanch",
    year: "2006",
    title: "Elected Sarpanch of Saidapur",
    titleTelugu: "సైదాపురం గ్రామ సర్పంచ్‌గా విజయం",
    description:
      "Contested local body elections as Congress candidate and was elected Sarpanch of his native Saidapur village.",
    descriptionTelugu:
      "2006 స్థానిక సంస్థల ఎన్నికలలో కాంగ్రెస్ పార్టీ అభ్యర్థిగా పోటీ చేసి తమ స్వగ్రామమైన సైదాపురం గ్రామ సర్పంచ్‌గా ఎన్నికయ్యారు.",
    category: "community",
    source: "Telugu Wikipedia",
    sourceTelugu: "తెలుగు వికీపీడియా",
    confidence: "high",
    isMilestone: true,
  },
  {
    id: "mandal-president",
    year: "2008",
    title: "Mandal Congress President, Yadagirigutta",
    titleTelugu: "యాదగిరిగుట్ట మండల కాంగ్రెస్ అధ్యక్షుడు",
    description:
      "Appointed Mandal Congress President for Yadagirigutta in 2008, strengthening grassroots party infrastructure.",
    descriptionTelugu:
      "2008లో యాదగిరిగుట్ట మండల కాంగ్రెస్ అధ్యక్షునిగా ఎన్నికై పార్టీ సంస్థాగత బలోపేతానికి కృషి చేశారు.",
    category: "party",
    source: "Telugu Wikipedia",
    sourceTelugu: "తెలుగు వికీపీడియా",
    confidence: "high",
  },
  {
    id: "mptc-tpcc",
    year: "2013",
    title: "MPTC Yadagirigutta Town & TPCC Secretary",
    titleTelugu: "యాదగిరిగుట్ట ఎంపీటీసీ & టీపీసీసీ కార్యదర్శి",
    description:
      "Elected MPTC of Yadagirigutta Town in 2013, later served as TPCC Secretary and Congress In-charge for Alair Constituency.",
    descriptionTelugu:
      "2013లో యాదగిరిగుట్ట టౌన్ ఎంపీటీసీగా ఎన్నికై, టీపీసీసీ కార్యదర్శిగా మరియు ఆలేరు కాంగ్రెస్ పార్టీ ఇన్‌ఛార్జిగా బాధ్యతలు చేపట్టారు.",
    category: "party",
    source: "Telugu Wikipedia",
    sourceTelugu: "తెలుగు వికీపీడియా",
    confidence: "high",
  },
  {
    id: "election-2023",
    year: "2023",
    title: "Elected MLA, Alair Assembly Constituency",
    titleTelugu: "ఆలేరు ఎమ్మెల్యేగా ఘన విజయం",
    description:
      "Contested 2023 Telangana Legislative Assembly election from Alair Constituency No. 97, securing a historic landslide victory with 1,22,140 votes and a massive victory margin of 49,636 votes.",
    descriptionTelugu:
      "2023 తెలంగాణ శాసనసభ ఎన్నికలలో ఆలేరు నియోజకవర్గం (సంఖ్య 97) నుండి కాంగ్రెస్ అభ్యర్థిగా పోటీ చేసి 1,22,140 ఓట్లు మరియు 49,636 ఓట్ల భారీ మెజారిటీతో ఎమ్మెల్యేగా చారిత్రక విజయం సాధించారు.",
    category: "election",
    source: "Election Commission of India / Telugu Wikipedia",
    sourceTelugu: "భారత ఎన్నికల సంఘం / తెలుగు వికీపీడియా",
    confidence: "high",
    isMilestone: true,
  },
  {
    id: "whip",
    year: "2023",
    period: "December 15, 2023",
    periodTelugu: "2023 డిసెంబర్ 15",
    title: "Appointed Government Whip",
    titleTelugu: "తెలంగాణ ప్రభుత్వ విప్‌గా నియామకం",
    description:
      "Appointed as Government Whip in the Telangana Legislative Assembly on December 15, 2023 by the Government of Telangana.",
    descriptionTelugu:
      "2023 డిసెంబర్ 15న తెలంగాణ ప్రభుత్వ విప్‌గా నియమితులై శాసనసభలో కీలక పాత్ర నిర్వర్తిస్తున్నారు.",
    category: "government",
    source: "Government Order / Telugu Wikipedia",
    sourceTelugu: "ప్రభుత్వ ఉత్తర్వులు / తెలుగు వికీపీడియా",
    confidence: "high",
    isMilestone: true,
  },
  {
    id: "dcc-president",
    year: "2025",
    period: "November 22, 2025",
    periodTelugu: "2025 నవంబర్ 22",
    title: "President, Yadadri Bhuvanagiri DCC",
    titleTelugu: "యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ అధ్యక్షుడు",
    description:
      "Appointed President of Yadadri Bhuvanagiri District Congress Committee (DCC) on November 22, 2025.",
    descriptionTelugu:
      "2025 నవంబర్ 22న యాదాద్రి భువనగిరి జిల్లా కాంగ్రెస్ కమిటీ (డీసీసీ) అధ్యక్షుడిగా నియమితులయ్యారు.",
    category: "party",
    source: "AICC / Telugu Wikipedia",
    sourceTelugu: "ఏఐసీసీ / తెలుగు వికీపీడియా",
    confidence: "high",
    isMilestone: true,
  },
];
