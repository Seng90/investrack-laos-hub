import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  MapPin,
  Briefcase,
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Separator } from "@/components/ui/separator";
import { getInvestorBySlug } from "@/data/investors";
import { getCompanyBySlug } from "@/data/companies";

const typeBadgeClass = (type: string) => {
  const map: Record<string, string> = {
    "Venture Capital": "bg-accent/10 text-accent border-accent/20",
    "Angel Network": "bg-emerald/10 text-emerald border-emerald/20",
    "Impact Fund": "bg-primary/10 text-primary border-primary/20",
    "Angel Investor": "bg-gold/10 text-gold border-gold/20",
    "Family Office": "bg-navy/10 text-navy border-navy/20 dark:text-navy-light",
    "Private Equity": "bg-purple-500/10 text-purple-600 border-purple-500/20",
    "Development Finance": "bg-sky-500/10 text-sky-600 border-sky-500/20",
    "Strategic / Corporate": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  };
  return map[type] || "bg-secondary text-muted-foreground border-border";
};

const parseAmount = (amount: string): number => {
  const clean = amount.replace(/[$,]/g, "");
  if (clean.includes("K")) return parseFloat(clean.replace("K", "")) * 1_000;
  if (clean.includes("M")) return parseFloat(clean.replace("M", "")) * 1_000_000;
  if (clean.includes("B")) return parseFloat(clean.replace("B", "")) * 1_000_000_000;
  return parseFloat(clean) || 0;
};

const formatCurrency = (n: number): string => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
};

const InvestorDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const investor = getInvestorBySlug(slug || "");

  if (!investor) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Investor not found
            </h1>
            <p className="mt-2 text-muted-foreground">
              The investor you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              to="/investors"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to investors
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Enrich portfolio with company details
  const enrichedPortfolio = investor.portfolio.map((p) => {
    const company = getCompanyBySlug(p.slug);
    return { ...p, sector: company?.sector, stage: company?.stage, logo: company?.logo };
  });

  // Compute stats
  const portfolioAmounts = investor.portfolio.map((p) => parseAmount(p.amount));
  const totalPortfolio = portfolioAmounts.reduce((a, b) => a + b, 0);
  const avgCheck = portfolioAmounts.length > 0 ? totalPortfolio / portfolioAmounts.length : 0;
  const sortedDates = [...investor.portfolio].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const firstInvestment = sortedDates[0];

  const stats = [
    {
      label: "Total Investments",
      value: String(investor.totalInvestments),
      icon: Briefcase,
    },
    {
      label: "Total Funded",
      value: investor.totalFunded,
      icon: TrendingUp,
    },
    {
      label: "Avg. Check Size",
      value: formatCurrency(avgCheck),
      icon: DollarSign,
    },
    {
      label: "Lao Portfolio Value",
      value: formatCurrency(totalPortfolio),
      icon: BarChart3,
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Header */}
        <header className="relative overflow-hidden border-b border-border bg-card">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="container relative mx-auto px-4 py-10">
            <Breadcrumbs
              items={[
                { label: "Investors", href: "/investors" },
                { label: investor.name },
              ]}
            />

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-4xl font-bold text-primary-foreground shadow-lg">
                {investor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                    {investor.name}
                  </h1>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${typeBadgeClass(investor.type)}`}
                  >
                    {investor.type}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {investor.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-accent" />
                    {investor.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-accent" />
                    {investor.website}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-background/60 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-2xl font-bold text-foreground">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-10">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left Column — Portfolio & Timeline */}
            <div className="lg:col-span-2 space-y-10">
              {/* Portfolio */}
              <section>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Lao Portfolio
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {investor.portfolio.length} companies
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {enrichedPortfolio.map((p, i) => (
                    <Link
                      key={i}
                      to={`/company/${p.slug}`}
                      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
                          {p.company.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                            {p.company}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            {p.sector && (
                              <span className="rounded-full bg-secondary px-2 py-0.5">
                                {p.sector}
                              </span>
                            )}
                            {p.stage && (
                              <span className="rounded-full bg-secondary px-2 py-0.5">
                                {p.stage}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{p.round}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(p.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                        <span className="font-display text-lg font-bold text-accent">
                          {p.amount}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Investment Timeline */}
              {sortedDates.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Investment Timeline
                  </h2>
                  <div className="mt-5 relative">
                    <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
                    <div className="space-y-6">
                      {sortedDates.map((p, i) => (
                        <div key={i} className="relative flex items-start gap-4 pl-8">
                          <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-accent bg-background flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-accent" />
                          </div>
                          <div className="flex-1 rounded-lg border border-border bg-card p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <Link
                                  to={`/company/${p.slug}`}
                                  className="font-display text-sm font-semibold text-foreground hover:text-accent transition-colors"
                                >
                                  {p.company}
                                </Link>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  <Calendar className="inline h-3 w-3 mr-1" />
                                  {new Date(p.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                  })}
                                </p>
                              </div>
                              <span className="font-display text-base font-bold text-accent">
                                {p.amount}
                              </span>
                            </div>
                            <p className="mt-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                              {p.round}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column — Quick Facts */}
            <aside className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Quick Facts
                </h3>
                <Separator className="my-4" />
                <dl className="space-y-4 text-sm">
                  {[
                    ["Type", investor.type],
                    ["Location", investor.location],
                    ["Total Investments", String(investor.totalInvestments)],
                    ["Total Funded", investor.totalFunded],
                    ["Website", investor.website],
                    firstInvestment
                      ? [
                          "First Lao Investment",
                          new Date(firstInvestment.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          }),
                        ]
                      : null,
                  ]
                    .filter(Boolean)
                    .map(([label, value]) => (
                      <div key={label as string} className="flex justify-between">
                        <dt className="text-muted-foreground">{label as string}</dt>
                        <dd className="font-medium text-foreground">{value as string}</dd>
                      </div>
                    ))}
                </dl>
              </div>

              {/* Sectors Active In */}
              {(() => {
                const sectors = Array.from(
                  new Set(enrichedPortfolio.map((p) => p.sector).filter(Boolean))
                );
                if (sectors.length === 0) return null;
                return (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Sectors Active In
                    </h3>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-2">
                      {sectors.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Stages Active In */}
              {(() => {
                const stages = Array.from(
                  new Set(enrichedPortfolio.map((p) => p.stage).filter(Boolean))
                );
                if (stages.length === 0) return null;
                return (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Stages Active In
                    </h3>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-2">
                      {stages.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* CTA */}
              <div className="rounded-xl border border-border bg-gradient-to-br from-accent/10 to-primary/5 p-6">
                <h3 className="font-display text-base font-semibold text-foreground">
                  Connect with {investor.name.split(" ")[0]}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Interested in pitching or partnering? Reach out through their official
                  channels.
                </p>
                <a
                  href={`https://${investor.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Visit Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default InvestorDetail;
