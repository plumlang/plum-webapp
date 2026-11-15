import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A static site in out/: Cloudflare Pages serves the files (see
  // .github/workflows/deploy.yml). The playground runs Plumlang in the
  // browser as WebAssembly, so nothing needs a server.
  output: "export",
  // Every page is a directory with an index.html (out/docs/index.html), so
  // its one URL ends in a slash: /docs/. Canonical URLs, the sitemap and
  // every internal link use that form; scripts/check_site.py checks it.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
