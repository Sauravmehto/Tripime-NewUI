import { FileCheck2, IndianRupee, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { TRUST_POINTS } from "@/lib/home/home-data";

const ICONS = [FileCheck2, IndianRupee, MessageCircle, ShieldCheck];

export function TrustStrip() {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <Container className="py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map(({ title, body }, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <Reveal key={title} delayMs={i * 60}>
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
