import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Chinese portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>林默 · 设计工程师作品集<\/title>/i);
  assert.match(html, /把复杂的东西/);
  assert.match(html, /最近在做的事/);
  assert.match(html, /关于我/);
  assert.match(html, /一些随笔/);
  assert.match(html, /视觉日记/);
  assert.match(html, /mailto:hello@linmo\.studio/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview/i);
});

test("keeps the portfolio typed, interactive, and free of the starter skeleton", async () => {
  const [portfolio, layout, packageJson] = await Promise.all([
    readFile(new URL("app/portfolio.tsx", projectRoot), "utf8"),
    readFile(new URL("app/layout.tsx", projectRoot), "utf8"),
    readFile(new URL("package.json", projectRoot), "utf8"),
  ]);

  assert.match(portfolio, /type Project/);
  assert.match(portfolio, /type Note/);
  assert.match(portfolio, /from "lucide-react"/);
  assert.match(portfolio, /IntersectionObserver/);
  assert.match(portfolio, /localStorage\.setItem\("portfolio-theme"/);
  assert.match(layout, /localStorage\.getItem\("portfolio-theme"/);
  assert.match(layout, /images: \["\/og\.png"\]/);
  assert.match(packageJson, /"lucide-react"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", projectRoot)));
  await assert.rejects(access(new URL("app/_sites-preview/preview.css", projectRoot)));
});
