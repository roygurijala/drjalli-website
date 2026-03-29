import Link from "next/link";
import { getHomeFeaturedServices } from "@/data/services";

/**
 * Static spotlight services on the home page — scannable grid before the full carousel.
 */
export function FeaturedServicesGrid() {
  const featured = getHomeFeaturedServices();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-2">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2
            id="home-services-heading"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Care built around your goals
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
            From prevention and chronic care to in-office tools like InBody—clear answers and a
            plan that fits your life. Explore highlights below, then browse everything we offer.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-teal-600 bg-white px-5 py-2.5 text-sm font-semibold text-teal-700 shadow-sm transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          View all services →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            prefetch
            className="flex h-full flex-col rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 to-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label={`${s.title} — learn more`}
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
              <span aria-hidden>{s.icon ?? "✨"}</span>
            </div>
            <h3 className="font-display text-base font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-700">{s.blurb}</p>
            {s.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <span className="mt-4 inline-flex text-sm font-semibold text-teal-700">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
