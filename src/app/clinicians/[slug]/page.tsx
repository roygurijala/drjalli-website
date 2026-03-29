// src/app/clinicians/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageHero } from "@/components/InnerPageHero";
import { doctors, getDoctorBySlug } from "@/data/doctors";
import {
  PRACTICE_NAME,
  PRACTICE_DOMAIN,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  DEFAULT_OG_IMAGE,
} from "@/lib/constants";
import { generateClinicianProfileJsonLd } from "@/lib/seo";

function buildBookingHref(doc: {
  bookingHref?: string;
  providerId?: string;
  departmentId?: string;
}) {
  if (doc.bookingHref) return doc.bookingHref;
  const params = new URLSearchParams();
  if (doc.providerId) params.set("providerId", doc.providerId);
  if (doc.departmentId) params.set("departmentId", doc.departmentId);
  return `/appointments${params.toString() ? `?${params.toString()}` : ""}`;
}

function ScheduleButton({
  href,
  small,
  className,
}: {
  href: string;
  small?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-full bg-teal-500 text-white shadow-md shadow-teal-500/20",
        small ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-sm",
        "font-semibold hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2",
        className ?? "",
      ].join(" ")}
    >
      Schedule appointment
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoctorBySlug(slug);
  if (!doc) {
    return { title: `Clinician not found · ${PRACTICE_NAME}` };
  }
  const pageUrl = `${PRACTICE_DOMAIN}/clinicians/${slug}`;
  const desc = `${doc.name} — ${doc.title} at ${PRACTICE_NAME} in ${PRACTICE_CITY_STATE_ZIP}. ${doc.shortBlurb}`;
  const ogImage = doc.imageSrc.endsWith(".svg") ? DEFAULT_OG_IMAGE : doc.imageSrc;
  return {
    title: `${doc.name} · ${PRACTICE_NAME}`,
    description: desc,
    openGraph: {
      title: `${doc.name} · ${PRACTICE_NAME}`,
      description: desc,
      url: pageUrl,
      siteName: PRACTICE_NAME,
      locale: "en_US",
      type: "profile",
      images: [{ url: ogImage, width: 800, height: 1000, alt: doc.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.name} · ${PRACTICE_NAME}`,
      description: desc,
      images: [ogImage],
    },
    alternates: { canonical: pageUrl },
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

  const bookingHref = buildBookingHref(doc);

  const paragraphs: string[] = Array.isArray(doc.bio)
    ? doc.bio
    : String(doc.bio)
        .replace(/\r\n/g, "\n")
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

  const shortName = doc.name.split(",")[0].trim();

  const profileDescription =
    typeof doc.bio === "string"
      ? doc.bio
      : doc.bio.length
        ? doc.bio[0]
        : doc.shortBlurb;

  const clinicianSchema = generateClinicianProfileJsonLd({
    name: doc.name,
    title: doc.title,
    description: `${doc.shortBlurb} ${profileDescription}`.slice(0, 1200),
    imagePath: doc.imageSrc,
    pageUrl: `${PRACTICE_DOMAIN}/clinicians/${doc.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicianSchema) }}
      />
      <InnerPageHero
        badge="Clinician profile"
        title={doc.name}
        description={[doc.title, doc.credentials].filter(Boolean).join(" · ")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Clinicians", href: "/clinicians" },
          { label: shortName },
        ]}
      />
      <main className="min-h-screen bg-neutralBg pb-16">
        <section className="mx-auto max-w-5xl px-4 py-8 md:py-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-start">
              <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-3xl bg-teal-50">
                <Image
                  src={doc.imageSrc}
                  alt={doc.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute bottom-2 right-2">
                  <div className="pointer-events-auto">
                    <ScheduleButton href={bookingHref} small />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-lg font-bold text-slate-900 md:text-xl">
                  About {shortName}
                </h2>
                <p className="mt-1 text-sm text-slate-700">{doc.title}</p>
                {doc.credentials && (
                  <p className="mt-1 text-xs text-slate-600">{doc.credentials}</p>
                )}

                <div className="mt-4 text-sm text-slate-700">
                  {paragraphs.map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-3" : undefined}>
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-6 grid gap-2 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">
                      {PRACTICE_NAME}
                    </span>
                    <br />
                    {PRACTICE_ADDRESS_LINE1}
                    <br />
                    {PRACTICE_CITY_STATE_ZIP}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${PRACTICE_PHONE_TEL}`}
                      className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-teal-500/20 hover:bg-teal-400"
                    >
                      Call {PRACTICE_PHONE}
                    </a>
                    <ScheduleButton href={bookingHref} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Our clinicians
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {doctors.map((p) => (
                  <a
                    key={p.slug}
                    href={`/clinicians/${p.slug}`}
                    className={`rounded-xl border px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 ${
                      p.slug === slug
                        ? "border-teal-400 bg-teal-50 text-teal-900"
                        : "border-slate-200 bg-white"
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
    </>
  );
}
