import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { FundingRound } from "@/data/companies";

interface Props {
  rounds: (FundingRound & { amountNum: number })[];
}

const MonthlyFundingChart = ({ rounds }: Props) => {
  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    rounds.forEach((r) => {
      const key = r.date.slice(0, 7); // YYYY-MM
      map[key] = (map[key] || 0) + r.amountNum;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        amount,
      }));
  }, [rounds]);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
        Monthly Funding Trends
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            angle={-35}
            textAnchor="end"
            height={50}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(v) => `$${v}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [`$${value.toFixed(1)}M`, "Funding"]}
          />
          <Bar
            dataKey="amount"
            fill="hsl(var(--accent))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyFundingChart;
