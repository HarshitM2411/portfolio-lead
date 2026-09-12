import type { SiteConfig } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, ExternalLink, Mail } from "lucide-react";

type HeroSectionProps = {
  site: SiteConfig;
};

export function HeroSection({ site }: HeroSectionProps) {
  return (
    <Section id="hero" hideHeader className="pt-16 md:pt-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Lead Software Engineer · MERN · AI / LLM
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            {site.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-[var(--text-secondary)] md:text-xl">
            {site.title}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={site.resumePath}
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              <Download className="size-4" aria-hidden />
              Download CV
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Contact Me
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2",
              )}
            >
              LinkedIn
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2",
              )}
            >
              GitHub
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }))}
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-soft lg:col-span-4">
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            Snapshot
          </p>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                Availability
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                Open to Lead / Staff conversations
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                Active focus
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                Agentic systems · RAG · LLM evals
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                Experience
              </dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-primary font-tabular">
                6+ years
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                Location
              </dt>
              <dd className="mt-1 font-medium text-foreground">{site.location}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
