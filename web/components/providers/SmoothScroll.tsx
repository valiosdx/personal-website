"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          smoothWheel: true,
          anchors: true,
          stopInertiaOnNavigate: true,
        }}
      />

      {children}
    </>
  );
}
