// src/app/page.tsx
import type { Metadata } from "next";
import BrandedQRCode from "@/components/BrandedQRCode";
import ServicesCarousel from "@/components/ServicesCarousel";
import { HeroSection } from "@/components/HeroSection";
import { InBodyHighlightSection } from "@/components/InBodyHighlightSection";
import {
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  MAPS_DIRECTIONS_URL,
} from "@/lib/constants";
import { generateFAQJsonLd, newPatientFAQs } from "@/lib/seo";
import Link from "next/link";

// ─── Page-level metadata ─────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Dr. Jalli MD PC | Primary Care in Rockville, MD",
  description:
    "Compassionate board-certified primary care in Rockville, Maryland. Accepting new patients. InBody body composition, preventive care, chronic disease management, and telehealth available.",
  alternates: { canonical: "https://www.drjalli.com" },
};

// ─── Trust Bar ───────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: "🏥", label: "Board-Certified Physicians" },
    { icon: "🔬", label: "InBody Technology In-Office" },
    { icon: "💳", label: "Medicare & Medicaid Accepted" },
    { icon: "🖥️", label: "AthenaHealth Patient Portal" },
    { icon: "📅", label: "Same-Week Appointments" },
    { icon: "🌐", label: "Telehealth Available" },
  ];

  return (
    <section className="border-b border-slate-200/60 bg-white py-4" aria-label="Trust signals">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-between">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="text-base" aria-hidden>{item.icon}</span>
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Patient Actions Section ─────────────────────────────────────────────────
function PatientActionsSection() {
  const PORTAL_URL = "https://30779-1.portal.athenahealth.com/";

  return (
    <section className="bg-neutralBg py-14 md:py-18" aria-label="Patient quick actions">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          What can we help you with today?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">
          Whether you are a new patient or a longtime member of our practice,
          here is how to get started.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* New Patient Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-7 shadow-sm transition hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-teal-100/60" aria-hidden />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-xl text-white shadow-md shadow-teal-500/30">
                🆕
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                New Patient
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Ready to join our practice? We are accepting new patients and
                would be happy to help you get started. Learn what to bring and
                what to expect at your first visit.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                {[
                  "Call to schedule same-week or next-week appointments",
                  "Bring photo ID, insurance card & medication list",
                  "Complete new patient forms prior to your visit",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-teal-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${PRACTICE_PHONE_TEL}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-teal-500/20 transition hover:bg-teal-400"
                >
                  Call to Schedule
                </a>
                <Link
                  href="/patient-resources/new-patient"
                  className="inline-flex items-center gap-1.5 rounded-full border border-teal-300 px-5 py-2.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  New Patient Guide →
                </Link>
              </div>
            </div>
          </div>

          {/* Existing Patient Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 shadow-sm transition hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-slate-100/60" aria-hidden />
            <div className="relative">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-xl text-white shadow-md">
                👤
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                Established Patient
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Access your AthenaHealth patient portal to view results, request
                refills, and send non-urgent messages to your care team — anytime.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                {[
                  "View lab results and visit summaries securely",
                  "Request prescription refills online",
                  "Send non-urgent messages to your care team",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-slate-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-navy-800"
                >
                  Open Patient Portal ↗
                </a>
                <a
                  href={`tel:${PRACTICE_PHONE_TEL}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Call the Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Care Journey Section ─────────────────────────────────────────────────────
function CareJourneySection() {
  const steps = [
    {
      n: "1",
      title: "Schedule your visit",
      body: "Call our office to schedule a new or follow-up appointment. Our staff will find a convenient time and tell you exactly what to bring.",
      icon: "📅",
    },
    {
      n: "2",
      title: "Come prepared",
      body: "Bring your medications, photo ID, insurance card, and any recent test results so we can make the most of your time together.",
      icon: "📋",
    },
    {
      n: "3",
      title: "Partner in your care",
      body: "We review your concerns, explain your options, and build a plan together. Ongoing follow-up and preventive care keep you on track.",
      icon: "🤝",
    },
  ];

  return (
    <section className="bg-white py-14 md:py-18" aria-label="How we care for you">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            How we care for you
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            We focus on long-term relationships, prevention, and clear
            communication — so you always know what is next in your care.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-xl">
                  {step.icon}
                </div>
                <span className="font-display text-2xl font-bold text-teal-400/50">
                  {step.n}
                </span>
              </div>
              <h3 className="font-display text-sm font-semibold text-slate-900 md:text-base">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────────
function LocationAndMapSection() {
  const mapsLink =
    "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20854";
  const mapsEmbed = mapsLink + "&output=embed";

  return (
    <section className="bg-neutralBg py-14 md:py-18" aria-label="Office location">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Visit our office
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
            Conveniently located in Rockville, Maryland with on-site parking.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-stretch">
          {/* Map */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <iframe
              src={mapsEmbed}
              title="Dr. Jalli MD PC office location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full md:h-80"
            />
          </div>

          {/* Address + QR */}
          <div className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-600">
                Office Address
              </p>
              <p className="mt-2 font-display text-sm font-bold text-slate-900">
                Dr. Jalli MD PC
              </p>
              <p className="text-sm text-slate-700">
                {PRACTICE_ADDRESS_LINE1}
                <br />
                {PRACTICE_CITY_STATE_ZIP}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-slate-700">
                {PRACTICE_PHONE}
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Mon–Fri: 9:00 AM – 5:00 PM · Sat–Sun: Closed
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Please arrive 10–15 minutes early for your first visit.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
                  <a
                    href={MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Scan to open Google Maps directions"
                    aria-label="Scan QR code for Google Maps directions to Dr. Jalli MD PC"
                  >
                    <BrandedQRCode value={MAPS_DIRECTIONS_URL} size={120} />
                  </a>
                </div>
                <p className="text-center text-[10px] text-slate-500">
                  Scan for directions
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-navy-800"
                >
                  Open in Google Maps
                </a>
                <a
                  href={`tel:${PRACTICE_PHONE_TEL}`}
                  className="inline-flex items-center justify-center rounded-full border border-teal-300 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-100"
                >
                  Call {PRACTICE_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────
function ContactCtaStrip() {
  return (
    <section
      className="relative overflow-hidden bg-navy-900 px-4 py-12"
      aria-label="Contact call to action"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white md:text-2xl">
            Ready to schedule or have questions?
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 md:text-sm">
            Call the office for appointments and medical questions. Established
            patients may use the secure portal for non-urgent needs. For
            emergencies, call 911.
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-2 md:items-end">
          <a
            href={`tel:${PRACTICE_PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
          >
            Call {PRACTICE_PHONE}
          </a>
          <p className="text-[11px] text-slate-400">
            Phone is the best way to reach us during office hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = newPatientFAQs.slice(0, 5);

  return (
    <section className="bg-white py-14 md:py-18" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">
          Quick answers to the questions we hear most often.
        </p>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4 open:border-teal-200 open:bg-teal-50/40"
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
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const faqSchema = generateFAQJsonLd(newPatientFAQs);

  return (
    <>
      {/* FAQ structured data for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection />
      <TrustBar />
      <PatientActionsSection />
      <ServicesCarousel heading="Services we provide" />
      <InBodyHighlightSection />
      <CareJourneySection />
      <FAQSection />
      <LocationAndMapSection />
      <ContactCtaStrip />
    </>
  );
}
