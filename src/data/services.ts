// src/data/services.ts

export type Service = {
    slug: string;          // url path: /services/[slug]
    title: string;         // card title
    blurb: string;         // short one-liner shown on cards
    icon?: string;         // optional emoji or icon text
    tags?: string[];       // small pills on the card
    body: string;          // markdown on the service detail page (may be short if canonicalLandingPath is set)
    /** Rich SEO page path (e.g. /inbody); catalog entry canonical points here */
    canonicalLandingPath?: string;
  };
  
  export const services: Service[] = [
    {
      slug: "primary-care-for-adults",
      title: "Primary Care for Adults",
      blurb:
        "Comprehensive adult primary care including annual exams, follow-ups, and coordination of specialist care.",
      icon: "🩺",
      tags: ["Continuity", "Coordination", "Evidence-based"],
      body: `
  We provide **relationship-based internal medicine** for adults, covering routine visits, acute concerns, care coordination, and referrals when needed.
  
  **What’s included**
  - Annual wellness and preventive visits  
  - Management of common acute illnesses  
  - Coordination with specialists and imaging/labs  
  - Clear, plain-language explanations and next steps
  
  **Good to know**  
  Please bring your medication list, photo ID, and insurance card to each visit.
      `.trim(),
    },
    {
      slug: "preventive-care",
      title: "Preventive Care",
      blurb:
        "Screenings, vaccinations, and risk assessments tailored to your age, history, and goals.",
      icon: "🛡️",
      tags: ["Screenings", "Vaccines"],
      body: `
  We focus on prevention with the right **screenings, immunizations, and counseling** based on your personal and family history.
  
  **Examples**
  - Cancer and metabolic screenings  
  - Age-appropriate immunizations  
  - Lifestyle counseling and risk reduction
      `.trim(),
    },
    {
      slug: "chronic-disease-management",
      title: "Chronic Disease Management",
      blurb:
        "Support for conditions like hypertension, diabetes, cholesterol, thyroid disorders, and more.",
      icon: "🎯",
      tags: ["Hypertension", "Diabetes", "Cholesterol"],
      body: `
  Thoughtful, **evidence-based management** of chronic conditions with a plan that's clear and practical.
  
  **How we help**
  - Medication review and optimization  
  - Lab monitoring and follow-ups  
  - Education, achievable goals, and coordination with specialists
      `.trim(),
    },
    {
      slug: "womens-health",
      title: "Women’s Health",
      blurb:
        "Primary care for women, including preventive visits, counseling, and coordination with specialists.",
      icon: "🌸",
      tags: ["Preventive", "Counseling"],
      body: `
  Women's preventive and general medical needs within primary care, with coordination to gynecology when appropriate.
  
  **Topics we commonly cover**
  - Preventive screenings and vaccines  
  - Perimenopause/menopause counseling  
  - Bone health, cardiovascular risk, and metabolic health
      `.trim(),
    },
    {
      slug: "lifestyle-and-metabolic-health",
      title: "Lifestyle & Metabolic Health",
      blurb:
        "Coaching around nutrition, activity, weight management, and metabolic health using tools like InBody — including dedicated nutrition counseling when you need deeper guidance.",
      icon: "🏃",
      tags: ["Metabolic", "Weight", "Coaching"],
      body: `
  We take a **whole-person** approach to metabolic health, combining lifestyle strategies with medical guidance.
  
  **Areas we work on**
  - Nutrition, activity, and sleep routines  
  - Weight management strategies  
  - Metabolic risk reduction with clear metrics
      `.trim(),
    },
    {
      slug: "telehealth-when-appropriate",
      title: "Telehealth (When Appropriate)",
      blurb:
        "Video visits for select concerns when safe and clinically appropriate to make care more convenient.",
      icon: "💻",
      tags: ["Convenience", "Follow-ups"],
      body: `
  Telehealth can be used for certain follow-ups, medication checks, or result reviews when an in-person exam is not required.
  
  **Please note**  
  Not all concerns are suitable for telehealth. We’ll advise when an **in-person** visit is necessary for safety and quality.
      `.trim(),
    },
    {
      slug: "home-sleep-study",
      title: "At-Home Sleep Study",
      blurb:
        "Take-home sleep study kits for qualified patients when your clinician recommends testing for sleep apnea or related concerns.",
      icon: "😴",
      tags: ["Sleep apnea", "Home kit", "OSA"],
      body: `
  When clinically appropriate, we may offer **at-home sleep testing** using a portable kit you use in your own bed. This can help evaluate for **obstructive sleep apnea** and related concerns, with results interpreted in the context of your symptoms and overall health.

  **How it works (high level)**
  - Your clinician determines whether a home study is appropriate for you  
  - You receive instructions and use the device as directed at home  
  - Results are reviewed with you so you understand next steps  

  **Important**  
  Home sleep studies are **not for everyone**. Some people need an in-lab sleep study or a different evaluation. **Insurance coverage and medical necessity vary**—ask our team what applies to your situation.

  **Questions?**  
  Call the office to discuss whether this option fits your care plan.
      `.trim(),
    },
    {
      slug: "inbody",
      title: "InBody Body Composition",
      blurb:
        "Beyond the scale—objective insight into muscle, fat, and water balance to support metabolic care.",
      icon: "📊",
      tags: ["InBody", "Insight"],
      canonicalLandingPath: "/inbody",
      body: `
  **InBody** is available in-office for body composition assessment. Your clinician recommends it when it fits your goals and care plan. Visits typically include about **15 minutes of structured review** so your results are explained clearly; you can **schedule time with your physician or nurse practitioner** to discuss findings in a medical visit when needed.

  For metrics, how the scan works, who it is for, and what to expect, use our **[full InBody guide](/inbody)**.
      `.trim(),
    },
    {
      slug: "abi-testing",
      title: "ABI (Ankle–Brachial Index) Testing",
      blurb:
        "In-office screening for circulation in the legs—useful for peripheral artery disease (PAD) risk and cardiovascular health planning.",
      icon: "🫀",
      tags: ["Vascular", "Screening", "In-office"],
      body: `
  **Ankle–Brachial Index (ABI)** testing is a quick, non-invasive way to compare blood pressure at your ankle and arm. It helps assess **circulation in the legs** and can support evaluation of **peripheral artery disease (PAD)** risk when clinically appropriate.
  
  **Why it matters**
  - Adds objective information beyond symptoms alone  
  - Supports heart and vascular health discussions with your clinician  
  - Results are interpreted **in context** with your history and exam
  
  **Good to know**  
  ABI is one tool among many. Your clinician will recommend it when it fits your care plan—not every patient needs it at every visit.
      `.trim(),
    },
    {
      slug: "allergy-testing",
      title: "Allergy Testing",
      blurb:
        "Evaluation and testing to help identify environmental or other allergies when symptoms suggest allergy—and guide a sensible treatment plan.",
      icon: "🌿",
      tags: ["Allergies", "Testing", "In-office"],
      body: `
  When **allergy symptoms** get in the way of daily life, we can evaluate your history and, when appropriate, order **allergy testing** to help clarify triggers. Testing options depend on your symptoms, exam, and clinical judgment.
  
  **What we focus on**
  - Clear history-taking and exam  
  - Testing when it changes management  
  - Practical next steps: avoidance, medications, and follow-up
  
  **Please note**  
  Not every symptom is allergic—and not everyone needs broad panels. We aim for **evidence-based, individualized** testing rather than one-size-fits-all approaches.
      `.trim(),
    },
    {
      slug: "nutrition-counseling",
      title: "Nutrition Counseling & Advice",
      blurb:
        "Personalized nutrition guidance tied to your health goals—weight, diabetes, cholesterol, blood pressure, and overall wellness.",
      icon: "🥗",
      tags: ["Nutrition", "Lifestyle", "Goals"],
      body: `
  Nutrition is a cornerstone of **metabolic health**, **chronic disease management**, and **prevention**. We provide **practical, realistic advice** aligned with your medical conditions and preferences—not fad diets.
  
  **Common topics**
  - Meal patterns, portions, and sustainable habits  
  - Diabetes, cholesterol, and blood pressure–friendly eating  
  - Coordination with activity, sleep, and medications  
  
  **How we work with you**  
  Visits combine **medical guidance** with coaching-style support so your nutrition plan fits your culture, schedule, and budget.
      `.trim(),
    },
    {
      slug: "care-coordination-and-results",
      title: "Care Coordination & Results",
      blurb:
        "Labs and imaging tailored to your health concerns—plus clear explanations, timely follow-up, and coordination with specialists.",
      icon: "🔗",
      tags: ["Follow-up", "Clarity"],
      body: `
  We prioritize **clear communication** and **timely follow-up**. Lab work and other testing are **chosen for you—based on your symptoms, conditions, medications, and goals**—not a generic checklist. We explain what we are ordering, why it matters for your situation, and how results will be shared.
  
  **Includes**
  - Personalized lab and imaging orders aligned with your clinical picture  
  - Tracking results and explaining them in plain language  
  - Coordinating referrals and next steps when specialist care is needed
      `.trim(),
    },
  ];
  
  /** Home page spotlight (order preserved) — breadth without duplicating a second carousel */
  export const HOME_FEATURED_SERVICE_SLUGS = [
    "primary-care-for-adults",
    "preventive-care",
    "chronic-disease-management",
    "home-sleep-study",
    "inbody",
    "telehealth-when-appropriate",
  ] as const;

  /* ---------- Helpers ---------- */

  export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
  }

  /** Prefer the rich landing page when a service has one (e.g. InBody → `/inbody`). */
  export function getServiceHref(service: Service): string {
    return service.canonicalLandingPath ?? `/services/${service.slug}`;
  }

  export function getHomeFeaturedServices(): Service[] {
    return HOME_FEATURED_SERVICE_SLUGS.map((slug) => {
      const s = getServiceBySlug(slug);
      if (!s) {
        throw new Error(`Home featured service missing from catalog: ${slug}`);
      }
      return s;
    });
  }
  
  export function getAllServiceSlugs(): string[] {
    return services.map((s) => s.slug);
  }
  
  export function getServiceIndex(slug: string): number {
    return services.findIndex((s) => s.slug === slug);
  }
  