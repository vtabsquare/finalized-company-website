import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, Cloud, Check, ArrowRight, Laptop, Share2, Shield } from 'lucide-react';
import { EDITIONS_INFO } from '../data/reportingProductData';

interface EditionsSectionProps {
  onOpenDownload: () => void;
}

export const EditionsSection: React.FC<EditionsSectionProps> = ({ onOpenDownload }) => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'services'>('desktop');
  const desktop = EDITIONS_INFO.desktop;
  const services = EDITIONS_INFO.services;

  return (
    <section id="editions" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#060810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            DEPLOYMENT ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-pretty">
            Desktop authoring. Cloud distribution.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            A cohesive two-tier architecture designed for deep data modeling locally and instant collaborative exploration across the web.
          </p>
        </div>

        {/* Dual Panel Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Panel 1: VTAB Reporting Studio Desktop */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            {/* Ambient subtle glow */}
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

              {/* Visual Desktop Window Mockup Preview */}
              <div className="rounded-xl border border-slate-800/90 bg-[#060913] p-3 text-xs space-y-2.5 font-mono shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="text-slate-300 ml-1">Local Workstation Execution</span>
                  </div>
                  <span className="text-cyan-400">DirectLake AVX-512</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Active File:</span>
                    <span className="text-white">Enterprise_Model_2026.vtmodel</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Memory Engine:</span>
                    <span className="text-emerald-400">642 MB (Zero-copy direct)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Offline Mode:</span>
                    <span className="text-cyan-400">Full authoring capable</span>
                  </div>
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

            {/* Primary Action Button */}
            <div className="pt-8">
              <button
                type="button"
                onClick={onOpenDownload}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-900/30 transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>{desktop.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Panel 2: VTAB Reporting Services */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D1A] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6">
              {/* Header & Category Badge */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-400 font-mono">
                  <Cloud className="w-4 h-4 text-indigo-400" />
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

              {/* Visual Cloud Web Portal Mockup Preview */}
              <div className="rounded-xl border border-slate-800/90 bg-[#060913] p-3 text-xs space-y-2.5 font-mono shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-slate-300">https://services.vtab.internal/reports</span>
                  </div>
                  <span className="text-emerald-400">TLS 1.3 · SAML SSO</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Connected Workspace:</span>
                    <span className="text-white">Global Finance Executive</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Scheduled Refresh:</span>
                    <span className="text-cyan-400">Next: 15 mins (Automated)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Row Level Security:</span>
                    <span className="text-indigo-300">Enforced for 480 Users</span>
                  </div>
                </div>
              </div>

              {/* Highlights bullet list */}
              <div className="space-y-2 pt-2">
                {services.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

