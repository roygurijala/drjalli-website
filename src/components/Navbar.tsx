"use client";

import Link from "next/link";
import { PRACTICE_NAME, PRACTICE_PHONE } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/patient-resources", label: "Patient Resources" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-brand flex items-center justify-center text-white font-semibold">
            DJ
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              {PRACTICE_NAME}
            </span>
            <span className="text-xs text-slate-500">
              Primary Care · Rockville, MD
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-brand ${
                pathname === link.href ? "text-brand" : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>

        {/* Mobile */}
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

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 text-sm font-medium ${
                  pathname === link.href ? "text-brand" : "text-slate-700"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Call {PRACTICE_PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
