"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  email: string;
};

/**
 * Opens the visitor's email client with a prefilled message to `email`.
 * No third-party form backend — frontend-only mailto flow.
 */
export function ContactForm({ email }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const fromEmail = String(fd.get("email") ?? "").trim();
    const subject =
      String(fd.get("subject") ?? "").trim() || "Portfolio inquiry";
    const message = String(fd.get("message") ?? "").trim();

    const body = [
      message,
      "",
      "—",
      name ? `Name: ${name}` : null,
      fromEmail ? `Reply-to: ${fromEmail}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("opened");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--text-secondary)]">
        Fill this in and your email app will open a message to{" "}
        <span className="font-medium text-foreground">{email}</span>.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">01 — Your name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">02 — Your email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">03 — Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Role / collaboration"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">04 — Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can I help?"
          />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          Open email to send
        </Button>
      </form>

      {status === "opened" ? (
        <p className="text-sm text-emerald-700" role="status">
          Email draft opened — hit send in your mail app to deliver it.
        </p>
      ) : null}

      <p className="text-sm text-muted-foreground">
        Or email directly:{" "}
        <a
          href={`mailto:${email}`}
          className={cn(buttonVariants({ variant: "link" }), "h-auto px-0")}
        >
          {email}
        </a>
      </p>
    </div>
  );
}
