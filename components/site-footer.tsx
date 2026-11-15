import Link from "next/link";
import {
  BRANDING_REPO_URL,
  CONTACT_EMAIL,
  CREATORS_TEXT,
  DISCUSSIONS_URL,
  ELIXPO_URL,
  LICENSE_URL,
  REPO_URL,
  ROADMAP_URL,
  SITE_REPO_URL,
} from "@/lib/site";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/docs/tour/", label: "Tour" },
      { href: "/docs/language/", label: "Language reference" },
      { href: "/docs/stdlib/", label: "Standard library" },
      { href: "/docs/errors/", label: "Error codes" },
    ],
  },
  {
    title: "Get Plumlang",
    links: [
      { href: "/docs/install/", label: "Download and install" },
      { href: "/playground/", label: "Playground" },
      { href: `${REPO_URL}/releases`, label: "Releases" },
      { href: ROADMAP_URL, label: "Roadmap" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: REPO_URL, label: "Source code" },
      { href: DISCUSSIONS_URL, label: "Discussions" },
      { href: BRANDING_REPO_URL, label: "Brand assets" },
      { href: SITE_REPO_URL, label: "This website's source" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="font-pixel text-xs">PLUMLANG</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A small, fast, memory-safe programming language. An{" "}
            <a href={ELIXPO_URL} className="underline underline-offset-4 hover:text-foreground">
              Elixpo
            </a>{" "}
            production, created by {CREATORS_TEXT}.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-foreground">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{column.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="hover:text-primary">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-primary">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 Elixpo. Plumlang and the Plumlang logo are trademarks of Elixpo.</p>
          <p>
            Plumlang is source-available under the{" "}
            <a href={LICENSE_URL} className="underline underline-offset-4 hover:text-foreground">
              Plumlang Commercial License 1.0
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
