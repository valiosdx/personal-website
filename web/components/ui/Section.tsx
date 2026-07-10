import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("w-full py-20 md:py-24 lg:py-28", className)}
      {...props}
    >
      {children}
    </section>
  );
}
