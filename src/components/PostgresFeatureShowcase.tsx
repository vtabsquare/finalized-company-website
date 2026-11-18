import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Database,
  Code,
  Cpu,
  PlayCircle,
  FileDiff,
  Server,
  Check,
  Terminal,
  Shield
} from 'lucide-react';
import { POSTGRES_FEATURE_ITEMS } from '../data/postgresMigrationData';

const iconMap = {
  'multi-dialect-ingestion': Database,
  'rule-based-tsql-translation': Code,
  'ai-procedural-refactoring': Cpu,
  'live-sqlserver-dryrun': PlayCircle,
  'interactive-diff-inspection': FileDiff,
  'automated-deployment-backup': Server
};

export const PostgresFeatureShowcase: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('multi-dialect-ingestion');
  const activeFeature = POSTGRES_FEATURE_ITEMS.find((f) => f.id === activeFeatureId) || POSTGRES_FEATURE_ITEMS[0];

  return (
    <section id="studio-capabilities" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono">
            STUDIO CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-pretty">
            Interactive database migration & modernization capabilities.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            Select a capability below to explore how the Database Migration Suite powers modern enterprise database refactoring, code conversion, and cloud replatforming.
          </p>
        </div>

        {/* 6 Capabilities Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {POSTGRES_FEATURE_ITEMS.map((item) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] || Database;
            const isActive = activeFeatureId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFeatureId(item.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)] text-white'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {item.shortTag}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold leading-tight">
                  {item.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Capability Details (2 Columns) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          >
            {/* Left Box: Feature Specs (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-mono font-semibold text-cyan-300">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{activeFeature.shortTag} · {activeFeature.category.toUpperCase()}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeFeature.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  {activeFeature.highlightPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-3">
                {activeFeature.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl bg-slate-950/80 border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">{spec.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-cyan-300 font-mono mt-0.5 truncate">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Live Terminal State (6 cols) */}
            <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden flex flex-col justify-between">
              {/* Terminal Titlebar */}
              <div className="px-5 py-3.5 bg-slate-950 border-b border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    {activeFeature.terminalTitle}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  CONNECTOR MESH
                </span>
              </div>

              {/* Terminal Output Lines */}
              <div className="p-6 font-mono text-xs sm:text-sm space-y-3 flex-1 flex flex-col justify-center">
                {activeFeature.terminalLines.map((line, lIdx) => (
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
                        line.status === 'LIVE' || line.status === 'READY' || line.status === 'ACTIVE'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : line.status === 'PASS' || line.status === 'SYNCHRONIZED' || line.status === 'PARSED' || line.status === 'REWRITTEN' || line.status === 'ADAPTED' || line.status === 'VERIFIED' || line.status === 'EXECUTING' || line.status === 'EXECUTED' || line.status === 'AUTHENTICATED' || line.status === 'GENERATED'
                          ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                      }`}>
                        {line.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-slate-950/90 border-t border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{activeFeature.securityNotice}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Metadata Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase">PROTOCOLS:</span>
            <span className="text-xs font-mono text-white font-semibold">T-SQL / TDS, REST, ODBC 17, WebSockets</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-center">
            <span className="text-[11px] font-mono text-slate-400 uppercase">VELOCITY:</span>
            <span className="text-xs font-mono text-cyan-300 font-semibold">Up to 120K DDL lines/sec parsing</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-end">
            <span className="text-[11px] font-mono text-slate-400 uppercase">SECURITY:</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">Windows Auth · SQL Server Auth · TLS 1.3</span>
          </div>
        </div>

      </div>
    </section>
  );
};
