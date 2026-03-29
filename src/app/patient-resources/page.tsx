import type { Metadata } from "next";
import Link from "next/link";
import { InnerPageHero } from "@/components/InnerPageHero";
import { InsuranceTabs } from "@/components/InsuranceTabs";
import { PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";
import { makePageMeta } from "@/lib/seo";

const PORTAL_URL = "https://30779-1.portal.athenahealth.com/";

export const metadata: Metadata = makePageMeta(
  "Patient Resources",
  "Insurance information, patient portal access, visit preparation, and resources for new and established patients at Dr. Jalli MD PC in Rockville, MD.",
  "/patient-resources"
);

export default function PatientResourcesPage() {
  return (
    <>
      <InnerPageHero
        badge="Patient information"
        title="Patient Resources"
        description="Helpful information for new and returning patients, including insurance details, visit preparation, and portal access."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Patient Resources" },
        ]}
      />

      <div className="bg-neutralBg pb-16 pt-6 md:pt-8">
        {/* Slim help strip — phone */}
        <div className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-3 text-center text-sm text-slate-700 md:justify-between md:text-left">
            <span className="font-medium text-slate-900">Need help?</span>
            <span className="text-slate-600">
              Call{" "}
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="font-semibold text-teal-700 hover:text-teal-600"
              >
                {PRACTICE_PHONE}
              </a>{" "}
              <span className="text-slate-500">Mon–Fri 9–5</span>
            </span>
          </div>
        </div>

        {/* Sticky sub-navigation (desktop) */}
        <div className="sticky top-16 z-30 border-b border-slate-200/80 bg-neutralBg/95 backdrop-blur-md md:top-28">
          <nav
            className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-4 py-2.5 text-[11px] font-medium text-slate-600 md:justify-center md:gap-x-4 md:text-xs"
            aria-label="On this page"
          >
            <a
              href="#patient-menu"
              className="rounded-full px-2 py-1 hover:bg-teal-50 hover:text-teal-800"
            >
              Quick links
            </a>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <a
              href="#portal"
              className="rounded-full px-2 py-1 hover:bg-teal-50 hover:text-teal-800"
            >
              Portal
            </a>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <a
              href="#insurance"
              className="rounded-full px-2 py-1 hover:bg-teal-50 hover:text-teal-800"
            >
              Insurance
            </a>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <a
              href="#visit-checklist"
              className="rounded-full px-2 py-1 hover:bg-teal-50 hover:text-teal-800"
            >
              Visit checklist
            </a>
          </nav>
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-8 md:pt-10">
          {/* Row 1 — Bento: four equal action cards */}
          <section
            id="patient-menu"
            className="scroll-mt-28"
            aria-label="Patient quick links"
          >
            <h2 className="sr-only">Choose a topic</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              <Link
                href="/patient-resources/new-patient"
                className="group flex flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-sm transition hover:border-teal-400/50 hover:shadow-md"
              >
                <span className="text-2xl" aria-hidden>
                  🆕
                </span>
                <span className="mt-3 font-display text-base font-bold text-slate-900">
                  New patients
                </span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                  Scheduling, what to bring, insurance basics, and your first
                  visit.
                </span>
                <span className="mt-4 text-xs font-semibold text-teal-700 group-hover:underline">
                  Open guide →
                </span>
              </Link>

              <div
                id="portal"
                className="scroll-mt-28 flex flex-col rounded-2xl border-2 border-teal-400/50 bg-gradient-to-br from-teal-50 to-white p-5 shadow-md ring-1 ring-teal-400/20"
              >
                <span className="text-2xl" aria-hidden>
                  🔐
                </span>
                <span className="mt-3 font-display text-base font-bold text-slate-900">
                  Established patients
                </span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                  Secure portal for results, refills, and non-urgent messages.
                  Urgent? Call the office.
                </span>
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-400"
                >
                  Open patient portal ↗
                </a>
                <p className="mt-2 text-[10px] leading-snug text-slate-500">
                  You may be redirected to AthenaHealth to sign in.
                </p>
              </div>

              <a
                href="#insurance"
                className="group flex flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-sm transition hover:border-teal-400/50 hover:shadow-md"
              >
                <span className="text-2xl" aria-hidden>
                  💳
                </span>
                <span className="mt-3 font-display text-base font-bold text-slate-900">
                  Insurance plans
                </span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                  Medicare, commercial, and Medicaid plans we often work with —
                  verify your benefits with us before your visit.
                </span>
                <span className="mt-4 text-xs font-semibold text-teal-700 group-hover:underline">
                  View plans below ↓
                </span>
              </a>

              <a
                href="#visit-checklist"
                className="group flex flex-col rounded-2xl border border-teal-200/70 bg-white p-5 shadow-sm transition hover:border-teal-400/50 hover:shadow-md"
              >
                <span className="text-2xl" aria-hidden>
                  📋
                </span>
                <span className="mt-3 font-display text-base font-bold text-slate-900">
                  Visit checklist
                </span>
                <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                  What to bring and how to prepare so your appointment stays on
                  track.
                </span>
                <span className="mt-4 text-xs font-semibold text-teal-700 group-hover:underline">
                  See checklist ↓
                </span>
              </a>
            </div>
          </section>

          {/* Row 2 — Insurance: full width, tabs */}
          <section
            id="insurance"
            className="scroll-mt-28 mt-12 md:mt-14"
            aria-labelledby="insurance-heading"
          >
            <div className="rounded-3xl border border-teal-200/60 bg-gradient-to-br from-white via-teal-50/30 to-slate-50/40 p-6 shadow-sm md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1 text-[12px] font-semibold text-teal-800">
                <span className="text-base" aria-hidden>
                  💳
                </span>
                <span>Insurance accepted</span>
              </div>
              <h2
                id="insurance-heading"
                className="mt-4 font-display text-xl font-bold text-slate-900 md:text-2xl"
              >
                Insurance plans we work with
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-700">
                Coverage varies by plan. Call{" "}
                <a
                  href={`tel:${PRACTICE_PHONE_TEL}`}
                  className="font-semibold text-teal-800 hover:underline"
                >
                  {PRACTICE_PHONE}
                </a>{" "}
                if you don&apos;t see your insurer or need help verifying
                benefits.
              </p>

              <div className="mt-6">
                <InsuranceTabs />
              </div>

              <p className="mt-6 text-xs text-slate-600">
                Don&apos;t see your plan? This list may not be exhaustive — we
                can help verify coverage or discuss self-pay options.
              </p>
            </div>
          </section>

          {/* Row 3 — Visit checklist */}
          <section
            id="visit-checklist"
            className="scroll-mt-28 mt-10 md:mt-12"
            aria-labelledby="checklist-heading"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2
                id="checklist-heading"
                className="font-display text-lg font-bold text-slate-900 md:text-xl"
              >
                What to bring to your visit
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Bringing a few items helps us make the most of your appointment.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Photo ID and insurance card",
                  "List of medications (or bring bottles)",
                  "Recent labs or imaging reports",
                  "Your questions or concerns",
                  "Completed new patient forms (if sent in advance)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 text-sm text-slate-800"
                  >
                    <span className="mt-0.5 text-teal-600" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-slate-500">
                Please arrive 10–15 minutes early, especially for your first
                visit.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
