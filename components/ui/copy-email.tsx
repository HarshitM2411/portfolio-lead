"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyEmailProps = {
  email: string;
  className?: string;
};

export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-colors hover:border-[#2563EB] hover:text-[#2563EB]",
        className,
      )}
      aria-label={copied ? "Email copied" : "Copy email"}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span className="font-mono text-[11px] font-bold uppercase md:hidden">
        {copied ? "COPIED" : "COPY"}
      </span>
    </button>
  );
}
