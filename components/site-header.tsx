import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { PRIMARY_NAV, REPO_URL } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href={REPO_URL}
            className="hidden rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            GitHub
          </a>
          <ThemeToggle />
          <details className="group relative md:hidden">
            <summary
              className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <Menu className="size-4" aria-hidden="true" />
            </summary>
            <nav
              aria-label="Main"
              className="absolute right-0 top-11 flex w-52 flex-col rounded-lg border bg-popover p-1.5 text-sm shadow-lg"
            >
              {PRIMARY_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 hover:bg-muted">
                  {item.label}
                </Link>
              ))}
              <a href={REPO_URL} className="rounded-md px-3 py-2 hover:bg-muted">
                GitHub
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
