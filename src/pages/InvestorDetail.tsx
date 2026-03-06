import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, MapPin, Briefcase, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInvestorBySlug } from "@/data/investors";

const typeBadgeClass = (type: string) => {
  if (type === "Venture Capital") return "bg-accent/10 text-accent border-accent/20";
  if (type === "Angel Network") return "bg-emerald/10 text-emerald border-emerald/20";
  if (type === "Impact Fund") return "bg-primary/10 text-primary border-primary/20";
  return "bg-secondary text-muted-foreground border-border";
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
            <h1 className="font-display text-3xl font-bold text-foreground">Investor not found</h1>
            <p className="mt-2 text-muted-foreground">The investor you're looking for doesn't exist.</p>
            <Link to="/investors" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to investors
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumbs items={[
              { label: "Investors", href: "/investors" },
              { label: investor.name },
            ]} />

            <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-3xl font-bold text-primary-foreground">
                {investor.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-bold text-foreground">{investor.name}</h1>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${typeBadgeClass(investor.type)}`}>
                    {investor.type}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-muted-foreground">{investor.description}</p>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{investor.location}</span>
                  <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" />{investor.website}</span>
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Briefcase className="h-4 w-4 text-accent" /> {investor.totalInvestments} investments
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {investor.totalFunded} <span className="text-sm font-normal text-muted-foreground">total funded</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio */}
        <main className="container mx-auto px-4 py-10">
          <h2 className="font-display text-xl font-bold text-foreground">Lao Portfolio</h2>
          <div className="mt-6 space-y-4">
            {investor.portfolio.map((p, i) => (
              <Link
                key={i}
                to={`/company/${p.slug}`}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{p.company}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.round} · {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold text-accent">{p.amount}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Facts sidebar-style section */}
          <div className="mt-10 max-w-md rounded-xl border border-border bg-card p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">Quick Facts</h3>
            <Separator className="my-4" />
            <dl className="space-y-4 text-sm">
              {[
                ["Type", investor.type],
                ["Location", investor.location],
                ["Total Investments", String(investor.totalInvestments)],
                ["Total Funded", investor.totalFunded],
                ["Website", investor.website],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default InvestorDetail;
