// Alair Constituency data — verified sources
// Source: Wikipedia, News18, ECI

export const constituency = {
  name: "Alair",
  nameTelugu: "ఆలేరు",
  number: 97,
  district: "Yadadri Bhuvanagiri",
  districtTelugu: "యాదాద్రి భువనగిరి",
  state: "Telangana",
  lokSabhaConstituency: "Bhongir",
  category: "General",
  region: "South Telangana",
  // Source: ECI / News18
  electoralData: {
    totalElectors: 227738,
    maleElectors: 114476,
    femaleElectors: 113262,
    sexRatio: "991 female per 1000 male voters",
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
        "One of Telangana's most sacred temples, situated atop Yadagirigutta hill. Often referred to as 'Telangana's Tirupati', the renovated temple complex — completed in 2022 — is an architectural marvel with intricate stone carvings and golden vimana gopuram.",
      significance: "Religious & Tourism",
      image: "/images/yadadri-temple.jpg",
    },
    {
      name: "Kolanupaka Jain Temple",
      description:
        "A historic Jain temple dating back to the 2nd century BC, located within the constituency. An important pilgrimage site and heritage monument.",
      significance: "Cultural Heritage",
    },
    {
      name: "Alair Town",
      description:
        "The constituency headquarters and a municipal town serving as an important commercial and administrative centre for the surrounding mandals.",
      significance: "Administration & Commerce",
    },
  ],
  character:
    "A predominantly rural constituency with a mix of agricultural and industrial activities. Agriculture includes paddy, cotton, and sugarcane cultivation. Yadagirigutta is a major religious tourism destination attracting pilgrims from across Telangana.",
};
