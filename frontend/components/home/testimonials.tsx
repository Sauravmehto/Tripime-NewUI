"use client";

import { Carousel } from "@/components/travel/carousel";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/home/home-data";

export function Testimonials() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Traveller stories"
            title="Real feedback, real trips"
            subtitle="What customers say about booking flights and packages with Tripime."
            align="center"
          />
        </Reveal>

        <Reveal className="mt-6" delayMs={80}>
          <Carousel gapClassName="gap-3">
            {TESTIMONIALS.map((item) => (
              <Card
                key={item.id}
                className="w-[85vw] shrink-0 snap-start sm:w-[340px] md:w-[320px]"
              >
                <p className="text-sm leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4 border-t border-neutral-100 pt-3">
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-[11px] text-ink-muted">
                    {item.location} · {item.trip}
                  </p>
                </div>
              </Card>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
