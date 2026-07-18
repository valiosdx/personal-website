"use client";

import { motion } from "framer-motion";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Container } from "@/components/ui/Container";
import {
  fadeUp,
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
      className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-24"
      variants={staggerContainer}
    >
      {data?.sectionLabel ? (
        <motion.div
          className="flex w-full items-center gap-3 lg:w-auto lg:py-3"
          variants={fadeUp}
        >
          <p className="font-inter text-xl font-medium uppercase leading-[120%] text-[var(--color-gray-700)] md:text-2xl">
            {data.sectionLabel}
          </p>
        </motion.div>
      ) : null}

      <motion.div
        className="flex w-full flex-col items-start gap-5 lg:flex-1"
        variants={staggerContainer}
      >
        {data?.title ? (
          <AnimatedHeading
            className="font-inter w-full text-[32px] font-normal leading-[140%] text-black md:text-[44px] md:leading-[140%] lg:max-w-[571px]"
          >
            {data.title}
          </AnimatedHeading>
        ) : null}

        {data?.description ? (
          <motion.p
            className="font-inter w-full text-base font-normal leading-[150%] text-[var(--color-gray-700)] md:max-w-[451px] md:text-lg"
            variants={fadeUp}
          >
            {data.description}
          </motion.p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  isFirst = false,
}: {
  service: ServiceItemWithContent;
  isFirst?: boolean;
}) {
  return (
    <motion.article
      className="flex w-full flex-col items-start gap-5"
      variants={fadeUp}
    >
      <div className="flex flex-col items-start gap-6">
        {service.number ? (
          <p
            className={cn(
              "font-inter text-base leading-[150%] text-[var(--color-gray-700)] md:text-xl md:leading-[120%]",
              isFirst ? "font-medium" : "font-normal",
            )}
          >
            {service.number}
          </p>
        ) : null}

        {service.title ? (
          <h3 className="font-inter text-base font-medium leading-[150%] text-[var(--color-gray-900)] md:text-xl md:leading-[120%]">
            {service.title}
          </h3>
        ) : null}
      </div>

      <div className="h-px w-full bg-gray-200" aria-hidden="true" />

      {service.description ? (
        <p className="font-inter w-full text-base font-normal leading-[150%] text-[var(--color-gray-900)] md:text-xl md:leading-[120%]">
          {service.description}
        </p>
      ) : null}
    </motion.article>
  );
}

function ServiceList({ services }: { services: ServiceItemWithContent[] }) {
  if (!services.length) return null;

  return (
    <motion.div
      className="flex w-full flex-col items-start gap-10 md:gap-14 lg:grid lg:grid-cols-[384px_384px] lg:gap-x-24 lg:gap-y-14 lg:pl-48"
      variants={staggerContainer}
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service._key}
          service={service}
          isFirst={index === 0}
        />
      ))}
    </motion.div>
  );
}

export function Service({ data, className }: ServiceProps) {
  if (!hasServiceContent(data)) return null;

  const services = data?.services?.filter(hasServiceItemContent) ?? [];

  return (
    <motion.section
      className={cn(
        "w-full overflow-hidden bg-white px-0 pt-10 pb-14 md:pt-14 md:pb-20 lg:py-24",
        className,
      )}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={tallSectionViewportOnce}
    >
      <Container>
        <div className="flex w-full flex-col items-center gap-14 md:gap-24">
          <ServiceHeader data={data} />

          <ServiceList services={services} />
        </div>
      </Container>
    </motion.section>
  );
}
