// src/app/services/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import {
  services,
  getServiceBySlug,
  getServiceIndex,
  type Service,
} from "@/data/services";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.drjalli.com";
const PRACTICE_NAME = "Dr. Jalli MD PC";

/* ---------- Static generation for all service pages ---------- */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* ---------- Per-page SEO (Next 16: await params) ---------- */
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
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

/* ---------- JSON-LD ---------- */
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

/* ---------- Page ---------- */
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
    <div className="bg-[#FFF7F0]">
      <ServiceJsonLd service={service} />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFE7DA] to-[#FFF7F0]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <nav className="text-[12px] text-slate-600">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-slate-900">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{service.title}</span>
          </nav>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {service.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
            {service.blurb}
          </p>

          {service.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#F3D3C6] bg-white px-3 py-1 text-[11px] text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Body */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="prose prose-slate max-w-none prose-p:my-3 prose-li:my-1 md:prose-lg">
            <ReactMarkdown>{service.body}</ReactMarkdown>
          </div>

          {/* Call-to-action */}
          <div className="mt-8 rounded-2xl border border-[#F3D3C6] bg-[#FFF4EC] p-4 md:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Questions or ready to schedule?
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              For appointments and medical questions, please call the office.
              Established patients may use the secure patient portal when appropriate.
              For emergencies, call 911.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="tel:+13016868554"
                className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Call (301) 686-8554
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Contact & Directions
              </Link>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-10 flex items-center justify-between gap-3">
            {prev ? (
              <Link
                href={`/services/${prev.slug}`}
                className="group inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                  Prev
                </span>
                <span className="truncate group-hover:underline">{prev.title}</span>
              </Link>
            ) : <span />}

            {next ? (
              <Link
                href={`/services/${next.slug}`}
                className="group inline-flex max-w-[48%] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              >
                <span className="truncate group-hover:underline">{next.title}</span>
                <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                  Next
                </span>
              </Link>
            ) : <span />}
          </div>
        </div>
      </section>
    </div>
  );
}