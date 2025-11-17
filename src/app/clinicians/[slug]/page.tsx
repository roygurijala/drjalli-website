// src/app/clinicians/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDoctorBySlug, doctors } from "@/data/doctors";
import { PRACTICE_NAME, PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";

type ClinicianPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return doctors.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: `Clinician not found | ${PRACTICE_NAME}`,
    };
  }

  const baseTitle = `${doctor.name} | ${doctor.title}`;
  const description =
    doctor.shortBlurb ||
    `${doctor.name} provides primary care at ${PRACTICE_NAME} in Rockville, MD.`;

  return {
    title: `${baseTitle} | ${PRACTICE_NAME}`,
    description,
    openGraph: {
      title: `${baseTitle} | ${PRACTICE_NAME}`,
      description,
      type: "profile",
    },
  };
}

export default async function ClinicianPage({ params }: ClinicianPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-neutralBg pb-16">
      <main className="mx-auto max-w-5xl px-4 pt-10 md:pt-14">
        {/* Back + breadcrumb-ish header */}
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <Link
            href="/clinicians"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            <span className="text-base">←</span>
            <span>Back to all clinicians</span>
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Clinician profile
          </p>
        </div>

        <section className="grid gap-8 rounded-3xl bg-white/80 p-5 shadow-sm md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:p-8">
          {/* Text column */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {doctor.name}
            </h1>
            {doctor.credentials && (
              <p className="mt-1 text-sm font-medium text-[#D46A4A]">
                {doctor.credentials}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-600 md:text-sm">
              {doctor.title} · {PRACTICE_NAME}
            </p>

            <div className="mt-4 h-px w-12 bg-[#F3D3C6]" />

            <p className="mt-4 text-sm leading-relaxed text-slate-800 md:text-base">
              {doctor.bio}
            </p>

            <div className="mt-6 grid gap-4 text-xs md:grid-cols-2">
              <div className="rounded-2xl bg-[#FFF7F0] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  Focus areas
                </p>
                <p className="mt-2 text-[11px] text-slate-700">
                  Adult primary care, preventive health, chronic disease
                  management, and relationship-based longitudinal care.
                </p>
              </div>
              <div className="rounded-2xl bg-[#FFE7DA] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                  Approach to care
                </p>
                <p className="mt-2 text-[11px] text-slate-700">
                  Emphasis on listening, shared decision-making, clear
                  explanations, and care plans that fit your day-to-day life.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-900"
              >
                Call {PRACTICE_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Request an appointment
              </Link>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              This page is for general information only and does not replace a
              medical visit or individualized medical advice.
            </p>
          </div>

          {/* Photo + side card */}
          <div className="flex flex-col gap-4">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-[#FFE7DA] shadow-sm md:h-80">
              <Image
                src={doctor.imageSrc}
                alt={doctor.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-white/90 p-4 text-xs text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">
                Care at Dr. Jalli MD PC
              </p>
              <p className="mt-2">
                Our clinicians share a commitment to thoughtful, unhurried,
                relationship-based primary care. We aim to offer clear
                explanations, practical plans, and continuity over time.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
