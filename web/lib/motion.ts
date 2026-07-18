import type { Transition, Variants } from "framer-motion";

export const motionDurations = {
  interaction: 0.3,
  reveal: 0.5,
  counter: 1.2,
} as const;

export const motionEasings = {
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
  linear: "linear" as const,
};

export const motionDelays = {
  stagger: 0.14,
  staggerStart: 0.15,
  headingLine: 0.12,
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

const interactionTransition: Transition = {
  duration: motionDurations.interaction,
  ease: motionEasings.standard,
};

export const buttonVariants: Variants = {
  rest: {
    scale: 1,
    backgroundColor: "var(--color-primary-500)",
  },
  hover: {
    backgroundColor: "var(--color-primary-400)",
    transition: interactionTransition,
  },
  tap: {
    scale: 0.98,
    transition: interactionTransition,
  },
};

export const buttonTextPrimaryVariants: Variants = {
  rest: { y: "0%" },
  hover: {
    y: "-100%",
    transition: interactionTransition,
  },
};

export const buttonTextSecondaryVariants: Variants = {
  rest: { y: "100%" },
  hover: {
    y: "0%",
    transition: interactionTransition,
  },
};

export const aboutButtonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1 },
  tap: {
    scale: 0.98,
    transition: interactionTransition,
  },
};

export const aboutButtonTextPrimaryVariants: Variants = {
  rest: { y: "0%" },
  hover: {
    y: "100%",
    transition: interactionTransition,
  },
};

export const aboutButtonTextSecondaryVariants: Variants = {
  rest: { y: "-100%" },
  hover: {
    y: "0%",
    transition: interactionTransition,
  },
};

export const aboutButtonIconPrimaryVariants: Variants = {
  rest: { x: "0%", y: "0%" },
  hover: {
    x: "100%",
    y: "-100%",
    transition: interactionTransition,
  },
};

export const aboutButtonIconSecondaryVariants: Variants = {
  rest: { x: "-100%", y: "100%" },
  hover: {
    x: "0%",
    y: "0%",
    transition: interactionTransition,
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -15% 0px",
};

export const footerViewportOnce = {
  once: true,
  amount: 0.2,
};

export const tallSectionViewportOnce = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -15% 0px",
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
    y: 24,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

export const headingContainerVariants: Variants = {
  hidden: {},
  show: {},
};

export const headingLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.45em",
    filter: "blur(10px)",
  },
  show: (lineIndex: number = 0) => ({
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: {
      ...revealTransition,
      delay: lineIndex * motionDelays.headingLine,
    },
  }),
};

export const featureTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...revealTransition,
      delay: motionDelays.featureText,
    },
  },
};

export const featureImageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
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
