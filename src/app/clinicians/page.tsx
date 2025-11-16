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
  return (
    <div className="min-h-screen bg-neutralBg pb-16">
      <main className="mx-auto max-w-6xl px-4 pt-10 md:pt-14">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Our clinicians
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              The team caring for you
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-700">
              Our clinicians provide relationship-based primary care with time
              to listen, explain, and partner with you over the long term.
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

        {/* Grid of clinicians */}
        <section className="grid gap-6 md:grid-cols-3">
          {doctors.map((doc) => (
            <Link
              key={doc.slug}
              href={`/clinicians/${doc.slug}`}
              className="group flex flex-col rounded-3xl border border-[#F3D3C6] bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl bg-[#FFE7DA]">
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
              <p className="mt-1 text-[11px] text-slate-600">{doc.title}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-700">
                {doc.shortBlurb}
              </p>
              <span className="mt-3 inline-flex items-center text-[11px] font-semibold text-slate-800">
                View profile
                <span className="ml-1 text-xs">↗</span>
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
