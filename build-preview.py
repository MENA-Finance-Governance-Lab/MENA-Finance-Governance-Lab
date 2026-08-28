#!/usr/bin/env python3
"""
Assembles a single-file preview (preview.html) from the real site sources.

This is a *preview only*. The site of record is the multi-file version.
Run this again after editing any source file to refresh the preview.
"""

import re
import pathlib

ROOT = pathlib.Path(__file__).parent
PAGES = ["index", "research", "people", "contact"]


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def main_of(page):
    """Pull the <main> block out of a page and strip its duplicate id."""
    html = read(f"{page}.html")
    m = re.search(r"<main id=\"main\">(.*?)</main>", html, re.S)
    if not m:
        raise SystemExit(f"No <main> found in {page}.html")
    return m.group(1)


css = read("assets/css/style.css")
data = "\n".join(
    read(f"assets/data/{f}.js") for f in ("site", "research", "people")
)
js = read("assets/js/components.js") + "\n" + read("assets/js/main.js")

pages_html = "\n".join(
    f'<div class="page" id="page-{p}" {"" if p == "index" else "hidden"}>'
    f"{main_of(p)}</div>"
    for p in PAGES
)

# Client-side routing shim. Intercepts links that would navigate to another
# .html file and swaps the visible page instead.
shim = """
/* ---- preview shim: in-page routing so all four pages live in one file ---- */
function showPage(file, hash) {
  var id = "page-" + file.replace(".html", "");
  document.querySelectorAll(".page").forEach(function (el) {
    el.hidden = el.id !== id;
  });
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === file) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (hash) {
    var target = document.getElementById(hash);
    if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

document.addEventListener("click", function (e) {
  var a = e.target.closest("a");
  if (!a) return;
  var href = a.getAttribute("href");
  if (!href || !href.includes(".html")) return;
  e.preventDefault();
  var parts = href.split("#");
  showPage(parts[0], parts[1]);
});
"""

out = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MENA Finance &amp; Governance Lab — preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap" rel="stylesheet">
<style>
{css}
.page[hidden] {{ display: none; }}
</style>
</head>
<body>

<a class="skip" href="#main">Skip to content</a>

<div data-component="header"></div>

<main id="main">
{pages_html}
</main>

<div data-component="footer"></div>

<script>
{data}
</script>
<script>
{js}
</script>
<script>
{shim}
</script>
</body>
</html>
"""

(ROOT / "preview.html").write_text(out, encoding="utf-8")
print(f"Wrote preview.html ({len(out) // 1024} KB)")
