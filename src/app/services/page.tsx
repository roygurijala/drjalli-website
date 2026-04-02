import type { Metadata } from "next";
import { InnerPageHero } from "@/components/InnerPageHero";
import { InsuranceHighlightSection } from "@/components/InsuranceHighlightSection";
import { ServicesGridNew } from "@/components/ServicesGridNew";
import { makePageMeta } from "@/lib/seo";

export const metadata: Metadata = makePageMeta(
  "Services",
  "Comprehensive primary care in Rockville, MD — InBody analysis, at-home sleep studies for qualified patients, ABI testing, allergy testing, nutrition counseling, preventive care, chronic disease management, and more.",
  "/services"
);

export default function ServicesPage() {
  return (
    <>
      <InnerPageHero
        badge="Primary care"
        title="Services"
        description="We provide comprehensive primary care for adults, with a focus on prevention, chronic disease management, and lifestyle support. We also offer ABI testing, allergy testing, and nutrition counseling in-office when clinically appropriate — ask your clinician what fits your care plan."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <ServicesGridNew />
      <InsuranceHighlightSection />
    </>
  );
}
