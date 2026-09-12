import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { hasBlogPosts } from "@/lib/blog";
import { initials } from "@/lib/format";
import { Container } from "@/components/layout/Container";

export function Footer() {
  const year = new Date().getFullYear();
  const showBlog = hasBlogPosts();
  const mark = initials(site.name);

  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/95 py-8 backdrop-blur-xl md:py-12">
      <Container>
        {/* Mobile compact */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-bold text-white">
                {mark}
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wide text-[#090D16]">
                {site.name}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] font-semibold text-emerald-800">
                Operational
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-[#2563EB]"
            >
              GitHub
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-[#2563EB]"
            >
              LinkedIn
            </a>
            <a
              href="#contact"
              className="flex items-center gap-1 font-bold text-sky-700 hover:text-[#2563EB]"
            >
              Contact
            </a>
          </div>
          <p className="border-t border-slate-100 pt-2 text-center font-mono text-[10px] text-slate-400">
            Precision architecture
          </p>
        </div>

        {/* Desktop 4-col */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 gap-8 border-b border-slate-100 pb-8 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                  {mark}
                </span>
                <span className="text-base font-bold text-[#090D16]">{site.name}</span>
              </div>
              <p className="font-mono text-xs text-slate-500">
                DTU alum · Lead Software Engineer
              </p>
              <p className="font-mono text-[11px] text-slate-400">
                Distributed systems · Applied AI
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-wide text-slate-700">
                Location
              </p>
              <p className="flex items-center gap-1.5 font-mono text-xs text-[#090D16]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {site.location} / Remote-Ready
              </p>
              <p className="font-mono text-xs text-slate-500">Timezone: IST (UTC +05:30)</p>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-wide text-slate-700">
                Links
              </p>
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-slate-600 transition-colors hover:text-[#2563EB]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-slate-600 transition-colors hover:text-[#2563EB]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center justify-between text-[#2563EB] transition-colors hover:underline"
                >
                  <span>Email</span>
                  <Mail className="size-3.5" aria-hidden />
                </a>
                {showBlog ? (
                  <a
                    href="/blog"
                    className="flex items-center justify-between text-slate-600 transition-colors hover:text-[#2563EB]"
                  >
                    <span>Blog</span>
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-xs font-bold tracking-wide text-slate-700">
                Status
              </p>
              <div className="space-y-1 font-mono text-xs">
                <p className="flex items-center justify-between text-[#090D16]">
                  <span className="text-slate-500">Status</span>
                  <span className="font-bold text-slate-800">200 OK</span>
                </p>
                <p className="flex items-center justify-between text-[#090D16]">
                  <span className="text-slate-500">Node</span>
                  <span className="font-bold text-emerald-700">Ready</span>
                </p>
                <p className="pt-1 text-[11px] text-slate-400">
                  Portfolio
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 font-mono text-xs text-slate-500 sm:flex-row">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <span>Precision architecture</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
