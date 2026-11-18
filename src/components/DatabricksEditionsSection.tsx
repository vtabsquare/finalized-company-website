import React from 'react';
import {
  Download,
  Terminal,
  Server,
  ShieldCheck,
  Check,
  ExternalLink,
  ArrowRight,
  Database,
  Cloud
} from 'lucide-react';
import { DATABRICKS_EDITIONS_INFO } from '../data/databricksMigrationData';

interface DatabricksEditionsSectionProps {
  onOpenDownload?: () => void;
  onScheduleDemo?: (interestArea?: string) => void;
}

export const DatabricksEditionsSection: React.FC<DatabricksEditionsSectionProps> = ({
  onOpenDownload,
  onScheduleDemo,
}) => {
  const { desktop, services } = DATABRICKS_EDITIONS_INFO;

  return (
    <section id="editions" className="relative py-20 lg:py-28 bg-[#030612] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            DEPLOYMENT ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-pretty">
            Local agent extraction. Governed cloud promotion.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A cohesive two-tier architecture designed for secure on-premise schema extraction and governed multi-environment lakehouse promotion.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Authoring & Extraction Environment (Migration Agent Desktop/CLI) */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#080D1D] to-[#040814] border border-cyan-500/25 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-300">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-cyan-500/15 transition-all" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                  {desktop.badge}
                </span>
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {desktop.name}
                </h3>
                <p className="text-xs font-mono text-cyan-300 font-semibold">
                  {desktop.targetAudience}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {desktop.description}
              </p>

              {/* Status Box */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span>Instance: localhost\SQLEXPRESS</span>
                  <span className="text-emerald-400">Mode: Outbound Polling</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory: 84 MB (Zero external runtime)</span>
                  <span className="text-cyan-300">Port: 443 HTTPS Only</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Offline Mode: Full Schema Extraction &amp; Offline Modeling Capable
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-3 pt-2">
                {desktop.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-300 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="https://github.com/vtabsquare/Databricks-Migration-Agent-Releases/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{desktop.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Collaborative Cloud & Server Control Plane */}
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#080D1D] to-[#040814] border border-emerald-500/25 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-emerald-400/40 transition-all duration-300">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-emerald-500/15 transition-all" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  {services.badge}
                </span>
                <Cloud className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {services.name}
                </h3>
                <p className="text-xs font-mono text-emerald-300 font-semibold">
                  {services.targetAudience}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {services.description}
              </p>

              {/* Status Box */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-slate-300 space-y-1.5">
                <div className="flex justify-between">
                  <span>Target: https://adb-enterprise.azuredatabricks.net</span>
                  <span className="text-emerald-400">Metastore: Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Sync: Incremental (Every 15 min)</span>
                  <span className="text-cyan-300">Audit: Immutable Log</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Promotion Gate: 4-Stage Governed (DEV → TEST → UAT → PROD) • Status: DEV Passed
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-3 pt-2">
                {services.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('interactive-sandbox');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide uppercase bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
              >
                <span>{services.actionLabel}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
