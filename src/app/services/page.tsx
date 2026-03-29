import type { Metadata } from "next";
import { InnerPageHero } from "@/components/InnerPageHero";
import { InsuranceHighlightSection } from "@/components/InsuranceHighlightSection";
import { ServicesGridNew } from "@/components/ServicesGridNew";
import { makePageMeta } from "@/lib/seo";

export const metadata: Metadata = makePageMeta(
  "Services",
  "Comprehensive primary care in Rockville, MD — InBody analysis, ABI testing, allergy testing, nutrition counseling, preventive care, chronic disease management, and more.",
  "/services"
);

export default function ServicesPage() {
  return (
    <>
      <InnerPageHero
        badge="Primary care"
        title="Services"
        description="We provide comprehensive primary care for adults, with a focus on prevention, chronic disease management, and lifestyle support."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <ServicesGridNew />
      <InsuranceHighlightSection />
    </>
  );
}
