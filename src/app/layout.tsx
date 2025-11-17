import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";

export const metadata: Metadata = {
  title: "Dr. Jalli MD PC · Primary Care in Rockville, MD",
  description:
    "Compassionate primary care services provided by Dr. Sireesha Jalli MD FACP and team in Rockville, Maryland.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-neutralBg text-slate-900 antialiased"
        suppressHydrationWarning
      >
        {/* Global Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-0">{children}</main>

        {/* Floating AI Assistant */}
        <FloatingChatWidget />
      </body>
    </html>
  );
}
