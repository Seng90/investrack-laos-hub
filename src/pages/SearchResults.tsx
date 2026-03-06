import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, X, Briefcase } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { companies } from "@/data/companies";
import { investors } from "@/data/investors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_SECTORS = [...new Set(companies.map((c) => c.sector))];
const ALL_STAGES = [...new Set(companies.map((c) => c.stage))];
const ALL_LOCATIONS = [...new Set(companies.map((c) => c.location))];

const stageBadgeClass = (stage: string) => {
  if (stage === "Established") return "bg-emerald/10 text-emerald";
  if (stage.includes("Series")) return "bg-accent/10 text-accent";
  return "bg-secondary text-muted-foreground";
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialSector = searchParams.get("sector") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"companies" | "investors">("companies");
  const [selectedSectors, setSelectedSectors] = useState<string[]>(
    initialSector ? [initialSector] : []
  );
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [foundedAfter, setFoundedAfter] = useState<string>("");
  const [foundedBefore, setFoundedBefore] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleFilter = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase());

      const matchesSector =
        selectedSectors.length === 0 || selectedSectors.includes(c.sector);

      const matchesStage =
        selectedStages.length === 0 || selectedStages.includes(c.stage);

      const matchesLocation =
        !selectedLocation || c.location === selectedLocation;

      const year = parseInt(c.founded);
      const matchesAfter = !foundedAfter || year >= parseInt(foundedAfter);
      const matchesBefore = !foundedBefore || year <= parseInt(foundedBefore);

      return (
        matchesQuery &&
        matchesSector &&
        matchesStage &&
        matchesLocation &&
        matchesAfter &&
        matchesBefore
      );
    });
  }, [query, selectedSectors, selectedStages, selectedLocation, foundedAfter, foundedBefore]);

  const filteredInvestors = useMemo(() => {
    if (!query) return investors;
    const q = query.toLowerCase();
    return investors.filter(
      (inv) =>
        inv.name.toLowerCase().includes(q) ||
        inv.description.toLowerCase().includes(q) ||
        inv.type.toLowerCase().includes(q) ||
        inv.location.toLowerCase().includes(q)
    );
  }, [query]);

  const activeFilterCount =
    selectedSectors.length +
    selectedStages.length +
    (selectedLocation ? 1 : 0) +
    (foundedAfter ? 1 : 0) +
    (foundedBefore ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedSectors([]);
    setSelectedStages([]);
    setSelectedLocation("");
    setFoundedAfter("");
    setFoundedBefore("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Industry */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Industry
        </h3>
        <div className="space-y-2">
          {ALL_SECTORS.map((sector) => (
            <label
              key={sector}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Checkbox
                checked={selectedSectors.includes(sector)}
                onCheckedChange={() =>
                  toggleFilter(sector, selectedSectors, setSelectedSectors)
                }
              />
              {sector}
            </label>
          ))}
        </div>
      </div>

      {/* Funding Stage */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Funding Stage
        </h3>
        <div className="space-y-2">
          {ALL_STAGES.map((stage) => (
            <label
              key={stage}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Checkbox
                checked={selectedStages.includes(stage)}
                onCheckedChange={() =>
                  toggleFilter(stage, selectedStages, setSelectedStages)
                }
              />
              {stage}
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Location
        </h3>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {ALL_LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Founded Year Range */}
      <div>
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
          Founded Year
        </h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="From"
            value={foundedAfter}
            onChange={(e) => setFoundedAfter(e.target.value)}
            className="w-full"
          />
          <span className="text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="To"
            value={foundedBefore}
            onChange={(e) => setFoundedBefore(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="w-full text-muted-foreground"
        >
          <X className="mr-1 h-3 w-3" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">

      {/* Search header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[{ label: "Search" }]} />
          <h1 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
            Search
          </h1>
          <form onSubmit={handleSearch} className="flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies and investors..."
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "companies" | "investors")} className="mt-4">
            <TabsList>
              <TabsTrigger value="companies">Companies ({filteredCompanies.length})</TabsTrigger>
              <TabsTrigger value="investors">Investors ({filteredInvestors.length})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-sm text-muted-foreground">
            {filteredCompanies.length} result{filteredCompanies.length !== 1 && "s"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="mr-1 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile filters drawer */}
        {showMobileFilters && (
          <div className="mb-6 rounded-xl border border-border bg-card p-5 lg:hidden">
            <FilterPanel />
          </div>
        )}

        <div className="flex gap-8">
          {activeTab === "companies" && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-sm font-semibold text-foreground">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{activeFilterCount}</span>
                  )}
                </div>
                <FilterPanel />
              </div>
            </aside>
          )}

          <div className="flex-1">
            {activeTab === "companies" ? (
              <>
                <p className="mb-4 hidden text-sm text-muted-foreground lg:block">
                  {filteredCompanies.length} result{filteredCompanies.length !== 1 && "s"}
                  {query && (<>{" "}for "<span className="font-medium text-foreground">{query}</span>"</>)}
                </p>
                {filteredCompanies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
                    <Search className="mb-4 h-10 w-10 text-muted-foreground/40" />
                    <h3 className="mb-1 font-display text-lg font-semibold text-foreground">No companies found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredCompanies.map((c, i) => (
                      <Link to={`/company/${c.slug}`} key={c.slug}
                        className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 animate-fade-in block"
                        style={{ animationDelay: `${i * 0.05}s` }}>
                        <div className="h-1 w-full bg-gradient-to-r from-accent/30 to-emerald/20" />
                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-navy-light font-display text-lg font-bold text-primary-foreground shadow-md">{c.name.charAt(0)}</div>
                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${stageBadgeClass(c.stage)}`}>{c.stage}</span>
                          </div>
                          <h3 className="mb-1 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">{c.name}</h3>
                          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.location}</span>
                            <span className="font-display font-bold text-accent">{c.funding}</span>
                          </div>
                          <div className="mt-3 border-t border-border pt-3">
                            <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">{c.sector}</span>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-accent/5 to-transparent" />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {filteredInvestors.length} investor{filteredInvestors.length !== 1 && "s"}
                  {query && (<>{" "}for "<span className="font-medium text-foreground">{query}</span>"</>)}
                </p>
                {filteredInvestors.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
                    <Search className="mb-4 h-10 w-10 text-muted-foreground/40" />
                    <h3 className="mb-1 font-display text-lg font-semibold text-foreground">No investors found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search.</p>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {filteredInvestors.map((inv, i) => (
                      <Link to={`/investor/${inv.slug}`} key={inv.slug}
                        className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg animate-fade-in block"
                        style={{ animationDelay: `${i * 0.05}s` }}>
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">{inv.name.charAt(0)}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors">{inv.name}</h3>
                            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {inv.location}</p>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{inv.description}</p>
                            <div className="mt-3 flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-foreground font-medium"><Briefcase className="h-3.5 w-3.5 text-accent" /> {inv.totalInvestments}</span>
                              <span className="font-display font-bold text-accent">{inv.totalFunded}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default SearchResults;
