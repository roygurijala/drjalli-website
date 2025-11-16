// src/app/clinicians/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoctorBySlug, doctors } from "@/data/doctors";
import { PRACTICE_PHONE } from "@/lib/constants";

type ClinicianPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return doctors.map((doc) => ({ slug: doc.slug }));
}

export default async function ClinicianPage({ params }: ClinicianPageProps) {
  // 👇 unwrap the Promise so we can safely read slug
  const { slug } = await params;

  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-neutralBg pb-16">
      <main className="mx-auto max-w-5xl px-4 pt-10 md:pt-14">
        {/* Back link */}
        <div className="mb-4 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            <span className="text-base">←</span>
            <span>Back to home</span>
          </Link>
        </div>

        <section className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          {/* Text column */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Clinician
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {doctor.name}
            </h1>
            {doctor.credentials && (
              <p className="mt-1 text-sm font-medium text-[#D46A4A]">
                {doctor.credentials}
              </p>
            )}
            <p className="mt-1 text-xs text-slate-600 md:text-sm">
              {doctor.title}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-slate-800 md:text-base">
              {doctor.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <a
                href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
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

          {/* Photo column */}
          <div className="flex flex-col items-start gap-4">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-[#FFE7DA] shadow-sm md:h-80">
              <Image
                src={doctor.imageSrc}
                alt={doctor.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-white/90 p-4 text-xs text-slate-700 shadow-sm">
              <p className="font-semibold text-slate-900">Care philosophy</p>
              <p className="mt-2">
                Each clinician at Dr. Jalli MD PC aims to provide thoughtful,
                relationship-based primary care with time to listen, explain,
                and partner with you over the long term.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
