import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { AgenticMatchingDiagram } from "@/components/diagrams/AgenticMatchingDiagram";
import { RagMatchingDiagram } from "@/components/diagrams/RagMatchingDiagram";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects
    .filter((p) => p.featured)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Harshit Meena`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.featured) notFound();

  return (
    <>
      <Header />
      <main className="py-12 md:py-16">
        <Container className="max-w-3xl">
          <Link
            href="/#projects"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6")}
          >
            ← Back to projects
          </Link>
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Case study
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="inline-flex rounded-[4px] border border-[#BAE6FD] bg-[#F0F9FF] px-2 py-0.5 font-mono text-[11px] font-medium text-[#0369A1]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
                Problem
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.problem}
              </p>
            </section>
            <section>
              <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
                Approach / architecture
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.approach}
              </p>
              <div className="mt-4">
                {project.diagram === "agentic-profile-matching" ? (
                  <AgenticMatchingDiagram />
                ) : null}
                {project.diagram === "rag-profile-matching" ? (
                  <RagMatchingDiagram />
                ) : null}
              </div>
            </section>
            <section>
              <h2 className="font-mono text-xs tracking-wide text-primary uppercase">
                Outcome
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.outcome}
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
