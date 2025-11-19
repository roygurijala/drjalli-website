// src/data/services.ts

export type Service = {
    slug: string;          // url path: /services/[slug]
    title: string;         // card title
    blurb: string;         // short one-liner shown on cards
    icon?: string;         // optional emoji or icon text
    tags?: string[];       // small pills on the card
    body: string;       // long markdown used on the service detail page
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
      icon: "📈",
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
        "Coaching around nutrition, activity, weight management, and metabolic health using tools like InBody.",
      icon: "⚖️",
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
      slug: "inbody-body-composition",
      title: "InBody Body Composition",
      blurb:
        "Beyond the scale—objective insight into muscle, fat, and water balance to support metabolic care.",
      icon: "📊",
      tags: ["InBody", "Insight"],
      body: `
  **InBody** provides a quick, non-invasive assessment of muscle mass, body fat, and water balance. Results are interpreted **in context** with your history and goals.
  
  **Why it helps**
  - Tracks changes beyond weight alone  
  - Informs metabolic and lifestyle plans  
  - Supports realistic, individualized targets
      `.trim(),
    },
    {
      slug: "care-coordination-and-results",
      title: "Care Coordination & Results",
      blurb:
        "Clear explanations, timely follow-up, and coordination across labs, imaging, and specialists.",
      icon: "🔄",
      tags: ["Follow-up", "Clarity"],
      body: `
  We prioritize **clear communication** and **timely follow-up**. When tests are ordered, we explain what to expect and how results will be shared.
  
  **Includes**
  - Ordering and tracking labs/imaging  
  - Explaining results in plain language  
  - Coordinating referrals and next steps
      `.trim(),
    },
  ];
  
  /* ---------- Helpers ---------- */
  
  export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
  }
  
  export function getAllServiceSlugs(): string[] {
    return services.map((s) => s.slug);
  }
  
  export function getServiceIndex(slug: string): number {
    return services.findIndex((s) => s.slug === slug);
  }
  