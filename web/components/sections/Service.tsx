"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Container } from "@/components/ui/Container";
import {
  fadeUp,
  serviceListVariants,
  staggerContainer,
  tallSectionViewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type ServiceData = Homepage["service"];

type ServiceProps = {
  data?: ServiceData;
  className?: string;
};

type ServiceItem = NonNullable<NonNullable<ServiceData>["services"]>[number];

type ServiceItemWithContent = ServiceItem & {
  _key: string;
};

function hasServiceItemContent(
  service: ServiceItem,
): service is ServiceItemWithContent {
  return Boolean(
    service?._key && (service.number || service.title || service.description),
  );
}

function hasServiceContent(data?: ServiceData) {
  return Boolean(
    data?.sectionLabel ||
    data?.title ||
    data?.description ||
    data?.services?.some(hasServiceItemContent),
  );
}

function ServiceHeader({ data }: { data?: ServiceData }) {
  return (
    <motion.div
      className={cn(
        "flex w-full min-w-0 flex-col items-start gap-6",
        "min-[1440px]:flex-row min-[1440px]:gap-[88px]",
      )}
      variants={staggerContainer}
    >
      {data?.sectionLabel ? (
        <motion.div
          className={cn(
            "flex w-full min-w-0 items-start py-3",
            "min-[1440px]:w-28 min-[1440px]:shrink-0",
          )}
          variants={fadeUp}
        >
          <p
            className={cn(
              "w-full min-w-0 font-inter",
              "break-words [overflow-wrap:anywhere]",
              "text-xl font-medium uppercase leading-[120%]",
              "text-[var(--color-gray-700)]",
              "md:text-2xl",
            )}
          >
            {data.sectionLabel}
          </p>
        </motion.div>
      ) : null}

      <motion.div
        className={cn(
          "flex w-full min-w-0 flex-col items-start gap-5",
          "min-[1440px]:w-px min-[1440px]:flex-1",
        )}
        variants={staggerContainer}
      >
        {data?.title ? (
          <AnimatedHeading
            className={cn(
              "w-full min-w-0 font-inter",
              "break-words [overflow-wrap:anywhere]",
              "text-[32px] font-normal leading-[140%] text-black",
              "md:text-[44px]",
              "min-[1440px]:w-[55%]",
            )}
          >
            {data.title}
          </AnimatedHeading>
        ) : null}

        {data?.description ? (
          <motion.p
            className={cn(
              "w-full min-w-0 font-inter",
              "break-words [overflow-wrap:anywhere]",
              "text-base font-normal leading-[150%]",
              "text-[var(--color-gray-700)]",
              "md:w-[72%] md:text-lg",
              "min-[1440px]:w-[40%]",
            )}
            variants={fadeUp}
          >
            {data.description}
          </motion.p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function ExpandableServiceDescription({
  description,
  descriptionId,
}: {
  description: string;
  descriptionId: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;

    if (!descriptionElement || isExpanded) {
      return;
    }

    function checkOverflow() {
      if (!descriptionElement) {
        return;
      }

      const isOverflowing =
        descriptionElement.scrollHeight > descriptionElement.clientHeight + 1;

      setHasOverflow(isOverflowing);
    }

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);

    resizeObserver.observe(descriptionElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [description, isExpanded]);

  function handleToggle() {
    setIsExpanded((currentValue) => !currentValue);
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-3">
      <p
        ref={descriptionRef}
        id={descriptionId}
        className={cn(
          "w-full min-w-0 font-inter",
          "break-words [overflow-wrap:anywhere]",
          "text-base font-normal leading-[140%]",
          "text-[var(--color-gray-700)]",
          "md:text-xl",
          !isExpanded && "line-clamp-3",
        )}
      >
        {description}
      </p>

      {hasOverflow || isExpanded ? (
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "interaction-transition font-inter text-sm font-medium",
            "text-[var(--color-gray-900)] underline",
            "decoration-[var(--color-gray-500)] underline-offset-4",
            "transition-colors hover:decoration-[var(--color-gray-900)]",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[var(--color-gray-700)]",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-white",
          )}
          aria-expanded={isExpanded}
          aria-controls={descriptionId}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      ) : null}
    </div>
  );
}

function ServiceCard({ service }: { service: ServiceItemWithContent }) {
  const descriptionId = `service-description-${service._key}`;

  return (
    <motion.article
      className="flex w-full min-w-0 flex-col items-start gap-5"
      variants={fadeUp}
    >
      <div className="flex w-full min-w-0 flex-col items-start gap-6">
        {service.number ? (
          <p
            className={cn(
              "max-w-full font-inter",
              "break-words [overflow-wrap:anywhere]",
              "text-base font-normal leading-[140%]",
              "text-[var(--color-gray-700)]",
              "md:text-xl",
            )}
          >
            {service.number}
          </p>
        ) : null}

        {service.title ? (
          <h3
            className={cn(
              "max-w-full font-inter",
              "break-words [overflow-wrap:anywhere]",
              "text-base font-medium leading-[140%]",
              "text-[var(--color-gray-900)]",
              "md:text-xl",
            )}
          >
            {service.title}
          </h3>
        ) : null}
      </div>

      <div className="h-px w-full bg-gray-200" aria-hidden="true" />

      {service.description ? (
        <ExpandableServiceDescription
          description={service.description}
          descriptionId={descriptionId}
        />
      ) : null}
    </motion.article>
  );
}

function ServiceList({ services }: { services: ServiceItemWithContent[] }) {
  if (!services.length) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "grid w-full min-w-0 grid-cols-1",
        "gap-y-[60px]",
        "min-[1440px]:grid-cols-2",
        "min-[1440px]:gap-x-[100px]",
        "min-[1440px]:pl-[200px]",
        "min-[1440px]:pr-36",
      )}
      variants={serviceListVariants}
    >
      {services.map((service) => (
        <ServiceCard key={service._key} service={service} />
      ))}
    </motion.div>
  );
}

export function Service({ data, className }: ServiceProps) {
  if (!hasServiceContent(data)) {
    return null;
  }

  const services = data?.services?.filter(hasServiceItemContent) ?? [];

  return (
    <motion.section
      className={cn(
        "w-full max-w-full overflow-x-clip bg-white",
        "pt-10 pb-[60px]",
        "md:py-[60px]",
        "min-[1440px]:py-[100px]",
        className,
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={tallSectionViewportOnce}
    >
      <Container
        className={cn(
          "flex min-w-0 flex-col items-start",
          "gap-[60px] md:gap-[100px]",
        )}
      >
        <ServiceHeader data={data} />

        <ServiceList services={services} />
      </Container>
    </motion.section>
  );
}
