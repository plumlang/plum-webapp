import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Plumlang: a small, fast, memory-safe programming language",
} as const;

/**
 * Metadata for one page: title, description, canonical URL, Open Graph and
 * Twitter cards. `path` is the page's path with its trailing slash.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      title: socialTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  };
}

/** JSON for a <script type="application/ld+json">, safe inside HTML. */
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": "https://elixpo.com/#organization",
  name: "Elixpo",
  url: "https://elixpo.com",
  sameAs: ["https://github.com/elixpo", "https://github.com/plumlang"],
} as const;

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: absoluteUrl("/"),
  inLanguage: "en",
  publisher: { "@id": ORGANIZATION["@id"] },
} as const;

/** A schema.org BreadcrumbList from (name, path) pairs, home first. */
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
