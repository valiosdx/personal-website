"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { Container } from "@/components/ui/Container";
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
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

function subscribeToViewport(callback: () => void) {
  const tabletQuery = window.matchMedia("(min-width: 768px)");

  const desktopQuery = window.matchMedia("(min-width: 1024px)");

  tabletQuery.addEventListener("change", callback);
  desktopQuery.addEventListener("change", callback);

  return () => {
    tabletQuery.removeEventListener("change", callback);

    desktopQuery.removeEventListener("change", callback);
  };
}

function getItemsPerPage() {
  if (window.matchMedia("(min-width: 1024px)").matches) {
    return 3;
  }

  if (window.matchMedia("(min-width: 768px)").matches) {
    return 2;
  }

  return 1;
}

function getServerItemsPerPage() {
  return 1;
}

function useItemsPerPage() {
  return useSyncExternalStore(
    subscribeToViewport,
    getItemsPerPage,
    getServerItemsPerPage,
  );
}

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

function CollectionCard({ item }: { item: CollectionItemWithContent }) {
  const content = (
    <motion.article
      className={cn(
        "flex h-full w-full flex-col items-start gap-5",
        "rounded-xl border border-[#DBDEE21F]/12 bg-[#4B5A50] p-5",
        "md:flex-row md:items-start",
        "lg:flex-col",
      )}
      variants={fadeUp}
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
    </motion.article>
  );

  if (!item.url) {
    return content;
  }

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
      )}
      aria-label={`Open ${item.title ?? "collection"}`}
    >
      <div className="h-full transition-opacity group-hover:opacity-80">
        {content}
      </div>
    </a>
  );
}

function CollectionList({
  items,
  currentPage,
  itemsPerPage,
  hasEnteredView,
}: {
  items: CollectionItemWithContent[];
  currentPage: number;
  itemsPerPage: number;
  hasEnteredView: boolean;
}) {
  if (!items.length) return null;

  return (
    <motion.div
      key={`${itemsPerPage}-${currentPage}`}
      className="w-full"
      variants={staggerContainer}
      initial="hidden"
      animate={hasEnteredView ? "show" : "hidden"}
      aria-live="polite"
      aria-label={`Collection page ${currentPage + 1}`}
    >
      <div className="flex w-full flex-col items-stretch gap-6 lg:grid lg:grid-cols-3 lg:gap-5">
        {items.map((item) => (
          <CollectionCard key={item._key} item={item} />
        ))}
      </div>
    </motion.div>
  );
}

type CollectionControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function CollectionControls({
  currentPage,
  totalPages,
  onPageChange,
}: CollectionControlsProps) {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="flex w-full items-center justify-between">
      <div
        className="flex items-center justify-center gap-2"
        aria-label="Collection pages"
      >
        {Array.from({ length: totalPages }, (_, page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 md:h-2",
                isActive ? "w-10 bg-white" : "w-1.5 bg-white/60 md:w-2",
              )}
              aria-label={`Go to collection page ${page + 1}`}
              aria-current={isActive ? "page" : undefined}
            />
          );
        })}
      </div>

      <div className="flex items-start">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={cn(
            "flex h-12 w-12 cursor-pointer items-center justify-center transition-colors md:h-14 md:w-14",
            isFirstPage ? "text-white/60" : "text-white",
          )}
          aria-label="Show previous collections"
        >
          <MdArrowBack className="h-7 w-7 md:h-8 md:w-8" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className={cn(
            "flex h-12 w-12 cursor-pointer items-center justify-center transition-colors md:h-14 md:w-14",
            isLastPage ? "text-white/60" : "text-white",
          )}
          aria-label="Show next collections"
        >
          <MdArrowForward className="h-7 w-7 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export function Collection({ data, className }: CollectionProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [hasEnteredView, setHasEnteredView] = useState(false);

  const itemsPerPage = useItemsPerPage();

  const items = data?.items?.filter(hasCollectionItemContent) ?? [];

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentPage = Math.min(
    Math.floor(activeItemIndex / itemsPerPage),
    Math.max(totalPages - 1, 0),
  );

  const firstItemIndex = currentPage * itemsPerPage;

  const visibleItems = items.slice(
    firstItemIndex,
    firstItemIndex + itemsPerPage,
  );

  if (!hasCollectionContent(data)) return null;

  function handlePageChange(page: number) {
    if (page < 0 || page >= totalPages) {
      return;
    }

    setActiveItemIndex(page * itemsPerPage);
  }

  return (
    <motion.section
      className={cn(
        "w-full overflow-hidden bg-[var(--color-primary-500)] py-10 md:py-14 lg:py-24",
        className,
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      onViewportEnter={() => setHasEnteredView(true)}
    >
      <Container>
        <div className="flex w-full flex-col items-start gap-10 md:gap-14 lg:gap-24">
          <motion.div className="w-full" variants={fadeUp}>
            <CollectionHeader data={data} />
          </motion.div>

          <CollectionList
            items={visibleItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            hasEnteredView={hasEnteredView}
          />

          {items.length ? (
            <motion.div className="w-full" variants={fadeIn}>
              <CollectionControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </motion.section>
  );
}
