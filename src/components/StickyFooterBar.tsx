"use client";

import { useEffect, useState } from "react";
import {
  MAPS_DIRECTIONS_URL,
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
} from "@/lib/constants";

/**
 * Quick actions only — full address / identity live in the site footer above.
 * Hides while the footer is in view to avoid repeating the same contact block.
 */
export function StickyFooterBar() {
  const [showBar, setShowBar] = useState(true);
  const tel = PRACTICE_PHONE_TEL;
  const mapsLink = MAPS_DIRECTIONS_URL;

  useEffect(() => {
    const footer = document.querySelector(
      'footer[aria-label="Site footer"]',
    );
    if (!footer) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setShowBar(!entry.isIntersecting);
      },
      { threshold: 0, root: null },
    );

    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-teal-200/60 bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur transition-transform duration-300 ease-out motion-reduce:transition-none ${
        showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      role="region"
      aria-label="Quick contact: directions and phone"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 md:gap-4 md:py-2.5">
        <span className="sr-only">
          Call or get directions. Full address and hours are in the footer
          above when you scroll to the bottom of the page.
        </span>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-teal-300 bg-teal-50 px-4 py-2 text-center text-[11px] font-semibold text-slate-900 hover:bg-teal-100 md:min-h-0 md:min-w-0 md:text-xs"
        >
          Get directions
        </a>
        <a
          href={`tel:${tel}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-teal-500 px-5 py-2 text-[11px] font-semibold text-white shadow-md shadow-teal-500/20 hover:bg-teal-400 md:min-h-0 md:py-1.5 md:text-xs"
        >
          Call {PRACTICE_PHONE}
        </a>
      </div>
    </div>
  );
}
