import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "There is no page at this address on plum.elixpo.com.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-24 sm:px-6">
      <p className="font-pixel text-sm text-primary">404</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight">This page didn&apos;t grow.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        There is nothing at this address. It may have moved when the docs were reorganised, or the link may have a
        typo.
      </p>
      <ul className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
        <li>
          <Link href="/" className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-primary-foreground hover:bg-primary/85">
            Go to the home page
          </Link>
        </li>
        <li>
          <Link href="/docs/" className="inline-flex h-10 items-center rounded-md border px-4 hover:bg-muted">
            Browse the documentation
          </Link>
        </li>
        <li>
          <Link href="/docs/errors/" className="inline-flex h-10 items-center rounded-md border px-4 hover:bg-muted">
            Look up an error code
          </Link>
        </li>
      </ul>
    </main>
  );
}
