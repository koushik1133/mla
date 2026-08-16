// Verified constituency public service activities
// Sourced from Hans India, Suman TV, Telanganatoday, INC releases

export interface ServiceActivity {
  id: string;
  title: string;
  titleTelugu: string;
  description: string;
  descriptionTelugu: string;
  category: string;
  nature: string;
  natureTelugu: string;
  note?: string;
  noteTelugu?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  titleTelugu: string;
  icon: string;
  description: string;
  descriptionTelugu: string;
  activities: ServiceActivity[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "education",
    title: "Education & Youth",
    titleTelugu: "విద్య & యువజన సంక్షేమం",
    icon: "GraduationCap",
    description:
      "Advocating for government schools, college infrastructure, and student welfare across Alair constituency.",
    descriptionTelugu:
      "ఆలేరు నియోజకవర్గవ్యాప్తంగా ప్రభుత్వ పాఠశాలలు, డిగ్రీ కళాశాలల మౌలిక సదుపాయాలు మరియు విద్యార్థుల సంక్షేమం కోసం కృషి.",
    activities: [
      {
        id: "edu-1",
        title: "School Infrastructure Engagement",
        titleTelugu: "పాఠశాల మౌలిక సదుపాయాల మెరుగుదల",
        description:
          "Inspecting and advocating for improvements in ZPHS and government primary schools across the mandals.",
        descriptionTelugu:
          "ఎనిమిది మండలాల్లోని జిల్లా పరిషత్ ఉన్నత పాఠశాలలు మరియు ప్రభుత్వ ప్రాథమిక పాఠశాలల మౌలిక వసతుల పరిశీలన, మెరుగుదలకు కృషి.",
        category: "education",
        nature: "Constituency Work",
        natureTelugu: "నియోజకవర్గ పని",
      },
      {
        id: "edu-2",
        title: "SLNS College Support",
        titleTelugu: "ఎస్‌ఎల్‌ఎన్‌ఎస్ కళాశాల అభివృద్ధి",
        description:
          "Supporting infrastructure upgrades at Sri Laxmi Narasimha Degree College, Bhongir — his alma mater.",
        descriptionTelugu:
          "తమ విద్యాభ్యాస క్షేత్రమైన భువనగిరి శ్రీ లక్ష్మీ నరసింహ డిగ్రీ కళాశాల సౌకర్యాల విస్తరణకు మద్దతు.",
        category: "education",
        nature: "Advocacy",
        natureTelugu: "ప్రజా వినతి",
      },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture & Farmers",
    titleTelugu: "వ్యవసాయం & రైతు సంక్షేమం",
    icon: "Sprout",
    description:
      "Supporting paddy and cotton farmers with irrigation, crop loan assistance, and procurement centers.",
    descriptionTelugu:
      "వరి, పత్తి రైతులకు సాగునీరు, రుణమాఫీ సహాయం మరియు ధాన్యం కొనుగోలు కేంద్రాల ఏర్పాటు ద్వారా మద్దతు.",
    activities: [
      {
        id: "agri-1",
        title: "Paddy & Cotton Farmer Outreach",
        titleTelugu: "వరి & పత్తి రైతుల క్షేత్రస్థాయి సహాయం",
        description:
          "Interacting with farming communities during harvest season to address procurement issues and grain center access.",
        descriptionTelugu:
          "పంట నూర్పిడి సమయంలో కొనుగోలు కేంద్రాల ఏర్పాటు మరియు ధాన్యం సేకరణ సమస్యలపై రైతులతో సమావేశాలు.",
        category: "agriculture",
        nature: "Farmer Support",
        natureTelugu: "రైతు మద్దతు",
      },
      {
        id: "agri-2",
        title: "Irrigation Canal Infrastructure",
        titleTelugu: "సాగునీటి కాలువల పరిశీలన",
        description:
          "Representing local water distribution needs to ensure adequate canal supply for agricultural fields in Alair.",
        descriptionTelugu:
          "ఆలేరు వ్యవసాయ భూములకు సకాలంలో సాగునీరు అందించడానికి కాలువల నిర్వహణ మరియు నీటి పంపిణీ పరిశీలన.",
        category: "agriculture",
        nature: "Representation",
        natureTelugu: "ప్రభుత్వ ప్రాతినిధ్యం",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Roads",
    titleTelugu: "మౌలిక సదుపాయాలు & రహదారులు",
    icon: "Building2",
    description:
      "Focusing on rural road connectivity, Mandal headquarters links, and clean drinking water supply.",
    descriptionTelugu:
      "గ్రామీణ రహదారుల అనుసంధానం, మండల కేంద్రాల రోడ్లు మరియు సురక్షిత మంచినీటి సరఫరా వ్యవస్థల అభివృద్ధి.",
    activities: [
      {
        id: "infra-1",
        title: "Mandal Road Connectivity",
        titleTelugu: "మండల రహదారుల అనుసంధానం",
        description:
          "Advocating for road repairs and BT road laying connecting internal villages to Mandal headquarters.",
        descriptionTelugu:
          "గ్రామాలను మండల కేంద్రాలకు అనుసంధానించే బీటీ రోడ్ల నిర్మాణం మరియు గుంతల మరమ్మతులపై ప్రత్యేక శ్రద్ధ.",
        category: "infrastructure",
        nature: "Development",
        natureTelugu: "అభివృద్ధి పనులు",
      },
      {
        id: "infra-2",
        title: "Drinking Water Supply Audit",
        titleTelugu: "మంచినీటి సరఫరా వ్యవస్థల పరిశీలన",
        description:
          "Reviewing drinking water availability in rural habitations across Alair, Turkapally, and Rajapet mandals.",
        descriptionTelugu:
          "ఆలేరు, తుర్కపల్లి, రాజాపేట మండలాల గ్రామీణ ప్రాంతాల్లో మంచినీటి లభ్యత మరియు పైప్‌లైన్ సరఫరా పరిశీలన.",
        category: "infrastructure",
        nature: "Public Review",
        natureTelugu: "ప్రజా పరిశీలన",
      },
    ],
  },
  {
    id: "welfare",
    title: "Social Welfare & Housing",
    titleTelugu: "సామాజిక సంక్షేమం & గృహనిర్మాణం",
    icon: "Home",
    description:
      "Facilitating access to state government welfare schemes for SC, ST, BC, and economically weaker sections.",
    descriptionTelugu:
      "ఎస్సీ, ఎస్టీ, బీసీ మరియు ఆర్థిక బలహీన వర్గాలకు ప్రభుత్వ సంక్షేమ పథకాలు, పెన్షన్లు సకాలంలో అందేలా కృషి.",
    activities: [
      {
        id: "welfare-1",
        title: "Welfare Scheme Beneficiary Support",
        titleTelugu: "సంక్షేమ పథకాల లబ్ధిదారుల సహాయం",
        description:
          "Ensuring eligible constituents receive pension, healthcare, and welfare scheme documentation support.",
        descriptionTelugu:
          "అర్హులైన నియోజకవర్గ ప్రజలకు పింఛన్లు, ఆరోగ్య భద్రత మరియు సంక్షేమ పథకాల దరఖాస్తులలో సహాయం.",
        category: "welfare",
        nature: "Public Assistance",
        natureTelugu: "ప్రజా సహాయం",
      },
    ],
  },
  {
    id: "tourism",
    title: "Pilgrimage & Heritage",
    titleTelugu: "ఆధ్యాత్మికం & పర్యాటక రంగం",
    icon: "Landmark",
    description:
      "Highlighting Yadadri Sri Lakshmi Narasimha Swamy Temple amenities and Kolanupaka Jain temple heritage.",
    descriptionTelugu:
      "యాదాద్రి శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయ భక్తుల సౌకర్యాలు మరియు కొలనుపాక జైన ఆలయ వారసత్వ పరిరక్షణ.",
    activities: [
      {
        id: "tour-1",
        title: "Yadadri Pilgrim Amenities Advocacy",
        titleTelugu: "యాదాద్రి భక్తుల సౌకర్యాల మెరుగుదల",
        description:
          "Representing local constituent concerns regarding transport, parking, and vendor amenities around Yadadri.",
        descriptionTelugu:
          "యాదాద్రి పుణ్యక్షేత్రానికి వచ్చే భక్తుల రవాణా, పార్కింగ్ మరియు స్థానిక వ్యాపారుల సౌకర్యాలపై అధికారులతో చర్చలు.",
        category: "tourism",
        nature: "Constituency Voice",
        natureTelugu: "ప్రజా సమస్యల పరిష్కారం",
      },
      {
        id: "tour-2",
        title: "Kolanupaka Heritage Awareness",
        titleTelugu: "కొలనుపాక చారిత్రక వారసత్వ పరిరక్షణ",
        description:
          "Supporting conservation of the Kolanupaka Jain Temple, a 2nd-century BC heritage monument within the constituency.",
        descriptionTelugu:
          "ఆలేరు నియోజకవర్గ పరిధిలోని ప్రాచీన కొలనుపాక జైన ఆలయ వారసత్వ పరిరక్షణకు మద్దతు.",
        category: "tourism",
        nature: "Heritage Advocacy",
        natureTelugu: "వారసత్వ పరిరక్షణ",
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
    descriptionTelugu:
      "ఆలేరు నియోజకవర్గంలోని ఎనిమిది మండలాల ప్రజలతో నిరంతర ముఖాముఖి, రచ్చబండ మరియు ప్రజా వినతుల స్వీకరణ.",
    activities: [
      {
        id: "comm-1",
        title: "Public Grievance Redressal",
        titleTelugu: "ప్రజా సమస్యల పరిష్కార వేదిక",
        description:
          "Holding regular constituent interactions to receive petitions, grievance letters, and community representations.",
        descriptionTelugu:
          "ప్రజల నుండి వినతిపత్రాలు, తాగునీరు, రోడ్లు, విద్యుత్ సమస్యల దరఖాస్తుల స్వీకరణ మరియు పరిష్కారం.",
        category: "community",
        nature: "Public Outreach",
        natureTelugu: "ప్రజా సంబంధాలు",
      },
    ],
  },
];
