import React, { useState } from 'react';
import {
  RotateCcw,
  ExternalLink,
  Loader2,
  Globe,
  Sparkles
} from 'lucide-react';

interface QlikLiveSandboxProps {
  embedUrl: string;
  productTitle?: string;
  isLightMode?: boolean;
}

export const QlikLiveSandbox: React.FC<QlikLiveSandboxProps> = ({
  embedUrl,
  productTitle = 'Qlik to Power BI Migration',
  isLightMode = false,
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  if (!embedUrl) return null;

  return (
    <section id="interactive-sandbox" className="relative py-16 lg:py-24 bg-[#020716] border-t border-b border-white/10 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header / Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-950/70 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Live Interactive Sandbox
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Experience {productTitle} in Real Time
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Direct live application telemetry deployed from our production cluster. Parse Qlik script logic, inspect automated DAX translation, and test the interactive bridge below.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIframeLoading(true);
                setIframeKey(k => k + 1);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 shadow-lg transition-all cursor-pointer active:scale-95"
              title="Reload sandbox"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Refresh View</span>
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

        {/* Console Container with Iframe */}
        <div className="relative rounded-2xl md:rounded-3xl border border-cyan-500/35 bg-[#030919] shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.15)] overflow-hidden">
          
          {/* Top Chrome */}
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
                LIVE APPLICATION
              </span>
            </div>
          </div>

          {/* Iframe Viewport */}
          <div className="relative w-full h-[750px] sm:h-[850px] lg:h-[920px] bg-black flex items-center justify-center">
            {iframeLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#020717]/95 backdrop-blur-sm gap-3">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-xs font-mono text-cyan-300 tracking-wider uppercase">Connecting to live environment...</p>
              </div>
            )}
            <iframe
              key={iframeKey}
              src={embedUrl}
              title={`${productTitle} Live Interactive Sandbox`}
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
