"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  buttonTextPrimaryVariants,
  buttonTextSecondaryVariants,
  buttonVariants,
} from "@/lib/motion";

type ButtonSize = "sm" | "md";

type BaseButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLinkProps = BaseButtonProps &
  Omit<HTMLMotionProps<"a">, "children" | "href"> & {
    href: string;
    openInNewTab?: boolean;
  };

type ButtonAsButtonProps = BaseButtonProps &
  Omit<HTMLMotionProps<"button">, "children"> & {
    href?: never;
    openInNewTab?: never;
  };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const buttonSizes: Record<ButtonSize, string> = {
  sm: cn(
    "px-4 py-[9px]",
    "font-tight text-sm font-normal",
    "leading-[150%] text-white",
  ),
  md: cn("px-6 py-3", "font-inter text-lg font-medium", "leading-7 text-white"),
};

const buttonContentSizes: Record<ButtonSize, string> = {
  sm: "h-[21px]",
  md: "h-7",
};

const buttonBaseClass = cn(
  "inline-flex shrink-0",
  "items-center justify-center overflow-hidden",
  "whitespace-nowrap rounded-lg",
  "bg-[var(--color-primary-500)]",
  "font-[var(--font-inter)]",

  // Keyboard focus
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-[var(--color-primary-500)]",
  "focus-visible:ring-offset-4",

  // Disabled
  "disabled:pointer-events-none",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
);

function ButtonContent({
  children,
  size,
}: {
  children: ReactNode;
  size: ButtonSize;
}) {
  return (
    <span
      className={cn("relative block overflow-hidden", buttonContentSizes[size])}
    >
      <motion.span
        className="block"
        variants={buttonTextPrimaryVariants}
      >
        {children}
      </motion.span>

      <motion.span
        className="absolute left-0 top-0 block"
        variants={buttonTextSecondaryVariants}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    size = "md",
    className,
    href,
    openInNewTab,
    ...restProps
  } = props;

  const buttonClassName = cn(buttonBaseClass, buttonSizes[size], className);

  const content = <ButtonContent size={size}>{children}</ButtonContent>;

  if (href) {
    const anchorProps = restProps as HTMLMotionProps<"a">;

    const target = openInNewTab ? "_blank" : anchorProps.target;

    const rel = openInNewTab ? "noopener noreferrer" : anchorProps.rel;

    const isExternalUrl =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternalUrl) {
      return (
        <motion.a
          {...anchorProps}
          href={href}
          className={buttonClassName}
          target={target}
          rel={rel}
          variants={buttonVariants}
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
          {...anchorProps}
          className={buttonClassName}
          target={target}
          rel={rel}
          variants={buttonVariants}
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

  const buttonProps = restProps as HTMLMotionProps<"button">;

  return (
    <motion.button
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      className={buttonClassName}
      variants={buttonVariants}
      initial="rest"
      animate="rest"
      whileHover={buttonProps.disabled ? undefined : "hover"}
      whileFocus={buttonProps.disabled ? undefined : "hover"}
      whileTap={buttonProps.disabled ? undefined : "tap"}
    >
      {content}
    </motion.button>
  );
}
