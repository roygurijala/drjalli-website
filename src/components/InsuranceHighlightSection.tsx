import Link from "next/link";
import { PRACTICE_PHONE } from "@/lib/constants";

export function InsuranceHighlightSection() {
  return (
    <section className="bg-[#FFF4EC] py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top row: title + short blurb */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#B4634D] shadow-sm">
              <span className="text-base">💳</span>
              <span>Insurance & billing</span>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Insurance we work with
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700">
              We work with many major insurance plans. Coverage can vary based on
              your specific plan, so we&apos;re always happy to help you
              understand your options before a visit.
            </p>
          </div>

          <p className="text-[11px] text-slate-500 md:text-xs max-w-xs">
            For the most accurate information about your coverage, you can also
            call the number on the back of your insurance card or contact our
            office at <span className="font-semibold">{PRACTICE_PHONE}</span>.
          </p>
        </div>

        {/* Middle row: list of plans */}
        <div className="mt-6 grid gap-3 text-sm text-slate-800 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-2xl bg-white/90 p-3 shadow-sm border border-[#F3D3C6]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Common plans
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Aetna</li>
              <li>Blue Cross Blue Shield</li>
              <li>Cigna</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/90 p-3 shadow-sm border border-[#F3D3C6]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Also often seen
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>UnitedHealthcare</li>
              <li>Medicare</li>
              <li>Tricare</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white/90 p-3 shadow-sm border border-dashed border-[#F3D3C6]">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Don&apos;t see your plan?
            </p>
            <p className="mt-2 text-xs text-slate-700">
              This list is not exhaustive. Please call the office and we&apos;ll
              help you check your plan, or discuss self-pay options if needed.
            </p>
          </div>
        </div>

        {/* Bottom row: link to full details (optional) */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-slate-700 md:flex-row md:items-center md:justify-between">
          <p>
            Your out-of-pocket cost will depend on your deductible, copay, and
            coinsurance. We can often provide a summary of charges for you to
            submit to your insurer if we are out-of-network.
          </p>
          <Link
            href="/insurance"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-900 shadow-sm border border-slate-200 hover:bg-slate-50"
          >
            View full insurance details →
          </Link>
        </div>
      </div>
    </section>
  );
}