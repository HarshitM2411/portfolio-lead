"use client";

import { Activity, Briefcase, LayoutGrid, Mail, Network } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "#overview", label: "SYS", icon: LayoutGrid },
  { href: "#metrics", label: "METRICS", icon: Activity },
  { href: "#experience", label: "TRACE", icon: Briefcase },
  { href: "#projects", label: "AI", icon: Network },
  { href: "#contact", label: "PING", icon: Mail },
] as const;

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/90 pb-safe shadow-[0_-4px_16px_rgba(15,23,42,0.05)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex h-14 max-w-md items-center justify-around px-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 w-14 flex-col items-center justify-center transition-colors",
                i === 0
                  ? "font-bold text-[#2563EB]"
                  : "text-slate-500 hover:text-[#090D16]",
              )}
            >
              <Icon className="size-5" aria-hidden />
              <span className="mt-0.5 font-mono text-[10px] tracking-tighter">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
