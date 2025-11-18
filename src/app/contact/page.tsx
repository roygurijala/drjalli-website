// src/app/contact/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "react-qr-code";
import {
  PRACTICE_NAME,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${PRACTICE_NAME}`,
  description: `Contact ${PRACTICE_NAME} in Rockville, MD for appointments, questions, and primary care information.`,
};

export default function ContactPage() {
  const tel = PRACTICE_PHONE_TEL;
  const mapsLink =
    "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20850";
  const mapsEmbed = mapsLink + "&output=embed";

  return (
    <div className="min-h-screen bg-neutralBg pb-16">
      <main className="mx-auto max-w-6xl px-4 pt-10 md:pt-14">
        {/* Header + back link */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Contact us
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Get in touch with our office
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-700">
              Please call the office for appointments, scheduling changes, and
              medical questions. For emergencies or urgent symptoms, call 911 or
              go to the nearest emergency department.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            <span className="text-base">←</span>
            <span>Back to home</span>
          </Link>
        </div>

        {/* Contact + info cards */}
        <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-3xl bg-white/90 p-5 shadow-sm md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              Phone & office
            </h2>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {PRACTICE_NAME}
            </p>
            <p className="text-sm text-slate-800">
              {PRACTICE_ADDRESS_LINE1}
              <br />
              {PRACTICE_CITY_STATE_ZIP}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
              <a
                href={`tel:${tel}`}
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 font-semibold text-white shadow-sm hover:bg-slate-900"
              >
                Call {PRACTICE_PHONE}
              </a>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Get directions
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-600">
              Established patients may use the secure patient portal for
              non-urgent questions when appropriate. We do not use email or
              social media for medical questions.
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF7F0] p-5 text-xs text-slate-700 shadow-sm md:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              Helpful information
            </h2>
            <ul className="mt-3 space-y-2">
              <li>
                • For{" "}
                <span className="font-semibold">
                  chest pain, trouble breathing, severe symptoms, or emergencies
                </span>
                , call 911 or go to the nearest emergency department.
              </li>
              <li>
                • For medication refills and routine questions, please call the
                office during business hours or use the patient portal if
                available.
              </li>
              <li>
                • Please bring your photo ID, insurance card, and medication
                list to each visit to help us keep your chart up to date.
              </li>
            </ul>
          </div>
        </section>

        {/* Location + Map + QR */}
        <section className="mb-12 rounded-3xl bg-white p-5 shadow-sm md:p-8">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                Location & directions
              </h2>
              <p className="mt-1 max-w-xl text-xs text-slate-700 md:text-sm">
                Use the map below or scan the QR code to open directions on your
                phone. You can also tap &quot;Open in Google Maps&quot; if you
                are already on a mobile device.
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

            {/* QR + extra info */}
            <div className="flex flex-col justify-between gap-4 rounded-3xl bg-[#FFF7F0] p-5 shadow-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  Scan to open maps
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-sm">
                    <QRCode
                      value={mapsLink}
                      size={180}
                      bgColor="#FFFFFF"
                      fgColor="#111827"
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-700 md:text-xs">
                    Open your camera or QR reader app and point it at this code.
                    Your phone should offer to open your maps or navigation app
                    with our address filled in.
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 md:text-xs">
                <p className="font-semibold text-slate-900">
                  Parking & building info
                </p>
                <p className="mt-1">
                  Please follow building signage for parking and elevators to
                  Suite 330. If you have questions about access, call the office
                  and our staff can assist you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
