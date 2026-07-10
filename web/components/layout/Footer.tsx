import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Homepage } from "@/types/homepage";

type FooterData = Homepage["copyright"];

type FooterProps = {
  data?: FooterData;
  className?: string;
};

function splitCopyrightText(value?: string) {
  const text = value?.trim();

  if (!text) return null;

  const firstSentenceEnd = text.indexOf(". ");

  if (firstSentenceEnd === -1) {
    return {
      primary: text,
      secondary: "",
    };
  }

  return {
    primary: text.slice(0, firstSentenceEnd + 1),
    secondary: text.slice(firstSentenceEnd + 2),
  };
}

export function Footer({ data, className }: FooterProps) {
  if (!data?.leftText && !data?.rightText) return null;

  const copyright = splitCopyrightText(data.leftText);

  return (
    <footer className={cn("w-full bg-white pt-14 pb-14", className)}>
      <Container>
        <div className="flex w-full flex-col gap-6">
          {/* Divider */}
          <div className="h-px w-full bg-[var(--color-gray-200)]" />

          {/* Footer content */}
          <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {copyright ? (
              <p className="font-inter text-base font-medium leading-7 md:text-lg">
                <span className="text-[var(--color-gray-900)]">
                  {copyright.primary}
                </span>

                {copyright.secondary ? (
                  <>
                    {" "}
                    <span className="text-[var(--color-gray-400)]">
                      {copyright.secondary}
                    </span>
                  </>
                ) : null}
              </p>
            ) : null}

            {data?.rightText ? (
              <p className="font-inter text-base font-medium leading-7 text-[var(--color-gray-500)] md:text-lg">
                {data.rightText}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
