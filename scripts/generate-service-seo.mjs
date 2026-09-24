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
  const structured = JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':base+'/#organization',name:'VTAB Square Private Limited',url:base,email:'Information@vtabsquare.com',address:{'@type':'PostalAddress',addressLocality:'Coimbatore',addressRegion:'Tamil Nadu',addressCountry:'IN'}},{'@type':'Service','@id':url+'#service',name:page.heading,description:page.intro,url,provider:{'@id':base+'/#organization'}},{'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:'Services',item:base+'/solutions'},{'@type':'ListItem',position:3,name:page.heading,item:url}]}]}).replaceAll('<','\\u003c');
  html=html.replace('</head>',`<script type="application/ld+json">${structured}</script>\n</head>`);
  html=html.replace('<div id="root"></div>',`<div id="root"><main><h1>${escape(page.heading)}</h1><p>${escape(page.intro)}</p>${page.sections.map(s=>`<h2>${escape(s)}</h2>`).join('')}<p>Contact VTAB Square at <a href="mailto:Information@vtabsquare.com">Information@vtabsquare.com</a> to discuss your project.</p></main></div>`);
  mkdirSync(join('dist',page.slug),{recursive:true});
  writeFileSync(join('dist',page.slug,'index.html'),html);
}

const caseStudy = {
  slug:'case-studies/sql-server-to-databricks-migration-factory',
  title:'SQL Server to Databricks AI Migration Factory Case Study | VTAB Square',
  description:'Explore VTAB Square’s SQL Server to Databricks migration factory approach for discovery, conversion, deployment, reconciliation and controlled promotion.',
  heading:'SQL Server to Databricks AI Migration Factory',
  intro:'A reusable migration-factory approach for assessing SQL Server estates, converting database objects and data pipelines, deploying to Databricks, reconciling results and controlling promotion through review gates.'
};
{
  const page=caseStudy, url=`${base}/${page.slug}/`;
  let html=template.replace(/<title>[^<]*<\/title>/,`<title>${escape(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/,`<link rel="canonical" href="${url}" />`);
  const structured=JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':base+'/#organization',name:'VTAB Square Private Limited',url:base},{'@type':'Article',headline:page.heading,description:page.description,url,author:{'@id':base+'/#organization'},publisher:{'@id':base+'/#organization'}},{'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:'Case Studies',item:base+'/case-studies/'},{'@type':'ListItem',position:3,name:page.heading,item:url}]}]}).replaceAll('<','\\u003c');
  html=html.replace('</head>',`<script type="application/ld+json">${structured}</script>\n</head>`);
  html=html.replace('<div id="root"></div>',`<div id="root"><main><h1>${escape(page.heading)}</h1><p>${escape(page.intro)}</p><h2>Migration lifecycle</h2><p>Discovery, conversion, controlled deployment, technical reconciliation, business reconciliation and reviewed remediation.</p><p><a href="/sql-server-to-databricks-migration/">Explore SQL Server to Databricks migration services</a></p></main></div>`);
  mkdirSync(join('dist',page.slug),{recursive:true}); writeFileSync(join('dist',page.slug,'index.html'),html);
}
console.log(`Generated ${pages.length} crawlable service HTML entry points plus migration case study`);


// The original SPA routes previously served the homepage's title, canonical and
// empty #root to crawlers until JavaScript ran. Generate distinct HTML documents
// for every canonical URL advertised in the sitemap.
const sitePages = [
  {
    path: 'solutions',
    title: 'AI Solutions, Data Modernization & Automation | VTAB Square',
    description: 'Explore AI application development, enterprise analytics, legacy platform migration and automation services from VTAB Square.',
    heading: 'AI Solutions, Data Modernization & Automation',
    intro: 'VTAB Square helps organizations modernize reporting and data platforms, build AI applications and automate repeatable business processes.',
    sections: [
      ['Data engineering and modernization', 'Explore SQL Server to Databricks migration, data integration and analytics platform engineering.', '/sql-server-to-databricks-migration/'],
      ['Business intelligence and reporting', 'Build Power BI semantic models, dashboards, paginated reports and reporting migration plans.', '/power-bi-consulting-services/'],
      ['AI applications and automation', 'Connect AI experiences with enterprise data and workflow systems with appropriate human review.', '/ai-application-development/'],
    ],
  },
  {
    path: 'industries',
    title: 'AI and Data Solutions by Industry | VTAB Square',
    description: 'Explore how VTAB Square approaches data engineering, analytics and AI application delivery for different industry use cases.',
    heading: 'AI and Data Solutions by Industry',
    intro: 'VTAB Square applies analytics, data engineering and software automation to business workflows across multiple industries.',
    sections: [
      ['Construction and real estate', 'Explore construction planning, blueprint analysis and project estimation software.', '/solutions'],
      ['Financial services and enterprise reporting', 'Modernize reporting models and analytics with Power BI and governed data platforms.', '/power-bi-consulting-services/'],
      ['IT operations and logistics', 'Explore workflow automation, AI-assisted support and logistics applications.', '/ai-application-development/'],
    ],
  },
  {
    path: 'lab',
    title: 'AI Innovation Lab & Product Demonstrations | VTAB Square',
    description: 'Explore VTAB Square AI application concepts, prototypes, technical demonstrations and software engineering work.',
    heading: 'AI Innovation Lab and Product Demonstrations',
    intro: 'Explore VTAB Square software concepts and demonstrations spanning AI reporting, data migration, automation and application engineering.',
    sections: [
      ['AI reporting', 'Learn about the AI Reporting Platform and enterprise analytics experiences.', '/architecture/ai-reporting-platform'],
      ['Reporting migration', 'Explore Qlik to Power BI migration workflows and conversion approaches.', '/architecture/qlik-to-powerbi-migration'],
      ['Enterprise AI applications', 'Discuss an AI application use case and its integration requirements.', '/ai-application-development/'],
    ],
  },
  {
    path: 'about',
    title: 'About VTAB Square | AI & Data Engineering Company',
    description: 'Learn about VTAB Square, our engineering services and our approach to AI solutions, BI and data modernization.',
    heading: 'About VTAB Square',
    intro: 'VTAB Square Private Limited is an India-based software and consulting company working on AI applications, data modernization, business intelligence and automation.',
    sections: [
      ['Our engineering focus', 'We work across AI application development, data platforms, analytics and workflow automation.', '/solutions'],
      ['Data modernization', 'Learn about our approach to SQL Server to Databricks migration and controlled validation.', '/sql-server-to-databricks-migration/'],
      ['Start a conversation', 'Contact our team about software development and consulting requirements.', '/contact'],
    ],
  },
  {
    path: 'careers',
    title: 'Careers at VTAB Square | AI & Data Engineering',
    description: 'Explore software engineering, AI, analytics and data engineering career opportunities at VTAB Square.',
    heading: 'Careers at VTAB Square',
    intro: 'Explore opportunities to work on software engineering, artificial intelligence, analytics and data engineering at VTAB Square.',
    sections: [
      ['Engineering disciplines', 'Our work spans modern web applications, enterprise data platforms, Power BI and AI integration.', '/solutions'],
      ['Open roles and applications', 'Visit this page in your browser to view available roles and the application form.', '/careers'],
      ['Questions about careers', 'Contact VTAB Square for recruitment enquiries.', '/contact'],
    ],
  },
  {
    path: 'contact',
    title: 'Contact VTAB Square | Discuss Your AI or Data Project',
    description: 'Contact VTAB Square about AI software, Databricks migration, Power BI development, data engineering and product demonstrations.',
    heading: 'Contact VTAB Square',
    intro: 'Discuss AI application development, Databricks migration, Power BI consulting and software engineering requirements with VTAB Square.',
    sections: [
      ['Data modernization', 'Tell us about your SQL Server and Databricks migration requirements.', '/sql-server-to-databricks-migration/'],
      ['Reporting and analytics', 'Discuss Power BI, reporting migration, semantic models and dashboards.', '/power-bi-consulting-services/'],
      ['AI applications', 'Share your application or automation use case.', '/ai-application-development/'],
    ],
  },
  {
    path: 'architecture/ai-reporting-platform',
    title: 'AI Reporting Platform | VTAB Square AI Products',
    description: 'Explore VTAB Square AI Reporting Platform for enterprise analytics, natural language queries, dashboards and automated insights.',
    heading: 'AI Reporting Platform',
    intro: 'Explore an AI-assisted reporting approach connecting enterprise data with dashboards, natural language queries and analytics workflows.',
    sections: [
      ['Reporting capabilities', 'Explore data connectivity, dashboards, automated analytics and executive reporting workflows.', '/power-bi-consulting-services/'],
      ['Related services', 'Discuss reporting architecture, Power BI development and data engineering.', '/solutions'],
      ['Request a demonstration', 'Contact VTAB Square to discuss the reporting platform and your requirements.', '/contact'],
    ],
  },
  {
    path: 'architecture/qlik-to-powerbi-migration',
    title: 'Qlik to Power BI Migration | VTAB Square AI Products',
    description: 'Explore VTAB Square Qlik to Power BI migration approach for expressions, data models, DAX measures and reporting validation.',
    heading: 'Qlik to Power BI Migration',
    intro: 'Explore a structured approach to converting Qlik reporting logic and data models into Power BI while validating measures and business outputs.',
    sections: [
      ['Migration discovery', 'Inventory Qlik reports, expressions, data sources and business dependencies.', '/power-bi-consulting-services/'],
      ['Conversion and validation', 'Review data models, DAX measures, visuals and business reconciliation.', '/power-bi-consulting-services/'],
      ['Discuss your migration', 'Contact VTAB Square about Qlik to Power BI modernization.', '/contact'],
    ],
  },
];
for (const page of sitePages) {
  const url = base + '/' + page.path;
  let html = template
    .replace(/<title>[^<]*<\/title>/, '<title>' + escape(page.title) + '</title>')
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="' + escape(page.description) + '" />')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, '<link rel="canonical" href="' + url + '" />')
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, '<meta property="og:title" content="' + escape(page.title) + '" />')
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, '<meta property="og:description" content="' + escape(page.description) + '" />')
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, '<meta property="og:url" content="' + url + '" />');
  const data = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url,
    isPartOf: { '@type': 'WebSite', name: 'VTAB Square', url: base + '/' },
  }).replaceAll('<', '\\u003c');
  html = html.replace('</head>', '<script type="application/ld+json">' + data + '</script>\n</head>');
  const sections = page.sections.map(([heading, body, href]) =>
    '<section><h2>' + escape(heading) + '</h2><p>' + escape(body) +
    '</p><a href="' + href + '">Learn more</a></section>'
  ).join('');
  const root = '<div id="root"><main><h1>' + escape(page.heading) +
    '</h1><p>' + escape(page.intro) + '</p>' + sections +
    '<p>Contact <a href="mailto:Information@vtabsquare.com">Information@vtabsquare.com</a> about your project.</p></main></div>';
  html = html.replace('<div id="root"></div>', root);
  mkdirSync(join('dist', page.path), { recursive: true });
  writeFileSync(join('dist', page.path, 'index.html'), html);
}
console.log('Generated ' + sitePages.length + ' crawlable original route HTML entry points');
