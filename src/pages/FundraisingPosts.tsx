import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PostCard, { PostCardData } from "@/components/fundraising/PostCard";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useFounderRole } from "@/hooks/useFounderRole";
import { useAuth } from "@/hooks/useAuth";

type FullPost = PostCardData & { country: string | null; status: string };

const ROUND_TYPES = ["Pre-Seed", "Seed", "Series A", "Series B+", "Bridge", "Other"];

const FundraisingPosts = () => {
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [drafts, setDrafts] = useState<FullPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [round, setRound] = useState<string>("all");
  const [country, setCountry] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [tab, setTab] = useState<"published" | "drafts">("published");
  const { isFounder } = useFounderRole();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const cols =
        "slug,title,excerpt,company_name,round_type,target_amount_usd,deadline,cover_url,tags,published_at,country,status";
      const { data } = await supabase
        .from("fundraising_posts")
        .select(cols)
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (data) setPosts(data as FullPost[]);

      if (user) {
        const { data: mine } = await supabase
          .from("fundraising_posts")
          .select(cols)
          .eq("author_id", user.id)
          .eq("status", "draft")
          .order("updated_at", { ascending: false });
        if (mine) setDrafts(mine as FullPost[]);
      }
      setLoading(false);
    })();
  }, [user]);

  const { countries, tags } = useMemo(() => {
    const c = new Set<string>();
    const t = new Set<string>();
    posts.forEach((p) => {
      if (p.country) c.add(p.country);
      p.tags.forEach((x) => t.add(x));
    });
    return {
      countries: Array.from(c).sort(),
      tags: Array.from(t).sort(),
    };
  }, [posts]);

  const list = tab === "drafts" ? drafts : posts;
  const filtered = list.filter((p) => {
    if (round !== "all" && p.round_type !== round) return false;
    if (country !== "all" && p.country !== country) return false;
    if (tag !== "all" && !p.tags.includes(tag)) return false;
    if (q) {
      const s = q.toLowerCase();
      const hay = `${p.title} ${p.company_name} ${p.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });

  const activeFilters = (round !== "all" ? 1 : 0) + (country !== "all" ? 1 : 0) + (tag !== "all" ? 1 : 0);
  const clearFilters = () => {
    setRound("all");
    setCountry("all");
    setTag("all");
  };

  const selectCls =
    "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                  Founder Stories
                </span>
                <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
                  Fundraising Posts
                </h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  Discover founders raising their next round. Get the story
                  behind each round straight from the people building it.
                </p>
              </div>
              {isFounder && (
                <Link
                  to="/fundraising-posts/new"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  New post
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          {isFounder && (
            <div className="mb-6 inline-flex rounded-lg border border-border bg-card p-1">
              <button
                onClick={() => setTab("published")}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                  tab === "published" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setTab("drafts")}
                className={`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition ${
                  tab === "drafts" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                My drafts {drafts.length > 0 && `(${drafts.length})`}
              </button>
            </div>
          )}

          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, company, or tag..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={round} onChange={(e) => setRound(e.target.value)} className={selectCls}>
                <option value="all">All rounds</option>
                {ROUND_TYPES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectCls}>
                <option value="all">All countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select value={tag} onChange={(e) => setTag(e.target.value)} className={selectCls}>
                <option value="all">All industries</option>
                {tags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex h-10 items-center gap-1 rounded-md border border-border px-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" /> Clear ({activeFilters})
                </button>
              )}
            </div>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          </p>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading posts...</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                {tab === "drafts"
                  ? "No drafts yet. Start a new post to save it as a draft."
                  : list.length === 0
                  ? "No fundraising posts yet."
                  : "No posts match your filters."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </section>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default FundraisingPosts;
