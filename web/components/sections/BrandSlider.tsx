"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { brandSliderVariants, getBrandSliderTransition } from "@/lib/motion";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type BrandSliderData = Homepage["brandSlider"];

type BrandSliderProps = {
  data?: BrandSliderData;
  className?: string;
};

type BrandItem = NonNullable<NonNullable<BrandSliderData>["brands"]>[number];

type BrandWithLogo = Omit<BrandItem, "logo"> & {
  logo: NonNullable<BrandItem["logo"]>;
};

function hasLogo(brand: BrandItem): brand is BrandWithLogo {
  return brand.logo !== undefined && brand.logo !== null;
}

function BrandLogo({ brand }: { brand: BrandWithLogo }) {
  const imageUrl = urlFor(brand.logo)
    .width(640)
    .fit("max")
    .auto("format")
    .url();

  const itemClassName =
    "flex h-[90px] w-[33.333vw] shrink-0 items-center justify-center md:h-[120px] md:w-[25vw] lg:w-[16.666vw]";

  const logo = (
    <span className="flex h-[90px] w-full items-center justify-center px-6 md:h-[120px] md:px-10">
      <Image
        src={imageUrl}
        alt={brand.alt || "Brand logo"}
        width={640}
        height={180}
        sizes="(min-width: 1024px) 16.666vw, (min-width: 768px) 25vw, 33.333vw"
        className="brand-slider-logo h-auto max-h-[90px] w-auto max-w-full object-contain md:max-h-[120px]"
        draggable={false}
      />
    </span>
  );

  if (brand.url) {
    return (
      <a
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        aria-label={brand.alt || "Open brand website"}
        className={itemClassName}
      >
        {logo}
      </a>
    );
  }

  return <div className={itemClassName}>{logo}</div>;
}

const SPEED_PER_ITEM = 4;
const MINIMUM_DURATION = 8;

export function BrandSlider({ data, className }: BrandSliderProps) {
  const brands: BrandWithLogo[] = (data?.brands ?? []).filter(hasLogo);

  if (!brands.length) return null;

  const duplicatedBrands = [...brands, ...brands];

  const duration = Math.max(brands.length * SPEED_PER_ITEM, MINIMUM_DURATION);

  return (
    <section
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-white py-5 md:py-0 ",
        className,
      )}
    >
      <motion.div
        className="flex w-max shrink-0 items-center"
        variants={brandSliderVariants}
        initial="initial"
        animate="animate"
        transition={getBrandSliderTransition(duration)}
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <BrandLogo
            key={`${brand._key ?? brand.alt ?? "brand"}-${index}`}
            brand={brand}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent md:w-44" />

      <div className="pointer-events-noneName=pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent md:w-44" />

      <div className="pointer-events absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent md:w-44" />
    </section>
  );
}
