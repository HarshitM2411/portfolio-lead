import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { about } from "@/data/about";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { metrics } from "@/data/metrics";
import { buttonVariants } from "@/components/ui/button";
import { PrintButton } from "@/components/resume/PrintButton";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description: `Printable resume view for ${site.name}`,
  robots: { index: false, follow: false },
};

function formatRange(start: string, end: string) {
  const fmt = (iso: string) => {
    if (iso === "Present") return "Present";
    const [y, m] = iso.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[Number(m) - 1]} ${y}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function ResumePage() {
  return (
    <div className="resume-print min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-8 print:max-w-none print:px-0 print:py-0">
        <div className="mb-8 flex flex-wrap gap-3 print:hidden">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            ← Portfolio
          </Link>
          <a
            href={site.resumePath}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            Download PDF
          </a>
          <PrintButton />
        </div>

        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-base text-[var(--text-secondary)]">
            {site.title}
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {site.email} · {site.location} ·{" "}
            <a href={site.socials.linkedin}>LinkedIn</a> ·{" "}
            <a href={site.socials.github}>GitHub</a>
          </p>
        </header>

        <section className="mt-6">
          <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
            Summary
          </h2>
          {about.paragraphs.map((p) => (
            <p
              key={p.slice(0, 20)}
              className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {p}
            </p>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
            Impact
          </h2>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {metrics.map((m) => (
              <li key={m.id} className="text-sm">
                <span className="font-mono font-semibold font-tabular">
                  {m.value}
                </span>{" "}
                <span className="text-muted-foreground">{m.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
            Experience
          </h2>
          <div className="mt-3 space-y-5">
            {experience.map((job) => (
              <article key={job.id}>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                  <h3 className="text-sm font-semibold">
                    {job.role} · {job.company}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatRange(job.start, job.end)}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{job.location}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--text-secondary)]">
                  {job.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
            AI / LLM projects
          </h2>
          <ul className="mt-3 space-y-3">
            {projects.map((p) => (
              <li key={p.id}>
                <h3 className="text-sm font-semibold">{p.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {p.summary}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  {p.stack.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
            Skills
          </h2>
          <div className="mt-2 space-y-2">
            {skills.map((g) => (
              <p key={g.category} className="text-sm">
                <span className="font-medium">{g.category}:</span>{" "}
                <span className="text-[var(--text-secondary)]">
                  {g.items.join(", ")}
                </span>
              </p>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
            Education
          </h2>
          <p className="mt-2 text-sm">
            {education.degree} in {education.field} — {education.school}
            {education.detail ? ` · ${education.detail}` : ""}
          </p>
        </section>
      </div>
    </div>
  );
}
