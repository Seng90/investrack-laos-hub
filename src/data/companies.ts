import bcelLogo from "@/assets/logos/bcel.png";
import laoTelecomLogo from "@/assets/logos/lao-telecom.png";
import kolaoGroupLogo from "@/assets/logos/kolao-group.png";
import laostarLogo from "@/assets/logos/laostar.png";
import pharmalaoLogo from "@/assets/logos/pharmalao.png";
import greenmekongLogo from "@/assets/logos/greenmekong.png";

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface FundingRound {
  date: string;
  round: string;
  amount: string;
  investors: string[];
}

export interface NewsItem {
  date: string;
  title: string;
  source: string;
  url: string;
}

export interface Company {
  slug: string;
  name: string;
  logo: string;
  sector: string;
  location: string;
  funding: string;
  stage: string;
  description: string;
  founded: string;
  employees: string;
  website: string;
  overview: string;
  team: TeamMember[];
  fundingRounds: FundingRound[];
  news: NewsItem[];
}

import { extraCompanies } from "./companiesExtra";

const baseCompanies: Company[] = [
  {
    slug: "bcel",
    name: "BCEL",
    logo: bcelLogo,
    sector: "Banking & Finance",
    location: "Vientiane",
    funding: "$45M",
    stage: "Established",
    description: "Banque pour le Commerce Extérieur Lao — leading commercial bank.",
    founded: "1975",
    employees: "2,500+",
    website: "bfrancebcel.com.la",
    overview: "BCEL is one of the largest and most trusted commercial banks in Laos, providing comprehensive banking services including retail banking, corporate banking, trade finance, and digital banking solutions. With a nationwide network of branches and ATMs, BCEL plays a critical role in the Lao financial ecosystem and has been at the forefront of digital transformation in the country's banking sector.",
    team: [
      { name: "Pany Philaphandeth", role: "CEO" },
      { name: "Somphone Sirivong", role: "CFO" },
      { name: "Khamla Phonsena", role: "CTO" },
      { name: "Vilay Rattanavong", role: "Head of Retail Banking" },
    ],
    fundingRounds: [
      { date: "2020-06", round: "Government Recapitalization", amount: "$20M", investors: ["Lao Government", "IFC"] },
      { date: "2018-03", round: "Bond Issuance", amount: "$15M", investors: ["Asian Development Bank"] },
      { date: "2015-09", round: "Capital Increase", amount: "$10M", investors: ["Lao Government"] },
    ],
    news: [
      { date: "2025-01-15", title: "BCEL launches mobile banking app 3.0 with QR payments", source: "Vientiane Times", url: "#" },
      { date: "2024-11-20", title: "BCEL partners with UnionPay for cross-border transactions", source: "KPL News", url: "#" },
      { date: "2024-09-05", title: "BCEL reports record Q3 profits amid digital growth", source: "Lao Economic Daily", url: "#" },
    ],
  },
  {
    slug: "lao-telecom",
    name: "Lao Telecom",
    logo: laoTelecomLogo,
    sector: "Telecommunications",
    location: "Vientiane",
    funding: "$120M",
    stage: "Established",
    description: "Major telecom provider with nationwide 4G/5G coverage.",
    founded: "1996",
    employees: "3,200+",
    website: "laotel.com",
    overview: "Lao Telecom is the leading telecommunications provider in Laos, offering mobile, broadband, and enterprise connectivity services. As a joint venture between the Lao government and Vietnam's VNPT, the company has invested heavily in 4G and emerging 5G infrastructure to connect both urban and rural communities across the country.",
    team: [
      { name: "Thanongsinh Kanlagna", role: "CEO" },
      { name: "Nguyen Van Binh", role: "Deputy CEO" },
      { name: "Bounpheng Sisoulath", role: "CTO" },
    ],
    fundingRounds: [
      { date: "2022-01", round: "Infrastructure Investment", amount: "$50M", investors: ["VNPT", "Lao Government"] },
      { date: "2019-06", round: "5G Trial Funding", amount: "$30M", investors: ["VNPT"] },
      { date: "2016-12", round: "Network Expansion", amount: "$40M", investors: ["ADB", "World Bank"] },
    ],
    news: [
      { date: "2025-02-01", title: "Lao Telecom begins 5G rollout in Vientiane Capital", source: "Vientiane Times", url: "#" },
      { date: "2024-10-10", title: "Lao Telecom reaches 5 million subscribers milestone", source: "KPL News", url: "#" },
    ],
  },
  {
    slug: "kolao-group",
    name: "Kolao Group",
    logo: kolaoGroupLogo,
    sector: "Automotive & Trade",
    location: "Vientiane",
    funding: "$80M",
    stage: "Series D",
    description: "Largest automotive and trading company in Laos.",
    founded: "2002",
    employees: "1,800+",
    website: "kolaogroup.com",
    overview: "Kolao Group is the largest automotive distributor and trading company in Laos, with operations spanning vehicle sales, after-sales services, real estate development, and financial services. Originally a Korean-Lao joint venture, the company has grown to become one of the most influential business groups in the country.",
    team: [
      { name: "Oh Se-young", role: "Chairman" },
      { name: "Khamphan Southichak", role: "CEO" },
      { name: "Park Joon-hyuk", role: "CFO" },
    ],
    fundingRounds: [
      { date: "2023-03", round: "Series D", amount: "$30M", investors: ["Korea Investment Partners", "Mekong Capital"] },
      { date: "2020-08", round: "Series C", amount: "$25M", investors: ["Hyundai Motor Group"] },
      { date: "2017-05", round: "Series B", amount: "$15M", investors: ["Korea Development Bank"] },
      { date: "2014-01", round: "Series A", amount: "$10M", investors: ["Private Investors"] },
    ],
    news: [
      { date: "2025-01-28", title: "Kolao Group expands EV lineup with Hyundai partnership", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "laostar",
    name: "LaoStar",
    logo: laostarLogo,
    sector: "Fintech",
    location: "Vientiane",
    funding: "$3.2M",
    stage: "Series A",
    description: "Digital payment and mobile banking solutions for Lao users.",
    founded: "2021",
    employees: "45",
    website: "laostar.la",
    overview: "LaoStar is a fintech startup building digital payment infrastructure for Laos. Their mobile-first platform enables QR-based payments, peer-to-peer transfers, and merchant solutions tailored for the Lao market. The company aims to drive financial inclusion by providing accessible digital financial services to underserved communities.",
    team: [
      { name: "Souphaphone Keo", role: "CEO & Co-founder" },
      { name: "Anousone Vilay", role: "CTO & Co-founder" },
      { name: "Manivone Pham", role: "Head of Product" },
    ],
    fundingRounds: [
      { date: "2024-02", round: "Series A", amount: "$2.5M", investors: ["500 Global", "Mekong Angels"] },
      { date: "2022-06", round: "Seed", amount: "$700K", investors: ["Lao-Japan Gateway Fund", "Angel Investors"] },
    ],
    news: [
      { date: "2024-12-15", title: "LaoStar processes 1 million transactions in a single month", source: "TechLao", url: "#" },
      { date: "2024-08-20", title: "LaoStar partners with Ministry of Finance for digital tax payments", source: "Vientiane Times", url: "#" },
    ],
  },
  {
    slug: "pharmalao",
    name: "PharmaLao",
    logo: pharmalaoLogo,
    sector: "Healthcare",
    location: "Luang Prabang",
    funding: "$1.8M",
    stage: "Seed",
    description: "Pharmaceutical distribution and healthcare technology.",
    founded: "2022",
    employees: "28",
    website: "pharmalao.com",
    overview: "PharmaLao is modernizing pharmaceutical distribution across Laos through technology-driven logistics and inventory management. Their platform connects pharmaceutical manufacturers with hospitals, clinics, and pharmacies throughout the country, ensuring reliable access to essential medicines even in remote areas.",
    team: [
      { name: "Dr. Khamphone Sisavath", role: "CEO & Founder" },
      { name: "Soudalay Phommavong", role: "COO" },
    ],
    fundingRounds: [
      { date: "2023-09", round: "Seed", amount: "$1.8M", investors: ["Patamar Capital", "Global Health Fund"] },
    ],
    news: [
      { date: "2024-11-01", title: "PharmaLao expands distribution network to all 18 provinces", source: "Lao Health Journal", url: "#" },
    ],
  },
  {
    slug: "greenmekong",
    name: "GreenMekong",
    logo: greenmekongLogo,
    sector: "AgriTech",
    location: "Savannakhet",
    funding: "$2.5M",
    stage: "Series A",
    description: "Sustainable agriculture technology for smallholder farmers.",
    founded: "2020",
    employees: "35",
    website: "greenmekong.la",
    overview: "GreenMekong develops agricultural technology solutions for smallholder farmers along the Mekong River basin. Their platform combines IoT soil sensors, satellite imagery, and AI-powered crop recommendations to help farmers optimize yields while promoting sustainable practices. The company works closely with farming cooperatives across southern Laos.",
    team: [
      { name: "Bounsou Thammavong", role: "CEO & Co-founder" },
      { name: "Naly Keomanivong", role: "CTO & Co-founder" },
      { name: "James Chen", role: "Head of Agronomy" },
    ],
    fundingRounds: [
      { date: "2024-04", round: "Series A", amount: "$2M", investors: ["Wavemaker Partners", "AgFunder"] },
      { date: "2022-01", round: "Seed", amount: "$500K", investors: ["Village Capital", "Mekong Angels"] },
    ],
    news: [
      { date: "2025-01-10", title: "GreenMekong deploys IoT sensors across 500 farms in Savannakhet", source: "AgTech Asia", url: "#" },
      { date: "2024-07-15", title: "GreenMekong wins ASEAN AgriTech Innovation Award", source: "ASEAN Business", url: "#" },
    ],
  },
];

export const getCompanyBySlug = (slug: string): Company | undefined => {
  return companies.find((c) => c.slug === slug);
};
