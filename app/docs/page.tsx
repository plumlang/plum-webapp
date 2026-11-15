import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocFooter, DocHeader } from "@/components/doc-parts";
import { JsonLd } from "@/components/json-ld";
import { DOC_PAGES, SOURCE, SPEC_SECTIONS, STDLIB_MODULES, TOUR_PAGES, neighbours } from "@/lib/docs";
import { ORGANIZATION, breadcrumbList, pageMetadata } from "@/lib/seo";
import { REPO_URL, absoluteUrl, siteEditUrl } from "@/lib/site";

const overview = DOC_PAGES[0];

export const metadata: Metadata = pageMetadata({
  title: overview.metaTitle,
  description: overview.description,
  path: overview.path,
});

const sections = [
  {
    href: "/docs/tour/",
    title: "Tour",
    text: "New to Plumlang, or to programming? Start here: eleven short steps, each with programs you can run.",
    items: TOUR_PAGES.slice(1, 6),
  },
  {
    href: "/docs/language/",
    title: "Language reference",
    text: "The specification, one section per page: what every part of a Plumlang program means, exactly.",
    items: SPEC_SECTIONS.slice(2, 7),
  },
  {
    href: "/docs/stdlib/",
    title: "Standard library",
    text: "The modules that come with plum: numbers, text, files, time, JSON, tasks, sockets and HTTP.",
    items: STDLIB_MODULES.filter((m) => ["math", "str", "fs", "json", "net.http"].includes(m.title)),
  },
];

export default function DocsOverview() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs/" },
  ];
  const { next } = neighbours(overview);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/docs/")}#page`,
        name: overview.title,
        description: overview.description,
        url: absoluteUrl("/docs/"),
        isPartOf: { "@type": "WebSite", "@id": `${absoluteUrl("/")}#website` },
        publisher: ORGANIZATION,
        hasPart: DOC_PAGES.slice(1).map((page) => ({ "@type": "TechArticle", name: page.title, url: absoluteUrl(page.path) })),
      },
      breadcrumbList(crumbs),
    ],
  };

  return (
    <main className="min-w-0 py-8 lg:py-10">
      <JsonLd data={structuredData} />
      <DocHeader
        crumbs={crumbs}
        eyebrow={overview.eyebrow}
        title={overview.title}
        lead="Everything about the language, from a first program to the exact rules. The reference pages are built from Plumlang's own specification and library docs, so they match the language they describe."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {sections.map((section) => (
          <section key={section.href} className="flex flex-col rounded-xl border bg-card p-6" aria-labelledby={`s-${section.title}`}>
            <h2 id={`s-${section.title}`} className="text-lg font-semibold">
              <Link href={section.href} className="hover:text-primary">
                {section.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.text}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {section.items.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-primary hover:underline">
                    {item.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={section.href}
              className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium hover:text-primary"
            >
              All of the {section.title.toLowerCase()} <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </section>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Link href="/docs/errors/" className="rounded-xl border p-6 transition-colors hover:border-primary/50">
          <h2 className="font-semibold">Error codes</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every compiler error, like <code className="font-mono">E0401</code>, with an example and its fix.
          </p>
        </Link>
        <Link href="/docs/install/" className="rounded-xl border p-6 transition-colors hover:border-primary/50">
          <h2 className="font-semibold">Download and install</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Get the <code className="font-mono">plum</code> binary from GitHub Releases, or build it from source.
          </p>
        </Link>
        <Link href="/playground/" className="rounded-xl border p-6 transition-colors hover:border-primary/50">
          <h2 className="font-semibold">Playground</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Run Plumlang in your browser, with nothing to install. Coming soon.
          </p>
        </Link>
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        The reference is a reviewed copy of the <code className="font-mono">docs/</code> folder of{" "}
        <a href={REPO_URL} className="underline underline-offset-4 hover:text-foreground">
          plumlang/plumlang
        </a>{" "}
        at commit{" "}
        <a
          href={`${REPO_URL}/commit/${SOURCE.sourceCommit}`}
          className="font-mono underline underline-offset-4 hover:text-foreground"
        >
          {SOURCE.sourceCommit.slice(0, 7)}
        </a>
        . To correct it, use the &ldquo;Edit this page on GitHub&rdquo; link at the bottom of any page.
      </p>

      <div className="max-w-3xl">
        <DocFooter editUrl={siteEditUrl("app/docs/page.tsx")} next={next} />
      </div>
    </main>
  );
}
