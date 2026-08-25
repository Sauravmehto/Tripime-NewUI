import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { HOLIDAY_THEMES } from "./packageLandingData";

interface ThemeExplorerProps {
  onExplore: (term: string) => void;
}

export function ThemeExplorer({ onExplore }: ThemeExplorerProps) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Start with a feeling"
            title="What kind of holiday is this?"
            subtitle="Pick a theme and we'll shortlist the packages that fit — then tailor them to you."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal className="mt-8" delayMs={60}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HOLIDAY_THEMES.map(({ id, label, copy, icon: Icon, term }) => (
              <button
                key={id}
                type="button"
                onClick={() => onExplore(term)}
                className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-brand-coral/40 hover:shadow-elevated"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-coral-soft text-brand-coral transition group-hover:bg-brand-coral group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <p className="mt-4 font-bold text-neutral-900">{label}</p>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-neutral-600">{copy}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-coral">
                  See packages
                  <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
