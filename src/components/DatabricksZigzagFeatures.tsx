import React from 'react';
import {
  Check,
  ShieldCheck,
  Layers,
  Database,
  Terminal,
  Cpu,
  RefreshCw,
  GitBranch,
  Lock,
  ArrowRight
} from 'lucide-react';

export const DatabricksZigzagFeatures: React.FC = () => {
  return (
    <div className="relative py-20 lg:py-28 bg-[#040817] border-t border-slate-800/80 space-y-24 lg:space-y-36">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* ── LAYER 01: Universal Multi-Source Connectivity ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              <span>01 • UNIVERSAL MULTI-SOURCE DATA CONNECTIVITY</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Extract and ingest across enterprise clouds with zero credential exposure.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect to heterogeneous relational databases through a decoupled adapter boundary. Source schemas and data are securely streamed to Databricks Unity Catalog Delta tables with zero local staging files and zero ingress firewall rules.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Direct Delta Lake streaming</strong> with automatic Bronze ingestion metadata (<code className="text-cyan-300">_ingest_timestamp</code>, <code className="text-cyan-300">_source_checksum</code>, <code className="text-cyan-300">_is_deleted</code>).</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Outbound agent architecture</strong> using Windows Trusted Connection or native SQL/LDAP credential delegation.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Continuous SHA-256 schema snapshot hashing</strong> with automatic backward-compatible drift detection.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300">4 Database Engines</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-300">Zero Inbound Ports</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">TLS 1.3 Strict</span>
            </div>
          </div>

          {/* Right Card / Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#030919] p-6 shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white">Active Lakehouse Ingestion Mesh</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  DirectStream Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>SQL Server Enterprise</span>
                    <span className="text-emerald-400">8ms</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">Agent Stream</div>
                  <div className="text-cyan-300 font-bold">Rows: 14.8M</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>PostgreSQL DW</span>
                    <span className="text-emerald-400">4ms</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">Direct Ingest</div>
                  <div className="text-cyan-300 font-bold">Rows: 6.2M</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-white/5 space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>Oracle 19c RAC</span>
                    <span className="text-emerald-400">12ms</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">Thin Stream</div>
                  <div className="text-cyan-300 font-bold">Rows: 22.4M</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1 bg-cyan-950/20">
                  <div className="flex justify-between font-bold text-cyan-300">
                    <span>Databricks Unity Catalog</span>
                    <span className="text-emerald-400">2ms</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">Target Delta Ingest</div>
                  <div className="text-emerald-400 font-bold">Total Ingested: 43.4M</div>
                </div>
              </div>

              <div className="p-3.5 rounded bg-black/50 border border-white/10 space-y-2 text-[10px] text-slate-300">
                <div className="text-cyan-300 font-bold">// Target: Databricks Unity Catalog (prod_catalog.finance_bronze)</div>
                <div className="text-slate-400">COPY INTO prod_catalog.finance_bronze.dim_customer</div>
                <div className="text-slate-400">FROM (SELECT *, current_timestamp() AS _ingest_ts, sha2(concat_ws(&apos;||&apos;, *), 256) AS _row_hash)</div>
                <div className="text-emerald-400">FILEFORMAT = PARQUET; -- STREAMING INGESTION PUSHED DOWN DIRECTLY</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── LAYER 02: Deterministic AST & AI Repair Studio (Reversed) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Card / Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#030919] p-6 shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">Interactive Migration Recipe Pipeline</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  4 Steps Applied
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>01 Discovered Source Routine</span>
                    <span className="text-slate-500">T-SQL</span>
                  </div>
                  <div className="text-white font-bold">dbo.usp_CalculateCommission (Stored Procedure)</div>
                </div>

                <div className="p-3 rounded bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-cyan-400 text-[10px]">
                    <span>02 Deterministic AST Conversion</span>
                    <span className="text-emerald-400">Deterministic</span>
                  </div>
                  <div className="text-slate-200">ISNULL ➔ COALESCE, GETDATE() ➔ CURRENT_TIMESTAMP</div>
                </div>

                <div className="p-3 rounded bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-emerald-400 text-[10px]">
                    <span>03 AI Semantic Remediation</span>
                    <span className="text-emerald-400">Ollama qwen2.5</span>
                  </div>
                  <div className="text-slate-200">Cursor loop resolved to vectorized window SUM() OVER()</div>
                </div>

                <div className="p-3 rounded bg-slate-900/80 border border-white/5 space-y-1">
                  <div className="flex justify-between text-cyan-400 text-[10px]">
                    <span>04 Databricks Preflight Check</span>
                    <span className="text-cyan-400">Runtime Passed</span>
                  </div>
                  <div className="text-slate-200">Verified syntax against target cluster SQL Warehouse</div>
                </div>
              </div>

              <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-emerald-300 font-bold">
                <span>Artifact Quality: VALIDATED EXECUTABLE</span>
                <span>100% Valid • 0 Errors</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              <span>02 • DETERMINISTIC AST & AI REPAIR STUDIO</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Reversible AST transformation canvas with live schema profiling.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transpile legacy T-SQL, PL/SQL, and procedural routines into native Databricks Spark SQL. The deterministic conversion engine executes first, reserving local Ollama (<code className="text-cyan-300">qwen2.5-coder</code>) or Gemini for ambiguous semantic constructs under strict human governance.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Instant step rollback</strong> with visual artifact diffing, version tagging, and immutable audit trail.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Automated deterministic conversion</strong> for scalar functions, date math, and control-flow branching.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Bounded AI repair loop</strong> (max 3 attempts) with static SQL preflight validation prior to review.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300">Deterministic First</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-300">Static Preflight</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">Ollama / Gemini AI</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── LAYER 03: Unified Medallion Lakehouse Modelling ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              <span>03 • UNIFIED MEDALLION LAKEHOUSE MODELLING</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Enterprise Bronze, Silver SCD2, and Gold dimensional schemas.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Design multi-layer Medallion architectures with automated relationship inference. Generate Bronze append-only audit tables, idempotent Silver SCD Type 2 MERGE pipelines with surrogate key management, and curated Gold dimensional star schemas.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Multi-stage Medallion graph:</strong> Source ➔ Bronze Raw ➔ Silver SCD2 (Active/Expiry) ➔ Gold Facts/Dims.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Automated fact/dimension inference</strong> based on PK/FK cardinality, indexing, and temporal attributes.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Granular Row-Level Security (RLS)</strong> and Column Masking rules propagated directly to Unity Catalog.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300">Medallion Architecture</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-300">SCD Type 2 MERGE</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">Unity Catalog RLS</span>
            </div>
          </div>

          {/* Right Card / Mockup */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#030919] p-6 shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">Unified Medallion Model Topology</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  3 Tiers Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                  <div className="text-amber-300 font-bold">Bronze Raw Lake</div>
                  <div className="text-[10px] text-slate-300 space-y-1">
                    <div>raw_sales_order</div>
                    <div>• _ingest_timestamp</div>
                    <div>• _source_hash</div>
                    <div>• _is_deleted</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                  <div className="text-cyan-300 font-bold">Silver Curated SCD2</div>
                  <div className="text-[10px] text-slate-300 space-y-1">
                    <div>silver_sales_order</div>
                    <div>• pk_surrogate_key</div>
                    <div>• is_current_flag</div>
                    <div>• valid_to_dts</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-yellow-950/20 border border-yellow-500/30 space-y-2">
                  <div className="text-yellow-300 font-bold">Gold Analytics Star</div>
                  <div className="text-[10px] text-slate-300 space-y-1">
                    <div>fact_sales_analysis</div>
                    <div>├── dim_customer</div>
                    <div>├── dim_date</div>
                    <div>└── dim_product</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-black/40 border border-white/5 text-[11px] text-slate-300 text-center">
                Topology verification: No circular filter pathways • Surrogate keys guaranteed unique
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── LAYER 04: Vector Transport Engine (Reversed) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Card / Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#030919] p-6 shadow-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white">Transport JIT Compiler & Telemetry</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Execution Plan: Hex Passthrough
                </span>
              </div>

              <div className="p-3.5 rounded bg-black/50 border border-white/10 space-y-2 text-[10px] text-slate-300">
                <div className="text-slate-400">// Source Query Extraction:</div>
                <div className="text-cyan-300">SELECT CustomerID, AccountNum, sys.fn_varbintohexstr(RowVersion) AS RowVersion_hex FROM SalesLT.Customer;</div>
                <div className="text-slate-400 pt-1">// Target Databricks Vector Bind:</div>
                <div className="text-emerald-400">MERGE INTO prod.silver.customer AS t USING (s) ON t.CustomerID = s.CustomerID WHEN MATCHED THEN UPDATE SET t.RowVersion = unhex(s.RowVersion_hex);</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                <div className="p-2.5 rounded bg-slate-900 border border-white/5">
                  <div className="text-slate-400 text-[10px]">Batch Latency</div>
                  <div className="text-cyan-300 font-bold">1.8ms</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-white/5">
                  <div className="text-slate-400 text-[10px]">Rows Ingested</div>
                  <div className="text-emerald-300 font-bold">500,000</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-white/5">
                  <div className="text-slate-400 text-[10px]">Throughput</div>
                  <div className="text-cyan-300 font-bold">4.2M r/s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
              <span>04 • DETERMINISTIC COMPATIBILITY & TRANSPORT ENGINE</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Hex-normalized binary streaming compiling to machine code.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Eliminate data corruption and connector inference bugs without the overhead of fragile Python type casting. The transport engine binds SQL Server binary families, timestamps, and rowversions directly to Databricks using hex normalization and vectorized <code className="text-cyan-300">unhex(?)</code>.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Zero-loss transport</strong> for <code className="text-cyan-300">binary</code>, <code className="text-cyan-300">varbinary</code>, <code className="text-cyan-300">image</code>, and <code className="text-cyan-300">rowversion</code> avoiding <code className="text-rose-400">ARRAY&lt;VOID&gt;</code> errors.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Sub-millisecond query evaluation</strong> on multi-million row in-memory extraction batches.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span><strong>Over 60 native data type conversion profiles</strong> covering SQL Server, Oracle, and Postgres to Databricks.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300">Hex Transport unhex(?)</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-300">Zero ARRAY&lt;VOID&gt;</span>
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">Memory Safe</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
