import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { formatINR } from "../../lib/format";
import { coralLink, lightLink } from "./landingStyles";
import { PROMO_SLIDES, findPackage } from "./packageLandingData";
import { Reveal } from "./Reveal";
import type { TravelPackage } from "../../types";

interface PackagePromoBannerProps {
  packages: TravelPackage[];
  onExplore: (term: string) => void;
}

export function PackagePromoBanner({ packages, onExplore }: PackagePromoBannerProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % PROMO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = PROMO_SLIDES[index];
  const matched = findPackage(packages, slide.match);

  function step(direction: 1 | -1) {
    setIndex((current) => (current + direction + PROMO_SLIDES.length) % PROMO_SLIDES.length);
  }

  return (
    <section className="bg-neutral-50 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[1.75rem] bg-primary-900 shadow-elevated sm:rounded-[2rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <img
              key={slide.id}
              src={slide.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full animate-fade-up object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/85 to-primary-900/20"
              aria-hidden
            />

            <div className="relative flex min-h-[300px] flex-col justify-center gap-4 p-6 sm:min-h-[340px] sm:p-10 lg:max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-coral">
                {slide.kicker}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {slide.title}
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/80">{slide.copy}</p>

              {matched && (
                <p className="text-sm text-white/70">
                  From{" "}
                  <span className="text-base font-bold text-white">
                    {formatINR(matched.price)}
                  </span>{" "}
                  · {matched.duration}
                </p>
              )}

              <div className="mt-1 flex flex-wrap gap-3">
                {matched ? (
                  <Link to={`/packages/${matched.id}`} className={lightLink}>
                    View this itinerary
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => onExplore(slide.match[0])}
                    className={coralLink}
                  >
                    Explore packages
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                )}
              </div>
            </div>

            <div className="absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-6 sm:right-6">
              <div className="mr-2 flex gap-1.5">
                {PROMO_SLIDES.map((item, itemIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show slide ${itemIndex + 1}`}
                    aria-current={itemIndex === index}
                    onClick={() => setIndex(itemIndex)}
                    className={`h-1.5 rounded-full transition-all ${
                      itemIndex === index ? "w-6 bg-brand-coral" : "w-2.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <SlideButton label="Previous slide" onClick={() => step(-1)}>
                <ChevronLeft className="size-4" aria-hidden />
              </SlideButton>
              <SlideButton label="Next slide" onClick={() => step(1)}>
                <ChevronRight className="size-4" aria-hidden />
              </SlideButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SlideButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/25"
    >
      {children}
    </button>
  );
}
