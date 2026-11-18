import React from 'react';
import {
  Sparkles,
  Database,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  Server
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const PostgresZigzagFeatures: React.FC = () => {
  return (
    <section id="deep-dive" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden">
      {/* Subtle background radial pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 lg:space-y-36">
        
        {/* Section Master Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-pretty">
            Engineered layer by layer for deterministic conversion and zero data loss.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of the Database Migration Platform is purpose-built to eliminate syntax errors, logic drifts, and manual refactoring bottlenecks between legacy relational databases and Microsoft SQL Server.
          </p>
        </div>

        {/* ── ROW 1: Layer 01 - Deterministic Rule-Based Translation Core (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 · DETERMINISTIC RULE-BASED TRANSLATION CORE</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Grounded across standard SQL grammar with zero code drift.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Run DDL and schema definitions through hundreds of hardened dialect mapping rules. Every type definition, constraint, sequence, and system function is strictly mapped to optimal T-SQL equivalents without unpredictable synthetic rewrites.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Complete data type mapping (SERIAL/AUTO_INCREMENT ➔ IDENTITY, VARCHAR2 ➔ NVARCHAR, TIMESTAMPTZ ➔ DATETIMEOFFSET, JSONB ➔ NVARCHAR(MAX))
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  System function normalization (NOW()/SYSDATE ➔ GETDATE(), NVL()/IFNULL() ➔ ISNULL(), TO_CHAR() ➔ FORMAT()/CONVERT())
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automated constraint dependency resolution preserving foreign key hierarchies and custom index options
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                600+ Validated Rules
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Dialect Integrity Audited
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Strict T-SQL Compliant
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Active Knowledge Ingestion Mesh
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                RULES ONLINE
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">PostgreSQL Rule Catalog</span>
                <span className="text-emerald-400 font-bold text-xs">240+ Deterministic AST Rules</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">MySQL 8.0 Grammar Library</span>
                <span className="text-cyan-400 font-bold text-xs">180+ Dialect Mappers</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Oracle PL/SQL Pattern Dictionary</span>
                <span className="text-cyan-400 font-bold text-xs">210+ Procedural Handlers</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">T-SQL Standard Targets</span>
                <span className="text-sky-400 font-bold text-xs">SQL Server 2016–2022 & Azure SQL</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Target Status: Deterministic validation active. 100% of standard DDL mappings verified against Microsoft official T-SQL specifications.</span>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Layers 02 & 03 - Hybrid Translation Combining Rule Determinism with Generative AI (Visual Left, Text Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-blue" />

          {/* Visual Left (6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Unified Model Topology & Refactoring Pipeline
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% GATED
              </span>
            </div>

            {/* Topology Flowchart */}
            <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Legacy DDL Dump</span>
                <span className="text-cyan-400 font-bold">───▶</span>
                <span className="text-cyan-300 font-semibold">AST Tokenizer & Classifier</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Deterministic Rules</span>
                <span className="text-cyan-400 font-bold">──▶</span>
                <span className="text-emerald-400 font-semibold">Rule-Based T-SQL Generator</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-amber-400 font-bold">Complex Procedures</span>
                <span className="text-amber-400 font-bold">─▶</span>
                <span className="text-amber-300 font-semibold">Gemini AI Contextual Rewriter</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-cyan-300 font-bold">Monaco Diff Editor</span>
                <span className="text-cyan-400 font-bold">──▶</span>
                <span className="text-white font-semibold">Live Target SQL Server Sandbox</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Status: Zero unverified procedures or invalid syntax permitted into live targets.</span>
            </div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>02 & 03 · HYBRID RULE + AI PROCEDURAL REFACTORING</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Hybrid translation combining rule determinism with generative AI.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Handle stubborn vendor-specific procedural logic, nested cursor loops, dynamic exception handlers, and custom triggers. The engine applies deterministic rules first, delegating complex PL/pgSQL, MySQL Stored Programs, and Oracle PL/SQL blocks to Gemini AI for intelligent T-SQL refactoring.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Multi-tier translation pipeline prioritizing deterministic rule transforms before invoking AI models
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Context-aware PL/SQL & PL/pgSQL procedural refactoring rewriting CURSOR FOR LOOPS, PRAGMA AUTONOMOUS_TRANSACTION, and RAISE EXCEPTION into T-SQL TRY...CATCH & THROW
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Granular human-in-the-loop review with inline Monaco diffing and manual edit overrides before execution
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Deterministic Core
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Hybrid AI Refactoring
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Human-in-the-Loop Diffing
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Layer 04 - Live Execution Engine & Verification Sandbox (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />

          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 · LIVE EXECUTION ENGINE & VERIFICATION SANDBOX</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Pre-flight sandbox execution with live SQL Server validation.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Validate migrated DDL against real database engines before touching production. Connect to local or remote SQL Server instances via ODBC 17 / msnodesqlv8 to perform automated dry-runs, catch runtime syntax collisions, and verify foreign key creation order.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Isolated dry-run execution creating temporary migration sandboxes on local Express or Developer instances
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Comprehensive migration summary reports detailing successful executions, warnings, and syntax errors
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  One-click native database backup generation exporting clean .BAK files ready for production deployment
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                ODBC 17 Driver
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Dry-Run Sandbox
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Native .BAK Output
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                Live SQL Server Sandbox Channel
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                ODBC VERIFIED
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">SANDBOX ENGINE INSTANCE</div>
                <div className="text-cyan-300 font-bold">localhost\SQLEXPRESS (ODBC Driver 17)</div>
                <div className="text-[11px] text-emerald-400">Trusted Connection · Windows Auth (NTLM)</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">DRY-RUN VALIDATION RUN</div>
                <div className="text-white font-bold">148 / 148 Statements Executed Successfully</div>
                <div className="text-[11px] text-slate-400">Zero syntax collisions · Foreign key creation order verified</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">NATIVE BACKUP PIPELINE</div>
                <div className="text-slate-300 font-mono text-[11px]">Database_Migration_Production.BAK created on local filesystem</div>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Production Ready: Zero manual refactoring or schema errors remaining.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
