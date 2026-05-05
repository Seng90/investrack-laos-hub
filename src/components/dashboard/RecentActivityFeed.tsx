import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DollarSign, ArrowUpRight } from "lucide-react";
import { companies } from "@/data/companies";

type Activity = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  link: string;
};

const RecentActivityFeed = () => {
  const activities = useMemo<Activity[]>(() => {
    const items: Activity[] = [];

    companies.forEach((c) => {
      c.fundingRounds.forEach((r, i) => {
        items.push({
          id: `${c.slug}-fr-${i}`,
          date: r.date,
          title: `${c.name} raised ${r.amount}`,
          subtitle: `${r.round} · ${r.investors.slice(0, 2).join(", ")}`,
          link: `/company/${c.slug}`,
        });
      });
    });

    return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Recent Funding
        </h2>
        <Link
          to="/companies"
          className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          View All <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-1">
        {activities.map((a) => (
          <Link
            key={a.id}
            to={a.link}
            className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary/50"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {a.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {a.subtitle}
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {formatDate(a.date)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;
