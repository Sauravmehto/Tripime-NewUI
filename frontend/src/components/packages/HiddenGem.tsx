import { useState } from "react";
import { ArrowRight, Compass, MessageCircle } from "lucide-react";
import { whatsappLink } from "../../lib/contact";
import { HIDDEN_GEMS, findPackage } from "./packageLandingData";
import { darkGhostLink, lightLink } from "./landingStyles";
import { Reveal } from "./Reveal";
import type { TravelPackage } from "../../types";

interface HiddenGemProps {
  packages: TravelPackage[];
  onExplore: (term: string) => void;
}

export function HiddenGem({ packages, onExplore }: HiddenGemProps) {
  const [index, setIndex] = useState(0);
  const gem = HIDDEN_GEMS[index];
  const nearby = findPackage(packages, gem.match);

  return (
    <section className="relative isolate overflow-hidden bg-primary-900">
      <img
        key={gem.id}
        src={gem.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full animate-fade-up object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/75 to-primary-900/35"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/25">
            <Compass className="size-3.5 text-brand-coral" aria-hidden />
            Hidden gems
          </span>
          <p className="mt-6 text-lg italic text-brand-coral">{gem.script}</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {gem.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {gem.copy}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink(`Hi Tripime, I'd like to plan a trip to ${gem.title}.`)}
              target="_blank"
              rel="noreferrer"
              className={lightLink}
            >
              <MessageCircle className="size-4" aria-hidden />
              Plan this trip
            </a>
            {nearby && (
              <button
                type="button"
                onClick={() => onExplore(gem.match[gem.match.length - 1])}
                className={darkGhostLink}
              >
                Nearby packages
                <ArrowRight className="size-4" aria-hidden />
              </button>
            )}

            <div className="ml-1 flex gap-2">
              {HIDDEN_GEMS.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={itemIndex === index}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-1.5 rounded-full transition-all ${
                    itemIndex === index ? "w-7 bg-brand-coral" : "w-3 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
