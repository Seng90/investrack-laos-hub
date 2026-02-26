import { ArrowUpRight, Newspaper, BarChart3, TrendingUp, Globe } from "lucide-react";

const newsItems = [
  {
    category: "Funding",
    title: "Lao Government Launches $50M Tech Innovation Fund",
    excerpt: "A new government-backed initiative to accelerate digital transformation across the Lao economy, targeting 200+ startups by 2028.",
    date: "Feb 24, 2026",
    source: "Vientiane Times",
    featured: true,
  },
  {
    category: "News",
    title: "ASEAN Investors Eye Lao Agriculture Sector",
    excerpt: "Regional investors from Thailand and Vietnam are increasing cross-border investments in Lao organic farming and agri-tech.",
    date: "Feb 20, 2026",
    source: "Mekong Business",
    featured: false,
  },
  {
    category: "Funding",
    title: "Microfinance Boom: 3 New Lenders Enter Market",
    excerpt: "Digital-first microfinance providers are disrupting traditional lending in rural Laos with mobile-based solutions.",
    date: "Feb 18, 2026",
    source: "Asia Finance",
    featured: false,
  },
  {
    category: "News",
    title: "Laos-China Railway Drives Logistics Investment",
    excerpt: "The high-speed rail link continues to attract $100M+ in warehouse and supply chain startups along the corridor.",
    date: "Feb 15, 2026",
    source: "Reuters SE Asia",
    featured: false,
  },
];

const stats = [
  { icon: BarChart3, label: "Total Funding 2026", value: "$42.8M" },
  { icon: TrendingUp, label: "YoY Growth", value: "+67%" },
  { icon: Globe, label: "Active Investors", value: "128" },
];

const FundingNews = () => {
  const featured = newsItems.find((n) => n.featured);
  const rest = newsItems.filter((n) => !n.featured);

  return (
    <section className="bg-secondary/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Insights</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Funding & Market News
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              The latest funding announcements, market trends, and business news from the Lao investment ecosystem.
            </p>
          </div>
          <div className="flex gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3 text-center">
                <s.icon className="mx-auto mb-1 h-4 w-4 text-accent" />
                <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Featured article */}
          {featured && (
            <div className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary to-navy-light p-8 min-h-[300px] cursor-pointer transition-all hover:shadow-xl">
              <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                <Newspaper className="h-3 w-3" /> {featured.category}
              </span>
              <h3 className="mb-2 font-display text-2xl font-bold text-primary-foreground group-hover:text-accent transition-colors">
                {featured.title}
              </h3>
              <p className="mb-4 text-sm text-primary-foreground/70">{featured.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-primary-foreground/50">
                <span>{featured.source}</span>
                <span>{featured.date}</span>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-t from-accent/10 to-transparent" />
            </div>
          )}

          {/* Other articles */}
          <div className="flex flex-col gap-4">
            {rest.map((item, i) => (
              <div
                key={i}
                className="group flex cursor-pointer gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.category === "Funding" ? "bg-accent/10 text-accent" : "bg-emerald/10 text-emerald"}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h4 className="mb-1 font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
                  <p className="mt-2 text-[10px] text-muted-foreground">{item.source}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingNews;
