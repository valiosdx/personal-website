"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { motionDurations, motionEasings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedNumberProps = {
  value: string;
  className?: string;
};

type ParsedNumber = {
  number: number;
  prefix: string;
  suffix: string;
  formatter: Intl.NumberFormat;
};

function parseAnimatedNumber(value: string): ParsedNumber | null {
  const match = value.match(/-?\d[\d,]*(?:\.\d+)?/);

  if (!match || match.index === undefined) {
    return null;
  }

  const rawNumber = match[0];

  const number = Number(rawNumber.replaceAll(",", ""));

  if (!Number.isFinite(number)) {
    return null;
  }

  const decimalPlaces = rawNumber.includes(".")
    ? (rawNumber.split(".")[1]?.length ?? 0)
    : 0;

  return {
    number,
    prefix: value.slice(0, match.index),
    suffix: value.slice(match.index + rawNumber.length),
    formatter: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping: rawNumber.includes(","),
    }),
  };
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(elementRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -15% 0px",
  });

  const parsedNumber = useMemo(() => parseAnimatedNumber(value), [value]);

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView || !parsedNumber) {
      return;
    }

    const animation = animate(0, parsedNumber.number, {
      duration: motionDurations.counter,
      ease: motionEasings.standard,

      onUpdate: (latestValue) => {
        setDisplayValue(parsedNumber.formatter.format(latestValue));
      },
    });

    return () => {
      animation.stop();
    };
  }, [isInView, parsedNumber]);

  if (!parsedNumber) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={elementRef}
      className={cn("inline-block font-inter", className)}
      aria-label={value}
    >
      <span aria-hidden="true">
        {parsedNumber.prefix}
        {displayValue}
        {parsedNumber.suffix}
      </span>
    </span>
  );
}
