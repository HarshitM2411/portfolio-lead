"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type PhoneRevealProps = {
  phone: string;
};

/** EC-05: do not show raw phone at rest. */
export function PhoneReveal({ phone }: PhoneRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={() => setRevealed(true)}>
        Reveal phone
      </Button>
    );
  }

  return (
    <a
      href={`tel:${phone.replace(/\s+/g, "")}`}
      className="font-mono text-sm font-medium text-foreground underline-offset-4 hover:underline"
    >
      {phone}
    </a>
  );
}
