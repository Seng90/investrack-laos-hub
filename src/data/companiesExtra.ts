import laoAirlinesLogo from "@/assets/logos/lao-airlines.png";
import edlLogo from "@/assets/logos/edl.png";
import laoEduLogo from "@/assets/logos/laoedu.png";
import mekongMartLogo from "@/assets/logos/mekongmart.png";
import unitelLogo from "@/assets/logos/unitel.png";
import ldbLogo from "@/assets/logos/ldb.png";
import laoTravelLogo from "@/assets/logos/laotravel.png";
import phuBiaLogo from "@/assets/logos/phubia.png";

import type { Company } from "./companies";

export const extraCompanies: Company[] = [
  {
    slug: "lao-development-bank",
    name: "Lao Development Bank",
    logo: ldbLogo,
    sector: "Banking & Finance",
    location: "Vientiane",
    funding: "$30M",
    stage: "Established",
    description: "State-owned development bank supporting SME lending and rural finance.",
    founded: "1993",
    employees: "1,800+",
    website: "ldb.org.la",
    overview:
      "Lao Development Bank (LDB) is a state-owned commercial bank that plays a pivotal role in channeling development finance to small and medium enterprises across Laos. With branches in every province, LDB focuses on rural credit, agricultural lending, and microfinance programs that drive inclusive economic growth.",
    team: [
      { name: "Bounnhang Douangphila", role: "CEO" },
      { name: "Thongvanh Keovongsa", role: "CFO" },
    ],
    fundingRounds: [
      { date: "2021-04", round: "Government Recapitalization", amount: "$18M", investors: ["Lao Government"] },
      { date: "2017-09", round: "ADB Credit Line", amount: "$12M", investors: ["Asian Development Bank"] },
    ],
    news: [
      { date: "2025-02-10", title: "LDB launches digital loan application portal for SMEs", source: "Vientiane Times", url: "#" },
      { date: "2024-10-05", title: "LDB disburses record rural credit in Q3 2024", source: "KPL News", url: "#" },
    ],
  },
  {
    slug: "unitel",
    name: "Unitel",
    logo: unitelLogo,
    sector: "Telecom & IT",
    location: "Vientiane",
    funding: "$95M",
    stage: "Established",
    description: "Largest mobile operator in Laos with over 3 million subscribers.",
    founded: "2009",
    employees: "2,100+",
    website: "unitel.com.la",
    overview:
      "Unitel is a joint venture between Lao Asia Telecom and Viettel Group, and has rapidly become the largest mobile operator in Laos by subscriber count. The company provides 4G LTE services covering over 95% of the population, along with broadband internet, enterprise solutions, and mobile money services through its U-Money platform.",
    team: [
      { name: "Chanthone Sitthixay", role: "CEO" },
      { name: "Tran Viet Hung", role: "Deputy CEO" },
      { name: "Khamphone Sengdara", role: "CTO" },
    ],
    fundingRounds: [
      { date: "2023-06", round: "Network Expansion", amount: "$40M", investors: ["Viettel Group"] },
      { date: "2020-01", round: "4G Rollout", amount: "$35M", investors: ["Viettel Group", "Lao Asia Telecom"] },
      { date: "2016-05", round: "Infrastructure", amount: "$20M", investors: ["World Bank", "Lao Government"] },
    ],
    news: [
      { date: "2025-03-01", title: "Unitel U-Money reaches 1.5 million active users", source: "TechLao", url: "#" },
      { date: "2024-12-08", title: "Unitel launches 5G pilot in Luang Prabang", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "lao-airlines",
    name: "Lao Airlines",
    logo: laoAirlinesLogo,
    sector: "Tourism",
    location: "Vientiane",
    funding: "$60M",
    stage: "Established",
    description: "National flag carrier connecting Laos to regional and domestic destinations.",
    founded: "1976",
    employees: "1,200+",
    website: "laoairlines.com",
    overview:
      "Lao Airlines is the national carrier of the Lao PDR, operating domestic flights to major cities and international routes connecting Vientiane to Bangkok, Hanoi, Ho Chi Minh City, Phnom Penh, Kunming, and Seoul. The airline has modernized its fleet with ATR 72 and Airbus A320 aircraft and plays a critical role in supporting the country's growing tourism industry.",
    team: [
      { name: "Khamla Phommavanh", role: "Director General" },
      { name: "Souvanny Savangsy", role: "Deputy Director" },
    ],
    fundingRounds: [
      { date: "2022-07", round: "Fleet Modernization", amount: "$35M", investors: ["Lao Government", "JICA"] },
      { date: "2018-03", round: "Route Expansion", amount: "$25M", investors: ["Lao Government"] },
    ],
    news: [
      { date: "2025-01-20", title: "Lao Airlines adds direct flights to Seoul Incheon", source: "Vientiane Times", url: "#" },
      { date: "2024-09-15", title: "Lao Airlines reports 40% passenger growth year-over-year", source: "KPL News", url: "#" },
    ],
  },
  {
    slug: "laotravel-tech",
    name: "LaoTravel",
    logo: laoTravelLogo,
    sector: "Tourism",
    location: "Luang Prabang",
    funding: "$1.5M",
    stage: "Seed",
    description: "Travel-tech platform for booking eco-tourism and cultural experiences.",
    founded: "2022",
    employees: "20",
    website: "laotravel.la",
    overview:
      "LaoTravel is a travel technology startup building a comprehensive booking platform for eco-tourism, cultural experiences, and adventure travel across Laos. Their curated marketplace connects local tour operators, guesthouses, and experience providers with international travelers, emphasizing sustainable and community-based tourism.",
    team: [
      { name: "Vanida Souphanouvong", role: "CEO & Founder" },
      { name: "Khamsing Phanthavong", role: "CTO" },
    ],
    fundingRounds: [
      { date: "2023-11", round: "Seed", amount: "$1.5M", investors: ["Mekong Angels", "JICA Innovation Fund"] },
    ],
    news: [
      { date: "2024-12-20", title: "LaoTravel partners with Luang Prabang tourism board for digital booking", source: "TechLao", url: "#" },
    ],
  },
  {
    slug: "edl",
    name: "Électricité du Laos",
    logo: edlLogo,
    sector: "Energy & Mining",
    location: "Vientiane",
    funding: "$200M",
    stage: "Established",
    description: "State-owned electricity utility powering Laos and exporting to neighbors.",
    founded: "1959",
    employees: "5,000+",
    website: "edl.com.la",
    overview:
      "Électricité du Laos (EDL) is the state-owned electric utility responsible for power generation, transmission, and distribution throughout the country. Laos is known as the 'Battery of Southeast Asia' due to its significant hydropower resources, and EDL manages a growing portfolio of dams and power stations that export electricity to Thailand, Vietnam, and Cambodia.",
    team: [
      { name: "Sinava Souphanouvong", role: "Director General" },
      { name: "Khammany Inthirath", role: "Deputy Director" },
    ],
    fundingRounds: [
      { date: "2023-01", round: "Grid Expansion", amount: "$100M", investors: ["World Bank", "ADB"] },
      { date: "2019-06", round: "Hydropower Development", amount: "$60M", investors: ["Lao Government", "JICA"] },
      { date: "2015-03", round: "Rural Electrification", amount: "$40M", investors: ["World Bank"] },
    ],
    news: [
      { date: "2025-02-15", title: "EDL completes 500MW Nam Theun 3 hydropower project", source: "Vientiane Times", url: "#" },
      { date: "2024-08-10", title: "Laos exports record 8,000 GWh of electricity in H1 2024", source: "KPL News", url: "#" },
    ],
  },
  {
    slug: "phu-bia-mining",
    name: "Phu Bia Mining",
    logo: phuBiaLogo,
    sector: "Energy & Mining",
    location: "Xaysomboun",
    funding: "$150M",
    stage: "Established",
    description: "Major gold and copper mining operation in central Laos.",
    founded: "2005",
    employees: "3,500+",
    website: "phubiamining.com",
    overview:
      "Phu Bia Mining is a subsidiary of PanAust Limited and operates the Phu Kham Copper-Gold Operation and the Ban Houayxai Gold-Silver Operation in Laos. The company is one of the largest private-sector employers in the country and a significant contributor to government revenue through taxes and royalties.",
    team: [
      { name: "Michael Chetter", role: "Managing Director" },
      { name: "Bounpone Sisoulith", role: "Deputy MD" },
    ],
    fundingRounds: [
      { date: "2021-08", round: "Expansion Capital", amount: "$80M", investors: ["PanAust", "Guangdong Rising Assets"] },
      { date: "2017-02", round: "Mine Development", amount: "$70M", investors: ["PanAust"] },
    ],
    news: [
      { date: "2025-01-05", title: "Phu Bia Mining invests $20M in community development programs", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "laoedu",
    name: "LaoEdu",
    logo: laoEduLogo,
    sector: "Education",
    location: "Vientiane",
    funding: "$2.1M",
    stage: "Series A",
    description: "EdTech platform delivering online learning in Lao language.",
    founded: "2021",
    employees: "32",
    website: "laoedu.la",
    overview:
      "LaoEdu is the first comprehensive EdTech platform built specifically for Lao-language learners. The platform offers K-12 curriculum-aligned courses, vocational training modules, and professional development programs. With partnerships across the Ministry of Education and international NGOs, LaoEdu aims to democratize access to quality education for students across all 18 provinces.",
    team: [
      { name: "Nithsa Keovongsa", role: "CEO & Co-founder" },
      { name: "Phouthone Mixay", role: "CTO & Co-founder" },
      { name: "Ketsana Vongsa", role: "Head of Content" },
    ],
    fundingRounds: [
      { date: "2024-06", round: "Series A", amount: "$1.6M", investors: ["500 Global", "UNICEF Innovation Fund"] },
      { date: "2022-09", round: "Seed", amount: "$500K", investors: ["Mekong Angels", "GIZ"] },
    ],
    news: [
      { date: "2025-03-05", title: "LaoEdu reaches 200,000 registered students across Laos", source: "TechLao", url: "#" },
      { date: "2024-11-12", title: "LaoEdu partners with Ministry of Education for national e-learning rollout", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "mekongmart",
    name: "MekongMart",
    logo: mekongMartLogo,
    sector: "Retail & Trade",
    location: "Vientiane",
    funding: "$4.5M",
    stage: "Series A",
    description: "Leading e-commerce and delivery platform for Lao consumers.",
    founded: "2020",
    employees: "120",
    website: "mekongmart.la",
    overview:
      "MekongMart is the fastest-growing e-commerce platform in Laos, offering everything from groceries and electronics to fashion and home goods. With its own last-mile delivery fleet operating in Vientiane, Luang Prabang, and Savannakhet, MekongMart has become the go-to online shopping destination for Lao consumers. The platform also supports cross-border trade with Thailand and Vietnam.",
    team: [
      { name: "Souksamlane Phimmasone", role: "CEO & Founder" },
      { name: "Viengkham Douangphachanh", role: "COO" },
      { name: "Thipphachanh Soulinho", role: "CTO" },
    ],
    fundingRounds: [
      { date: "2024-01", round: "Series A", amount: "$3.5M", investors: ["Wavemaker Partners", "500 Global"] },
      { date: "2022-04", round: "Seed", amount: "$1M", investors: ["Mekong Angels", "Village Capital"] },
    ],
    news: [
      { date: "2025-02-20", title: "MekongMart launches same-day delivery in 3 major cities", source: "TechLao", url: "#" },
      { date: "2024-10-25", title: "MekongMart processes 50,000 orders during Lao New Year sale", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "lao-agro",
    name: "Lao Agro Industry",
    logo: "/placeholder.svg",
    sector: "Agriculture",
    location: "Champasak",
    funding: "$18M",
    stage: "Established",
    description: "Largest organic coffee and agricultural export company in Laos.",
    founded: "2008",
    employees: "800+",
    website: "laoagro.com",
    overview:
      "Lao Agro Industry is a leading agricultural enterprise specializing in organic coffee production, rice milling, and cassava processing for export. Based in the Bolaven Plateau region, the company works with over 5,000 smallholder farmers across southern Laos, providing technical assistance, fair-trade premiums, and market access to international buyers in Europe and Asia.",
    team: [
      { name: "Somphone Phanthavong", role: "CEO" },
      { name: "Bounyong Sengmany", role: "Head of Operations" },
    ],
    fundingRounds: [
      { date: "2022-05", round: "Expansion Capital", amount: "$10M", investors: ["IFC", "Mekong Capital"] },
      { date: "2018-09", round: "Growth Financing", amount: "$8M", investors: ["ADB", "IFAD"] },
    ],
    news: [
      { date: "2025-01-30", title: "Lao Agro exports 5,000 tons of organic coffee to EU markets", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "champa-wellness",
    name: "Champa Wellness",
    logo: "/placeholder.svg",
    sector: "Healthcare",
    location: "Vientiane",
    funding: "$1.2M",
    stage: "Seed",
    description: "Telemedicine and wellness platform connecting patients to doctors across Laos.",
    founded: "2023",
    employees: "18",
    website: "champawellness.la",
    overview:
      "Champa Wellness is a health-tech startup building Laos's first integrated telemedicine platform. The app connects patients in remote areas with licensed doctors via video consultations, digital prescriptions, and medicine delivery. The platform also offers wellness programs, mental health support, and health education content in Lao language.",
    team: [
      { name: "Dr. Amphone Vongphet", role: "CEO & Founder" },
      { name: "Saysana Kounnavong", role: "CTO" },
    ],
    fundingRounds: [
      { date: "2024-03", round: "Seed", amount: "$1.2M", investors: ["Patamar Capital", "WHO Innovation Fund"] },
    ],
    news: [
      { date: "2024-11-28", title: "Champa Wellness completes 10,000 teleconsultations in first year", source: "Lao Health Journal", url: "#" },
    ],
  },
];
