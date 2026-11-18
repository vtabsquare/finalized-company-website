import React from 'react';
import {
  Monitor,
  Share2,
  Check,
  ArrowRight,
  Shield,
  Sparkles,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { MARKETING_EDITIONS_INFO } from '../data/marketingAgentData';

interface MarketingEditionsSectionProps {
  onScheduleDemo: (interestArea?: string) => void;
}

export const MarketingEditionsSection: React.FC<MarketingEditionsSectionProps> = ({
  onScheduleDemo,
}) => {
  const desktop = MARKETING_EDITIONS_INFO.desktop;
  const services = MARKETING_EDITIONS_INFO.services;

  return (
    <section id="deployment-ecosystem" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#060810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono">
            DEPLOYMENT ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-pretty">
            Local authoring. Cloud multi-channel distribution.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            A cohesive two-tier architecture designed for deep lead qualification and campaign drafting locally, paired with instant automated social publishing across the cloud.
          </p>
        </div>

        {/* Dual Panel Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Panel 1: Left Column: Authoring Environment */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Header & Category Badge */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 font-mono">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>{desktop.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {desktop.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {desktop.description}
                </p>
                <div className="text-xs text-slate-500 font-medium">
                  {desktop.targetAudience}
                </div>
              </div>

              {/* Console Box (Local Workstation Execution) */}
              <div className="rounded-xl border border-slate-800/90 bg-[#060913] p-3 text-xs space-y-2.5 font-mono shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="text-slate-300 ml-1">Local Workstation Execution</span>
                  </div>
                  <span className="text-cyan-400">Gemini 2.5 Pro + FLUX</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  {desktop.consoleLines.map((line, idx) => (
                    <div key={idx} className="flex justify-between text-slate-400">
                      <span>{line.label}</span>
                      <span className={line.highlight ? 'text-emerald-400 font-bold' : 'text-white'}>
                        {line.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights bullet list */}
              <div className="space-y-2 pt-2">
                {desktop.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <button
                type="button"
                onClick={() => onScheduleDemo('VTAB Marketing Studio Workspace')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>{desktop.actionLabel}</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Right Column: Collaborative Cloud & Server */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Header & Category Badge */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-400 font-mono">
                  <Share2 className="w-4 h-4 text-purple-400" />
                  <span>{services.badge}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {services.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {services.description}
                </p>
                <div className="text-xs text-slate-500 font-medium">
                  {services.targetAudience}
                </div>
              </div>

              {/* Console Box (Cloud Services Endpoint) */}
              <div className="rounded-xl border border-slate-800/90 bg-[#060913] p-3 text-xs space-y-2.5 font-mono shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="text-slate-300 ml-1">Cloud Services Endpoint</span>
                  </div>
                  <span className="text-purple-400">SOC-2 Type II</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  {services.consoleLines.map((line, idx) => (
                    <div key={idx} className="flex justify-between text-slate-400">
                      <span>{line.label}</span>
                      <span className={line.highlight ? 'text-purple-300 font-bold' : 'text-white'}>
                        {line.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights bullet list */}
              <div className="space-y-2 pt-2">
                {services.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <button
                type="button"
                onClick={() => onScheduleDemo('VTAB Omni-Channel Publishing Services')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:brightness-110 shadow-lg shadow-purple-900/30 transition-all cursor-pointer active:scale-95"
              >
                <span>{services.actionLabel}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
