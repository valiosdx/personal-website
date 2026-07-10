import { Container } from "@/components/ui/Container";
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
    <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-24">
      {data?.sectionLabel ? (
        <div className="flex w-full items-center gap-3 lg:w-auto lg:py-3">
          <p className="font-inter uppercase text-xl font-medium leading-[120%] text-[var(--color-gray-700)] md:text-2xl">
            {data.sectionLabel}
          </p>
        </div>
      ) : null}

      <div className="flex w-full flex-col items-start gap-5 lg:flex-1">
        {data?.title ? (
          <h2 className="font-inter w-full text-[32px] font-normal leading-[140%] text-black md:text-[44px] md:leading-[140%] lg:max-w-[571px]">
            {data.title}
          </h2>
        ) : null}

        {data?.description ? (
          <p className="font-inter w-full text-base font-normal leading-[150%] text-[var(--color-gray-700)] md:max-w-[451px] md:text-lg">
            {data.description}
          </p>
        ) : null}
      </div>
    </div>
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
    <article className="flex w-full flex-col items-start gap-5">
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

      <div className="h-px w-full bg-gray-200" />

      {service.description ? (
        <p className="font-inter w-full text-base font-normal leading-[150%] text-[var(--color-gray-900)] md:text-xl md:leading-[120%]">
          {service.description}
        </p>
      ) : null}
    </article>
  );
}

function ServiceList({ services }: { services: ServiceItemWithContent[] }) {
  if (!services.length) return null;

  return (
    <div className="flex w-full flex-col items-start gap-10 md:gap-14 lg:grid lg:grid-cols-[384px_384px] lg:gap-x-24 lg:gap-y-14 lg:pl-48">
      {services.map((service, index) => (
        <ServiceCard
          key={service._key}
          service={service}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}

export function Service({ data, className }: ServiceProps) {
  if (!hasServiceContent(data)) return null;

  const services = data?.services?.filter(hasServiceItemContent) ?? [];

  return (
    <section
      className={cn(
        "w-full overflow-hidden bg-white px-0 pt-10 pb-14 md:pt-14 md:pb-20 lg:py-24",
        className,
      )}
    >
      <Container>
        <div className="flex w-full flex-col items-center gap-14 md:gap-24">
          <ServiceHeader data={data} />
          <ServiceList services={services} />
        </div>
      </Container>
    </section>
  );
}
