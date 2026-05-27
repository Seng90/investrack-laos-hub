import { Link } from "react-router-dom";
import { Building2, MapPin, Briefcase, ExternalLink } from "lucide-react";

import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { investors } from "@/data/investors";

const typeBadgeClass = (type: string) => {
  if (type === "Venture Capital") return "bg-accent/10 text-accent border-accent/20";
  if (type === "Angel Network") return "bg-emerald/10 text-emerald border-emerald/20";
  if (type === "Impact Fund") return "bg-primary/10 text-primary border-primary/20";
  return "bg-secondary text-muted-foreground border-border";
};

const Investors = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-10">
          
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Investor Directory</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">Explore venture capital firms, angel networks, and development funds active in the Lao startup ecosystem.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {investors.map((inv) => (
            <Link key={inv.slug} to={`/investor/${inv.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg block">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-xl font-bold text-primary-foreground">
                  {inv.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-bold text-foreground">{inv.name}</h2>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeBadgeClass(inv.type)}`}>{inv.type}</span>
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {inv.location}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{inv.description}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-foreground font-medium">
                      <Briefcase className="h-4 w-4 text-accent" /> {inv.totalInvestments} investments
                    </span>
                    <span className="font-display text-lg font-bold text-accent">{inv.totalFunded}</span>
                  </div>

                  {/* Portfolio */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Lao Portfolio</p>
                    <div className="flex flex-wrap gap-2">
                      {inv.portfolio.map((p, i) => (
                        <Link key={i} to={`/company/${p.slug}`}>
                          <Badge variant="secondary" className="cursor-pointer hover:bg-accent/10 hover:text-accent transition-colors">
                            {p.company} · {p.round} · {p.amount}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default Investors;
