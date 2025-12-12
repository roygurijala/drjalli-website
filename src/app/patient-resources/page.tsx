import { InfoCard, type InfoCardItem } from "../../components/InfoCard";
import { PRACTICE_PHONE } from "@/lib/constants";

const patientResources: InfoCardItem[] = [
  {
    name: "New Patient",
    description:
      "Learn how to schedule your first visit, what to bring, and how insurance works at our clinic.",
    tags: ["First visit", "New patient forms", "Insurance"],
    icon: "🆕",
  },
  {
    name: "Existing Patient",
    description:
      "Access information on refills, follow-up visits, portal access, and after-hours instructions.",
    tags: ["Refills", "Patient portal", "Follow-ups"],
    icon: "👤",
    href: "https://athenaone.com", // opens in new tab via InfoCard
  },
];

export default function PatientResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Patient Resources
      </h1>

      <p className="mt-3 max-w-3xl text-sm text-slate-700">
        Helpful information for new and returning patients, including insurance
        details, visit preparation, and portal access.
      </p>

      {/* ⭐ MAIN TWO-COLUMN SECTION: INSURANCE (LEFT) + CARDS (RIGHT) */}
      <section className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-start">
        {/* LEFT: INSURANCE CARD */}
        <div className="rounded-3xl border border-[#F3D3C6] bg-[#FFF7F0] p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-[12px] font-semibold text-[#B4634D] shadow-sm">
            <span className="text-base">💳</span>
            <span>Insurance Accepted</span>
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900 md:text-2xl">
            Insurance Plans We Work With
          </h2>

          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            We participate with many major insurance providers. Coverage may vary
            depending on your specific plan. Please call us if you&apos;d like help
            verifying your benefits before your appointment.
          </p>

          <div className="mt-6 space-y-6">
            {/* Medicare */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Medicare &amp; Medicare Advantage
              </p>
              <ul className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 divide-y divide-slate-200">
                <li className="px-3 py-2">Medicare</li>
                <li className="px-3 py-2">CareFirst Medicare Advantage</li>
                <li className="px-3 py-2">Aetna Medicare Advantage</li>
                <li className="px-3 py-2">UHC Medicare Advantage</li>
              </ul>
            </div>

            {/* Commercial */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Commercial / Private Insurance
              </p>
              <ul className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 divide-y divide-slate-200">
                <li className="px-3 py-2">CareFirst (BCBS)</li>
                <li className="px-3 py-2">Aetna</li>
                <li className="px-3 py-2">Cigna</li>
                <li className="px-3 py-2">UnitedHealthcare (UHC)</li>
                <li className="px-3 py-2">UMR</li>
                <li className="px-3 py-2">GEHA</li>
              </ul>
            </div>

            {/* Medicaid */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Medicaid &amp; Managed Care Plans
              </p>
              <ul className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800 divide-y divide-slate-200">
                <li className="px-3 py-2">Maryland Medicaid</li>
                <li className="px-3 py-2">CareFirst Community</li>
                <li className="px-3 py-2">Maryland Physicians Care</li>
                <li className="px-3 py-2">Wellpoint — Amerigroup</li>
                <li className="px-3 py-2">Priority Partners</li>
                <li className="px-3 py-2">
                  Aetna Better Health (pending; previously enrolled)
                </li>
                <li className="px-3 py-2">Johns Hopkins Health Plans</li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-600">
            Don’t see your plan listed? This list may not be exhaustive. Please call
            the office at <span className="font-semibold">{PRACTICE_PHONE}</span> and
            we will help verify your coverage or discuss self-pay options.
          </p>
        </div>

        {/* RIGHT: NEW / EXISTING PATIENT CARDS */}
        <div>
         
          <div className="mt-6 grid gap-5">
            {patientResources.map((item) => (
              <InfoCard
                key={item.name}
                item={item}
                pillLabel="Patient resource"
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ WHAT TO BRING CARD */}
      <section className="mt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            What to Bring to Your Visit
          </h2>
          <p className="mt-2 text-sm text-slate-700 max-w-2xl">
            Bringing a few key items helps us make the most of your time in the office.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Photo ID and insurance card</li>
            <li>List of your current medications (or bottles)</li>
            <li>Any recent lab work or imaging reports</li>
            <li>A list of your questions or concerns</li>
            <li>Completed new patient forms (if provided ahead of time)</li>
          </ul>
          <p className="mt-3 text-xs text-slate-600">
            Please arrive 10–15 minutes early for paperwork and check-in, especially
            for your first visit or annual physical.
          </p>
        </div>
      </section>

      {/* ⭐ PATIENT PORTAL CTA */}
      <section className="mt-12">
        <div className="rounded-3xl border border-[#CBD5F5] bg-[#F5F7FF] p-6 shadow-sm flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Patient Portal Login
            </h2>
            <p className="mt-2 text-sm text-slate-700 max-w-xl">
              Established patients can use the secure portal to review results, request
              refills, and send non-urgent messages. For urgent concerns, please call the
              office directly.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a
              href="https://athenaone.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#1E3A8A] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#111827]"
            >
              Open patient portal ↗
            </a>
            <p className="text-[11px] text-slate-600">
              You may be redirected to AthenaHealth to complete sign-in.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


  