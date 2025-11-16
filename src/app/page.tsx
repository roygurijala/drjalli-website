// src/app/page.tsx

import { HeroSection } from "@/components/HeroSection";
import { DoctorsSection } from "@/components/DoctorsSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { InBodyHighlightSection } from "@/components/InBodyHighlightSection";
import { WaveDivider } from "@/components/WaveDivider";
import {
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
} from "@/lib/constants";

function CareJourneySection() {
  const steps = [
    {
      title: "1 · Schedule your visit",
      description:
        "Call the office to schedule a new patient or follow-up appointment. Our staff will help you find a convenient time and explain what to bring.",
    },
    {
      title: "2 · Come prepared",
      description:
        "Bring your medications, photo ID, insurance card, and any recent test results so we can make the best use of your visit together.",
    },
    {
      title: "3 · Partner in your care",
      description:
        "We review your concerns, explain options, and create a plan together. Ongoing follow-up and preventive care help keep you on track.",
    },
  ];

  return (
    <section className="bg-[#FFF2EC] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              How we care for you
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-700">
              We focus on long-term relationships, prevention, and clear
              communication—so you always know what&apos;s next in your care.
            </p>
          </div>
          <div className="text-[11px] text-slate-500 md:text-xs">
            New or established, our goal is that every visit feels unhurried,
            respectful, and centered on you.
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-[#F3D3C6] bg-white/90 p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-xs text-slate-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoStrip() {
  return (
    <section className="bg-white/95">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex flex-col gap-4 rounded-3xl bg-white/90 px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Location
              </p>
              <p className="text-xs text-slate-800">
                {PRACTICE_ADDRESS_LINE1}, {PRACTICE_CITY_STATE_ZIP}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                New Patients
              </p>
              <p className="text-xs text-slate-800">
                Welcoming adult patients for primary care and preventive visits.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#FFE7DA] px-3 py-1 text-[11px] font-semibold text-slate-800">
              Relationship-based primary care.
            </div>
            <a
              href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
              className="text-xs font-semibold text-slate-900 underline-offset-2 hover:underline"
            >
              Call {PRACTICE_PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCtaStrip() {
  return (
    <section className="bg-gradient-to-r from-[#F29B82] to-[#F7C0A7] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Ready to schedule or have questions?
          </h2>
          <p className="mt-2 max-w-xl text-xs text-slate-800 md:text-sm">
            Please call the office for appointments and medical questions.
            Established patients may use the secure patient portal when
            appropriate. For emergencies, call 911.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900"
          >
            Call {PRACTICE_PHONE}
          </a>
          <p className="text-[11px] text-slate-800">
            Phone is the best way to reach us during office hours.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="bg-neutralBg">
      {/* Hero with peach gradient + doctor cards */}
      <HeroSection />

      {/* Soft wave into the info strip */}
      <WaveDivider color="#FFFFFF" />

      {/* Card-like location / new patient info strip */}
      <InfoStrip />

      {/* Wave into clinicians section */}
      <WaveDivider color="#FFF7F0" flip />

      {/* Clinician profiles */}
      <DoctorsSection />

      {/* Wave into services */}
      <WaveDivider color="#FFF4EC" />

      {/* Services grid */}
      <ServicesGrid />

      {/* Wave into InBody highlight */}
      <WaveDivider color="#FFE7DA" flip />

      {/* InBody / lifestyle band */}
      <InBodyHighlightSection />

      {/* Wave into care journey */}
      <WaveDivider color="#FFF2EC" />

      {/* How we care section */}
      <CareJourneySection />

      {/* Final call-to-action strip */}
      <ContactCtaStrip />
    </div>
  );
}
