// src/app/services/page.tsx
import Link from "next/link";
import { services } from "@/data/services";

export const metadata = {
  title: "Services · Dr. Jalli MD PC",
  description:
    "Primary care services in Rockville, MD — preventive care, chronic disease management, InBody body composition, women’s health, telehealth and more.",
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-[#FFF7F0]">
      <section className="bg-gradient-to-b from-[#FFE7DA] to-[#FFF7F0]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Our Services
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
            Thoughtful, evidence-based primary care for adults with a focus on
            prevention, clear communication, and long-term health.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl grid gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3 md:py-12">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-[#F3D3C6] bg-white p-4 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex items-center gap-2">
                {s.icon ? (
                  <span className="text-xl" aria-hidden>
                    {s.icon}
                  </span>
                ) : null}
                <h2 className="text-base font-semibold text-slate-900 group-hover:underline">
                  {s.title}
                </h2>
              </div>
              <p className="mt-2 text-sm text-slate-700">{s.blurb}</p>
              {s.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
