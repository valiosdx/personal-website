import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
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
  sm: "px-4 py-[9px] text-sm font-normal font-tight text-white leading-[150%]",
  md: "px-6 py-3 text-lg font-medium font-inter text-white leading-7",
};

const buttonBaseClass =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[var(--color-primary-500)] font-[var(--font-sans)]";

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

  if (href) {
    const isExternalUrl = href.startsWith("http");

    if (isExternalUrl) {
      return (
        <a
          href={href}
          className={buttonClassName}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={buttonClassName}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer" : undefined}
        {...(restProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassName}
      {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
