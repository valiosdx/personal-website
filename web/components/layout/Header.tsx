"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getButtonHref } from "@/lib/button";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { HeaderButton } from "@/types/homepage";

type HeaderData = {
  name?: string;
  button?: HeaderButton;
};

type HeaderProps = {
  data?: HeaderData;
};

export function Header({ data }: HeaderProps) {
  const button = data?.button;

  return (
    <motion.header
      className="w-full pt-6 md:pt-10"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <Container>
        <motion.div
          className="flex w-full items-center justify-between gap-4"
          variants={staggerContainer}
        >
          {data?.name ? (
            <motion.h1
              className="shrink-0 font-inter text-2xl font-medium leading-7 text-[var(--color-primary-500)]"
              variants={fadeUp}
            >
              {data.name}
            </motion.h1>
          ) : null}

          {button?.label ? (
            <motion.div variants={fadeUp}>
              <Button
                href={getButtonHref(button)}
                size="sm"
                openInNewTab={button.openInNewTab}
              >
                {button.label}
              </Button>
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </motion.header>
  );
}
