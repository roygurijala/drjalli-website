"use client";

import QRCode from "react-qr-code";
import Image from "next/image";

type Props = {
  /** The URL or text the QR should encode */
  value: string;
  /** Optional logo path under /public (default = /images/Jalli_high_res_logo.png) */
  logoSrc?: string;
  /** Pixel size of the QR (SVG scales crisply) */
  size?: number;
  /** Extra className for the outer card */
  className?: string;
};

export default function BrandedQRCode({
  value,
  logoSrc = "/images/Jalli_high_res_logo.png",
  size = 240,
  className,
}: Props) {
  // Badge (logo) is ~22–26% of QR; adjust if your logo is visually dense
  const badgeSize = Math.round(size * 0.24);
  const pad = Math.round(badgeSize * 0.14);

  return (
    <div
    className={`relative inline-block rounded-3xl border border-[#F4D9CA] bg-white/80 p-3 shadow-sm ${className ?? ""}`}
    >
      {/* Peach backdrop behind the QR */}
      <div className="rounded-2xl bg-[#FFF7F0] p-2">
        <div
          className="relative"
          style={{ width: size, height: size }}
          aria-label="Branded QR code"
        >
          <QRCode
            value={value}
            size={size}
            level="H"             // High error correction => safe with center logo
            bgColor="#FFF7F0"     // matches your theme
            fgColor="#141414"     // near-black for high contrast
          />

          {/* Center logo badge with padding + rounded + shadow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-md"
            style={{ width: badgeSize + pad * 2, height: badgeSize + pad * 2 }}
          >
            <div className="relative" style={{ width: "100%", height: "100%" }}>
              <Image
                src={logoSrc}
                alt="Practice logo"
                fill
                className="p-[var(--p)] object-contain"
                style={{ ["--p" as any]: `${pad}px` }}
                sizes={`${badgeSize + pad * 2}px`}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-slate-600">Scan to open maps</p>
    </div>
  );
}
