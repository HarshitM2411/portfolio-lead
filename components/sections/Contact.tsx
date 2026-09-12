import type { SiteConfig } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { PhoneReveal } from "@/components/sections/PhoneReveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  site: SiteConfig;
};

export function ContactSection({ site }: ContactSectionProps) {
  return (
    <Section id="contact" index="10 // Contact" title="Initiate contact">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft lg:col-span-7">
          <ContactForm email={site.email} />
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              Quick reach
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.phone ? (
                <div>
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd className="mt-2">
                    <PhoneReveal phone={site.phone} />
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="mt-1 font-medium text-foreground">{site.location}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={site.resumePath}
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Download CV
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                LinkedIn
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                GitHub
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
