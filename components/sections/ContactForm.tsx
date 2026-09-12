"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const fromEmail = String(fd.get("email") ?? "").trim();
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

    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Portfolio inquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("opened");
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-3 md:space-y-5">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Engineering Director / Recruiter"
            autoComplete="name"
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="colleague@domain.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Detail architectural challenge, role scope, or project parameters..."
          />
        </div>
        <Button
          type="submit"
          variant="gradient"
          className="h-11 w-full rounded-xl py-3.5"
        >
          <Send className="size-4" aria-hidden />
          Send
        </Button>
      </form>

      {status === "opened" ? (
        <div
          className="space-y-1 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-mono text-xs"
          role="status"
        >
          <p className="font-bold text-emerald-800">
            Message opened
          </p>
          <p className="font-sans text-sm text-emerald-950">
            Email draft opened — hit send in your mail app to deliver it to{" "}
            {email}.
          </p>
        </div>
      ) : null}
    </div>
  );
}
