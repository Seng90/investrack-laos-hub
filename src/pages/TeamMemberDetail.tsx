import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, Phone, Award, Building2, MapPin } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTeamMember } from "@/data/companies";
import { resolveTeamMember } from "@/lib/teamMember";

const TeamMemberDetail = () => {
  const { slug, memberSlug } = useParams<{ slug: string; memberSlug: string }>();
  const result = slug && memberSlug ? getTeamMember(slug, memberSlug) : undefined;

  if (!result) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">Profile not found</h1>
            <p className="mt-2 text-muted-foreground">The team member you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const { company, member } = result;
  const resolved = resolveTeamMember(member, company);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <Link
              to={`/company/${company.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back to {company.name}
            </Link>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary font-display text-3xl font-bold text-primary-foreground">
                {resolved.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-3xl font-bold text-foreground">{resolved.name}</h1>
                <p className="mt-1 text-lg text-accent font-medium">{resolved.role}</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    <Link to={`/company/${company.slug}`} className="hover:text-accent">{company.name}</Link>
                  </span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{company.location}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={`mailto:${resolved.email}`}><Mail className="h-4 w-4" /> Email</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={resolved.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /> LinkedIn</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={`tel:${resolved.phone.replace(/\s+/g, "")}`}><Phone className="h-4 w-4" /> {resolved.phone}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="font-display text-xl font-bold text-foreground">About</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{resolved.bio}</p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-foreground">Notable Accomplishments</h2>
              <ul className="mt-4 space-y-3">
                {resolved.accomplishments.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Award className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">Expertise</h3>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2">
                {resolved.expertise.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">Contact</h3>
              <Separator className="my-4" />
              <dl className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${resolved.email}`} className="text-foreground hover:text-accent break-all">{resolved.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${resolved.phone.replace(/\s+/g, "")}`} className="text-foreground hover:text-accent">{resolved.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a href={resolved.linkedin} target="_blank" rel="noreferrer" className="text-foreground hover:text-accent">LinkedIn profile</a>
                </div>
              </dl>
            </div>
          </aside>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default TeamMemberDetail;
