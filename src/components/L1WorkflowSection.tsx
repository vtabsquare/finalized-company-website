import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radio,
  Bot,
  ShieldCheck,
  Share2,
  Check,
  ArrowRight,
  Zap,
  Sparkles,
  Terminal
} from 'lucide-react';
import { L1_WORKFLOW_STEPS } from '../data/l1AutomationAgentData';

const iconMap = {
  Radio,
  Bot,
  ShieldCheck,
  Share2
};

export const L1WorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = L1_WORKFLOW_STEPS[activeStepIndex];

  return (
    <section id="pipeline-workflow" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#070A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono">
            END-TO-END PIPELINE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-pretty">
            Engineered for autonomous zero-touch IT ticket resolution.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            From real-time ITSM webhook ingestion and few-shot intent classification to deterministic policy verification and automated identity remediation, every step resolves Tier-1 IT tickets in seconds.
          </p>
        </div>

        {/* 4 Tabs Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {L1_WORKFLOW_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Radio;
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden group ${
                  isActive
                    ? 'bg-slate-900/90 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Active Indicator Top Laser */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400 group-hover:text-cyan-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    STAGE {step.step}
                  </span>
                </div>

                <div className="text-sm sm:text-base font-bold text-white mb-1">
                  {step.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-1">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Detailed View (2-Column Grid) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          >
            {/* Left Box: Stage Specs & Bullets (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-mono font-semibold text-cyan-300">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>STAGE {activeStep.step} OF 04 · {activeStep.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeStep.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  {activeStep.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Badges */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                {activeStep.bottomBadges.map((badge, bdIdx) => (
                  <span
                    key={bdIdx}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-950 text-cyan-300 border border-cyan-500/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Box: Pipeline Flow State / Live Terminal (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden flex flex-col justify-between">
              {/* Terminal Titlebar */}
              <div className="px-5 py-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    {activeStep.terminalTitle}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  MONITOR ACTIVE
                </span>
              </div>

              {/* Terminal Output Lines */}
              <div className="p-6 font-mono text-xs sm:text-sm space-y-3 flex-1 flex flex-col justify-center">
                {activeStep.terminalLines.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-950/80 border border-white/5 gap-2"
                  >
                    <div className="flex items-center gap-2.5 text-slate-200">
                      <span className="text-cyan-400 font-bold">›</span>
                      <span>{line.label}:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{line.mode}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                        line.status === 'LIVE' || line.status === 'ACTIVE' || line.status === 'ENFORCED' || line.status === 'EXECUTED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : line.status === 'PASS' || line.status === 'SYNCED' || line.status === 'COMMITTED'
                          ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}>
                        {line.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Bottom Summary */}
              <div className="p-4 bg-slate-950/90 border-t border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{activeStep.terminalSummary}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
