import React, { useState } from 'react';
import { Sparkles, Layers, Activity, CheckCircle2, Receipt, ShieldCheck } from 'lucide-react';
import { invoiceFlowPipelineStages, invoiceFlowHero } from '../data/invoiceFlowData';

export const InvoiceWorkflowSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(invoiceFlowPipelineStages[0].id);

  const activeStage =
    invoiceFlowPipelineStages.find((s) => s.id === activeStageId) ||
    invoiceFlowPipelineStages[0];

  return (
    <section id="pipeline-architecture" className="relative py-20 lg:py-28 bg-[#070A12] border-t border-slate-800/80 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
            <Receipt className="w-3.5 h-3.5" />
            <span>{invoiceFlowHero.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            {invoiceFlowHero.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            {invoiceFlowHero.description}
          </p>
        </div>

        {/* 4 Pipeline Stage Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {invoiceFlowPipelineStages.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'border-cyan-500/80 bg-gradient-to-b from-cyan-950/30 to-slate-900/80 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300" />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-semibold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                    STAGE {stage.stageNumber}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                </div>
                <div className="text-sm font-semibold text-white font-sans">
                  {stage.stageHeadline}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {stage.stageTag.split('·')[1] || stage.stageTag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details Card */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                {activeStage.stageTag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {activeStage.stageHeadline}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1">
                {activeStage.stageDescription}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {activeStage.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="text-sm text-slate-200 font-sans leading-relaxed">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
              {activeStage.bottomBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-800/50 text-cyan-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Live Stream Box */}
          <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-[#0A0E17]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-xl shadow-cyan-500/5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                  ACTIVE NODE: {activeStage.activeNode}
                </span>
              </div>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Stream telemetry list */}
            <div className="space-y-3 font-mono text-xs">
              {activeStage.streamStates.map((st, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/70 flex items-center justify-between"
                >
                  <span className="text-slate-300">{st.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                    {st.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Filter Status */}
            {activeStage.filterStatus && (
              <div className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-300/90 leading-relaxed">
                {activeStage.filterStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
