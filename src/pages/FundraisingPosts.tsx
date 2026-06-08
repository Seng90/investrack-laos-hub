import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import PostCard, { PostCardData } from "@/components/fundraising/PostCard";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useFounderRole } from "@/hooks/useFounderRole";

const FundraisingPosts = () => {
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const { isFounder } = useFounderRole();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("fundraising_posts")
        .select(
          "slug,title,excerpt,company_name,round_type,target_amount_usd,deadline,cover_url,tags,published_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (!error && data) setPosts(data as PostCardData[]);
      setLoading(false);
    })();
  }, []);

  const filtered = posts.filter((p) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      p.title.toLowerCase().includes(s) ||
      p.company_name.toLowerCase().includes(s) ||
      p.tags.some((t) => t.toLowerCase().includes(s))
    );
  });

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
                  Discover Lao founders raising their next round. Get the story
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
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title, company, or tag..."
              className="pl-9"
            />
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading posts...</p>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                {posts.length === 0
                  ? "No fundraising posts yet. Founders, be the first to share your round!"
                  : "No posts match your search."}
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
