import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Workflow, 
  Network, 
  Cpu, 
  LayoutDashboard, 
  FileSpreadsheet,
  Check,
  ChevronRight,
  Code2,
  TableProperties
} from 'lucide-react';
import { FEATURE_ITEMS } from '../data/reportingProductData';
import type { FeatureItem } from '../typesReporting';

const categoryIcons = {
  'Data Connectivity': Database,
  'Data Transformation': Workflow,
  'Semantic Modelling': Network,
  'VTAB Measure Engine': Cpu,
  'Interactive Dashboards': LayoutDashboard,
  'Advanced Reporting': FileSpreadsheet,
};

export const FeatureShowcase: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('connectivity');
  const activeFeature = FEATURE_ITEMS.find((f) => f.id === activeFeatureId) || FEATURE_ITEMS[0];

  return (
    <section id="features" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl text-left mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            STUDIO CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-pretty">
            Interactive analytical capabilities.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Select a capability below to explore how VTAB Reporting Studio powers modern enterprise intelligence.
          </p>
        </div>

        {/* Tab Selection Bar (Preserving Dimensions) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#090D18] rounded-xl border border-slate-800/80 overflow-x-auto scrollbar-none mb-8">
          {FEATURE_ITEMS.map((item) => {
            const Icon = categoryIcons[item.category];
            const isActive = item.id === activeFeatureId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFeatureId(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/90 text-white shadow-md shadow-blue-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Demonstration Panel Container with Preserved Dimensions */}
        <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col justify-center">
          {/* Subtle atmospheric ambient glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Feature Information & Specs */}
              <div className="lg:col-span-5 space-y-5 text-left">
                {/* Category kicker */}
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                  <span>{activeFeature.shortTag}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{activeFeature.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  {activeFeature.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Key feature highlights */}
                <div className="space-y-2.5 pt-1">
                  {activeFeature.highlightPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specs Strip */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-3">
                  {activeFeature.specs.map((spec, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500">{spec.label}</div>
                      <div className="text-xs font-semibold text-slate-200 tabular-nums">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: High-Fidelity UI Demonstration Mockup */}
              <div className="lg:col-span-7">
                <FeatureMockup previewType={activeFeature.previewType} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Subcomponent: Dedicated High-Fidelity UI Mockup per Feature
const FeatureMockup: React.FC<{ previewType: FeatureItem['previewType'] }> = ({ previewType }) => {
  return (
    <div className="rounded-xl border border-slate-800/90 bg-[#070A14] overflow-hidden shadow-xl text-xs">
      {/* Mockup Window Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0A0E1A] border-b border-slate-800 text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/60" />
          <span className="w-2 h-2 rounded-full bg-amber-500/60" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <span className="text-slate-300 ml-2 font-mono text-[10px]">
            {previewType === 'connectors' && 'VTAB Studio — Connector Catalog'}
            {previewType === 'transform' && 'VTAB Studio — Data Shaping Recipe Canvas'}
            {previewType === 'model' && 'VTAB Studio — Semantic Relational Graph'}
            {previewType === 'engine' && 'VTAB Studio — DAX Formula Compiler & Profiler'}
            {previewType === 'dashboard' && 'VTAB Studio — Live Canvas Visualizer'}
            {previewType === 'paginated' && 'VTAB Studio — Paginated Report Designer'}
          </span>
        </div>
        <div className="text-[10px] text-cyan-400 font-mono">v5.0.22</div>
      </div>

      {/* Mockup Canvas Area */}
      <div className="p-4 sm:p-5 bg-[#06080F] min-h-[320px]">
        {previewType === 'connectors' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
              <span>Active Data Sources (6 of 124 Connected)</span>
              <span className="text-emerald-400">All Nodes Healthy</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'Snowflake Enterprise', type: 'DirectQuery', ping: '9ms', rows: '4.8M' },
                { name: 'Google BigQuery', type: 'In-Memory Cache', ping: '14ms', rows: '12.2M' },
                { name: 'PostgreSQL Relational', type: 'Scheduled Refresh', ping: '4ms', rows: '850K' },
                { name: 'Azure Data Lake Gen2', type: 'Delta Parquet', ping: '18ms', rows: '34M' },
              ].map((c) => (
                <div key={c.name} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between font-semibold text-white text-[11px]">
                    <span className="truncate">{c.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{c.type}</span>
                    <span className="text-cyan-300">{c.ping}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">Rows indexed: {c.rows}</div>
                </div>
              ))}
            </div>
            <div className="p-2 rounded bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
              <span>Automatic TLS 1.3 encryption & Kerberos ticket rotation active.</span>
              <span className="text-cyan-400 font-mono text-[10px]">SEC_OK</span>
            </div>
          </div>
        )}

        {previewType === 'transform' && (
          <div className="space-y-3 font-mono text-[11px]">
            <div className="text-[10px] uppercase text-slate-400 tracking-wider">Applied Step Pipeline</div>
            <div className="space-y-1.5">
              {[
                { step: '1. Source Navigation', status: 'Snowflake.Warehouse("CORP_PROD")', time: '0.2s' },
                { step: '2. Filter Null Transactions', status: 'Table.SelectRows([Amount] > 0)', time: '0.1s' },
                { step: '3. Currency Normalization', status: 'Table.TransformColumns([USD_Conversion])', time: '0.3s' },
                { step: '4. Unpivot Monthly Columns', status: 'Table.UnpivotOtherColumns({"Region"})', time: '0.4s' },
              ].map((s) => (
                <div key={s.step} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-cyan-400" />
                    <span className="font-medium text-white">{s.step}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px]">
                    <span className="text-slate-500 hidden sm:inline">{s.status}</span>
                    <span className="text-cyan-300">{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Previewing 1,000 rows. Reversible rollback enabled for all steps.</span>
            </div>
          </div>
        )}

        {previewType === 'model' && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 flex items-center justify-between pb-1 border-b border-slate-800">
              <span>Star Schema Relational Canvas</span>
              <span className="text-cyan-400 font-mono text-[10px]">Cardinality: 1:N Validated</span>
            </div>
            {/* Visual Schema Box Representation */}
            <div className="grid grid-cols-3 gap-2 py-1 items-center">
              <div className="p-2 rounded bg-slate-900 border border-slate-700/80 space-y-1">
                <div className="font-semibold text-white text-[11px] pb-1 border-b border-slate-800 flex justify-between">
                  <span>Dim_Customer</span>
                  <span className="text-[9px] text-cyan-400">DIM</span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5">
                  <div className="text-cyan-300 font-mono">🔑 CustomerKey</div>
                  <div>Account_Name</div>
                  <div>Region_Code</div>
                </div>
              </div>

              {/* Center Fact Table */}
              <div className="p-2.5 rounded bg-blue-950/60 border border-blue-600/60 space-y-1 shadow-lg">
                <div className="font-semibold text-cyan-200 text-[11px] pb-1 border-b border-blue-800/80 flex justify-between">
                  <span>Fact_Orders</span>
                  <span className="text-[9px] text-cyan-300">FACT</span>
                </div>
                <div className="text-[10px] text-slate-300 space-y-0.5">
                  <div className="font-mono text-cyan-300">🔑 OrderKey</div>
                  <div className="font-mono text-blue-300">🔗 CustomerKey</div>
                  <div className="font-mono text-blue-300">🔗 DateKey</div>
                  <div className="text-emerald-300 font-semibold">∑ NetRevenue</div>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900 border border-slate-700/80 space-y-1">
                <div className="font-semibold text-white text-[11px] pb-1 border-b border-slate-800 flex justify-between">
                  <span>Dim_Calendar</span>
                  <span className="text-[9px] text-cyan-400">DIM</span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5">
                  <div className="text-cyan-300 font-mono">🔑 DateKey</div>
                  <div>Fiscal_Quarter</div>
                  <div>Is_Working_Day</div>
                </div>
              </div>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400">
              Cross-filtering direction: Single (1 → *) · Referential integrity enforced without circular dependencies.
            </div>
          </div>
        )}

        {previewType === 'engine' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>DAX Measure Formula Editor</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">Syntax Clean · 0 Warnings</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div>
                <span className="text-cyan-400">YoY_Growth_Pct</span> =
              </div>
              <div className="pl-4">
                <span className="text-purple-400">VAR</span> _Actual = <span className="text-blue-400">[Net_Revenue_USD]</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">VAR</span> _Prior = <span className="text-blue-400">CALCULATE</span>(
              </div>
              <div className="pl-8">
                <span className="text-blue-400">[Net_Revenue_USD]</span>,
              </div>
              <div className="pl-8">
                <span className="text-amber-400">SAMEPERIODLASTYEAR</span>(<span className="text-slate-300">Dim_Date[Date]</span>)
              </div>
              <div className="pl-4">)</div>
              <div className="pl-4">
                <span className="text-purple-400">RETURN</span> <span className="text-blue-400">DIVIDE</span>(_Actual - _Prior, _Prior, <span className="text-cyan-400">BLANK()</span>)
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
              <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                <span>Vector SIMD Width</span>
                <span className="text-white font-mono">AVX-512</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900/60 border border-slate-800 flex justify-between">
                <span>Execution Time</span>
                <span className="text-cyan-400 font-mono tabular-nums">3.8 ms</span>
              </div>
            </div>
          </div>
        )}

        {previewType === 'dashboard' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
              <span>Coordinated Multi-Visual Filtering</span>
              <span className="text-cyan-400 font-mono text-[10px]">60 FPS Rendering</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Q4 Actual</div>
                <div className="text-base font-bold text-white tabular-nums">$48.2M</div>
                <div className="text-[9px] text-emerald-400">+18.4%</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Gross Margin</div>
                <div className="text-base font-bold text-white tabular-nums">68.2%</div>
                <div className="text-[9px] text-emerald-400">+2.4 pts</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400">Active Pipeline</div>
                <div className="text-base font-bold text-white tabular-nums">$124M</div>
                <div className="text-[9px] text-cyan-400">3.4x Coverage</div>
              </div>
            </div>
            {/* Visual mini chart */}
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 h-24 flex items-end gap-1.5 pt-3">
              {[40, 58, 62, 75, 88, 95, 110, 102, 118, 125].map((val, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xs hover:brightness-125 transition-all cursor-pointer" 
                  style={{ height: `${(val / 130) * 100}%` }}
                />
              ))}
            </div>
            <div className="text-[10px] text-slate-400">
              Selecting any bar dynamically filters all adjacent KPI cards and table segments instantly.
            </div>
          </div>
        )}

        {previewType === 'paginated' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
              <span>Paginated Print Layout (Page 1 of 4)</span>
              <span className="text-slate-300">Format: Standard A4 (300 DPI)</span>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-800 text-[10px]">
                <span className="font-bold text-white uppercase">ACME GLOBAL CORPORATION</span>
                <span>CONFIDENTIAL AUDIT DOSSIER</span>
              </div>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="flex justify-between">
                  <span>Header Band (Repeating on every page):</span>
                  <span className="text-cyan-400">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span>Tablix Column Hierarchies:</span>
                  <span className="text-slate-200">Region &gt; Country &gt; Store</span>
                </div>
                <div className="flex justify-between">
                  <span>Page Break Rules:</span>
                  <span className="text-slate-200">Between Country Groupings</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span>Export options: Vector PDF · Formatted XLSX · Native Word DOCX</span>
              <span className="text-cyan-400">Print Ready</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

