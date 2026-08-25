import { useMemo, useState } from "react";
import { ArrowDownUp, PackageSearch, Sparkles, X } from "lucide-react";
import { PackageTicketCard } from "./PackageTicketCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { HERO_QUICK_PICKS } from "./packageLandingData";
import type { PackageCategory, TravelPackage } from "../../types";

export type CatalogFilter = "all" | PackageCategory;

const FILTERS: { id: CatalogFilter; label: string }[] = [
  { id: "all", label: "All packages" },
  { id: "domestic", label: "India" },
  { id: "international", label: "International" },
  { id: "offer", label: "Special offers" },
  { id: "upcoming_event", label: "Events" },
];

type SortOption = "recommended" | "price-asc" | "price-desc";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

interface HolidayCatalogProps {
  packages: TravelPackage[];
  loading: boolean;
  error: string;
  query: string;
  filter: CatalogFilter;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: CatalogFilter) => void;
}

function matchesQuery(pkg: TravelPackage, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack =
    `${pkg.title} ${pkg.destination} ${pkg.tagline} ${pkg.highlights.join(" ")}`.toLowerCase();
  return haystack.includes(q) || q.split(/\s+/).some((token) => haystack.includes(token));
}

export function HolidayCatalog({
  packages,
  loading,
  error,
  query,
  filter,
  onQueryChange,
  onFilterChange,
}: HolidayCatalogProps) {
  const [sort, setSort] = useState<SortOption>("recommended");

  const results = useMemo(() => {
    const matched = packages.filter(
      (pkg) => (filter === "all" || pkg.category === filter) && matchesQuery(pkg, query),
    );
    if (sort === "price-asc") return matched.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return matched.sort((a, b) => b.price - a.price);
    return matched.sort(
      (a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
    );
  }, [packages, filter, query, sort]);

  const trimmedQuery = query.trim();
  const filtered = trimmedQuery.length > 0 || filter !== "all";

  return (
    <section id="all-packages" className="scroll-mt-20 bg-neutral-50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Ready to enquire"
          title="Holiday packages"
          subtitle={
            loading
              ? "Loading the latest packages…"
              : trimmedQuery
                ? `Showing matches for “${trimmedQuery}”`
                : "Indicative prices — your expert confirms the final cost for your dates."
          }
        />

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => onFilterChange(id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filter === id
                  ? "bg-primary-800 text-white shadow-xs"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:text-primary-800"
              }`}
            >
              {label}
            </button>
          ))}

          {trimmedQuery && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-coral-soft px-3 py-1.5 text-xs font-semibold text-brand-coral transition hover:bg-brand-coral hover:text-white"
            >
              {trimmedQuery}
              <X className="size-3.5" aria-hidden />
            </button>
          )}

          {!loading && !error && (
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[11px] font-medium text-neutral-500" aria-live="polite">
                {results.length} {results.length === 1 ? "package" : "packages"}
              </span>
              <label className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white pl-2.5 text-xs font-semibold text-neutral-700">
                <ArrowDownUp className="size-3.5 text-neutral-400" aria-hidden />
                <span className="sr-only">Sort packages</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="rounded-full bg-transparent py-1.5 pr-2 text-xs font-semibold text-neutral-700 outline-none"
                >
                  {SORT_OPTIONS.map(({ id, label }) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>

        {loading && (
          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((key) => (
              <div
                key={key}
                className="h-[268px] animate-pulse rounded-2xl border border-neutral-200 bg-white"
              />
            ))}
          </div>
        )}

        {error && !loading && (
          <p
            role="alert"
            aria-live="assertive"
            className="mt-6 rounded-2xl border border-danger-200 bg-danger-50 p-4 text-sm text-danger-700"
          >
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {results.length === 0 ? (
              <div className="mt-5 flex flex-col items-center rounded-2xl border border-neutral-200 bg-white py-10 text-center shadow-xs">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <PackageSearch className="size-6" aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-neutral-900">
                  Nothing listed for that yet
                </p>
                <p className="mt-1 max-w-sm text-sm text-neutral-600">
                  We can still plan it — or try one of these instead.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {HERO_QUICK_PICKS.map(({ term }) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        onFilterChange("all");
                        onQueryChange(term);
                      }}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-brand-coral hover:text-brand-coral"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((pkg, index) => (
                  <Reveal key={pkg.id} className="h-full" delayMs={Math.min(index, 7) * 30}>
                    <PackageTicketCard pkg={pkg} />
                  </Reveal>
                ))}
              </div>
            )}

            {filtered && results.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onQueryChange("");
                  onFilterChange("all");
                }}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
              >
                <Sparkles className="size-4" aria-hidden />
                Show every package
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
