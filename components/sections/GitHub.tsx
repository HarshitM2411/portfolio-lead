import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import type { GitHubConfig } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

type GitHubSectionProps = {
  github: GitHubConfig;
};

export function GitHubSection({ github }: GitHubSectionProps) {
  const repos = github.pinnedRepoSlugs ?? [];

  return (
    <Section id="github" index="09 // GitHub" title="GitHub presence">
      <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              @{github.username}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Public repos and experiments — frontend-only links, no backend
              proxy.
            </p>
          </div>
          <a
            href={github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            View profile
            <ExternalLink className="size-3.5" aria-hidden />
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
                  className="block rounded-lg border border-border bg-background p-4 transition-colors hover:border-[var(--border-medium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <p className="font-mono text-sm font-medium text-foreground">
                    {slug}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
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
