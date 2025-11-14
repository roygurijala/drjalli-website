import Link from "next/link";
import { PRACTICE_PHONE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-brand-light to-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:py-16">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark mb-2">
            Primary Care · Rockville, MD
          </p>

          {/* 🔹 Main standout title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl md:leading-tight">
            We Care for You.{" "}
            <span className="text-brand-dark">Always.</span>
          </h1>

          {/* 🔹 Subtitle under the title */}
          <p className="mt-4 text-sm md:text-base text-slate-700 max-w-xl">
            Primary care with heart, expertise, and a personal touch — serving
            individuals and families in Rockville, Maryland.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-dark"
            >
              Call {PRACTICE_PHONE}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-brand px-5 py-2.5 text-sm font-semibold text-brand hover:bg-white"
            >
              New patient info
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            Established patients: please use the patient portal for secure
            messages and medical questions.
          </p>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Same-day and next-day appointments
            </h2>
            <ul className="mt-3 space-y-1 text-xs text-slate-700">
              <li>• Comprehensive primary care for adults</li>
              <li>• Preventive visits and chronic disease management</li>
              <li>• Lifestyle and weight management support</li>
              <li>• InBody body composition analysis (as appropriate)</li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              This site is for general information only and does not provide
              medical advice. If you are having an emergency, call 911.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
