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
    href: "https://30779-1.portal.athenahealth.com/", // Opens in new tab via InfoCard logic
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

      {/* ⭐ LARGE INSURANCE SECTION */}
      <section className="mt-8">
        <div className="rounded-3xl border border-[#F3D3C6] bg-[#FFF7F0] p-8 shadow-sm">
          {/* Header pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-[12px] font-semibold text-[#B4634D] shadow-sm">
            <span className="text-base">💳</span>
            <span>Insurance Accepted</span>
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900 md:text-2xl">
            Insurance Plans We Work With
          </h2>

          <p className="mt-2 max-w-3xl text-sm text-slate-700">
            We participate with many major insurance providers. Coverage may vary
            depending on your specific plan. Please call us if you'd like help verifying
            your benefits before your appointment.
          </p>

          {/* ⭐ Grouped Insurance Lists */}
          <div className="mt-6 rounded-2xl bg-white p-6 border border-[#F3D3C6] shadow-sm">

            {/* Medicare */}
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Medicare & Medicare Advantage
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-800 sm:grid-cols-2">
              <li>Medicare</li>
              <li>CareFirst Medicare Advantage</li>
              <li>Aetna Medicare Advantage</li>
              <li>UHC Medicare Advantage</li>
            </ul>

            {/* Commercial */}
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Commercial / Private Insurance
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-800 sm:grid-cols-2 md:grid-cols-3">
              <li>CareFirst (BCBS)</li>
              <li>Aetna</li>
              <li>Cigna</li>
              <li>UnitedHealthcare (UHC)</li>
              <li>UMR</li>
              <li>GEHA</li>
            </ul>

            {/* Medicaid */}
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Medicaid & Managed Care Plans
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-800 sm:grid-cols-2 md:grid-cols-3">
              <li>Maryland Medicaid</li>
              <li>CareFirst Community</li>
              <li>Maryland Physicians Care</li>
              <li>Wellpoint — Amerigroup</li>
              <li>Priority Partners</li>
              <li>Aetna Better Health (pending; previously enrolled)</li>
              <li>Johns Hopkins Health Plans</li>
            </ul>

            <p className="mt-6 text-xs text-slate-600">
              Don’t see your plan listed? This list may not be exhaustive. Please call the office at{" "}
              <span className="font-semibold">{PRACTICE_PHONE}</span> and we will help verify
              your coverage or discuss self-pay options.
            </p>
          </div>
        </div>
      </section>

      {/* ⭐ START HERE CARD SECTION */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Start Here
        </h2>

        <p className="mt-2 max-w-xl text-sm text-slate-700">
          Choose the option that best describes you to see the most helpful information.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {patientResources.map((item) => (
            <InfoCard
              key={item.name}
              item={item}
              pillLabel="Patient resource"
              href={item.href}  // Makes Existing Patient clickable
            />
          ))}
        </div>
      </section>
    </div>
  );
}

  