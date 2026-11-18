import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, GitFork, Cpu, Share2, Check, ShieldCheck, Activity } from 'lucide-react';
import { DATABRICKS_WORKFLOW_STEPS } from '../data/databricksMigrationData';

const iconMap = {
  Database,
  GitFork,
  Cpu,
  Share2,
};

export const DatabricksWorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = DATABRICKS_WORKFLOW_STEPS[activeStepIndex];

  return (
    <section id="workflow" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#070A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            END-TO-END PIPELINE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-pretty">
            Engineered for the complete migration journey.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            From raw on-premise schema extraction to high-speed Delta Lake SCD Type 2 MERGE and governed multi-environment promotion, every stage is optimized for absolute semantic fidelity and zero downtime.
          </p>
        </div>

        {/* 4-Step Interactive Pipeline Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {DATABRICKS_WORKFLOW_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || Database;
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
                    layoutId="databricks-workflow-active-indicator"
                    className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-t-xl"
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/15 text-cyan-300' : 'bg-slate-800/50 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-wider text-slate-500">
                    STAGE {step.step}
                  </span>
                </div>

                <div className="font-bold text-sm text-slate-100 mb-1">{step.title}</div>
                <div className="text-xs text-slate-400 line-clamp-1">{step.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Preview Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-[#0B1020] to-[#070A14] border border-cyan-500/25 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Description & Feature Bullets */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  <span>STAGE {activeStep.step} OF 04</span>
                  <span className="text-cyan-500">•</span>
                  <span>{activeStep.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeStep.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Feature Checklist */}
                <ul className="space-y-3 pt-2">
                  {activeStep.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                      <div className="mt-0.5 p-1 rounded bg-cyan-500/20 text-cyan-300 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Verification Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enterprise Security Certified</span>
                  </div>
                  <div className="text-slate-600">•</div>
                  <div>Zero Inbound Firewall Ports</div>
                  <div className="text-slate-600">•</div>
                  <div>SHA-256 Verified</div>
                </div>
              </div>

              {/* Right Column: Live Pipeline Flow Terminal State */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-white/10 bg-[#040915] p-5 shadow-2xl font-mono text-xs space-y-4">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-white">{activeStep.terminalTitle}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold">
                      ● Active Mode
                    </span>
                  </div>

                  {/* Terminal Content Lines */}
                  <div className="space-y-2">
                    {activeStep.terminalLines.map((line, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-slate-200">
                          <span className="font-semibold">{line.label}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            {line.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{line.mode}</div>
                      </div>
                    ))}
                  </div>

                  {/* Terminal Status Summary */}
                  <div className="p-3 rounded bg-cyan-950/30 border border-cyan-500/30 text-[11px] text-cyan-200 leading-relaxed">
                    {activeStep.terminalSummary}
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
