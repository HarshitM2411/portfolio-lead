import type { SiteConfig } from "@/lib/types";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { PhoneReveal } from "@/components/sections/PhoneReveal";
import { CopyEmail } from "@/components/ui/copy-email";
import { ArrowUpRight } from "lucide-react";

type ContactSectionProps = {
  site: SiteConfig;
};

export function ContactSection({ site }: ContactSectionProps) {
  return (
    <Section
      id="contact"
      index="Contact"
      title="Initiate Contact / Technical Inquiry"
      meta="Open for inquiries"
      className="py-8 md:py-16"
    >
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-6 rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-bento backdrop-blur-xl sm:p-9 lg:col-span-7">
          <div className="hidden items-center justify-between border-b border-slate-100 pb-3 md:flex">
            <span className="font-mono text-xs font-bold tracking-wide text-slate-500">
              Message
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-xs font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Ready
            </span>
          </div>
          <ContactForm email={site.email} />
          <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 md:hidden">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <a
                href={`mailto:${site.email}`}
                className="truncate font-mono text-xs font-bold text-[#090D16]"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
            {site.phone ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <PhoneReveal phone={site.phone} compact />
              </div>
            ) : null}
          </div>
        </div>

        <aside className="hidden space-y-4 lg:col-span-5 lg:block">
          <div className="space-y-3 rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-bento backdrop-blur-xl">
            <div className="flex items-center justify-between font-mono text-xs font-semibold text-slate-500">
              <span>Email</span>
              <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] text-[#2563EB]">
                Primary inbox
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <a
                href={`mailto:${site.email}`}
                className="truncate font-mono text-sm font-bold text-[#2563EB] hover:underline"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
            <p className="font-mono text-xs text-slate-500">
              Direct inbox for technical inquiries and leadership roles.
            </p>
          </div>

          {site.phone ? (
            <div className="space-y-3 rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-bento backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-slate-500">
                  Phone
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                  Hidden until reveal
                </span>
              </div>
              <PhoneReveal phone={site.phone} />
            </div>
          ) : null}

          <div className="space-y-3 rounded-3xl border border-slate-200/90 bg-white/95 p-6 font-mono text-xs shadow-bento backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 font-bold text-slate-500">
              <span>Details</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-2 text-slate-600">
              <p className="flex justify-between gap-3">
                <span>Location</span>
                <span className="font-semibold text-[#090D16]">{site.location}</span>
              </p>
              <p className="flex justify-between gap-3">
                <span>Remote</span>
                <span className="rounded bg-emerald-50 px-2 font-bold text-emerald-700">
                  Yes / global ready
                </span>
              </p>
              <p className="flex justify-between gap-3">
                <span>Timezone</span>
                <span className="font-semibold text-[#090D16]">IST (UTC +05:30)</span>
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 font-bold text-slate-500">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#2563EB]"
              >
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#2563EB]"
              >
                LinkedIn
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
