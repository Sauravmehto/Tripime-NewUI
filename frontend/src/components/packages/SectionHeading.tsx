import type { ReactNode } from "react";

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Renders on the right on desktop — usually a link or tab group. */
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  action,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      } ${className}`}
    >
      <div className="max-w-2xl">
        {kicker && (
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-coral">
            {kicker}
          </p>
        )}
        <h2
          className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
            dark ? "text-white" : "text-neutral-900"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-2 text-sm leading-relaxed sm:text-[15px] ${
              dark ? "text-white/75" : "text-neutral-600"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
