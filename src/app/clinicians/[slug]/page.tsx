import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import {
  PRACTICE_NAME,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
} from "@/lib/constants";

// Next 15/16: params can be a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoctorBySlug(slug);
  return {
    title: doc ? `${doc.name} · ${PRACTICE_NAME}` : `Clinician not found · ${PRACTICE_NAME}`,
    description: doc
      ? `${doc.name} — ${doc.title} at ${PRACTICE_NAME} in ${PRACTICE_CITY_STATE_ZIP}.`
      : undefined,
  };
}

export default async function ClinicianPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoctorBySlug(slug);
  if (!doc) notFound();

  return (
    <main className="min-h-screen bg-[#FFF7F0]">
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-12">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#F3D3C6] bg-[#FFF4EC]">
              <Image
                src={doc.imageSrc}
                alt={doc.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Clinician profile
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {doc.name}
              </h1>
              <p className="mt-1 text-sm text-slate-700">{doc.title}</p>
              {doc.credentials && (
                <p className="mt-1 text-xs text-slate-600">{doc.credentials}</p>
              )}

              <div className="mt-4 text-sm text-slate-700">
                <p>{doc.bio}</p>
              </div>

              <div className="mt-6 grid gap-2 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900">{PRACTICE_NAME}</span>
                  <br />
                  {PRACTICE_ADDRESS_LINE1}
                  <br />
                  {PRACTICE_CITY_STATE_ZIP}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${PRACTICE_PHONE_TEL}`}
                    className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 font-semibold text-white shadow-sm hover:bg-slate-900"
                  >
                    Call {PRACTICE_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Peer navigation */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Our clinicians
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
              {doctors.map((p) => (
                <a
                  key={p.slug}
                  href={`/clinicians/${p.slug}`}
                  className={`rounded-xl border px-3 py-2 text-sm shadow-sm hover:bg-slate-50 ${
                    p.slug === slug ? "border-[#F29B82] bg-[#FFF7F0]" : "border-slate-200 bg-white"
                  }`}
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
