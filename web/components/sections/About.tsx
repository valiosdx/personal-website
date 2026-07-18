"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Container } from "@/components/ui/Container";
import { getButtonHref } from "@/lib/button";
import {
  aboutButtonIconPrimaryVariants,
  aboutButtonIconSecondaryVariants,
  aboutButtonTextPrimaryVariants,
  aboutButtonTextSecondaryVariants,
  aboutButtonVariants,
  fadeUp,
  featureImageVariants,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type AboutData = Homepage["about"];

type AboutProps = {
  data?: AboutData;
  className?: string;
};

type AboutButtonProps = {
  button?: NonNullable<AboutData>["button"];
};

function hasAboutContent(data?: AboutData) {
  return Boolean(
    data?.sectionLabel || data?.headline || data?.button?.label || data?.image,
  );
}

function getHeadlineParts(headline?: string) {
  const value = headline?.trim();

  if (!value) return null;

  const firstSentenceEnd = value.indexOf(". ");

  if (firstSentenceEnd === -1) {
    return {
      muted: "",
      strong: value,
    };
  }

  return {
    muted: value.slice(0, firstSentenceEnd + 1),
    strong: value.slice(firstSentenceEnd + 2),
  };
}

function AboutButton({ button }: AboutButtonProps) {
  if (!button?.label) {
    return null;
  }

  const href = getButtonHref(button);

  const isExternalHref =
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  const isExternalWebUrl = href.startsWith("http");

  const target = button.openInNewTab && isExternalWebUrl ? "_blank" : undefined;

  const rel =
    button.openInNewTab && isExternalWebUrl ? "noopener noreferrer" : undefined;

  const className = cn(
    "inline-flex items-center",
    "justify-center py-2",
    "font-inter text-lg font-normal",
    "leading-7 text-[var(--color-gray-900)]",

    // Keyboard focus
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-gray-700",
    "focus-visible:ring-offset-4",
  );

  const content = (
    <span className="flex items-center gap-2">
      <span className="relative block h-7 overflow-hidden leading-7">
        <motion.span
          className="block"
          variants={aboutButtonTextPrimaryVariants}
        >
          {button.label}
        </motion.span>

        <motion.span
          className="absolute left-0 top-0 block"
          variants={aboutButtonTextSecondaryVariants}
          aria-hidden="true"
        >
          {button.label}
        </motion.span>
      </span>

      <span
        className="relative block h-6 w-6 overflow-hidden"
        aria-hidden="true"
      >
        <motion.span
          className="absolute inset-0"
          variants={aboutButtonIconPrimaryVariants}
        >
          <MdArrowOutward className="h-6 w-6" />
        </motion.span>

        <motion.span
          className="absolute inset-0"
          variants={aboutButtonIconSecondaryVariants}
        >
          <MdArrowOutward className="h-6 w-6" />
        </motion.span>
      </span>
    </span>
  );

  if (isExternalHref) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={className}
        variants={aboutButtonVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap="tap"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <Link href={href} legacyBehavior passHref>
      <motion.a
        target={button.openInNewTab ? "_blank" : undefined}
        rel={button.openInNewTab ? "noopener noreferrer" : undefined}
        className={className}
        variants={aboutButtonVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap="tap"
      >
        {content}
      </motion.a>
    </Link>
  );
}

function AboutHeadline({
  headline,
  className,
}: {
  headline?: string;
  className?: string;
}) {
  const parts = getHeadlineParts(headline);

  if (!parts) return null;

  const fullHeadline = [parts.muted, parts.strong].filter(Boolean).join(" ");

  return (
    <AnimatedHeading
      className={cn(
        "w-full font-inter text-[28px] font-normal leading-[140%] md:text-4xl lg:max-w-[775px] lg:text-[40px]",
        className,
      )}
      mutedText={parts.muted}
      mutedClassName="text-[var(--color-gray-500)]"
      strongClassName="text-[var(--color-gray-900)]"
    >
      {fullHeadline}
    </AnimatedHeading>
  );
}

function AboutImage({ image }: { image?: NonNullable<AboutData>["image"] }) {
  if (!image) return null;

  const imageUrl = urlFor(image)
    .width(2880)
    .height(800)
    .fit("crop")
    .auto("format")
    .url();

  return (
    <motion.div
      className="relative left-1/2 h-72 w-screen -translate-x-1/2 overflow-hidden bg-zinc-100 md:h-96"
      variants={featureImageVariants}
    >
      <Image
        src={imageUrl}
        alt="About image"
        fill
        sizes="100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

function AboutDesktop({ data }: { data?: AboutData }) {
  return (
    <motion.div
      className="hidden w-full items-start justify-between gap-16 lg:flex"
      variants={staggerContainer}
    >
      <motion.div
        className="flex w-80 shrink-0 self-stretch flex-col items-start justify-between"
        variants={fadeUp}
      >
        {data?.sectionLabel ? (
          <p className="font-inter text-2xl font-medium uppercase leading-[120%] text-[var(--color-gray-700)]">
            {data.sectionLabel}
          </p>
        ) : null}

        <AboutButton button={data?.button} />
      </motion.div>

      <motion.div
        className="w-full lg:max-w-[775px]"
        variants={staggerContainer}
      >
        <AboutHeadline headline={data?.headline} />
      </motion.div>
    </motion.div>
  );
}

function AboutResponsive({ data }: { data?: AboutData }) {
  return (
    <motion.div
      className="flex w-full flex-col items-start gap-10 md:gap-14 lg:hidden"
      variants={staggerContainer}
    >
      {data?.sectionLabel ? (
        <motion.p
          className="font-inter text-2xl font-medium uppercase leading-[120%] text-[var(--color-gray-700)]"
          variants={fadeUp}
        >
          {data.sectionLabel}
        </motion.p>
      ) : null}

      <motion.div className="w-full" variants={staggerContainer}>
        <AboutHeadline headline={data?.headline} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <AboutButton button={data?.button} />
      </motion.div>
    </motion.div>
  );
}

export function About({ data, className }: AboutProps) {
  if (!hasAboutContent(data)) return null;

  return (
    <motion.section
      className={cn("w-full overflow-hidden bg-white", className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="py-10 md:py-14 lg:py-24">
        <Container>
          <AboutDesktop data={data} />

          <AboutResponsive data={data} />
        </Container>
      </div>

      <AboutImage image={data?.image} />
    </motion.section>
  );
}
