"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin, Plane } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { MAP_DESTINATIONS, MAP_ROUTE } from "@/lib/home/home-data";

const AUTO_MS = 4200;

export function TravelMap() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(MAP_DESTINATIONS[0]?.id ?? "delhi");
  const [paused, setPaused] = useState(false);
  const active =
    MAP_DESTINATIONS.find((d) => d.id === activeId) ?? MAP_DESTINATIONS[0];
  const activeIndex = MAP_DESTINATIONS.findIndex((d) => d.id === activeId);

  useEffect(() => {
    if (reduceMotion || paused || MAP_DESTINATIONS.length < 2) return;
    const id = window.setInterval(() => {
      setActiveId((prev) => {
        const i = MAP_DESTINATIONS.findIndex((d) => d.id === prev);
        const next = (i + 1) % MAP_DESTINATIONS.length;
        return MAP_DESTINATIONS[next]!.id;
      });
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  return (
    <section
      className="relative isolate overflow-hidden py-10 sm:py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Brand atmosphere */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-50/80 via-canvas to-accent-soft/40" aria-hidden />
      <div
        className="pointer-events-none absolute -left-20 top-0 size-[22rem] rounded-full bg-primary-400/20 blur-3xl animate-orb-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 size-[20rem] rounded-full bg-accent/15 blur-3xl animate-orb-float-delayed"
        aria-hidden
      />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Featured route"
            title="Follow the journey"
            subtitle="Delhi → Dubai → Istanbul → Paris — tap a stop to explore packages and flights."
          />
        </Reveal>

        {/* City chips */}
        <Reveal className="mt-5" delayMs={40}>
          <div
            className="flex flex-wrap items-center gap-2"
            role="tablist"
            aria-label="Route stops"
          >
            {MAP_DESTINATIONS.map((dest, i) => (
              <div key={dest.id} className="flex items-center gap-2">
                {i > 0 && (
                  <ArrowRight className="size-3.5 shrink-0 text-primary-300" aria-hidden />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeId === dest.id}
                  onClick={() => setActiveId(dest.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    activeId === dest.id
                      ? "border-primary-600 bg-primary-600 text-white shadow-soft"
                      : "border-neutral-200/90 bg-white/80 text-ink-muted hover:border-primary-200 hover:text-primary-700",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full text-[9px] font-bold",
                      activeId === dest.id
                        ? "bg-white/20 text-white"
                        : "bg-neutral-100 text-ink-subtle",
                    )}
                  >
                    {i + 1}
                  </span>
                  {dest.name}
                </button>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-6" delayMs={80}>
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.85fr] lg:items-stretch">
            {/* SVG route stage */}
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-medium backdrop-blur-sm">
              <svg
                viewBox="0 0 100 64"
                className="mx-auto block w-full"
                role="img"
                aria-label="Interactive travel route from Delhi to Paris"
              >
                <defs>
                  <linearGradient id="tpRouteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="55%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#e14d55" />
                  </linearGradient>
                  <linearGradient id="tpLandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#e14d55" stopOpacity="0.12" />
                  </linearGradient>
                  <filter id="tpGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Soft landmass silhouettes */}
                <ellipse cx="72" cy="44" rx="26" ry="14" fill="url(#tpLandGrad)" opacity="0.7" />
                <ellipse cx="42" cy="30" rx="22" ry="16" fill="#dbeafe" opacity="0.55" />
                <ellipse cx="28" cy="38" rx="14" ry="10" fill="#fdecec" opacity="0.5" />
                <path
                  d="M14 50 Q28 44 40 48 T68 52 T92 46"
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="0.35"
                  opacity="0.45"
                />

                {/* Glow under route */}
                <path
                  d={MAP_ROUTE}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.4"
                  opacity="0.12"
                  strokeLinecap="round"
                />

                {/* Animated route */}
                <path
                  d={MAP_ROUTE}
                  fill="none"
                  stroke="url(#tpRouteGrad)"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  pathLength={100}
                  className={reduceMotion ? undefined : "animate-route-draw"}
                  style={
                    reduceMotion
                      ? undefined
                      : { strokeDasharray: 100, strokeDashoffset: 0 }
                  }
                  filter="url(#tpGlow)"
                />
                <path
                  d={MAP_ROUTE}
                  fill="none"
                  stroke="url(#tpRouteGrad)"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeDasharray="2.5 3.5"
                  className="animate-route-dash opacity-70"
                />

                {/* Plane: Delhi → Paris → Delhi, nose aligned to route */}
                {!reduceMotion && (
                  <g>
                    <animateMotion
                      dur="14s"
                      repeatCount="indefinite"
                      path={MAP_ROUTE}
                      rotate="auto"
                      keyPoints="0;0;1;1;0;0"
                      keyTimes="0;0.08;0.45;0.55;0.92;1"
                      calcMode="linear"
                    />
                    {/* Lucide plane points up; rotate 90° so nose = +X for rotate="auto" */}
                    <g transform="rotate(90) translate(-12 -12) scale(0.3)">
                      <path
                        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-4.5L21 16Z"
                        fill="#1d4ed8"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                )}

                {MAP_DESTINATIONS.map((dest) => {
                  const isActive = activeId === dest.id;
                  return (
                    <g
                      key={dest.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveId(dest.id)}
                      onFocus={() => setActiveId(dest.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${dest.name}, ${dest.country}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveId(dest.id);
                        }
                      }}
                    >
                      {isActive && (
                        <circle
                          cx={dest.x}
                          cy={dest.y}
                          r="5.5"
                          fill="none"
                          stroke="#e14d55"
                          strokeWidth="0.55"
                          opacity="0.55"
                          className="animate-pulse-soft"
                        />
                      )}
                      <circle
                        cx={dest.x}
                        cy={dest.y}
                        r={isActive ? 3.4 : 2.5}
                        className={cn(
                          "transition-all duration-300",
                          isActive ? "fill-accent" : "fill-primary-600",
                        )}
                      />
                      <circle
                        cx={dest.x}
                        cy={dest.y}
                        r={isActive ? 1.4 : 1}
                        fill="white"
                      />
                      {/* Label chip */}
                      <rect
                        x={dest.x - 8}
                        y={dest.y - 9.5}
                        width="16"
                        height="5"
                        rx="1.5"
                        className={cn(
                          "transition-opacity",
                          isActive ? "fill-white opacity-95" : "fill-white opacity-70",
                        )}
                        stroke={isActive ? "#e14d55" : "#93c5fd"}
                        strokeWidth="0.35"
                      />
                      <text
                        x={dest.x}
                        y={dest.y - 6}
                        textAnchor="middle"
                        className="fill-ink text-[2.6px] font-bold"
                      >
                        {dest.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Progress dots */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {MAP_DESTINATIONS.map((d, i) => (
                  <span
                    key={d.id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === activeIndex ? "w-5 bg-accent" : "w-1.5 bg-primary-200",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Destination media panel */}
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-neutral-200/70 bg-ink shadow-elevated sm:min-h-[320px]">
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.image}
                      alt={`${active.name}, ${active.country}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/15" />

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                        <MapPin className="size-3" aria-hidden />
                        {active.country}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-white">{active.name}</h3>
                      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/80">
                        {active.blurb}
                      </p>
                      <p className="mt-3 text-sm text-white/90">
                        Packages from{" "}
                        <span className="text-base font-bold text-white">
                          {active.priceFrom}
                        </span>
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href="/packages">
                          <Button size="sm" variant="accent">
                            Browse packages
                          </Button>
                        </Link>
                        <Link href={active.flightHref}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                          >
                            <Plane className="size-3.5" aria-hidden />
                            Search flights
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
