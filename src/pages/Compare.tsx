import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftRight, Building2, MapPin, Users, Calendar, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import { companies, Company } from "@/data/companies";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const parseFunding = (f: string) => parseFloat(f.replace(/[^0-9.]/g, ""));
const parseEmployees = (e: string) => parseInt(e.replace(/[^0-9]/g, ""));

const generateRadarData = (a: Company, b: Company) => {
  const aFund = parseFunding(a.funding);
  const bFund = parseFunding(b.funding);
  const aEmp = parseEmployees(a.employees);
  const bEmp = parseEmployees(b.employees);
  const aAge = 2025 - parseInt(a.founded);
  const bAge = 2025 - parseInt(b.founded);
  const aRounds = a.fundingRounds.length;
  const bRounds = b.fundingRounds.length;
  const aTeam = a.team.length;
  const bTeam = b.team.length;
  const normalize = (val: number, max: number) => max > 0 ? Math.round((val / max) * 100) : 0;
  const maxFund = Math.max(aFund, bFund);
  const maxEmp = Math.max(aEmp, bEmp);
  const maxAge = Math.max(aAge, bAge);
  const maxRounds = Math.max(aRounds, bRounds);
  const maxTeam = Math.max(aTeam, bTeam);

  return [
    { metric: "Funding", [a.name]: normalize(aFund, maxFund), [b.name]: normalize(bFund, maxFund) },
    { metric: "Team Size", [a.name]: normalize(aEmp, maxEmp), [b.name]: normalize(bEmp, maxEmp) },
    { metric: "Company Age", [a.name]: normalize(aAge, maxAge), [b.name]: normalize(bAge, maxAge) },
    { metric: "Funding Rounds", [a.name]: normalize(aRounds, maxRounds), [b.name]: normalize(bRounds, maxRounds) },
    { metric: "Leadership", [a.name]: normalize(aTeam, maxTeam), [b.name]: normalize(bTeam, maxTeam) },
  ];
};

const generateFundingComparison = (a: Company, b: Company) => {
  const years = new Set<string>();
  const aByYear: Record<string, number> = {};
  const bByYear: Record<string, number> = {};
  a.fundingRounds.forEach((r) => { const y = r.date.slice(0, 4); years.add(y); aByYear[y] = (aByYear[y] || 0) + parseFunding(r.amount); });
  b.fundingRounds.forEach((r) => { const y = r.date.slice(0, 4); years.add(y); bByYear[y] = (bByYear[y] || 0) + parseFunding(r.amount); });
  return [...years].sort().map((y) => ({ year: y, [a.name]: aByYear[y] || 0, [b.name]: bByYear[y] || 0 }));
};

const MetricRow = ({ label, valueA, valueB, highlight }: { label: string; valueA: string; valueB: string; highlight?: "a" | "b" | null }) => (
  <div className="grid grid-cols-3 items-center gap-4 py-3">
    <div className={`text-right font-medium ${highlight === "a" ? "text-accent" : "text-foreground"}`}>{valueA}</div>
    <div className="text-center text-sm text-muted-foreground">{label}</div>
    <div className={`text-left font-medium ${highlight === "b" ? "text-accent" : "text-foreground"}`}>{valueB}</div>
  </div>
);

const Compare = () => {
  const [slugA, setSlugA] = useState(companies[0]?.slug || "");
  const [slugB, setSlugB] = useState(companies[1]?.slug || "");

  const companyA = companies.find((c) => c.slug === slugA);
  const companyB = companies.find((c) => c.slug === slugB);

  const swap = () => { setSlugA(slugB); setSlugB(slugA); };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumbs items={[{ label: "Companies", href: "/companies" }, { label: "Compare" }]} />
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Compare <span className="text-accent">Companies</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Side-by-side comparison of key metrics and performance data.</p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
              <Select value={slugA} onValueChange={setSlugA}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((c) => (
                    <SelectItem key={c.slug} value={c.slug} disabled={c.slug === slugB}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button onClick={swap} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <ArrowLeftRight className="h-4 w-4" />
              </button>

              <Select value={slugB} onValueChange={setSlugB}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((c) => (
                    <SelectItem key={c.slug} value={c.slug} disabled={c.slug === slugA}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {companyA && companyB && (
          <main className="container mx-auto px-4 py-8 space-y-8">
            {/* Company headers */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {[companyA, companyB].map((c) => (
                <Link key={c.slug} to={`/company/${c.slug}`} className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-lg">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card overflow-hidden">
                    <img src={c.logo} alt={c.name} className="h-full w-full object-contain p-1.5" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">{c.name}</h2>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" /> {c.location}</p>
                    <p className="text-xs text-muted-foreground">{c.sector}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Key metrics comparison */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-center font-display text-lg font-bold text-foreground">Key Metrics</h3>
              <Separator className="mb-2" />
              <MetricRow label="Total Funding" valueA={companyA.funding} valueB={companyB.funding} highlight={parseFunding(companyA.funding) > parseFunding(companyB.funding) ? "a" : parseFunding(companyB.funding) > parseFunding(companyA.funding) ? "b" : null} />
              <Separator />
              <MetricRow label="Employees" valueA={companyA.employees} valueB={companyB.employees} highlight={parseEmployees(companyA.employees) > parseEmployees(companyB.employees) ? "a" : parseEmployees(companyB.employees) > parseEmployees(companyA.employees) ? "b" : null} />
              <Separator />
              <MetricRow label="Founded" valueA={companyA.founded} valueB={companyB.founded} />
              <Separator />
              <MetricRow label="Stage" valueA={companyA.stage} valueB={companyB.stage} />
              <Separator />
              <MetricRow label="Sector" valueA={companyA.sector} valueB={companyB.sector} />
              <Separator />
              <MetricRow label="Funding Rounds" valueA={companyA.fundingRounds.length.toString()} valueB={companyB.fundingRounds.length.toString()} />
              <Separator />
              <MetricRow label="Team Size" valueA={companyA.team.length.toString()} valueB={companyB.team.length.toString()} />
            </div>

            {/* Charts */}
            <div className="grid gap-8 lg:grid-cols-2 [&_.recharts-wrapper]:!max-w-full">
              {/* Radar chart */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">Overall Comparison</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={generateRadarData(companyA, companyB)}>
                    <PolarGrid stroke="hsl(220, 15%, 88%)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(220, 10%, 45%)" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar name={companyA.name} dataKey={companyA.name} stroke="hsl(42, 85%, 55%)" fill="hsl(42, 85%, 55%)" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name={companyB.name} dataKey={companyB.name} stroke="hsl(160, 60%, 40%)" fill="hsl(160, 60%, 40%)" fillOpacity={0.25} strokeWidth={2} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Funding by year */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 font-display text-lg font-bold text-foreground">Funding by Year ($M)</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={generateFundingComparison(companyA, companyB)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(220, 10%, 45%)" }} />
                    <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 45%)" }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Bar dataKey={companyA.name} fill="hsl(42, 85%, 55%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={companyB.name} fill="hsl(160, 60%, 40%)" radius={[4, 4, 0, 0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        )}

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Compare;
