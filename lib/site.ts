// Facts about the site and the project, in one place.

export const SITE_URL = "https://plum.elixpo.com";
export const SITE_NAME = "Plumlang";
export const SITE_TAGLINE = "A small, fast, memory-safe programming language";
export const SITE_DESCRIPTION =
  "Plumlang is a small, fast, memory-safe programming language with easy syntax, static types, tasks and a built-in HTTP server, shipped as one binary. An Elixpo production.";

export const REPO_URL = "https://github.com/plumlang/plumlang";
export const SITE_REPO_URL = "https://github.com/plumlang/plum.elixpo";
export const BRANDING_REPO_URL = "https://github.com/plumlang/branding";
export const RELEASES_URL = `${REPO_URL}/releases`;
export const ROADMAP_URL = `${REPO_URL}/issues/36`;
export const INSTALLERS_ISSUE_URL = `${REPO_URL}/issues/33`;
export const PLAYGROUND_ISSUE_URL = `${REPO_URL}/issues/32`;
export const DISCUSSIONS_URL = `${REPO_URL}/discussions`;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;
export const ELIXPO_URL = "https://elixpo.com";
export const CONTACT_EMAIL = "hello@elixpo.com";

/** The absolute URL of a site path. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

/** A GitHub link that edits a file of the plumlang repository on main. */
export const editUrl = (path: string) => `${REPO_URL}/edit/main/${path}`;

/** A GitHub link that edits a file of this website's repository on main. */
export const siteEditUrl = (path: string) => `${SITE_REPO_URL}/edit/main/${path}`;

export const PRIMARY_NAV = [
  { href: "/docs/tour/", label: "Tour" },
  { href: "/docs/", label: "Docs" },
  { href: "/docs/stdlib/", label: "Library" },
  { href: "/playground/", label: "Playground" },
  { href: "/docs/install/", label: "Install" },
] as const;
