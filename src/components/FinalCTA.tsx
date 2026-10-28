import React from 'react';
import { ArrowRight, Download, Sparkles, Terminal } from 'lucide-react';
import { SITE_CONFIG } from '../data/reportingProductData';
import { AmbientGlow } from './AmbientGlow';

interface FinalCTAProps {
  onOpenDownload: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenDownload }) => {
  return (
    <section id="download" className="relative py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#060810]">
      <AmbientGlow variant="hero" />

      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>PRODUCTION-GRADE BUSINESS INTELLIGENCE</span>
        </div>

        {/* Large bold heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-pretty">
          Start creating with VTAB Reporting Studio.
        </h2>

        {/* Minimal supporting text */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore a complete environment for professional business intelligence and reporting.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenDownload}
            className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-xl shadow-xl shadow-cyan-500/25 transition-all duration-200 active:scale-[0.98] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download Desktop</span>
          </button>

          <a
            href="#features"
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <span>Explore Features</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

        {/* Minimal version and hardware requirements notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-slate-400 font-mono">
          <span>{SITE_CONFIG.version}</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span>Compatible with Windows 10/11 x64</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span className="text-cyan-400">DirectX 11+ Accelerated</span>
        </div>
      </div>
    </section>
  );
};

