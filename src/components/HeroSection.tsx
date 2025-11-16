// src/components/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { PRACTICE_PHONE } from "@/lib/constants";
import { doctors } from "@/data/doctors";

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll doctor cards
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollInterval: NodeJS.Timeout;

    function startScrolling() {
      scrollInterval = setInterval(() => {
        if (!container) return;
        container.scrollLeft += 1;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 2
        ) {
          container.scrollLeft = 0;
        }
      }, 40);
    }

    function stopScrolling() {
      clearInterval(scrollInterval);
    }

    startScrolling();
    container.addEventListener("mouseenter", stopScrolling);
    container.addEventListener("mouseleave", startScrolling);

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener("mouseenter", stopScrolling);
      container.removeEventListener("mouseleave", startScrolling);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBE7DF] to-[#FFF7F0] pb-12 pt-10 text-slate-900 md:pb-16 md:pt-14">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-64 w-64 rounded-full bg-[#FFD4C0]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-40 h-64 w-64 rounded-full bg-[#FCE0FF]/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center">
        {/* LEFT: main content */}
        <div>
          {/* top pill */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F29B82]" />
            Primary Care · Rockville, MD
          </p>

          {/* tagline with premium stethoscope icon */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-11 md:w-11">
              <Image
                src="/icons/stethoscope.svg"
                alt="Stethoscope icon"
                fill
                className="drop-shadow-[0_0_10px_rgba(242,155,130,0.55)]"
              />
            </div>
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              We care for you...
            </h1>
          </div>

          {/* subheading copy */}
          <p className="mt-4 max-w-2xl text-sm text-slate-700 md:text-base">
            Primary care with heart, expertise, and a personal touch — serving
            individuals and families in Rockville, Maryland.
          </p>

          {/* buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${PRACTICE_PHONE.replace(/[^0-9]/g, "")}`}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-slate-900"
            >
              Call {PRACTICE_PHONE}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-slate-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white"
            >
              New patient info
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            Established patients: please use the patient portal for secure
            messages and medical questions.
          </p>
        </div>

        {/* RIGHT: doctor cards – now LINK to individual pages */}
        <div className="flex flex-col">
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F29B82]" />
            <span>Meet your care team</span>
          </p>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-hidden pb-2 pt-1"
          >
            {[...doctors, ...doctors].map((doc, index) => (
              <Link
                key={doc.slug + index}
                href={`/clinicians/${doc.slug}`}
                className="relative flex min-w-[230px] max-w-[250px] flex-col rounded-3xl border border-[#F3D3C6] bg-white/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative mb-3 h-28 w-full overflow-hidden rounded-2xl bg-[#FFE7DA]">
                  <Image
                    src={doc.imageSrc}
                    alt={doc.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {doc.name}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-[#D46A4A]">
                  {doc.title}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-700">
                  {doc.shortBlurb}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-1 text-[11px] text-slate-500">
            Tap or click a profile to read more about each clinician.
          </p>
        </div>
      </div>
    </section>
  );
}
