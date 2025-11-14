import {
    PRACTICE_ADDRESS_LINE1,
    PRACTICE_CITY_STATE_ZIP,
    PRACTICE_PHONE,
  } from "@/lib/constants";
  
  export function ContactCard() {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
          Contact & Location
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Clinic Information
            </h3>
            <p className="mt-2 text-xs text-slate-700">
              {PRACTICE_ADDRESS_LINE1}
              <br />
              {PRACTICE_CITY_STATE_ZIP}
            </p>
            <p className="mt-2 text-xs text-slate-700">
              Phone: {PRACTICE_PHONE}
            </p>
            <p className="mt-2 text-xs text-slate-700">
              Please call the office for appointments. Established patients may
              also request appointments through the patient portal.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              New Patients
            </h3>
            <p className="mt-2 text-xs text-slate-700">
              For your privacy, please do not share personal medical information
              through this website. For medical questions, call the office or use
              the secure patient portal.
            </p>
          </div>
        </div>
      </section>
    );
  }
  