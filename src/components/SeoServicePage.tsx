import React from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { trackBusinessEvent } from '../lib/analyticsService';

export type SeoServiceSlug = 'sql-server-to-databricks-migration' | 'power-bi-consulting-services' | 'ai-application-development';

const services: Record<SeoServiceSlug, { title:string; eyebrow:string; intro:string; sections:{title:string;body:string;points:string[]}[]; cta:string; deliverables:string[]; related:{href:string;label:string}[] }> = {
  'sql-server-to-databricks-migration': {
    title: 'SQL Server to Databricks Migration Services',
    eyebrow: 'Data Platform Modernization',
    intro: 'Modernize SQL Server data warehouses and analytics workloads on Databricks with structured discovery, schema and code conversion, reconciliation, governance, and phased cutover support.',
    cta: 'Request a Databricks migration assessment',
    deliverables: ['Source inventory and dependency map','Migration-wave and target architecture plan','Conversion and deployment artifacts','Technical and business reconciliation evidence','DEV-to-TEST promotion and cutover runbook'],
    related: [{href:'/architecture/ai-reporting-platform',label:'AI Reporting Platform'},{href:'/power-bi-consulting-services/',label:'Power BI Consulting'}],
    sections: [
      { title:'Migration discovery and assessment', body:'We inventory SQL Server schemas, tables, procedures, dependencies and workload complexity before defining migration waves.', points:['Source inventory and dependency analysis','Migration complexity classification','Target architecture and delivery plan'] },
      { title:'Conversion and Databricks engineering', body:'Move data and transformation logic toward Delta Lake and Databricks SQL while keeping business rules traceable through review and validation.', points:['Schema and SQL conversion','Bronze, Silver and Gold design','Unity Catalog governance planning'] },
      { title:'Reconciliation and controlled cutover', body:'Technical and business reconciliation help teams compare source and target results before promotion and cutover.', points:['Row-count and data-quality checks','Business KPI reconciliation','Phased promotion and rollback planning'] },
    ],
  },
  'power-bi-consulting-services': {
    title: 'Power BI Consulting & Migration Services',
    eyebrow: 'Business Intelligence & Analytics',
    intro: 'Design, modernize and govern Power BI solutions with semantic models, DAX, Power Query, report engineering, migration support and performance-focused delivery.',
    cta: 'Discuss your Power BI requirement',
    deliverables: ['Current-state BI assessment','Semantic model and reporting architecture','DAX and Power Query remediation plan','Migration validation checklist','Workspace, security and deployment guidance'],
    related: [{href:'/architecture/qlik-to-powerbi-migration',label:'Qlik to Power BI Migration'},{href:'/sql-server-to-databricks-migration/',label:'Databricks Migration'}],
    sections: [
      { title:'Power BI architecture and development', body:'Build maintainable analytics solutions around business KPIs, governed models and reusable reporting patterns.', points:['Semantic model design','DAX and Power Query engineering','Dashboard and paginated report delivery'] },
      { title:'BI platform migration', body:'Plan migrations from legacy reporting platforms while preserving business logic, measures and user workflows.', points:['Qlik to Power BI assessment','Report and KPI mapping','Validation and adoption planning'] },
      { title:'Optimization and governance', body:'Improve model quality, report performance and maintainability with structured technical review.', points:['Model and DAX review','Unused-object and performance analysis','Security and workspace governance guidance'] },
    ],
  },
  'ai-application-development': {
    title: 'Enterprise AI Application Development',
    eyebrow: 'AI Engineering',
    intro: 'Build practical AI applications that combine enterprise data, workflow automation, modern web experiences and human oversight for production use cases.',
    cta: 'Discuss an AI application',
    deliverables: ['Use-case and data readiness assessment','Solution architecture and integration plan','Prototype with measurable acceptance criteria','Security, audit and human-review controls','Production deployment and operational handover'],
    related: [{href:'/architecture/ai-reporting-platform',label:'AI Reporting Platform'},{href:'/solutions',label:'Enterprise Solutions'}],
    sections: [
      { title:'AI solution discovery', body:'Translate business problems into bounded AI use cases with clear data, integration and human-review requirements.', points:['Use-case and workflow mapping','Data and integration assessment','Prototype-to-production roadmap'] },
      { title:'Application engineering', body:'Develop AI-enabled web applications, assistants and automation workflows integrated with enterprise systems.', points:['LLM and RAG integration','API and workflow automation','Modern React and service architecture'] },
      { title:'Production readiness', body:'Design for controlled access, observability and review rather than treating AI as an isolated demonstration.', points:['Authentication and role design','Auditability and human approval','Deployment and operational support'] },
    ],
  },
};

export const SeoServicePage: React.FC<{ slug: SeoServiceSlug; onScheduleDemo:(interest?:string)=>void }> = ({slug,onScheduleDemo}) => {
  const service=services[slug];
  const enquirySubject = encodeURIComponent('VTAB Square enquiry: ' + service.title);
  const enquiryBody = encodeURIComponent('Hello VTAB Square team,\n\nI would like to discuss ' + service.title + '.\n\nMy requirement: \n\nCompany: \n\nThank you.');
  const enquiryHref = `mailto:Contactsales@vtabsquare.com?subject=${enquirySubject}&body=${enquiryBody}`;
  return <div className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
    <header className="max-w-4xl space-y-5">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">{service.eyebrow}</p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">{service.title}</h1>
      <p className="text-lg text-slate-300 leading-relaxed">{service.intro}</p>
      <button onClick={()=>onScheduleDemo(service.title)} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold">
        {service.cta}<ArrowRight className="w-4 h-4"/>
      </button>
    </header>
    <section className="grid md:grid-cols-3 gap-6">
      {service.sections.map(section=><article key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">{section.title}</h2>
        <p className="text-sm text-slate-300 leading-relaxed">{section.body}</p>
        <ul className="space-y-2">{section.points.map(point=><li key={point} className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"/><span>{point}</span></li>)}</ul>
      </article>)}
    </section>
    <section className="grid md:grid-cols-2 gap-6">
      <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
        <h2 className="text-2xl font-bold text-white">Typical engagement deliverables</h2>
        <ul className="mt-5 space-y-3">{service.deliverables.map(item=><li key={item} className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5"/><span>{item}</span></li>)}</ul>
      </article>
      <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
        <h2 className="text-2xl font-bold text-white">Related VTAB Square capabilities</h2>
        <p className="mt-3 text-sm text-slate-300">Explore connected services and product engineering work relevant to this engagement.</p>
        <div className="mt-5 flex flex-col gap-3">{service.related.map(link=><a key={link.href} href={link.href} className="text-cyan-300 font-semibold inline-flex items-center gap-2">{link.label}<ArrowRight className="w-4 h-4"/></a>)}</div>
      </article>
    </section>
    <section className="rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.05] p-7 md:p-10">
      <h2 className="text-2xl font-bold text-white">Talk to VTAB Square</h2>
      <p className="mt-3 text-slate-300">Share your current platform, target outcome and delivery constraints. We can start with a focused assessment before defining implementation scope.</p>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <button onClick={()=>onScheduleDemo(service.title)} className="text-cyan-300 font-semibold inline-flex items-center gap-2">Start a conversation <ArrowRight className="w-4 h-4"/></button>
        <a href={enquiryHref} onClick={()=>trackBusinessEvent('service_email_click')} className="text-cyan-300 font-semibold inline-flex items-center gap-2"><Mail className="w-4 h-4"/> Email our sales team</a>
      </div>
    </section>
  </div>;
};
