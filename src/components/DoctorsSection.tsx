import Image from "next/image";

type Doctor = {
  name: string;
  title: string;
  credentials?: string;
  imageSrc: string;
  imageAlt: string;
  blurb: string;
};

const doctors: Doctor[] = [
  {
    name: "Dr. Sireesha Jalli",
    title: "MD, FACP · Primary Care Physician",
    credentials: "Board-Certified in Internal Medicine",
    imageSrc: "/images/doctors/sireesha-jalli.jpg",
    imageAlt: "Portrait of Dr. Sireesha Jalli",
    blurb:
      "Dr. Sireesha Jalli is a compassionate and experienced primary care physician with over 20 years of clinical experience. She believes in long-term relationships, clear communication, and evidence-based care focused on prevention and early detection.",
  },
  {
    name: "Dr. Mythili Vancha",
    title: "MD · Primary Care Physician",
    credentials: "Board-Certified in Internal Medicine",
    imageSrc: "/images/doctors/mythili-vancha.jpg",
    imageAlt: "Portrait of Dr. Mythili Vancha",
    blurb:
      "Dr. Mythili Vancha provides comprehensive adult primary care with a thoughtful, communicative approach. She emphasizes patient education and shared decision-making, especially in chronic disease management and preventive care.",
  },
  {
    name: "Ntoge Penda",
    title: "Nurse Practitioner",
    credentials: "Advanced Practice Provider",
    imageSrc: "/images/doctors/ntoge-penda.jpg",
    imageAlt: "Portrait of Nurse Practitioner Ntoge Penda",
    blurb:
      "Ntoge Penda is a dedicated nurse practitioner focused on timely, attentive, and patient-centered care. She helps patients navigate both routine visits and ongoing conditions with a calm, supportive presence.",
  },
];

export function DoctorsSection() {
  return (
    <section id="clinicians" className="bg-neutralBg py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Meet Our Clinicians
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-700 md:text-base">
              Our team works together to deliver thoughtful, relationship-based
              primary care. We want every visit to feel unhurried, respectful,
              and focused on what matters most to you.
            </p>
          </div>
          <p className="text-[11px] text-slate-500 md:text-xs">
            For emergencies, please call 911 or go to the nearest emergency
            room.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {doctors.map((doc, idx) => (
            <article
              key={doc.name}
              className={`group flex h-full flex-col rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                idx === 0
                  ? "border-[#F3B7A2] bg-[#FFF2EC]"
                  : idx === 1
                  ? "border-[#E6C2FF] bg-[#F8EDFF]"
                  : "border-[#E5E7EB] bg-white"
              }`}
            >
              <div className="relative mb-4 h-56 w-full overflow-hidden rounded-3xl bg-[#FFE7DA]">
                <Image
                  src={doc.imageSrc}
                  alt={doc.imageAlt}
                  fill
                  className="object-cover transition group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-slate-900">
                  {doc.name}
                </h3>
                <p className="text-xs font-medium text-[#D46A4A] md:text-sm">
                  {doc.title}
                </p>
                {doc.credentials && (
                  <p className="text-[11px] text-slate-600 md:text-xs">
                    {doc.credentials}
                  </p>
                )}
              </div>

              <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-700 md:text-sm">
                {doc.blurb}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Caring for adults in Rockville and the surrounding community.
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
