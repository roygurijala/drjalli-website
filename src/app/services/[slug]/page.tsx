// src/app/services/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { InnerPageHero } from "@/components/InnerPageHero";
import {
  services,
  getServiceBySlug,
  getServiceIndex,
  type Service,
} from "@/data/services";
import {
  DEFAULT_OG_IMAGE,
  PRACTICE_DOMAIN,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? PRACTICE_DOMAIN;
const PRACTICE_NAME = "Dr. Jalli MD PC";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) {
    return {
      title: `Service not found · ${PRACTICE_NAME}`,
      description: "This service is not available.",
    };
  }

  const title = `${svc.title} · ${PRACTICE_NAME}`;
  const description = svc.blurb;
  const url = `${SITE_URL}/services/${svc.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: PRACTICE_NAME,
      locale: "en_US",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${svc.title} — ${PRACTICE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function ServiceJsonLd({ service }: { service: Service }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `${service.title} · ${PRACTICE_NAME}`,
    url: `${SITE_URL}/services/${service.slug}`,
    description: service.blurb,
    medicalSpecialty: "PrimaryCare",
    areaServed: { "@type": "Place", name: "Rockville, Maryland" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const i = getServiceIndex(slug);
  const prev = i > 0 ? services[i - 1] : undefined;
  const next = i < services.length - 1 ? services[i + 1] : undefined;

  return (
    <>
      <ServiceJsonLd service={service} />
      <InnerPageHero
        badge="Primary care"
        title={service.title}
        description={service.blurb}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          {service.tags?.length ? (
            <div className="mb-6 flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[11px] font-medium text-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          <div className="prose prose-slate max-w-none prose-p:my-3 prose-li:my-1 md:prose-lg">
            <ReactMarkdown>{service.body}</ReactMarkdown>
          </div>

          <div className="mt-8 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/80 to-white p-4 md:p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Questions or ready to schedule?
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              For appointments and medical questions, please call the office.
              Established patients may use the secure patient portal when
              appropriate. For emergencies, call 911.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-teal-500/20 hover:bg-teal-400"
              >
                Call {PRACTICE_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Contact & Directions
              </Link>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-3">
            {prev ? (
              <Link
                href={`/services/${prev.slug}`}
                className="group inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-teal-200 hover:bg-teal-50/50"
              >
                <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                  Prev
                </span>
                <span className="truncate group-hover:underline">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/services/${next.slug}`}
                className="group inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-teal-200 hover:bg-teal-50/50"
              >
                <span className="truncate group-hover:underline">{next.title}</span>
                <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                  Next
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
