import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, SquarePen } from "lucide-react";
import type { DocPage } from "@/lib/docs";
import type { Heading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/** Breadcrumbs, eyebrow, the page's one h1, and its lead. */
export function DocHeader({
  crumbs,
  eyebrow,
  title,
  badge,
  lead,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  badge?: string;
  lead?: string;
}) {
  return (
    <header className="border-b pb-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {crumbs.map((crumb, i) => (
            <li key={crumb.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
              {i === crumbs.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.path} className="hover:text-foreground">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
        {badge && (
          <span className="ml-3 inline-block translate-y-[-0.4em] rounded-full border px-2.5 py-0.5 align-middle font-mono text-[0.65rem] font-normal tracking-wide text-muted-foreground">
            {badge}
          </span>
        )}
      </h1>
      {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{lead}</p>}
    </header>
  );
}

/** "Edit this page on GitHub", and links to the previous and next pages. */
export function DocFooter({
  editUrl,
  sourceNote,
  previous,
  next,
}: {
  editUrl: string;
  sourceNote?: React.ReactNode;
  previous?: DocPage;
  next?: DocPage;
}) {
  return (
    <footer className="mt-16 border-t pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <a href={editUrl} className="inline-flex items-center gap-2 hover:text-foreground">
          <SquarePen className="size-4" aria-hidden="true" /> Edit this page on GitHub
        </a>
        {sourceNote && <p className="text-xs">{sourceNote}</p>}
      </div>
      {(previous || next) && (
        <nav aria-label="Previous and next pages" className="mt-8 grid gap-4 sm:grid-cols-2">
          {previous ? (
            <Link
              href={previous.path}
              rel="prev"
              className="group rounded-lg border p-4 transition-colors hover:border-primary/50"
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
              </span>
              <span className="mt-1 block font-medium group-hover:text-primary">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.path}
              rel="next"
              className="group rounded-lg border p-4 text-right transition-colors hover:border-primary/50"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Next <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
              <span className="mt-1 block font-medium group-hover:text-primary">{next.title}</span>
            </Link>
          )}
        </nav>
      )}
    </footer>
  );
}

/** "On this page": the page's headings, down to `depth`. */
export function TableOfContents({ headings, depth }: { headings: Heading[]; depth: number }) {
  const items = headings.filter((h) => h.depth <= depth);
  if (items.length < 2) return null;
  return (
    <nav aria-labelledby="toc-title" className="text-sm">
      <p id="toc-title" className="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-1.5 border-l">
        {items.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l border-transparent leading-snug text-muted-foreground hover:border-primary hover:text-foreground",
                h.depth > 2 ? "pl-6 text-[0.8rem]" : "pl-3",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
