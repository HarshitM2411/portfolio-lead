import { site } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { hasBlogPosts } from "@/lib/blog";

export function Footer() {
  const year = new Date().getFullYear();
  const showBlog = hasBlogPosts();

  return (
    <footer className="border-t border-border bg-card py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.location}</p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-4 font-mono text-xs text-muted-foreground"
        >
          <a
            href="/#projects"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Projects
          </a>
          <a
            href="/resume"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Resume
          </a>
          {showBlog ? (
            <a
              href="/blog"
              className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Blog
            </a>
          ) : null}
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            LinkedIn
          </a>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Email
          </a>
        </nav>
        <p className="font-mono text-xs text-muted-foreground">
          © {year} {site.name}
        </p>
      </Container>
    </footer>
  );
}
