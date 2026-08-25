import { Mail, MessageCircle, Phone } from "lucide-react";
import { FaqList, type FaqItem } from "../marketing/FaqList";
import {
  HELPLINE_DISPLAY,
  SUPPORT_EMAIL,
  mailLink,
  telLink,
  whatsappLink,
} from "../../lib/contact";
import { darkGhostLink, lightLink } from "./landingStyles";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { PACKAGE_BENEFITS } from "./packageLandingData";

const PACKAGE_FAQS: FaqItem[] = [
  {
    question: "Can I book a holiday package online right away?",
    answer:
      "Not yet. Holiday packages are enquiry-based because pricing depends on your dates, hotel choices and group size. Send an enquiry or call us and you'll get a written itinerary with costs, usually within a day.",
  },
  {
    question: "Are the prices shown final?",
    answer:
      "They're indicative starting prices per person for the listed inclusions. Your final quote can be lower or higher depending on travel dates, room category and how many of you are travelling.",
  },
  {
    question: "Can the itinerary be changed?",
    answer:
      "Yes — swap hotels, add or drop a city, extend nights or shift dates. Nothing is locked until you approve the plan and pay.",
  },
  {
    question: "What is included in a package?",
    answer:
      "Typically stays, airport and intercity transfers, listed sightseeing and taxes. Flights and visas can be added on request. Every quote lists inclusions and exclusions line by line.",
  },
];

export function SupportBenefits() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              kicker="What you get either way"
              title="Booked with Tripime, backed by Tripime"
            />
          </Reveal>

          <Reveal className="mt-8" delayMs={60}>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
              {PACKAGE_BENEFITS.map(({ title, copy, icon: Icon }) => (
                <div key={title} className="bg-white p-5">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-sm font-bold text-neutral-900">{title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">{copy}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12" delayMs={100}>
            <SectionHeading kicker="Before you enquire" title="Holiday package questions" />
            <div className="mt-6">
              <FaqList items={PACKAGE_FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary-900 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Still deciding? Talk it through.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Tell a Tripime expert what you have in mind — budget, dates, who's travelling —
                  and get an itinerary you can react to. No obligation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={telLink()} className={lightLink}>
                  <Phone className="size-4" aria-hidden />
                  {HELPLINE_DISPLAY}
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
                <a href={mailLink()} className={darkGhostLink}>
                  <Mail className="size-4" aria-hidden />
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
