import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Newspaper, TrendingUp, Calendar, ExternalLink, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import { companies } from "@/data/companies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface AggregatedRound {
  companyName: string;
  companySlug: string;
  date: string;
  round: string;
  amount: string;
  investors: string[];
}

interface AggregatedNews {
  companyName: string;
  companySlug: string;
  date: string;
  title: string;
  source: string;
  url: string;
}

const allFundingRounds: AggregatedRound[] = companies
  .flatMap((c) =>
    c.fundingRounds.map((r) => ({
      companyName: c.name,
      companySlug: c.slug,
      ...r,
    }))
  )
  .sort((a, b) => b.date.localeCompare(a.date));

const allNews: AggregatedNews[] = companies
  .flatMap((c) =>
    c.news.map((n) => ({
      companyName: c.name,
      companySlug: c.slug,
      ...n,
    }))
  )
  .sort((a, b) => b.date.localeCompare(a.date));

const totalFunded = allFundingRounds.reduce((sum, r) => {
  const num = parseFloat(r.amount.replace(/[^0-9.]/g, ""));
  return sum + (r.amount.includes("K") ? num / 1000 : num);
}, 0);

const NewsFunding = () => {
  const [tab, setTab] = useState<"funding" | "news">("funding");
  const [sectorFilter, setSectorFilter] = useState<string>("");
  const sectors = [...new Set(companies.map((c) => c.sector))];

  const filteredRounds = useMemo(() => {
    if (!sectorFilter) return allFundingRounds;
    const slugs = new Set(companies.filter((c) => c.sector === sectorFilter).map((c) => c.slug));
    return allFundingRounds.filter((r) => slugs.has(r.companySlug));
  }, [sectorFilter]);

  const filteredNews = useMemo(() => {
    if (!sectorFilter) return allNews;
    const slugs = new Set(companies.filter((c) => c.sector === sectorFilter).map((c) => c.slug));
    return allNews.filter((n) => slugs.has(n.companySlug));
  }, [sectorFilter]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <header className="border-b border-border bg-gradient-to-br from-navy via-navy to-navy-light">
          <div className="container mx-auto px-4 py-12">
            <Breadcrumbs items={[{ label: "News & Funding" }]} variant="light" />
            <h1 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              News & <span className="text-accent">Funding</span>
            </h1>
            <p className="mt-2 max-w-xl text-primary-foreground/70">
              Track the latest funding rounds and market news across the Lao startup ecosystem.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-lg">
              <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 backdrop-blur-sm">
                <p className="font-display text-xl font-bold text-primary-foreground">{allFundingRounds.length}</p>
                <p className="text-xs text-primary-foreground/50">Rounds</p>
              </div>
              <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 backdrop-blur-sm">
                <p className="font-display text-xl font-bold text-primary-foreground">${totalFunded.toFixed(1)}M</p>
                <p className="text-xs text-primary-foreground/50">Total Funded</p>
              </div>
              <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 backdrop-blur-sm">
                <p className="font-display text-xl font-bold text-primary-foreground">{allNews.length}</p>
                <p className="text-xs text-primary-foreground/50">News Articles</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={tab} onValueChange={(v) => setTab(v as "funding" | "news")}>
              <TabsList>
                <TabsTrigger value="funding"><TrendingUp className="mr-1.5 h-4 w-4" />Funding ({filteredRounds.length})</TabsTrigger>
                <TabsTrigger value="news"><Newspaper className="mr-1.5 h-4 w-4" />News ({filteredNews.length})</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSectorFilter("")}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${!sectorFilter ? "bg-accent text-accent-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}
              >
                All Sectors
              </button>
              {sectors.map((s) => (
                <button
                  key={s}
                  onClick={() => setSectorFilter(sectorFilter === s ? "" : s)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${sectorFilter === s ? "bg-accent text-accent-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {tab === "funding" ? (
            <div className="space-y-4">
              {filteredRounds.map((r, i) => (
                <div key={`${r.companySlug}-${r.date}-${i}`} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/company/${r.companySlug}`} className="font-display font-bold text-foreground hover:text-accent transition-colors">{r.companyName}</Link>
                        <Badge variant="secondary" className="text-xs">{r.round}</Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-accent">{r.amount}</p>
                    <p className="text-sm text-muted-foreground">{r.investors.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNews.map((n, i) => (
                <a key={`${n.companySlug}-${n.date}-${i}`} href={n.url} className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Newspaper className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">{n.title}</p>
                      <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                        <Link to={`/company/${n.companySlug}`} className="font-medium hover:text-accent" onClick={(e) => e.stopPropagation()}>{n.companyName}</Link>
                        <span>·</span>
                        <span>{n.source}</span>
                        <span>·</span>
                        <span>{new Date(n.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default NewsFunding;
