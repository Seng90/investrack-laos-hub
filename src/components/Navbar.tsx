import { Search, Menu, Moon, Sun, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "See you next time." });
    navigate("/");
  };

  const displayName = (user?.user_metadata?.full_name as string) || user?.email?.split("@")[0];


  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <span className="font-display text-lg font-bold text-accent-foreground">I</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            InvesTrack
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/companies" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Companies
          </Link>
          <Link to="/investors" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Investors
          </Link>
          <Link to="/compare" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Compare
          </Link>
          <Link to="/fundraising-posts" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Raises
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
          <Link to="/pricing" className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:opacity-80">
            Pricing
            <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">Pro</span>
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary">
            <Search className="h-4 w-4" />
            Search...
          </button>
          {user ? (
            <>
              <Link to="/account" className="text-sm text-muted-foreground hover:text-foreground hidden lg:inline">
                Hi, {displayName}
              </Link>
              <Link
                to="/account"
                className="h-9 inline-flex items-center rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Account
              </Link>
              <button
                onClick={handleSignOut}
                className="h-9 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="h-9 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary inline-flex items-center">
                Sign In
              </Link>
              <Link to="/sign-up" className="h-9 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 inline-flex items-center">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm font-medium text-muted-foreground">Home</Link>
            <Link to="/companies" className="text-sm font-medium text-muted-foreground">Companies</Link>
            <Link to="/investors" className="text-sm font-medium text-muted-foreground">Investors</Link>
            
            <Link to="/compare" className="text-sm font-medium text-muted-foreground">Compare</Link>
            <Link to="/fundraising-posts" className="text-sm font-medium text-muted-foreground">Raises</Link>
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground">Dashboard</Link>
            <Link to="/pricing" className="text-sm font-medium text-accent">Pricing · Pro</Link>
            {user ? (
              <>
                <Link to="/account" className="text-sm font-medium text-muted-foreground">Account</Link>
                <button onClick={handleSignOut} className="mt-2 h-9 rounded-lg border border-border px-4 text-sm font-medium text-foreground inline-flex items-center justify-center">
                  Sign Out ({displayName})
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-sm font-medium text-muted-foreground">Sign In</Link>
                <Link to="/sign-up" className="mt-2 h-9 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground inline-flex items-center justify-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
