import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Workflow, 
  Network, 
  Cpu, 
  LayoutDashboard, 
  FileSpreadsheet,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Sliders,
  ExternalLink,
  Table,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const ZigzagFeatures: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 lg:space-y-36">
        {/* Section Master Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-pretty">
            Engineered layer by layer for unmatched speed.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of VTAB Reporting Studio is purpose-built to eliminate bottlenecks between raw data lakes and executive decisions.
          </p>
        </div>

        {/* ZIGZAG ROW 1: Data Connectivity (Text Left, Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-400 font-mono">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>01 · UNIVERSAL DATA CONNECTIVITY</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Federate across clouds with zero data duplication.
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect to enterprise data warehouses and lakehouses through native DirectQuery folding. 
              Queries are converted into optimized remote SQL pushdowns, delivering sub-second updates without expensive pipeline ETL or data staging.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Direct Lake passthrough to Apache Iceberg, Delta Lake & Parquet',
                'Native Kerberos, OAuth 2.0 and SAML enterprise credential delegation',
                'Continuous schema drift detection with automatic backward compatibility'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">120+ Connectors</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">DirectQuery Folding</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">TLS 1.3 Strict</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ZigzagConnectorVisual />
          </div>
        </div>

        {/* ZIGZAG ROW 2: Data Transformation (Visual Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-violet" />

          <div className="lg:col-span-6 order-2 lg:order-1">
            <ZigzagTransformVisual />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-indigo-400 font-mono">
              <Workflow className="w-4 h-4 text-indigo-400" />
              <span>02 · VISUAL DATA TRANSFORMATION</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Reversible recipe canvas with live column profiling.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Shape, pivot, unpivot, filter, and normalize complex nested JSON and relational tables through an intuitive visual recipe. 
              Every step is non-destructive and visualizes value distributions, distinct cardinality, and null anomalies in real time.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Instant step rollback with visual recipe diffing and branch inspection',
                'Automated semantic type inference with AI-assisted anomaly repair',
                'High-performance fuzzy matching and geospatial coordinates parsing'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300">Infinite Undo</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Live Histograms</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Zero-Copy Stream</span>
            </div>
          </div>
        </div>

        {/* ZIGZAG ROW 3: Semantic Modelling (Text Left, Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />

          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-400 font-mono">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>03 · SEMANTIC RELATIONAL MODELLING</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise star schemas with validated integrity.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Design multi-fact star and snowflake schemas with drag-and-drop relationship mapping. 
              Enforce bidirectional cross-filtering, define role-playing dimensions, and validate referential integrity across billions of records before publishing.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Multi-cardinality maps (1:1, 1:N, N:M) with active & inactive relationship paths',
                'Calculation groups for universal currency, unit, and tax conversions',
                'Granular row-level security (RLS) and object-level security (OLS) rules'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">TMDL / BIM Spec</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Star & Snowflake</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">RLS Enforced</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ZigzagSchemaVisual />
          </div>
        </div>

        {/* ZIGZAG ROW 4: VTAB Measure Engine (Visual Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-violet" />

          <div className="lg:col-span-6 order-2 lg:order-1">
            <ZigzagEngineVisual />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-purple-400 font-mono">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>04 · VTAB VECTOR MEASURE ENGINE</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AVX-512 vectorized execution compiling to machine code.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience analytical calculations without the traditional DAX overhead. 
              The VTAB Vector Measure Engine compiles time-intelligence, window functions, and contextual aggregations directly to hardware SIMD vector registers.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Sub-millisecond query evaluation on multi-million row in-memory columnar partitions',
                'Interactive filter context transition inspect matrix and execution plan profiler',
                'Over 350 native statistical, financial, and time-series analytical functions'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-purple-300">AVX-512 JIT</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">&lt; 14ms Cold Latency</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Run-Length Encoded</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 1. Connectivity Visual Component
const ZigzagConnectorVisual: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState('Snowflake DW');

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#090D1A] p-5 sm:p-6 shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Active Lakehouse Ingestion Mesh
        </span>
        <span className="text-cyan-400 font-mono text-[11px]">DirectLake Active</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {[
          { name: 'Snowflake DW', ping: '8ms', rows: '4.8M', status: 'DirectQuery' },
          { name: 'Google BigQuery', ping: '12ms', rows: '12.4M', status: 'DirectLake' },
          { name: 'Databricks Delta', ping: '14ms', rows: '38.2M', status: 'Parquet Lake' },
          { name: 'PostgreSQL Relational', ping: '4ms', rows: '890K', status: 'In-Memory' },
        ].map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setSelectedSource(item.name)}
            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
              selectedSource === item.name
                ? 'bg-blue-950/70 border-cyan-400 text-white shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between font-semibold text-xs">
              <span className="truncate">{item.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>{item.status}</span>
              <span className="text-cyan-300">{item.ping}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Rows: {item.rows}</div>
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-[#060810] border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5">
        <div className="text-slate-400 flex justify-between">
          <span>Target: {selectedSource}</span>
          <span className="text-emerald-400">Zero-Copy Buffer Active</span>
        </div>
        <div className="text-cyan-300 text-[10px]">
          SELECT date_trunc('month', order_date), SUM(net_amount) FROM fact_orders GROUP BY 1 PUSHED DOWN
        </div>
      </div>
    </div>
  );
};

// 2. Data Transformation Visual Component
const ZigzagTransformVisual: React.FC = () => {
  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-[#090D1A] p-5 sm:p-6 shadow-[0_0_50px_-15px_rgba(99,102,241,0.3)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-white flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-indigo-400" />
          Interactive Recipe Pipeline
        </span>
        <span className="text-indigo-400 font-mono text-[11px]">4 Steps Applied</span>
      </div>

      <div className="space-y-2 font-mono text-xs">
        {[
          { num: '01', title: 'Source Lake Connector', info: 'Inferred schema: 24 columns' },
          { num: '02', title: 'Filter Anomaly Rows', info: '[Amount] > 0 AND [Status] = "Active"' },
          { num: '03', title: 'Unpivot Monthly Periods', info: 'Converted 12 cols to Attribute/Value' },
          { num: '04', title: 'Geospatial Postal Join', info: 'Matched 14,200 lat/lng coordinates' },
        ].map((step, idx) => (
          <div key={step.num} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold text-[10px]">
                {step.num}
              </span>
              <span className="font-semibold text-white text-xs">{step.title}</span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:inline">{step.info}</span>
          </div>
        ))}
      </div>

      {/* Column Quality Bar */}
      <div className="p-3 rounded-xl bg-[#060810] border border-slate-800 text-xs space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>Column Quality: Order_Net_USD</span>
          <span className="text-emerald-400">100% Valid · 0% Error</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 flex overflow-hidden">
          <div className="h-full bg-emerald-400 w-[96%]" />
          <div className="h-full bg-amber-400 w-[4%]" />
        </div>
      </div>
    </div>
  );
};

// 3. Semantic Schema Visual Component
const ZigzagSchemaVisual: React.FC = () => {
  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-[#090D1A] p-5 sm:p-6 shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-white flex items-center gap-2">
          <Network className="w-3.5 h-3.5 text-cyan-400" />
          Semantic Relational Topology
        </span>
        <span className="text-cyan-400 font-mono text-[11px]">3 Relationships Active</span>
      </div>

      {/* Interactive Schema Diagram Nodes */}
      <div className="grid grid-cols-3 gap-2.5 py-1">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-1.5">
          <div className="font-bold text-white pb-1 border-b border-slate-800 flex justify-between">
            <span>Dim_Customer</span>
            <span className="text-[9px] text-cyan-400 font-mono">1</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono space-y-0.5">
            <div className="text-cyan-300">🔑 CustomerKey</div>
            <div>Account_Name</div>
            <div>Territory_ID</div>
          </div>
        </div>

        {/* Center Fact */}
        <div className="p-3 rounded-xl bg-blue-950/70 border border-cyan-500/60 text-xs space-y-1.5 shadow-lg">
          <div className="font-bold text-cyan-200 pb-1 border-b border-blue-800 flex justify-between">
            <span>Fact_Orders</span>
            <span className="text-[9px] text-cyan-300 font-mono">N</span>
          </div>
          <div className="text-[10px] text-slate-300 font-mono space-y-0.5">
            <div className="text-cyan-300">🔑 OrderKey</div>
            <div className="text-blue-300">🔗 CustomerKey</div>
            <div className="text-blue-300">🔗 DateKey</div>
            <div className="text-emerald-300 font-semibold">∑ NetRevenue</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-1.5">
          <div className="font-bold text-white pb-1 border-b border-slate-800 flex justify-between">
            <span>Dim_Date</span>
            <span className="text-[9px] text-cyan-400 font-mono">1</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono space-y-0.5">
            <div className="text-cyan-300">🔑 DateKey</div>
            <div>Fiscal_Year</div>
            <div>Working_Day</div>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-lg bg-[#060810] border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
        <span className="text-slate-400">Cardinality Verification:</span>
        <span className="text-emerald-400">No ambiguous or circular filter pathways</span>
      </div>
    </div>
  );
};

// 4. Measure Engine Visual Component
const ZigzagEngineVisual: React.FC = () => {
  return (
    <div className="rounded-2xl border border-purple-500/30 bg-[#090D1A] p-5 sm:p-6 shadow-[0_0_50px_-15px_rgba(168,85,247,0.3)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <span className="font-semibold text-white flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          Vector JIT Compiler & Telemetry
        </span>
        <span className="text-purple-400 font-mono text-[11px]">AVX-512 Native</span>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
        <div className="text-slate-500">// Compiled DAX Expression</div>
        <div>
          <span className="text-cyan-400">Total_Margin_Variance</span> =
        </div>
        <div className="pl-4">
          <span className="text-purple-400">VAR</span> CurrentMargin = <span className="text-blue-400">CALCULATE</span>(<span className="text-emerald-400">[Gross_Margin_Pct]</span>)
        </div>
        <div className="pl-4">
          <span className="text-purple-400">VAR</span> TargetMargin = <span className="text-blue-400">CALCULATE</span>(<span className="text-emerald-400">[Target_Margin_Pct]</span>)
        </div>
        <div className="pl-4">
          <span className="text-purple-400">RETURN</span> <span className="text-blue-400">DIVIDE</span>(CurrentMargin - TargetMargin, TargetMargin)
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-500">Latency</div>
          <div className="text-emerald-400 font-bold mt-0.5">2.8ms</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-500">SIMD Register</div>
          <div className="text-purple-300 font-bold mt-0.5">ZMM0-ZMM7</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-500">Throughput</div>
          <div className="text-cyan-300 font-bold mt-0.5">4.2M r/s</div>
        </div>
      </div>
    </div>
  );
};

