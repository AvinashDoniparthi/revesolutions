import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
// v7 dropped the `react-router-dom/server` entry point; `react-router-dom`
// re-exports everything from `react-router`, StaticRouter included.
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import './index.css';

export { INDEXABLE_ROUTES, SITE_URL, renderHeadTags } from './lib/seo';

/** Renders one route to static HTML for `scripts/prerender.mjs`. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
}
