export interface Investor {
  slug: string;
  name: string;
  type: string;
  location: string;
  description: string;
  totalInvestments: number;
  totalFunded: string;
  website: string;
  portfolio: { company: string; slug: string; round: string; amount: string; date: string }[];
}

export const investors: Investor[] = [
  {
    slug: "500-global",
    name: "500 Global",
    type: "Venture Capital",
    location: "San Francisco / Southeast Asia",
    description: "Global venture capital firm with a focus on early-stage startups across emerging markets including Southeast Asia.",
    totalInvestments: 2800,
    totalFunded: "$2.8B",
    website: "500.co",
    portfolio: [
      { company: "LaoStar", slug: "laostar", round: "Series A", amount: "$2.5M", date: "2024-02" },
    ],
  },
  {
    slug: "mekong-angels",
    name: "Mekong Angels",
    type: "Angel Network",
    location: "Vientiane, Laos",
    description: "A regional angel investor network supporting early-stage tech startups in Laos, Cambodia, and the Greater Mekong Subregion.",
    totalInvestments: 18,
    totalFunded: "$4.2M",
    website: "mekongangels.la",
    portfolio: [
      { company: "LaoStar", slug: "laostar", round: "Series A", amount: "$2.5M", date: "2024-02" },
      { company: "GreenMekong", slug: "greenmekong", round: "Seed", amount: "$500K", date: "2022-01" },
    ],
  },
  {
    slug: "wavemaker-partners",
    name: "Wavemaker Partners",
    type: "Venture Capital",
    location: "Singapore",
    description: "Southeast Asia's largest early-stage VC firm, focused on enterprise and deep-tech startups across ASEAN markets.",
    totalInvestments: 200,
    totalFunded: "$350M",
    website: "wavemakerpartners.com",
    portfolio: [
      { company: "GreenMekong", slug: "greenmekong", round: "Series A", amount: "$2M", date: "2024-04" },
    ],
  },
  {
    slug: "patamar-capital",
    name: "Patamar Capital",
    type: "Impact Fund",
    location: "Ho Chi Minh City",
    description: "Impact-driven venture fund investing in companies that improve lives across emerging Southeast Asian markets.",
    totalInvestments: 35,
    totalFunded: "$120M",
    website: "patamar.com",
    portfolio: [
      { company: "PharmaLao", slug: "pharmalao", round: "Seed", amount: "$1.8M", date: "2023-09" },
    ],
  },
  {
    slug: "korea-investment-partners",
    name: "Korea Investment Partners",
    type: "Venture Capital",
    location: "Seoul, South Korea",
    description: "One of Korea's leading VC firms with active investments in ASEAN automotive and mobility sectors.",
    totalInvestments: 450,
    totalFunded: "$3.5B",
    website: "kipvc.com",
    portfolio: [
      { company: "Kolao Group", slug: "kolao-group", round: "Series D", amount: "$30M", date: "2023-03" },
    ],
  },
  {
    slug: "mekong-capital",
    name: "Mekong Capital",
    type: "Private Equity",
    location: "Ho Chi Minh City",
    description: "Private equity firm focused on consumer-driven growth companies in Vietnam and the Greater Mekong region.",
    totalInvestments: 52,
    totalFunded: "$600M",
    website: "mekongcapital.com",
    portfolio: [
      { company: "Kolao Group", slug: "kolao-group", round: "Series D", amount: "$30M", date: "2023-03" },
    ],
  },
  {
    slug: "ifc",
    name: "IFC (World Bank Group)",
    type: "Development Finance",
    location: "Washington, D.C.",
    description: "The International Finance Corporation provides investment and advisory services to stimulate private sector development in emerging economies.",
    totalInvestments: 2000,
    totalFunded: "$23B",
    website: "ifc.org",
    portfolio: [
      { company: "BCEL", slug: "bcel", round: "Government Recapitalization", amount: "$20M", date: "2020-06" },
    ],
  },
  {
    slug: "vnpt",
    name: "VNPT",
    type: "Strategic / Corporate",
    location: "Hanoi, Vietnam",
    description: "Vietnam Posts and Telecommunications Group — major state-owned telecom providing strategic investment and partnership in Lao infrastructure.",
    totalInvestments: 12,
    totalFunded: "$1.2B",
    website: "vnpt.vn",
    portfolio: [
      { company: "Lao Telecom", slug: "lao-telecom", round: "Infrastructure Investment", amount: "$50M", date: "2022-01" },
      { company: "Lao Telecom", slug: "lao-telecom", round: "5G Trial Funding", amount: "$30M", date: "2019-06" },
    ],
  },
  {
    slug: "somsack-vongkhamheng",
    name: "Somsack Vongkhamheng",
    type: "Angel Investor",
    location: "Vientiane, Laos",
    description: "Serial entrepreneur and angel investor backing early-stage Lao founders in fintech, e-commerce, and consumer apps. Former operator with two successful exits in Southeast Asia.",
    totalInvestments: 14,
    totalFunded: "$1.6M",
    website: "linkedin.com/in/somsackv",
    portfolio: [
      { company: "LaoStar", slug: "laostar", round: "Pre-Seed", amount: "$120K", date: "2023-05" },
      { company: "GreenMekong", slug: "greenmekong", round: "Seed", amount: "$250K", date: "2022-01" },
    ],
  },
  {
    slug: "khamla-sundara",
    name: "Khamla Sundara",
    type: "Angel Investor",
    location: "Luang Prabang, Laos",
    description: "Hospitality entrepreneur and private investor focused on tourism, F&B, and creative industries across northern Laos. Mentor at Mekong Angels.",
    totalInvestments: 9,
    totalFunded: "$850K",
    website: "linkedin.com/in/khamla",
    portfolio: [
      { company: "LaoTravel", slug: "laotravel", round: "Seed", amount: "$200K", date: "2023-08" },
    ],
  },
  {
    slug: "dr-bounmy-phommachanh",
    name: "Dr. Bounmy Phommachanh",
    type: "Angel Investor",
    location: "Vientiane, Laos",
    description: "Physician-turned-investor supporting healthtech, biotech, and pharmaceutical ventures in the Lao PDR. Co-founder of two regional healthcare clinics.",
    totalInvestments: 7,
    totalFunded: "$1.1M",
    website: "linkedin.com/in/drbounmy",
    portfolio: [
      { company: "PharmaLao", slug: "pharmalao", round: "Pre-Seed", amount: "$180K", date: "2023-03" },
    ],
  },
  {
    slug: "anouxa-keomany",
    name: "Anouxa Keomany",
    type: "Angel Investor",
    location: "Singapore / Vientiane",
    description: "Diaspora tech executive investing in Lao founders building cross-border SaaS and logistics platforms. Advisor to several ASEAN accelerators.",
    totalInvestments: 11,
    totalFunded: "$2.3M",
    website: "anouxa.co",
    portfolio: [
      { company: "Mekong Logistics", slug: "mekong-logistics", round: "Seed", amount: "$400K", date: "2024-01" },
      { company: "LaoRide", slug: "laoride", round: "Pre-Seed", amount: "$150K", date: "2023-06" },
    ],
  },
  {
    slug: "vilaysone-souvannavong",
    name: "Vilaysone Souvannavong",
    type: "Family Office",
    location: "Vientiane, Laos",
    description: "Private family office representing a multi-generation Lao business family with investments spanning real estate, agribusiness, and consumer brands.",
    totalInvestments: 22,
    totalFunded: "$18M",
    website: "—",
    portfolio: [
      { company: "Vientiane Realty", slug: "vientiane-realty", round: "Growth", amount: "$3M", date: "2023-11" },
      { company: "Champa Coffee", slug: "champa-coffee", round: "Series A", amount: "$1.2M", date: "2024-02" },
    ],
  },
];

export const getInvestorBySlug = (slug: string): Investor | undefined => {
  return investors.find((i) => i.slug === slug);
};
