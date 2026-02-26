import { Landmark, Wifi, Leaf, Plane, Zap, HeartPulse, GraduationCap, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: Landmark, name: "Banking & Finance", count: 120, growth: "+18%", description: "Commercial banks, microfinance, and digital payment solutions" },
  { icon: Wifi, name: "Telecom & IT", count: 95, growth: "+32%", description: "Connectivity, software development, and digital services" },
  { icon: Leaf, name: "Agriculture", count: 210, growth: "+12%", description: "Farming, agri-tech, organic exports, and food processing" },
  { icon: Plane, name: "Tourism", count: 180, growth: "+25%", description: "Hotels, tour operators, eco-tourism, and travel tech" },
  { icon: Zap, name: "Energy & Mining", count: 75, growth: "+8%", description: "Hydropower, solar energy, and mineral extraction" },
  { icon: HeartPulse, name: "Healthcare", count: 60, growth: "+22%", description: "Hospitals, pharma, telemedicine, and health-tech startups" },
  { icon: GraduationCap, name: "Education", count: 85, growth: "+28%", description: "EdTech platforms, schools, and vocational training" },
  { icon: ShoppingBag, name: "Retail & Trade", count: 150, growth: "+15%", description: "E-commerce, cross-border trade, and consumer goods" },
];

const IndustryCategories = () => {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-4 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Browse</p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Explore by Industry
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Discover investment opportunities across Laos's most dynamic sectors. Each category tracks real-time company data, funding activity, and growth trends.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              to={`/search?q=${encodeURIComponent(cat.name)}`}
              key={cat.name}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-lg hover:-translate-y-1 animate-fade-in block"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-light transition-colors group-hover:bg-accent">
                  <cat.icon className="h-7 w-7 text-accent transition-colors group-hover:text-accent-foreground" />
                </div>
                <span className="rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs font-semibold text-emerald">
                  {cat.growth}
                </span>
              </div>
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{cat.name}</h3>
              <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">{cat.description}</p>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">{cat.count}</span> companies</p>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryCategories;
