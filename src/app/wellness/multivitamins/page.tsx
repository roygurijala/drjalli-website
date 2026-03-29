import type { Metadata } from "next";
import Link from "next/link";
import { MultivitaminsSection } from "@/components/wellness/MultivitaminsSection";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PRACTICE_DOMAIN } from "@/lib/constants";
import { makePageMeta } from "@/lib/seo";

const PATH = "/wellness/multivitamins";

export const metadata: Metadata = makePageMeta(
  "Multivitamins & wellness products",
  "Order quality multivitamins through our practice’s secure online wellness store. Guidance from your Dr. Jalli MD PC care team in Rockville, MD.",
  PATH
);

export default function MultivitaminsPage() {
  const canonical = `${PRACTICE_DOMAIN}${PATH}`;
  return (
    <>
      <InnerPageHero
        badge="Wellness"
        title="Multivitamins & nutritional support"
        description="Convenient ordering through our practice wellness storefront—with your clinician’s guidance when you need it."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Multivitamins" },
        ]}
      />

      <MultivitaminsSection variant="page" />

      <section className="border-t border-slate-200 bg-neutralBg py-12 md:py-14" aria-labelledby="mv-faq-heading">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="mv-faq-heading" className="font-display text-xl font-bold text-slate-900 md:text-2xl">
            Common questions
          </h2>
          <dl className="mt-6 space-y-6 text-sm text-slate-700">
            <div>
              <dt className="font-semibold text-slate-900">Do I need a prescription?</dt>
              <dd className="mt-1.5 leading-relaxed">
                Multivitamins are typically available as dietary supplements. Your clinician can
                still help you pick a formula that fits your health picture and avoids interactions
                with medications.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">How do I get access to the online store?</dt>
              <dd className="mt-1.5 leading-relaxed">
                Tap &quot;Shop our wellness store&quot; on this page to open our storefront in a new
                tab. If you need help signing in or choosing a product,{" "}
                <Link href="/contact" className="font-medium text-teal-700 hover:underline">
                  contact us
                </Link>{" "}
                or call the office—we can walk you through it.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Can supplements replace a healthy diet?</dt>
              <dd className="mt-1.5 leading-relaxed">
                No. They complement—not replace—balanced meals. We emphasize food-first care and use
                supplements when they add clear value for you.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "Multivitamins & wellness products",
            url: canonical,
            description:
              "Quality multivitamins available through Dr. Jalli MD PC’s wellness storefront in Rockville, Maryland.",
            isPartOf: { "@type": "WebSite", name: "Dr. Jalli MD PC", url: PRACTICE_DOMAIN },
          }),
        }}
      />
    </>
  );
}
