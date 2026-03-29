"use client";

import { useState } from "react";

const TABS = [
  {
    id: "medicare",
    label: "Medicare & MA",
    items: [
      "Medicare",
      "CareFirst Medicare Advantage",
      "Aetna Medicare Advantage",
      "UHC Medicare Advantage",
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    items: [
      "CareFirst (BCBS)",
      "Aetna",
      "Cigna",
      "UnitedHealthcare (UHC)",
      "UMR",
      "GEHA",
    ],
  },
  {
    id: "medicaid",
    label: "Medicaid & managed",
    items: [
      "Maryland Medicaid",
      "CareFirst Community",
      "Maryland Physicians Care",
      "Wellpoint — Amerigroup",
      "Priority Partners",
      "Aetna Better Health (pending; previously enrolled)",
      "Johns Hopkins Health Plans",
    ],
  },
] as const;

export function InsuranceTabs() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 border-b border-slate-200 pb-3"
        role="tablist"
        aria-label="Insurance plan categories"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${tab.id}`}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition md:text-sm ${
              active === i
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {TABS.map((tab, i) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={active !== i}
            className={active === i ? "block" : "hidden"}
          >
            <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 text-sm text-slate-800">
              {tab.items.map((line) => (
                <li key={line} className="px-3 py-2.5">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
