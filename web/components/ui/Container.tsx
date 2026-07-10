import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1240px] px-6 md:px-14 xl:px-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
