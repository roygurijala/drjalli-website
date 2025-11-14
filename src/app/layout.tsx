import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { defaultMeta, generateOrganizationJsonLd } from "@/lib/seo";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        {/* JSON-LD for MedicalOrganization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
