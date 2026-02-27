import { Search, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          <Link to="/search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Companies
          </Link>
          <Link to="/investors" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Investors
          </Link>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Funding
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            News
          </a>
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
          <Link to="/sign-in" className="h-9 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary inline-flex items-center">
            Sign In
          </Link>
          <Link to="/sign-up" className="h-9 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 inline-flex items-center">
            Sign Up
          </Link>
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
            <Link to="/search" className="text-sm font-medium text-muted-foreground">Companies</Link>
            <Link to="/investors" className="text-sm font-medium text-muted-foreground">Investors</Link>
            <a href="#" className="text-sm font-medium text-muted-foreground">Funding</a>
            <a href="#" className="text-sm font-medium text-muted-foreground">News</a>
            <Link to="/sign-in" className="text-sm font-medium text-muted-foreground">Sign In</Link>
            <Link to="/sign-up" className="mt-2 h-9 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground inline-flex items-center justify-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
