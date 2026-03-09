import { useMemo } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { companies } from "@/data/companies";
import { investors } from "@/data/investors";

export interface DashboardFilterState {
  sector: string;
  yearRange: [number, number];
  investorType: string;
}

interface Props {
  filters: DashboardFilterState;
  onChange: (filters: DashboardFilterState) => void;
}

const DashboardFilters = ({ filters, onChange }: Props) => {
  const sectors = useMemo(
    () => ["All Sectors", ...Array.from(new Set(companies.map((c) => c.sector))).sort()],
    []
  );

  const investorTypes = useMemo(
    () => ["All Types", ...Array.from(new Set(investors.map((i) => i.type))).sort()],
    []
  );

  const yearBounds = useMemo(() => {
    const years = companies.flatMap((c) =>
      c.fundingRounds.map((r) => parseInt(r.date.slice(0, 4)))
    );
    return [Math.min(...years), Math.max(...years)] as [number, number];
  }, []);

  const hasActiveFilters =
    filters.sector !== "All Sectors" ||
    filters.investorType !== "All Types" ||
    filters.yearRange[0] !== yearBounds[0] ||
    filters.yearRange[1] !== yearBounds[1];

  const resetFilters = () =>
    onChange({ sector: "All Sectors", yearRange: yearBounds, investorType: "All Types" });

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-display text-sm font-semibold text-foreground">
            Filters
          </h2>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 gap-1 text-xs">
            <X className="h-3 w-3" /> Clear
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Sector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Sector</label>
          <Select
            value={filters.sector}
            onValueChange={(v) => onChange({ ...filters, sector: v })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Investor Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Investor Type</label>
          <Select
            value={filters.investorType}
            onValueChange={(v) => onChange({ ...filters, investorType: v })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {investorTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Range */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Year Range: {filters.yearRange[0]} – {filters.yearRange[1]}
          </label>
          <Slider
            min={yearBounds[0]}
            max={yearBounds[1]}
            step={1}
            value={filters.yearRange}
            onValueChange={(v) =>
              onChange({ ...filters, yearRange: v as [number, number] })
            }
            className="pt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;
