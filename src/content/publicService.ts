// Public service activities / constituency engagement categories
// Important: Only include activities that can be described in general terms based on public reporting.
// Do NOT fabricate specific project counts, beneficiary numbers, or scheme names.

export interface ServiceCategory {
  id: string;
  title: string;
  titleTelugu: string;
  icon: string;
  description: string;
  image?: string;
  activities: ServiceActivity[];
}

export interface ServiceActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  nature: "participation" | "initiative" | "engagement" | "advocacy";
  note?: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "education",
    title: "Education",
    titleTelugu: "విద్య",
    icon: "GraduationCap",
    description:
      "Engaging with schools and colleges across all eight mandals to support educational development and access in Alair constituency.",
    activities: [
      {
        id: "edu-1",
        title: "School Infrastructure Engagement",
        description:
          "Public engagement with school and educational institution development in mandals across the constituency, including Zilla Parishad schools.",
        category: "education",
        nature: "engagement",
      },
      {
        id: "edu-2",
        title: "Higher Education Access",
        description:
          "Engagement with degree college accessibility in Bhongir and surrounding areas serving Alair constituency students.",
        category: "education",
        nature: "advocacy",
      },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture",
    titleTelugu: "వ్యవసాయం",
    icon: "Sprout",
    description:
      "Alair constituency is predominantly agricultural, with paddy, cotton, and sugarcane cultivation. Constituency-level engagement with farming communities and agricultural support programmes.",
    image: "/images/alair-agriculture.jpg",
    activities: [
      {
        id: "agri-1",
        title: "Farmer Community Engagement",
        description:
          "Public meetings and outreach with farming communities across the eight mandals on agricultural welfare and government scheme access.",
        category: "agriculture",
        nature: "engagement",
      },
      {
        id: "agri-2",
        title: "Agricultural Infrastructure",
        description:
          "Constituency-level advocacy for irrigation and rural road infrastructure serving agricultural communities.",
        category: "agriculture",
        nature: "advocacy",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    titleTelugu: "మౌలిక సదుపాయాలు",
    icon: "Building2",
    description:
      "Road connectivity, rural infrastructure, and public works engagement across Alair, Rajapet, Yadagirigutta, Turkapally, Gundala, Atmakur, Bommala Ramaram, and Motakondur mandals.",
    activities: [
      {
        id: "infra-1",
        title: "Rural Connectivity",
        description:
          "Advocacy and engagement for road and transport infrastructure development across mandals within the constituency.",
        category: "infrastructure",
        nature: "advocacy",
      },
    ],
  },
  {
    id: "welfare",
    title: "Housing & Welfare",
    titleTelugu: "గృహనిర్మాణం & సంక్షేమం",
    icon: "Home",
    description:
      "Engagement with government welfare and housing programmes serving eligible residents across Alair constituency.",
    activities: [
      {
        id: "welfare-1",
        title: "Government Welfare Outreach",
        description:
          "Public participation in welfare scheme awareness and community support activities across the constituency.",
        category: "welfare",
        nature: "participation",
      },
    ],
  },
  {
    id: "tourism",
    title: "Tourism & Heritage",
    titleTelugu: "పర్యాటకం & వారసత్వం",
    icon: "Landmark",
    description:
      "Yadagirigutta — home to the Yadadri Sri Lakshmi Narasimha Swamy Temple — is a major pilgrimage and tourism destination within the constituency. Supporting Yadadri temple development and heritage preservation.",
    image: "/images/yadadri-temple.jpg",
    activities: [
      {
        id: "tourism-1",
        title: "Yadadri Temple Development",
        description:
          "Supporting the Telangana government's Yadadri temple renovation and development initiative, which has transformed Yadagirigutta into a major pilgrimage centre.",
        category: "tourism",
        nature: "participation",
        note: "Temple renovation is a Telangana government initiative — MLA's role is constituency-level support and engagement.",
      },
      {
        id: "tourism-2",
        title: "Kolanupaka Heritage Preservation",
        description:
          "Supporting conservation of the Kolanupaka Jain Temple, a 2nd-century BC heritage monument within the constituency.",
        category: "tourism",
        nature: "advocacy",
      },
    ],
  },
  {
    id: "community",
    title: "Community Engagement",
    titleTelugu: "ప్రజా భాగస్వామ్యం",
    icon: "Users",
    description:
      "Regular public meetings, community outreach, and constituent engagement across the eight mandals of Alair constituency.",
    activities: [
      {
        id: "community-1",
        title: "Constituency Public Meetings",
        description:
          "Regular public meetings and constituency visits across all eight mandals — Alair, Rajapet, Yadagirigutta, Turkapally, Gundala, Atmakur, Bommala Ramaram, and Motakondur.",
        category: "community",
        nature: "engagement",
      },
      {
        id: "community-2",
        title: "Women and Youth Outreach",
        description:
          "Public engagement with women's groups and youth organisations within the constituency.",
        category: "community",
        nature: "engagement",
      },
    ],
  },
];
