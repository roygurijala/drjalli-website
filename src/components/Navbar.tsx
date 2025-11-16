"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRACTICE_NAME, PRACTICE_PHONE } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/clinicians", label: "Our Clinicians" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/patient-resources", label: "Patient Resources" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#F4D9CA] bg-white/85 shadow-[0_1px_0_rgba(244,217,202,0.6)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">

        {/* LEFT SIDE: LOGO + PRACTICE NAME */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            DJ
          </div>

          <span className="text-base font-extrabold tracking-tight text-slate-900 md:text-lg">
            {PRACTICE_NAME}
          </span>
        </div>

        {/* RIGHT SIDE LINKS */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors hover:text-slate-900 ${
                pathname === link.href ? "text-slate-900" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
            className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-900"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>

        {/* MOBILE NAV BUTTON */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span className="material-icons text-xl text-slate-700">
            {open ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-[#F4D9CA] bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 text-sm font-medium ${
                  pathname === link.href ? "text-slate-900" : "text-slate-700"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Call {PRACTICE_PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
