import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";

type SectionProps = {
  id: string;
  title?: string;
  index?: string;
  meta?: string;
  children: ReactNode;
  className?: string;
  /** Hide the section chrome title row (e.g. hero). */
  hideHeader?: boolean;
};

export function Section({
  id,
  title,
  index,
  meta,
  children,
  className,
  hideHeader = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("scroll-mt-20 py-6 md:scroll-mt-32 md:py-10 lg:py-14", className)}
    >
      <Container>
        {!hideHeader && (title || index) ? (
          <SectionHeader id={id} index={index} title={title} meta={meta} />
        ) : null}
        {children}
      </Container>
    </section>
  );
}
