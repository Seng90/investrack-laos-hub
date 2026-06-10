import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, ShieldCheck, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useFounderRole } from "@/hooks/useFounderRole";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const { isFounder } = useFounderRole();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name,email")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setFullName(data.full_name ?? "");
        setEmail(data.email ?? user.email ?? "");
      } else {
        setEmail(user.email ?? "");
      }
    })();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: fullName.trim(), email: user.email ?? email } as any);
    setSavingProfile(false);
    if (error) return toast({ title: "Couldn't save", description: error.message, variant: "destructive" });
    toast({ title: "Profile updated" });
  };

  const changePassword = async () => {
    if (pw.length < 8) return toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
    if (pw !== pw2) return toast({ title: "Passwords don't match", variant: "destructive" });
    setSavingPw(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setSavingPw(false);
    if (error) return toast({ title: "Couldn't update password", description: error.message, variant: "destructive" });
    setPw(""); setPw2("");
    toast({ title: "Password updated" });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out" });
    navigate("/");
  };

  if (loading) {
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
        <div className="container mx-auto max-w-xl p-12 text-center">
          <h1 className="font-display text-2xl font-bold">Sign in required</h1>
          <Link to="/sign-in" className="mt-4 inline-block text-accent hover:underline">
            Go to sign in
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

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <UserIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Account settings</h1>
              <p className="text-sm text-muted-foreground">Manage your profile, security, and access.</p>
            </div>
          </div>

          <section className="mt-8 rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Profile</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Full name</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={120} />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={email} disabled />
                <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed here.</p>
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={saveProfile} disabled={savingProfile}>
                {savingProfile ? "Saving..." : "Save profile"}
              </Button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Change password</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Label>New password</Label>
                <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="At least 8 characters" />
              </div>
              <div>
                <Label>Confirm new password</Label>
                <Input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={changePassword} disabled={savingPw || !pw || !pw2}>
                {savingPw ? "Updating..." : "Update password"}
              </Button>
            </div>
          </section>

          <section className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Access
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Your roles:</span>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">User</span>
              {isFounder && (
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-accent">Founder</span>
              )}
            </div>
            {isFounder && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/fundraising-posts/new"
                  className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-secondary"
                >
                  New fundraising post
                </Link>
                <Link
                  to="/tags"
                  className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-secondary"
                >
                  Manage tags
                </Link>
              </div>
            )}
          </section>

          <section className="mt-6 rounded-xl border border-destructive/30 bg-card p-6">
            <h2 className="font-semibold text-destructive">Danger zone</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign out of this device. You can sign back in any time.
            </p>
            <Button variant="outline" onClick={handleSignOut} className="mt-4">
              <LogOut className="h-4 w-4 mr-1" /> Sign out
            </Button>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Account;
