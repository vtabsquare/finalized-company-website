import React, { useState } from 'react';
import {
  RotateCcw,
  ExternalLink,
  Loader2,
  Maximize2,
  Minimize2,
  Globe,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface DatabricksLiveSandboxProps {
  onScheduleDemo: (interestArea?: string) => void;
  isLightMode?: boolean;
}

export const DatabricksLiveSandbox: React.FC<DatabricksLiveSandboxProps> = ({
  onScheduleDemo,
  isLightMode = false,
}) => {
  const embedUrl = 'https://databricks-migration-factory-9ym2.onrender.com/?embed=true';
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <section id="interactive-sandbox" className="relative py-20 lg:py-28 bg-[#020716] border-t border-slate-800/80 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header / Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-950/70 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Live Interactive Sandbox
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Experience Databricks Migration AI Studio in Real Time
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Direct live application telemetry deployed from our production cluster. Connect to source schemas, inspect automated Medallion tier allocations, and synthesize Delta pipelines below.
            </p>
          </div>

          {/* Action Buttons: Refresh + Fullscreen + Open Full Portal */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIframeLoading(true);
                setIframeKey((k) => k + 1);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 shadow-lg transition-all cursor-pointer active:scale-95"
              title="Reload sandbox"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Refresh View</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 shadow-lg transition-all cursor-pointer active:scale-95"
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Exit Full</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full View</span>
                </>
              )}
            </button>

            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-400/30 transition-all cursor-pointer active:scale-95"
            >
              <span>Open Full Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Obsidian Glass Console Frame with Iframe */}
        <div className={`relative rounded-2xl md:rounded-3xl border border-cyan-500/35 bg-[#030919] shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.15)] overflow-hidden ${
          isFullscreen ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl bg-[#030919]' : ''
        }`}>
          
          {/* Top Browser Console Chrome */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#051126] border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md">
                {embedUrl}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CONNECTED
              </span>
              {isFullscreen && (
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="ml-2 text-slate-400 hover:text-white"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Iframe Viewport Stage with Loading Spinner */}
          <div className={`relative w-full ${isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[750px] sm:h-[850px] lg:h-[920px]'} bg-black flex items-center justify-center`}>
            {iframeLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#020717]/95 backdrop-blur-sm gap-3">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-xs font-mono text-cyan-300 tracking-wider uppercase">Connecting to live environment...</p>
              </div>
            )}
            <iframe
              key={iframeKey}
              src={embedUrl}
              title="Databricks Migration AI Studio Live Interactive Demo"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              onLoad={() => setIframeLoading(false)}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
