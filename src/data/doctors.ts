// src/data/doctors.ts

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  credentials?: string;
  imageSrc: string;
  imageAlt: string;
  shortBlurb: string;
  bio: string;
};

export const doctors: Doctor[] = [
  {
    slug: "sireesha-jalli",
    name: "Dr. Sireesha Jalli, MD, FACP",
    title: "Primary Care Physician",
    credentials: "Board-Certified in Internal Medicine",
    imageSrc: "/images/doctors/sireesha-jalli.jpg",
    imageAlt: "Portrait of Dr. Sireesha Jalli",
    shortBlurb:
      "Compassionate, relationship-based primary care with a focus on prevention and long-term health.",
    bio:
      "Dr. Sireesha Jalli is a trusted and compassionate internist dedicated to providing exceptional care to the Rockville, Maryland community. With more than 20 years of experience in internal medicine, she focuses on building long-term relationships with her patients and delivering personalized, preventive care. \b Dr. Jalli earned her medical degree from Andhra Medical College and completed her residency in Internal Medicine at University of Maryland Capital Region Medical Center. She is board-certified by the American Board of Internal Medicine and affiliated with Adventist HealthCare Shady Grove Medical Center. As a Fellow of the American College of Physicians, Dr. Jalli brings a wealth of knowledge and expertise to every patient interaction. \bHer approach emphasizes comprehensive care, clear communication, and shared decision-making, ensuring that patients feel informed and supported at every step. Whether managing chronic conditions or promoting preventive health, Dr. Jalli is committed to helping patients achieve lasting wellness.",
  },
  {
    slug: "mythily-vancha",
    name: "Dr. Mythily Vancha, MD",
    title: "Primary Care Physician",
    credentials: "Board-Certified in Internal Medicine",
    imageSrc: "/images/doctors/mythily-vancha.jpg",
    imageAlt: "Portrait of Dr. Mythily Vancha",
    shortBlurb:
      "Thorough, communicative care that helps patients understand their conditions and options.",
    bio:
      "Dr. Mythily Vancha is a caring and experienced board-certified internist dedicated to helping adults live healthier, fuller lives. With nearly three decades of medical experience, she provides comprehensive primary care with a focus on preventive health, chronic disease management, and personalized treatment plans. \bDr. Vancha earned her medical degree from Gandhi Medical College, completed her residency in Internal Medicine at University of Maryland Capital Region Health and is board-certified by the American Board of Internal Medicine. Her philosophy is simple: listen, understand, and partner with patients to achieve lasting wellness. Whether you need routine check-ups, help managing conditions like diabetes or heart disease, or guidance on healthy living, Dr. Vancha is here to support you every step of the way.",
  },
  {
    slug: "ntoge-penda",
    name: "Ntoge Penda, NP",
    title: "Nurse Practitioner",
    credentials: "Advanced Practice Provider",
    imageSrc: "/images/doctors/doctor-placeholder.svg",
    imageAlt: "Portrait of Nurse Practitioner Ntoge Penda",
    shortBlurb:
      "Attentive, patient-centered visits with clear explanations and support for day-to-day health.",
    bio:
      "Ntoge Penda is a nurse practitioner focused on patient-centered primary care. She takes time to listen, answer questions, and make sure patients feel heard and understood. She enjoys helping patients navigate both routine visits and ongoing conditions, with a calm, supportive presence and an emphasis on clear, practical guidance.",
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((doc) => doc.slug === slug);
}

// ✅ Back-compat for any code still importing `doctorCards`
export const doctorCards = doctors;
