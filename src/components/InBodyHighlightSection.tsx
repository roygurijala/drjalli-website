// src/components/InBodyHighlightSection.tsx
"use client";
import { PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";

const metrics = [
  {
    icon: "💪",
    label: "Skeletal Muscle Mass",
    desc: "Track muscle distribution across arms, legs, and trunk — not just total weight.",
    card: "bg-teal-50 border-teal-200 hover:border-teal-300",
    label_color: "text-teal-800",
    desc_color: "text-teal-900/70",
  },
  {
    icon: "📊",
    label: "Body Fat Percentage",
    desc: "Segmental body fat analysis far more precise than a BMI calculation alone.",
    card: "bg-cyan-50 border-cyan-200 hover:border-cyan-300",
    label_color: "text-cyan-800",
    desc_color: "text-cyan-900/70",
  },
  {
    icon: "💧",
    label: "Hydration & Water Balance",
    desc: "Intracellular and extracellular water levels — a key marker for cellular health.",
    card: "bg-sky-50 border-sky-200 hover:border-sky-300",
    label_color: "text-sky-800",
    desc_color: "text-sky-900/70",
  },
  {
    icon: "⚡",
    label: "Metabolic Rate Estimate",
    desc: "Basal metabolic rate based on lean mass, essential for guiding weight management.",
    card: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
    label_color: "text-emerald-800",
    desc_color: "text-emerald-900/70",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Quick & Non-Invasive",
    desc: "Stand on the device and hold the handles. No needles, no radiation. The scan takes under two minutes.",
  },
  {
    step: "02",
    title: "Precise Segmental Results",
    desc: "You receive a full printout showing muscle, fat, and fluid levels broken down by body region.",
  },
  {
    step: "03",
    title: "Clinician Review & Action Plan",
    desc: "Your clinician reviews the data in context with your history, goals, and care plan.",
  },
];

export function InBodyHighlightSection() {
  return (
    <section
      id="inbody"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: "linear-gradient(180deg, #F0FDFA 0%, #FFFFFF 100%)" }}
      aria-label="InBody body composition analysis"
    >
      {/* Subtle teal tint at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4">

        {/* Section header */}
        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300 bg-teal-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal-700">
            Advanced In-Office Technology
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            <span className="text-teal-600">InBody</span> Analysis —{" "}
            <br className="hidden md:block" />
            Know Your Body Beyond the Scale
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            In-office InBody body composition scanning gives you and your
            clinician precise, objective data — muscle, fat, hydration, and
            more — to guide metabolic health, weight management, and lifestyle goals.
          </p>
        </div>

        {/* Metrics grid — light cards, dark readable text */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${m.card}`}
            >
              <div className="mb-3 text-3xl" aria-hidden>{m.icon}</div>
              <h3 className={`text-sm font-bold md:text-base ${m.label_color}`}>
                {m.label}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${m.desc_color}`}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Body visual + info card */}
        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center">

          {/* Animated body outline — kept on a soft teal wash */}
          <div className="flex items-center justify-center rounded-3xl bg-teal-50 py-8 border border-teal-100">
            <div className="relative">
              <svg
                viewBox="0 0 240 480"
                className="relative mx-auto h-80 w-auto"
                aria-label="Body composition scan visualization"
                role="img"
              >
                {/* Head */}
                <ellipse cx="120" cy="42" rx="34" ry="38"
                  stroke="#0D9488" strokeWidth="1.5" fill="rgba(13,148,136,0.08)" />
                {/* Neck */}
                <rect x="108" y="78" width="24" height="22" rx="5"
                  fill="rgba(13,148,136,0.06)" stroke="#0D9488" strokeWidth="1.2" />
                {/* Torso */}
                <path
                  d="M78 100 L68 100 L54 240 L95 252 L120 257 L145 252 L186 240 L172 100 L162 100 Q148 90 120 90 Q92 90 78 100Z"
                  fill="rgba(13,148,136,0.05)" stroke="#0D9488" strokeWidth="1.5"
                />
                {/* Left arm */}
                <path d="M78 108 L50 116 L34 200 L48 205 L66 124"
                  fill="rgba(13,148,136,0.04)" stroke="#0891B2" strokeWidth="1.3" />
                {/* Right arm */}
                <path d="M162 108 L190 116 L206 200 L192 205 L174 124"
                  fill="rgba(13,148,136,0.04)" stroke="#0891B2" strokeWidth="1.3" />
                {/* Left leg */}
                <path d="M95 252 L83 258 L72 408 L95 414 L113 258"
                  fill="rgba(13,148,136,0.04)" stroke="#0D9488" strokeWidth="1.3" />
                {/* Right leg */}
                <path d="M145 252 L157 258 L168 408 L145 414 L127 258"
                  fill="rgba(13,148,136,0.04)" stroke="#0D9488" strokeWidth="1.3" />

                {/* Pulsing data points */}
                <circle cx="120" cy="168" r="5" fill="#0D9488">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="56" cy="156" r="4" fill="#0891B2">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" begin="0.4s" repeatCount="indefinite" />
                </circle>
                <circle cx="184" cy="156" r="4" fill="#0891B2">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="93" cy="330" r="4" fill="#0D9488">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" begin="0.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="147" cy="330" r="4" fill="#0D9488">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" begin="1.2s" repeatCount="indefinite" />
                </circle>

                {/* Scanning line */}
                <line x1="35" y1="80" x2="205" y2="80" stroke="#0D9488"
                  strokeWidth="0.8" strokeDasharray="5 5">
                  <animate attributeName="y1" values="80;420;80" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="80;420;80" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite" />
                </line>
              </svg>

              {/* Floating metric labels — dark text on light tinted backgrounds */}
              <div className="absolute right-0 top-10 rounded-xl border border-teal-200 bg-white px-3 py-2 text-center shadow-sm">
                <p className="text-xs font-semibold text-teal-700">Body Fat</p>
                <p className="text-sm font-bold text-slate-900">22.4%</p>
              </div>
              <div className="absolute -left-2 top-1/3 rounded-xl border border-cyan-200 bg-white px-3 py-2 text-center shadow-sm">
                <p className="text-xs font-semibold text-cyan-700">Muscle</p>
                <p className="text-sm font-bold text-slate-900">34.2 kg</p>
              </div>
              <div className="absolute bottom-16 right-0 rounded-xl border border-sky-200 bg-white px-3 py-2 text-center shadow-sm">
                <p className="text-xs font-semibold text-sky-700">Hydration</p>
                <p className="text-sm font-bold text-slate-900">Optimal</p>
              </div>
            </div>
          </div>

          {/* Info card — white, dark text, fully readable */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md md:p-8">
            <h3 className="font-display text-xl font-bold text-slate-900 md:text-2xl">
              Is InBody right for you?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              InBody testing is especially valuable if you are working toward
              weight management, building strength, managing a metabolic
              condition such as diabetes or pre-diabetes, or simply want a more
              complete picture of your body beyond BMI.
            </p>

            <ul className="mt-5 space-y-3" aria-label="InBody use cases">
              {[
                "Weight management & obesity care",
                "Metabolic health monitoring (diabetes, pre-diabetes)",
                "Muscle mass tracking for strength-focused patients",
                "Nutritional and lifestyle coaching baseline",
                "Tracking progress over time — beyond the scale",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-base text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Safety note */}
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <strong className="font-semibold">Please note:</strong> InBody may
              not be appropriate for patients with implanted cardiac devices or
              during pregnancy. Always discuss with your clinician before scheduling.
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-base font-semibold text-white shadow-md shadow-teal-600/20 transition-all hover:bg-teal-500"
              >
                Ask About InBody: {PRACTICE_PHONE}
              </a>
              <p className="text-center text-xs text-slate-500">
                For general information only · Not a substitute for medical advice
              </p>
            </div>
          </div>
        </div>

        {/* How it works — light cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {howItWorks.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <div className="font-display text-4xl font-bold text-teal-200">
                {item.step}
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
