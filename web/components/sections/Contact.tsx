import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type ContactData = Homepage["contact"];

type ContactProps = {
  data?: ContactData;
  className?: string;
};

function hasContactContent(data?: ContactData) {
  return Boolean(
    data?.title ||
    data?.description ||
    data?.email ||
    data?.phone ||
    data?.socials?.some((social) => social?.label),
  );
}

export function Contact({ data, className }: ContactProps) {
  if (!hasContactContent(data)) return null;

  const socials = data?.socials?.filter((social) => social?.label) ?? [];

  const phoneHref = data?.phone
    ? `tel:${data.phone.replace(/[^\d+]/g, "")}`
    : undefined;

  return (
    <section
      className={cn("w-full bg-white py-10 md:py-14", className)}
      aria-labelledby={data?.title ? "contact-title" : undefined}
    >
      <Container>
        <div className="flex w-full flex-col gap-10">
          {/* Heading dan description */}
          <div
            className={cn(
              "flex w-full flex-col items-start gap-5",

              // Desktop
              "lg:flex-row lg:items-center lg:justify-between lg:gap-16",
            )}
          >
            {data?.title ? (
              <h2
                id="contact-title"
                className={cn(
                  "w-full font-inter font-medium",
                  "text-[var(--color-gray-900)]",

                  // Mobile
                  "text-6xl leading-[132%]",

                  // Tablet
                  "md:text-[80px]",

                  // Desktop
                  "lg:max-w-[777px]",
                )}
              >
                {data.title}
              </h2>
            ) : null}

            {data?.description ? (
              <p
                className={cn(
                  "w-full font-inter text-base font-normal leading-[150%]",
                  "text-[var(--color-gray-700)]",

                  // Tablet
                  "md:max-w-96 md:text-xl md:font-semibold md:leading[120%]",

                  // Desktop
                  "lg:max-w-96",
                )}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          <div
            className="h-px w-full bg-[var(--color-gray-200)] lg:hidden"
            aria-hidden="true"
          />

          {/* Contact information dan social */}
          <div
            className={cn(
              "flex w-full flex-col items-start gap-10",

              // Tablet
              "md:flex-row md:items-center md:justify-between md:gap-6",

              // Desktop
              "lg:items-start lg:gap-16",
            )}
          >
            {/* Email dan phone */}
            <address
              className={cn(
                "flex w-full flex-col gap-6 not-italic",

                // Tablet
                "md:w-auto md:min-w-0",

                // Desktop
                "lg:w-full lg:max-w-[609px]",
              )}
            >
              {/* Email */}
              {data?.email ? (
                <div className="flex flex-col items-start gap-3">
                  <p className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-500)]">
                    {data.emailLabel || "Email"}
                  </p>

                  <a
                    href={`mailto:${data.email}`}
                    className={cn(
                      "w-fit max-w-full break-all",
                      "font-inter text-lg font-medium leading-7",
                      "text-[var(--color-gray-900)]",
                      "transition-opacity hover:opacity-70",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-gray-700",
                      "focus-visible:ring-offset-4",
                    )}
                  >
                    {data.email}
                  </a>
                </div>
              ) : null}

              {/* Phone */}
              {data?.phone && phoneHref ? (
                <div className="flex flex-col items-start gap-3">
                  <p className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-500)]">
                    {data.phoneLabel || "Phone"}
                  </p>

                  <a
                    href={phoneHref}
                    className={cn(
                      "w-fit max-w-full",
                      "font-inter text-lg font-medium leading-7",
                      "text-[var(--color-gray-900)]",
                      "transition-opacity hover:opacity-70",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-gray-700",
                      "focus-visible:ring-offset-4",
                    )}
                  >
                    {data.phone}
                  </a>
                </div>
              ) : null}
            </address>

            {/* Social */}
            {socials.length > 0 ? (
              <div className="flex w-auto shrink-0 flex-col items-start gap-3">
                <p className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-500)]">
                  {data?.socialLabel || "Social"}
                </p>

                <ul className="flex flex-col items-start gap-3">
                  {socials.map((social) => (
                    <li key={social._key}>
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "w-fit font-inter text-lg font-medium leading-7",
                            "text-[var(--color-gray-900)]",
                            "transition-opacity hover:opacity-70",
                            "focus-visible:outline-none",
                            "focus-visible:ring-2",
                            "focus-visible:ring-gray-700",
                            "focus-visible:ring-offset-4",
                          )}
                        >
                          {social.label}
                        </a>
                      ) : (
                        <span className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-900)]">
                          {social.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
