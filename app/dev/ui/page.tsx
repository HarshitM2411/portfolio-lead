import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "UI Preview | Phase 1",
  robots: { index: false, follow: false },
};

/** Throwaway Phase 1 sandbox — remove or gate before launch. */
export default function UiPreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-12 md:px-10">
      <header className="space-y-2">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          01 // Phase 1 preview
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Precision Slate primitives
        </h1>
        <p className="max-w-prose text-[var(--text-secondary)]">
          Light-only shadcn kit themed to docs/web-design. Not linked from the
          portfolio home.
        </p>
      </header>

      <Separator />

      <section className="space-y-4">
        <h2 className="font-mono text-sm text-muted-foreground">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Download CV</Button>
          <Button variant="outline">Contact Me</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-sm text-muted-foreground">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Node.js</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="outline">RAG</Badge>
          <span className="inline-flex items-center rounded-[4px] border border-[#BAE6FD] bg-[#F0F9FF] px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-[#0369A1] uppercase">
            Telemetry chip
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-sm text-muted-foreground">
          Accordion / Collapsible
        </h2>
        <Accordion className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <AccordionItem value="role-1">
            <AccordionTrigger>Lead Software Engineer — Air India</AccordionTrigger>
            <AccordionContent>
              Expandable impact bullets live here in Phase 4.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="role-2">
            <AccordionTrigger>Software Engineer — UniCommerce</AccordionTrigger>
            <AccordionContent>
              Uneven bullet counts must not break the layout.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Collapsible className="rounded-xl border border-border bg-card p-4 shadow-soft">
          <CollapsibleTrigger className="font-medium">
            Project compact → expanded
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 text-sm text-[var(--text-secondary)]">
            Problem → Approach → Stack → Outcome
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-sm text-muted-foreground">Form controls</h2>
        <div className="grid max-w-lg gap-4 rounded-xl border border-border bg-card p-6 shadow-soft">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="How can I help?" rows={4} />
          </div>
          <Button type="button" className="w-full sm:w-auto">
            Send message
          </Button>
        </div>
      </section>

      <section className="space-y-2 rounded-xl border border-border bg-card p-6 shadow-soft">
        <p className="font-mono text-xs text-muted-foreground">Metrics sample</p>
        <p className="font-mono text-3xl font-semibold font-tabular text-primary">
          100K
        </p>
        <p className="text-sm text-muted-foreground">users scaled</p>
      </section>
    </main>
  );
}
