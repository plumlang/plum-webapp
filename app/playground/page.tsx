import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { pageMetadata } from "@/lib/seo";
import { PLAYGROUND_ISSUE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Playground",
  description:
    "The Plumlang playground will run Plumlang in your browser as WebAssembly, with examples and share links. It is coming soon; until then, install plum to run programs.",
  path: "/playground/",
});

export default function Playground() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Playground · Coming soon</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Run Plumlang in your browser.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        The playground will compile the real <code className="font-mono">plum</code> to WebAssembly, so programs run in
        the page with nothing to install and nothing sent to a server. It will have examples and links to share a
        program. The work is tracked in{" "}
        <a href={PLAYGROUND_ISSUE_URL} className="text-primary underline underline-offset-4">
          plumlang#32
        </a>
        .
      </p>

      <div className="mt-10 rounded-xl border bg-card p-6">
        <h2 className="font-semibold">Until then</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Install <code className="font-mono">plum</code>, save a program in a <code className="font-mono">.plum</code>{" "}
          file and run it:
        </p>
        <CodeBlock code={`drop("Hello from the playground, soon!")`} label="hello.plum" className="mb-3" />
        <CodeBlock code="plum run hello.plum" lang="bash" className="mb-0" />
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/docs/install/" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            Install Plumlang <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link href="/docs/tour/" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            Take the tour <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
