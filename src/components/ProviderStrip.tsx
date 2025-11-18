// src/components/ProviderStrip.tsx

import React from "react";

const providers = [
  {
    name: "Dr. Sireesha Jalli, MD, FACP",
    role: "Primary Care Physician",
    image: "/images/providers/jalli.jpg",
  },
  {
    name: "Dr. Mythili Vancha, MD",
    role: "Primary Care Physician",
    image: "/images/providers/vancha.jpg",
  },
  {
    name: "Ntoge Penda, CRNP",
    role: "Nurse Practitioner",
    image: "/images/providers/penda.jpg",
  },
];

export default function ProviderStrip() {
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {providers.map((p) => (
        <div
          key={p.name}
          className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white shadow-sm min-w-[220px]"
        >
          <img
            src={p.image}
            alt={p.name}
            className="h-10 w-10 rounded-full object-cover bg-gray-200"
          />
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {p.name}
            </div>
            <div className="text-xs text-gray-600">{p.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
