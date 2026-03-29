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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-teal-200/60 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 text-[11px] md:py-2 md:text-xs">
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
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-teal-300 bg-teal-50 px-3 py-2 text-center font-semibold text-slate-900 hover:bg-teal-100 md:min-h-0 md:min-w-0 md:py-1"
          >
            Get directions
          </a>
          <a
            href={`tel:${tel}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-teal-500 px-4 py-2 font-semibold text-white shadow-md shadow-teal-500/20 hover:bg-teal-400 md:min-h-0 md:py-1.5"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
