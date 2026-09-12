import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id?: string;
  index?: string;
  title?: string;
  meta?: ReactNode;
  className?: string;
};

export function SectionHeader({
  id,
  index,
  title,
  meta,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-col gap-2 border-b border-slate-200/80 pb-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between md:mb-10",
        className,
      )}
    >
      <div className="space-y-1">
        {index ? (
          <p className="font-mono text-[11px] font-semibold tracking-wider text-[#2563EB] uppercase md:text-xs">
            {index}
          </p>
        ) : null}
        {title ? (
          <h2
            id={id ? `${id}-heading` : undefined}
            className="font-heading text-2xl font-bold tracking-tight text-[#090D16] sm:text-3xl"
          >
            {title}
          </h2>
        ) : null}
      </div>
      {meta ? (
        <div className="shrink-0 font-mono text-[10px] text-slate-500 sm:text-xs">
          {typeof meta === "string" ? (
            <span className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              {meta}
            </span>
          ) : (
            meta
          )}
        </div>
      ) : null}
    </header>
  );
}
