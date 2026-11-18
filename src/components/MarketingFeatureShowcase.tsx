import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radio,
  Bot,
  FileText,
  ShieldCheck,
  Layers,
  Share2,
  Check,
  Shield,
  Sparkles,
  Lock
} from 'lucide-react';
import { MARKETING_FEATURE_ITEMS } from '../data/marketingAgentData';

const iconMap = {
  'intent-discovery': Radio,
  'multi-agent-synthesis': Bot,
  'knowledge-grounding': FileText,
  'vision-verification': ShieldCheck,
  'creative-compositor': Layers,
  'omni-channel-publishing': Share2
};

export const MarketingFeatureShowcase: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('intent-discovery');
  const activeFeature = MARKETING_FEATURE_ITEMS.find((f) => f.id === activeFeatureId) || MARKETING_FEATURE_ITEMS[0];

  return (
    <section id="studio-capabilities" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-12 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            STUDIO CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-pretty">
            Interactive marketing & lead capabilities.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            Select a capability below to explore how VTAB Marketing & Lead Suite powers modern enterprise revenue and demand generation.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#090D18] rounded-xl border border-slate-800/80 overflow-x-auto scrollbar-none mb-8">
          {MARKETING_FEATURE_ITEMS.map((item) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] || Radio;
            const isActive = item.id === activeFeatureId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFeatureId(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/90 text-white shadow-md shadow-blue-900/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Demonstration Panel Container */}
        <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col justify-center">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Feature Information & Specs */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono">
                  <span>{activeFeature.shortTag}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{activeFeature.category}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  {activeFeature.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeFeature.description}
                </p>

                <div className="space-y-2.5 pt-1">
                  {activeFeature.highlightPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Specs Pill Matrix */}
                <div className="pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-3">
                  {activeFeature.specs.map((spec, i) => (
                    <div key={i} className="space-y-0.5">
                      <div className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                        {spec.label}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Connector Catalog / Visual HUD */}
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-cyan-500/30 bg-[#040814] shadow-2xl overflow-hidden font-mono text-xs">
                  
                  {/* Console Header Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#060D1F] border-b border-white/10 text-slate-400 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-slate-300 ml-1.5 font-semibold">{activeFeature.terminalTitle}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">6 of 8 Connected</span>
                  </div>

                  {/* Terminal Content Lines */}
                  <div className="p-5 space-y-3 bg-[#02050E]">
                    {activeFeature.terminalLines.map((line, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-slate-200">{line.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400">{line.mode}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                            {line.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security Notice Footer Strip */}
                  <div className="px-4 py-3 bg-[#060D1F] border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{activeFeature.securityNotice}</span>
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
