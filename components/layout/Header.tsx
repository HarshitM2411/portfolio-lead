import { ArrowUpRight, Download } from "lucide-react";
import { site } from "@/data/site";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#overview", label: "01_OVERVIEW" },
  { href: "#experience", label: "02_EXPERIENCE" },
  { href: "#projects", label: "03_SYSTEMS_AI" },
  { href: "#skills", label: "04_SKILLS" },
  { href: "#contact", label: "05_CONTACT" },
] as const;

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const mark = initials(site.name);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 md:top-4", className)}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-glass focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>

      {/* Mobile sticky bar */}
      <div className="border-b border-slate-200/80 bg-white/80 pt-safe shadow-glass backdrop-blur-xl md:hidden">
        <div className="mx-auto flex h-14 max-w-md items-center justify-between px-3.5">
          <a href="#overview" className="flex items-center gap-2.5">
            <BrandMark compact label={mark} />
            <span className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-tight text-[#090D16] uppercase leading-tight">
                HM.SYS
              </span>
              <span className="font-mono text-[9px] leading-none text-slate-400">
                LEAD_ENG
              </span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-2 py-1 font-mono text-[10px] font-semibold text-emerald-800">
              <LiveDot />
              <span className="tracking-tight">OPEN</span>
            </span>
            <a
              href={site.resumePath}
              className="flex h-8 items-center gap-1 rounded-xl bg-slate-900 px-2.5 font-mono text-[11px] font-bold tracking-wide text-white shadow-sm active:scale-95"
            >
              <Download className="size-3.5 text-sky-400" aria-hidden />
              CV
            </a>
          </div>
        </div>
      </div>

      {/* Desktop floating glass dock */}
      <div className="mx-auto hidden max-w-7xl px-4 sm:px-6 md:block">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-2.5 shadow-glass backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <a href="#overview" className="group flex items-center gap-3">
              <BrandMark label={mark} />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-[#090D16] transition-colors group-hover:text-[#2563EB]">
                  {site.name}
                </span>
                <span className="block font-mono text-[10px] leading-none text-slate-400">
                  LEAD_ENG // DTU_2020
                </span>
              </span>
            </a>
            <div className="ml-3 hidden items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1 lg:flex">
              <LiveDot />
              <span className="font-mono text-[11px] font-semibold text-emerald-800">
                Open for Lead / Staff AI roles
              </span>
            </div>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-xl border border-slate-200/60 bg-slate-100/80 p-1 font-mono text-xs text-slate-600 lg:flex"
          >
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 transition-all hover:bg-white/80 hover:text-[#090D16]",
                  i === 0 && "font-semibold text-[#090D16] hover:bg-white hover:shadow-sm",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 font-mono text-xs text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-[#090D16] sm:inline-flex"
            >
              <span className="font-semibold">GitHub</span>
              <ArrowUpRight className="size-3.5 text-slate-400" aria-hidden />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 font-mono text-xs text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-[#090D16] sm:inline-flex"
            >
              <span className="font-semibold">LinkedIn</span>
              <ArrowUpRight className="size-3.5 text-slate-400" aria-hidden />
            </a>
            <a
              href={site.resumePath}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide text-white shadow-md shadow-slate-900/10 transition-all hover:scale-[1.02] hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
            >
              <Download className="size-3.5 text-sky-400" aria-hidden />
              RESUME (PDF)
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function BrandMark({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-700 font-bold tracking-tight text-white shadow-md",
        compact ? "h-8 w-8 rounded-lg text-[10px]" : "h-9 w-9 text-xs",
      )}
    >
      {label}
      <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
    </span>
  );
}
