import { companies } from "../src/data/companies";

const categories = [
  { name: "Banking & Finance", count: 120 },
  { name: "Telecom & IT", count: 95 },
  { name: "Agriculture", count: 210 },
  { name: "Tourism", count: 180 },
  { name: "Energy & Mining", count: 75 },
  { name: "Healthcare", count: 60 },
  { name: "Education", count: 85 },
  { name: "Retail & Trade", count: 150 },
];

const allSectors = [...new Set(companies.map((c) => c.sector))].sort();
console.log(`Total companies: ${companies.length}`);
console.log(`Sectors in data:\n  - ${allSectors.join("\n  - ")}\n`);

for (const cat of categories) {
  const q = cat.name.toLowerCase();
  const matches = companies.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q) ||
      q.includes(c.sector.toLowerCase().split(" ")[0]);
    const matchesSector = [cat.name].includes(c.sector);
    return matchesQuery && matchesSector;
  });
  console.log(`[${cat.name}] hardcoded=${cat.count} | actual=${matches.length}`);
  console.log(`  -> ${matches.map((c) => c.name + " (" + c.sector + ")").join(", ") || "NONE"}`);
}
