// src/components/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { doctorCards as doctors } from "@/data/doctors";
import {
  PRACTICE_PHONE,
  PRACTICE_PHONE_TEL,
  PRACTICE_HEADER_TAGLINE,
} from "@/lib/constants";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  containScroll: "trimSnaps",
  align: "center",
};

const PORTAL_URL = "https://30779-1.portal.athenahealth.com/";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "3", label: "Expert Clinicians" },
  { value: "Same-Week", label: "New Patient Appts" },
  { value: "15+", label: "Insurance Plans Accepted" },
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay every 5s
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi && emblaApi.scrollTo(i),
    [emblaApi]
  );

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white" aria-label="Hero">
      {/* ─── Animated background ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-pattern" />
        {/* Gradient orbs */}
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-600/8 blur-3xl" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950/50" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20 lg:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-16">

          {/* ─── Left: Text ─────────────────────────────────────────────── */}
          <div className="animate-fade-in-up">
            {/* Live badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-semibold text-teal-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" style={{ animationDuration: "2s" }} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-400" />
              </span>
              Accepting new patients. Same-week appointments often available
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white text-balance md:text-5xl lg:text-[3.5rem]">
              We <span className="text-gradient-teal">care</span> for you…
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
              Primary care with heart, expertise, and a personal touch — serving
              individuals and families in Rockville, Maryland.
            </p>
            <p className="mt-4 max-w-lg border-l-2 border-teal-500/35 pl-3 text-xs leading-relaxed text-slate-400 md:text-sm">
              {PRACTICE_HEADER_TAGLINE}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${PRACTICE_PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:bg-teal-400 hover:shadow-teal-400/30 hover:shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 flex-shrink-0"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Schedule: {PRACTICE_PHONE}
              </a>

              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/30 hover:bg-white/15"
              >
                Patient Portal ↗
              </a>
            </div>

            {/* Trust pills — InBody links to the full guide */}
            <div className="mt-6 flex flex-wrap gap-2">
              {(
                [
                  { label: "Medicare Accepted" },
                  { label: "InBody Analysis", href: "/inbody" },
                  { label: "ABI Testing" },
                  { label: "Allergy Testing" },
                  { label: "Nutrition Counseling" },
                  { label: "Telehealth Available" },
                  { label: "Same-Day Sick Visits" },
                ] as const
              ).map((pill) =>
                "href" in pill && pill.href ? (
                  <Link
                    key={pill.label}
                    href={pill.href}
                    className="rounded-full border border-teal-400/35 bg-teal-400/15 px-3 py-1 text-[11px] font-medium text-teal-200 transition hover:border-teal-300/50 hover:bg-teal-400/25 hover:text-white"
                  >
                    {pill.label} →
                  </Link>
                ) : (
                  <span
                    key={pill.label}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300"
                  >
                    {pill.label}
                  </span>
                )
              )}
            </div>

            {/* Stats bar */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-teal-400">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-tight text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right: Clinician Carousel ──────────────────────────────── */}
          <div
            className="animate-fade-in-up stagger-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
              {/* Header label */}
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-teal-400/80">
                  Meet Our Clinicians
                </span>
                <Link
                  href="/clinicians"
                  className="text-[11px] text-slate-400 hover:text-teal-300 transition-colors"
                >
                  View all →
                </Link>
              </div>

              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {doctors.map((doc, i) => (
                    <div
                      key={doc.slug}
                      className="embla__slide shrink-0 basis-[80%] px-2 sm:basis-[55%] md:basis-[75%] lg:basis-[55%]"
                      aria-label={`${doc.name}, ${doc.title}`}
                    >
                      <Link
                        href={`/clinicians/${doc.slug}`}
                        className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-teal-400/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-navy-900"
                      >
                        {/* Photo */}
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                          <Image
                            src={
                              doc.imageSrc ??
                              "/images/doctors/doctor-placeholder.svg"
                            }
                            alt={doc.imageAlt ?? doc.name}
                            fill
                            priority={i === 0}
                            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 55vw, 45vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                        </div>

                        {/* Name + title */}
                        <div className="px-4 pb-5 pt-3 text-center">
                          <p className="font-display text-sm font-semibold text-white md:text-base">
                            {doc.name}
                          </p>
                          <p className="mt-1 text-xs text-teal-300">
                            {doc.credentials ?? doc.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {doc.title}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="mt-3 flex items-center justify-center gap-2">
                {doctors.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to clinician ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === selectedIndex
                        ? "w-6 bg-teal-400"
                        : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
