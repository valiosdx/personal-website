import Image from "next/image";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { Container } from "@/components/ui/Container";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type CollectionData = Homepage["collection"];

type CollectionProps = {
  data?: CollectionData;
  className?: string;
};

type CollectionItem = NonNullable<NonNullable<CollectionData>["items"]>[number];

type CollectionItemWithContent = CollectionItem & {
  _key: string;
};

function hasCollectionItemContent(
  item: CollectionItem,
): item is CollectionItemWithContent {
  return Boolean(
    item?._key && (item.title || item.description || item.image || item.url),
  );
}

function hasCollectionContent(data?: CollectionData) {
  return Boolean(
    data?.title ||
    data?.description ||
    data?.items?.some(hasCollectionItemContent),
  );
}

function CollectionHeader({ data }: { data?: CollectionData }) {
  return (
    <div className="flex w-full flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
      {data?.title ? (
        <h2 className="w-full whitespace-pre-line font-inter text-[32px] font-medium leading-[132%] text-white md:max-w-[510px] md:text-5xl">
          {data.title}
        </h2>
      ) : null}

      {data?.description ? (
        <div className="flex w-full flex-col items-start justify-center gap-8 md:max-w-[510px]">
          <p className="w-full font-inter text-base font-normal leading-[150%] text-white/80 md:text-xl md:leading-[120%]">
            {data.description}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function CollectionImage({ item }: { item: CollectionItemWithContent }) {
  if (!item.image) {
    return (
      <div className="flex h-60 w-full shrink-0 items-center justify-center rounded-lg bg-neutral-500 md:flex-1 lg:flex-none">
        <span className="font-inter text-xs font-medium uppercase tracking-[0.08em] text-white/50">
          Collection
        </span>
      </div>
    );
  }

  const imageUrl = urlFor(item.image)
    .width(900)
    .height(620)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-lg bg-neutral-500 md:flex-1 lg:flex-none">
      <Image
        src={imageUrl}
        alt={item.image.alt || item.title || "Collection image"}
        fill
        sizes="(min-width: 1024px) 386px, (min-width: 768px) 294px, calc(100vw - 88px)"
        className="object-cover"
      />
    </div>
  );
}

function CollectionCard({
  item,
  index,
}: {
  item: CollectionItemWithContent;
  index: number;
}) {
  const content = (
    <article
      className={cn(
        "h-full w-full rounded-xl border border-[#DBDEE21F]/12 bg-[#4B5A50] p-5",
        "flex-col items-start gap-5",
        "md:flex-row md:items-start",
        "lg:flex-col",
        index === 0 && "flex",
        index === 1 && "hidden md:flex",
        index === 2 && "hidden lg:flex",
      )}
    >
      <CollectionImage item={item} />

      <div className="flex w-full flex-col items-start gap-1 md:flex-1 md:self-stretch md:justify-between md:gap-4 md:py-4 lg:flex-none lg:justify-start lg:gap-1 lg:py-0">
        {item.title ? (
          <h3 className="w-full whitespace-pre-line font-inter text-2xl font-semibold leading-7 text-white">
            {item.title}
          </h3>
        ) : null}

        {item.description ? (
          <p className="w-full font-inter text-base font-normal leading-6 text-white/80">
            {item.description}
          </p>
        ) : null}
      </div>
    </article>
  );

  if (!item.url) return content;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group block h-full w-full",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-white focus-visible:ring-offset-4",
        "focus-visible:ring-offset-neutral-700",
        index === 1 && "hidden md:block",
        index === 2 && "hidden lg:block",
      )}
    >
      <div className="h-full transition-opacity group-hover:opacity-80">
        {content}
      </div>
    </a>
  );
}

function CollectionList({ items }: { items: CollectionItemWithContent[] }) {
  const visibleItems = items.slice(0, 3);

  if (!visibleItems.length) return null;

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-stretch gap-6 lg:grid lg:grid-cols-3 lg:gap-5">
        {visibleItems.map((item, index) => (
          <CollectionCard key={item._key} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function CollectionControls() {
  return (
    <div
      className="flex w-full items-center justify-between"
      aria-hidden="true"
    >
      <div className="flex items-start justify-center gap-2">
        <span className="h-1.5 w-10 rounded-full bg-white md:h-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/60 md:h-2 md:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/60 md:h-2 md:w-2" />
      </div>

      <div className="flex items-start">
        <span className="flex h-12 w-12 items-center justify-center text-white/60 md:h-14 md:w-14">
          <MdArrowBack className="h-7 w-7 md:h-8 md:w-8" />
        </span>

        <span className="flex h-12 w-12 items-center justify-center text-white md:h-14 md:w-14">
          <MdArrowForward className="h-7 w-7 md:h-8 md:w-8" />
        </span>
      </div>
    </div>
  );
}

export function Collection({ data, className }: CollectionProps) {
  if (!hasCollectionContent(data)) return null;

  const items = data?.items?.filter(hasCollectionItemContent) ?? [];

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-[var(--color-primary-500)] py-10 md:py-14 lg:py-24",
        className,
      )}
    >
      <Container>
        <div className="flex w-full flex-col items-start gap-10 md:gap-14 lg:gap-24">
          <CollectionHeader data={data} />
          <CollectionList items={items} />
          {items.length ? <CollectionControls /> : null}
        </div>
      </Container>
    </section>
  );
}
