import { Building2, Users, TrendingUp, Globe } from "lucide-react";

const stats = [
  { icon: Building2, label: "Companies", value: "2,400+", color: "text-accent" },
  { icon: Users, label: "Investors", value: "340+", color: "text-emerald" },
  { icon: TrendingUp, label: "Funding Rounds", value: "$180M+", color: "text-accent" },
  { icon: Globe, label: "Industries", value: "45+", color: "text-emerald" },
];

const StatsBar = () => {
  return (
    <section className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 animate-count-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
