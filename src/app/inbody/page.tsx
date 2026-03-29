import type { Metadata } from "next";
import Link from "next/link";

import { InnerPageHero } from "@/components/InnerPageHero";
import {
  InBodyBookingCtaSection,
  InBodyFaqSection,
  InBodyMeasuresSection,
  InBodyTwoTierSection,
  InBodyVisitFlowSection,
  InBodyWhoSection,
} from "@/components/inbody/InBodyLandingSections";
import {
  DEFAULT_OG_IMAGE,
  PRACTICE_DOMAIN,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";
import {
  generateBreadcrumbJsonLd,
  generateFAQJsonLd,
  inbodyPageFaqs,
} from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? PRACTICE_DOMAIN;
const PRACTICE_NAME = "Dr. Jalli MD PC";

const DESC =
  "Full guide to InBody at Dr. Jalli MD PC in Rockville, MD: what we measure, who it’s for, how your visit works (scan → staff review → optional clinician visit), and FAQs. Call to schedule.";

export const metadata: Metadata = {
  title: `InBody Body Composition Analysis | Rockville, MD | ${PRACTICE_NAME}`,
  description: DESC,
  keywords: [
    "InBody Rockville MD",
    "body composition analysis Rockville",
    "InBody test Maryland",
    "metabolic health screening Rockville",
    "InBody fasting",
    "InBody how long",
  ],
  alternates: { canonical: `${SITE_URL}/inbody` },
  openGraph: {
    title: `InBody Body Composition | ${PRACTICE_NAME}`,
    description: DESC,
    url: `${SITE_URL}/inbody`,
    type: "website",
    siteName: PRACTICE_NAME,
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `InBody body composition — ${PRACTICE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `InBody Body Composition | ${PRACTICE_NAME}`,
    description: DESC,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function InBodyLandingPage() {
  const faqSchema = generateFAQJsonLd(inbodyPageFaqs);
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: "InBody", url: `${SITE_URL}/inbody` },
  ]);

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "InBody Body Composition Analysis",
    description: DESC,
    url: `${SITE_URL}/inbody`,
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: PRACTICE_NAME },
    provider: {
      "@type": "MedicalBusiness",
      name: PRACTICE_NAME,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rockville",
        addressRegion: "MD",
        postalCode: "20850",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <InnerPageHero
        badge="In-office testing"
        title="InBody Body Composition Analysis"
        description="Objective insight into muscle, fat, and water balance—beyond the scale—to support metabolic health, weight management, and lifestyle goals. Your clinician interprets every scan in context."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "InBody" },
        ]}
      />

      <InBodyMeasuresSection />
      <InBodyWhoSection />
      <InBodyVisitFlowSection />
      <InBodyTwoTierSection />
      <InBodyFaqSection />
      <InBodyBookingCtaSection />

      <section
        className="border-t border-slate-200 bg-white py-10"
        aria-label="Related links"
      >
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Services catalog
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            InBody is also listed as{" "}
            <Link
              href="/services/inbody"
              className="font-semibold text-teal-700 underline-offset-2 hover:underline"
            >
              InBody body composition
            </Link>{" "}
            in our full{" "}
            <Link
              href="/services"
              className="font-semibold text-teal-700 underline-offset-2 hover:underline"
            >
              services directory
            </Link>
            . Questions? Call{" "}
            <a
              href={`tel:${PRACTICE_PHONE_TEL}`}
              className="font-semibold text-teal-700"
            >
              {PRACTICE_PHONE}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
