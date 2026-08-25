import { MessageCircle, Phone } from "lucide-react";
import { HELPLINE_DISPLAY, telLink, whatsappLink } from "../../lib/contact";
import { darkGhostLink, lightLink } from "./landingStyles";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    title: "Tell us the rough idea",
    copy: "A destination, a month, how many of you. That is enough to start — dates can move later.",
  },
  {
    title: "We build the itinerary",
    copy: "Stays, transfers, sightseeing and a written cost breakdown, usually within a day.",
  },
  {
    title: "You travel, we stay reachable",
    copy: "Pay only once you are happy with the plan. Your expert stays on call through the trip.",
  },
];

export function TrustStory() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-900 py-14 sm:py-20">
      <div
        className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-brand-coral/20 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="A Tripime travel expert planning an itinerary"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-elevated"
            />
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-white p-4 shadow-elevated sm:left-6 sm:right-auto sm:max-w-xs">
              <p className="text-sm font-bold text-neutral-900">No online checkout for holidays</p>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                Packages are enquiry-based on purpose — pricing depends on your dates, hotels and
                group size.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-coral">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            A real person plans your trip
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75">
            Tripime holidays are put together by travel experts, not assembled by a filter. Here is
            what happens after you send an enquiry.
          </p>

          <ol className="mt-7 space-y-5">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-coral text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={telLink()} className={lightLink}>
              <Phone className="size-4" aria-hidden />
              Call {HELPLINE_DISPLAY}
            </a>
            <a
              href={whatsappLink("Hi Tripime, I'd like help planning a holiday package.")}
              target="_blank"
              rel="noreferrer"
              className={darkGhostLink}
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
