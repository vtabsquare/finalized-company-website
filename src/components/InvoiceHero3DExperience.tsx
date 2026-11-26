import React, { useState } from 'react';
import { ArrowRight, Layers, Maximize2, Minimize2, Download } from 'lucide-react';
import { invoiceFlowHero } from '../data/invoiceFlowData';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

interface InvoiceHero3DExperienceProps {
  onScheduleDemo?: () => void;
  onExploreSpecs?: () => void;
  pptUrl?: string;
  videoUrl?: string;
}

export const InvoiceHero3DExperience: React.FC<InvoiceHero3DExperienceProps> = ({
  onScheduleDemo,
  onExploreSpecs,
  pptUrl,
  videoUrl,
}) => {
  const [isCinematic, setIsCinematic] = useState(false);

  return (
    <div className="relative pt-10 pb-16 lg:pt-14 lg:pb-24 min-h-[720px] overflow-hidden bg-[#020611]">
      {/* Full-Bleed Right-Side Hero Background (Video or Picture Banner fallback) */}
      <div className="absolute inset-0 z-10 flex justify-end overflow-hidden">
        <div
          className={`absolute inset-0 z-20 w-full lg:w-[55%] transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-r from-[#020611] via-[#020611]/90 to-transparent pointer-events-none`}
        />
        <div
          className={`absolute inset-0 z-20 transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-t from-[#020611] via-[#020611]/40 to-transparent pointer-events-none`}
        />

        <div
          className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center ${
            isCinematic ? 'w-full opacity-100 z-10' : 'w-full lg:w-[65%] opacity-100 z-10'
          }`}
          style={{
            maskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
            WebkitMaskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
          }}
        >
          <ProductVideoStreamingPlayer
            productId="smart-invoice-management-system"
            productTitle={invoiceFlowHero.title}
            imageUrl={invoiceFlowHero.mediaImage}
            videoUrl={videoUrl}
            compactMode={false}
            isCinematic={isCinematic}
            onToggleCinematic={() => setIsCinematic(!isCinematic)}
            isActive={true}
          />
        </div>
      </div>

      {/* Top Breadcrumb & Status Bar */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>←</span> Back to Home
          </a>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {invoiceFlowHero.badge}
            </div>
            <button
              type="button"
              onClick={() => setIsCinematic(!isCinematic)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-lg backdrop-blur-md text-xs font-bold ${
                isCinematic
                  ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/50 text-amber-300'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-cyan-400/40 text-cyan-300'
              }`}
            >
              {isCinematic ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />}
              <span className="hidden sm:inline">{isCinematic ? 'Show Text' : 'Expand Preview'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Left Foreground Content */}
      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isCinematic ? 'pointer-events-none' : ''}`}>
        <div
          className={`w-full lg:w-[54%] space-y-6 transition-all duration-700 ${
            isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'
          }`}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/20 text-blue-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              ENTERPRISE SOLUTION · FINANCIAL INTELLIGENCE & BILLING
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
              Invoice <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">Flow</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans pt-2">
              {invoiceFlowHero.description}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {invoiceFlowHero.metrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-800 bg-slate-900/75 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onScheduleDemo}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-semibold font-sans text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{invoiceFlowHero.primaryAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreSpecs}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/70 hover:bg-slate-800/70 text-slate-200 font-medium font-sans text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{invoiceFlowHero.secondaryAction}</span>
              <Layers className="w-4 h-4 text-slate-400" />
            </button>

            {pptUrl && (
              <a
                href={pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-bold font-sans text-sm text-cyan-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download PPT</span>
              </a>
            )}
          </div>

          {/* Technology Tags */}
          <div className="pt-2 flex flex-wrap gap-2">
            {invoiceFlowHero.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/80 border border-slate-800 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
