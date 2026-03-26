// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { PRACTICE_NAME, PRACTICE_PHONE, PRACTICE_PHONE_TEL } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/clinicians", label: "Our Team" },
  { href: "/services", label: "Services" },
  { href: "/patient-resources", label: "Patients" },
  { href: "/contact", label: "Contact" },
];

const PORTAL_URL = "https://30779-1.portal.athenahealth.com/";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-navy-900/95 shadow-2xl shadow-black/30 backdrop-blur-xl"
          : "bg-navy-900"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-3.5">

        {/* ─── Logo ──────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Dr. Jalli MD PC home">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1 transition group-hover:border-teal-400/30 group-hover:bg-white/10">
            <Image
              src="/Jalli%20Logo.jpg"
              alt="Dr. Jalli MD PC logo"
              width={34}
              height={34}
              className="rounded-lg"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold text-white">{PRACTICE_NAME}</span>
            <span className="text-[10px] font-medium text-teal-400">
              Primary Care · Rockville, MD
            </span>
          </div>
        </Link>

        {/* ─── Desktop Nav Links ─────────────────────────────────────────── */}
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  active
                    ? "bg-teal-400/10 text-teal-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-teal-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* ─── Desktop CTAs ──────────────────────────────────────────────── */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium text-slate-300 transition hover:border-teal-400/40 hover:text-teal-300"
          >
            Patient Portal ↗
          </a>
          <a
            href={`tel:${PRACTICE_PHONE_TEL}`}
            className="rounded-full bg-teal-500 px-4 py-2 text-[11px] font-semibold text-white shadow-md shadow-teal-500/20 transition hover:bg-teal-400 hover:shadow-teal-400/30"
          >
            Call {PRACTICE_PHONE}
          </a>
        </div>

        {/* ─── Mobile Hamburger ──────────────────────────────────────────── */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </nav>

      {/* ─── Mobile Dropdown ───────────────────────────────────────────────── */}
      {open && (
        <div className="border-t border-white/8 bg-navy-900/98 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-teal-400/10 text-teal-300"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-white/8 pt-3">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 py-2.5 text-center text-xs font-medium text-slate-300"
              >
                Patient Portal ↗
              </a>
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="rounded-full bg-teal-500 py-2.5 text-center text-xs font-semibold text-white shadow-md"
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
