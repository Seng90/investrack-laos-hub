import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { companies } from "@/data/companies";

const stageBadgeClass = (stage: string) => {
  if (stage === "Established") return "bg-emerald/10 text-emerald";
  if (stage.includes("Series")) return "bg-accent/10 text-accent";
  return "bg-secondary text-muted-foreground";
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
          <a href="#" className="hidden items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline md:flex">
            View all companies <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c, i) => (
            <Link
              to={`/company/${c.slug}`}
              key={c.slug}
              className="group cursor-pointer rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 animate-fade-in block"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">
                  {c.name.charAt(0)}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${stageBadgeClass(c.stage)}`}>
                  {c.stage}
                </span>
              </div>
              <h3 className="mb-1 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {c.name}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {c.location}
                </span>
                <span className="font-semibold text-foreground">{c.funding}</span>
              </div>
              <div className="mt-3 border-t border-border pt-3">
                <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{c.sector}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
