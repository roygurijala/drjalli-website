// src/app/robots.ts
// Next.js App Router robots.txt generator
import type { MetadataRoute } from "next";
import { PRACTICE_DOMAIN } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/chat"],
      },
    ],
    sitemap: `${PRACTICE_DOMAIN}/sitemap.xml`,
    host: PRACTICE_DOMAIN,
  };
}
