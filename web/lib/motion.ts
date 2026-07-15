import type { Transition, Variants } from "framer-motion";

export const motionDurations = {
  interaction: 0.3,
  reveal: 0.6,
  counter: 1.2,
} as const;

export const motionEasings = {
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
  linear: "linear" as const,
};

export const motionDelays = {
  stagger: 0.15,
  staggerStart: 0.1,
  featureText: 0.2,
  featureImage: 0.3,
} as const;

export const revealTransition: Transition = {
  duration: motionDurations.reveal,
  ease: motionEasings.standard,
};

export const carouselTransition: Transition = {
  duration: motionDurations.reveal,
  ease: motionEasings.standard,
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: motionDelays.stagger,
      delayChildren: motionDelays.staggerStart,
    },
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: revealTransition,
  },
};

export const featureTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...revealTransition,
      delay: motionDelays.featureText,
    },
  },
};

export const featureImageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      ...revealTransition,
      delay: motionDelays.featureImage,
    },
  },
};

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
    ease: motionEasings.linear,
    repeat: Infinity,
    repeatType: "loop",
  };
}
