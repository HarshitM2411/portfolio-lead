"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

type PhoneRevealProps = {
  phone: string;
  compact?: boolean;
};

export function PhoneReveal({ phone, compact = false }: PhoneRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 font-mono text-xs text-[#090D16]">
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="text-sm font-bold underline-offset-4 hover:underline"
        >
          {phone}
        </a>
        <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
          VERIFIED
        </span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex w-full items-center justify-between">
        <span className="font-mono text-[11px] text-slate-500">
          VOICE_CIRCUIT: SECURED
        </span>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-sky-700 uppercase hover:underline"
        >
          <Eye className="size-3.5" aria-hidden />
          [ REVEAL PHONE ]
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-xs text-slate-600 uppercase transition-colors hover:bg-slate-100 hover:text-[#090D16]"
    >
      <span>[ REVEAL SECURE PHONE ]</span>
      <Eye className="size-4 text-slate-500" aria-hidden />
    </button>
  );
}
