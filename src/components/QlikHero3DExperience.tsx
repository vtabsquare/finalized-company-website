import React, { useRef, useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  ArrowUpRight,
  ArrowLeftRight,
  Database,
  Layers,
  FileCode
} from 'lucide-react';
import { QLIK_MIGRATION_CONFIG } from '../data/qlikMigrationData';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

interface QlikHero3DExperienceProps {
  onScheduleDemo: (interestArea?: string) => void;
  onExploreCapabilities?: () => void;
  isLightMode?: boolean;
}

export const QlikHero3DExperience: React.FC<QlikHero3DExperienceProps> = ({
  onScheduleDemo,
  onExploreCapabilities,
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const target = useRef({ x: 0, y: 0 });

  const [isHovered, setIsHovered] = useState(false);

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
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        
        {/* Left Column: Product Information & CTAs (6 cols) */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono tracking-wider">{QLIK_MIGRATION_CONFIG.topBadge}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-pretty">
              {QLIK_MIGRATION_CONFIG.shortName}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-cyan-400">
              {QLIK_MIGRATION_CONFIG.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            {QLIK_MIGRATION_CONFIG.description}
          </p>

          {/* Impact Metric Banner */}
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
            <span className="text-sm font-bold text-cyan-300 tracking-wide font-mono">
              {QLIK_MIGRATION_CONFIG.impactMetric}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onScheduleDemo(QLIK_MIGRATION_CONFIG.name)}
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
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 space-y-2 border-t border-slate-800/80">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
              Core Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {QLIK_MIGRATION_CONFIG.techStack.map((tech, idx) => (
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

        {/* Right Column: 3D Tilting Studio Console Card (6 cols) */}
        <div className="lg:col-span-6 relative">
          <div
            className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300 group"
            style={{
              transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out'
            }}
          >
            {/* Top Laser Border Indicator */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400" />

            {/* Window Topbar */}
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-slate-400 text-[11px] flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-cyan-400" />
                  Qlik to Power BI Migration • Media Console
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  OPERATIONAL
                </span>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video min-h-[340px] sm:min-h-[420px] w-full bg-black flex items-center justify-center overflow-hidden">
              <ProductVideoStreamingPlayer
                productId="qlik-to-powerbi-migration"
                productTitle={QLIK_MIGRATION_CONFIG.shortName}
                imageUrl="/media/qlik-to-powerbi-console.png"
                compactMode={false}
              />
            </div>

            {/* Console Details Strip */}
            <div className="p-4 sm:p-5 bg-gradient-to-b from-black/40 to-black/80 space-y-3 border-t border-white/5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">PARITY ACCURACY</div>
                  <div className="text-sm font-bold text-white font-mono">99.4%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">COST SAVINGS</div>
                  <div className="text-sm font-bold text-cyan-300 font-mono">80%</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">SYNTHETIC KEYS</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">0 ELIMINATED</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">MEASURES</div>
                  <div className="text-sm font-bold text-sky-400 font-mono">1,420+ DAX</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
