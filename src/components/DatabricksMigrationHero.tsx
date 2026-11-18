import React from 'react';
import {
  Play,
  Sparkles,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface DatabricksMigrationHeroProps {
  onScheduleDemo: (interestArea?: string) => void;
  onOpenDownload?: () => void;
  onWatchDemo?: () => void;
  isLightMode?: boolean;
}

export const DatabricksMigrationHero: React.FC<DatabricksMigrationHeroProps> = ({
  onScheduleDemo,
  onWatchDemo,
  isLightMode = false,
}) => {
  return (
    <section className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden border-b border-white/10 bg-[#030917]">
      {/* Background Volumetric Lighting Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-emerald-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-32 right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Eyebrow & Badges */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>24/7 Enterprise Migration Control Plane • Remediation 1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Transform legacy enterprise databases into clear, governed{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400">
              Databricks Lakehouses
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white font-semibold">Databricks Migration AI Studio</strong> is an enterprise-grade, metadata-first, prompt-native modernization platform for cataloging legacy relational databases, inferring multi-tier Medallion semantic architectures, repairing complex procedural SQL routines, generating idempotent SCD Type 2 Delta pipelines, and governing multi-environment promotion.
          </p>

          {/* Key Value Proposition Callout */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 max-w-2xl mx-auto">
            <span className="font-semibold text-white">Key Value Proposition:</span> Connect data, discover it, model it, synthesize Medallion Delta pipelines, and promote it across <code className="text-cyan-300 font-mono">DEV → TEST → UAT → PROD</code> with zero cloud credential exposure.
          </div>

          {/* Call-to-Action (CTA) Cluster (Removed Download EXE button) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={onWatchDemo}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Launch Interactive Sandbox</span>
            </button>

            <button
              type="button"
              onClick={() => onScheduleDemo('Databricks Migration AI Studio')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/15 hover:border-emerald-400/50 shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Schedule Architecture Demo ↗</span>
            </button>
          </div>

          {/* Feature Highlight Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3 text-[11px] font-mono text-slate-400">
            {['Multi-Source Federation', 'Medallion Lakehouse Engine', 'Deterministic AST Repair', 'Governed 4-Stage Promotion'].map((badge, idx) => (
              <span key={idx} className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300">
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
