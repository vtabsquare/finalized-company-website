import React, { useRef, useState } from 'react';
import { Sparkles, ArrowRight, Shield, Layers, FileText, Maximize2, Minimize2, Download } from 'lucide-react';
import { buildsmartEstimatorHero } from '../data/buildsmartEstimatorData';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

interface BuildsmartHero3DExperienceProps {
  onScheduleDemo?: () => void;
  onExploreSpecs?: () => void;
  onExploreSandbox?: () => void;
  hasSandbox?: boolean;
  pptUrl?: string;
  videoUrl?: string;
}

export const BuildsmartHero3DExperience: React.FC<BuildsmartHero3DExperienceProps> = ({
  onScheduleDemo,
  onExploreSpecs,
  onExploreSandbox,
  hasSandbox = false,
  pptUrl,
  videoUrl,
}) => {
  const [isCinematic, setIsCinematic] = useState(false);

  return (
    <div className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#030611] via-[#050B1B] to-[#030611]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-orange-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Full-Bleed Background Video (Matches AI Portfolio Showcase) */}
      <div className="absolute inset-0 z-10 flex justify-end overflow-hidden">
        {/* Left & Bottom Gradient Masks to ensure text readability */}
        <div className={`absolute inset-0 z-20 w-full lg:w-[50%] transition-opacity duration-700 ${
          isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } bg-gradient-to-r from-[#030611] via-[#030611]/90 to-transparent pointer-events-none`} />
        
        <div className={`absolute inset-0 z-20 transition-opacity duration-700 ${
          isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } bg-gradient-to-t from-[#030611] via-[#030611]/50 to-transparent pointer-events-none`} />

        {/* Video Player pushed to the right (65%) or expanded full-width */}
        <div className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCinematic 
            ? 'w-full opacity-100 z-10' 
            : 'w-full lg:w-[65%] opacity-100 z-10'
        }`}
          style={{
            maskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
            WebkitMaskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
          }}
        >
          <ProductVideoStreamingPlayer
            productId="buildsmart-estimator"
            productTitle={buildsmartEstimatorHero.title}
            imageUrl={buildsmartEstimatorHero.mediaImage}
            videoUrl={videoUrl}
            compactMode={false}
            isCinematic={isCinematic}
            onToggleCinematic={() => setIsCinematic(!isCinematic)}
            isActive={true}
          />
        </div>
      </div>

      {/* Top-Right Video Controls (Matches AI Portfolio Showcase) */}
      <div className="absolute top-24 lg:top-28 right-6 lg:right-10 z-40 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setIsCinematic(!isCinematic)}
          className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
            isCinematic
              ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/50 text-amber-300'
              : 'bg-gradient-to-r from-amber-600/30 to-orange-500/30 hover:from-amber-600/50 hover:to-orange-500/50 border-amber-400/50 text-amber-300 animate-pulse'
          }`}
          title={isCinematic ? 'Exit Full View (Show Text)' : 'Expand Video (Hide Text)'}
        >
          {isCinematic ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-amber-300" />}
          <span className="hidden sm:inline text-xs font-bold">{isCinematic ? 'Show Text' : 'Expand Video'}</span>
        </button>
      </div>

      {/* Top Breadcrumb & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 relative z-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>←</span> Back to Home
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {buildsmartEstimatorHero.badge}
          </div>
        </div>
      </div>

      {/* Floating Hero Content (Left 54% - Matches AI Portfolio Showcase) */}
      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[580px] ${
        isCinematic ? 'pointer-events-none' : ''
      }`}>
        <div className={`w-full lg:w-[54%] space-y-6 transition-all duration-700 ease-out fill-mode-both ${
          isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              ENTERPRISE SOLUTION · CIVIL ENGINEERING & ESTIMATION
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
              BuildSmart <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Estimator</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans pt-2 max-w-xl">
              {buildsmartEstimatorHero.description}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 max-w-xl">
            {buildsmartEstimatorHero.metrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-800 bg-black/50 backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onScheduleDemo}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-semibold font-sans text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{buildsmartEstimatorHero.primaryAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreSpecs}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800/50 text-slate-200 font-medium font-sans text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{buildsmartEstimatorHero.secondaryAction}</span>
              <Layers className="w-4 h-4 text-slate-400" />
            </button>

            {hasSandbox && onExploreSandbox && (
              <button
                type="button"
                onClick={onExploreSandbox}
                className="px-6 py-3 rounded-xl font-bold font-sans text-sm text-amber-300 hover:text-white bg-amber-950/70 hover:bg-amber-900/80 border border-amber-500/50 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Live Interactive Sandbox</span>
              </button>
            )}

            {pptUrl && (
              <a
                href={pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl font-bold font-sans text-sm text-amber-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download PPT</span>
              </a>
            )}
          </div>

          {/* Technology Tags */}
          <div className="pt-2 flex flex-wrap gap-2">
            {buildsmartEstimatorHero.tags.map((tag, i) => (
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
