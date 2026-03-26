// src/lib/seo.ts
import {
  PRACTICE_NAME,
  PRACTICE_DOMAIN,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
  PRACTICE_EMAIL,
  MAPS_DIRECTIONS_URL,
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
      postalCode: "20854",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.0742,
      longitude: -77.1833,
    },
    medicalSpecialty: ["PrimaryCare", "FamilyPractice", "InternalMedicine"],
    sameAs: [MAPS_DIRECTIONS_URL],
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
      postalCode: "20854",
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
      "Board-certified internal medicine physicians providing compassionate primary care, preventive care, chronic disease management, and InBody body composition analysis in Rockville, Maryland. Accepting new patients.",
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

// ─── Physician Person Schema (use on clinician profile pages) ─────────────────
export function generatePhysicianJsonLd(physician: {
  name: string;
  title: string;
  description: string;
  image: string;
  specialty: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: physician.name,
    jobTitle: physician.title,
    description: physician.description,
    image: `${PRACTICE_DOMAIN}${physician.image}`,
    medicalSpecialty: physician.specialty,
    worksFor: { "@id": `${PRACTICE_DOMAIN}/#organization` },
  };
}

// ─── Per-page metadata helpers ────────────────────────────────────────────────
export const defaultMeta = {
  title: `${PRACTICE_NAME} | Primary Care in Rockville, MD`,
  description:
    "Compassionate, comprehensive primary care for adults at Dr. Jalli MD PC in Rockville, MD. New patients welcome. Board-certified physicians. InBody body composition technology.",
};

export function makePageMeta(
  title: string,
  description: string,
  path: string = ""
) {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${PRACTICE_NAME}`,
      description,
      url: `${PRACTICE_DOMAIN}${path}`,
    },
    alternates: {
      canonical: `${PRACTICE_DOMAIN}${path}`,
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
];
