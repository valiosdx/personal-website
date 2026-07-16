"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { fadeIn, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
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
    <motion.section
      className={cn("w-full bg-white py-10 md:py-14", className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      aria-labelledby={data?.title ? "contact-title" : undefined}
    >
      <Container>
        <motion.div
          className="flex w-full flex-col gap-10"
          variants={staggerContainer}
        >
          {/* Heading and description */}
          <motion.div
            className={cn(
              "flex w-full flex-col items-start gap-5",
              "lg:flex-row lg:items-center lg:justify-between lg:gap-16",
            )}
            variants={staggerContainer}
          >
            {data?.title ? (
              <motion.h2
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
                variants={fadeUp}
              >
                {data.title}
              </motion.h2>
            ) : null}

            {data?.description ? (
              <motion.p
                className={cn(
                  "w-full font-inter text-base font-normal leading-[150%]",
                  "text-[var(--color-gray-700)]",

                  // Tablet
                  "md:max-w-96 md:text-xl md:font-semibold md:leading-[120%]",

                  // Desktop
                  "lg:max-w-96",
                )}
                variants={fadeUp}
              >
                {data.description}
              </motion.p>
            ) : null}
          </motion.div>

          {/* Mobile and tablet divider */}
          <motion.div
            className="h-px w-full bg-[var(--color-gray-200)] lg:hidden"
            variants={fadeIn}
            aria-hidden="true"
          />

          {/* Contact information and social */}
          <motion.div
            className={cn(
              "flex w-full flex-col items-start gap-10",

              // Tablet
              "md:flex-row md:items-center md:justify-between md:gap-6",

              // Desktop
              "lg:items-start lg:gap-16",
            )}
            variants={staggerContainer}
          >
            {/* Email and phone */}
            <motion.address
              className={cn(
                "flex w-full flex-col gap-6 not-italic",

                // Tablet
                "md:w-auto md:min-w-0",

                // Desktop
                "lg:w-full lg:max-w-[609px]",
              )}
              variants={staggerContainer}
            >
              {/* Email */}
              {data?.email ? (
                <motion.div
                  className="flex flex-col items-start gap-3"
                  variants={fadeUp}
                >
                  <p className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-500)]">
                    {data.emailLabel || "Email"}
                  </p>

                  <a
                    href={`mailto:${data.email}`}
                    className={cn(
                      "w-fit max-w-full break-all",
                      "font-inter text-lg font-medium leading-7",
                      "text-[var(--color-gray-900)]",
                      "interaction-transition transition-opacity hover:opacity-70",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-gray-700",
                      "focus-visible:ring-offset-4",
                    )}
                  >
                    {data.email}
                  </a>
                </motion.div>
              ) : null}

              {/* Phone */}
              {data?.phone && phoneHref ? (
                <motion.div
                  className="flex flex-col items-start gap-3"
                  variants={fadeUp}
                >
                  <p className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-500)]">
                    {data.phoneLabel || "Phone"}
                  </p>

                  <a
                    href={phoneHref}
                    className={cn(
                      "w-fit max-w-full",
                      "font-inter text-lg font-medium leading-7",
                      "text-[var(--color-gray-900)]",
                      "interaction-transition transition-opacity hover:opacity-70",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-gray-700",
                      "focus-visible:ring-offset-4",
                    )}
                  >
                    {data.phone}
                  </a>
                </motion.div>
              ) : null}
            </motion.address>

            {/* Social */}
            {socials.length > 0 ? (
              <motion.div
                className="flex w-auto shrink-0 flex-col items-start gap-3"
                variants={fadeUp}
              >
                <p className="font-inter text-lg font-medium leading-7 text-[var(--color-gray-500)]">
                  {data?.socialLabel || "Social"}
                </p>

                <motion.ul
                  className="flex flex-col items-start gap-3"
                  variants={staggerContainer}
                >
                  {socials.map((social) => (
                    <motion.li key={social._key} variants={fadeUp}>
                      {social.url ? (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "w-fit font-inter text-lg font-medium leading-7",
                            "text-[var(--color-gray-900)]",
                            "interaction-transition transition-opacity hover:opacity-70",
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
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </Container>
    </motion.section>
  );
}
