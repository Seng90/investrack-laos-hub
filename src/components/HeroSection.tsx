import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-laos.jpg";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  const handleTagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Laos cityscape" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[hsl(220,50%,10%)]/30 dark:bg-[hsl(220,50%,10%)]/75" />
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 animate-fade-in text-sm font-medium uppercase tracking-widest text-accent">
            Discover Lao Businesses
          </p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-white dark:text-accent md:text-6xl" style={{ animationDelay: "0.1s" }}>
            The Investment Tracking Platform for{" "}
            <span className="text-accent">Laos</span>
          </h1>
          <p className="mb-10 text-lg text-white dark:text-accent" style={{ animationDelay: "0.2s" }}>
            Track companies, funding rounds, and investors across Laos. Your gateway to the Lao business ecosystem.
          </p>
          <form onSubmit={handleSearch} className="mx-auto flex max-w-xl items-center gap-2 rounded-xl bg-card/10 p-2 backdrop-blur-md">
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-card px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies, investors, industries..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
            </div>
            <button type="submit" className="h-12 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Search
            </button>
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white dark:text-accent">
            <span>Popular:</span>
            {["Fintech", "Agriculture", "Tourism", "Energy"].map((tag) => (
              <span
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-full border border-white/40 dark:border-accent/40 px-3 py-1 text-white dark:text-accent transition-colors hover:border-white dark:hover:border-accent hover:bg-white/10 dark:hover:bg-accent/10 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
