import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Building2,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import DashboardFilters, {
  type DashboardFilterState,
} from "@/components/dashboard/DashboardFilters";
import MonthlyFundingChart from "@/components/dashboard/MonthlyFundingChart";
import YoYGrowth from "@/components/dashboard/YoYGrowth";
import RecentActivityFeed from "@/components/dashboard/RecentActivityFeed";
import { companies } from "@/data/companies";
import { investors } from "@/data/investors";

const parseFunding = (str: string): number => {
  const num = parseFloat(str.replace(/[^0-9.]/g, ""));
  if (str.includes("B")) return num * 1000;
  if (str.includes("K")) return num / 1000;
  return num;
};

const COLORS = [
  "hsl(var(--accent))",
  "hsl(var(--emerald))",
  "hsl(var(--navy-light))",
  "hsl(220, 60%, 55%)",
  "hsl(340, 65%, 50%)",
  "hsl(25, 75%, 55%)",
];

const defaultYearBounds = (): [number, number] => {
  const years = companies.flatMap((c) =>
    c.fundingRounds.map((r) => parseInt(r.date.slice(0, 4)))
  );
  return [Math.min(...years), Math.max(...years)];
};

const Dashboard = () => {
  const [filters, setFilters] = useState<DashboardFilterState>({
    sector: "All Sectors",
    yearRange: defaultYearBounds(),
    investorType: "All Types",
  });

  // Filtered companies
  const filteredCompanies = useMemo(
    () =>
      companies.filter(
        (c) => filters.sector === "All Sectors" || c.sector === filters.sector
      ),
    [filters.sector]
  );

  // Filtered investors
  const filteredInvestors = useMemo(
    () =>
      investors.filter(
        (i) => filters.investorType === "All Types" || i.type === filters.investorType
      ),
    [filters.investorType]
  );

  const filteredInvestorSlugs = useMemo(
    () => new Set(filteredInvestors.map((i) => i.slug)),
    [filteredInvestors]
  );

  // All rounds filtered by sector + year range
  const allRounds = useMemo(
    () =>
      filteredCompanies
        .flatMap((c) =>
          c.fundingRounds.map((r) => ({
            ...r,
            company: c.name,
            sector: c.sector,
            amountNum: parseFunding(r.amount),
          }))
        )
        .filter((r) => {
          const year = parseInt(r.date.slice(0, 4));
          return year >= filters.yearRange[0] && year <= filters.yearRange[1];
        })
        .sort((a, b) => a.date.localeCompare(b.date)),
    [filteredCompanies, filters.yearRange]
  );

  const totalFunding = useMemo(
    () => allRounds.reduce((sum, r) => sum + r.amountNum, 0),
    [allRounds]
  );

  const fundingOverTime = useMemo(() => {
    const map: Record<string, number> = {};
    let cumulative = 0;
    allRounds.forEach((r) => {
      const year = r.date.slice(0, 4);
      cumulative += r.amountNum;
      map[year] = cumulative;
    });
    return Object.entries(map).map(([year, total]) => ({ year, total }));
  }, [allRounds]);

  const sectorDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    allRounds.forEach((r) => {
      map[r.sector] = (map[r.sector] || 0) + r.amountNum;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [allRounds]);

  const topInvestors = useMemo(
    () =>
      filteredInvestors
        .map((inv) => {
          const filteredPortfolio = inv.portfolio.filter((p) => {
            const year = parseInt(p.date.slice(0, 4));
            const companyMatch =
              filters.sector === "All Sectors" ||
              filteredCompanies.some((c) => c.slug === p.slug);
            return (
              companyMatch &&
              year >= filters.yearRange[0] &&
              year <= filters.yearRange[1]
            );
          });
          return {
            ...inv,
            laoDeals: filteredPortfolio.length,
            laoFunded: filteredPortfolio.reduce(
              (s, p) => s + parseFunding(p.amount),
              0
            ),
          };
        })
        .filter((inv) => inv.laoDeals > 0)
        .sort((a, b) => b.laoFunded - a.laoFunded)
        .slice(0, 6),
    [filteredInvestors, filteredCompanies, filters]
  );

  const stats = [
    { label: "Total Funding", value: `$${totalFunding.toFixed(1)}M`, icon: DollarSign },
    { label: "Companies Tracked", value: filteredCompanies.length.toString(), icon: Building2 },
    { label: "Active Investors", value: filteredInvestors.length.toString(), icon: Users },
    { label: "Funding Rounds", value: allRounds.length.toString(), icon: TrendingUp },
  ];

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: "Dashboard" }]} />

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Ecosystem Dashboard
            </h1>
            <p className="mt-2 text-muted-foreground">
              Real-time analytics of the Lao investment ecosystem
            </p>
          </div>

          {/* Filters */}
          <DashboardFilters filters={filters} onChange={setFilters} />

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <s.icon className="h-5 w-5 text-accent" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                Cumulative Funding Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fundingOverTime}>
                  <defs>
                    <linearGradient id="gradFunding" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [`$${value.toFixed(1)}M`, "Total Funding"]}
                  />
                  <Area type="monotone" dataKey="total" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#gradFunding)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                Funding by Sector
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name.length > 12 ? name.slice(0, 12) + "…" : name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {sectorDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [`$${value}M`, "Funding"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "hsl(var(--muted-foreground))" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="mb-8">
            <MonthlyFundingChart rounds={allRounds} />
          </div>

          {/* Year-over-Year Growth */}
          <div className="mb-8">
            <YoYGrowth rounds={allRounds} />
          </div>

          {/* Activity Feed + Investors Leaderboard */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <RecentActivityFeed />

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Top Investors in Laos
                </h2>
                <Link
                  to="/investors"
                  className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  View All <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="pb-3 pr-4 font-medium">#</th>
                      <th className="pb-3 pr-4 font-medium">Investor</th>
                      <th className="pb-3 pr-4 font-medium">Type</th>
                      <th className="pb-3 pr-4 font-medium text-right">Deals</th>
                      <th className="pb-3 font-medium text-right">Funding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topInvestors.map((inv, i) => (
                      <tr
                        key={inv.slug}
                        className="border-b border-border/50 transition-colors hover:bg-secondary/50"
                      >
                        <td className="py-3 pr-4 font-display font-bold text-accent">
                          {i + 1}
                        </td>
                        <td className="py-3 pr-4">
                          <Link
                            to={`/investor/${inv.slug}`}
                            className="font-medium text-foreground hover:text-accent"
                          >
                            {inv.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {inv.location}
                          </p>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                            {inv.type}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-right font-medium text-foreground">
                          {inv.laoDeals}
                        </td>
                        <td className="py-3 text-right font-display font-bold text-accent">
                          ${inv.laoFunded}M
                        </td>
                      </tr>
                    ))}
                    {topInvestors.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-muted-foreground">
                          No investors match the current filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Dashboard;
