// src/app/clinicians/page.tsx

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { doctors } from "@/data/doctors";
import { PRACTICE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Our Clinicians | ${PRACTICE_NAME}`,
  description:
    "Meet the primary care clinicians at Dr. Jalli MD PC. Learn more about our physicians and nurse practitioner providing relationship-based primary care in Rockville, MD.",
};

export default function CliniciansIndexPage() {
  // Make sure Dr. Jalli is featured first
  const primary =
    doctors.find((d) => d.slug === "sireesha-jalli") ?? doctors[0];
  const others = doctors.filter((d) => d.slug !== primary.slug);

  return (
    <div className="min-h-screen bg-neutralBg pb-16">
      <main className="mx-auto max-w-6xl px-4 pt-10 md:pt-14">
        {/* Top heading + back link */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Our clinicians
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              The team caring for you
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-700">
              Meet the clinicians at {PRACTICE_NAME}. We provide
              relationship-based primary care with time to listen, explain, and
              partner with you over the long term.
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

        {/* Featured clinician: Dr. Jalli */}
        <section className="mb-10 grid gap-6 rounded-3xl bg-white/85 p-5 shadow-sm md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:p-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Medical Director & Primary Care
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              {primary.name}
            </h2>
            {primary.credentials && (
              <p className="mt-1 text-sm font-medium text-[#D46A4A]">
                {primary.credentials}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-600 md:text-sm">
              {primary.title}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-slate-800 md:text-base">
              {primary.shortBlurb}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 text-xs">
              <Link
                href={`/clinicians/${primary.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-900"
              >
                View full profile
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Request an appointment
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative h-56 w-full overflow-hidden rounded-3xl bg-[#FFE7DA] shadow-sm md:h-64">
              <Image
                src={primary.imageSrc}
                alt={primary.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-[#FFF7F0] p-4 text-[11px] text-slate-700">
              <p className="font-semibold text-slate-900">
                About {primary.name.split(",")[0]}
              </p>
              <p className="mt-2">
                As the lead physician at {PRACTICE_NAME}, {primary.name.split(
                  ","
                )[0]} works closely with patients over time to build trust,
                focus on prevention, and coordinate care when it&apos;s needed
                most.
              </p>
            </div>
          </div>
        </section>

        {/* Other clinicians */}
        {others.length > 0 && (
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">
              Our clinical team
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/clinicians/${doc.slug}`}
                  className="group flex flex-col rounded-3xl border border-[#F3D3C6] bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-[#FFE7DA]">
                    <Image
                      src={doc.imageSrc}
                      alt={doc.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.03]"
                    />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {doc.name}
                  </h2>
                  {doc.credentials && (
                    <p className="mt-0.5 text-[11px] font-medium text-[#D46A4A]">
                      {doc.credentials}
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-slate-600">
                    {doc.title}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-700">
                    {doc.shortBlurb}
                  </p>
                  <span className="mt-3 inline-flex items-center text-[11px] font-semibold text-slate-800">
                    View profile
                    <span className="ml-1 text-xs">↗</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
