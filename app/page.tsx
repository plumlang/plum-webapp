import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Network, ShieldCheck, Terminal, Zap } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { JsonLd } from "@/components/json-ld";
import { CREATOR_PEOPLE, ORGANIZATION, WEBSITE, pageMetadata } from "@/lib/seo";
import {
  CREATORS_TEXT,
  INSTALLERS_ISSUE_URL,
  LICENSE_URL,
  RELEASES_URL,
  REPO_URL,
  ROADMAP_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Plumlang: a small, fast, memory-safe programming language",
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

// Every sample on this page runs as shown with plum built from plumlang main.
const TASTE = `seed math

root GREETING = "Hello"

tree Planet {
    name: str
    radius_km: float

    branch area() -> float => 4.0 * math.PI * self.radius_km ** 2
}

plant planets = [Planet("Mercury", 2439.7), Planet("Earth", 6371.0)]

for p in planets {
    drop("{GREETING}, {p.name}! Surface: {p.area():.0} km²")
}`;

const TASTE_OUTPUT = `Hello, Mercury! Surface: 74796748 km²
Hello, Earth! Surface: 510064472 km²`;

const features = [
  {
    icon: BookOpen,
    title: "Easy to write",
    text: "A small syntax that reads like plain English: and, or, not, for, in. One way to do each thing, and no semicolons or brackets around conditions.",
    code: `plant basket = ["plum", "pear", "fig"]

for fruit in basket {
    if fruit != "pear" and not fruit.starts_with("x") {
        drop("I like {fruit}s")
    }
}`,
  },
  {
    icon: ShieldCheck,
    title: "Static types, mostly inferred",
    text: "Every expression has a type before the program runs, and mistakes are caught with a line, a column and a hint. Values that may be missing say so with ?, so nothing crashes on none.",
    code: `branch find_age(name: str) -> int? {
    plant ages = {"ada": 36, "grace": 45}
    return ages.get(name)
}

drop(find_age("bob") ?? 0)    # 0`,
  },
  {
    icon: Zap,
    title: "Memory-safe, without a collector",
    text: "Reference counting frees each value the moment it is no longer used: no garbage-collector pauses, no manual free, no borrow checker. Every index is checked.",
    code: `plant a = [1, 2, 3]
plant b = a          # a copy, shared until it changes
b.push(4)
drop(a, b)           # [1, 2, 3] [1, 2, 3, 4]`,
  },
  {
    icon: Terminal,
    title: "Tasks, without async or await",
    text: "spawn runs a call as a lightweight task. Waiting on the network, a file or a timer pauses only that task. Tasks share nothing and talk through channels, so there are no data races.",
    code: `seed time

branch fetch(n: int) -> int {
    time.sleep(0.1)
    return n * 10
}

plant jobs = [spawn fetch(1), spawn fetch(2)]
for job in jobs {
    drop(job.wait())   # both waited at once
}`,
  },
  {
    icon: Network,
    title: "An HTTP server in the box",
    text: "The standard library has files, JSON, TCP and UDP, TLS, and net.http: an HTTP/1.1 server and client, with a task per connection.",
    code: `seed net.http

plant app = http.server()

app.get("/hello/:name", (req) => http.text("Hello, {req.params["name"]}!"))

app.listen(8080)`,
  },
];

const docs = [
  { href: "/docs/tour/", title: "Tour", text: "Learn Plumlang step by step, from hello world to a web server." },
  { href: "/docs/language/", title: "Language reference", text: "The specification, section by section: the exact rules." },
  { href: "/docs/stdlib/", title: "Standard library", text: "Every module: math, str, fs, json, time, net, net.http and more." },
  { href: "/docs/errors/", title: "Error codes", text: "What each compiler error means, with an example and its fix." },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      WEBSITE,
      {
        "@type": "ComputerLanguage",
        "@id": `${absoluteUrl("/")}#language`,
        name: SITE_NAME,
        alternateName: "Plum",
        url: absoluteUrl("/"),
        description: SITE_DESCRIPTION,
        sameAs: [REPO_URL],
        creator: CREATOR_PEOPLE,
        publisher: { "@id": ORGANIZATION["@id"] },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${absoluteUrl("/")}#plum`,
        name: "plum",
        alternateName: "Plumlang compiler and runtime",
        description:
          "The plum command: the Plumlang compiler, virtual machine and standard library in one binary with no dependencies.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux, macOS, Windows",
        url: absoluteUrl("/"),
        downloadUrl: RELEASES_URL,
        installUrl: absoluteUrl("/docs/install/"),
        softwareHelp: absoluteUrl("/docs/"),
        license: LICENSE_URL,
        author: CREATOR_PEOPLE,
        publisher: { "@id": ORGANIZATION["@id"] },
        about: { "@id": `${absoluteUrl("/")}#language` },
      },
    ],
  };

  return (
    <main>
      <JsonLd data={structuredData} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--plum)_16%,transparent),transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Plumlang · An Elixpo production</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              A small, fast, memory-safe programming language.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Plumlang is easy to read and hard to get wrong: static types with inference, objects, modules, tasks and an
              HTTP server, compiled to bytecode and run by a small virtual machine. It ships as one binary with no
              dependencies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/tour/"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Take the tour <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/docs/install/"
                className="inline-flex h-11 items-center gap-2 rounded-md border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Download className="size-4" aria-hidden="true" /> Install Plumlang
              </Link>
              <Link
                href="/docs/"
                className="inline-flex h-11 items-center rounded-md px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Read the docs
              </Link>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Status: pre-alpha, built in the open.{" "}
              <a href={ROADMAP_URL} className="underline underline-offset-4 hover:text-foreground">
                Follow the roadmap
              </a>
              .
            </p>
          </div>
          <div className="min-w-0">
            <CodeBlock code={TASTE} label="planets.plum" className="my-0 bg-card shadow-sm" />
            <CodeBlock code={TASTE_OUTPUT} lang="text" label="Output" className="mb-0" />
          </div>
        </div>
      </section>

      {/* Hello world */}
      <section className="border-b" aria-labelledby="hello">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Hello, world</p>
            <h2 id="hello" className="mt-4 text-3xl font-semibold tracking-tight">
              One line, no ceremony.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              A program starts at its first line: no <code className="font-mono text-[0.9em]">main</code>, no imports
              for the basics. The keywords keep a garden theme: you <code className="font-mono text-[0.9em]">plant</code>{" "}
              a variable, <code className="font-mono text-[0.9em]">drop</code> a value on the screen, grow a{" "}
              <code className="font-mono text-[0.9em]">branch</code> (a function) and a{" "}
              <code className="font-mono text-[0.9em]">tree</code> (a class), and{" "}
              <code className="font-mono text-[0.9em]">seed</code> a module.
            </p>
          </div>
          <div className="min-w-0">
            <CodeBlock code={`drop("Hello, world!")`} label="hello.plum" className="my-0 bg-card" />
            <CodeBlock
              code={`$ plum run hello.plum\nHello, world!`}
              lang="text"
              label="Terminal"
              className="mb-0"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-muted/30" aria-labelledby="features">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Why Plumlang</p>
            <h2 id="features" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything a program needs, nothing it has to fight.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="flex min-w-0 flex-col rounded-xl border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <feature.icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
                <CodeBlock code={feature.code} className="mb-0 mt-5" />
              </article>
            ))}
            <article className="flex min-w-0 flex-col rounded-xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Download className="size-4" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">One binary, runs anywhere</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Written in C11 with no dependencies, so the same <code className="font-mono">plum</code> runs on Linux,
                macOS and Windows. The compiler, the virtual machine and the standard library are all inside it. On the
                project&apos;s{" "}
                <a href={`${REPO_URL}/blob/main/bench/README.md`} className="underline underline-offset-4 hover:text-foreground">
                  benchmarks
                </a>{" "}
                it runs loops, float maths and text up to 2.6 times faster than Python.
              </p>
              <CodeBlock
                code={`plum run app.plum     # check, compile and run\nplum check app.plum   # every error, nothing run\nplum stdlib net.http  # a module's functions`}
                lang="bash"
                className="mb-0 mt-5"
              />
            </article>
          </div>
        </div>
      </section>

      {/* Errors */}
      <section className="border-b" aria-labelledby="errors">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div className="min-w-0 md:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Friendly errors</p>
            <h2 id="errors" className="mt-4 text-3xl font-semibold tracking-tight">
              Mistakes explained before the program runs.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
              Every compile error names the file, line and column, underlines the problem and, where it can, says how
              to fix it. Each has a code, documented with an example and its fix in the{" "}
              <Link href="/docs/errors/" className="text-primary underline underline-offset-4">
                error code reference
              </Link>
              .
            </p>
          </div>
          <div className="min-w-0 md:order-1">
            <CodeBlock
              code={`total.plum:3:5: error[E0301]: unknown name 'totl'; did you mean 'total'?\n3 |     totl += i\n  |     ^~~~\n1 error`}
              lang="text"
              label="plum check"
              className="my-0 bg-card"
            />
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="border-b bg-muted/30" aria-labelledby="install">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Install</p>
            <h2 id="install" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Get the plum binary.
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">Download a release</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Builds for each platform are published on{" "}
                <a href={RELEASES_URL} className="text-primary underline underline-offset-4">
                  GitHub Releases
                </a>
                . Put <code className="font-mono">plum</code> on your <code className="font-mono">PATH</code>.
              </p>
            </li>
            <li className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">Or build from source</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                All you need is a C11 compiler and <code className="font-mono">make</code>.
              </p>
              <CodeBlock
                code={`git clone ${REPO_URL}\ncd plumlang && make`}
                lang="bash"
                className="mb-0 mt-4"
              />
            </li>
            <li className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">One-line installers</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Coming soon: install scripts, Homebrew and winget, tracked in{" "}
                <a href={INSTALLERS_ISSUE_URL} className="text-primary underline underline-offset-4">
                  plumlang#33
                </a>
                .
              </p>
            </li>
          </ol>
          <Link
            href="/docs/install/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Read the installation guide <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Docs */}
      <section aria-labelledby="learn">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Learn</p>
            <h2 id="learn" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Documentation from the language&apos;s own specification.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {docs.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <h3 className="flex items-center justify-between font-semibold">
                  {doc.title}
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{doc.text}</p>
              </Link>
            ))}
          </div>
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Plumlang is source-available under the{" "}
            <a href={LICENSE_URL} className="underline underline-offset-4 hover:text-foreground">
              Plumlang Commercial License 1.0
            </a>
            : free for personal, educational, research and other non-commercial use. Programs you write in Plumlang are
            yours.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Plumlang was created by {CREATORS_TEXT}, and is an Elixpo production.
          </p>
        </div>
      </section>
    </main>
  );
}
