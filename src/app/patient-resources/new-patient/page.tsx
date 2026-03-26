// src/app/patient-resources/new-patient/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
} from "@/lib/constants";
import {
  generateFAQJsonLd,
  generateBreadcrumbJsonLd,
  makePageMeta,
} from "@/lib/seo";

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = makePageMeta(
  "New Patient Guide",
  "Everything you need to know before your first visit at Dr. Jalli MD PC in Rockville, MD — how to schedule, what to bring, insurance information, and what to expect.",
  "/patient-resources/new-patient"
);

// ─── FAQ data for this page ──────────────────────────────────────────────────
const pageFAQs = [
  {
    question: "How do I schedule my first appointment?",
    answer:
      "Call our office at 301-686-8554 during business hours (Monday–Friday, 9:00 AM–5:00 PM). Our staff will walk you through the process, verify your insurance, and schedule a time that works for you.",
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "Please bring a valid photo ID, your current insurance card, a list of all medications you are taking (or the bottles themselves), any recent lab work or imaging results, and a list of questions or concerns you want to discuss.",
  },
  {
    question: "Does Dr. Jalli accept my insurance?",
    answer:
      "We accept Medicare, Medicaid, CareFirst (BCBS), Aetna, Cigna, UnitedHealthcare, UMR, GEHA, Priority Partners, Johns Hopkins Health Plans, and more. Please call us to verify your specific plan before your visit.",
  },
  {
    question: "How early should I arrive for my first appointment?",
    answer:
      "Please plan to arrive 10–15 minutes early to allow time to complete any remaining paperwork and check in with the front desk.",
  },
  {
    question: "Will I meet Dr. Jalli at my first appointment?",
    answer:
      "We have three clinicians — Dr. Sireesha Jalli, Dr. Mythily Vancha, and Ntoge Penda, NP. When you call to schedule, our staff can help match you with the right provider based on your needs and availability.",
  },
  {
    question: "How do I access the patient portal as a new patient?",
    answer:
      "After your first visit, you will receive an invitation by email to register with the AthenaHealth patient portal. If you do not receive this, please call or ask our front desk staff.",
  },
];

// ─── Steps ───────────────────────────────────────────────────────────────────
const steps = [
  {
    n: "1",
    icon: "📞",
    title: "Call to Schedule",
    body: "Call our office at 301-686-8554 Monday–Friday, 9 AM–5 PM. Tell us you are a new patient. We will verify your insurance and find a convenient time — often same-week or next-week.",
    detail: "For emergencies, call 911. For urgent care needs after hours, visit your nearest urgent care center.",
  },
  {
    n: "2",
    icon: "💳",
    title: "Verify Your Insurance",
    body: "We accept most major insurance plans including Medicare, Medicaid, CareFirst, Aetna, Cigna, and UnitedHealthcare. Our staff will confirm your coverage when you call.",
    detail: "If you are unsure about your coverage, call your insurance company directly using the number on the back of your card.",
  },
  {
    n: "3",
    icon: "📝",
    title: "Complete Your Paperwork",
    body: "We may send you new patient forms before your visit. Completing them ahead of time allows your appointment to start on schedule and your clinician to review your history.",
    detail: "If you did not receive forms before your visit, arrive 15 minutes early to complete them at the office.",
  },
  {
    n: "4",
    icon: "🏥",
    title: "Attend Your First Visit",
    body: "Your clinician will review your health history, discuss your concerns, perform any indicated exams, and work with you to create a personalized care plan.",
    detail: "First visits typically last 45–60 minutes. Please allow enough time in your schedule.",
  },
  {
    n: "5",
    icon: "🖥️",
    title: "Access the Patient Portal",
    body: "After your visit, you will receive an invitation to register with the AthenaHealth patient portal to view results, request refills, and message your care team.",
    detail: "Portal access is for non-urgent communication only. For urgent needs, always call the office.",
  },
];

// ─── What to Bring ────────────────────────────────────────────────────────────
const bringItems = [
  { icon: "🪪", item: "Valid government-issued photo ID (driver's license or passport)" },
  { icon: "💳", item: "Current insurance card (all plans, including secondary)" },
  { icon: "💊", item: "Complete list of current medications — or bring the bottles" },
  { icon: "📊", item: "Recent lab results, imaging reports, or specialist notes if available" },
  { icon: "📋", item: "List of your health questions, symptoms, or concerns" },
  { icon: "🧾", item: "New patient forms (completed if sent ahead of time)" },
  { icon: "📱", item: "Emergency contact name and phone number" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NewPatientPage() {
  const faqSchema = generateFAQJsonLd(pageFAQs);
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://www.drjalli.com" },
    { name: "Patient Resources", url: "https://www.drjalli.com/patient-resources" },
    { name: "New Patient Guide", url: "https://www.drjalli.com/patient-resources/new-patient" },
  ]);

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-900 px-4 py-12 text-white md:py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-teal-300">Home</Link>
            <span>›</span>
            <Link href="/patient-resources" className="hover:text-teal-300">Patient Resources</Link>
            <span>›</span>
            <span className="text-teal-300">New Patient</span>
          </nav>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-xs font-semibold text-teal-300">
            ✅ Currently Accepting New Patients
          </div>
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
            New Patient Guide
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            Welcome to Dr. Jalli MD PC. This guide covers everything you need
            to know before your first visit — scheduling, insurance, what to
            bring, and what to expect.
          </p>
          <a
            href={`tel:${PRACTICE_PHONE_TEL}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
          >
            📞 Call to Schedule: {PRACTICE_PHONE}
          </a>
        </div>
      </section>

      {/* ─── Main content ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">

        {/* 5 Steps */}
        <section aria-label="Steps for new patients">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Your first 5 steps
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Getting started with a new primary care practice is easy. Here is
            what to expect.
          </p>

          <ol className="mt-7 space-y-5" aria-label="Steps to become a new patient">
            {steps.map((step) => (
              <li
                key={step.n}
                className="flex gap-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:p-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-teal-400">
                      STEP {step.n}
                    </span>
                  </div>
                  <h3 className="font-display mt-1 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    {step.body}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* What to Bring + Location (two col) */}
        <div className="mt-12 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">

          {/* What to Bring */}
          <section
            className="rounded-3xl border border-teal-200/60 bg-teal-50/40 p-6 md:p-7"
            aria-label="What to bring to your appointment"
          >
            <h2 className="font-display text-lg font-bold text-slate-900">
              What to bring
            </h2>
            <p className="mt-2 text-xs text-slate-600">
              Having these items ready ensures your appointment stays on schedule.
            </p>
            <ul className="mt-5 space-y-3" aria-label="Checklist of items to bring">
              {bringItems.map((b) => (
                <li key={b.item} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg" aria-hidden>{b.icon}</span>
                  <span className="text-xs leading-relaxed text-slate-700">{b.item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              <strong>Tip:</strong> Arrive 10–15 minutes early for your first visit to complete any remaining check-in steps.
            </div>
          </section>

          {/* Office info + quick links */}
          <div className="flex flex-col gap-5">
            {/* Office info card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-sm font-bold text-slate-900">
                Office Information
              </h3>
              <div className="mt-3 space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-teal-500">📍</span>
                  <div>
                    <p className="font-medium">{PRACTICE_ADDRESS_LINE1}</p>
                    <p className="text-slate-500">{PRACTICE_CITY_STATE_ZIP}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-teal-500">📞</span>
                  <a href={`tel:${PRACTICE_PHONE_TEL}`} className="font-medium hover:text-teal-600">
                    {PRACTICE_PHONE}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-teal-500">🕒</span>
                  <p>Mon–Fri: 9:00 AM – 5:00 PM<br />Sat–Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-sm font-bold text-slate-900 mb-3">
                Quick links
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${PRACTICE_PHONE_TEL}`}
                  className="flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-400"
                >
                  📞 Call to Schedule
                </a>
                <Link
                  href="/patient-resources"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  💳 Insurance Accepted →
                </Link>
                <Link
                  href="/clinicians"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  👩‍⚕️ Meet Our Clinicians →
                </Link>
                <Link
                  href="/services"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  🩺 View All Services →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-14" aria-label="New patient FAQ">
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-3">
            {pageFAQs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm open:border-teal-200 open:bg-teal-50/30"
              >
                <summary className="cursor-pointer list-none font-display text-sm font-semibold text-slate-900 marker:hidden group-open:text-teal-700">
                  {faq.question}
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="mt-14 rounded-3xl bg-navy-900 p-7 text-center text-white md:p-10"
          aria-label="Schedule your appointment"
        >
          <h2 className="font-display text-xl font-bold md:text-2xl">
            Ready to schedule your first visit?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
            We are accepting new patients and would love to be your primary care
            home. Call us to get started — our staff will walk you through
            everything.
          </p>
          <a
            href={`tel:${PRACTICE_PHONE_TEL}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
          >
            📞 Call {PRACTICE_PHONE}
          </a>
          <p className="mt-3 text-xs text-slate-500">
            Monday – Friday, 9:00 AM – 5:00 PM
          </p>
        </section>
      </div>
    </>
  );
}
