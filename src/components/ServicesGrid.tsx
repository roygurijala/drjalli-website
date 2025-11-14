const services = [
    {
      title: "Primary Care for Adults",
      description:
        "Comprehensive primary care including annual exams, follow-up visits, and coordination of specialist care.",
    },
    {
      title: "Preventive Care",
      description:
        "Screenings, vaccinations, and risk assessments tailored to your age, health history, and goals.",
    },
    {
      title: "Chronic Disease Management",
      description:
        "Support for conditions such as hypertension, diabetes, high cholesterol, and thyroid disorders.",
    },
    {
      title: "Lifestyle & Weight Management",
      description:
        "Individualized lifestyle counseling to help you improve nutrition, activity, sleep, and overall health.",
    },
    {
      title: "InBody Body Composition Analysis",
      description:
        "Advanced body composition analysis to track muscle, fat, and other metrics as part of your care plan.",
    },
    {
      title: "Same-Day / Next-Day Visits",
      description:
        "As schedule allows, we offer urgent visits for established patients for non-emergency concerns.",
    },
  ];
  
  export function ServicesGrid() {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Services at a glance
        </h2>
        <p className="mt-2 text-sm text-slate-700 max-w-2xl">
          We care for adults with a focus on prevention, continuity, and
          evidence-based medicine.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-xs text-slate-700">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  