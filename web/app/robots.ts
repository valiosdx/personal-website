import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/sanity/siteSettings";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: siteUrl ? new URL("/sitemap.xml", siteUrl).toString() : undefined,
    host: siteUrl?.origin,
  };
}
