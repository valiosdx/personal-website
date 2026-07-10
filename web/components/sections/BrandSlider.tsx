import Image from "next/image";

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

  const logo = (
    <span className="flex h-24 w-full items-center justify-center px-6 md:px-10">
      <Image
        src={imageUrl}
        alt={brand.alt || "Brand logo"}
        width={640}
        height={180}
        sizes="(min-width: 1024px) 16.666vw, (min-width: 768px) 25vw, 33.333vw"
        className="brand-slider-logo h-auto max-h-20 w-auto max-w-full object-contain"
        draggable={false}
      />
    </span>
  );

  const className =
    "flex h-24 w-[33.333vw] shrink-0 items-center justify-center md:w-[25vw] lg:w-[16.666vw]";

  if (brand.url) {
    return (
      <a
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        aria-label={brand.alt || "Open brand website"}
        className={className}
      >
        {logo}
      </a>
    );
  }

  return <div className={className}>{logo}</div>;
}

export function BrandSlider({ data, className }: BrandSliderProps) {
  const brands: BrandWithLogo[] = (data?.brands ?? []).filter(hasLogo);

  if (!brands.length) return null;

  return (
    <section
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-white py-5 md:py-0",
        className,
      )}
    >
      <div className="flex w-screen justify-center overflow-visible">
        <div className="flex w-max min-w-max shrink-0 items-center justify-center">
          {brands.map((brand, index) => (
            <BrandLogo
              key={brand._key ?? `${brand.alt}-${index}`}
              brand={brand}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-white/0 md:w-44" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-white/0 md:w-44" />
    </section>
  );
}
