import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatINR } from "../../lib/format";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CarouselRail } from "./CarouselRail";
import { TRENDING_PLACES, findPackage, type LandingPlace } from "./packageLandingData";
import type { TravelPackage } from "../../types";

interface TrendingPlacesRailProps {
  packages: TravelPackage[];
  onExplore: (term: string) => void;
}

export function TrendingPlacesRail({ packages, onExplore }: TrendingPlacesRailProps) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Where travellers are going"
            title="Trending destinations"
            subtitle="The places Tripime travellers are asking about most this season."
          />
        </Reveal>

        <Reveal className="mt-7" delayMs={60}>
          <CarouselRail>
            {TRENDING_PLACES.map((place) => (
              <PlaceCard
                key={place.name}
                place={place}
                pkg={findPackage(packages, place.match)}
                onExplore={onExplore}
              />
            ))}
          </CarouselRail>
        </Reveal>
      </div>
    </section>
  );
}

function PlaceCard({
  place,
  pkg,
  onExplore,
}: {
  place: LandingPlace;
  pkg?: TravelPackage;
  onExplore: (term: string) => void;
}) {
  const body = (
    <>
      <img
        src={pkg?.imageUrl || place.image}
        alt={`${place.name} holidays`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/25 to-transparent"
        aria-hidden
      />
      <div className="relative mt-auto p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold tracking-tight text-white">{place.name}</h3>
          <span className="flex size-7 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition group-hover:bg-brand-coral group-hover:ring-brand-coral">
            <ArrowUpRight className="size-3.5" aria-hidden />
          </span>
        </div>
        {place.note && <p className="mt-0.5 text-xs text-white/75">{place.note}</p>}
        <p className="mt-2 text-xs font-semibold text-white/90">
          {pkg ? `From ${formatINR(pkg.price)}` : "Get a custom quote"}
        </p>
      </div>
    </>
  );

  const shell =
    "group relative isolate flex aspect-[4/5] w-[210px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl shadow-soft ring-1 ring-neutral-900/5 transition hover:shadow-elevated sm:w-[236px]";

  if (pkg) {
    return (
      <Link to={`/packages/${pkg.id}`} className={shell}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onExplore(place.name)} className={`${shell} text-left`}>
      {body}
    </button>
  );
}
