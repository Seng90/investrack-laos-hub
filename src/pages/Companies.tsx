import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, Calendar, ArrowRight, Building2, TrendingUp, Globe, Sparkles, Trophy, Newspaper } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import { companies, Company } from "@/data/companies";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ALL_SECTORS = [...new Set(companies.map((c) => c.sector))];
const FEATURED_SLUGS = ["bcel", "lao-telecom", "kolao-group"];
const featuredCompanies = companies.filter((c) => FEATURED_SLUGS.includes(c.slug));

const stageBadgeClass = (stage: string) => {
  if (stage === "Established") return "bg-emerald/10 text-emerald border-emerald/30";
  if (stage.includes("Series")) return "bg-accent/10 text-accent border-accent/30";
  return "bg-secondary text-muted-foreground border-border";
};

const sectorIcon = (sector: string) => {
  switch (sector) {
    case "Banking & Finance": return "🏦";
    case "Telecommunications": return "📡";
    case "Automotive & Trade": return "🚗";
    case "Fintech": return "💳";
    case "Healthcare": return "🏥";
    case "AgriTech": return "🌾";
    default: return "🏢";
  }
};

const CompanyLogo = ({ company, size = "md" }: { company: Company; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-12 w-12 text-lg",
    md: "h-14 w-14 text-xl",
    lg: "h-16 w-16 text-2xl",
  };

  return (
    <img
      src={company.logo}
      alt={`${company.name} logo`}
      className={`${sizeClasses[size]} rounded-2xl shadow-lg object-cover`}
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
        const fallback = target.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = "flex";
      }}
    />
  );
};

const CompanyLogoWithFallback = ({ company, size = "md", className = "" }: { company: Company; size?: "sm" | "md" | "lg"; className?: string }) => {
  const sizeClasses = {
    sm: "h-12 w-12 text-lg",
    md: "h-14 w-14 text-xl",
    lg: "h-16 w-16 text-2xl",
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className={`${sizeClasses[size]} rounded-2xl shadow-lg object-cover`}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className={`${sizeClasses[size]} items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-navy-light font-display font-bold text-primary-foreground shadow-lg hidden`}
      >
        {company.name.charAt(0)}
      </div>
    </div>
  );
};

const FeaturedCard = ({ company, index }: { company: Company; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
  >
    <Link
      to={`/company/${company.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-card via-card to-accent/5 transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/15 hover:-translate-y-2"
    >
      {/* Gradient top bar */}
      <div className="h-2 w-full bg-gradient-to-r from-accent via-emerald/60 to-accent/40" />

      <div className="flex flex-1 flex-col p-7">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <CompanyLogoWithFallback company={company} size="lg" />
              <span className="absolute -bottom-1 -right-1 text-lg">{sectorIcon(company.sector)}</span>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-accent">
                {company.name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {company.location}
              </p>
            </div>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${stageBadgeClass(company.stage)}`}>
            {company.stage}
          </span>
        </div>

        {/* Full description */}
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          {company.description}
        </p>

        {/* Stats grid */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.funding}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Funding</p>
          </div>
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.employees}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Employees</p>
          </div>
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.founded}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Founded</p>
          </div>
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.location}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Location</p>
          </div>
        </div>

        {/* Latest news */}
        {company.news[0] && (
          <div className="mb-5 flex items-start gap-2 rounded-xl bg-accent/5 border border-accent/10 px-4 py-3">
            <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-medium text-foreground line-clamp-1">{company.news[0].title}</p>
              <p className="text-[10px] text-muted-foreground">{company.news[0].source} · {company.news[0].date}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Badge variant="secondary" className="rounded-lg text-xs">
            {company.sector}
          </Badge>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-all group-hover:bg-accent group-hover:text-accent-foreground">
            View Profile <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  </motion.div>
);

const CompanyCard = ({ company, index }: { company: Company; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
  >
    <Link
      to={`/company/${company.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
    >
      {/* Gradient top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent/60 to-emerald/40 opacity-60 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <CompanyLogoWithFallback company={company} size="md" />
              <span className="absolute -bottom-1 -right-1 text-lg">{sectorIcon(company.sector)}</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-accent">
                {company.name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {company.location}
              </p>
            </div>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${stageBadgeClass(company.stage)}`}>
            {company.stage}
          </span>
        </div>

        {/* Description */}
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {company.description}
        </p>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.funding}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Funding</p>
          </div>
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.employees}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Team</p>
          </div>
          <div className="rounded-xl bg-secondary/60 px-3 py-2.5 text-center">
            <p className="font-display text-base font-bold text-foreground">{company.founded}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Founded</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Badge variant="secondary" className="rounded-lg text-xs">
            {company.sector}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
            View Profile <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  </motion.div>
);

const Companies = () => {
  const [query, setQuery] = useState("");
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase());
      const matchesSector = !activeSector || c.sector === activeSector;
      return matchesQuery && matchesSector;
    });
  }, [query, activeSector]);

  const totalFunding = "$252.5M";
  const totalCompanies = companies.length;
  const totalEmployees = "7,600+";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero header */}
        <header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary via-primary to-navy-light">
          {/* Abstract decorative shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-emerald/10 blur-3xl" />
            <div className="absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-accent/5 blur-2xl" />
          </div>

          <div className="container relative mx-auto px-4 py-16 md:py-20">
            <Breadcrumbs items={[{ label: "Companies" }]} variant="light" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Explore the Lao Business Ecosystem
              </div>
              <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                Company <span className="text-accent">Directory</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-primary-foreground/70 md:text-lg">
                Discover innovative companies driving growth across Laos — from established leaders to rising startups.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 grid max-w-2xl grid-cols-3 gap-4"
            >
              {[
                { icon: Building2, label: "Companies", value: totalCompanies.toString() },
                { icon: TrendingUp, label: "Total Funded", value: totalFunding },
                { icon: Users, label: "Employees", value: totalEmployees },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-4 backdrop-blur-sm"
                >
                  <stat.icon className="mb-2 h-5 w-5 text-accent" />
                  <p className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-xs font-medium text-primary-foreground/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </header>

        {/* Featured Companies Section */}
        <section className="border-b border-border bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Featured Companies</h2>
                <p className="text-sm text-muted-foreground">Top funded companies leading the Lao ecosystem</p>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCompanies.map((c, i) => (
                <FeaturedCard key={c.slug} company={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search companies..."
                  className="h-11 rounded-xl border-border bg-background pl-10 text-sm shadow-sm transition-shadow focus:shadow-md"
                />
              </div>

              {/* Sector pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSector(null)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    !activeSector
                      ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                      : "border border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {ALL_SECTORS.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setActiveSector(activeSector === sector ? null : sector)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      activeSector === sector
                        ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                        : "border border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
                    }`}
                  >
                    {sectorIcon(sector)} {sector}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <main className="container mx-auto px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> {filtered.length === 1 ? "company" : "companies"}
              {activeSector && (
                <> in <span className="font-semibold text-accent">{activeSector}</span></>
              )}
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              Advanced Search <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center"
            >
              <Search className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">No companies found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c, i) => (
                <CompanyCard key={c.slug} company={c} index={i} />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Companies;
