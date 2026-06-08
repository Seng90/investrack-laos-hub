import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, Mail, Pencil, Target, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: string;
  author_id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  company_name: string;
  company_slug: string | null;
  round_type: string;
  target_amount_usd: number | null;
  min_ticket_usd: number | null;
  deadline: string | null;
  cover_url: string | null;
  tags: string[];
  contact_email: string | null;
  pitch_deck_url: string | null;
  website_url: string | null;
  status: string;
  published_at: string | null;
};

const fmt = (v: number | null) =>
  v == null ? null : v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${v.toLocaleString()}`;

const FundraisingPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("fundraising_posts")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      setPost(data as Post | null);
      setLoading(false);
    })();
  }, [slug]);

  const isOwner = user && post && user.id === post.author_id;

  const handleDelete = async () => {
    if (!post || !confirm("Delete this post?")) return;
    const { error } = await supabase.from("fundraising_posts").delete().eq("id", post.id);
    if (error) {
      toast({ title: "Couldn't delete", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Post deleted" });
    navigate("/fundraising-posts");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="container mx-auto p-12 text-center text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-12 text-center">
          <h1 className="font-display text-2xl font-bold">Post not found</h1>
          <Link to="/fundraising-posts" className="mt-4 inline-block text-accent hover:underline">
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <article className="container mx-auto max-w-4xl px-4 py-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {post.cover_url && (
            <img
              src={post.cover_url}
              alt={post.title}
              className="mb-8 aspect-[16/7] w-full rounded-xl object-cover"
            />
          )}

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">
              {post.round_type}
            </span>
            {post.status === "draft" && (
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Draft
              </span>
            )}
            <span className="text-sm text-muted-foreground">{post.company_name}</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          )}

          {isOwner && (
            <div className="mt-6 flex gap-2">
              <Link
                to={`/fundraising-posts/${post.slug}/edit`}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm hover:bg-secondary"
              >
                <Pencil className="h-4 w-4" /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-destructive/40 px-3 text-sm text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          )}

          <div className="mt-8 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
            {fmt(post.target_amount_usd) && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Target raise</p>
                <p className="mt-1 inline-flex items-center gap-1 font-display text-xl font-semibold">
                  <Target className="h-4 w-4 text-accent" /> {fmt(post.target_amount_usd)}
                </p>
              </div>
            )}
            {fmt(post.min_ticket_usd) && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Min ticket</p>
                <p className="mt-1 font-display text-xl font-semibold">{fmt(post.min_ticket_usd)}</p>
              </div>
            )}
            {post.deadline && (
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Deadline</p>
                <p className="mt-1 inline-flex items-center gap-1 font-display text-xl font-semibold">
                  <Calendar className="h-4 w-4 text-accent" />
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div className="prose prose-neutral mt-10 max-w-none whitespace-pre-wrap text-foreground dark:prose-invert">
            {post.content}
          </div>

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">Interested in this round?</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {post.contact_email && (
                <a
                  href={`mailto:${post.contact_email}`}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground hover:opacity-90"
                >
                  <Mail className="h-4 w-4" /> Contact founder
                </a>
              )}
              {post.pitch_deck_url && (
                <a
                  href={post.pitch_deck_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-secondary"
                >
                  <ExternalLink className="h-4 w-4" /> Pitch deck
                </a>
              )}
              {post.website_url && (
                <a
                  href={post.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-secondary"
                >
                  <ExternalLink className="h-4 w-4" /> Website
                </a>
              )}
              {!post.contact_email && !post.pitch_deck_url && !post.website_url && (
                <p className="text-sm text-muted-foreground">No contact info provided.</p>
              )}
            </div>
          </div>
        </article>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default FundraisingPostDetail;
