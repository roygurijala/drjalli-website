export default function PatientResourcesPage() {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Patient Resources
        </h1>
        <p className="mt-3 text-sm text-slate-700 max-w-3xl">
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
      </div>
    );
  }
  