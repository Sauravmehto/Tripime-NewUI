import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { POPULAR_AIRLINES } from "@/lib/home/home-data";

export function AirlinesStrip() {
  return (
    <section className="border-y border-neutral-200 bg-white">
      <Container className="py-10 sm:py-12">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
            Popular airlines
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {POPULAR_AIRLINES.map((name) => (
              <span
                key={name}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-ink-muted shadow-xs transition hover:border-primary-200 hover:text-primary-700"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
