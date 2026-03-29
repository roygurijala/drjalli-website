// src/lib/seo.ts
import {
  PRACTICE_NAME,
  PRACTICE_DOMAIN,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
  PRACTICE_EMAIL,
  MAPS_DIRECTIONS_URL,
  DEFAULT_OG_IMAGE,
} from "./constants";

// ─── Organization Schema ──────────────────────────────────────────────────────
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${PRACTICE_DOMAIN}/#organization`,
    name: PRACTICE_NAME,
    url: PRACTICE_DOMAIN,
    logo: `${PRACTICE_DOMAIN}/images/Jalli_high_res_logo.png`,
    image: `${PRACTICE_DOMAIN}/images/Jalli_high_res_logo.png`,
    telephone: PRACTICE_PHONE,
    email: PRACTICE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: PRACTICE_ADDRESS_LINE1,
      addressLocality: "Rockville",
      addressRegion: "MD",
      postalCode: "20850",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.0742,
      longitude: -77.1833,
    },
    medicalSpecialty: ["PrimaryCare", "FamilyPractice", "InternalMedicine"],
    sameAs: [MAPS_DIRECTIONS_URL],
    knowsAbout: [
      "Primary care",
      "Internal medicine",
      "Preventive care",
      "InBody body composition",
      "ABI testing",
      "Allergy testing",
      "Nutrition counseling",
      "Chronic disease management",
    ],
  };
}

// ─── Local Business Schema (maximizes Google Maps / local SEO)  ───────────────
export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician"],
    "@id": `${PRACTICE_DOMAIN}/#localbusiness`,
    name: PRACTICE_NAME,
    url: PRACTICE_DOMAIN,
    telephone: PRACTICE_PHONE,
    email: PRACTICE_EMAIL,
    image: `${PRACTICE_DOMAIN}/images/Jalli_high_res_logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: PRACTICE_ADDRESS_LINE1,
      addressLocality: "Rockville",
      addressRegion: "MD",
      postalCode: "20850",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.0742,
      longitude: -77.1833,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasMap: MAPS_DIRECTIONS_URL,
    medicalSpecialty: "General Practice",
    description:
      "Board-certified internal medicine physicians providing compassionate primary care in Rockville, Maryland — including InBody body composition analysis, ABI testing, allergy testing, and nutrition counseling. Accepting new patients.",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Insurance, Cash, Credit Card",
    areaServed: [
      "Rockville, MD",
      "Gaithersburg, MD",
      "Bethesda, MD",
      "North Potomac, MD",
      "Germantown, MD",
      "Potomac, MD",
      "Montgomery County, MD",
    ],
    knowsAbout: [
      "Primary care",
      "Internal medicine",
      "InBody analysis",
      "Ankle-brachial index testing",
      "Allergy testing",
      "Nutrition counseling",
    ],
  };
}

// ─── WebSite Schema (enables Google sitelinks search box) ────────────────────
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PRACTICE_DOMAIN}/#website`,
    url: PRACTICE_DOMAIN,
    name: PRACTICE_NAME,
    description: "Primary Care in Rockville, Maryland",
    publisher: { "@id": `${PRACTICE_DOMAIN}/#organization` },
  };
}

// ─── FAQ Schema (use on pages with Q&A content) ───────────────────────────────
export function generateFAQJsonLd(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────
export function generateBreadcrumbJsonLd(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ─── Clinician profile schema (Physician vs NP) ──────────────────────────────
export function generateClinicianProfileJsonLd(opts: {
  name: string;
  title: string;
  description: string;
  imagePath: string;
  pageUrl: string;
}) {
  const desc = opts.description.replace(/\s+/g, " ").trim().slice(0, 800);
  const isNurse =
    /\bNP\b|Nurse Practitioner/i.test(opts.title) ||
    /\bNP\b/i.test(opts.name);

  const shared = {
    "@context": "https://schema.org",
    name: opts.name,
    jobTitle: opts.title,
    description: desc,
    image: `${PRACTICE_DOMAIN}${opts.imagePath}`,
    url: opts.pageUrl,
    worksFor: { "@id": `${PRACTICE_DOMAIN}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.pageUrl },
  };

  if (isNurse) {
    return {
      ...shared,
      "@type": "Person",
      knowsAbout: ["Primary care", "Family medicine", "Adult health"],
    };
  }

  return {
    ...shared,
    "@type": "Physician",
    medicalSpecialty: ["InternalMedicine", "PrimaryCare"],
  };
}

// ─── Per-page metadata helpers ────────────────────────────────────────────────
export const defaultMeta = {
  title: `${PRACTICE_NAME} | Primary Care in Rockville, MD`,
  description:
    "Compassionate, comprehensive primary care for adults at Dr. Jalli MD PC in Rockville, MD. InBody analysis, ABI testing, allergy testing, nutrition counseling, and more. New patients welcome.",
};

export function makePageMeta(
  title: string,
  description: string,
  path: string = ""
) {
  const url = `${PRACTICE_DOMAIN}${path}`;
  const ogTitle = `${title} | ${PRACTICE_NAME}`;
  return {
    title,
    description,
    openGraph: {
      type: "website" as const,
      locale: "en_US",
      siteName: PRACTICE_NAME,
      title: ogTitle,
      description,
      url,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${PRACTICE_NAME} — Primary care in Rockville, MD`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: ogTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
  };
}

// ─── Standard new-patient FAQs (reuse on FAQ sections) ───────────────────────
export const newPatientFAQs = [
  {
    question: "Is Dr. Jalli MD PC accepting new patients?",
    answer:
      "Yes, we are currently accepting new patients. Please call our office at 301-686-8554 to schedule your first appointment.",
  },
  {
    question: "What insurance does Dr. Jalli accept?",
    answer:
      "We accept Medicare, Medicaid, CareFirst (BCBS), Aetna, Cigna, UnitedHealthcare (UHC), UMR, GEHA, Priority Partners, Johns Hopkins Health Plans, and several other plans. Please call the office to verify your specific plan.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "Call our office at 301-686-8554 during business hours (Monday–Friday, 9 AM–5 PM). We will find a time that works for you and walk you through what to bring.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid photo ID, your insurance card, a list of current medications (or the bottles), any recent lab results or imaging reports, and a list of questions or concerns you want to discuss.",
  },
  {
    question: "What is InBody body composition analysis?",
    answer:
      "InBody is an in-office, non-invasive body composition test that measures skeletal muscle mass, body fat percentage, hydration levels, and more — providing a much more detailed picture than a standard scale. It's used to support metabolic health, weight management, and lifestyle coaching.",
  },
  {
    question: "Do you offer telehealth visits?",
    answer:
      "Yes, we offer telehealth for select follow-up visits and medication checks when an in-person exam is not clinically required. Call the office to determine if your concern is appropriate for a virtual visit.",
  },
  {
    question: "Do you offer ABI testing at your office?",
    answer:
      "Yes. We offer ankle–brachial index (ABI) testing in the office when clinically appropriate to help assess circulation in the legs. Ask your clinician whether ABI testing is right for you.",
  },
  {
    question: "Do you offer allergy testing?",
    answer:
      "Yes. We provide allergy evaluation and can order appropriate allergy testing when it will change your care plan. Call the office to discuss your symptoms and next steps.",
  },
];

/** FAQs for the dedicated /inbody landing page (SEO) */
export const inbodyPageFaqs = [
  {
    question: "What is InBody body composition analysis?",
    answer:
      "InBody is a quick, non-invasive scan that estimates skeletal muscle mass, body fat percentage, segmental composition, hydration, and related metrics—giving a fuller picture than weight or BMI alone. Your clinician interprets results in context with your history and goals.",
  },
  {
    question: "How long does an InBody scan take?",
    answer:
      "The test usually takes under two minutes. You stand on the device and hold the handles; there is no radiation and no needles.",
  },
  {
    question: "Who is InBody helpful for?",
    answer:
      "It can support patients focused on weight management, metabolic health, muscle tracking, or lifestyle coaching—when your clinician recommends it as part of your care plan.",
  },
  {
    question: "Is InBody safe for everyone?",
    answer:
      "InBody may not be appropriate for people with certain implanted devices or during pregnancy. Discuss with your clinician before scheduling.",
  },
  {
    question: "How do I schedule InBody at Dr. Jalli MD PC?",
    answer:
      "Call our office at 301-686-8554 to ask whether InBody is appropriate for you and to schedule. Established patients may also use the patient portal for non-urgent requests when appropriate.",
  },
];
