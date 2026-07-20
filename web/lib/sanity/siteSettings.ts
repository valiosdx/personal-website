import { cache } from "react";
import type { SiteSettings } from "@/types/siteSettings";
import { sanityFetch } from "@/lib/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";

export const getSiteSettings = cache(async () => {
  return sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);
});

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return undefined;
  }

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}
