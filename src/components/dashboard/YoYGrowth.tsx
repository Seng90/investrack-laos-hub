import { useMemo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { FundingRound } from "@/data/companies";

interface Props {
  rounds: (FundingRound & { amountNum: number })[];
}

const YoYGrowth = ({ rounds }: Props) => {
  const yearlyGrowth = useMemo(() => {
    const yearMap: Record<string, number> = {};
    rounds.forEach((r) => {
      const year = r.date.slice(0, 4);
      yearMap[year] = (yearMap[year] || 0) + r.amountNum;
    });

    const years = Object.keys(yearMap).sort();
    return years.map((year, i) => {
      const current = yearMap[year];
      const prev = i > 0 ? yearMap[years[i - 1]] : null;
      const growth = prev ? ((current - prev) / prev) * 100 : null;
      return { year, amount: current, growth };
    });
  }, [rounds]);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
        Year-over-Year Growth
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {yearlyGrowth.map(({ year, amount, growth }) => (
          <div
            key={year}
            className="rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/60"
          >
            <p className="text-xs font-medium text-muted-foreground">{year}</p>
            <p className="font-display text-lg font-bold text-foreground">
              ${amount.toFixed(1)}M
            </p>
            {growth !== null ? (
              <div
                className={`mt-1 flex items-center gap-1 text-xs font-semibold ${
                  growth > 0
                    ? "text-[hsl(var(--emerald))]"
                    : growth < 0
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {growth > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : growth < 0 ? (
                  <TrendingDown className="h-3.5 w-3.5" />
                ) : (
                  <Minus className="h-3.5 w-3.5" />
                )}
                {growth > 0 ? "+" : ""}
                {growth.toFixed(0)}%
              </div>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">Baseline</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoYGrowth;
