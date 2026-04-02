export const PRACTICE_NAME = "Dr. Jalli MD PC";
/** One line for nav / page headers — what you do + for whom + where */
export const PRACTICE_HEADER_TAGLINE =
  "Board-certified internal medicine & primary care for adults in Rockville, MD";
export const PRACTICE_HOURS_SHORT = "Mon–Fri 9–5 · Sat–Sun closed";
export const PRACTICE_PHONE = "301-686-8554";
export const PRACTICE_PHONE_TEL = PRACTICE_PHONE.replace(/[^0-9]/g, ""); // "3016868554"
export const PRACTICE_FAX = "301-686-8602";
export const PRACTICE_FAX_DIGITS = PRACTICE_FAX.replace(/[^0-9]/g, "");
/** Use with `<a href={PRACTICE_FAX_HREF}>` — opens fax-capable clients where supported */
export const PRACTICE_FAX_HREF = `fax:+1${PRACTICE_FAX_DIGITS}`;
export const PRACTICE_ADDRESS_LINE1 = "2401 Research Blvd, Suite 330";
export const PRACTICE_CITY_STATE_ZIP = "Rockville, MD 20850";
export const PRACTICE_DOMAIN = "https://www.drjalli.com";
/** Default Open Graph / Twitter image (under /public) */
export const DEFAULT_OG_IMAGE = "/images/Jalli_high_res_logo.png";
export const PRACTICE_EMAIL = "patientcare@drjalli.com"; // change if needed
export const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps?q=Dr.%20Jalli%20MD%20PC%2C%202401%20Research%20Blvd%20Suite%20330%2C%20Rockville%2C%20MD%2020850";

/** Default online wellness store (multivitamins / supplements). Override with `NEXT_PUBLIC_WELLNESS_STORE_URL` if needed. */
export const DEFAULT_WELLNESS_STORE_URL =
  "https://us.fullscript.com/continue-without-password";

/**
 * URL for the practice’s online wellness store. Uses `NEXT_PUBLIC_WELLNESS_STORE_URL` when set;
 * otherwise {@link DEFAULT_WELLNESS_STORE_URL}.
 */
export function getWellnessStoreUrl(): string {
  const raw = process.env.NEXT_PUBLIC_WELLNESS_STORE_URL;
  if (typeof raw === "string") {
    const t = raw.trim();
    if (t.length > 0) return t;
  }
  return DEFAULT_WELLNESS_STORE_URL;
}

/** One-line notice for AI chat UIs — general info only; avoid sharing health details in chat */
export const AI_CHAT_DISCLAIMER_SHORT =
  "General clinic information only — not medical advice. For emergencies call 911. Do not share personal health information (symptoms, diagnoses, medications, lab results, or ID numbers) in this chat; call the office or use the patient portal for private matters.";

/** Shorter line for compact footers (floating widget, etc.) */
export const AI_CHAT_DISCLAIMER_COMPACT =
  "Not medical advice · Don’t share personal health details here — call us or use the patient portal";
