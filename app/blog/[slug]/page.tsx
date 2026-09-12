import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="py-12 md:py-16">
        <Container className="max-w-2xl">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-6")}
          >
            ← Blog
          </Link>
          <p className="font-mono text-xs text-muted-foreground">{post.date}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          {post.description ? (
            <p className="mt-3 text-base text-[var(--text-secondary)]">
              {post.description}
            </p>
          ) : null}
          <article className="prose-portfolio mt-8 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">
            {post.content}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
