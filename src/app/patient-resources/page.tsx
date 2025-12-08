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
    href: "https://athenaone.com",
    
  },
];

export default function PatientResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Patient Resources
      </h1>

      {/* ⭐ BEAUTIFUL INSURANCE SECTION ADDED HERE */}
      <section className="mt-6 rounded-3xl border border-[#F3D3C6] bg-[#FFF4EC] p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          {/* Left side */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#B4634D] shadow-sm">
              <span className="text-base">💳</span>
              <span>Insurance & Billing</span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-slate-900 md:text-xl">
              Insurance we commonly work with
            </h2>

            <p className="mt-2 text-sm text-slate-700">
              We work with many major insurance plans. Coverage varies based on
              your specific plan, so feel free to call us if you&apos;d like help
              understanding your benefits before your visit.
            </p>
          </div>

          {/* Insurance mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
            <div className="rounded-2xl bg-white/90 p-4 shadow-sm border border-[#F3D3C6]">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Common plans
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-800">
                <li>Aetna</li>
                <li>Blue Cross Blue Shield</li>
                <li>Cigna</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/90 p-4 shadow-sm border border-[#F3D3C6]">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Also accepted
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-800">
                <li>UnitedHealthcare</li>
                <li>Medicare</li>
                <li>Tricare</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-dashed border-[#F3D3C6] bg-white/80 p-4 text-sm text-slate-700 sm:col-span-2">
              Don&apos;t see your plan? This list is not exhaustive. Please call the
              office at <span className="font-semibold">{PRACTICE_PHONE}</span> and
              we will help verify your coverage or discuss self-pay options.
            </div>
          </div>
        </div>

        {/* Bottom summary + link */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            Your costs will depend on deductible, copay, and coinsurance. We
            can provide a summary of charges for insurance reimbursement if
            needed.
          </p>
        </div>
      </section>

      {/* CARD SECTION */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Start here
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-700">
          Choose the option that best describes you to see the most important
          information for your visit.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {patientResources.map((item) => (
            <InfoCard key={item.name} item={item} pillLabel="Patient resource" href={item.href} />
          ))}
        </div>
      </section>
    </div>
  );
}


  