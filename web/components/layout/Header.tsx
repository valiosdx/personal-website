"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getButtonHref } from "@/lib/button";
import { navbarSlideDown } from "@/lib/motion";
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
      variants={navbarSlideDown}
      initial="hidden"
      animate="show"
    >
      <Container>
        <div className="flex w-full min-w-0 items-center justify-between gap-4">
          {data?.name ? (
            <h1 className="min-w-0 flex-1 break-words font-inter text-2xl font-medium leading-7 text-black [overflow-wrap:anywhere]">
              {data.name}
            </h1>
          ) : null}

          {button?.label ? (
            <div className="shrink-0">
              <Button
                href={getButtonHref(button)}
                size="sm"
                openInNewTab={button.openInNewTab}
              >
                {button.label}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </motion.header>
  );
}
