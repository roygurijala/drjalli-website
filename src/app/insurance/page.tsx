export default function InsurancePage() {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Insurance & Billing
        </h1>
  
        <p className="mt-4 text-sm md:text-base text-slate-700 max-w-3xl leading-relaxed">
          We aim to make billing and insurance as clear as possible. If you have
          questions about your specific plan or coverage, please call the office
          and we&apos;ll be happy to help.
        </p>
  
        {/* Plans list */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Insurance plans we commonly work with
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            This list is not exhaustive and may change over time. Please confirm
            with your insurer or our office before scheduling.
          </p>
  
          <ul className="mt-4 grid gap-3 text-sm text-slate-800 sm:grid-cols-2 md:grid-cols-3">
            <li>Aetna</li>
            <li>Blue Cross Blue Shield</li>
            <li>Cigna</li>
            <li>UnitedHealthcare</li>
            <li>Medicare</li>
            <li>Tricare</li>
            {/* Add the real ones here */}
          </ul>
        </section>
  
        {/* Good to know */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            Good to know
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>
              Your exact out-of-pocket cost depends on your plan&apos;s
              deductible, copay, and coinsurance.
            </li>
            <li>
              Please bring your insurance card and photo ID to each visit so we
              can keep your information up to date.
            </li>
            <li>
              If you are out-of-network, we can often provide a superbill you can
              submit to your insurer.
            </li>
            <li>
              Self-pay rates may be available for patients without insurance or
              out-of-network plans.
            </li>
          </ul>
        </section>
  
        {/* Contact for questions */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Questions about coverage?
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Call our office at <span className="font-medium">[clinic phone]</span>{" "}
            or send a message through the patient portal. We&apos;re happy to
            help you understand your options.
          </p>
        </section>
      </div>
    );
  }
  
  