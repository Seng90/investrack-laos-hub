import { Landmark, Wifi, Leaf, Plane, Zap, HeartPulse, GraduationCap, ShoppingBag } from "lucide-react";

const categories = [
  { icon: Landmark, name: "Banking & Finance", count: 120 },
  { icon: Wifi, name: "Telecom & IT", count: 95 },
  { icon: Leaf, name: "Agriculture", count: 210 },
  { icon: Plane, name: "Tourism", count: 180 },
  { icon: Zap, name: "Energy & Mining", count: 75 },
  { icon: HeartPulse, name: "Healthcare", count: 60 },
  { icon: GraduationCap, name: "Education", count: 85 },
  { icon: ShoppingBag, name: "Retail & Trade", count: 150 },
];

const IndustryCategories = () => {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Browse</p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Explore by Industry
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className="group cursor-pointer rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-accent/40 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-light transition-colors group-hover:bg-accent">
                <cat.icon className="h-7 w-7 text-accent transition-colors group-hover:text-accent-foreground" />
              </div>
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.count} companies</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryCategories;
