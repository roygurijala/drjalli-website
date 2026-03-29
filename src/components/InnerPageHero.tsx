import Link from "next/link";
import { Fragment } from "react";
import {
  PRACTICE_NAME,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_HEADER_TRUST,
  PRACTICE_HOURS_SHORT,
} from "@/lib/constants";

export type InnerPageCrumb = { label: string; href?: string };

type InnerPageHeroProps = {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs: InnerPageCrumb[];
  /** Show location / hours / phone row under the description (default true) */
  showPracticeFacts?: boolean;
};

export function InnerPageHero({
  title,
  description,
  badge,
  breadcrumbs,
  showPracticeFacts = true,
}: InnerPageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-navy-900 px-4 py-12 text-white md:py-16"
      aria-label="Page header"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <nav
          className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((c, i) => (
            <Fragment key={`${c.label}-${i}`}>
              {i > 0 && (
                <span aria-hidden className="text-slate-500">
                  ›
                </span>
              )}
              {c.href ? (
                <Link href={c.href} className="hover:text-teal-300">
                  {c.label}
                </Link>
              ) : (
                <span className="text-teal-300">{c.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        {badge ? (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-xs font-semibold text-teal-300">
            {badge}
          </div>
        ) : null}
        <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            {description}
          </p>
        ) : null}

        {showPracticeFacts ? (
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-400/90">
              {PRACTICE_NAME}
            </p>
            <p className="mt-2 flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-slate-400">
              <span className="text-slate-300">{PRACTICE_HEADER_TRUST}</span>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <span>{PRACTICE_HOURS_SHORT}</span>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="font-semibold text-teal-300 hover:text-teal-200"
              >
                {PRACTICE_PHONE}
              </a>
              <span className="text-slate-600" aria-hidden>
                ·
              </span>
              <Link
                href="/contact"
                className="text-teal-300 underline-offset-2 hover:text-teal-200 hover:underline"
              >
                Location, parking & directions
              </Link>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
