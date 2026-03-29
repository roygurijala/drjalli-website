// src/components/Footer.tsx
import {
  PRACTICE_NAME,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_EMAIL,
} from "@/lib/constants";

const PORTAL_URL = "https://30779-1.portal.athenahealth.com/";
const MAPS_URL =
  "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20850";

function Sep() {
  return (
    <span className="mx-1.5 text-slate-500 select-none" aria-hidden>
      ·
    </span>
  );
}

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-teal-500/25 bg-navy-900 text-slate-300"
      aria-label="Site footer"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.06]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 md:px-6">
        {/* Line 1 — identity */}
        <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center md:justify-start md:text-left">
          <span className="font-display text-lg font-bold tracking-tight text-white">
            {PRACTICE_NAME}
          </span>
          <span className="hidden text-slate-600 sm:inline" aria-hidden>
            —
          </span>
          <span className="text-sm text-slate-400">
            Primary care for adults in Rockville and Montgomery County, Maryland.
          </span>
        </div>

        {/* Line 2 — contact row */}
        <address className="mt-3 not-italic">
          <p className="flex flex-wrap items-center justify-center gap-x-0 text-sm md:justify-start">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-200 underline-offset-2 hover:text-teal-300 hover:underline"
            >
              {PRACTICE_ADDRESS_LINE1}, {PRACTICE_CITY_STATE_ZIP}
            </a>
            <Sep />
            <a
              href={`tel:${PRACTICE_PHONE_TEL}`}
              className="font-semibold text-white hover:text-teal-300"
            >
              {PRACTICE_PHONE}
            </a>
            {PRACTICE_EMAIL ? (
              <>
                <Sep />
                <a
                  href={`mailto:${PRACTICE_EMAIL}`}
                  className="text-slate-300 hover:text-teal-300"
                >
                  {PRACTICE_EMAIL}
                </a>
              </>
            ) : null}
            <Sep />
            <span className="text-slate-500">Mon–Fri 9–5 · Sat–Sun closed</span>
          </p>
        </address>

        {/* Line 3 — portal + service area */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:justify-between">
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start">
            <span className="text-sm text-slate-400">
              <span className="font-medium text-slate-200">Established patients:</span>{" "}
              portal for results, refills & messages.
            </span>
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center rounded-full bg-teal-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
            >
              Open portal ↗
            </a>
          </div>
          <p className="max-w-full text-center text-[11px] leading-snug text-slate-500 md:max-w-[55%] md:text-right">
            Serving Rockville, Gaithersburg, Bethesda, Germantown, Potomac &
            Montgomery County, MD.
          </p>
        </div>
      </div>

      {/* Legal — slightly darker band */}
      <div className="relative border-t border-white/10 bg-navy-950/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-center text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-slate-400">
            © {new Date().getFullYear()} {PRACTICE_NAME}. All rights reserved.
          </p>
          <p className="sm:max-w-md sm:text-right text-slate-500">
            General information only — not medical advice. Urgent: call the office.
            Emergency: 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
