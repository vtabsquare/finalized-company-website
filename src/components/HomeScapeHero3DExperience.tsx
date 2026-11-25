import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ArrowUpRight,
  Box,
  Layers,
  Home,
  Maximize2,
  Minimize2,
  Download
} from 'lucide-react';
import { HOMESCAPE_CONFIG } from '../data/homeScapeData';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

interface HomeScapeHero3DExperienceProps {
  onScheduleDemo: (interestArea?: string) => void;
  onExploreCapabilities?: () => void;
  pptUrl?: string;
  videoUrl?: string;
  isLightMode?: boolean;
}

export const HomeScapeHero3DExperience: React.FC<HomeScapeHero3DExperienceProps> = ({
  onScheduleDemo,
  onExploreCapabilities,
  pptUrl,
  videoUrl,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const target = useRef({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);
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
        root.style.setProperty('--rx', `${(-cy * 5).toFixed(2)}deg`);
        root.style.setProperty('--ry', `${(cx * 5).toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    target.current = {
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny))
    };
  };

  const handlePointerLeave = () => {
    target.current = { x: 0, y: 0 };
    setIsHovered(false);
  };

  return (
    <header
      ref={rootRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#030611] via-[#050B1B] to-[#030611]"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

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
            productId="gbti-smart-home-builder"
            productTitle={HOMESCAPE_CONFIG.shortName}
            imageUrl="/media/homescape360-hero.jpg"
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
              : 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 border-cyan-400/50 text-cyan-300 animate-pulse'
          }`}
          title={isCinematic ? 'Exit Full View (Show Text)' : 'Expand Video (Hide Text)'}
        >
          {isCinematic ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-cyan-300" />}
          <span className="hidden sm:inline text-xs font-bold">{isCinematic ? 'Show Text' : 'Expand Video'}</span>
        </button>
      </div>

      {/* Floating Hero Content (Left 54% - Matches AI Portfolio Showcase) */}
      <div className={`relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center min-h-[640px] ${
        isCinematic ? 'pointer-events-none' : ''
      }`}>
        <div className={`w-full lg:w-[54%] space-y-6 transition-all duration-700 ease-out fill-mode-both ${
          isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}>
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono tracking-wider">{HOMESCAPE_CONFIG.topBadge}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-pretty">
              {HOMESCAPE_CONFIG.shortName}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-cyan-400">
              {HOMESCAPE_CONFIG.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            {HOMESCAPE_CONFIG.description}
          </p>

          {/* Impact Metric Banner & Metrics Grid */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
              <span className="text-sm font-bold text-cyan-300 tracking-wide font-mono">
                {HOMESCAPE_CONFIG.impactMetric}
              </span>
            </div>

            {/* Metric Chips Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                <div className="text-[10px] text-slate-400 uppercase font-mono">RENDER RATE</div>
                <div className="text-sm font-bold text-white font-mono">60 FPS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                <div className="text-[10px] text-slate-400 uppercase font-mono">BOQ SPEED</div>
                <div className="text-sm font-bold text-cyan-300 font-mono">&lt; 10ms</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                <div className="text-[10px] text-slate-400 uppercase font-mono">ACCURACY</div>
                <div className="text-sm font-bold text-sky-400 font-mono">100% DET.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                <div className="text-[10px] text-slate-400 uppercase font-mono">SECURITY</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">RLS SHIELD</div>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onScheduleDemo(HOMESCAPE_CONFIG.name)}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-300 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] flex items-center gap-2 group hover:scale-[1.02]"
            >
              <span>Schedule Technical Demo</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {onExploreCapabilities && (
              <button
                type="button"
                onClick={onExploreCapabilities}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <span>Explore Capabilities</span>
              </button>
            )}

            {pptUrl && (
              <a
                href={pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl font-bold text-sm text-cyan-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download PPT</span>
              </a>
            )}
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 space-y-2 border-t border-slate-800/80">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
              Core Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {HOMESCAPE_CONFIG.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-900/90 text-cyan-300 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
