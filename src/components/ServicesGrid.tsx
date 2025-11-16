type Service = {
  name: string;
  description: string;
  tags: string[];
  icon: string;
};

const services: Service[] = [
  {
    name: "Comprehensive Primary Care",
    description:
      "Ongoing care for adults, from annual physicals to same-day visits for acute concerns.",
    tags: ["Adults 18+", "Continuity", "Evidence-based"],
    icon: "🩺",
  },
  {
    name: "Preventive Visits",
    description:
      "Annual wellness visits, screenings, and risk assessment to help prevent problems before they start.",
    tags: ["Checkups", "Screenings", "Vaccines"],
    icon: "🛡️",
  },
  {
    name: "Chronic Disease Management",
    description:
      "Support for conditions like high blood pressure, diabetes, high cholesterol, and more.",
    tags: ["Hypertension", "Diabetes", "Cholesterol"],
    icon: "📊",
  },
  {
    name: "Women’s Health",
    description:
      "Primary care for women, including preventive visits, counseling, and coordination with specialists.",
    tags: ["Preventive care", "Counseling"],
    icon: "🌸",
  },
  {
    name: "Lifestyle & Metabolic Health",
    description:
      "Coaching around nutrition, activity, weight management, and metabolic health using tools like InBody body composition.",
    tags: ["InBody", "Weight", "Metabolic health"],
    icon: "⚖️",
  },
  {
    name: "Telehealth (When Appropriate)",
    description:
      "Video visits for select concerns, when safe and clinically appropriate, to make care more convenient.",
    tags: ["Video visits", "Follow-ups"],
    icon: "💻",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-[#FFF4EC] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              How we can help
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 md:text-base">
              From preventive visits to chronic disease management, we aim to
              provide thoughtful, relationship-based primary care built around
              your goals.
            </p>
          </div>
          <p className="text-[11px] text-slate-500 md:text-xs">
            Services may vary based on your insurance coverage and clinical
            needs. Please call the office with specific questions.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.name}
              className="group flex h-full flex-col rounded-3xl border border-[#F3D3C6] bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#FFE7DA] px-3 py-1 text-[11px] font-medium text-slate-800">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-sm">
                  {service.icon}
                </span>
                <span>Primary care service</span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 md:text-base">
                {service.name}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-700 md:text-sm">
                {service.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#FFF2EC] px-2.5 py-1 text-[10px] font-medium text-slate-700 group-hover:bg-[#FFD9C4]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
