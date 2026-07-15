"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getButtonHref } from "@/lib/button";
import { fadeUp, featureImageVariants, staggerContainer } from "@/lib/motion";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type HeroData = Homepage["hero"];

type HeroProps = {
  data?: HeroData;
  className?: string;
};

type HeroTitleBlockProps = {
  badge?: string;
  title?: string;
};

type HeroActionBlockProps = {
  description?: string;
  button?: HeroData["button"];
};

type HeroStatsProps = {
  stats: NonNullable<HeroData["stats"]>;
};

type HeroImageProps = {
  imageUrl: string | null;
  title?: string;
};

function hasHeroContent(data?: HeroData) {
  return Boolean(
    data?.badge ||
    data?.title ||
    data?.description ||
    data?.image ||
    data?.button?.label ||
    data?.stats?.length,
  );
}

function HeroTitleBlock({ badge, title }: HeroTitleBlockProps) {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:gap-10">
      {badge ? (
        <div className="hero-badge-glass w-full md:w-auto">
          <p className="relative z-[1] flex flex-col justify-center font-inter text-sm font-medium uppercase leading-5 text-[var(--color-primary-500)] md:text-base md:leading-[22.4px]">
            {badge}
          </p>
        </div>
      ) : null}

      {title ? (
        <h2 className="max-w-[632px] font-inter text-4xl font-medium uppercase leading-[50.4px] text-[var(--color-base-black)] md:text-5xl md:leading-[67.2px]">
          {title}
        </h2>
      ) : null}
    </div>
  );
}

function HeroActionBlock({ description, button }: HeroActionBlockProps) {
  return (
    <div className="flex w-full flex-col items-start gap-10">
      {description ? (
        <p className="w-full font-inter text-base font-normal leading-6 text-[var(--color-gray-700)] md:max-w-[482px] md:text-lg md:leading-7">
          {description}
        </p>
      ) : null}

      {button?.label ? (
        <div className="w-full md:w-auto">
          <Button
            href={getButtonHref(button)}
            size="md"
            openInNewTab={button.openInNewTab}
            className="w-full md:w-auto"
          >
            {button.label}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function HeroStats({ stats }: HeroStatsProps) {
  if (!stats.length) return null;

  return (
    <div className="grid w-full grid-cols-3 gap-6 md:flex md:w-auto md:max-w-[544px] md:items-center">
      {stats.map((stat, index) => (
        <div
          key={`${stat.value}-${stat.label}`}
          className={cn(
            "flex min-w-0 flex-col items-center gap-3 md:items-start",
            index === 0 ? "md:w-44" : "md:w-40",
          )}
        >
          <p className="w-full text-center font-inter text-4xl font-medium leading-10 text-black md:text-left md:text-[40px] md:leading-[48px]">
            {stat.value}
          </p>

          <p className="w-full text-center font-inter text-sm font-normal leading-5 text-gray-500 md:text-left md:text-lg md:leading-7">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function HeroImage({ imageUrl, title }: HeroImageProps) {
  if (!imageUrl) return null;

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-xl">
      <Image
        src={imageUrl}
        alt={title ?? "Hero image"}
        fill
        priority
        sizes="(min-width: 1024px) 482px, (min-width: 768px) 656px, 100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

export function Hero({ data, className }: HeroProps) {
  if (!hasHeroContent(data)) return null;

  const stats = data?.stats?.filter((stat) => stat?.value && stat?.label) ?? [];

  const imageUrl = data?.image
    ? urlFor(data.image).width(1312).auto("format").url()
    : null;

  return (
    <Section className={cn("pt-14 pb-6 md:pt-28 md:pb-10 lg:pb-36", className)}>
      <Container>
        {/* Mobile + Tablet */}
        <motion.div
          className="flex flex-col gap-14 lg:hidden"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="flex flex-col items-start gap-10"
            variants={fadeUp}
          >
            <HeroTitleBlock badge={data?.badge} title={data?.title} />

            <HeroActionBlock
              description={data?.description}
              button={data?.button}
            />
          </motion.div>

          <motion.div className="w-full" variants={fadeUp}>
            <HeroStats stats={stats} />
          </motion.div>

          <motion.div className="w-full" variants={featureImageVariants}>
            <HeroImage imageUrl={imageUrl} title={data?.title} />
          </motion.div>
        </motion.div>

        {/* Desktop */}
        <motion.div
          className="hidden lg:flex lg:items-end lg:gap-32"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="flex w-[632px] flex-col items-start gap-72"
            variants={fadeUp}
          >
            <HeroTitleBlock badge={data?.badge} title={data?.title} />

            <HeroStats stats={stats} />
          </motion.div>

          <motion.div
            className="flex w-[482px] flex-col items-start gap-40"
            variants={staggerContainer}
          >
            <motion.div className="w-full" variants={featureImageVariants}>
              <HeroImage imageUrl={imageUrl} title={data?.title} />
            </motion.div>

            <motion.div className="w-full" variants={fadeUp}>
              <HeroActionBlock
                description={data?.description}
                button={data?.button}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
