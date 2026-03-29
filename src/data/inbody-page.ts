/** Shared copy for InBody marketing — home highlight + /inbody landing */

export const INBODY_METRICS = [
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
    desc: "Basal metabolic rate based on lean mass, useful for guiding weight management.",
    card: "bg-emerald-50 border-emerald-200 hover:border-emerald-300",
    label_color: "text-emerald-800",
    desc_color: "text-emerald-900/70",
  },
] as const;

export const INBODY_WHO_FOR = [
  "Weight management, obesity care, or breaking a plateau beyond the scale",
  "Metabolic health — diabetes, pre-diabetes, insulin resistance, or cholesterol goals",
  "Muscle preservation or building — athletes, older adults, or post-illness recovery",
  "A baseline before nutrition counseling or a structured lifestyle program",
  "Tracking change over time with objective numbers — not day-to-day weight noise",
] as const;

export const INBODY_VISIT_STEPS = [
  {
    step: "1",
    title: "Arrive & check in",
    desc: "Come as you are for a primary care visit that includes InBody (or a scan-only slot, if offered). Wear light clothing; you’ll remove shoes and socks for the scan. Our team will confirm it’s safe for you that day.",
  },
  {
    step: "2",
    title: "Quick scan",
    desc: "You’ll step on the InBody platform and hold the handles. The scan is non-invasive, uses no radiation, and usually takes under two minutes.",
  },
  {
    step: "3",
    title: "Staff review",
    desc: "A trained staff member ensures the reading is high quality, prints or saves your results, and walks you through the basics of what each section means — so you’re not staring at numbers alone.",
  },
  {
    step: "4",
    title: "Optional clinician visit",
    desc: "When scheduled, your physician or nurse practitioner reviews InBody in context with your history, medications, and goals — and turns numbers into a plan. This may be the same appointment or a follow-up, depending on your visit type.",
  },
] as const;
