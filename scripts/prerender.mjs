/**
 * Turns the client-rendered SPA into static HTML at build time.
 *
 * `vite build` emits the client bundle plus a template `dist/index.html` whose
 * body is an empty `#root`. `vite build --ssr` emits a Node-runnable copy of the
 * same app. This script renders every route with the latter, splices the markup
 * and the route's head tags into the former, and writes one real HTML file per
 * route — so crawlers and link-preview scrapers that never execute JavaScript
 * still see the full page.
 *
 * Run automatically as the last step of `npm run build`.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const TEMPLATE = path.join(DIST, 'index.html');

const fail = (message) => {
  console.error(`\n[prerender] ${message}\n`);
  process.exit(1);
};

if (!existsSync(TEMPLATE)) fail(`Missing ${TEMPLATE}. Run \`vite build\` first.`);
if (!existsSync(SSR_ENTRY)) fail(`Missing ${SSR_ENTRY}. Run \`vite build --ssr\` first.`);

const { render, renderHeadTags, INDEXABLE_ROUTES, SITE_URL } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const template = await readFile(TEMPLATE, 'utf8');

const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
if (!SEO_BLOCK.test(template)) {
  fail('index.html has no <!--seo-start--> / <!--seo-end--> markers to replace.');
}
if (!template.includes('<div id="root"></div>')) {
  fail('index.html has no empty <div id="root"></div> to inject markup into.');
}

/**
 * `/` maps to dist/index.html and every other route to dist/<route>/index.html.
 *
 * The 404 is the exception: Vercel serves a root-level `404.html` for unmatched
 * paths with a genuine 404 status. A catch-all rewrite would answer 200 instead
 * and hand Google an unlimited supply of soft-404 duplicates, which is exactly
 * the problem the old `path="*" element={<HomePage/>}` route created.
 */
const outputPathFor = (route) =>
  route === '/'
    ? TEMPLATE
    : route === '/404'
      ? path.join(DIST, '404.html')
      : path.join(DIST, route.replace(/^\//, ''), 'index.html');

// The catch-all 404 is prerendered too, so a mistyped URL gets real content
// rather than the bare app shell, but it stays out of the sitemap.
const routes = [...INDEXABLE_ROUTES, '/404'];

for (const route of routes) {
  let markup;
  try {
    markup = render(route);
  } catch (error) {
    fail(
      `Failed rendering "${route}": ${error.message}\n` +
        'This usually means a component reads window/document during render ' +
        'rather than inside useEffect.',
    );
  }

  const html = template
    .replace(SEO_BLOCK, renderHeadTags(route).trim())
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

  const outPath = outputPathFor(route);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');

  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`[prerender] ${route.padEnd(12)} -> ${path.relative(ROOT, outPath)} (${kb} kB)`);
}

/**
 * Generated from the same route list the loop above walks, so the sitemap can
 * never drift out of sync with what actually ships.
 */
const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXABLE_ROUTES.map(
  (route) => `  <url>
    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
).join('\n')}
</urlset>
`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');
console.log(`[prerender] sitemap.xml  -> ${INDEXABLE_ROUTES.length} URLs`);

// The SSR bundle is a build artefact only; leaving it around would let Vercel
// ship it as static files.
await rm(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
