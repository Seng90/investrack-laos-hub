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
];

export const getInvestorBySlug = (slug: string): Investor | undefined => {
  return investors.find((i) => i.slug === slug);
};
