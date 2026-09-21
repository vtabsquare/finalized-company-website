import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const base = 'https://www.vtabsquare.com';
const pages = [
  {
    slug:'sql-server-to-databricks-migration',
    title:'SQL Server to Databricks Migration Services | VTAB Square',
    description:'SQL Server to Databricks migration services covering assessment, schema and code conversion, Delta Lake, Unity Catalog, reconciliation and phased cutover.',
    heading:'SQL Server to Databricks Migration Services',
    intro:'Modernize SQL Server data warehouses and analytics workloads on Databricks with structured discovery, schema and code conversion, reconciliation, governance, and phased cutover support.',
    sections:['Migration discovery and assessment','Conversion and Databricks engineering','Reconciliation and controlled cutover'],
  },
  {
    slug:'power-bi-consulting-services',
    title:'Power BI Consulting & Migration Services | VTAB Square',
    description:'Power BI consulting for semantic models, DAX, Power Query, dashboards, paginated reports, Qlik migration, optimization and governance.',
    heading:'Power BI Consulting & Migration Services',
    intro:'Design, modernize and govern Power BI solutions with semantic models, DAX, Power Query, report engineering, migration support and performance-focused delivery.',
    sections:['Power BI architecture and development','BI platform migration','Optimization and governance'],
  },
  {
    slug:'ai-application-development',
    title:'Enterprise AI Application Development | VTAB Square',
    description:'Enterprise AI application development with LLM and RAG integration, workflow automation, modern web engineering, governance and human oversight.',
    heading:'Enterprise AI Application Development',
    intro:'Build practical AI applications that combine enterprise data, workflow automation, modern web experiences and human oversight for production use cases.',
    sections:['AI solution discovery','Application engineering','Production readiness'],
  },
];
const escape = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const template=readFileSync('dist/index.html','utf8');
for(const page of pages){
  const url=`${base}/${page.slug}/`;
  let html=template.replace(/<title>[^<]*<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escape(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escape(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`);
  const structured = JSON.stringify({'@context':'https://schema.org','@type':'Service',name:page.heading,description:page.intro,url,provider:{'@type':'Organization',name:'VTAB Square Private Limited',url:base}}).replaceAll('<','\\u003c');
  html=html.replace('</head>',`<script type="application/ld+json">${structured}</script>\n</head>`);
  html=html.replace('<div id="root"></div>',`<div id="root"><main><h1>${escape(page.heading)}</h1><p>${escape(page.intro)}</p>${page.sections.map(s=>`<h2>${escape(s)}</h2>`).join('')}<p>Contact VTAB Square at <a href="mailto:Information@vtabsquare.com">Information@vtabsquare.com</a> to discuss your project.</p></main></div>`);
  mkdirSync(join('dist',page.slug),{recursive:true});
  writeFileSync(join('dist',page.slug,'index.html'),html);
}
console.log(`Generated ${pages.length} crawlable service HTML entry points`);
