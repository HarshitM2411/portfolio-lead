import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-soft">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That route is not part of this portfolio system.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
