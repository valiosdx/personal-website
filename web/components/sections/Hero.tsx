"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
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
    <motion.div
      className="flex w-full flex-col items-start gap-6 md:gap-10"
      variants={staggerContainer}
    >
      {badge ? (
        <motion.div
          className="hero-badge-glass w-full md:w-auto"
          variants={fadeUp}
        >
          <p className="relative z-[1] flex flex-col justify-center font-inter text-sm font-medium uppercase leading-5 text-[var(--color-primary-500)] md:text-base md:leading-[22.4px]">
            {badge}
          </p>
        </motion.div>
      ) : null}

      {title ? (
        <AnimatedHeading
          as="h1"
          className="max-w-full font-inter text-4xl font-medium uppercase leading-[50.4px] text-[var(--color-base-black)] md:text-5xl md:leading-[67.2px]"
        >
          {title}
        </AnimatedHeading>
      ) : null}
    </motion.div>
  );
}

function HeroActionBlock({ description, button }: HeroActionBlockProps) {
  return (
    <motion.div
      className="flex w-full flex-col items-start gap-10"
      variants={staggerContainer}
    >
      {description ? (
        <motion.p
          className="
            w-full
            font-inter
            text-base
            font-normal
            leading-6
            text-[var(--color-gray-700)]
            md:max-w-[482px]
            md:text-lg
            md:leading-7
            lg:max-w-none
            xl:max-w-[772px]
          "
          variants={fadeUp}
        >
          {description}
        </motion.p>
      ) : null}

      {button?.label ? (
        <motion.div className="w-full md:w-auto" variants={fadeUp}>
          <Button
            href={getButtonHref(button)}
            size="md"
            openInNewTab={button.openInNewTab}
            className="w-full md:w-auto"
          >
            {button.label}
          </Button>
        </motion.div>
      ) : null}
    </motion.div>
  );
}

function HeroStats({ stats }: HeroStatsProps) {
  if (!stats.length) {
    return null;
  }

  return (
    <motion.div
      className="grid w-full grid-cols-3 gap-6 md:flex md:w-auto md:max-w-[544px] md:items-center"
      variants={staggerContainer}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={`${stat.value}-${stat.label}`}
          className={cn(
            "flex min-w-0 flex-col items-center gap-3 md:items-start",
            index === 0 ? "md:w-44" : "md:w-40",
          )}
          variants={fadeUp}
        >
          <AnimatedNumber
            value={stat.value}
            className="w-full text-center font-inter text-4xl font-medium leading-10 text-black md:text-left md:text-[40px] md:leading-[48px]"
          />

          <p className="w-full text-center font-inter text-sm font-normal leading-5 text-[var(--color-gray-700)] md:text-left md:text-lg md:leading-7">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function HeroImage({ imageUrl, title }: HeroImageProps) {
  if (!imageUrl) {
    return null;
  }

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
  if (!hasHeroContent(data)) {
    return null;
  }

  const stats = data?.stats?.filter((stat) => stat?.value && stat?.label) ?? [];

  const imageUrl = data?.image
    ? urlFor(data.image).width(1312).auto("format").url()
    : null;

  return (
    <Section className={cn("pb-6 pt-14 md:pb-10 md:pt-28 xl:pb-36", className)}>
      <Container>
        <motion.div
          className="flex flex-col gap-14 xl:hidden"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col items-start gap-10">
            <HeroTitleBlock badge={data?.badge} title={data?.title} />

            <HeroActionBlock
              description={data?.description}
              button={data?.button}
            />
          </div>

          <HeroStats stats={stats} />

          <motion.div className="w-full" variants={featureImageVariants}>
            <HeroImage imageUrl={imageUrl} title={data?.title} />
          </motion.div>
        </motion.div>

        {/* Desktop: mulai 1280px */}
        <motion.div
          className="
          hidden
          xl:grid
          xl:grid-cols-[minmax(0,632px)_minmax(240px,482px)]
          xl:items-end
          xl:gap-16
          2xl:gap-32
        "
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="flex w-full min-w-0 flex-col items-start gap-72"
            variants={staggerContainer}
          >
            <HeroTitleBlock badge={data?.badge} title={data?.title} />
            <HeroStats stats={stats} />
          </motion.div>

          <motion.div
            className="flex w-full min-w-0 flex-col items-start gap-40"
            variants={staggerContainer}
          >
            <motion.div className="w-full" variants={featureImageVariants}>
              <HeroImage imageUrl={imageUrl} title={data?.title} />
            </motion.div>

            <div className="w-full">
              <HeroActionBlock
                description={data?.description}
                button={data?.button}
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
