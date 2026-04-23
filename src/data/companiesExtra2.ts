import laoCementLogo from "@/assets/logos/lao-cement.png";
import laoBrewLogo from "@/assets/logos/laobrew.png";
import mekongLogisticsLogo from "@/assets/logos/mekong-logistics.png";
import vientianeRealtyLogo from "@/assets/logos/vientiane-realty.png";
import laoMediaLogo from "@/assets/logos/lao-media.png";
import sokXayLogo from "@/assets/logos/sokxay.png";
import laoRideLogo from "@/assets/logos/laoride.png";
import champaCoffeeLogo from "@/assets/logos/champa-coffee.png";
import laoSilkLogo from "@/assets/logos/laosilk.png";
import dokKhamLogo from "@/assets/logos/dokkham.png";

import type { Company } from "./companies";

export const extraCompanies2: Company[] = [
  {
    slug: "lao-cement-company",
    name: "Lao Cement Company",
    logo: laoCementLogo,
    sector: "Construction",
    location: "Vang Vieng",
    funding: "$60M",
    stage: "Established",
    description: "Largest cement and building materials producer in Laos.",
    founded: "1994",
    employees: "1,200+",
    website: "laocement.la",
    overview:
      "Lao Cement Company (LCC) operates the country's largest integrated cement plant, supplying construction projects nationwide. With production capacity exceeding 1.5 million tonnes annually, LCC supports major infrastructure developments including highways, hydropower dams, and the Laos-China Railway.",
    team: [
      { name: "Khamtanh Phommachanh", role: "CEO" },
      { name: "Souksavanh Inthavong", role: "COO" },
      { name: "Liu Wei", role: "Plant Director" },
    ],
    fundingRounds: [
      { date: "2021-05", round: "Expansion Loan", amount: "$35M", investors: ["China Development Bank", "Lao Government"] },
      { date: "2016-08", round: "Plant Upgrade", amount: "$25M", investors: ["ADB"] },
    ],
    news: [
      { date: "2025-02-10", title: "LCC announces second production line in Vang Vieng", source: "Vientiane Times", url: "#" },
      { date: "2024-09-12", title: "LCC supplies 200,000 tonnes for Vientiane ring road project", source: "KPL News", url: "#" },
    ],
  },
  {
    slug: "laobrew",
    name: "LaoBrew",
    logo: laoBrewLogo,
    sector: "Food & Beverage",
    location: "Vientiane",
    funding: "$12M",
    stage: "Series B",
    description: "Craft brewery exporting Lao-style beers across Southeast Asia.",
    founded: "2015",
    employees: "180",
    website: "laobrew.com",
    overview:
      "LaoBrew is a fast-growing craft beverage company producing premium beers, kombucha, and ready-to-drink coffee inspired by traditional Lao ingredients. With distribution in Thailand, Vietnam, and Cambodia, LaoBrew is becoming a recognizable Lao consumer brand on the regional stage.",
    team: [
      { name: "Vongdeuane Saysana", role: "CEO & Founder" },
      { name: "Mark Davies", role: "Master Brewer" },
      { name: "Phetsamai Khounvongsa", role: "Head of Marketing" },
    ],
    fundingRounds: [
      { date: "2024-06", round: "Series B", amount: "$8M", investors: ["East Ventures", "Mekong Capital"] },
      { date: "2021-03", round: "Series A", amount: "$3M", investors: ["Insignia Ventures"] },
      { date: "2018-09", round: "Seed", amount: "$1M", investors: ["Angel Investors"] },
    ],
    news: [
      { date: "2025-03-01", title: "LaoBrew opens new brewery in Pakse with 5x capacity", source: "F&B Asia", url: "#" },
      { date: "2024-11-22", title: "LaoBrew wins gold at Asia Beer Championship", source: "Beverage Daily", url: "#" },
    ],
  },
  {
    slug: "mekong-logistics",
    name: "Mekong Logistics",
    logo: mekongLogisticsLogo,
    sector: "Logistics",
    location: "Savannakhet",
    funding: "$22M",
    stage: "Series C",
    description: "Cross-border freight and supply chain solutions across the GMS.",
    founded: "2010",
    employees: "650",
    website: "mekonglogistics.la",
    overview:
      "Mekong Logistics provides end-to-end freight forwarding, customs clearance, and warehousing services across the Greater Mekong Subregion. Leveraging the Laos-China Railway and East-West Economic Corridor, the company has become a strategic partner for manufacturers and traders moving goods between China, Vietnam, Thailand, and Laos.",
    team: [
      { name: "Sengdao Vongkhamsao", role: "CEO" },
      { name: "Tran Quoc Anh", role: "COO" },
    ],
    fundingRounds: [
      { date: "2023-11", round: "Series C", amount: "$10M", investors: ["Wavemaker Partners", "ADB Ventures"] },
      { date: "2020-04", round: "Series B", amount: "$7M", investors: ["Openspace Ventures"] },
      { date: "2017-02", round: "Series A", amount: "$5M", investors: ["Patamar Capital"] },
    ],
    news: [
      { date: "2025-01-20", title: "Mekong Logistics launches dedicated rail freight service to Kunming", source: "Logistics Asia", url: "#" },
    ],
  },
  {
    slug: "vientiane-realty",
    name: "Vientiane Realty",
    logo: vientianeRealtyLogo,
    sector: "Real Estate",
    location: "Vientiane",
    funding: "$40M",
    stage: "Series B",
    description: "Premium residential and commercial real estate developer.",
    founded: "2008",
    employees: "320",
    website: "vientianerealty.la",
    overview:
      "Vientiane Realty develops modern condominiums, office towers, and mixed-use complexes in the capital. The company has delivered over 2,500 residential units and is leading the transformation of the Vientiane skyline with sustainable, internationally-designed properties.",
    team: [
      { name: "Khamphan Sayavong", role: "Chairman" },
      { name: "Aluna Phommachanh", role: "CEO" },
    ],
    fundingRounds: [
      { date: "2022-10", round: "Series B", amount: "$25M", investors: ["CapitaLand", "Lao Holdings"] },
      { date: "2018-07", round: "Series A", amount: "$15M", investors: ["Frasers Property"] },
    ],
    news: [
      { date: "2024-12-05", title: "Vientiane Realty breaks ground on 35-story Champa Tower", source: "Property Report Asia", url: "#" },
    ],
  },
  {
    slug: "lao-media-group",
    name: "Lao Media Group",
    logo: laoMediaLogo,
    sector: "Media & Entertainment",
    location: "Vientiane",
    funding: "$5M",
    stage: "Series A",
    description: "Digital news, streaming, and content production for Lao audiences.",
    founded: "2017",
    employees: "120",
    website: "laomedia.la",
    overview:
      "Lao Media Group operates the country's leading digital news portal and a growing streaming platform featuring original Lao-language drama, documentaries, and entertainment shows. The company is building the cultural infrastructure for the next generation of Lao storytellers.",
    team: [
      { name: "Phoukhong Sisavath", role: "CEO & Founder" },
      { name: "Niny Khamvongsa", role: "Head of Content" },
    ],
    fundingRounds: [
      { date: "2024-01", round: "Series A", amount: "$4M", investors: ["Golden Gate Ventures", "Mekong Angels"] },
      { date: "2021-08", round: "Seed", amount: "$1M", investors: ["500 Global"] },
    ],
    news: [
      { date: "2025-02-18", title: "Lao Media Group's streaming app passes 500K downloads", source: "TechLao", url: "#" },
    ],
  },
  {
    slug: "sokxay-manufacturing",
    name: "SokXay Manufacturing",
    logo: sokXayLogo,
    sector: "Manufacturing",
    location: "Savannakhet",
    funding: "$18M",
    stage: "Series B",
    description: "Contract electronics manufacturing for global OEMs.",
    founded: "2012",
    employees: "1,500+",
    website: "sokxay.com",
    overview:
      "SokXay Manufacturing operates electronics assembly lines in the Savannakhet Special Economic Zone, producing components and finished goods for Japanese, Korean, and European clients. The company is a flagship of Laos' growing manufacturing export sector.",
    team: [
      { name: "Bouasone Sokxay", role: "CEO" },
      { name: "Hiroshi Tanaka", role: "Operations Director" },
    ],
    fundingRounds: [
      { date: "2023-02", round: "Series B", amount: "$12M", investors: ["JICA", "Mitsubishi Corp"] },
      { date: "2018-11", round: "Series A", amount: "$6M", investors: ["JBIC"] },
    ],
    news: [
      { date: "2024-10-30", title: "SokXay opens third assembly line, doubling capacity", source: "Manufacturing Asia", url: "#" },
    ],
  },
  {
    slug: "laoride",
    name: "LaoRide",
    logo: laoRideLogo,
    sector: "Mobility & Tech",
    location: "Vientiane",
    funding: "$6.5M",
    stage: "Series A",
    description: "Ride-hailing and food delivery super app for Lao cities.",
    founded: "2020",
    employees: "90",
    website: "laoride.la",
    overview:
      "LaoRide is the leading homegrown ride-hailing platform in Laos, connecting motorbike and car drivers with passengers and offering food and parcel delivery. With over 200,000 active users, LaoRide is building a local alternative to regional super-app giants.",
    team: [
      { name: "Khamla Phongsavan", role: "CEO & Co-founder" },
      { name: "Anothai Vongsa", role: "CTO & Co-founder" },
    ],
    fundingRounds: [
      { date: "2024-09", round: "Series A", amount: "$5M", investors: ["East Ventures", "500 Global"] },
      { date: "2022-04", round: "Seed", amount: "$1.5M", investors: ["Lao-Japan Gateway Fund"] },
    ],
    news: [
      { date: "2025-03-10", title: "LaoRide launches in Luang Prabang and Pakse", source: "TechLao", url: "#" },
    ],
  },
  {
    slug: "champa-coffee",
    name: "Champa Coffee",
    logo: champaCoffeeLogo,
    sector: "Agriculture",
    location: "Bolaven Plateau",
    funding: "$4M",
    stage: "Series A",
    description: "Specialty Arabica coffee producer and exporter from the Bolaven Plateau.",
    founded: "2014",
    employees: "220",
    website: "champacoffee.com",
    overview:
      "Champa Coffee partners with over 800 smallholder farmers on the Bolaven Plateau to produce single-origin specialty Arabica coffee. Their beans are exported to roasters in Japan, Korea, Europe, and the US, while their flagship cafés in Vientiane and Pakse showcase Lao coffee culture.",
    team: [
      { name: "Nina Khounlavong", role: "CEO & Founder" },
      { name: "Somsak Phommachanh", role: "Head of Sourcing" },
    ],
    fundingRounds: [
      { date: "2023-05", round: "Series A", amount: "$3M", investors: ["AgFunder", "Patamar Capital"] },
      { date: "2019-10", round: "Seed", amount: "$1M", investors: ["Mekong Angels"] },
    ],
    news: [
      { date: "2024-12-01", title: "Champa Coffee wins SCA Best of Origin award", source: "Specialty Coffee Asia", url: "#" },
    ],
  },
  {
    slug: "laosilk",
    name: "LaoSilk",
    logo: laoSilkLogo,
    sector: "Retail & Trade",
    location: "Luang Prabang",
    funding: "$2.2M",
    stage: "Seed",
    description: "Heritage textile brand bringing handwoven Lao silk to global markets.",
    founded: "2016",
    employees: "75",
    website: "laosilk.com",
    overview:
      "LaoSilk works with weaving cooperatives across northern Laos to produce contemporary fashion and home textiles rooted in traditional Lao craftsmanship. The brand exports to boutiques in Paris, Tokyo, and New York and has a flagship store in Luang Prabang.",
    team: [
      { name: "Vilayphone Khamvongsa", role: "Founder & Creative Director" },
      { name: "Marie Laurent", role: "Head of Exports" },
    ],
    fundingRounds: [
      { date: "2023-07", round: "Seed", amount: "$2.2M", investors: ["Patamar Capital", "Heritage Fund"] },
    ],
    news: [
      { date: "2024-11-14", title: "LaoSilk featured at Paris Fashion Week pop-up", source: "Vogue Business", url: "#" },
    ],
  },
  {
    slug: "dokkham-hospitality",
    name: "DokKham Hospitality",
    logo: dokKhamLogo,
    sector: "Tourism",
    location: "Luang Prabang",
    funding: "$15M",
    stage: "Series B",
    description: "Boutique hotel and resort group across heritage destinations in Laos.",
    founded: "2011",
    employees: "480",
    website: "dokkham.la",
    overview:
      "DokKham Hospitality operates a portfolio of boutique hotels and eco-resorts in Luang Prabang, Vang Vieng, and Si Phan Don. Known for blending Lao heritage architecture with modern luxury, the group is a leader in sustainable tourism and community-based experiences.",
    team: [
      { name: "Outhai Souvannasao", role: "CEO" },
      { name: "Catherine Dubois", role: "Director of Operations" },
    ],
    fundingRounds: [
      { date: "2023-09", round: "Series B", amount: "$10M", investors: ["Aman Capital", "Mekong Capital"] },
      { date: "2019-03", round: "Series A", amount: "$5M", investors: ["Asia Hospitality Fund"] },
    ],
    news: [
      { date: "2025-01-05", title: "DokKham opens new eco-resort in Si Phan Don", source: "Travel + Leisure Asia", url: "#" },
    ],
  },
];
