import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OG_IMAGE, SITE_URL, getRouteSeo } from '../lib/seo';

/**
 * Keeps the document head in step with client-side navigation.
 *
 * Crawlers never rely on this — `scripts/prerender.mjs` bakes the same tags
 * into each route's static HTML at build time, which is what non-JS crawlers
 * and link-preview scrapers read. This exists so the tab title, canonical and
 * OG tags stay correct once the user starts navigating within the SPA.
 */
const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const SEOHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, indexable = true } = getRouteSeo(pathname);
    const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = title;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', OG_IMAGE);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (indexable) {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    } else if (link) {
      link.remove();
    }
  }, [pathname]);

  return null;
};
