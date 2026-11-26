import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  Download
} from 'lucide-react';
import { MARKETING_AGENT_CONFIG } from '../data/marketingAgentData';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

interface MarketingHero3DExperienceProps {
  onScheduleDemo: (interestArea?: string) => void;
  onExploreCapabilities?: () => void;
  pptUrl?: string;
  videoUrl?: string;
  isLightMode?: boolean;
}

export const MarketingHero3DExperience: React.FC<MarketingHero3DExperienceProps> = ({
  onScheduleDemo,
  onExploreCapabilities,
  pptUrl,
  videoUrl,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const [isCinematic, setIsCinematic] = useState(false);

  // 3D Parallax Tilt Effect
  useEffect(() => {
    const root = rootRef.current;
    if (!root || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    let raf = 0, cx = 0, cy = 0;
    const tick = () => {
      const { x, y } = target.current;
      if (Math.abs(x - cx) > 0.001 || Math.abs(y - cy) > 0.001) {
        cx += (x - cx) * 0.06;
        cy += (y - cy) * 0.06;
        root.style.setProperty('--mx', cx.toFixed(3));
        root.style.setProperty('--my', cy.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    target.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    };
  };

  return (
    <section
      ref={rootRef}
      onPointerMove={onMove}
      onPointerLeave={() => (target.current = { x: 0, y: 0 })}
      className="relative overflow-hidden select-none pt-24 pb-16 lg:pt-28 lg:pb-24 min-h-[760px] flex items-center border-b border-white/10"
      style={{ background: '#020611' }}
    >
      {/* ── AMBIENT RADIAL LIGHTING ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[680px] h-[680px] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-[35%] left-[25%] w-[500px] h-[500px] rounded-full bg-purple-500/15 blur-[150px]" />
        <div
          className="absolute inset-x-[10%] top-[45%] h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,213,242,.35), transparent)', filter: 'blur(.5px)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #070A13)' }}
        />
      </div>

      {/* ── FULL-BLEED RIGHT-SIDE HERO BACKGROUND (VIDEO OR BANNER IMAGE) ── */}
      <div className="absolute inset-0 z-10 flex justify-end overflow-hidden">
        <div
          className={`absolute inset-0 z-20 w-full lg:w-[55%] transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-r from-[#020611] via-[#020611]/90 to-transparent pointer-events-none`}
        />
        <div
          className={`absolute inset-0 z-20 transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-t from-[#020611] via-[#020611]/45 to-transparent pointer-events-none`}
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
            productId="ai-marketing-agent"
            productTitle={MARKETING_AGENT_CONFIG.shortName}
            imageUrl="/media/ai-marketing-control-room.png"
            videoUrl={videoUrl}
            compactMode={false}
            isCinematic={isCinematic}
            onToggleCinematic={() => setIsCinematic(!isCinematic)}
            isActive={true}
          />
        </div>
      </div>

      {/* Top-Right Expand Control */}
      <div className="absolute top-24 lg:top-28 right-6 lg:right-10 z-40 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setIsCinematic(!isCinematic)}
          className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
            isCinematic
              ? 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/50 text-amber-300'
              : 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 border-cyan-400/50 text-cyan-300'
          }`}
        >
          {isCinematic ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-cyan-300" />}
          <span className="hidden sm:inline text-xs font-bold">{isCinematic ? 'Show Text' : 'Expand Preview'}</span>
        </button>
      </div>

      {/* ── FLOATING HERO CONTENT ── */}
      <div className={`relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center min-h-[640px] ${
        isCinematic ? 'pointer-events-none' : ''
      }`}>
        <div
          className={`w-full lg:w-[54%] text-left space-y-6 transition-all duration-700 ${
            isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'
          }`}
        >
          {/* Top Tagline Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-semibold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] font-mono">
              {MARKETING_AGENT_CONFIG.topBadge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.12] text-pretty">
            Smarter campaigns.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]">
              Bigger reach.
            </span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,213,242,0.45)]">
              Real results.
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-xl font-normal">
            {MARKETING_AGENT_CONFIG.description}
          </p>

          {/* Impact Metric Callout with Zap */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cyan-300 font-medium">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{MARKETING_AGENT_CONFIG.impactMetric} across multi-channel B2B workflows.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => onScheduleDemo('VTAB Marketing & Lead Suite')}
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#00D5F2] hover:brightness-105 shadow-[0_4px_16px_rgba(99,102,241,0.22)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] border border-white/15 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <span>Schedule Technical Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onExploreCapabilities || (() => {
                const el = document.getElementById('pipeline-workflow');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              })}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#071426]/90 hover:bg-[#0c1f3d] border border-slate-700/80 hover:border-cyan-400/50 shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore Capabilities</span>
            </button>

            {pptUrl && (
              <a
                href={pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-cyan-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download PPT</span>
              </a>
            )}
          </div>

          {/* Tech Badges Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            {MARKETING_AGENT_CONFIG.techStack.map((badge) => (
              <span
                key={badge}
                className="px-3.5 py-1 rounded-full text-[11px] font-medium text-slate-300 border border-slate-700/70 bg-[#081224]/75 backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
