import Link from "next/link";
import { getHomeFeaturedServices, getServiceHref } from "@/data/services";

/**
 * Single home “services” block: curated grid + one CTA to /services (no duplicate carousel).
 */
export function FeaturedServicesGrid() {
  const featured = getHomeFeaturedServices();

  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/95 via-white to-white"
      aria-labelledby="home-services-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 pt-14 pb-4">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
            Our services
          </p>
          <h2
            id="home-services-heading"
            className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
          >
            Care built around your goals
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            From prevention and chronic care to in-office tools like InBody — clear answers and a
            plan that fits your life. Start with the highlights below, or{" "}
            <Link href="/services" className="font-medium text-teal-700 underline-offset-2 hover:underline">
              view every service
            </Link>{" "}
            in our directory.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            At our office we also offer{" "}
            <Link
              href="/services/abi-testing"
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
            >
              ABI testing
            </Link>
            ,{" "}
            <Link
              href="/services/allergy-testing"
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
            >
              allergy testing
            </Link>
            , and{" "}
            <Link
              href="/services/nutrition-counseling"
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
            >
              nutrition counseling
            </Link>{" "}
            — ask our team what is right for you.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Qualified patients may use an{" "}
            <Link
              href="/services/home-sleep-study"
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
            >
              at-home sleep study kit
            </Link>{" "}
            when your clinician recommends testing for sleep apnea or related concerns.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <Link
              key={s.slug}
              href={getServiceHref(s)}
              prefetch
              className="group flex h-full flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-sm ring-1 ring-slate-100/80 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md hover:ring-teal-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label={`${s.title} — learn more`}
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-white text-xl shadow-sm ring-1 ring-teal-100 transition group-hover:scale-[1.03]">
                <span aria-hidden>{s.icon ?? "✨"}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-slate-900 group-hover:text-teal-800">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                {s.blurb}
              </p>
              {s.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-teal-700 transition group-hover:gap-1">
                Learn more
                <span aria-hidden className="ml-0.5 transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div id="all-services-cta" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-14">
        <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/70 via-white to-slate-50/40 p-6 shadow-sm sm:flex-row sm:items-center sm:gap-6 md:p-8">
          <div className="min-w-0 text-center sm:text-left">
            <p className="font-display text-base font-bold text-slate-900 md:text-lg">
              See everything we offer
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Home sleep studies (when appropriate), allergy testing, ABI, nutrition counseling,
              women&apos;s health, care coordination, and more.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-navy-800 sm:self-center"
          >
            Browse all services
          </Link>
        </div>
      </div>
    </section>
  );
}
