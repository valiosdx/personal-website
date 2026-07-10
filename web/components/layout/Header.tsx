import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getButtonHref } from "@/lib/button";
import type { HeaderButton } from "@/types/homepage";

type HeaderData = {
  name?: string;
  button?: HeaderButton;
};

type HeaderProps = {
  data?: HeaderData;
};

export function Header({ data }: HeaderProps) {
  const button = data?.button;

  return (
    <header className="w-full pt-6 md:pt-10">
      <Container>
        <div className="flex w-full items-center justify-between gap-4">
          <h1 className="shrink-0 text-2xl font-medium leading-7 text-[var(--color-primary-500)] font-inter">
            {data?.name}
          </h1>

          {button?.label ? (
            <Button
              href={getButtonHref(button)}
              size="sm"
              openInNewTab={button.openInNewTab}
            >
              {button.label}
            </Button>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
