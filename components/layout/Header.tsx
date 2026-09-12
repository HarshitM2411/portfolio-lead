import { buttonVariants } from "@/components/ui/button";
import { site } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/70 bg-frost",
        className,
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:shadow-soft focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Container className="flex h-14 items-center justify-between gap-4">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.resumePath}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Resume
        </a>
      </Container>

      <nav
        aria-label="Mobile"
        className="flex gap-3 overflow-x-auto border-t border-border/60 px-4 py-2 md:hidden"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
