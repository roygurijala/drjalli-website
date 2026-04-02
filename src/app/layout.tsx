// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";
import { Footer } from "@/components/Footer";
import { StickyFooterBar } from "@/components/StickyFooterBar";
import {
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/seo";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ─── Root Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.drjalli.com"),

  title: {
    default: "Dr. Jalli MD PC | Primary Care in Rockville, MD",
    template: "%s | Dr. Jalli MD PC",
  },

  description:
    "Board-certified primary care physicians in Rockville, Maryland. Dr. Sireesha Jalli MD FACP and team provide internal medicine, preventive care, chronic disease management, InBody body composition, ABI testing, allergy testing, nutrition counseling, and same-week appointments. Accepting new patients.",

  keywords: [
    "primary care Rockville MD",
    "internal medicine Rockville Maryland",
    "Dr. Sireesha Jalli",
    "family doctor Rockville",
    "doctor near me Rockville",
    "primary care physician Montgomery County",
    "InBody body composition analysis",
    "ABI testing Rockville MD",
    "allergy testing primary care Rockville",
    "nutrition counseling Rockville MD",
    "metabolic health Rockville",
    "Medicare doctor Rockville MD",
    "board certified internist Rockville",
    "preventive care Rockville",
    "new patient primary care Maryland",
    "AthenaHealth patient portal",
    "home sleep study Rockville MD",
    "sleep apnea testing",
  ],

  authors: [{ name: "Dr. Jalli MD PC", url: "https://www.drjalli.com" }],

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.drjalli.com",
    siteName: "Dr. Jalli MD PC",
    title: "Dr. Jalli MD PC | Primary Care in Rockville, MD",
    description:
      "Board-certified primary care in Rockville, MD. InBody, ABI testing, allergy testing, nutrition counseling, preventive care. Accepting new patients.",
    images: [
      {
        url: "/images/Jalli_high_res_logo.png",
        width: 1200,
        height: 630,
        alt: "Dr. Jalli MD PC — Primary Care in Rockville, MD",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dr. Jalli MD PC | Primary Care in Rockville, MD",
    description:
      "Board-certified primary care in Rockville, MD. InBody, ABI testing, allergy testing, nutrition counseling. Accepting new patients.",
    images: ["/images/Jalli_high_res_logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  alternates: {
    canonical: "https://www.drjalli.com",
  },

  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",  // add when available
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1628",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationJsonLd();
  const localBizSchema = generateLocalBusinessJsonLd();
  const webSiteSchema = generateWebSiteJsonLd();

  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable}`}>
      <head>
        {/* Structured data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Structured data: LocalBusiness (for Google Maps / local SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
        />
        {/* Structured data: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen overflow-x-clip bg-neutralBg text-slate-900 antialiased">
        <AnnouncementBar />
        <Navbar />
        {/* Bottom padding clears fixed StickyFooterBar + home indicator; chat FAB sits above bar */}
        <main className="pb-[calc(5rem+env(safe-area-inset-bottom))] pt-0 md:pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          {children}
        </main>
        <Footer />
        <StickyFooterBar />
        <FloatingChatWidget />
      </body>
    </html>
  );
}
