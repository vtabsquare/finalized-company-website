import React from 'react';
import {
  Sparkles,
  Database,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  FileSpreadsheet,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  Box
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const HomeScapeZigzagFeatures: React.FC = () => {
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
            Engineered layer by layer for unmatched rendering speed and pricing accuracy.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of the HomeScape360 Home Application is purpose-built to eliminate friction between homebuyer imagination, instant cost transparency, and sales conversion.
          </p>
        </div>

        {/* ── ROW 1: Layer 01 - Real-Time Dynamic BoQ & Cost Computation Mesh (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-mono font-semibold text-cyan-300">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>01 · REAL-TIME DYNAMIC BOQ & COST COMPUTATION MESH</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Deterministic pricing calculation with zero estimation drift.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every bedroom, bathroom, kitchen tier, and modular add-on selected by the homebuyer triggers an instant recalculation across the pricing matrix. Material grades, regional tariffs, and structural options are evaluated deterministically with complete auditability.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Granular parameter-level pricing engine tracking modules, upgrades, and finishes in real time
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Transparent cost breakdown mapping directly to room dimensions, fixtures, and add-ons
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Instant state propagation across Zustand stores without unnecessary DOM re-renders
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Deterministic Pricing
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Sub-10ms Calculation
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Audit-Ready Breakdown
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                Active Configuration & Pricing Mesh
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                SYNCHRONIZED
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Base Structure & Framing</span>
                <span className="text-emerald-400 font-bold text-xs">Calculated (Verified Unit Base)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Custom Bed & Bath Modules</span>
                <span className="text-cyan-400 font-bold text-xs">Calculated (Reactive Pricing Applied)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Premium Kitchen & Finish Add-ons</span>
                <span className="text-cyan-400 font-bold text-xs">Calculated (Dynamic Matrix Linked)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Live Estimate Total</span>
                <span className="text-sky-400 font-bold text-xs">Reactive Sync Active</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Target Status: 100% deterministic pricing. Zero discrepancies between customer configuration and CRM quote records.</span>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Layers 02 & 03 - Hardened Submission Gateway (Visual Left, Text Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-blue" />

          {/* Visual Left (6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Unified Security & Ingestion Topology
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% PROTECTED
              </span>
            </div>

            {/* Topology Flowchart */}
            <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Customer Configuration</span>
                <span className="text-cyan-400 font-bold">───▶</span>
                <span className="text-cyan-300 font-semibold">reCAPTCHA v3 Assessment</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-slate-300">Validated Payload</span>
                <span className="text-cyan-400 font-bold">─────────▶</span>
                <span className="text-emerald-400 font-semibold">Supabase PostgreSQL Store (RLS)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-cyan-300 font-bold">Lead Routing Engine</span>
                <span className="text-cyan-400 font-bold">───────▶</span>
                <span className="text-white font-semibold">Admin Lead Console & Alerting</span>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Status: 100% of untrusted payloads rejected before database persistence.</span>
            </div>
          </div>

          {/* Text Right (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-mono font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>02 & 03 · HARDENED SUBMISSION GATEWAY</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Hardened submission gateway with zero-trust lead qualification.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Protect your sales pipeline from automated spam, fraudulent submissions, and malicious payloads. Every inquiry passes through silent behavioral bot scoring, strict Zod schema validation, and database-level Row Level Security (RLS).
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Frictionless Google reCAPTCHA v3 behavioral verification eliminating bot spam without disruptive user challenges
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Strict Zod schema enforcement across client forms and server edge functions
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  PostgreSQL Row Level Security (RLS) policies ensuring complete data isolation and customer privacy
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                reCAPTCHA v3
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Zod Validated
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                Row Level Security (RLS)
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Layer 04 - Secure Enterprise Reporting & CRM Integration (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />

          {/* Text Left (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono font-semibold text-cyan-300">
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 · SECURE ENTERPRISE REPORTING & CRM INTEGRATION</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Memory-safe Excel generation and high-efficiency lead management.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Equip sales directors and project managers with an intuitive admin dashboard. Perform bulk lead qualification, trigger personalized outreach sequences, and export audit-ready spreadsheets powered by an enterprise-grade ExcelJS engine with zero prototype pollution vulnerabilities.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Secure in-memory workbook serialization with automated column auto-sizing and timestamped outputs
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Instant lead search, multi-criteria filtering, and one-click bulk email distribution
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">
                  Real-time synchronization with Supabase backend for instant status tracking and conversion metrics
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="pt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                ExcelJS Engine
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/30">
                In-Memory XLSX
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-emerald-300 border border-emerald-500/30">
                Zero Prototype Pollution
              </span>
            </div>
          </div>

          {/* Visual Right (6 cols) */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                Lead Data Pipeline & Export Monitor
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                PIPELINE READY
              </span>
            </div>

            <div className="p-6 space-y-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">LEAD DOSSIER SERIALIZATION</div>
                <div className="text-cyan-300 font-bold">HomeScape360_Quote_3891.xlsx</div>
                <div className="text-[11px] text-emerald-400">3D Snapshot + 2D Floorplan JSON + Line-Item BoQ</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">SUPABASE CRM STATUS</div>
                <div className="text-white font-bold">Lead #3891 ➔ Stage: Qualified / High Intent</div>
                <div className="text-[11px] text-slate-400">Customer budget verified within parameter limits</div>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase">SECURITY INTEGRITY AUDIT</div>
                <div className="text-slate-300 font-mono text-[11px]">Prototype-pollution-free workbook stream verified</div>
              </div>
            </div>

            <div className="p-4 bg-black/80 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Data Protection: Enterprise lead exports sanitized against CSV/XLSX injection.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
