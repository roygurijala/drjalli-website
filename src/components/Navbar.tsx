// src/components/Navbar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRACTICE_NAME, PRACTICE_PHONE } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/clinicians", label: "Our Clinicians" },
  { href: "/services", label: "Services" },
  { href: "/patient-resources", label: "Patient Resources" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const tel = PRACTICE_PHONE.replace(/[^0-9]/g, "");
  const mapsLink =
    "https://www.google.com/maps?q=Dr.+Jalli+MD+PC+2401+Research+Blvd+Suite+330+Rockville+MD+20850";

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo + practice name */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F29B82] text-xs font-semibold text-white shadow-sm">
            DJ
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              {PRACTICE_NAME}
            </span>
            <span className="text-[11px] text-slate-500">
              Primary Care · Rockville, MD
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                pathname === link.href
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Directions
          </a>

          <a
            href={`tel:${tel}`}
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span className="material-icons text-slate-700 text-xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 text-sm font-medium ${
                  pathname === link.href
                    ? "text-slate-900"
                    : "text-slate-700 hover:text-slate-900"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2">
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Directions
              </a>
              <a
                href={`tel:${tel}`}
                className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900"
              >
                Call {PRACTICE_PHONE}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
