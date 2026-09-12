import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { getBlogPosts } from "@/lib/blog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing and notes from Harshit Meena",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Header />
      <main className="relative z-10 pt-24 pb-28 md:pt-32 md:pb-16">
        <Container className="max-w-2xl">
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Writing
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Blog</h1>

          {posts.length === 0 ? (
            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-soft">
              <p className="text-sm text-[var(--text-secondary)]">
                No posts yet. This shell is ready — add an MDX/Markdown file under{" "}
                <code className="font-mono text-xs">content/blog/</code> with
                frontmatter to publish.
              </p>
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}
              >
                Back home
              </Link>
            </div>
          ) : (
            <ul className="mt-8 space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-[var(--border-medium)]"
                  >
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {post.date}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
                    {post.description ? (
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        {post.description}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
