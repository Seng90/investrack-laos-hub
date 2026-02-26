import { ArrowUpRight, TrendingUp, Calendar, Building2, DollarSign } from "lucide-react";

const fundings = [
  { company: "LaoStar", amount: "$3.2M", round: "Series A", date: "Feb 2026", investors: "Lao Holdings, Mekong Capital", sector: "Fintech", valuation: "$18M", logo: "L" },
  { company: "GreenMekong", amount: "$2.5M", round: "Series A", date: "Jan 2026", investors: "ASEAN Growth Fund", sector: "Agriculture", valuation: "$14M", logo: "G" },
  { company: "PharmaLao", amount: "$1.8M", round: "Seed", date: "Jan 2026", investors: "Health Ventures Lao", sector: "Healthcare", valuation: "$6M", logo: "P" },
  { company: "EduLao", amount: "$900K", round: "Pre-Seed", date: "Dec 2025", investors: "Impact Partners SEA", sector: "Education", valuation: "$3.5M", logo: "E" },
  { company: "LaoLogistics", amount: "$5M", round: "Series B", date: "Dec 2025", investors: "Dragon Capital, Lao Dev Bank", sector: "Logistics", valuation: "$30M", logo: "L" },
  { company: "VientianePay", amount: "$1.2M", round: "Seed", date: "Nov 2025", investors: "Mekong Angel Network", sector: "Fintech", valuation: "$5M", logo: "V" },
];

const roundColor = (round: string) => {
  if (round === "Series B") return "bg-emerald/10 text-emerald border-emerald/20";
  if (round === "Series A") return "bg-accent/10 text-accent border-accent/20";
  if (round === "Seed") return "bg-primary/10 text-primary border-primary/20";
  return "bg-secondary text-muted-foreground border-border";
};

const RecentFunding = () => {
  const totalRaised = fundings.reduce((sum, f) => {
    const num = parseFloat(f.amount.replace(/[^0-9.]/g, ""));
    const multiplier = f.amount.includes("K") ? 0.001 : 1;
    return sum + num * multiplier;
  }, 0);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Latest</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Recent Funding Rounds
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Stay updated on the latest investments flowing into Lao businesses. Real-time tracking of deals across every stage.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
              <p className="font-display text-2xl font-bold text-accent">${totalRaised.toFixed(1)}M</p>
              <p className="text-xs text-muted-foreground">Total Raised</p>
            </div>
            <div className="rounded-xl border border-border bg-card px-5 py-3 text-center">
              <p className="font-display text-2xl font-bold text-foreground">{fundings.length}</p>
              <p className="text-xs text-muted-foreground">Deals</p>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
          <div className="grid grid-cols-6 gap-4 border-b border-border bg-secondary/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Company</span>
            <span>Amount</span>
            <span>Round</span>
            <span>Valuation</span>
            <span>Investors</span>
            <span>Date</span>
          </div>
          {fundings.map((f, i) => (
            <div
              key={i}
              className="group grid cursor-pointer grid-cols-6 items-center gap-4 border-b border-border px-6 py-4 transition-colors last:border-0 hover:bg-secondary/30"
            >
              <span className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-navy-light font-display text-sm font-bold text-primary-foreground">
                  {f.logo}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">{f.company}</p>
                  <p className="text-xs text-muted-foreground">{f.sector}</p>
                </div>
              </span>
              <span className="flex items-center gap-1 font-semibold text-accent">
                <DollarSign className="h-3.5 w-3.5" /> {f.amount.replace("$", "")}
              </span>
              <span>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${roundColor(f.round)}`}>{f.round}</span>
              </span>
              <span className="text-sm text-muted-foreground">{f.valuation}</span>
              <span className="text-sm text-muted-foreground">{f.investors}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" /> {f.date}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {fundings.map((f, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-navy-light font-display text-sm font-bold text-primary-foreground">
                    {f.logo}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{f.company}</p>
                    <p className="text-xs text-muted-foreground">{f.sector}</p>
                  </div>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${roundColor(f.round)}`}>{f.round}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Amount:</span> <span className="font-semibold text-accent">{f.amount}</span></div>
                <div><span className="text-muted-foreground">Valuation:</span> <span className="text-foreground">{f.valuation}</span></div>
                <div className="col-span-2"><span className="text-muted-foreground">Investors:</span> <span className="text-foreground">{f.investors}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground">{f.date}</span></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View all rounds <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentFunding;
