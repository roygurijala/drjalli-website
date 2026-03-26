// src/components/Footer.tsx
import Link from "next/link";
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
  "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20854";

const footerLinks = {
  "Patient Resources": [
    { label: "New Patient Guide", href: "/patient-resources/new-patient" },
    { label: "Patient Portal", href: PORTAL_URL, external: true },
    { label: "Insurance Accepted", href: "/patient-resources" },
    { label: "InBody Analysis", href: "/#inbody" },
    { label: "Contact Us", href: "/contact" },
  ],
  Services: [
    { label: "Primary Care for Adults", href: "/services/primary-care-for-adults" },
    { label: "Preventive Care", href: "/services/preventive-care" },
    { label: "Chronic Disease Management", href: "/services/chronic-disease-management" },
    { label: "Women's Health", href: "/services/womens-health" },
    { label: "Lifestyle & Metabolic Health", href: "/services/lifestyle-and-metabolic-health" },
    { label: "Telehealth", href: "/services/telehealth-when-appropriate" },
  ],
  "Our Practice": [
    { label: "Our Clinicians", href: "/clinicians" },
    { label: "About Us", href: "/about" },
    { label: "All Services", href: "/services" },
    { label: "Get Directions", href: MAPS_URL, external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300" aria-label="Site footer">
      {/* ─── Main content ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">

          {/* Practice info column */}
          <div>
            <p className="font-display text-base font-bold text-white">
              {PRACTICE_NAME}
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-400">
              Board-certified physicians providing compassionate,
              relationship-based primary care for adults in Rockville, Maryland
              and surrounding communities including Gaithersburg, Bethesda, and
              North Potomac.
            </p>

            {/* Contact details */}
            <ul className="mt-5 space-y-2.5 text-xs" aria-label="Contact information">
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-teal-400" aria-hidden>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-teal-300 transition-colors">
                    {PRACTICE_ADDRESS_LINE1}
                  </a>
                  <br />
                  <span className="text-slate-400">{PRACTICE_CITY_STATE_ZIP}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0 text-teal-400" aria-hidden>
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" />
                </svg>
                <a
                  href={`tel:${PRACTICE_PHONE_TEL}`}
                  className="font-medium text-white hover:text-teal-300 transition-colors"
                >
                  {PRACTICE_PHONE}
                </a>
              </li>
              {PRACTICE_EMAIL && (
                <li className="flex items-center gap-2.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0 text-teal-400" aria-hidden>
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href={`mailto:${PRACTICE_EMAIL}`} className="text-slate-400 hover:text-teal-300 transition-colors">
                    {PRACTICE_EMAIL}
                  </a>
                </li>
              )}
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-teal-400/80">
                Office Hours
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Monday – Friday</span>
                  <span className="font-medium text-white">9:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Saturday – Sunday</span>
                  <span className="text-slate-500">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-teal-400/80">
                {section}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 transition-colors hover:text-teal-300"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-slate-400 transition-colors hover:text-teal-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ─── Patient portal CTA strip ──────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-white">
              Established patient? Access your portal.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              View results, request prescription refills, and send non-urgent
              messages to your care team.
            </p>
          </div>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-teal-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-teal-500/20 transition hover:bg-teal-400"
          >
            Open Patient Portal ↗
          </a>
        </div>

        {/* ─── Service area (helps local SEO) ───────────────────────── */}
        <p className="mt-8 text-[11px] text-slate-600">
          Serving patients in{" "}
          <span className="text-slate-500">
            Rockville, Gaithersburg, Bethesda, North Potomac, Germantown,
            Potomac, and throughout Montgomery County, Maryland.
          </span>
        </p>
      </div>

      {/* ─── Bottom bar ───────────────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-[11px] text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {PRACTICE_NAME}. All rights reserved.</p>
          <p className="max-w-lg text-right">
            This website is for general information only and does not constitute
            medical advice. For urgent concerns, call the office. For
            emergencies, call 911.
          </p>
        </div>
      </div>
    </footer>
  );
}
