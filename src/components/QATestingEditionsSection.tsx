import React from 'react';
import { Shield, ArrowRight, Server, Terminal, Sparkles, Monitor, Cloud, Check } from 'lucide-react';
import { qaTestingDeploymentEditions } from '../data/qaTestingData';

interface QATestingEditionsSectionProps {
  onScheduleDemo?: () => void;
}

export const QATestingEditionsSection: React.FC<QATestingEditionsSectionProps> = ({
  onScheduleDemo
}) => {
  return (
    <section id="deployment-ecosystem" className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800/80 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/20 text-indigo-400 text-xs font-mono mb-4">
            <Server className="w-3.5 h-3.5" />
            <span>DEPLOYMENT ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Local isolated execution. Cloud workspace collaboration.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            A cohesive two-tier architecture delivering lightning-fast, zero-cloud-latency test runs on local machines, backed by enterprise cloud synchronization and team asset governance.
          </p>
        </div>

        {/* 2 Deployment Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {qaTestingDeploymentEditions.map((edition, idx) => {
            const isCloud = idx === 1;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all flex flex-col justify-between p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden ${
                  isCloud
                    ? 'border-indigo-500/40 bg-gradient-to-b from-[#0E1526] to-[#080C17] shadow-xl shadow-indigo-500/5'
                    : 'border-slate-800 bg-[#0A0E1A]/80 hover:border-slate-700'
                }`}
              >
                {isCloud && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-300" />
                )}

                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                      {edition.cardTag}
                    </span>
                    {edition.badge && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-indigo-950/60 border border-indigo-800/60 text-indigo-300">
                        {edition.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white font-sans">
                      {edition.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed mt-2">
                      {edition.subtitle}
                    </p>
                  </div>

                  {/* Console Box */}
                  <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/80 space-y-2.5 font-mono text-xs">
                    <div className="text-slate-400 font-semibold pb-1.5 border-b border-slate-800/60 flex items-center justify-between">
                      <span>{edition.consoleTitle}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    {edition.consoleItems.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-start justify-between gap-2">
                        <span className="text-slate-400">{item.label}:</span>
                        <span className="text-slate-200 text-right font-medium">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {edition.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-lg border border-slate-800/80 bg-slate-900/40"
                      >
                        <div className="text-[11px] font-mono text-slate-400">{spec.label}</div>
                        <div className="text-xs sm:text-sm font-semibold font-mono text-indigo-300 mt-0.5">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <div className="space-y-2.5 pt-2">
                    {edition.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-indigo-400" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA (NO .exe download, strictly demo / cloud specs) */}
                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <button
                    onClick={onScheduleDemo}
                    className={`w-full py-3 px-4 rounded-xl font-semibold font-sans text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isCloud
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                        : 'border border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/20 hover:bg-indigo-950/40 text-indigo-300'
                    }`}
                  >
                    <span>{edition.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
