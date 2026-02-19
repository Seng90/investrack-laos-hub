import { ArrowUpRight } from "lucide-react";

const fundings = [
  { company: "LaoStar", amount: "$3.2M", round: "Series A", date: "Feb 2026", investors: "Lao Holdings, Mekong Capital" },
  { company: "GreenMekong", amount: "$2.5M", round: "Series A", date: "Jan 2026", investors: "ASEAN Growth Fund" },
  { company: "PharmaLao", amount: "$1.8M", round: "Seed", date: "Jan 2026", investors: "Health Ventures Lao" },
  { company: "EduLao", amount: "$900K", round: "Pre-Seed", date: "Dec 2025", investors: "Impact Partners SEA" },
  { company: "LaoLogistics", amount: "$5M", round: "Series B", date: "Dec 2025", investors: "Dragon Capital, Lao Dev Bank" },
];

const RecentFunding = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Latest</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Recent Funding Rounds
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline md:flex">
            All rounds <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="hidden grid-cols-5 gap-4 border-b border-border bg-secondary/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
            <span>Company</span>
            <span>Amount</span>
            <span>Round</span>
            <span>Investors</span>
            <span>Date</span>
          </div>
          {fundings.map((f, i) => (
            <div
              key={i}
              className="group grid cursor-pointer grid-cols-1 gap-2 border-b border-border px-6 py-4 transition-colors last:border-0 hover:bg-secondary/30 md:grid-cols-5 md:items-center md:gap-4"
            >
              <span className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">{f.company}</span>
              <span className="font-semibold text-accent">{f.amount}</span>
              <span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{f.round}</span>
              </span>
              <span className="text-sm text-muted-foreground">{f.investors}</span>
              <span className="text-sm text-muted-foreground">{f.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentFunding;
