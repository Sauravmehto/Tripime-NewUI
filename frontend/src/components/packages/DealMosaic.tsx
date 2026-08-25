import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatINR } from "../../lib/format";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { DEAL_TILES, findPackage } from "./packageLandingData";
import type { TravelPackage } from "../../types";

interface DealMosaicProps {
  packages: TravelPackage[];
  onExplore: (term: string) => void;
}

export function DealMosaic({ packages, onExplore }: DealMosaicProps) {
  return (
    <section className="bg-neutral-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Ideas worth stealing"
            title="Trips our experts are building right now"
            subtitle="Every plan below can be reshaped — swap the hotel, add a city, move the dates."
          />
        </Reveal>

        <Reveal className="mt-7" delayMs={60}>
          <div className="grid gap-4 sm:grid-cols-4">
            {DEAL_TILES.map((tile, index) => {
              const pkg = findPackage(packages, tile.match);
              const large = index === 0;
              const shell = `group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl text-left shadow-soft ring-1 ring-neutral-900/5 transition hover:shadow-elevated ${
                large
                  ? "min-h-[260px] sm:col-span-2 sm:row-span-2 sm:min-h-[420px]"
                  : "min-h-[200px]"
              }`;

              const body = (
                <>
                  <img
                    src={pkg?.imageUrl || tile.image}
                    alt={tile.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary-900/92 via-primary-900/40 to-primary-900/5"
                    aria-hidden
                  />
                  <div className="relative p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`font-bold tracking-tight text-white ${
                          large ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {tile.name}
                      </h3>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition group-hover:bg-brand-coral group-hover:ring-brand-coral">
                        <ArrowUpRight className="size-4" aria-hidden />
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-white/80 ${large ? "max-w-sm text-sm" : "text-xs"}`}
                    >
                      {tile.blurb}
                    </p>
                    <p className="mt-2.5 text-xs font-semibold text-white">
                      {pkg ? `From ${formatINR(pkg.price)} · ${pkg.duration}` : "Custom quote in 24 hrs"}
                    </p>
                  </div>
                </>
              );

              return pkg ? (
                <Link key={tile.name} to={`/packages/${pkg.id}`} className={shell}>
                  {body}
                </Link>
              ) : (
                <button
                  key={tile.name}
                  type="button"
                  onClick={() => onExplore(tile.match[0])}
                  className={shell}
                >
                  {body}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
