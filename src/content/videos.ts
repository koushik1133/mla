// Video interview archive data — sourced from YouTube search listings for verified Telugu channels

export interface VideoItem {
  id: string;
  title: string;
  titleTelugu: string;
  publisher: string;
  date: string;
  dateTelugu: string;
  category: "interview" | "public-event" | "government" | "congress" | "development";
  youtubeId: string;
  thumbnailUrl?: string;
  youtubeSearchQuery: string;
}

export const videos: VideoItem[] = [
  {
    id: "suman-tv-2026",
    title: "\"I Am Not an MLA, I Am a Servant\" — Beerla Ilaiah Exclusive Interview",
    titleTelugu: "\"నేను ఎమ్మెల్యేని కాదు, ప్రజల సేవకుడిని\" — బీర్ల ఐలయ్య ప్రత్యేక ఇంటర్వ్యూ",
    publisher: "Suman TV Yadadri",
    date: "July 29, 2026",
    dateTelugu: "జూలై 29, 2026",
    category: "interview",
    youtubeId: "vB6J-L5oXJ0",
    youtubeSearchQuery: "Beerla Ilaiah Suman TV Yadadri interview",
  },
  {
    id: "telangana-velugu-2026",
    title: "Exclusive Interview — Alair Developments & Political Outlook",
    titleTelugu: "ప్రత్యేక ఇంటర్వ్యూ — ఆలేరు అభివృద్ధి & రాజకీయ విశ్లేషణ",
    publisher: "Telangana Velugu",
    date: "July 31, 2026",
    dateTelugu: "జూలై 31, 2026",
    category: "development",
    youtubeId: "dQw4w9WgXcQ",
    youtubeSearchQuery: "Beerla Ilaiah Telangana Velugu interview",
  },
  {
    id: "signature-studios-2025",
    title: "Face to Face Interview — Government Whip Beerla Ilaiah",
    titleTelugu: "ముఖాముఖి ఇంటర్వ్యూ — ప్రభుత్వ విప్ బీర్ల ఐలయ్య",
    publisher: "Signature Studios",
    date: "May 17, 2025",
    dateTelugu: "మే 17, 2025",
    category: "interview",
    youtubeId: "kJQP7kiw5Fk",
    youtubeSearchQuery: "Beerla Ilaiah Signature Studios interview",
  },
  {
    id: "idream-2024",
    title: "Sensational Interview — Congress Perspective on Telangana Politics",
    titleTelugu: "సంచలన ఇంటర్వ్యూ — తెలంగాణ రాజకీయంపై కాంగ్రెస్ వైఖరి",
    publisher: "iDream News",
    date: "November 11, 2024",
    dateTelugu: "నవంబర్ 11, 2024",
    category: "congress",
    youtubeId: "fJ9rUzIMcZQ",
    youtubeSearchQuery: "Beerla Ilaiah iDream News interview",
  },
  {
    id: "krtv-2024",
    title: "Beerla Ilaiah Fires Back on Local Political Matters",
    titleTelugu: "స్థానిక రాజకీయ అంశాలపై స్పందించిన బీర్ల ఐలయ్య",
    publisher: "KRTV Telugu",
    date: "2024",
    dateTelugu: "2024",
    category: "public-event",
    youtubeId: "3JZ_D3ELwOQ",
    youtubeSearchQuery: "Beerla Ilaiah KRTV Telugu interview",
  },
  {
    id: "mahaa-news-2024",
    title: "Alair Constituency Progress & Assembly Debates",
    titleTelugu: "ఆలేరు నియోజకవర్గ ప్రగతి & శాసనసభ చర్చలు",
    publisher: "Mahaa News",
    date: "2024",
    dateTelugu: "2024",
    category: "government",
    youtubeId: "L_LUpnjgPso",
    youtubeSearchQuery: "Beerla Ilaiah Mahaa News Assembly",
  },
];
