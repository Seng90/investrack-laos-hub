import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, MapPin, Users, Calendar, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCompanyBySlug } from "@/data/companies";

const stageBadgeClass = (stage: string) => {
  if (stage === "Established") return "bg-emerald/10 text-emerald border-emerald/20";
  if (stage.includes("Series")) return "bg-accent/10 text-accent border-accent/20";
  return "bg-secondary text-muted-foreground border-border";
};

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const company = getCompanyBySlug(slug || "");

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Company not found</h1>
          <p className="mt-2 text-muted-foreground">The company you're looking for doesn't exist.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to companies
          </Link>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-3xl font-bold text-primary-foreground">
              {company.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl font-bold text-foreground">{company.name}</h1>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${stageBadgeClass(company.stage)}`}>
                  {company.stage}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-muted-foreground">{company.description}</p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{company.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Founded {company.founded}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{company.employees} employees</span>
                <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" />{company.website}</span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Badge className="rounded-md bg-secondary text-muted-foreground border-border hover:bg-secondary">{company.sector}</Badge>
                <span className="text-lg font-bold text-foreground">{company.funding} <span className="text-sm font-normal text-muted-foreground">total funding</span></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 w-full justify-start rounded-lg border border-border bg-card p-1 sm:w-auto">
            <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Overview</TabsTrigger>
            <TabsTrigger value="funding" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Funding History</TabsTrigger>
            <TabsTrigger value="team" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Team</TabsTrigger>
            <TabsTrigger value="news" className="rounded-md data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">News</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="font-display text-xl font-bold text-foreground">About {company.name}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{company.overview}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">Quick Facts</h3>
                <Separator className="my-4" />
                <dl className="space-y-4 text-sm">
                  {[
                    ["Sector", company.sector],
                    ["Location", company.location],
                    ["Founded", company.founded],
                    ["Employees", company.employees],
                    ["Total Funding", company.funding],
                    ["Stage", company.stage],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </TabsContent>

          {/* Funding History Tab */}
          <TabsContent value="funding" className="animate-fade-in">
            <h2 className="font-display text-xl font-bold text-foreground">Funding Rounds</h2>
            <div className="mt-6 space-y-4">
              {company.fundingRounds.map((round, i) => (
                <div key={i} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground">{round.round}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{new Date(round.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-accent">{round.amount}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{round.investors.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="animate-fade-in">
            <h2 className="font-display text-xl font-bold text-foreground">Leadership Team</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.team.map((member, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="animate-fade-in">
            <h2 className="font-display text-xl font-bold text-foreground">Latest News</h2>
            <div className="mt-6 space-y-4">
              {company.news.map((item, i) => (
                <a key={i} href={item.url} className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.source} · {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyDetail;
