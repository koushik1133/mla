// Alair Constituency data — verified sources
// Source: Wikipedia, News18, ECI

export const constituency = {
  name: "Alair",
  nameTelugu: "ఆలేరు",
  number: 97,
  district: "Yadadri Bhuvanagiri",
  districtTelugu: "యాదాద్రి భువనగిరి",
  state: "Telangana",
  stateTelugu: "తెలంగాణ",
  lokSabhaConstituency: "Bhongir",
  lokSabhaConstituencyTelugu: "భువనగిరి",
  category: "General",
  categoryTelugu: "జనరల్",
  region: "South Telangana",
  // Source: ECI / News18
  electoralData: {
    totalElectors: 227738,
    maleElectors: 114476,
    femaleElectors: 113262,
    sexRatio: "991 female per 1000 male voters",
    sexRatioTelugu: "1000 మంది పురుషులకు 991 మంది మహిళా ఓటర్లు",
    scPopulationPercent: 17.13,
    stPopulationPercent: 6.73,
    source: "News18 / ECI 2023",
  },
  // Source: Wikipedia
  mandals: [
    { name: "Alair", nameTelugu: "ఆలేరు", isHeadquarters: true },
    { name: "Rajapet", nameTelugu: "రాజాపేట", isHeadquarters: false },
    { name: "Yadagirigutta", nameTelugu: "యాదగిరిగుట్ట", isHeadquarters: false },
    { name: "Turkapally", nameTelugu: "తుర్కపల్లి", isHeadquarters: false },
    { name: "Gundala", nameTelugu: "గుండాల", isHeadquarters: false },
    { name: "Atmakur (M)", nameTelugu: "ఆత్మకూరు (మ)", isHeadquarters: false },
    { name: "Bommala Ramaram", nameTelugu: "బొమ్మల రామారం", isHeadquarters: false },
    { name: "Motakondur", nameTelugu: "మోటకొండూరు", isHeadquarters: false },
  ],
  // Source: Wikipedia / The Hindu
  keyLandmarks: [
    {
      name: "Yadadri Sri Lakshmi Narasimha Swamy Temple",
      nameTelugu: "యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం",
      description:
        "One of Telangana's most sacred temples, situated atop Yadagirigutta hill. Often referred to as 'Telangana's Tirupati', the renovated temple complex is an architectural marvel.",
      descriptionTelugu:
        "యాదగిరిగుట్ట కొండపై కొలువైన తెలంగాణలోని అత్యంత పవిత్రమైన పుణ్యక్షేత్రం. 'తెలంగాణ తిరుపతి'గా ప్రసిద్ధి చెందిన ఈ ఆధ్యాత్మిక క్షేత్రం అత్యద్భుత రాతి శిల్పకళతో పునర్నిర్మించబడింది.",
      significance: "Religious & Tourism",
      significanceTelugu: "ఆధ్యాత్మికం & పర్యాటకం",
      image: "/images/yadadri-temple.jpg",
    },
    {
      name: "Kolanupaka Jain Temple",
      nameTelugu: "కొలనుపాక జైన దేవాలయం",
      description:
        "A historic Jain temple dating back to the 2nd century BC, located within the constituency. An important pilgrimage site and heritage monument.",
      descriptionTelugu:
        "క్రీస్తు పూర్వం 2వ శతాబ్దానికి చెందిన చారిత్రక జైన దేవాలయం. ఆలేరు నియోజకవర్గ పరిధిలోని ప్రముఖ పురాతన వారసత్వ పుణ్యక్షేత్రం.",
      significance: "Cultural Heritage",
      significanceTelugu: "సాంస్కృతిక వారసత్వం",
      image: "/images/kolanupaka-temple.jpg",
    },
    {
      name: "Alair Town",
      nameTelugu: "ఆలేరు పట్టణం",
      description:
        "The constituency headquarters and a municipal town serving as an important commercial and administrative centre for the surrounding mandals.",
      descriptionTelugu:
        "నియోజకవర్గ కేంద్రమైన పురపాలక పట్టణం. చుట్టుపక్కల మండలాలకు వాణిజ్య, పరిపాలనా కేంద్రంగా సేవలందిస్తోంది.",
      significance: "Administration & Commerce",
      significanceTelugu: "పరిపాలన & వాణిజ్యం",
      image: "/images/alair-development.jpg",
    },
  ],
  character:
    "A predominantly rural constituency with a mix of agricultural and industrial activities. Agriculture includes paddy, cotton, and sugarcane cultivation. Yadagirigutta is a major religious tourism destination attracting pilgrims from across Telangana.",
  characterTelugu:
    "వరి, పత్తి, చెరకు పంటలతో కూడిన ప్రధాన వ్యవసాయ నియోజకవర్గం. యాదగిరిగుట్ట పుణ్యక్షేత్రం తెలంగాణ వ్యాప్తంగా లక్షలాది భక్తులను ఆకర్షించే ప్రముఖ ఆధ్యాత్మిక పర్యాటక కేంద్రం.",
};
