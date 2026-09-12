import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

/**
 * Blog shell — add `content/blog/*.mdx` (or `.md`) with frontmatter to publish.
 * Empty collection → no nav link / hide from home (architecture hide-when-empty).
 */
export function getBlogPosts(): BlogPostMeta[] {
  ensureBlogDir();
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter(
      (f) =>
        (f.endsWith(".mdx") || f.endsWith(".md")) &&
        !f.startsWith(".") &&
        f.toLowerCase() !== "readme.md",
    );

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx?$/, "");
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        published: data.published !== false,
      } satisfies BlogPostMeta;
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getBlogPost(
  slug: string,
): (BlogPostMeta & { content: string }) | null {
  ensureBlogDir();
  for (const ext of [".mdx", ".md"]) {
    const full = path.join(BLOG_DIR, `${slug}${ext}`);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    if (data.published === false) return null;
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      published: true,
      content: content.trim(),
    };
  }
  return null;
}

export function hasBlogPosts(): boolean {
  return getBlogPosts().length > 0;
}
