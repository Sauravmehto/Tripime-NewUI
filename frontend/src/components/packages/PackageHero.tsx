import { useState, type FormEvent } from "react";
import { MessageCircle, Phone, Search, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { Field, Input, Select } from "../ui/Input";
import { HELPLINE_DISPLAY, telLink, whatsappLink } from "../../lib/contact";
import { darkGhostLink } from "./landingStyles";
import { HOLIDAY_DESTINATIONS, TRAVEL_MONTHS } from "./holidaysData";
import { HERO_IMAGE, HERO_QUICK_PICKS } from "./packageLandingData";

interface PackageHeroProps {
  onSearch: (values: { to: string; month: string }) => void;
}

export function PackageHero({ onSearch }: PackageHeroProps) {
  const [to, setTo] = useState("");
  const [month, setMonth] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSearch({ to: to.trim(), month });
  }

  return (
    <section className="relative isolate overflow-hidden bg-primary-900">
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-900/80 to-primary-800/55"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-20 lg:pt-32">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-coral">
          Tripime Holidays
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          Holidays planned by people,
          <span className="block text-brand-coral">not by a booking engine</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
          Tell us where you want to go. A Tripime travel expert builds the itinerary, confirms
          stays and transfers, and stays on call for the whole trip.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-white/75 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-brand-coral" aria-hidden />
            No payment until the plan is final
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="size-4 text-brand-coral" aria-hidden />
            {HELPLINE_DISPLAY}
          </span>
        </div>

        <div className="mt-8 rounded-[1.75rem] bg-white/95 p-4 shadow-elevated ring-1 ring-white/40 backdrop-blur sm:p-5">
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto] sm:items-end"
          >
            <Field label="Where do you want to go?" dense>
              <Input
                value={to}
                onChange={(event) => setTo(event.target.value)}
                placeholder="Goa, Kerala, Dubai, Bali…"
                list="tripime-holiday-destinations"
                autoComplete="off"
              />
              <datalist id="tripime-holiday-destinations">
                {HOLIDAY_DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest} />
                ))}
              </datalist>
            </Field>
            <Field label="Month of travel (optional)" dense>
              <Select value={month} onChange={(event) => setMonth(event.target.value)}>
                <option value="">Not decided yet</option>
                {TRAVEL_MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </Field>
            <Button
              type="submit"
              size="lg"
              variant="coral"
              className="h-11 w-full sm:h-12 sm:min-w-[140px]"
            >
              <Search className="size-4" aria-hidden />
              Find holidays
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-200 pt-4">
            <span className="text-xs font-semibold text-neutral-500">Popular:</span>
            {HERO_QUICK_PICKS.map(({ label, icon: Icon, term }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setTo(term);
                  onSearch({ to: term, month });
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-brand-coral hover:bg-brand-coral-soft hover:text-brand-coral"
              >
                <Icon className="size-3.5" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href={telLink()} className={darkGhostLink}>
            <Phone className="size-4" aria-hidden />
            Talk to an expert
          </a>
          <a
            href={whatsappLink("Hi Tripime, I'd like help planning a holiday package.")}
            target="_blank"
            rel="noreferrer"
            className={darkGhostLink}
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
