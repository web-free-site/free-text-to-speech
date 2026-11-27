#!/usr/bin/env node
/**
 * Injects crawler-visible H1, SEO copy, and FAQs into dist/index.html inside #root.
 * Vue mount replaces #root children on hydration — no duplicate H1 in the live DOM.
 */
import fs from "node:fs";
import path from "node:path";
import { FAQ_PAGE_JSON_LD, getHomepagePrerenderInnerHtml } from "./homepage-prerender-html.mjs";

const distRoot = path.resolve(process.argv[2] || "dist");
const indexPath = path.join(distRoot, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("inject-homepage-prerender: missing", indexPath);
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");
const inner = getHomepagePrerenderInnerHtml();

const rootOpen = '<div id="root">';
const rootStart = html.indexOf(rootOpen);
if (rootStart === -1) {
  console.error("inject-homepage-prerender: could not find #root in index.html");
  process.exit(1);
}

let pos = rootStart + rootOpen.length;
let depth = 1;
let rootEnd = -1;

while (pos < html.length && depth > 0) {
  const nextOpen = html.indexOf("<div", pos);
  const nextClose = html.indexOf("</div>", pos);
  if (nextClose === -1) break;

  if (nextOpen !== -1 && nextOpen < nextClose) {
    depth += 1;
    pos = nextOpen + 4;
    continue;
  }

  depth -= 1;
  if (depth === 0) {
    rootEnd = nextClose + "</div>".length;
    break;
  }
  pos = nextClose + "</div>".length;
}

if (rootEnd === -1) {
  console.error("inject-homepage-prerender: could not find closing #root");
  process.exit(1);
}

html =
  html.slice(0, rootStart + rootOpen.length) + `\n${inner}\n` + html.slice(rootEnd);

if (!html.includes('"@type": "FAQPage"') && !html.includes('"@type":"FAQPage"')) {
  const snippet =
    '\n    <script type="application/ld+json">\n' +
    JSON.stringify(FAQ_PAGE_JSON_LD, null, 2) +
    "\n    </script>\n";
  const headClose = html.indexOf("</head>");
  if (headClose !== -1) {
    html = html.slice(0, headClose) + snippet + html.slice(headClose);
  }
}

fs.writeFileSync(indexPath, html);

const h1Count = (html.match(/<h1\b/gi) || []).length;
if (h1Count !== 1) {
  console.error(`inject-homepage-prerender: expected 1 <h1>, found ${h1Count}`);
  process.exit(1);
}

console.log("inject-homepage-prerender: updated", indexPath, `(${h1Count} h1)`);