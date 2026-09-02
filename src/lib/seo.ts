/**
 * Single source of truth for every SEO tag on the site.
 *
 * Consumed twice: by `SEOHead` for client-side route changes, and by
 * `scripts/prerender.mjs` (via `entry-server.tsx`) to bake the tags into the
 * static HTML at build time. Crawlers only ever read the baked version — the
 * runtime component exists so the tab title stays correct as you navigate.
 */
import { companyInfo } from '../data/companyInfo';
import { websiteServices } from '../data/services';

/**
 * The apex issues a 308 to www, so www is the canonical host. Everything —
 * canonicals, sitemap entries, og:url, schema @id — has to agree on this.
 */
export const SITE_URL = 'https://www.revesolutions.in';
/**
 * Falls back to the square logo until a proper 1200x630 share card exists.
 * Not ideal — social cards crop to roughly 1.91:1 — but a real image beats the
 * blank thumbnail every link preview showed before. Swap in `/og-image.png`
 * (and restore the 1200x630 dimension tags below) once the card is designed.
 */
export const OG_IMAGE = `${SITE_URL}/images/reve-logo.jpg`;
const OG_IMAGE_SIZE = { width: 1024, height: 1024 };
export const BRAND = 'Rêve Solutions';

export interface RouteSeo {
  title: string;
  description: string;
  /** Omitted for the 404 route, which is noindex and stays out of the sitemap. */
  indexable?: boolean;
}

export const routeSeo: Record<string, RouteSeo> = {
  '/': {
    title: 'Rêve Solutions — Websites Built and Managed for You',
    description:
      'Rêve Solutions builds custom business websites and manages them for you on one simple monthly plan — content updates, bug fixes, hosting and security all handled by real people.',
  },
  '/services': {
    title: 'Services — Website Development, Management & Maintenance | Rêve Solutions',
    description:
      'Website development, monthly website management, maintenance and ongoing support. Rêve Solutions builds your site with handcrafted code, then looks after it every month.',
  },
  '/about': {
    title: 'About Rêve Solutions — A Four-Person Web Studio',
    description:
      'Rêve Solutions is a four-person web studio. We build your website, launch it, and then manage it for you every month — so you never inherit a site nobody maintains.',
  },
  '/contact': {
    title: 'Contact Rêve Solutions — Talk to a Specialist',
    description:
      'Tell us about your business or your current website. A Rêve Solutions specialist will come back with a tailored proposal within 24 hours.',
  },
  '/404': {
    title: 'Page Not Found | Rêve Solutions',
    description: 'The page you are looking for does not exist.',
    indexable: false,
  },
};

/** Routes that get prerendered, listed in the sitemap, and linked internally. */
export const INDEXABLE_ROUTES = Object.keys(routeSeo).filter(
  (r) => routeSeo[r].indexable !== false,
);

export const getRouteSeo = (pathname: string): RouteSeo =>
  routeSeo[pathname] ?? routeSeo['/404'];

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

const ORG_ID = `${SITE_URL}/#organization`;

/**
 * `alternateName` is the load-bearing field for the brand query: it tells
 * Google that the unaccented "Reve Solutions" people actually type resolves to
 * the accented name we brand with.
 *
 * `sameAs` only carries weight when every URL is a real profile that links
 * back here, so the placeholder GitHub URL in companyInfo is deliberately
 * excluded rather than padded in.
 */
export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: BRAND,
  alternateName: ['Reve Solutions', 'RÊVE SOLUTIONS', 'Reve Solutions India'],
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/reve-logo.jpg`,
    width: 1024,
    height: 1024,
  },
  image: OG_IMAGE,
  slogan: companyInfo.tagline,
  description: companyInfo.footerDescription,
  email: companyInfo.contactPlaceholders.email,
  telephone: companyInfo.contactPlaceholders.phone.replace(/\s/g, ''),
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  knowsAbout: [
    'Website development',
    'Website management',
    'Website maintenance',
    'Website support',
    'Responsive web design',
  ],
  sameAs: [companyInfo.socialLinks.linkedin, companyInfo.socialLinks.instagram],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND,
  alternateName: 'Reve Solutions',
  description: routeSeo['/'].description,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

const servicesSchema = websiteServices.map((service) => ({
  '@type': 'Service',
  '@id': `${SITE_URL}/services#${service.id}`,
  name: service.title,
  serviceType: service.title,
  description: service.description,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} — what is included`,
    itemListElement: service.features.map((feature) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: feature },
    })),
  },
}));

/**
 * Built from copy that already exists elsewhere on the site. These target the
 * long-tail queries around the actual differentiator — a website built *and*
 * managed on a monthly plan — which is where a site this size can realistically
 * rank.
 */
export const faqs: { question: string; answer: string }[] = [
  {
    question: 'What is included in a monthly website management plan?',
    answer:
      'Everything needed to keep your site current: content and text changes, image updates, new or edited pages, adding and removing sections, plus routine changes whenever you ask. You message us, our team handles it — usually within 24 hours.',
  },
  {
    question: 'What does website maintenance cover?',
    answer:
      'Bug fixing, broken page fixes, performance improvements, browser compatibility fixes, security patching and routine health checks. Daily automated backups and SSL security are included.',
  },
  {
    question: 'Do you build custom websites or use page builders?',
    answer:
      'Every site is handcrafted code. We do not use bloated drag-and-drop page builders, which is what lets us deliver fast loading speeds, clean mobile responsiveness and markup that search engines can read properly.',
  },
  {
    question: 'How quickly are content edits made?',
    answer:
      'We aim to turn around content updates, new pages and media changes within 24 hours of your request.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'One transparent monthly subscription covering development, hosting, management and maintenance. There are no surprise bills, separate maintenance invoices or hourly charges. Tell us about your business and we will send a tailored proposal within 24 hours.',
  },
  {
    question: 'What happens after my website launches?',
    answer:
      'Nothing changes for you — that is the point. Most web designers hand over the login credentials and disappear. We configure your domain, optimise performance, run security tests, publish the site, and then keep managing it every month.',
  },
  {
    question: 'Do you work with businesses outside India?',
    answer:
      'Yes. Rêve Solutions works remotely with businesses anywhere in the world. Everything from the first design conversation to monthly edits happens online.',
  },
  {
    question: 'Can you take over a website someone else built?',
    answer:
      'Yes. If you already have a site and just need someone to manage, maintain and support it, we can take it over and look after it on the same monthly plan.',
  },
];

const faqSchema = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/services#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const breadcrumb = (pathname: string, name: string) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}${pathname}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${pathname}` },
  ],
});

/**
 * One `@graph` per route rather than several separate script tags — it lets the
 * nodes cross-reference each other by `@id` instead of repeating the whole
 * Organization on every page.
 */
export const getJsonLd = (pathname: string): object => {
  const graph: object[] = [organizationSchema];

  if (pathname === '/') {
    graph.push(websiteSchema);
  } else if (pathname === '/services') {
    graph.push(breadcrumb('/services', 'Services'), ...servicesSchema, faqSchema);
  } else if (pathname === '/about') {
    graph.push(breadcrumb('/about', 'About'));
  } else if (pathname === '/contact') {
    graph.push(breadcrumb('/contact', 'Contact'));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

/* ------------------------------------------------------------------ */
/* Head tag rendering                                                  */
/* ------------------------------------------------------------------ */

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Renders the per-route head block that `scripts/prerender.mjs` splices into
 * the template between the `seo-start` / `seo-end` markers.
 */
export const renderHeadTags = (pathname: string): string => {
  const { title, description, indexable = true } = getRouteSeo(pathname);
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
  const t = escapeAttr(title);
  const d = escapeAttr(description);

  const tags = [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    indexable
      ? `<link rel="canonical" href="${canonical}" />`
      : `<meta name="robots" content="noindex, follow" />`,
    ``,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(BRAND)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_SIZE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_SIZE.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(BRAND + ' — ' + companyInfo.tagline)}" />`,
    ``,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ``,
    `<script type="application/ld+json">${JSON.stringify(getJsonLd(pathname))}</script>`,
  ];

  return tags.map((tag) => (tag ? `    ${tag}` : '')).join('\n');
};
