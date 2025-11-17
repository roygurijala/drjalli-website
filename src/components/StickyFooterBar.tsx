"use client";

import { PRACTICE_ADDRESS_LINE1, PRACTICE_CITY_STATE_ZIP, PRACTICE_PHONE } from "@/lib/constants";

export function StickyFooterBar() {
  const tel = PRACTICE_PHONE.replace(/[^0-9]/g, "");
  const mapsLink =
    "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20850";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F4D9CA] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[11px] md:text-xs">
        <div className="hidden flex-col md:flex">
          <span className="font-semibold text-slate-900">Dr. Jalli MD PC</span>
          <span className="text-slate-600">
            {PRACTICE_ADDRESS_LINE1}, {PRACTICE_CITY_STATE_ZIP}
          </span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-3 md:justify-end">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#FFE7DA] px-3 py-1 font-semibold text-slate-900 hover:bg-[#FBD7C2]"
          >
            Get directions
          </a>
          <a
            href={`tel:${tel}`}
            className="rounded-full bg-black px-4 py-1.5 font-semibold text-white shadow-sm hover:bg-slate-900"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
