import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ButtonSize = "sm" | "md";

type BaseButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    openInNewTab?: boolean;
  };

type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
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
  "group inline-flex shrink-0",
  "items-center justify-center overflow-hidden",
  "whitespace-nowrap rounded-lg",
  "bg-[var(--color-primary-500)]",
  "font-[var(--font-inter)]",

  // Background transition
  "transition-colors duration-400 ease-out",
  "delay-0 hover:delay-75",

  // Background interaction
  "hover:bg-[var(--color-primary-400)]",
  "active:bg-[var(--color-primary-400)]",

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
      <span
        className={cn(
          "block",
          "transition-transform duration-400 ease-out",
          "delay-0 group-hover:delay-75",
          "group-hover:-translate-y-full",
        )}
      >
        {children}
      </span>

      <span
        className={cn(
          "absolute left-0 top-0 block",
          "translate-y-full",
          "transition-transform duration-400 ease-out",
          "delay-0 group-hover:delay-75",
          "group-hover:translate-y-0",
        )}
        aria-hidden="true"
      >
        {children}
      </span>
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
    const anchorProps = restProps as AnchorHTMLAttributes<HTMLAnchorElement>;

    const target = openInNewTab ? "_blank" : anchorProps.target;

    const rel = openInNewTab ? "noopener noreferrer" : anchorProps.rel;

    const isExternalUrl =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternalUrl) {
      return (
        <a
          {...anchorProps}
          href={href}
          className={buttonClassName}
          target={target}
          rel={rel}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        {...anchorProps}
        href={href}
        className={buttonClassName}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = restProps as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      className={buttonClassName}
    >
      {content}
    </button>
  );
}
