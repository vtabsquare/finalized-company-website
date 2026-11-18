import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Database,
  Search,
  Layers,
  Cpu,
  Wrench,
  ShieldCheck,
  Check,
  Zap,
  ArrowRight,
  Server
} from 'lucide-react';
import { DATABRICKS_FEATURE_ITEMS } from '../data/databricksMigrationData';

const tabIconMap: Record<string, any> = {
  connectivity: Database,
  cataloging: Search,
  medallion: Layers,
  transport: Cpu,
  'ai-repair': Wrench,
  governance: ShieldCheck
};

export const DatabricksFeatureShowcase: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('connectivity');
  const activeFeature = DATABRICKS_FEATURE_ITEMS.find(f => f.id === activeTabId) || DATABRICKS_FEATURE_ITEMS[0];

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-[#050711] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            STUDIO CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-pretty">
            Interactive migration capabilities.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Select a capability below to explore how Databricks Migration AI Studio powers modern enterprise lakehouse modernization.
          </p>
        </div>

        {/* 6 Studio Capability Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#090D1C] border border-slate-800/80 mb-10 overflow-x-auto">
          {DATABRICKS_FEATURE_ITEMS.map((item) => {
            const Icon = tabIconMap[item.id] || Database;
            const isActive = activeTabId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTabId(item.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Capability Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-[#0A1024] to-[#040816] border border-cyan-500/30 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Feature Content & Technical Checklist */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeFeature.shortTag} • {activeFeature.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {activeFeature.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Core Technical Capabilities Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
                    Core Technical Capabilities
                  </div>
                  <ul className="space-y-2.5">
                    {activeFeature.highlightPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                        <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enterprise Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {activeFeature.specs.map((spec, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">{spec.label}</div>
                      <div className="text-xs font-mono font-bold text-cyan-300">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Monitor Panel Mockup */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-cyan-500/30 bg-[#030919] p-6 shadow-2xl font-mono text-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">Migration Studio Engine</div>
                      <div className="text-sm font-bold text-white">{activeFeature.category}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      v2.5.0 STABLE
                    </span>
                  </div>

                  {/* Dynamic Inner Panel Content based on selected tab */}
                  {activeTabId === 'connectivity' && (
                    <div className="space-y-3">
                      <div className="text-[11px] text-slate-400">Active Source Databases (4 of 4 Connected)</div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">SQL Server</span>
                            <span className="text-emerald-400">● 4ms</span>
                          </div>
                          <div className="text-slate-400 text-[10px]">ODBC Driver 18</div>
                          <div className="text-cyan-300 font-bold">2,450 Objects</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">PostgreSQL</span>
                            <span className="text-emerald-400">● 6ms</span>
                          </div>
                          <div className="text-slate-400 text-[10px]">psycopg2 SSL</div>
                          <div className="text-cyan-300 font-bold">890 Objects</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">Oracle 19c</span>
                            <span className="text-emerald-400">● 11ms</span>
                          </div>
                          <div className="text-slate-400 text-[10px]">Thin SID Mode</div>
                          <div className="text-cyan-300 font-bold">1,240 Objects</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">MySQL 8.0</span>
                            <span className="text-emerald-400">● 5ms</span>
                          </div>
                          <div className="text-slate-400 text-[10px]">utf8mb4 Native</div>
                          <div className="text-cyan-300 font-bold">412 Objects</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 p-2.5 rounded bg-black/40 border border-white/5">
                        Encrypted vault active: Passwords derived from JWT_SECRET using PBKDF2 SHA-256. Zero credential leakage.
                      </div>
                    </div>
                  )}

                  {activeTabId === 'cataloging' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-black/40 border border-white/5 space-y-1.5 text-[11px]">
                        <div className="text-cyan-300 font-bold">Dependency DAG Order:</div>
                        <div className="text-slate-300">dim_currency → dim_customer → fact_sales_order</div>
                        <div className="text-[10px] text-emerald-400">Cycles: 0 detected • Topological sort verified</div>
                      </div>
                      <div className="p-3 rounded bg-black/40 border border-white/5 space-y-1.5 text-[11px]">
                        <div className="text-cyan-300 font-bold">Immutable Metadata Snapshot:</div>
                        <div className="text-slate-400 break-all text-[10px]">SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</div>
                      </div>
                    </div>
                  )}

                  {activeTabId === 'medallion' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 space-y-1">
                        <div className="font-bold flex justify-between">
                          <span>Bronze (Raw Delta)</span>
                          <span>2,450 Tables</span>
                        </div>
                        <div className="text-[10px] text-amber-300/80">Append-only audit, sha2 row hash, source checksum</div>
                      </div>

                      <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200 space-y-1">
                        <div className="font-bold flex justify-between">
                          <span>Silver (Curated SCD2)</span>
                          <span>1,080 Tables</span>
                        </div>
                        <div className="text-[10px] text-cyan-300/80">Idempotent Delta MERGE with surrogate key generation</div>
                      </div>

                      <div className="p-3 rounded-xl bg-yellow-950/20 border border-yellow-500/30 text-yellow-200 space-y-1">
                        <div className="font-bold flex justify-between">
                          <span>Gold (Curated Star)</span>
                          <span>311 Marts</span>
                        </div>
                        <div className="text-[10px] text-yellow-300/80">Aggregated dimensional star schemas and executive KPIs</div>
                      </div>
                    </div>
                  )}

                  {activeTabId === 'transport' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-black/50 border border-white/10 font-mono text-[11px] space-y-2">
                        <div className="text-slate-400">// SQL Server Extraction:</div>
                        <div className="text-cyan-300">SELECT CustomerID, sys.fn_varbintohexstr(RowVersion) AS RowVersion_hex</div>
                        <div className="text-slate-400 pt-1">// Target Databricks Vector Bind:</div>
                        <div className="text-emerald-400">SET t.RowVersion = unhex(s.RowVersion_hex)</div>
                      </div>
                      <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px]">
                        Throughput: 4.2M rows/sec • Memory Safe JIT DirectStream
                      </div>
                    </div>
                  )}

                  {activeTabId === 'ai-repair' && (
                    <div className="space-y-2.5">
                      <div className="p-2.5 rounded bg-slate-900 border border-white/10 space-y-1 text-[11px]">
                        <div className="text-slate-400">Step 1: Deterministic Transpiler</div>
                        <div className="text-cyan-300 font-bold">ISNULL() ➔ COALESCE() [Verified]</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-white/10 space-y-1 text-[11px]">
                        <div className="text-slate-400">Step 2: Bounded AI Studio</div>
                        <div className="text-emerald-300 font-bold">Cursor rewrite ➔ SUM() OVER() [Ollama qwen2.5]</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-900 border border-white/10 space-y-1 text-[11px]">
                        <div className="text-slate-400">Step 3: Cluster Preflight</div>
                        <div className="text-cyan-300 font-bold">Databricks SQL Warehouse ➔ 100% Passed</div>
                      </div>
                    </div>
                  )}

                  {activeTabId === 'governance' && (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                        <div className="p-2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">DEV ✓</div>
                        <div className="p-2 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">TEST ✓</div>
                        <div className="p-2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">UAT ●</div>
                        <div className="p-2 rounded bg-slate-900 border border-white/10 text-slate-500 font-bold">PROD</div>
                      </div>
                      <div className="p-3 rounded bg-black/40 border border-white/5 text-[11px] text-slate-300 space-y-1">
                        <div>Dual-run checksum reconciliation: <strong className="text-emerald-400">100% Match</strong></div>
                        <div>Row variance: <strong className="text-emerald-400">0 records delta</strong></div>
                        <div>Promotion Gate Status: <strong className="text-cyan-300">Ready for Sign-Off</strong></div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
