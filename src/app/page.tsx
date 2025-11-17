// src/app/page.tsx

import QRCode from "react-qr-code";
import { HeroSection } from "@/components/HeroSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { InBodyHighlightSection } from "@/components/InBodyHighlightSection";
import { WaveDivider } from "@/components/WaveDivider";
import {
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
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

function LocationAndMapSection() {
  const mapsLink =
    "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20850";
  const mapsEmbed = mapsLink + "&output=embed";

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Visit our office
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-700">
              We are located in Rockville, Maryland, with convenient access and
              on-site parking. Scan the QR code to open navigation on your
              phone, or tap &quot;Open in Google Maps&quot; below.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-stretch">
          {/* Map */}
          <div className="overflow-hidden rounded-3xl border border-[#F3D3C6] bg-[#FFF7F0] shadow-sm">
            <iframe
              src={mapsEmbed}
              title="Dr. Jalli MD PC location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full md:h-80"
            />
          </div>

          {/* Address + QR */}
          <div className="flex flex-col justify-between gap-4 rounded-3xl bg-[#FFF7F0] p-5 shadow-sm">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Office address
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                Dr. Jalli MD PC
              </p>
              <p className="text-sm text-slate-800">
                {PRACTICE_ADDRESS_LINE1}
                <br />
                {PRACTICE_CITY_STATE_ZIP}
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Please call for appointments or questions. Established patients
                may use the portal when appropriate. For emergencies, call 911.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
                  <QRCode
                    value={mapsLink}
                    size={160}
                    bgColor="#FFFFFF"
                    fgColor="#111827"
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "100%",
                    }}
                  />
                </div>
                <p className="text-center text-[11px] text-slate-600">
                  Scan to open maps
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-2 text-xs">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 font-semibold text-white shadow-sm hover:bg-slate-900"
                >
                  Open in Google Maps
                </a>
                <p className="text-[11px] text-slate-600">
                  Works with most navigation apps on your phone. You may need to
                  confirm opening Maps or your preferred navigation app.
                </p>
              </div>
            </div>
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
            href={`tel:${PRACTICE_PHONE_TEL}, "")}`}
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
    <div className="bg-neutralBg min-h-screen">
      <HeroSection />

      <WaveDivider color="#FFF4EC" />

      <ServicesGrid />

      <WaveDivider color="#FFE7DA" flip />

      <InBodyHighlightSection />

      <WaveDivider color="#FFF2EC" />

      <CareJourneySection />

      <WaveDivider color="#FFFFFF" flip />

      <LocationAndMapSection />

      <ContactCtaStrip />
    </div>
  );
}
