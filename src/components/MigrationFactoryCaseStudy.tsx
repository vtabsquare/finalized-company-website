import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const MigrationFactoryCaseStudy: React.FC<{onScheduleDemo:(interest?:string)=>void}> = ({onScheduleDemo}) => (
  <div className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
    <header className="max-w-4xl space-y-5">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-400">Solution Case Study</p>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white">SQL Server to Databricks AI Migration Factory</h1>
      <p className="text-lg text-slate-300 leading-relaxed">A reusable migration-factory approach for assessing SQL Server estates, converting database objects and data pipelines, deploying to Databricks, reconciling results and controlling promotion through review gates.</p>
    </header>
    <section className="grid md:grid-cols-3 gap-6">
      {[
        ['Challenge','Large SQL Server estates combine tables, procedures, dependencies and business rules that need traceable conversion rather than simple data copying.'],
        ['Factory approach','The workflow separates discovery, intermediate representation, conversion, deployment, reconciliation and remediation so each stage can be reviewed and repeated.'],
        ['Validation','Technical checks and business reconciliation compare source and target outcomes before controlled promotion to higher environments.']
      ].map(([h,b])=><article key={h} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"><h2 className="text-xl font-bold text-white">{h}</h2><p className="mt-3 text-sm leading-relaxed text-slate-300">{b}</p></article>)}
    </section>
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
      <h2 className="text-2xl font-bold text-white">Migration lifecycle</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">{['Inventory SQL Server metadata and dependencies','Classify conversion complexity','Generate and review Databricks-target artifacts','Deploy through controlled environments','Run technical and business reconciliation','Use AI-assisted remediation with human review where appropriate'].map(x=><div key={x} className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0"/><span>{x}</span></div>)}</div>
    </section>
    <section className="rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.05] p-7 md:p-10">
      <h2 className="text-2xl font-bold text-white">Evaluate the approach for your estate</h2>
      <p className="mt-3 text-slate-300">Start with a scoped assessment of source objects, dependencies, data volumes, reconciliation requirements and target governance.</p>
      <div className="mt-5 flex flex-wrap gap-5"><button onClick={()=>onScheduleDemo('SQL Server to Databricks AI Migration Factory')} className="text-cyan-300 font-semibold inline-flex items-center gap-2">Request a migration assessment <ArrowRight className="w-4 h-4"/></button><a href="/sql-server-to-databricks-migration/" className="text-blue-300 font-semibold inline-flex items-center gap-2">Migration services <ArrowRight className="w-4 h-4"/></a></div>
    </section>
  </div>
);
