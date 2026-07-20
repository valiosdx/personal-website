"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  headingContainerVariants,
  headingLineVariants,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedHeadingProps = Omit<
  HTMLMotionProps<"h2">,
  "children" | "variants"
> & {
  children: string;
  as?: "h1" | "h2";
  mutedText?: string;
  mutedClassName?: string;
  strongClassName?: string;
};

function getWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean);
}

export function AnimatedHeading({
  children,
  as = "h2",
  className,
  mutedText,
  mutedClassName,
  strongClassName,
  ...props
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const words = useMemo(() => getWords(children), [children]);

  const mutedWordCount = useMemo(
    () => (mutedText ? getWords(mutedText).length : 0),
    [mutedText],
  );

  const [lineIndexes, setLineIndexes] = useState<number[]>(() =>
    words.map(() => 0),
  );

  const MotionHeading = as === "h1" ? motion.h1 : motion.h2;

  useLayoutEffect(() => {
    const heading = headingRef.current;

    if (!heading) return;

    function measureLines() {
      const lineTops: number[] = [];

      const nextLineIndexes = wordRefs.current.map((word) => {
        if (!word) return 0;

        const existingLineIndex = lineTops.findIndex(
          (top) => Math.abs(top - word.offsetTop) <= 1,
        );

        if (existingLineIndex !== -1) {
          return existingLineIndex;
        }

        lineTops.push(word.offsetTop);

        return lineTops.length - 1;
      });

      setLineIndexes((currentLineIndexes) => {
        const hasChanged = nextLineIndexes.some(
          (lineIndex, index) => lineIndex !== currentLineIndexes[index],
        );

        return hasChanged ? nextLineIndexes : currentLineIndexes;
      });
    }

    const frame = requestAnimationFrame(measureLines);
    const resizeObserver = new ResizeObserver(measureLines);

    resizeObserver.observe(heading);

    void document.fonts?.ready.then(measureLines);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [words]);

  return (
    <MotionHeading
      ref={headingRef}
      className={className}
      variants={headingContainerVariants}
      aria-label={children}
      {...props}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <motion.span
            ref={(node) => {
              wordRefs.current[index] = node;
            }}
            className={cn(
              "inline-block will-change-[transform,filter,opacity]",
              index < mutedWordCount ? mutedClassName : strongClassName,
            )}
            custom={lineIndexes[index] ?? 0}
            variants={headingLineVariants}
            aria-hidden="true"
          >
            {word}
          </motion.span>

          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </MotionHeading>
  );
}
