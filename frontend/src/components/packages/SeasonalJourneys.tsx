import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { formatINR } from "../../lib/format";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SEASONAL_JOURNEYS, findPackage } from "./packageLandingData";
import type { TravelPackage } from "../../types";

interface SeasonalJourneysProps {
  packages: TravelPackage[];
  onExplore: (term: string) => void;
}

export function SeasonalJourneys({ packages, onExplore }: SeasonalJourneysProps) {
  return (
    <section className="bg-neutral-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Right place, right month"
            title="Best time to go"
            subtitle="Weather and crowds change what a destination feels like. These are the windows we recommend."
          />
        </Reveal>

        <Reveal className="mt-7" delayMs={60}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SEASONAL_JOURNEYS.map((journey) => {
              const pkg = findPackage(packages, journey.match);
              const content = (
                <>
                  <div className="relative isolate h-40 overflow-hidden">
                    <img
                      src={pkg?.imageUrl || journey.image}
                      alt={`${journey.name} in ${journey.window}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-primary-900 shadow-soft">
                      <CalendarDays className="size-3.5 text-brand-coral" aria-hidden />
                      {journey.window}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-bold tracking-tight text-neutral-900">{journey.name}</h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-neutral-600">
                      {journey.why}
                    </p>
                    <p className="mt-3 text-sm font-bold text-primary-800">
                      {pkg ? `From ${formatINR(pkg.price)}` : "Custom quote"}
                    </p>
                  </div>
                </>
              );

              const shell =
                "group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white text-left shadow-soft transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-elevated";

              return pkg ? (
                <Link key={journey.name} to={`/packages/${pkg.id}`} className={shell}>
                  {content}
                </Link>
              ) : (
                <button
                  key={journey.name}
                  type="button"
                  onClick={() => onExplore(journey.name)}
                  className={shell}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
