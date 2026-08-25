import { useState } from "react";
import { Link } from "react-router-dom";
import { Info, Phone } from "lucide-react";
import { telLink } from "../../lib/contact";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { VISA_GROUPS } from "./packageLandingData";

interface VisaGetawaysProps {
  onExplore: (term: string) => void;
}

export function VisaGetaways({ onExplore }: VisaGetawaysProps) {
  const [activeId, setActiveId] = useState(VISA_GROUPS[0].id);
  const activeGroup = VISA_GROUPS.find((group) => group.id === activeId) ?? VISA_GROUPS[0];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Less paperwork"
            title="Easy-entry getaways"
            subtitle="Destinations that are simple to enter on an Indian passport — good picks when you're planning at short notice."
            action={
              <div className="inline-flex rounded-full bg-neutral-100 p-1">
                {VISA_GROUPS.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    aria-pressed={group.id === activeId}
                    onClick={() => setActiveId(group.id)}
                    className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                      group.id === activeId
                        ? "bg-white text-primary-800 shadow-soft"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {group.id === "visa-free" ? "Visa free" : "Visa on arrival"}
                  </button>
                ))}
              </div>
            }
          />
        </Reveal>

        <Reveal className="mt-8" delayMs={60}>
          <p className="text-sm font-semibold text-neutral-700">{activeGroup.label}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-7 sm:gap-x-10">
            {activeGroup.places.map((place) => (
              <li key={place.name}>
                <button
                  type="button"
                  onClick={() => onExplore(place.match[0])}
                  className="group flex w-24 flex-col items-center gap-2.5 text-center sm:w-28"
                >
                  <span className="relative isolate block size-24 overflow-hidden rounded-full ring-2 ring-neutral-200 transition group-hover:ring-brand-coral sm:size-28">
                    <img
                      src={place.image}
                      alt={`${place.name} travel`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-sm font-semibold text-neutral-800 transition group-hover:text-brand-coral">
                    {place.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8" delayMs={120}>
          <div className="flex flex-col gap-3 rounded-2xl border border-primary-100 bg-primary-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-primary-900 sm:text-sm">
              <Info className="mt-0.5 size-4 shrink-0 text-primary-700" aria-hidden />
              <span>
                Entry rules change often — always confirm the current requirement for your passport
                before booking. Tripime visa assistance is{" "}
                <Link to="/visa" className="font-semibold underline">
                  launching soon
                </Link>
                .
              </span>
            </p>
            <a
              href={telLink()}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-800 transition hover:bg-primary-50"
            >
              <Phone className="size-4" aria-hidden />
              Ask an expert
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
