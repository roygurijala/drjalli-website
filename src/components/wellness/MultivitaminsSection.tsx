import Link from "next/link";
import {
  getWellnessStoreUrl,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";
import {
  MultivitaminHeroIllustration,
  MultivitaminTileCapsules,
  MultivitaminTileCitrus,
  MultivitaminTileShield,
} from "@/components/wellness/MultivitaminGraphics";

type Props = {
  /** Shorter copy and single row for home page */
  variant?: "home" | "page";
};

export function MultivitaminsSection({ variant = "page" }: Props) {
  const storeUrl = getWellnessStoreUrl();
  const isHome = variant === "home";

  return (
    <section
      className={`relative overflow-hidden py-14 md:py-16 ${
        isHome ? "border-y border-teal-100/80 bg-white" : "bg-white"
      }`}
      aria-labelledby="multivitamins-heading"
    >
      {!isHome ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/60 to-transparent"
          aria-hidden
        />
      ) : null}

      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`grid gap-10 ${isHome ? "lg:grid-cols-[1fr_1.05fr] lg:items-center" : "lg:grid-cols-[1fr_1.1fr] lg:items-center"}`}
        >
          <div className="order-2 lg:order-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-800">
              <span aria-hidden>✨</span>
              Practice wellness
            </div>
            <h2
              id="multivitamins-heading"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl"
            >
              Quality multivitamins, chosen with your care in mind
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              We offer trusted multivitamin options you can order through our secure online wellness
              storefront—so you can stay consistent with what your clinician recommends, alongside a
              balanced diet.
            </p>
            {!isHome ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Not sure which formula is right for you? Ask us at your next visit or call the office;
                we&apos;re happy to point you toward an appropriate choice for your age, health
                goals, and medications.
              </p>
            ) : null}

            <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
              {[
                "Convenient home delivery on many products",
                "Formulations selected for everyday nutritional support",
                "Guidance from your care team when you need it",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-teal-600" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-500"
              >
                Shop our wellness store ↗
              </a>
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-full border border-teal-300 bg-white px-6 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Questions? Call {PRACTICE_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Contact &amp; directions
              </Link>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              Dietary supplements are not intended to diagnose, treat, cure, or prevent disease.
              Use only as directed and discuss with your clinician—especially if you take
              prescriptions, are pregnant, or have chronic conditions.
            </p>
            {isHome ? (
              <p className="mt-4">
                <Link
                  href="/wellness/multivitamins"
                  className="text-sm font-semibold text-teal-700 underline-offset-2 hover:underline"
                >
                  More about multivitamins &amp; FAQs →
                </Link>
              </p>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <MultivitaminHeroIllustration className="h-auto w-full drop-shadow-sm" />
              <div
                className={`mt-4 grid gap-3 ${isHome ? "sm:grid-cols-3" : "sm:grid-cols-3"}`}
              >
                <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
                  <MultivitaminTileCapsules className="h-24 w-full" />
                  <p className="px-3 pb-3 text-center text-[11px] font-medium text-slate-600">
                    Daily support
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
                  <MultivitaminTileCitrus className="h-24 w-full" />
                  <p className="px-3 pb-3 text-center text-[11px] font-medium text-slate-600">
                    Whole-body balance
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm">
                  <MultivitaminTileShield className="h-24 w-full" />
                  <p className="px-3 pb-3 text-center text-[11px] font-medium text-slate-600">
                    Trusted quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
