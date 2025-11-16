import { PRACTICE_PHONE } from "@/lib/constants";

export function InBodyHighlightSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FFE7DA] via-[#F9C2AB] to-[#F29B82] py-10 md:py-12">
      <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-black/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            InBody body composition & lifestyle-focused care
          </h2>
          <p className="mt-3 text-sm text-slate-800 md:text-base">
            Beyond the scale, InBody body composition analysis can help you and
            your clinician better understand muscle, fat, and water balance.
            Used thoughtfully, it can support conversations about metabolic
            health, weight management, and long-term wellness.
          </p>
          <p className="mt-2 text-xs text-slate-800/90 md:text-sm">
            Results are always interpreted in context and are not used alone to
            make decisions. We combine these insights with your history,
            examination, and goals.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/40 px-3 py-1 text-[11px] font-medium text-slate-800 backdrop-blur">
              Metabolic health
            </span>
            <span className="rounded-full bg-white/35 px-3 py-1 text-[11px] font-medium text-slate-800 backdrop-blur">
              Lifestyle & coaching
            </span>
            <span className="rounded-full bg-white/35 px-3 py-1 text-[11px] font-medium text-slate-800 backdrop-blur">
              Body composition insight
            </span>
          </div>
        </div>

        <div className="relative w-full max-w-sm rounded-3xl bg-white/95 p-4 text-slate-900 shadow-lg backdrop-blur">
          <h3 className="text-sm font-semibold">Is InBody right for you?</h3>
          <p className="mt-2 text-xs text-slate-700">
            InBody measurements may be useful if you&apos;re working on weight
            management, strength, or metabolic health. Not everyone needs this
            test, and it may not be appropriate for all patients (for example,
            certain devices may not be used with implanted cardiac devices or
            during pregnancy).
          </p>
          <p className="mt-3 text-xs text-slate-700">
            If you&apos;re interested, please discuss it during your visit so we
            can see whether it fits your care plan.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-xs">
            <a
              href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow hover:bg-slate-900"
            >
              Call {PRACTICE_PHONE} with questions
            </a>
            <p className="text-[10px] text-slate-500">
              This page is for general information only and is not a substitute
              for medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
