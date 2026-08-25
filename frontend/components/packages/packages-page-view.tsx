"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { listPackages } from "@/lib/api/packages";
import { getErrorMessage } from "@/lib/api/client";
import { Container } from "@/components/layout/container";
import { PackagesHero } from "@/components/packages/packages-hero";
import {
  PackagesFilters,
  type CatalogFilter,
  type SortOption,
} from "@/components/packages/packages-filters";
import { PackagesFeatured } from "@/components/packages/packages-featured";
import { PackagesGrid } from "@/components/packages/packages-grid";
import { PackagesCta } from "@/components/packages/packages-cta";
import type { TravelPackage } from "@/types";

const DOMESTIC_PATTERN =
  /goa|kerala|rajasthan|varanasi|himachal|kashmir|spiti|gokarna|bundi|india/i;
const INTERNATIONAL_PATTERN =
  /bali|mauritius|dubai|singapore|thailand|maldives|nepal|bhutan|sri lanka|fiji|barbados|indonesia|uae/i;

function matchesQuery(pkg: TravelPackage, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack =
    `${pkg.title} ${pkg.destination} ${pkg.tagline} ${pkg.highlights.join(" ")}`.toLowerCase();
  return haystack.includes(q) || q.split(/\s+/).some((token) => haystack.includes(token));
}

function sortPackages(list: TravelPackage[], sort: SortOption): TravelPackage[] {
  const next = [...list];
  if (sort === "price-asc") return next.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return next.sort((a, b) => b.price - a.price);
  return next.sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
  );
}

/**
 * Compact packages landing — homepage visual language,
 * same listPackages API + filter/search/enquiry routes.
 */
export function PackagesPageView() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CatalogFilter>("all");
  const [sort, setSort] = useState<SortOption>("recommended");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await listPackages();
        if (!cancelled) setPackages(data);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const explore = useCallback((term: string) => {
    setQuery(term);
    if (DOMESTIC_PATTERN.test(term)) setFilter("domestic");
    else if (INTERNATIONAL_PATTERN.test(term)) setFilter("international");
    else setFilter("all");
    window.setTimeout(() => {
      document
        .getElementById("all-packages")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  const handleSearch = useCallback(
    ({ to }: { to: string; month?: string }) => {
      explore(to);
    },
    [explore],
  );

  const filtered = useMemo(() => {
    const matched = packages.filter(
      (pkg) => (filter === "all" || pkg.category === filter) && matchesQuery(pkg, query),
    );
    return sortPackages(matched, sort);
  }, [packages, filter, query, sort]);

  return (
    <>
      <PackagesHero onSearch={handleSearch} />

      <Container>
        <PackagesFilters
          filter={filter}
          sort={sort}
          query={query}
          count={filtered.length}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onQueryChange={setQuery}
        />

        {!loading && !error && packages.length > 0 && filter === "all" && !query.trim() && (
          <PackagesFeatured packages={packages} />
        )}

        <PackagesGrid
          packages={filtered}
          loading={loading}
          error={error}
          query={query}
          filter={filter}
          onQueryChange={setQuery}
          onFilterChange={setFilter}
        />
      </Container>

      <PackagesCta />
    </>
  );
}
