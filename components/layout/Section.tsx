import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

type SectionProps = {
  id: string;
  title?: string;
  index?: string;
  children: ReactNode;
  className?: string;
  /** Hide the section chrome title row (e.g. hero). */
  hideHeader?: boolean;
};

export function Section({
  id,
  title,
  index,
  children,
  className,
  hideHeader = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("scroll-mt-24 py-12 md:py-16 lg:py-20", className)}
    >
      <Container>
        {!hideHeader && (title || index) ? (
          <header className="mb-8 space-y-2">
            {index ? (
              <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                {index}
              </p>
            ) : null}
            {title ? (
              <h2
                id={`${id}-heading`}
                className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
              >
                {title}
              </h2>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
