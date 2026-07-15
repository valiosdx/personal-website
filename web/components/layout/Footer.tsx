"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type FooterData = Homepage["copyright"];

type FooterProps = {
  data?: FooterData;
  className?: string;
};

function splitCopyrightText(value?: string) {
  const text = value?.trim();

  if (!text) return null;

  const firstSentenceEnd = text.indexOf(". ");

  if (firstSentenceEnd === -1) {
    return {
      primary: text,
      secondary: "",
    };
  }

  return {
    primary: text.slice(0, firstSentenceEnd + 1),
    secondary: text.slice(firstSentenceEnd + 2),
  };
}

export function Footer({ data, className }: FooterProps) {
  if (!data?.leftText && !data?.rightText) {
    return null;
  }

  const copyright = splitCopyrightText(data.leftText);

  return (
    <motion.footer
      className={cn("w-full bg-white pt-14 pb-14", className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <Container>
        <motion.div
          className="flex w-full flex-col gap-6"
          variants={staggerContainer}
        >
          {/* Divider */}
          <motion.div
            className="h-px w-full bg-[var(--color-gray-200)]"
            variants={fadeIn}
            aria-hidden="true"
          />

          {/* Footer content */}
          <motion.div
            className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between"
            variants={staggerContainer}
          >
            {copyright ? (
              <motion.p
                className="font-inter text-base font-medium leading-7 md:text-lg"
                variants={fadeUp}
              >
                <span className="text-[var(--color-gray-900)]">
                  {copyright.primary}
                </span>

                {copyright.secondary ? (
                  <>
                    {" "}
                    <span className="text-[var(--color-gray-400)]">
                      {copyright.secondary}
                    </span>
                  </>
                ) : null}
              </motion.p>
            ) : null}

            {data?.rightText ? (
              <motion.p
                className="font-inter text-base font-medium leading-7 text-[var(--color-gray-500)] md:text-lg"
                variants={fadeUp}
              >
                {data.rightText}
              </motion.p>
            ) : null}
          </motion.div>
        </motion.div>
      </Container>
    </motion.footer>
  );
}
