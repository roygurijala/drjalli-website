export default function NewPatientPage() {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          New Patient Information
        </h1>
  
        <p className="mt-3 text-sm text-slate-700 max-w-2xl">
          Welcome to our practice. This page will provide everything you need to
          know before your first visit, including how to schedule, what to bring,
          insurance information, and required forms.
        </p>
  
        {/* Placeholder sections */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Scheduling Your First Visit
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Please call the office to schedule your first appointment. Our staff
            will guide you through the process and answer any questions.
          </p>
        </section>
  
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            What to Bring
          </h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            <li>Photo ID</li>
            <li>Insurance card</li>
            <li>Medication list</li>
            <li>Relevant medical records</li>
          </ul>
        </section>
  
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Forms & Paperwork
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            New patient forms may be completed prior to your visit or at the
            office. Details will be added here.
          </p>
        </section>
      </div>
    );
  }
  