import type { NavTab, Product } from '../types';

const SITE_URL = 'https://www.vtabsquare.com';
const DEFAULT_DESCRIPTION = 'VTAB Square develops AI applications and provides SQL Server to Databricks migration, Power BI consulting, data engineering and custom software development for businesses in India and the United States.';

type SeoDetails = { title: string; description: string; path: string };

const pageSeo: Partial<Record<NavTab, SeoDetails>> = {
  home: {
    title: 'VTAB Square | AI Software, Databricks Migration & Power BI Consulting',
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  solutions: {
    title: 'AI Solutions, Data Modernization & Automation | VTAB Square',
    description: 'Explore AI application development, enterprise analytics, legacy platform migration and automation services from VTAB Square.',
    path: '/solutions',
  },
  industries: {
    title: 'AI and Data Solutions by Industry | VTAB Square',
    description: 'Explore how VTAB Square approaches data engineering, analytics and AI application delivery for different industry use cases.',
    path: '/industries',
  },
  lab: {
    title: 'AI Innovation Lab & Product Demonstrations | VTAB Square',
    description: 'Explore VTAB Square AI application concepts, prototypes, technical demonstrations and software engineering work.',
    path: '/lab',
  },
  about: {
    title: 'About VTAB Square | AI & Data Engineering Company',
    description: 'Learn about VTAB Square, our engineering services and our approach to AI solutions, BI and data modernization.',
    path: '/about',
  },
  careers: {
    title: 'Careers at VTAB Square | AI & Data Engineering',
    description: 'Explore software engineering, AI, analytics and data engineering career opportunities at VTAB Square.',
    path: '/careers',
  },
  contact: {
    title: 'Contact VTAB Square | Discuss Your AI or Data Project',
    description: 'Contact VTAB Square about AI software, Databricks migration, Power BI development, data engineering and product demonstrations.',
    path: '/contact',
  },
};

function ensureMeta(selector: string, attributes: Record<string, string>, content: string): void {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => meta!.setAttribute(key, value));
    document.head.appendChild(meta);
  }
  meta.content = content;
}

/**
 * Keep metadata in sync with SPA navigation. This improves client-rendered
 * metadata; server-rendering or prerendering is still recommended for reliable
 * previews and search indexing of distinct routes.
 */
export function updateSeo(tab: NavTab, product: Product | null): void {
  const detail: SeoDetails = product
    ? {
        title: `${product.title} | VTAB Square AI Products`,
        description: (product.shortDescription || DEFAULT_DESCRIPTION).slice(0, 200),
        path: `/architecture/${encodeURIComponent(product.id)}`,
      }
    : (pageSeo[tab] || pageSeo.home!);

  const canonical = `${SITE_URL}${detail.path}`;
  document.title = detail.title;
  ensureMeta('meta[name="description"]', { name: 'description' }, detail.description);
  ensureMeta('meta[property="og:title"]', { property: 'og:title' }, detail.title);
  ensureMeta('meta[property="og:description"]', { property: 'og:description' }, detail.description);
  ensureMeta('meta[property="og:url"]', { property: 'og:url' }, canonical);
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, detail.title);
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, detail.description);

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical;
}


const serviceSeo = {
  'sql-server-to-databricks-migration': {
    title: 'SQL Server to Databricks Migration Services | VTAB Square',
    description: 'SQL Server to Databricks migration services covering assessment, schema and code conversion, Delta Lake, Unity Catalog, reconciliation and phased cutover.',
  },
  'power-bi-consulting-services': {
    title: 'Power BI Consulting & Migration Services | VTAB Square',
    description: 'Power BI consulting for semantic models, DAX, Power Query, dashboards, paginated reports, Qlik migration, optimization and governance.',
  },
  'ai-application-development': {
    title: 'Enterprise AI Application Development | VTAB Square',
    description: 'Enterprise AI application development with LLM and RAG integration, workflow automation, modern web engineering, governance and human oversight.',
  },
} as const;

export function updateServiceSeo(slug: keyof typeof serviceSeo): void {
  const detail = serviceSeo[slug];
  const canonical = `${SITE_URL}/${slug}/`;
  document.title = detail.title;
  ensureMeta('meta[name="description"]', { name: 'description' }, detail.description);
  ensureMeta('meta[property="og:title"]', { property: 'og:title' }, detail.title);
  ensureMeta('meta[property="og:description"]', { property: 'og:description' }, detail.description);
  ensureMeta('meta[property="og:url"]', { property: 'og:url' }, canonical);
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, detail.title);
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, detail.description);
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
  link.href = canonical;
}
