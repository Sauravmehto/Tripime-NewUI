import { Link } from "react-router-dom";
import { ArrowRight, Clock, MessageCircle } from "lucide-react";
import { formatINR } from "../../lib/format";
import { whatsappLink } from "../../lib/contact";
import type { TravelPackage } from "../../types";

interface PackageTicketCardProps {
  pkg: TravelPackage;
}

const CATEGORY_LABEL: Record<TravelPackage["category"], string> = {
  domestic: "India",
  international: "International",
  offer: "Offer",
  upcoming_event: "Event",
};

export function PackageTicketCard({ pkg }: PackageTicketCardProps) {
  const highlights = pkg.highlights.slice(0, 2);
  const extra = pkg.highlights.length - highlights.length;
  const meta = [pkg.guests, pkg.stays].filter(Boolean).join(" · ");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-medium focus-within:ring-2 focus-within:ring-primary-500/40">
      <div className="relative isolate h-32 shrink-0 overflow-hidden lg:h-36">
        {pkg.imageUrl ? (
          <img
            src={pkg.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 bg-linear-155 from-primary-900 to-primary-600"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0 bg-linear-to-t from-primary-900/85 via-primary-900/20 to-transparent"
          aria-hidden
        />

        <span className="absolute left-2.5 top-2.5 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px]/4 font-bold uppercase tracking-wide text-primary-800">
          {CATEGORY_LABEL[pkg.category]}
        </span>
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-primary-900/70 px-1.5 py-0.5 text-[10px]/4 font-semibold text-white backdrop-blur-xs">
          <Clock className="size-2.5" aria-hidden />
          {pkg.duration}
        </span>

        <div className="absolute inset-x-3 bottom-2">
          <h3 className="truncate text-sm/5 font-semibold text-white">{pkg.title}</h3>
          <p className="truncate text-[11px]/4 text-white/75">{pkg.destination}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        {highlights.length > 0 && (
          <ul className="flex flex-wrap gap-1">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="max-w-full truncate rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px]/4 font-medium text-neutral-600"
              >
                {highlight}
              </li>
            ))}
            {extra > 0 && (
              <li className="px-0.5 py-0.5 text-[10px]/4 font-semibold text-neutral-400">
                +{extra}
              </li>
            )}
          </ul>
        )}

        <p className="truncate text-[11px]/4 text-neutral-500">
          {meta}
          {pkg.eventDate && (
            <span className="font-semibold text-brand-coral"> · {pkg.eventDate}</span>
          )}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-2.5">
          <div className="min-w-0">
            <p className="text-[15px]/5 font-bold text-primary-800">
              {formatINR(pkg.price)}
              {pkg.negotiable && (
                <span className="ml-1 text-[9px]/4 font-bold uppercase tracking-wide text-accent">
                  neg.
                </span>
              )}
            </p>
            <p className="truncate text-[10px]/4 font-medium text-neutral-500">{pkg.priceNote}</p>
          </div>

          <div className="relative z-20 flex shrink-0 items-center gap-1.5">
            <a
              href={whatsappLink(`Hi Tripime, I'm interested in the "${pkg.title}" package.`)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ask about ${pkg.title} on WhatsApp`}
              className="flex size-8 items-center justify-center rounded-lg border border-neutral-200 text-success-600 transition hover:border-success-200 hover:bg-success-50"
            >
              <MessageCircle className="size-3.5" aria-hidden />
            </a>
            <span
              className="flex size-8 items-center justify-center rounded-lg bg-primary-600 text-white transition group-hover:bg-primary-700"
              aria-hidden
            >
              <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/packages/${pkg.id}`}
        aria-label={`View ${pkg.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none"
      />
    </article>
  );
}
