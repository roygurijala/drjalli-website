// src/components/InBodyHighlightSection.tsx
"use client";
import Link from "next/link";
import { InBodyAnimatedVisualization } from "@/components/InBodyAnimatedVisualization";
import { INBODY_METRICS } from "@/data/inbody-page";
import { PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";

const howItWorks = [
  {
    step: "01",
    title: "Quick & Non-Invasive",
    desc: "Stand on the device and hold the handles. No needles, no radiation. The scan takes under two minutes.",
  },
  {
    step: "02",
    title: "Precise Segmental Results",
    desc: "You receive a full printout showing muscle, fat, and fluid levels broken down by body region.",
  },
  {
    step: "03",
    title: "15-minute results review",
    desc: "About 15 minutes of in-depth explanation of your printout—clear, plain-language guidance on what your numbers mean. If needed, schedule time with your physician or NP to discuss results in a medical visit.",
  },
];

type InBodyHighlightSectionProps = {
  /**
   * When false, the large centered headline block is hidden (use with `InnerPageHero` on `/inbody`).
   * @default true
   */
  showHeroHeading?: boolean;
};

export function InBodyHighlightSection({
  showHeroHeading = true,
}: InBodyHighlightSectionProps) {
  return (
    <section
      id="inbody"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)" }}
      aria-label="InBody body composition analysis"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">
        {showHeroHeading ? (
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300 bg-teal-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal-700">
              In-office testing & counseling
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              <span className="text-teal-600">InBody</span> Analysis —{" "}
              <br className="hidden md:block" />
              Know Your Body Beyond the Scale
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              In-office InBody body composition scanning gives you and your
              clinician precise, objective data — muscle, fat, hydration, and
              more — to guide metabolic health, weight management, and lifestyle goals.
            </p>
            <div className="mx-auto mt-8 flex max-w-xl flex-col items-stretch gap-3 sm:mx-auto sm:flex-row sm:justify-center">
              <Link
                href="/inbody"
                className="inline-flex items-center justify-center rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-500"
              >
                Full InBody guide — what we measure &amp; FAQs
              </Link>
              <Link
                href="/inbody#book-inbody"
                className="inline-flex items-center justify-center rounded-full border border-teal-300 bg-white px-6 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Schedule InBody
              </Link>
            </div>
          </div>
        ) : null}

        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${showHeroHeading ? "mt-12" : "mt-0"}`}
        >
          {INBODY_METRICS.map((m) => (
            <div
              key={m.label}
              className={`rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${m.card}`}
            >
              <div className="mb-3 text-3xl" aria-hidden>
                {m.icon}
              </div>
              <h3 className={`text-sm font-bold md:text-base ${m.label_color}`}>{m.label}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${m.desc_color}`}>{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">
          <InBodyAnimatedVisualization />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md md:p-8">
            <h3 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Is InBody right for you?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              InBody testing is especially valuable if you are working toward
              weight management, building strength, managing a metabolic
              condition such as diabetes or pre-diabetes, or simply want a more
              complete picture of your body beyond BMI.
            </p>

            <ul className="mt-5 space-y-3" aria-label="InBody use cases">
              {[
                "Weight management & obesity care",
                "Metabolic health monitoring (diabetes, pre-diabetes)",
                "Muscle mass tracking for strength-focused patients",
                "Nutritional and lifestyle coaching baseline",
                "Tracking progress over time — beyond the scale",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-base text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <strong className="font-semibold">Please note:</strong> InBody may
              not be appropriate for patients with implanted cardiac devices or
              during pregnancy. Always discuss with your clinician before scheduling.
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-base font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:bg-teal-500"
              >
                Ask About InBody: {PRACTICE_PHONE}
              </a>
              <Link
                href="/inbody"
                className="inline-flex items-center justify-center rounded-full border border-teal-300 bg-teal-50/80 px-5 py-2.5 text-sm font-semibold text-teal-800 transition hover:bg-teal-100"
              >
                Open the full InBody page (visit steps &amp; tiers)
              </Link>
              <p className="text-center text-xs text-slate-500">
                For general information only · Not a substitute for medical advice
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {howItWorks.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="font-display text-4xl font-bold text-teal-200">{item.step}</div>
              <h4 className="mt-3 text-base font-bold text-slate-900">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
