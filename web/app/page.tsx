import { Header } from "@/components/layout/Header";
import { sanityFetch } from "@/lib/sanity/fetch";
import { getSiteSettings, getSiteUrl } from "@/lib/sanity/siteSettings";
import { HOMEPAGE_QUERY } from "@/lib/sanity/queries";
import type { Homepage } from "@/types/homepage";
import { Hero } from "@/components/sections/Hero";
import { BrandSlider } from "@/components/sections/BrandSlider";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { About } from "@/components/sections/About";
import { Service } from "@/components/sections/Service";
import { Collection } from "@/components/sections/Collection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [homepage, siteSettings] = await Promise.all([
    sanityFetch<Homepage | null>(HOMEPAGE_QUERY),
    getSiteSettings(),
  ]);

  const siteUrl = getSiteUrl()?.toString();
  const personName = siteSettings?.siteName || homepage?.header?.name;
  const sameAs =
    homepage?.contact?.socials
      ?.map((social) => social.url)
      .filter((url): url is string => Boolean(url)) ?? [];

  const structuredData = personName
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": siteUrl ? `${siteUrl}#website` : undefined,
            url: siteUrl,
            name: siteSettings?.siteName || personName,
            description: siteSettings?.seoDescription,
          },
          {
            "@type": "Person",
            "@id": siteUrl ? `${siteUrl}#person` : undefined,
            name: personName,
            url: siteUrl,
            email: homepage?.contact?.email || undefined,
            telephone: homepage?.contact?.phone || undefined,
            sameAs: sameAs.length ? sameAs : undefined,
          },
        ],
      }
    : null;

  return (
    <main className="min-h-dvh bg-white text-black">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <Header data={homepage?.header} />
      <Hero data={homepage?.hero} />
      <BrandSlider data={homepage?.brandSlider} />
      <FeaturedProject data={homepage?.featuredProject} />
      <About data={homepage?.about} />
      <Service data={homepage?.service} />
      <Collection data={homepage?.collection} />
      <Contact data={homepage?.contact} />
      <Footer data={homepage?.copyright} />
    </main>
  );
}
