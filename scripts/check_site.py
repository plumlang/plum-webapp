"""Check the exported site in out/ before it is deployed.

    python3 scripts/check_site.py out        (npm run site:check)

Checks every HTML page for a title, a description, one h1, a canonical URL
that is the page's own (with its trailing slash), Open Graph and Twitter
cards; every internal link and #anchor for a target that exists; the
sitemap for exactly the indexable pages; robots.txt; and the files
Cloudflare Pages and browsers expect. Python standard library only.
"""

from __future__ import annotations

import argparse
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

SITE_URL = "https://plum.elixpo.com"
SITEMAP_NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
REQUIRED_FILES = (
    "index.html",
    "404.html",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
    "manifest.webmanifest",
    "og.png",
    "_headers",
)


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.meta: dict[str, str] = {}
        self.links: dict[str, str] = {}
        self.title = ""
        self.h1 = 0
        self.ids: set[str] = set()
        self.hrefs: list[str] = []
        self.images_without_alt = 0
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = {k: (v or "") for k, v in attrs}
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "meta":
            key = a.get("name") or a.get("property")
            if key and key not in self.meta:
                self.meta[key] = a.get("content", "")
        elif tag == "link" and a.get("rel"):
            self.links.setdefault(a["rel"], a.get("href", ""))
        elif tag == "title":
            self._in_title = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "a" and "href" in a:
            self.hrefs.append(a["href"])
        elif tag == "img" and "alt" not in a:
            self.images_without_alt += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def url_path(file: Path, site: Path) -> str:
    """out/docs/index.html -> /docs/ ; out/index.html -> /"""
    rel = file.relative_to(site).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def target_file(path: str, site: Path) -> Path | None:
    """The file Cloudflare Pages would serve for a site path, if any."""
    path = unquote(path)
    candidates = [site / path.lstrip("/")]
    if path.endswith("/"):
        candidates = [site / path.lstrip("/") / "index.html"]
    else:
        candidates.append(site / (path.lstrip("/") + ".html"))
    for c in candidates:
        if c.is_file():
            return c
    return None


def check(site: Path) -> list[str]:
    problems: list[str] = []
    for name in REQUIRED_FILES:
        if not (site / name).is_file():
            problems.append(f"missing {name}")

    pages: dict[str, Page] = {}
    for file in sorted(site.rglob("*.html")):
        rel = file.relative_to(site).as_posix()
        if rel.startswith("_") or "/_" in rel:
            continue
        page = Page()
        page.feed(file.read_text(encoding="utf-8"))
        pages[url_path(file, site)] = page

    indexable: set[str] = set()
    for path, page in pages.items():
        where = f"{path}:"
        is_404 = path in ("/404.html", "/404/")
        if not page.title.strip():
            problems.append(f"{where} no <title>")
        if not page.meta.get("description"):
            problems.append(f"{where} no meta description")
        if page.h1 != 1:
            problems.append(f"{where} {page.h1} <h1> elements, expected 1")
        if page.images_without_alt:
            problems.append(f"{where} {page.images_without_alt} <img> without alt")
        if is_404:
            continue
        if "noindex" in page.meta.get("robots", ""):
            continue
        indexable.add(path)
        canonical = SITE_URL + path
        if page.links.get("canonical") != canonical:
            problems.append(f"{where} canonical is {page.links.get('canonical')!r}, expected {canonical!r}")
        if page.meta.get("og:url") != canonical:
            problems.append(f"{where} og:url is {page.meta.get('og:url')!r}, expected {canonical!r}")
        for key in ("og:title", "og:description", "og:image", "twitter:image"):
            if not page.meta.get(key):
                problems.append(f"{where} no {key}")
        if page.meta.get("twitter:card") != "summary_large_image":
            problems.append(f"{where} twitter:card is not summary_large_image")
        if not path.endswith("/"):
            problems.append(f"{where} page URL has no trailing slash")

    # Internal links and anchors.
    for path, page in pages.items():
        for href in page.hrefs:
            parts = urlsplit(href)
            if parts.scheme in ("mailto", "tel") or (parts.netloc and parts.netloc != "plum.elixpo.com"):
                continue
            if parts.scheme and parts.scheme not in ("http", "https"):
                continue
            link_path = parts.path or path
            if not link_path.startswith("/"):
                problems.append(f"{path}: relative link {href!r}")
                continue
            target = target_file(link_path, site)
            if target is None:
                problems.append(f"{path}: broken link {href!r}")
                continue
            if link_path.endswith("/") is False and not Path(link_path).suffix:
                problems.append(f"{path}: link {href!r} has no trailing slash")
            if parts.fragment and target.suffix == ".html":
                other = pages.get(url_path(target, site))
                if other is not None and unquote(parts.fragment) not in other.ids:
                    problems.append(f"{path}: link {href!r} points at a missing anchor")

    # robots.txt
    robots = (site / "robots.txt").read_text(encoding="utf-8").casefold() if (site / "robots.txt").is_file() else ""
    if "user-agent: *" not in robots or "allow: /" not in robots:
        problems.append("robots.txt does not allow every crawler")
    if "disallow: /\n" in robots + "\n":
        problems.append("robots.txt disallows the site")
    if f"sitemap: {SITE_URL}/sitemap.xml" not in robots:
        problems.append("robots.txt does not name the sitemap")

    # The sitemap lists exactly the indexable pages.
    if (site / "sitemap.xml").is_file():
        tree = ET.parse(site / "sitemap.xml")
        listed = {
            (node.text or "").strip()
            for node in tree.findall(f"{SITEMAP_NS}url/{SITEMAP_NS}loc")
        }
        expected = {SITE_URL + p for p in indexable}
        for url in sorted(expected - listed):
            problems.append(f"sitemap.xml lacks {url}")
        for url in sorted(listed - expected):
            problems.append(f"sitemap.xml lists {url}, which is not an indexable page")

    return problems


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("site", type=Path, nargs="?", default=Path("out"), help="the exported site (default: out)")
    args = parser.parse_args()
    if not (args.site / "index.html").is_file():
        print(f"{args.site} has no index.html; run npm run build first", file=sys.stderr)
        return 2
    problems = check(args.site)
    for problem in problems:
        print(problem, file=sys.stderr)
    if problems:
        print(f"site check: {len(problems)} problem(s)", file=sys.stderr)
        return 1
    print(f"site check: {args.site} is consistent")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
