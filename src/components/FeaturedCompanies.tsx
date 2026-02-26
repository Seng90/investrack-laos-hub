import { ArrowUpRight, MapPin, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";

const stageBadgeClass = (stage: string) => {
  if (stage === "Established") return "bg-emerald/10 text-emerald border-emerald/20";
  if (stage.includes("Series")) return "bg-accent/10 text-accent border-accent/20";
  return "bg-secondary text-muted-foreground border-border";
};

const sectorGradient = (sector: string) => {
  if (sector.includes("Fintech") || sector.includes("Banking")) return "from-accent/20 to-accent/5";
  if (sector.includes("Agri")) return "from-emerald/20 to-emerald/5";
  if (sector.includes("Tourism")) return "from-primary/20 to-primary/5";
  if (sector.includes("Energy")) return "from-destructive/10 to-destructive/5";
  return "from-muted to-secondary";
};

const FeaturedCompanies = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Featured</p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Top Companies in Laos
            </h2>
          </div>
          <Link to="/search" className="hidden items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline md:flex">
            View all companies <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c, i) => (
            <Link
              to={`/company/${c.slug}`}
              key={c.slug}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 animate-fade-in block"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Gradient accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${sectorGradient(c.sector)}`} />

              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-navy-light font-display text-lg font-bold text-primary-foreground shadow-md">
                    {c.name.charAt(0)}
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${stageBadgeClass(c.stage)}`}>
                    {c.stage}
                  </span>
                </div>

                <h3 className="mb-1 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {c.name}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{c.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {c.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {c.employees}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">{c.sector}</span>
                  <span className="flex items-center gap-1 font-display text-sm font-bold text-accent">
                    <TrendingUp className="h-3.5 w-3.5" /> {c.funding}
                  </span>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-accent/5 to-transparent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
