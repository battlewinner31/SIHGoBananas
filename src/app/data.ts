export interface Challenge {
  id: string;
  title: string;
  department: string;
  area: string;
  description: string;
  requirements: string[];
  expectedOutcomes: string[];
  deadline: string;
  status: "Open" | "In Review" | "Closed" | "Pilot";
  applications: number;
}

export interface DeploymentRecord {
  location: string;
  date?: string;
  description: string;
  results?: string[];
  stats?: Array<{ label: string; value: string }>;
  note?: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  about: string;
  solution: string;
  solutionProducts?: Array<{ name: string; points: string[] }>;
  areas: string[];
  technologies: string[];
  technologyNotes?: string;
  experience: string;
  experienceItems?: string[];
  deployments: string[];
  deploymentRecords?: DeploymentRecord[];
  deploymentNote?: string;
  founded: string;
  location: string;
  teamSize: string;
  website: string;
  // Extended company info
  founders?: Array<{ name: string; role: string }>;
  cin?: string;
  dpiitNumber?: string;
  incubatedAt?: string;
  sector?: string;
  recognitions?: string[];
  companyFiguresNote?: string;
  trlLevel?: string;
  verifiedBy?: string;
  fundingInfo?: string;
  patentsFiled?: string;
  productsInDeployment?: string;
  supportPrograms?: string[];
}

export const SOLUTION_AREAS = [
  { id: "waste-management", label: "Waste Management", icon: "Trash2", description: "Smart waste collection, recycling, and urban sanitation" },
  { id: "agriculture", label: "Agriculture", icon: "Sprout", description: "Precision farming, crop monitoring, and agri-supply chain" },
  { id: "healthcare", label: "Healthcare", icon: "HeartPulse", description: "Digital health, telemedicine, and public health systems" },
  { id: "education", label: "Education", icon: "BookOpen", description: "EdTech, learning management, and skill development" },
  { id: "smart-infrastructure", label: "Smart Infrastructure", icon: "Building2", description: "Smart cities, IoT, and urban management" },
  { id: "energy", label: "Energy", icon: "Zap", description: "Renewable energy, smart grids, and energy efficiency" },
  { id: "transportation", label: "Transportation", icon: "Bus", description: "Mobility, logistics, and public transit" },
  { id: "public-services", label: "Public Services", icon: "Landmark", description: "e-Governance, citizen services, and digital delivery" },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "ch-001",
    title: "Real-Time Waste Monitoring in Urban Municipal Areas",
    department: "Ministry of Housing and Urban Affairs",
    area: "waste-management",
    description: "Municipal corporations in Tier-2 cities struggle with inefficient waste collection routes and overflowing bins. We need an IoT-based monitoring solution that provides real-time bin-fill levels and optimises collection schedules to reduce operational costs by at least 30%.",
    requirements: [
      "IoT sensors compatible with existing municipal infrastructure",
      "Mobile dashboard accessible to field supervisors",
      "Data integration with existing ERP systems",
      "Minimum 6-month pilot deployment plan",
    ],
    expectedOutcomes: [
      "30% reduction in collection fuel costs",
      "Real-time visibility of 500+ bins across pilot zone",
      "Reduced citizen complaints by 40%",
    ],
    deadline: "2024-12-31",
    status: "Open",
    applications: 14,
  },
  {
    id: "ch-002",
    title: "Digital Crop Advisory for Small and Marginal Farmers",
    department: "Ministry of Agriculture & Farmers Welfare",
    area: "agriculture",
    description: "Over 80% of Indian farmers are small and marginal with limited access to timely agronomic advice. We are looking for a multilingual digital advisory system that delivers personalised crop recommendations based on soil health, weather, and market data via low-end smartphones.",
    requirements: [
      "Works on 2G/3G networks with offline functionality",
      "Support for at least 10 regional languages",
      "Integration with IMD weather API and mKisan portal",
      "Simple UX suitable for low-digital-literacy users",
    ],
    expectedOutcomes: [
      "20% increase in crop yield for pilot cohort",
      "Reach 10,000 farmers in the first season",
      "Reduction in input costs through optimised advisory",
    ],
    deadline: "2025-03-31",
    status: "Open",
    applications: 22,
  },
  {
    id: "ch-003",
    title: "Telemedicine Platform for Primary Health Centres in Remote Areas",
    department: "Ministry of Health and Family Welfare",
    area: "healthcare",
    description: "Primary Health Centres in Aspirational Districts face acute shortages of specialist doctors. We require a telemedicine solution enabling PHC staff to connect with specialist doctors at district hospitals for live consultations, with integrated EHR and prescription workflows.",
    requirements: [
      "Low-bandwidth video consultation (works below 1 Mbps)",
      "Interoperability with ABDM Health ID",
      "Digital prescription generation and pharmacy linkage",
      "HIPAA/IT Act 2000 compliant data storage",
    ],
    expectedOutcomes: [
      "Specialist consultation availability at 50 PHCs",
      "Reduction in patient referral travel by 60%",
      "Patient wait time reduced to under 30 minutes",
    ],
    deadline: "2025-06-30",
    status: "In Review",
    applications: 18,
  },
  {
    id: "ch-004",
    title: "Smart Street Lighting Management System",
    department: "Ministry of Power",
    area: "smart-infrastructure",
    description: "Urban local bodies manage thousands of street lights manually, leading to energy wastage and delayed fault reporting. We need an automated smart lighting system with central monitoring, adaptive dimming, and predictive maintenance capabilities for large municipal deployments.",
    requirements: [
      "Centralized SCADA-compatible control dashboard",
      "Adaptive dimming based on traffic and ambient conditions",
      "Automated fault detection and ticketing",
      "Minimum 5-year hardware lifecycle",
    ],
    expectedOutcomes: [
      "Energy savings of at least 40%",
      "95% uptime SLA for street lighting",
      "Reduced manual inspection costs by 50%",
    ],
    deadline: "2024-11-30",
    status: "Pilot",
    applications: 9,
  },
  {
    id: "ch-005",
    title: "Last-Mile Connectivity for Rural Public Distribution System",
    department: "Department of Food and Public Distribution",
    area: "public-services",
    description: "Fair price shops in remote areas face connectivity issues that disrupt ration distribution through the PDS system. We need an offline-first solution for ration card verification and transaction logging that syncs with the central NFS database when connectivity is available.",
    requirements: [
      "Offline-first architecture with eventual consistency",
      "Aadhaar-based biometric authentication",
      "Tampering-resistant transaction logs",
      "Support for Android devices at FPS shops",
    ],
    expectedOutcomes: [
      "Uninterrupted ration distribution in 200+ remote FPS",
      "Zero transaction data loss during connectivity outages",
      "Reduction in diversion/leakage by 25%",
    ],
    deadline: "2025-02-28",
    status: "Open",
    applications: 11,
  },
  {
    id: "ch-006",
    title: "AI-Assisted Skill Gap Analysis for ITI Students",
    department: "Ministry of Skill Development and Entrepreneurship",
    area: "education",
    description: "Industrial Training Institutes need better tools to match student skill development with industry demand. We are looking for a platform that analyses student performance data and industry job postings to recommend personalised learning paths and identify skill gaps at scale.",
    requirements: [
      "Integration with NCVT MIS student database (API)",
      "Industry demand data sourcing from job boards",
      "Dashboard for ITI principals and DGET officials",
      "Multi-language interface for students",
    ],
    expectedOutcomes: [
      "Placement improvement of 25% in pilot ITIs",
      "Quarterly skill gap reports for 10 industry sectors",
      "Student self-paced learning module adoption",
    ],
    deadline: "2025-04-30",
    status: "Open",
    applications: 7,
  },
];

export const STARTUPS: Startup[] = [
  // ── Waste Management: 6 real India-based startups ──────────────────────────
  {
    id: "wm-001",
    name: "Ishitva Robotic Systems",
    tagline: "AI-powered waste sorting, material recovery and recycling automation",
    about: "Ishitva Robotic Systems is an Indian deep-tech company focused on AI-powered waste sorting, material recovery and recycling automation. The company develops intelligent sorting systems that use artificial intelligence, machine vision, deep learning and automation to identify and separate materials from complex waste streams. Its proprietary technology platform, ishitvAI, is described by the company as being powered by a large waste-classification image library and AI models trained on real-world data. Solutions are designed to improve material recovery, purity, efficiency and scalability while reducing dependence on manual sorting.",
    solution: "Ishitva develops automated sorting and material-recovery systems for recycling facilities and municipal waste streams. For Municipal Solid Waste, Ishitva describes autonomous MRF systems capable of identifying and separating recoverable materials in real time, configurable from approximately 10 to 500 TPD. The company states its systems can detect 80+ categories of recyclates for MSW applications.",
    solutionProducts: [
      { name: "NETRA", points: ["Machine Vision System for real-time material identification"] },
      { name: "SUKA", points: ["AI-Powered Air Sorter"] },
      { name: "YUTA", points: ["AI-Powered Robotic Sorting arm"] },
      { name: "SANJIVANI", points: ["Autonomous Material Recovery Facility (MRF)", "Configurable capacity: ~10 to 500 TPD"] },
      { name: "Ishitva Flake Analyzer", points: ["Quality analysis for recycled flake output"] },
      { name: "Ishitva Flake Sorter", points: ["Automated flake sorting by material type"] },
      { name: "Ishitva PET1", points: ["Dedicated PET material sorting system"] },
      { name: "IoT-enabled Smart Bin", points: ["Connected waste collection endpoint"] },
    ],
    areas: ["waste-management"],
    technologies: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Deep Learning", "Robotics", "Industrial Automation", "Machine Vision", "Hyperspectral Vision", "IoT", "Cloud Analytics", "Real-Time Material Classification", "Automated Waste Sorting", "Autonomous MRFs", "Plant Automation", "PLC / SCADA", "Data Analytics"],
    technologyNotes: "The company states that its systems can detect 80+ categories of recyclates for municipal solid waste applications.",
    experience: "Ishitva states that it has worked closely with 50+ recyclers and has developed sorting solutions for plastics, municipal solid waste, textiles, food, metals and other material streams.",
    experienceItems: ["50+ recycler partnerships (company-stated figure)", "Municipal solid waste processing", "Plastics and PET sorting", "Textiles sorting", "Food waste processing", "Metals sorting", "Multi-material stream handling"],
    deployments: [],
    deploymentRecords: [
      {
        location: "Dodhia Group — Prominent PET Recycler",
        description: "A fully automated AI-based sorting system was implemented at a major PET recycler struggling to consistently achieve required PPM levels in recycled output. The system visually scanned material in real time, used deep-learning algorithms to recognise material types and conditions, and automatically routed material by quality and recyclability.",
        results: ["More consistent output within the desired PPM range", "Reduced reprocessing time and cost", "Higher throughput", "Fewer quality issues", "Increased market value of final product", "New contracts from premium clients"],
        note: "Results reported in Ishitva's published case study.",
      },
    ],
    founded: "2016 (per company About page); incorporated 2018 (per statutory records)",
    location: "Ahmedabad, Gujarat, India",
    teamSize: "Not publicly disclosed",
    website: "https://ishitva.in/",
    founders: [
      { name: "Sandip Singh", role: "Co-Founder & CEO" },
      { name: "Jitesh Dadlani", role: "Co-Founder & CTO" },
    ],
    cin: "U72900GJ2018PTC103821",
    sector: "Waste Management / Recycling / Circular Economy / Industrial Automation",
    recognitions: [
      "2020 Global Waste-tech Startup Challenge winner",
      "2019 Environment Tech4Good recognition",
      "2019 NASSCOM Environment Tech4Good recognition",
      "2022 Best Startup in Plastic Sector",
      "2025–26 Climate Change Awards, Government of Gujarat",
    ],
  },
  {
    id: "wm-002",
    name: "Fostride",
    tagline: "AI-powered waste intelligence and smart waste segregation systems",
    about: "Fostride is a sustainability-focused startup developing AI-powered waste intelligence and smart waste segregation systems. Its flagship system, W.I.S.E. (Waste Intelligence & Sorting Engine), uses computer vision to identify and classify waste in real time. R3Bin is the physical smart-bin platform through which waste is identified, sorted, logged and connected to the company's analytics system. Fostride describes its system as turning individual waste disposals into structured, auditable data.",
    solution: "Fostride's R3Bin is an industrial-grade smart bin handling multi-stream sorting, waste identification, automated routing to compartments, real-time monitoring and data logging. The W.I.S.E. engine provides real-time waste classification, digital audit trails, live analytics, ESG data generation and waste composition insights. Currently documented waste categories: plastic, paper, metal, organic waste and e-waste.",
    solutionProducts: [
      {
        name: "R3Bin",
        points: ["Industrial-grade smart bin", "Multi-stream waste sorting", "Automated routing to compartments", "Real-time monitoring and data logging", "4 TOPS AI engine (product spec)", "12MP vision + depth sensing (product spec)", "Solar power with 72-hour battery backup (product spec)", "AES-256 encryption (product spec)"],
      },
      {
        name: "W.I.S.E. — Waste Intelligence & Sorting Engine",
        points: ["Real-time waste classification", "Computer-vision-based identification", "Automated routing", "Digital audit trail", "Live analytics dashboard", "ESG data generation", "Waste composition insights", "<500ms classification time (product spec)", "99.99% cloud platform uptime/SLA (company claim)"],
      },
    ],
    areas: ["waste-management", "smart-infrastructure"],
    technologies: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Edge AI", "IoT Sensors", "Neural Processing", "Smart-Bin Hardware", "Real-Time Analytics", "Digital Waste Tracking", "Digital Traceability", "Automated Waste Classification", "Cloud Dashboard", "ESG Analytics"],
    technologyNotes: "Product specifications publicly listed for R3Bin include a 4 TOPS AI engine, 12MP vision + depth sensing, <500ms classification time, AES-256 encryption and a 99.99% cloud platform uptime/SLA claim. These are specifications published by Fostride.",
    experience: "Two completed live pilots in commercial and campus environments. Experience includes AI-based waste classification, smart waste segregation, waste composition data, digital audit trails, ESG reporting and municipal waste-management use cases.",
    experienceItems: ["Two completed live pilots", "Campus waste management", "Commercial and corporate environments", "AI-based waste classification", "Smart waste segregation", "Waste composition data generation", "Digital audit trails", "ESG reporting", "Municipal waste-management use cases"],
    deployments: [],
    deploymentRecords: [
      {
        location: "Brookfield Mall, Powai",
        date: "December 2024",
        description: "First real-world benchmark for W.I.S.E.",
        stats: [{ label: "Items processed", value: "250+" }, { label: "Sorting accuracy (pilot)", value: "~50%" }],
        note: "Pilot results reported by Fostride.",
      },
      {
        location: "KJ Somaiya College",
        date: "January 2025",
        description: "Dataset expansion and model retraining.",
        stats: [{ label: "Items processed", value: "640+" }, { label: "Sorting accuracy (pilot)", value: "~70%" }],
        note: "Pilot results reported by Fostride.",
      },
    ],
    deploymentNote: "Current reported accuracy: ~80%. Stated target for scaled deployments: 95%+ (not yet achieved). DST India is publicly listed by Fostride as a deployment reference; further details are not publicly disclosed.",
    founded: "2024 (as current focused startup; idea began as a school competition in 2022)",
    location: "RIIDL, Somaiya Vidyavihar Campus, Vidyavihar, Mumbai, Maharashtra",
    teamSize: "5+",
    website: "https://www.fostride.com/",
    founders: [{ name: "Gavi Kothari", role: "Founder" }],
    incubatedAt: "RIIDL, Somaiya Vidyavihar University",
    sector: "AI Waste Management / Smart Infrastructure",
    supportPrograms: ["NVIDIA Inception", "Nasscom DeepTech", "NIDHI Prayas — DST, Government of India", "Startup India / DPIIT"],
  },
  {
    id: "wm-003",
    name: "Recykal",
    tagline: "Technology-enabled circular economy and waste management platform",
    about: "Recykal is a technology-enabled circular-economy and waste-management company based in Hyderabad. It provides digital infrastructure connecting waste generators, recyclers, enterprises, brands, collectors and other stakeholders across the waste ecosystem. The company focuses on digitising waste transactions, EPR compliance, collection, recycling, traceability and circular-economy operations.",
    solution: "Recykal operates a digital marketplace for recyclable trading, an EPR compliance platform, a Deposit Return System with QR-based digital refunds and AI verification, RETRACE (a cloud-based serialisation and traceability platform), and Institutional Disposal services with end-to-end traceability certificates.",
    solutionProducts: [
      {
        name: "Digital Marketplace",
        points: ["Buy and sell recyclables", "Verified recycling partners", "Digital transactions", "Transparent pricing", "Logistics support", "Supply and demand matching"],
      },
      {
        name: "EPR Platform",
        points: ["EPR registration", "Fulfilment management", "Compliance monitoring", "Vendor due diligence", "Compliance documentation and reporting"],
      },
      {
        name: "Deposit Return System",
        points: ["QR-based packaging identification", "Digital refunds", "AI-based verification", "Fraud prevention", "End-to-end traceability", "Collection-point infrastructure"],
      },
      {
        name: "RETRACE",
        points: ["Cloud-based serialisation platform", "Unique digital identifiers", "Dynamic QR codes", "SKU-level traceability", "Post-consumer visibility", "Lifecycle data"],
      },
      {
        name: "Institutional Disposal",
        points: ["Waste collection and digital handover", "Material tracking", "Authorised recycling partners", "End-to-end traceability certificates", "Dashboards and reporting"],
      },
    ],
    areas: ["waste-management", "public-services", "smart-infrastructure"],
    technologies: ["Artificial Intelligence", "Machine Learning", "Logistics AI", "Demand-Supply Mapping AI", "Price Discovery AI", "Compliance AI", "IoT", "Cloud Platforms", "QR Codes", "Digital Traceability", "Unique Digital Identifiers", "Real-Time Tracking", "Mobile Applications", "Enterprise APIs", "Data Analytics", "Digital Marketplaces", "Fraud Detection", "Digital Audit Trails"],
    experience: "Circular economy platforms, digital waste marketplaces, EPR compliance, digital traceability, recycling ecosystem management, waste collection and logistics, Deposit Return Systems, government and public-sector ecosystem work, enterprise sustainability, compliance reporting and data-driven waste management.",
    experienceItems: ["Circular economy platforms", "Digital waste marketplaces", "EPR compliance", "Digital traceability", "Recycling ecosystem management", "Waste collection and logistics", "Deposit Return Systems", "Government / public-sector ecosystem work", "Enterprise sustainability", "Compliance reporting", "Data-driven waste management"],
    deployments: [],
    deploymentRecords: [
      {
        location: "Kedarnath — Char Dham Pilgrimage Ecosystem, Uttarakhand",
        date: "2022",
        description: "Digital DRS implemented as part of Uttarakhand's Char Dham pilgrimage waste management. QR-coded packaging tracking, collection centres and a digital deposit/refund mechanism were deployed.",
        stats: [{ label: "Plastic bottles returned (reported)", value: "~33,000" }],
        note: "Publicly documented in Recykal case study.",
      },
      {
        location: "Gangotri, Yamunotri, Badrinath — Char Dham expansion",
        description: "Expansion of the Kedarnath DRS model to the remaining Char Dham pilgrimage sites.",
        note: "Company-documented expansion. No separate numerical outcomes publicly disclosed for these locations.",
      },
      {
        location: "Mani Mahesh and Gelephu",
        description: "Additional publicly documented case-study locations for digital waste management.",
        note: "No numerical outcomes publicly disclosed for these locations.",
      },
    ],
    founded: "Not publicly disclosed",
    location: "Hyderabad, Telangana, India",
    teamSize: "600+",
    website: "https://www.recykal.com/",
    founders: [
      { name: "Abhay Deshpande", role: "Founder & CEO" },
      { name: "Abhishek Deshpande", role: "Co-Founder & COO" },
      { name: "Anirudha Jalan", role: "Co-Founder & CSO" },
      { name: "Ekta Narain", role: "Co-Founder & CBO" },
      { name: "Sujan Parasaradhi", role: "Co-Founder & CIO" },
      { name: "Vikram Prabhakar", role: "Co-Founder & CPO" },
    ],
    sector: "Circular Economy / Waste Management / Recycling Technology",
    companyFiguresNote: "$50M raised, 600+ employees — figures published on Recykal's current website.",
    fundingInfo: "$50M raised (figures published on Recykal's website)",
  },
  {
    id: "wm-004",
    name: "EcoWrap Solutions",
    tagline: "Zero-dumping, AI-enabled waste management for source segregation and circular economy",
    about: "ECOWRAP is a zero-dumping, AI-enabled waste-management startup focused on source segregation, waste collection, tracking, recycling and upcycling. The Office of the Principal Scientific Adviser to the Government of India describes ECOWRAP's technology as combining AI-powered segregation monitoring, machine-learning-based waste forecasting and optimised collection routes. The company is also registered as Ecowrap Impact Pvt. Ltd.",
    solution: "EcoWrap's IoT and SaaS-based platform provides source segregation monitoring, waste collection management, tracking, ML-based forecasting, collection-route optimisation, recycling, upcycling, waste audits, sustainability reporting, carbon-footprint tracking, pickup notifications and audit reports.",
    solutionProducts: [
      {
        name: "Segregation & Collection Platform",
        points: ["Source segregation monitoring", "Waste collection management", "Collection-route optimisation", "Waste tracking", "Pickup notifications", "Audit reports"],
      },
      {
        name: "Analytics & Reporting",
        points: ["Machine-learning-based waste forecasting", "Sustainability reporting", "Carbon-footprint tracking", "Waste audits"],
      },
      {
        name: "Circular Economy Services",
        points: ["Recycling facilitation", "Upcycling"],
      },
    ],
    areas: ["waste-management"],
    technologies: ["Artificial Intelligence", "Machine Learning", "Predictive Analytics", "Waste Forecasting", "IoT", "SaaS", "Data Analytics", "Route Optimisation", "Digital Waste Tracking", "Real-Time Tracking", "Automated Reporting"],
    experience: "End users identified in government documentation include municipalities, companies, communities, industries, schools, NGOs and households.",
    experienceItems: ["Municipal clients", "Corporate and industrial clients", "Community-level waste management", "Schools", "NGOs", "Household waste management"],
    deployments: [],
    deploymentRecords: [
      {
        location: "4 districts in Rajasthan",
        description: "Government-published information states coverage across 4 districts in Rajasthan. District names are not identified in the government source.",
        note: "Source: Office of the Principal Scientific Adviser to the Government of India technology database. TRL: 8. Commercial Readiness: Yes.",
      },
    ],
    founded: "2020 (year of registration)",
    location: "Jaipur, Rajasthan, India",
    teamSize: "Not publicly disclosed",
    website: "https://ecowrap.in/",
    founders: [{ name: "Angraj Swami", role: "Founder" }],
    dpiitNumber: "DIPP70277",
    sector: "Waste to Value / Waste Management",
    trlLevel: "8 (as published in the Office of the Principal Scientific Adviser technology database)",
    verifiedBy: "Delhi Research Implementation and Innovation (DRIIV), Office of the Principal Scientific Adviser to the Government of India",
    fundingInfo: "Private funding (funding agency listed: HNIs)",
    recognitions: [
      "UNDP Youth Co:Lab WTFL, Switzerland",
      "MoHUA Swachhta Challenge City Champions",
      "Josh Talks",
      "Miami-Dade Innovation Authority",
    ],
  },
  {
    id: "wm-005",
    name: "AISmart Bin Pvt. Ltd.",
    tagline: "AI-powered smart waste collection, intelligent segregation and supply chain traceability",
    about: "AISmart Bin develops AI-powered and IoT-enabled waste-management solutions combining smart hardware, cloud software, mobile applications and analytics. Its platform is designed around smart collection, intelligent segregation, contamination prevention, waste traceability and data-driven sustainability reporting.",
    solution: "AISmart Bin's platform spans smart collection (AI-enabled bins with automatic lid control and full-bin alerts), intelligent segregation at source (material recognition for plastic, paper, metal and rubber), contamination prevention through real-time AI monitoring, and supply chain traceability from bin to recycler or waste-to-energy. The company currently reports 40% time saved and 50% error reduction (company-reported figures).",
    solutionProducts: [
      { name: "BinPro — Smart AI Bin", points: ["AI-enabled waste type detection", "Automatic lid control", "Full-bin alerts", "Collection workflow support"] },
      { name: "Segregation Hub", points: ["Source-level segregation", "Material recognition", "Sorting: plastic, paper, metal, rubber"] },
      { name: "BinPro Camera Solution", points: ["Real-time AI monitoring", "User guidance", "Automated contamination alerts"] },
      { name: "AI Cloud / Cloud Platform", points: ["Real-time telemetry", "Predictive waste insights", "Remote monitoring", "ESG reporting", "API integration"] },
      { name: "Sustainability Reporting & Analytics", points: ["ESG data generation", "Waste traceability: Bin → Pickup → Transport → Recycler / Waste-to-Energy", "Data exchange"] },
    ],
    areas: ["waste-management", "smart-infrastructure"],
    technologies: ["Artificial Intelligence", "IoT", "Computer Vision", "Edge AI", "Smart Sensors", "Cloud Computing", "Real-Time Telemetry", "Predictive Analytics", "Digital Traceability", "API Integration", "Mobile Applications", "Sustainability Analytics", "ESG Reporting", "Automated Waste Classification", "Smart Collection"],
    technologyNotes: "The company currently publicly reports: 40% time saved, 50% error reduction, 24/7 live monitoring. These are company-reported figures.",
    experience: "Smart waste collection, AI waste detection, source segregation, contamination prevention, waste traceability, cloud-based waste analytics, sustainability reporting and circular-economy infrastructure.",
    experienceItems: ["Smart waste collection", "AI waste detection", "Source segregation", "Contamination prevention", "Waste traceability", "Cloud-based waste analytics", "Sustainability reporting", "Circular-economy infrastructure"],
    deployments: [],
    deploymentNote: "Specific customer and deployment information is not publicly disclosed.",
    founded: "Not publicly disclosed",
    location: "No. 191/A Ground Floor, 9th Main Road, Sector-6, HSR Layout, Bengaluru, Karnataka – 560102",
    teamSize: "Not publicly disclosed",
    website: "https://www.aismartbin.com/",
    founders: [{ name: "Not publicly disclosed", role: "" }],
    sector: "Smart Waste Management / Circular Economy Technology",
  },
  {
    id: "wm-006",
    name: "EnviroVision",
    tagline: "AI-powered smart waste segregation for Indian waste streams",
    about: "EnviroVision is an early-stage deep-tech environmental infrastructure startup focused on building technology-enabled systems for environmental management. Its flagship product, EcoSarthi, is an AI-powered smart waste segregation system designed specifically for Indian waste streams. The company describes its approach as India-native and focused on automated environmental infrastructure.",
    solution: "EcoSarthi automatically identifies and sorts waste at the point of disposal, classifying wet organic waste, dry paper, plastic, glass, metal and e-waste. The system uses AI and multiple sensors, works offline using edge AI and syncs to cloud dashboards. It generates ESG data and provides BRSR-oriented reporting. The company publicly describes a 98% hybrid AI + sensor accuracy figure (company-stated claim, not independently validated).",
    solutionProducts: [
      {
        name: "EcoSarthi",
        points: ["AI-powered smart waste segregation", "Classifies: wet organic, dry paper, plastic, glass, metal, e-waste", "Automatic identification and sorting at point of disposal", "Offline-first with edge AI", "Syncs to cloud dashboard", "ESG data generation", "BRSR-oriented reporting", "98% hybrid AI + sensor accuracy (company-stated figure, not independently validated)"],
      },
    ],
    areas: ["waste-management", "smart-infrastructure"],
    technologies: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Edge AI", "Multi-Sensor Classification", "Weight Sensing", "Moisture Sensing", "NIR Sensing", "Metal Detection", "Automated Sorting", "Servo-Based Sorting", "Cloud Dashboard", "ESG Analytics", "BRSR Reporting", "Offline-First Architecture", "Waste Classification"],
    technologyNotes: "The company publicly describes a 98% hybrid AI + sensor accuracy figure. This is the company's stated/claimed figure and has not been independently validated.",
    experience: "AI-based waste segregation, environmental infrastructure, Indian waste-stream classification, edge AI, ESG data generation, BRSR-oriented sustainability reporting and automated waste sorting.",
    experienceItems: ["AI-based waste segregation", "Environmental infrastructure", "Indian waste-stream classification", "Edge AI", "ESG data generation", "BRSR-oriented sustainability reporting", "Automated waste sorting"],
    deployments: [],
    deploymentNote: "Specific customer/deployment details are not publicly disclosed. The company states 1 product in deployment.",
    productsInDeployment: "1",
    patentsFiled: "4",
    founded: "2024",
    location: "India (incubated at Chandigarh University's innovation centre)",
    teamSize: "11 (3 founders + 8-person core team, per company About page)",
    website: "https://www.envirovision.in/",
    incubatedAt: "Chandigarh University's innovation centre",
    sector: "Environmental Infrastructure / Deep Tech / Smart Waste Management",
    founders: [{ name: "Not publicly disclosed", role: "3 founders (names not publicly confirmed)" }],
  },
  {
    id: "st-002",
    name: "AgriSense AI",
    tagline: "Precision farming intelligence for every Indian farmer",
    about: "AgriSense AI is a Pune-based agritech startup delivering multilingual crop advisory and soil health monitoring tools to small and marginal farmers. Our solutions operate on feature phones and entry-level Android devices, bridging the digital divide in rural India.",
    solution: "Combining satellite imagery, IoT soil sensors, and ML-based crop models, we deliver hyper-local farming advice in 12 Indian languages via SMS, WhatsApp, and a lightweight app — without requiring constant internet connectivity.",
    areas: ["agriculture"],
    technologies: ["Satellite Remote Sensing", "NLP", "TensorFlow Lite", "Offline-first PWA", "USSD Integration"],
    experience: "4+ years in agritech; awarded ICAR excellence award 2022; part of the Atal Innovation Mission cohort.",
    deployments: [
      "Maharashtra — 15,000 farmers onboarded across Vidarbha region",
      "Rajasthan — Partnership with RAAS for drought monitoring advisory",
      "Odisha — Government pilot for Kharif season 2023 covering 8,000 farmers",
    ],
    founded: "2019",
    location: "Pune, Maharashtra",
    teamSize: "67",
    website: "www.agrisenseai.com",
  },
  {
    id: "st-003",
    name: "Nirogyam Health",
    tagline: "Connecting rural patients to specialist care",
    about: "Nirogyam Health is a Delhi-based healthtech startup focused on last-mile telemedicine and electronic health records for Tier-3 and rural health infrastructure. We design for low-bandwidth environments and integrate with the Ayushman Bharat Digital Mission.",
    solution: "Our telemedicine platform enables live and asynchronous specialist consultations from PHCs, generates structured prescriptions, and maintains longitudinal patient records linked to ABDM Health IDs — all with a UX designed for ASHA workers and ANMs.",
    areas: ["healthcare"],
    technologies: ["WebRTC", "ABDM Sandbox", "FHIR R4", "React Native", "PostgreSQL"],
    experience: "5 years in rural health delivery; empanelled under PM-JAY; ISO 13485 certified.",
    deployments: [
      "Jharkhand — 30 PHCs connected to Ranchi Medical College specialists",
      "Chhattisgarh — Teleconsultation during COVID-19 for 20,000 patients",
      "Assam — NSSO-funded pilot for maternal health monitoring",
    ],
    founded: "2018",
    location: "New Delhi",
    teamSize: "95",
    website: "www.nirogyam.health",
  },
  {
    id: "st-004",
    name: "LumiGrid Systems",
    tagline: "Intelligent infrastructure for sustainable urban lighting",
    about: "LumiGrid Systems designs and deploys smart street lighting management systems for municipal corporations and state electricity boards. Our hardware and software stack are made in India under the PLI scheme for electronics.",
    solution: "Our SCADA-compatible controller nodes fit on existing street light poles and communicate over NB-IoT. The central dashboard provides real-time fault alerts, adaptive scheduling, and energy accounting — reducing municipal lighting bills by an average of 42%.",
    areas: ["smart-infrastructure", "energy"],
    technologies: ["NB-IoT", "SCADA Integration", "MQTT", "Time-series DB", "React Dashboard"],
    experience: "6 years in smart city solutions; certified under BEE Star Rating Programme; deployed in 3 Smart Cities Mission projects.",
    deployments: [
      "Bhopal Smart City — 18,000 streetlights, 44% energy saving",
      "Lucknow Municipal Corporation — 25,000 lights across 4 zones",
      "Rajkot Smart City — Ongoing rollout of 12,000 nodes",
    ],
    founded: "2017",
    location: "Hyderabad, Telangana",
    teamSize: "130",
    website: "www.lumigrid.in",
  },
  {
    id: "st-005",
    name: "ConnectPDS",
    tagline: "Resilient last-mile delivery for public distribution",
    about: "ConnectPDS builds offline-first digital infrastructure for India's Public Distribution System. Our solution helps FPS dealers authenticate beneficiaries and record transactions even in the most connectivity-deprived environments, syncing securely when online.",
    solution: "A ruggedised Android app with embedded Aadhaar biometric authentication that operates fully offline, maintains tamper-evident logs using cryptographic hashing, and syncs with NFS servers through intelligent conflict resolution when connectivity is restored.",
    areas: ["public-services"],
    technologies: ["Android (Offline-first)", "Aadhaar OSDP", "SQLCipher", "Conflict-free Replicated Data Types", "REST sync API"],
    experience: "3 years in public distribution; part of iGOT platform; worked with FCI and state food departments.",
    deployments: [
      "Uttarakhand — 850 remote FPS dealers in hill districts",
      "Meghalaya — 600 FPS in tribal areas, zero downtime in 18 months",
      "Himachal Pradesh — Pilot of 200 shops in Kinnaur and Lahaul-Spiti",
    ],
    founded: "2021",
    location: "Dehradun, Uttarakhand",
    teamSize: "28",
    website: "www.connectpds.gov.in",
  },
  {
    id: "st-006",
    name: "SkillMap India",
    tagline: "Bridging ITI talent to industry demand",
    about: "SkillMap India is a Delhi-based edtech startup building skill gap analytics and personalised learning path tools for ITI students and vocational training institutes. We work closely with NSDC and Sector Skill Councils to keep our industry demand data current.",
    solution: "Our platform ingests student assessment data, industry job postings, and SSC competency frameworks to generate ranked skill-gap reports and personalised micro-learning recommendations. Principals get a macro view; students get an actionable personal roadmap.",
    areas: ["education"],
    technologies: ["NLP", "Recommendation Engine", "React", "Django", "NCVT MIS API Integration"],
    experience: "3 years in vocational education analytics; MoU with NSDC; Mentor from T-Hub accelerator.",
    deployments: [
      "Delhi — 12 ITIs, 6,000 students on personalised pathways",
      "Uttar Pradesh — Skill audit for 35 ITIs with DGET",
      "Telangana — Integration with Telangana Academy for Skills pilot",
    ],
    founded: "2021",
    location: "New Delhi",
    teamSize: "34",
    website: "www.skillmapindia.com",
  },
];

export function getChallengesByArea(areaId: string): Challenge[] {
  return CHALLENGES.filter((c) => c.area === areaId);
}

export function getStartupsByArea(areaId: string): Startup[] {
  return STARTUPS.filter((s) => s.areas.includes(areaId));
}

export function getAreaLabel(areaId: string): string {
  return SOLUTION_AREAS.find((a) => a.id === areaId)?.label ?? areaId;
}
