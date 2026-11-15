import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A static site in out/: Cloudflare Pages serves the files (see
  // .github/workflows/deploy.yml). The playground runs Plumlang in the
  // browser as WebAssembly, so nothing needs a server.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
