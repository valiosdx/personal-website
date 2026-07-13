import type { Transition, Variants } from "framer-motion";

export const brandSliderVariants: Variants = {
  initial: {
    x: "0%",
  },
  animate: {
    x: ["0%", "-50%"],
  },
};

export function getBrandSliderTransition(duration: number): Transition {
  return {
    duration,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop",
  };
}
