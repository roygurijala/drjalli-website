// components/ServicesGridV2.tsx

import { InfoCard, type InfoCardItem } from "@/components/InfoCard";
import { services } from "@/data/services";
import Link from "next/link";

export function ServicesGridNew() {
  return (
    <section className="bg-[#FFF4EC] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              How we can help
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 md:text-base">
              From preventive visits to chronic disease management, we aim to
              provide thoughtful, relationship-based primary care built around
              your goals.
            </p>
          </div>
          <p className="text-[11px] text-slate-500 md:text-xs">
            Services may vary based on your insurance coverage and clinical
            needs. Please call the office with specific questions.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => {
            const item: InfoCardItem = {
              name: service.title,
              description: service.blurb,
              tags: service.tags ?? [],
              icon: service.icon ?? "✨",
            };

            return (
              <InfoCard
                key={service.slug}
                item={item}
                pillLabel="Primary care service"
                href={`/services/${service.slug}`}   // 👈 make cards clickable
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesGridNew;


