import Link from "next/link";
import { InBodyAnimatedVisualization } from "@/components/InBodyAnimatedVisualization";
import {
  INBODY_METRICS,
  INBODY_VISIT_STEPS,
  INBODY_WHO_FOR,
} from "@/data/inbody-page";
import { PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";
import { inbodyPageFaqs } from "@/lib/seo";

export function InBodyMeasuresSection() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-14 md:py-18"
      aria-labelledby="inbody-measures-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="inbody-measures-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          What InBody measures
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          InBody uses bioelectrical impedance to estimate how your weight divides into{" "}
          <strong className="font-semibold text-slate-800">muscle</strong>,{" "}
          <strong className="font-semibold text-slate-800">fat</strong>, and{" "}
          <strong className="font-semibold text-slate-800">water</strong> — including segmental
          regions (arms, legs, trunk) — so you see change that a bathroom scale can miss.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INBODY_METRICS.map((m) => (
            <div
              key={m.label}
              className={`rounded-2xl border p-5 transition-all duration-300 hover:shadow-md ${m.card}`}
            >
              <div className="mb-3 text-3xl" aria-hidden>
                {m.icon}
              </div>
              <h3 className={`text-sm font-bold md:text-base ${m.label_color}`}>{m.label}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${m.desc_color}`}>{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="font-display text-lg font-bold text-slate-900 md:text-xl">
            See how your results map to your body
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Illustrative animation — your actual printout is personalized to you.
          </p>
          <div className="mt-8">
            <InBodyAnimatedVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}

export function InBodyWhoSection() {
  return (
    <section
      className="bg-neutralBg py-14 md:py-18"
      aria-labelledby="inbody-who-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="inbody-who-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Who InBody is right for
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          InBody isn&apos;t for everyone — your clinician will confirm it fits your situation. It is
          often especially helpful when:
        </p>
        <ul className="mt-8 space-y-4">
          {INBODY_WHO_FOR.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                ✓
              </span>
              <span className="text-sm leading-relaxed text-slate-700 md:text-base">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong className="font-semibold">Please note:</strong> InBody may not be appropriate
          with certain implanted cardiac devices or during pregnancy. Tell us before you scan.
        </div>
      </div>
    </section>
  );
}

export function InBodyVisitFlowSection() {
  return (
    <section className="bg-white py-14 md:py-18" aria-labelledby="inbody-visit-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="inbody-visit-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Your visit, step by step
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Here&apos;s how we typically run an InBody experience at our office.{" "}
          <span className="text-slate-500">
            (Exact timing may vary by appointment type — always follow staff instructions.)
          </span>
        </p>

        <ol className="mt-10 list-none space-y-6 p-0">
          {INBODY_VISIT_STEPS.map((s) => (
            <li
              key={s.step}
              className="relative flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 md:gap-6 md:p-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white shadow-md shadow-teal-600/20">
                {s.step}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 md:text-lg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function InBodyTwoTierSection() {
  return (
    <section className="border-y border-teal-200/60 bg-gradient-to-b from-teal-50/80 to-white py-14 md:py-18">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          The two-tier model
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
          We separate the <strong className="text-slate-800">scan</strong> from the{" "}
          <strong className="text-slate-800">clinical interpretation</strong> so you always know
          what to expect — and when a physician or nurse practitioner is part of the conversation.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-teal-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Tier 1 — Scan & staff review
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
              Fast, structured, hands-on
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              You complete the InBody; our team ensures a quality reading, prints or saves your
              results, then guides you through roughly{" "}
              <strong className="text-slate-800">15 minutes of in-depth review</strong>—explaining
              your test results clearly and what each section of the printout means. This tier
              focuses on <strong className="text-slate-800">accuracy and education</strong>, not
              prescribing or changing medications. If you need a clinician discussion, you can
              schedule an appointment with your doctor or NP to go deeper on your results.
            </p>
          </div>
          <div className="rounded-3xl border border-navy-900/15 bg-navy-900 p-6 text-white shadow-md md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              Tier 2 — Clinician interpretation
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-white">
              Your chart, your goals, your plan
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              When you have a scheduled visit with your <strong className="text-white">physician</strong>{" "}
              or <strong className="text-white">nurse practitioner</strong>, InBody is woven into
              your medical history, labs, medications, and lifestyle goals. That&apos;s when we
              translate numbers into <strong className="text-white">clinical decisions</strong> —
              follow-up labs, medication adjustments, referrals, or referrals to nutrition — as
              appropriate. This may be the same visit as your scan or a separate appointment,
              depending on how your visit is booked. If you start with staff review only and later
              need a doctor visit to discuss results, we can help you schedule that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InBodyFaqSection() {
  return (
    <section id="inbody-faq" className="bg-white py-14 md:py-18" aria-labelledby="inbody-faq-heading">
      <div className="mx-auto max-w-3xl px-4">
        <h2
          id="inbody-faq-heading"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Frequently asked questions
        </h2>
        <div className="mt-8 space-y-3">
          {inbodyPageFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4 open:border-teal-200 open:bg-teal-50/40"
            >
              <summary className="cursor-pointer list-none font-display text-sm font-semibold text-slate-900 marker:hidden group-open:text-teal-700">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InBodyBookingCtaSection() {
  return (
    <section
      id="book-inbody"
      className="border-t border-slate-200 bg-gradient-to-br from-teal-600 to-teal-800 py-14 md:py-16"
      aria-labelledby="inbody-book-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 id="inbody-book-heading" className="font-display text-2xl font-bold text-white md:text-3xl">
          Ready to schedule InBody?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-teal-100 md:text-base">
          Call us to book — we&apos;ll confirm whether InBody is appropriate for you and how it fits
          your visit (scan-only vs. full clinician visit).
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`tel:${PRACTICE_PHONE_TEL}`}
            className="inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-teal-800 shadow-lg transition hover:bg-teal-50 sm:w-auto"
          >
            Call {PRACTICE_PHONE}
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] w-full min-w-[200px] items-center justify-center rounded-full border-2 border-white/80 bg-transparent px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Contact & directions
          </Link>
        </div>
        <p className="mt-6 text-xs text-teal-200/90">
          Established patients may also use the{" "}
          <a
            href="https://30779-1.portal.athenahealth.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-white"
          >
            patient portal
          </a>{" "}
          for non-urgent requests when appropriate.
        </p>
      </div>
    </section>
  );
}
