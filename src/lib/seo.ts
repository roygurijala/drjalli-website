import { PRACTICE_NAME, PRACTICE_DOMAIN, PRACTICE_ADDRESS_LINE1, PRACTICE_CITY_STATE_ZIP, PRACTICE_PHONE } from "./constants";

export const defaultMeta = {
  title: `${PRACTICE_NAME} | Primary Care in Rockville, MD`,
  description:
    "Compassionate, comprehensive primary care for adults at Dr. Jalli MD PC in Rockville, MD. New patients welcome. Same-day and next-day appointments available.",
};

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": PRACTICE_NAME,
    "url": PRACTICE_DOMAIN,
    "telephone": PRACTICE_PHONE,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": PRACTICE_ADDRESS_LINE1,
      "addressLocality": "Rockville",
      "addressRegion": "MD",
      "postalCode": "20854",
      "addressCountry": "US"
    },
    "medicalSpecialty": [
      "PrimaryCare",
      "FamilyPractice",
      "InternalMedicine"
    ]
  };
}
