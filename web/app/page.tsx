import { Header } from "@/components/layout/Header";
import { sanityFetch } from "@/lib/sanity/fetch";
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
  const homepage = await sanityFetch<Homepage | null>(HOMEPAGE_QUERY);

  return (
    <main className="min-h-dvh bg-white text-black">
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
