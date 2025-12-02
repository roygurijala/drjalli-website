import { InfoCard, type InfoCardItem } from "../../components/InfoCard";

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
  },
];

export default function PatientResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Patient Resources
      </h1>

      <p className="mt-3 max-w-3xl text-sm text-slate-700">
        This page can include details for new and existing patients: what to
        bring to your visit, insurance information, forms, and portal links.
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>New patient instructions</li>
        <li>Insurance plans accepted (high-level, not contractual wording)</li>
        <li>How to request prescription refills</li>
        <li>How to use the secure patient portal</li>
        <li>After-hours and emergency instructions</li>
      </ul>

      {/* CARD SECTION */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Start here
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-700">
          Choose the option that best describes you to see the most relevant
          information.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {patientResources.map((item) => (
            <InfoCard
              key={item.name}
              item={item}
              pillLabel="Patient resource"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

  