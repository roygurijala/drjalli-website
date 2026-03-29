// src/app/about/page.tsx
import type { Metadata } from "next";
import { DoctorsSection } from "@/components/DoctorsSection";
import { InnerPageHero } from "@/components/InnerPageHero";
import { makePageMeta } from "@/lib/seo";

export const metadata: Metadata = makePageMeta(
  "About Our Practice",
  "Learn about Dr. Jalli MD PC — relationship-based primary care in Rockville, MD focused on prevention, continuity, and clear communication.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <InnerPageHero
        badge="Our practice"
        title="About Our Practice"
        description="At Dr. Jalli MD PC, we believe that high-quality primary care is built on long-term relationships, careful listening, and clear communication. Our goal is to help you understand your health, prevent problems where possible, and manage ongoing conditions with evidence-based care."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <div className="bg-neutralBg">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
          <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
            We care for adults in Rockville and the surrounding community,
            providing comprehensive primary care with a focus on prevention,
            continuity, and respect for each patient&apos;s preferences and goals.
          </p>
        </div>
        <DoctorsSection />
      </div>
    </>
  );
}
