import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, GitFork, Cpu, Share2, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/reportingProductData';

const iconMap = {
  Database,
  GitFork,
  Cpu,
  Share2,
};

export const WorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <section id="workflow" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#070A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            END-TO-END PIPELINE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-pretty">
            Engineered for the complete data journey.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            From raw multi-cloud federation to high-speed vectorized calculations and publication, 
            every step is optimized for single-digit millisecond response.
          </p>
        </div>

        {/* 4-Step Interactive Pipeline Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {WORKFLOW_STEPS.map((step, idx) => {
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
                    layoutId="workflow-active-indicator"
                    className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-xl"
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/15 text-cyan-300' : 'bg-slate-800/50 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">{step.step}</span>
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

        {/* Active Step Deep-Dive Showcase Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-slate-800 bg-[#0B0F1C] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient subtle backdrop */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Step Information */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>STAGE {activeStep.step} OF 04</span>
                  <span>·</span>
                  <span>{activeStep.subtitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeStep.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  {activeStep.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Enterprise Security Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Hardware Vectorized</span>
                  </div>
                </div>
              </div>

              {/* Step Visual Representation */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-slate-800 bg-[#080C16] p-5 font-mono text-xs text-slate-300 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="text-cyan-400 font-semibold">Pipeline Flow State</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Node
                    </span>
                  </div>

                  {/* Dynamic Visual depending on Step */}
                  {activeStepIndex === 0 && (
                    <div className="space-y-2.5">
                      <div className="text-[11px] text-slate-400">Federated Connectors:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {['Snowflake DW', 'Google BigQuery', 'AWS Redshift', 'PostgreSQL DB'].map((src) => (
                          <div key={src} className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-200">
                            <span>{src}</span>
                            <span className="text-[10px] text-cyan-400 font-mono">LIVE</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2.5 rounded bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-200">
                        Query folding enabled: 98% of filters pushed down directly to underlying warehouse.
                      </div>
                    </div>
                  )}

                  {activeStepIndex === 1 && (
                    <div className="space-y-3">
                      <div className="text-[11px] text-slate-400">Semantic Graph Relationships:</div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-white">Fact_Sales</span>
                          <span className="text-cyan-400 font-mono">1:N ← Dim_Customer</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-white">Fact_Sales</span>
                          <span className="text-cyan-400 font-mono">1:N ← Dim_Calendar</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                          <span className="text-white">Fact_Sales</span>
                          <span className="text-cyan-400 font-mono">1:N ← Dim_Product</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Referential integrity verified: 0 orphan keys across 4.8M transaction records.
                      </div>
                    </div>
                  )}

                  {activeStepIndex === 2 && (
                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-400">VTAB Vector Measure Compilation:</div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                        <code>
                          <span className="text-purple-400">VAR</span> CurrentRevenue = <span className="text-blue-400">SUM</span>(Fact_Sales[Revenue])<br />
                          <span className="text-purple-400">VAR</span> PriorYearRevenue = <span className="text-blue-400">CALCULATE</span>(CurrentRevenue, <span className="text-amber-400">SAMEPERIODLASTYEAR</span>(Dim_Date[Date]))<br />
                          <span className="text-purple-400">RETURN</span> <span className="text-blue-400">DIVIDE</span>(CurrentRevenue - PriorYearRevenue, PriorYearRevenue)
                        </code>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>Compiler: AVX-512 JIT Vectorized</span>
                        <span className="text-cyan-400 tabular-nums">Execution: 4.1ms</span>
                      </div>
                    </div>
                  )}

                  {activeStepIndex === 3 && (
                    <div className="space-y-2.5">
                      <div className="text-[11px] text-slate-400">Publish Target & Distribution:</div>
                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-slate-200">
                          <span>Workspace: Global Executive BI</span>
                          <span className="text-[10px] text-emerald-400">PUBLISHED</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Scheduled Refresh: Every 15 minutes · RLS Enabled (4 Roles)
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-300 p-2 rounded bg-slate-900/50">
                        <span>Mobile Web & Tablet Layouts</span>
                        <span className="text-cyan-400">Synced</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

