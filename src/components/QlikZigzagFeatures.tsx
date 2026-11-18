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
  Terminal
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const QlikZigzagFeatures: React.FC = () => {
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
            Engineered layer by layer for deterministic conversion and semantic integrity.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of the VTAB Qlik to Power BI Migration Suite is purpose-built to eliminate manual recoding, resolve multi-level variable dependencies, and enforce high-performance Power BI best practices.
          </p>
        </div>

        {/* ── ROW 1: Layer 01 - Automated Qlik Script & Variable Extraction (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-mono font-semibold text-cyan-300">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 · SCRIPT DECOMPILATION & VARIABLE RESOLUTION</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Multi-tab Qlik parsing with recursive variable expansion.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Parse enterprise Qlik script files, unraveling include files, sub-routines, mapping load buffers, and dollar-sign variable expressions. Eliminate circular references and synthetic keys before building downstream Power Query logic.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Recursive evaluation of $(=vExpression) dollar-sign expansion strings
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Classification of variables into Model Parameters, Base Measures, or DAX Variables
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Full dependency graph preventing circular variable definitions and orphan parameters
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Recursive Variable Unrolling
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Dollar-Sign Expansion
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Zero Circular Loops
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                Active Script Parsing Mesh
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                PARSER ONLINE
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Qlik Script Payload Ingestion</span>
                <span className="text-emerald-400 font-bold text-xs">14 Script Tabs Tokenized</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Variable Expansion Engine</span>
                <span className="text-cyan-400 font-bold text-xs">142 Variables Resolved</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Mapping Load Buffer State</span>
                <span className="text-cyan-400 font-bold text-xs">8 Resident Tables Handled</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Associative Graph De-coupling</span>
                <span className="text-sky-400 font-bold text-xs">Zero Synthetic Keys</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Target Status: Complete script parity. Zero synthetic keys or unmapped script statements.</span>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Layers 02 & 03 - Set Analysis Translation with Variable Expansion (Visual Left, Text Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-blue" />

          {/* Visual Left (6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                Unified Model Topology & DAX Translation Gate
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% VERIFIED
              </span>
            </div>

            {/* Topology Flowchart */}
            <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Qlik Expression + Variables</span>
                <span className="text-cyan-400 font-bold">───▶</span>
                <span className="text-cyan-300 font-semibold">Variable Resolution Engine</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Target Schema Context</span>
                <span className="text-cyan-400 font-bold">────────▶</span>
                <span className="text-emerald-400 font-semibold">Gemini DAX Translator</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-cyan-300 font-bold">Semantic Verification</span>
                <span className="text-cyan-400 font-bold">────────▶</span>
                <span className="text-white font-semibold">Production .dax Export</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Status: No synthetic measure names or untyped measures permitted.</span>
            </div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>02 & 03 · SET ANALYSIS TRANSLATION</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Set Analysis translation with variable expansion.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Convert complex Qlik aggregation syntax into clean, maintainable DAX. Automatically resolve multi-level nested variable definitions and reconstruct Set Analysis filter modifiers into standard DAX CALCULATE statements.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Translation of {'{<Field = {\'Value\'}>}'} set modifiers into explicit table-filtered boolean predicates
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automatic detection of distinct counters (Count(distinct ...) → DISTINCTCOUNT())
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Dual execution modes: Instant local syntax transpiler or deep Gemini reasoning for obscure syntax
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Deterministic Translation
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Variable Expansion
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Semantic Context Aware
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Layer 04 - Native Power Query M Emitter (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />

          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 · NATIVE POWER QUERY M EMITTER</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              High-fidelity M code generation from Qlik ETL dependency trees.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Eliminate manual script rewriting and guesswork. The M emitter analyzes surviving data branches, maps connector definitions, buffers mapping tables for fast lookup, and builds typed, executable Power Query blocks ready for Power BI Desktop or Fabric Dataflows.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Step-by-step lineage tracking from raw file/database connection to final model
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Deterministic step naming (Added_, Renamed_, Merged_, Typed_) matching Microsoft standards
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Automated calendar dimension synthesis when date temporal attributes are detected
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Native Power Query M
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Step-by-Step Lineage
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Fabric Dataflow Ready
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                M Script Emitter Pipeline
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                M SYNTHESIZER READY
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">GENERATED CODE STREAM</div>
                <div className="text-cyan-300 font-bold">power-query.m ➔ Sales_Fact</div>
                <div className="text-[11px] text-emerald-400">#"Added_Custom" = Table.AddColumn(#"Typed_Prev", ...)</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">CALENDAR SYNTHESIS</div>
                <div className="text-white font-bold">Dim_Date (Fiscal Years, Quarters, Rolling-12)</div>
                <div className="text-[11px] text-slate-400">Generated dynamically from Min/Max Sales dates</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">BUFFER OPTIMIZATION</div>
                <div className="text-slate-300 font-mono text-[11px]">Table.Buffer applied to 3 mapping tables to eliminate query folding stalls</div>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fabric Compatibility: Generated scripts strictly validated for Fabric Dataflow Gen2 execution.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
