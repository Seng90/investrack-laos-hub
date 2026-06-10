import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Check, X, Power } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useFounderRole } from "@/hooks/useFounderRole";
import { useToast } from "@/hooks/use-toast";
import { slugify } from "@/lib/slug";

type Tag = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  created_by: string;
};

const TagsManage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isFounder, loading: roleLoading } = useFounderRole();
  const { toast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("tags")
      .select("id,name,slug,active,created_by")
      .order("name", { ascending: true });
    setTags((data ?? []) as Tag[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    const name = newName.trim();
    if (!name) return;
    if (name.length > 30) return toast({ title: "Too long", description: "Tag name max 30 chars", variant: "destructive" });
    setBusy(true);
    const { error } = await supabase.from("tags").insert({
      name,
      slug: slugify(name),
      created_by: user!.id,
    } as any);
    setBusy(false);
    if (error) return toast({ title: "Couldn't create", description: error.message, variant: "destructive" });
    setNewName("");
    toast({ title: "Tag created" });
    load();
  };

  const startEdit = (t: Tag) => {
    setEditingId(t.id);
    setEditName(t.name);
  };

  const saveEdit = async (t: Tag) => {
    const name = editName.trim();
    if (!name || name === t.name) return setEditingId(null);
    const { error } = await supabase
      .from("tags")
      .update({ name, slug: slugify(name) } as any)
      .eq("id", t.id);
    if (error) return toast({ title: "Couldn't rename", description: error.message, variant: "destructive" });
    setEditingId(null);
    toast({ title: "Tag renamed" });
    load();
  };

  const toggleActive = async (t: Tag) => {
    const { error } = await supabase
      .from("tags")
      .update({ active: !t.active } as any)
      .eq("id", t.id);
    if (error) return toast({ title: "Couldn't update", description: error.message, variant: "destructive" });
    toast({ title: t.active ? "Tag deactivated" : "Tag reactivated" });
    load();
  };

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="container mx-auto p-12 text-center text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isFounder) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-xl p-12 text-center">
          <h1 className="font-display text-2xl font-bold">Founder access required</h1>
          <p className="mt-3 text-muted-foreground">Only founders can manage tags.</p>
          <Link to="/fundraising-posts" className="mt-6 inline-block text-accent hover:underline">
            Back to posts
          </Link>
        </div>
      </div>
    );
  }

  const mine = tags.filter((t) => t.created_by === user.id);
  const others = tags.filter((t) => t.created_by !== user.id);

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

          <h1 className="font-display text-3xl font-bold">Tag management</h1>
          <p className="mt-2 text-muted-foreground">
            Create new tags or rename and deactivate the ones you own. Active tags appear
            in the fundraising post form suggestions.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold">Create new tag</h2>
            <div className="mt-3 flex gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && create()}
                placeholder="e.g. ClimateTech"
                maxLength={30}
              />
              <Button onClick={create} disabled={busy || !newName.trim()}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="font-semibold mb-3">Your tags</h2>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : mine.length === 0 ? (
              <p className="text-sm text-muted-foreground">You haven't created any tags yet.</p>
            ) : (
              <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                {mine.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                    {editingId === t.id ? (
                      <>
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1"
                          maxLength={30}
                          autoFocus
                          onKeyDown={(e) => e.key === "Enter" && saveEdit(t)}
                        />
                        <button onClick={() => saveEdit(t)} className="rounded-md p-2 hover:bg-secondary">
                          <Check className="h-4 w-4 text-accent" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="rounded-md p-2 hover:bg-secondary">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`flex-1 text-sm font-medium ${t.active ? "" : "text-muted-foreground line-through"}`}>
                          #{t.name}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                          t.active ? "bg-accent/15 text-accent" : "bg-secondary text-muted-foreground"
                        }`}>
                          {t.active ? "Active" : "Inactive"}
                        </span>
                        <button onClick={() => startEdit(t)} className="rounded-md p-2 hover:bg-secondary" title="Rename">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => toggleActive(t)} className="rounded-md p-2 hover:bg-secondary" title={t.active ? "Deactivate" : "Reactivate"}>
                          <Power className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {others.length > 0 && (
            <section className="mt-8">
              <h2 className="font-semibold mb-3">Other active tags</h2>
              <div className="flex flex-wrap gap-2">
                {others.map((t) => (
                  <span key={t.id} className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                    #{t.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default TagsManage;
