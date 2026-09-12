import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import type { GitHubConfig } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type GitHubSectionProps = {
  github: GitHubConfig;
};

export function GitHubSection({ github }: GitHubSectionProps) {
  const repos = github.pinnedRepoSlugs ?? [];

  return (
    <Section
      id="github"
      index="[06_EXTERNAL_REGISTRY]"
      title="GitHub presence"
      meta={`@${github.username}`}
      className="py-8 md:py-10"
    >
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-bento backdrop-blur-md md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Public repos and experiments — frontend-only links, no backend proxy.
          </p>
          <a
            href={github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2 rounded-xl")}
          >
            View profile
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>

        {repos.length > 0 ? (
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {repos.map((slug) => (
              <li key={slug}>
                <a
                  href={`${github.profileUrl.replace(/\/$/, "")}/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift block rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <p className="font-mono text-sm font-medium text-[#090D16]">{slug}</p>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">
                    github.com/{github.username}/{slug}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}
