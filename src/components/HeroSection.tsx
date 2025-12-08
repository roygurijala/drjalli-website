"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel"; // <-- from core, not react
import { doctorCards as doctors } from "@/data/doctors";


const OPTIONS: EmblaOptionsType = {
  loop: true,
  containScroll: "trimSnaps",
  align: "center",
};

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay every 5s; pause on hover/touch
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
    <section className="relative bg-[#FFF7F0]">
      {/* Toned-down heading area */}
      <div className="mx-auto max-w-6xl px-4 pt-10 text-center md:pt-14">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800 md:text-3xl">
          <span className="text-slate-700">We care for you</span>
          <span aria-hidden>…</span>
        </h1>

        <p className="mx-auto mt-3 max-w-3xl text-[13px] leading-6 text-slate-600 md:text-sm">
          Primary care with heart, expertise, and a personal touch — serving individuals and
          families in Rockville, Maryland.
        </p>
      </div>

      {/* Carousel */}
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 md:pb-12">
        <div
          className="rounded-2xl border border-[#F3D3C6] bg-white/80 p-3 shadow-sm"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {doctors.map((doc, i) => (
                <div
                  key={doc.slug}
                  className="embla__slide shrink-0 px-2 basis-[85%] sm:basis-[60%] md:basis-[46%] lg:basis-[32%]"
                  aria-label={`Clinician ${i + 1} of ${doctors.length}`}
                >
                  <Link
                    href={`/clinicians/${doc.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-[#F3D3C6] bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F29B82] focus:ring-offset-2"
                  >
                    <div className="relative mb-4 w-full overflow-hidden rounded-3xl bg-[#FFE7DA] aspect-[3/4]">
                      <Image
                        src={doc.imageSrc ?? (doc as any).image ?? "/images/doctors/doctor-placeholder.svg"}
                        alt={doc.imageAlt ?? doc.name}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, (max-width: 1280px) 46vw, 32vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-[15px] font-semibold text-slate-900 md:text-base">
                        {doc.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 md:text-sm">{doc.title}</p>
                    </div>
                    <div className="pointer-events-none h-1 w-full bg-gradient-to-r from-[#F29B82]/40 via-[#F7C0A7]/50 to-[#F29B82]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === selectedIndex ? "bg-[#F29B82]" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
