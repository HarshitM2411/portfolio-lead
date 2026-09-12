import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-bento backdrop-blur-xl">
        <p className="font-mono text-sm font-bold text-sky-600">404</p>
        <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight text-[#090D16]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          That route is not part of this portfolio system.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "gradient", size: "lg" }), "mt-6 inline-flex rounded-xl")}
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
