import { useCallback, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { PackageHero } from "../components/packages/PackageHero";
import { PackagePromoBanner } from "../components/packages/PackagePromoBanner";
import { TrendingPlacesRail } from "../components/packages/TrendingPlacesRail";
import { DealMosaic } from "../components/packages/DealMosaic";
import { TrustStory } from "../components/packages/TrustStory";
import { HolidayCatalog, type CatalogFilter } from "../components/packages/HolidayCatalog";
import { ThemeExplorer } from "../components/packages/ThemeExplorer";
import { SeasonalJourneys } from "../components/packages/SeasonalJourneys";
import { VisaGetaways } from "../components/packages/VisaGetaways";
import { HiddenGem } from "../components/packages/HiddenGem";
import { SupportBenefits } from "../components/packages/SupportBenefits";
import { listPackages } from "../api/packageApi";
import { getErrorMessage } from "../api/apiClient";
import { usePageTitle } from "../hooks/usePageTitle";
import type { TravelPackage } from "../types";

const DOMESTIC_PATTERN = /goa|kerala|rajasthan|varanasi|himachal|kashmir|spiti|gokarna|bundi|india/i;
const INTERNATIONAL_PATTERN =
  /bali|mauritius|dubai|singapore|thailand|maldives|nepal|bhutan|sri lanka|fiji|barbados|indonesia|uae/i;

export function PackagesPage() {
  usePageTitle(
    "Holiday Packages",
    "Browse curated domestic and international holiday packages on Tripime — beaches, mountains, heritage and honeymoons, planned by a real travel expert.",
  );

  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CatalogFilter>("all");

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

  /** Applies a destination/theme term to the catalog and scrolls to it. */
  const explore = useCallback((term: string) => {
    setQuery(term);
    if (DOMESTIC_PATTERN.test(term)) {
      setFilter("domestic");
    } else if (INTERNATIONAL_PATTERN.test(term)) {
      setFilter("international");
    } else {
      setFilter("all");
    }
    window.setTimeout(() => {
      document
        .getElementById("all-packages")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  const handleSearch = useCallback(
    ({ to }: { to: string; month: string }) => {
      explore(to);
    },
    [explore],
  );

  return (
    <Layout bare>
      <PackageHero onSearch={handleSearch} />
      <PackagePromoBanner packages={packages} onExplore={explore} />
      <TrendingPlacesRail packages={packages} onExplore={explore} />
      <DealMosaic packages={packages} onExplore={explore} />
      <TrustStory />
      <HolidayCatalog
        packages={packages}
        loading={loading}
        error={error}
        query={query}
        filter={filter}
        onQueryChange={setQuery}
        onFilterChange={setFilter}
      />
      <ThemeExplorer onExplore={explore} />
      <SeasonalJourneys packages={packages} onExplore={explore} />
      <VisaGetaways onExplore={explore} />
      <HiddenGem packages={packages} onExplore={explore} />
      <SupportBenefits />
    </Layout>
  );
}
