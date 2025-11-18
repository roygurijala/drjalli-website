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
    imageSrc: "/images/doctors/doctor-placeholder.svg",
    imageAlt: "Portrait of Dr. Sireesha Jalli",
    shortBlurb:
      "Compassionate, relationship-based primary care with a focus on prevention and long-term health.",
    bio:
      "Dr. Sireesha Jalli is a board-certified internal medicine physician and Fellow of the American College of Physicians (FACP). She has more than two decades of experience caring for adults in primary care. Her approach is relationship-based and grounded in evidence, with a strong focus on prevention, early detection, and helping patients understand their health in a clear, practical way. She enjoys long-term continuity with her patients and believes good care happens when there is time, listening, and shared decision-making.",
  },
  {
    slug: "mythili-vancha",
    name: "Dr. Mythili Vancha, MD",
    title: "Primary Care Physician",
    credentials: "Board-Certified in Internal Medicine",
    imageSrc: "/images/doctors/doctor-placeholder.svg",
    imageAlt: "Portrait of Dr. Mythili Vancha",
    shortBlurb:
      "Thorough, communicative care that helps patients understand their conditions and options.",
    bio:
      "Dr. Mythili Vancha is a board-certified internist providing comprehensive adult primary care. She is known for her careful, thorough approach and the time she spends explaining conditions, test results, and treatment options. Her interests include chronic disease management, preventive care, and working with patients to create realistic, sustainable health plans that fit their day-to-day lives.",
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
