"use client";

import {
  MAPS_DIRECTIONS_URL,
  PRACTICE_ADDRESS_LINE1,
  PRACTICE_CITY_STATE_ZIP,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";

export function StickyFooterBar() {
  const tel = PRACTICE_PHONE_TEL;
  const mapsLink = MAPS_DIRECTIONS_URL;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-teal-200/60 bg-white/95 backdrop-blur">
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
            className="rounded-full border border-teal-300 bg-teal-50 px-3 py-1 font-semibold text-slate-900 hover:bg-teal-100"
          >
            Get directions
          </a>
          <a
            href={`tel:${tel}`}
            className="rounded-full bg-teal-500 px-4 py-1.5 font-semibold text-white shadow-md shadow-teal-500/20 hover:bg-teal-400"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
