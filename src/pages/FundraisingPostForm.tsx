import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/fundraising/RichTextEditor";
import TagInput from "@/components/fundraising/TagInput";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useFounderRole } from "@/hooks/useFounderRole";
import { useToast } from "@/hooks/use-toast";
import { uniqueSlug } from "@/lib/slug";
import { sanitizeHtml } from "@/lib/sanitize";

const TAG_SUGGESTIONS = [
  "Fintech", "AgriTech", "EdTech", "HealthTech", "Logistics", "E-commerce",
  "SaaS", "Mobile", "B2B", "B2C", "Marketplace", "AI", "Climate", "Tourism",
];

const ROUND_TYPES = ["Pre-Seed", "Seed", "Series A", "Series B+", "Bridge", "Other"];
const COUNTRIES = ["Laos", "Thailand", "Vietnam", "Cambodia", "Myanmar", "Singapore", "Other"];


const schema = z.object({
  title: z.string().trim().min(4).max(120),
  excerpt: z.string().trim().max(280).optional().or(z.literal("")),
  content: z.string().trim().min(20).max(10000),
  company_name: z.string().trim().min(1).max(120),
  round_type: z.string().min(1),
  target_amount_usd: z.coerce.number().min(0).optional().or(z.nan()),
  min_ticket_usd: z.coerce.number().min(0).optional().or(z.nan()),
  deadline: z.string().optional().or(z.literal("")),
  cover_url: z.string().url().max(500).optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).optional(),
  country: z.string().max(60).optional().or(z.literal("")),
  contact_email: z.string().email().optional().or(z.literal("")),
  pitch_deck_url: z.string().url().optional().or(z.literal("")),
  website_url: z.string().url().optional().or(z.literal("")),
});

const FundraisingPostForm = () => {
  const { slug } = useParams();
  const isEdit = !!slug;
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isFounder, loading: roleLoading } = useFounderRole();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    company_name: "",
    round_type: "Seed",
    target_amount_usd: "",
    min_ticket_usd: "",
    deadline: "",
    cover_url: "",
    tags: [] as string[],
    country: "Laos",
    contact_email: "",
    pitch_deck_url: "",
    website_url: "",
  });


  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const { data } = await supabase
        .from("fundraising_posts")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (data) {
        setPostId(data.id);
        setForm({
          title: data.title ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          company_name: data.company_name ?? "",
          round_type: data.round_type ?? "Seed",
          target_amount_usd: data.target_amount_usd?.toString() ?? "",
          min_ticket_usd: data.min_ticket_usd?.toString() ?? "",
          deadline: data.deadline ?? "",
          cover_url: data.cover_url ?? "",
          tags: data.tags ?? [],
          country: data.country ?? "Laos",
          contact_email: data.contact_email ?? "",
          pitch_deck_url: data.pitch_deck_url ?? "",
          website_url: data.website_url ?? "",

        });
      }
    })();
  }, [isEdit, slug]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (status: "draft" | "published") => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please fix the form",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      author_id: user!.id,
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      company_name: form.company_name.trim(),
      round_type: form.round_type,
      target_amount_usd: form.target_amount_usd ? Number(form.target_amount_usd) : null,
      min_ticket_usd: form.min_ticket_usd ? Number(form.min_ticket_usd) : null,
      deadline: form.deadline || null,
      cover_url: form.cover_url.trim() || null,
      tags,
      country: form.country.trim() || null,

      contact_email: form.contact_email.trim() || null,
      pitch_deck_url: form.pitch_deck_url.trim() || null,
      website_url: form.website_url.trim() || null,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    if (isEdit && postId) {
      const { data, error } = await supabase
        .from("fundraising_posts")
        .update(payload as any)
        .eq("id", postId)
        .select("slug")
        .single();
      setSubmitting(false);
      if (error) return toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
      toast({ title: status === "published" ? "Post published" : "Draft saved" });
      navigate(`/fundraising-posts/${data.slug}`);
    } else {
      const newSlug = uniqueSlug(form.title);
      const { data, error } = await supabase
        .from("fundraising_posts")
        .insert({ ...payload, slug: newSlug } as any)
        .select("slug")
        .single();
      setSubmitting(false);

      if (error) return toast({ title: "Couldn't create", description: error.message, variant: "destructive" });
      toast({ title: status === "published" ? "Post published" : "Draft saved" });
      navigate(`/fundraising-posts/${data.slug}`);
    }
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="container mx-auto p-12 text-center text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-12 text-center">
          <h1 className="font-display text-2xl font-bold">Sign in required</h1>
          <Link to="/sign-in" className="mt-4 inline-block text-accent hover:underline">
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!isFounder) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-xl p-12 text-center">
          <h1 className="font-display text-2xl font-bold">Founder access required</h1>
          <p className="mt-3 text-muted-foreground">
            Only verified founders can publish fundraising posts. Email us at{" "}
            <a className="text-accent hover:underline" href="mailto:hello@investrack.la">
              hello@investrack.la
            </a>{" "}
            from your company email and we'll grant you access.
          </p>
          <Link to="/fundraising-posts" className="mt-6 inline-block text-accent hover:underline">
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto max-w-3xl px-4 py-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <h1 className="font-display text-3xl font-bold">
            {isEdit ? "Edit fundraising post" : "New fundraising post"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Share the story of your next round. Drafts stay private until you publish.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={set("title")} placeholder="Acme is raising our Seed round" maxLength={120} />
            </div>
            <div>
              <Label>Excerpt</Label>
              <Input value={form.excerpt} onChange={set("excerpt")} placeholder="One-line teaser" maxLength={280} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Company *</Label>
                <Input value={form.company_name} onChange={set("company_name")} maxLength={120} />
              </div>
              <div>
                <Label>Round *</Label>
                <select
                  value={form.round_type}
                  onChange={set("round_type")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {ROUND_TYPES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Target raise (USD)</Label>
                <Input type="number" min="0" value={form.target_amount_usd} onChange={set("target_amount_usd")} />
              </div>
              <div>
                <Label>Min ticket (USD)</Label>
                <Input type="number" min="0" value={form.min_ticket_usd} onChange={set("min_ticket_usd")} />
              </div>
              <div>
                <Label>Deadline</Label>
                <Input type="date" value={form.deadline} onChange={set("deadline")} />
              </div>
            </div>

            <div>
              <Label>Cover image URL</Label>
              <Input value={form.cover_url} onChange={set("cover_url")} placeholder="https://..." />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Country</Label>
                <select
                  value={form.country}
                  onChange={set("country")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Tags (comma separated)</Label>
                <Input value={form.tags} onChange={set("tags")} placeholder="Fintech, Mobile, B2B" />
              </div>
            </div>

            <div>
              <Label>Content *</Label>
              <p className="mb-1 text-xs text-muted-foreground">
                Use the toolbar for headings, lists, links, and emphasis.
              </p>
              <RichTextEditor
                value={form.content}
                onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                placeholder="Tell investors about your traction, the problem you solve, your team, and what this round will unlock."
              />
            </div>


            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Contact email</Label>
                <Input type="email" value={form.contact_email} onChange={set("contact_email")} />
              </div>
              <div>
                <Label>Pitch deck URL</Label>
                <Input value={form.pitch_deck_url} onChange={set("pitch_deck_url")} placeholder="https://..." />
              </div>
              <div>
                <Label>Website</Label>
                <Input value={form.website_url} onChange={set("website_url")} placeholder="https://..." />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Button onClick={() => submit("published")} disabled={submitting}>
                {submitting ? "Saving..." : "Publish"}
              </Button>
              <Button variant="outline" onClick={() => submit("draft")} disabled={submitting}>
                Save as draft
              </Button>
              <p className="text-xs text-muted-foreground">
                Drafts are only visible to you and can be published later.
              </p>
            </div>

          </div>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default FundraisingPostForm;
