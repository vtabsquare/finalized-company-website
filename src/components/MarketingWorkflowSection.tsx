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
import { MARKETING_WORKFLOW_STEPS } from '../data/marketingAgentData';

const iconMap = {
  Radio,
  Bot,
  ShieldCheck,
  Share2
};

export const MarketingWorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = MARKETING_WORKFLOW_STEPS[activeStepIndex];

  return (
    <section id="pipeline-workflow" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#070A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            END-TO-END PIPELINE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-pretty">
            Engineered for the complete revenue journey.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            From raw multi-channel buyer intent discovery to high-speed multi-agent campaign synthesis and automated compliance publishing, every step is optimized for instant lead conversion.
          </p>
        </div>

        {/* 4-Step Interactive Pipeline Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {MARKETING_WORKFLOW_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Radio;
            const isActive = activeStepIndex === idx;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/40 text-white'
                    : 'bg-[#0A0E1A]/60 border-slate-800/80 hover:border-slate-700/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div 
                    layoutId="marketing-workflow-active-indicator"
                    className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-t-xl"
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/15 text-cyan-300' : 'bg-slate-800/50 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">STAGE {step.step}</span>
                </div>

                <div className="text-sm font-semibold text-white mb-1">
                  {step.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-1">
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Stage Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Stage Specs & Bullets */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono">
                  <span>STAGE {activeStep.step} OF 04</span>
                  <span className="text-slate-600">·</span>
                  <span>{activeStep.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeStep.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="space-y-3 pt-2">
                  {activeStep.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Badges */}
                {activeStep.bottomBadges && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    {activeStep.bottomBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md text-[11px] font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/60"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Console / Pipeline Flow State Box */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-cyan-500/30 bg-[#040814] shadow-2xl overflow-hidden font-mono text-xs">
                  
                  {/* Console Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#060D1F] border-b border-white/10 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-slate-300 ml-1.5 font-semibold">Active Node:</span>
                    </div>
                    <span className="text-cyan-400 font-bold">Federated Signal Harvesters</span>
                  </div>

                  {/* Console Lines */}
                  <div className="p-5 space-y-3 bg-[#02050E]">
                    {activeStep.terminalLines.map((line, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                        <span className="text-slate-300">{line.label}:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 hidden sm:inline">{line.mode}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                            {line.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Console Bottom Summary */}
                  <div className="px-4 py-3 bg-[#060D1F] border-t border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{activeStep.terminalSummary}</span>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
