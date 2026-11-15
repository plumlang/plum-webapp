import { jsonLd } from "@/lib/seo";

/** Structured data for search engines, as a JSON-LD script. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}
