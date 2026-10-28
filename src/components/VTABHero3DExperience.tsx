import React, { useEffect, useRef } from 'react';
import {
  Play,
  Download,
  Zap,
  LayoutDashboard,
  Activity,
  Sparkles
} from 'lucide-react';

interface VTABHero3DExperienceProps {
  onScheduleDemo: (interestArea?: string) => void;
  onOpenDownload?: () => void;
  scrollToPillars?: (pillar: 'studio' | 'services' | 'admin') => void;
  onWatchDemo?: () => void;
  isLightMode?: boolean;
}

/** Put the file at public/media/vtab-hero-plate.webp */
const PLATE = '/media/vtab-hero-plate.webp';

const cv = (o: Record<string, string | number>) => o as React.CSSProperties;

// Mask helpers: the same render is used three times so the side panels can move
// independently of the background (real parallax) without ghosting.
const BASE_MASK = 'linear-gradient(to right, transparent 0%, transparent 22%, #000 30%, #000 70%, transparent 78%, transparent 100%)';
const LEFT_MASK = 'linear-gradient(to right, #000 0%, #000 23%, transparent 31%)';
const RIGHT_MASK = 'linear-gradient(to left, #000 0%, #000 23%, transparent 31%)';

export const VTABHero3DExperience: React.FC<VTABHero3DExperienceProps> = ({ 
  onScheduleDemo,
  onOpenDownload,
  onWatchDemo
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, cx = 0, cy = 0;
    const tick = () => {
      const { x, y } = target.current;
      if (Math.abs(x - cx) > 0.001 || Math.abs(y - cy) > 0.001) {
        cx += (x - cx) * 0.06; cy += (y - cy) * 0.06;
        root.style.setProperty('--mx', cx.toFixed(3));
        root.style.setProperty('--my', cy.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    target.current = { x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 };
  };

  const layer = (mask: string, px: number, py: number, scale: number, bob?: string) => (
    <div className="absolute inset-0 pointer-events-none"
      style={{ transform: `translate3d(calc(var(--mx,0) * ${px}px), calc(var(--my,0) * ${py}px), 0) scale(${scale})` }}>
      <img 
        src={PLATE} 
        alt="VTAB Analytics Suite 3D Stage" 
        draggable={false}
        onError={(e) => {
          const t = e.currentTarget;
          if (!t.dataset.triedFallback) {
            t.dataset.triedFallback = 'true';
            t.src = '/media/vtab-hero-plate.webp.png';
          }
        }}
        className={`w-full h-full object-cover filter blur-[2.5px] ${bob ? 'vtab-bob' : ''}`}
        style={cv({ maskImage: mask, WebkitMaskImage: mask, '--dur': bob ?? '0s' })} />
    </div>
  );

  return (
    <section
      ref={rootRef}
      onPointerMove={onMove}
      onPointerLeave={() => (target.current = { x: 0, y: 0 })}
      className="relative overflow-hidden select-none pt-24 pb-16 lg:pt-28 lg:pb-24 min-h-[760px] flex items-center"
      style={{ background: '#020611' }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. 3D ATMOSPHERIC STAGE (WITH TASTEFUL DEPTH BLUR)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* DEPTH 1 — background + floor (moves least) */}
        {layer(BASE_MASK, -5, -2, 1.02)}

        {/* DEPTH 2/3 — side panel stacks (move more, bob on their own rhythm) */}
        <div className="hidden lg:block opacity-75">
          {layer(LEFT_MASK, 12, 6, 1.025, '9s')}
          {layer(RIGHT_MASK, 12, 6, 1.025, '11s')}
        </div>

        {/* Soft atmospheric ambient glow & backdrop filter */}
        <div className="absolute inset-0 bg-[#020611]/55 backdrop-blur-[2px] pointer-events-none" />

        {/* Central blue-cyan atmospheric illumination */}
        <div 
          className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] pointer-events-none blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.18) 0%, rgba(0, 213, 242, 0.14) 40%, rgba(40, 110, 255, 0.06) 70%, transparent 80%)' }} 
        />
        <div 
          className="absolute right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(0, 213, 242, 0.18) 0%, rgba(40, 123, 255, 0.12) 45%, transparent 75%)' }} 
        />

        {/* Drifting micro-particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span 
            key={i} 
            className="vtab-p absolute rounded-full bg-cyan-300 pointer-events-none"
            style={cv({ 
              top: `${(i * 37 + 11) % 84}%`, 
              left: `${(i * 53 + 7) % 96}%`, 
              width: 2 + (i % 3), 
              height: 2 + (i % 3), 
              opacity: 0.25 + (i % 4) * 0.1, 
              '--dur': `${9 + (i % 5) * 2}s`, 
              '--delay': `${-i * 1.3}s`, 
              boxShadow: '0 0 10px #00D5F2, 0 0 20px #287BFF' 
            })} 
          />
        ))}

        {/* Subtle horizontal laser streak */}
        <div 
          className="absolute inset-x-[10%] top-[45%] h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,213,242,.25), transparent)', filter: 'blur(.5px)' }} 
        />

        {/* Smooth bottom transition */}
        <div 
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none" 
          style={{ background: 'linear-gradient(to bottom, transparent, #06080F)' }} 
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TWO-COLUMN HERO STAGE: CONTENT (LEFT) + LIVE DASHBOARD PLACEHOLDER (RIGHT)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: TITLE, PARAGRAPH, DOWNLOAD CTA, FEATURE BADGES ── */}
          <div className="lg:col-span-7 text-left space-y-6">

            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/35 text-xs font-semibold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="tracking-wider uppercase text-[11px] font-mono">
                24/7 ENTERPRISE REPORTING ENGINE · CL 100
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-white tracking-tight leading-[1.12] text-pretty">
              Transform business<br />
              data into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.45)]">
                clear
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_25px_rgba(0,213,242,0.45)]">
                decisions
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed max-w-xl font-normal">
              VTAB Reporting Studio is a complete business intelligence and report-authoring platform for transforming data, building semantic models, creating reusable business measures, designing interactive dashboards, and publishing reports.
            </p>

            {/* Feature Sub-bullet Callout with Zap */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cyan-300 font-medium">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Connect data, prepare it, model it, visualize it, and publish it from one environment.</span>
            </div>

            {/* Action Buttons: Download Desktop + Interactive Demo */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#00D5F2] hover:brightness-105 shadow-[0_4px_16px_rgba(99,102,241,0.22)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] border border-white/15 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Desktop v5.0.22</span>
                <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                  Win 64-bit
                </span>
              </button>

              <button
                type="button"
                onClick={onWatchDemo || (() => {
                  const el = document.getElementById('dashboards');
                  if (el) {
                    const yOffset = -70;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                })}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#071426]/90 hover:bg-[#0c1f3d] border border-slate-700/80 hover:border-cyan-400/50 shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Watch Interactive Demo</span>
              </button>
            </div>

            {/* Feature Badges Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              {['CL 100 Compatibility', 'Measure Engine', 'Paginated Reports', 'Deterministic Sort'].map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1 rounded-full text-[11px] font-medium text-slate-300 border border-slate-700/70 bg-[#081224]/75 backdrop-blur-md"
                >
                  {badge}
                </span>
              ))}
            </div>

          </div>

          {/* ── RIGHT COLUMN: FUTURE LIVE DASHBOARD PLACEHOLDER CONTAINER ── */}
          <div className="lg:col-span-5 relative">

            {/* Ambient Backlight Glow behind Placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-purple-500/15 blur-2xl rounded-3xl pointer-events-none" />

            {/* ══════════════════════════════════════════════════════════════
                FUTURE LIVE DASHBOARD PLACEHOLDER CONTAINER
                You can replace the contents inside this container in the future
                with your live dashboard canvas or WebGL interactive widget.
               ══════════════════════════════════════════════════════════════ */}
            <div className="relative rounded-2xl border border-cyan-500/35 bg-[#050c1e]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,213,242,0.18)] overflow-hidden group hover:border-cyan-400/60 transition-all duration-300">
              
              {/* Top Console Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#07132a]/95 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300 text-[11px] font-medium">
                    Live Analytics Engine · Dashboard Stage
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Ready
                  </span>
                </div>
              </div>

              {/* Live Canvas / Dashboard Preview Stage */}
              <div className="p-5 sm:p-6 space-y-4 relative min-h-[350px] flex flex-col justify-between">
                
                {/* Background Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Metrics Row */}
                <div className="grid grid-cols-3 gap-2.5 relative z-10">
                  <div className="p-3 rounded-xl bg-[#030919]/80 border border-cyan-500/20 backdrop-blur-md">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Total Volume</div>
                    <div className="text-lg font-extrabold text-white mt-0.5">$48.2M</div>
                    <div className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span>+18.4%</span>
                      <span className="text-slate-500 font-normal">vs target</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#030919]/80 border border-blue-500/20 backdrop-blur-md">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Response</div>
                    <div className="text-lg font-extrabold text-cyan-300 mt-0.5">0.14ms</div>
                    <div className="text-[10px] font-semibold text-cyan-400 flex items-center gap-1 mt-0.5">
                      <span>Vector SIMD</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#030919]/80 border border-purple-500/20 backdrop-blur-md">
                    <div className="text-[10px] uppercase font-mono text-slate-400">Cached Rows</div>
                    <div className="text-lg font-extrabold text-purple-300 mt-0.5">12.4M</div>
                    <div className="text-[10px] font-semibold text-purple-400 flex items-center gap-1 mt-0.5">
                      <span>Parquet DuckDB</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Chart Waveform Canvas */}
                <div className="relative z-10 p-4 rounded-xl bg-[#020614]/90 border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between text-xs mb-3 text-slate-400 font-mono">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Real-Time Analytical Stream</span>
                    </span>
                    <span className="text-cyan-400 text-[11px]">60 FPS Fluid</span>
                  </div>

                  {/* SVG Multi-Frequency Waveform */}
                  <div className="h-24 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 500 110" preserveAspectRatio="none" fill="none">
                      <defs>
                        <linearGradient id="liveWaveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D5F2" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#287BFF" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="liveWaveGradPurple" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="25" x2="500" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                      <line x1="0" y1="55" x2="500" y2="55" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                      <line x1="0" y1="85" x2="500" y2="85" stroke="rgba(255,255,255,0.08)" />

                      <path d="M 0 75 Q 80 40, 160 60 T 320 30 T 500 50 L 500 110 L 0 110 Z" fill="url(#liveWaveGradPurple)" />
                      <path d="M 0 75 Q 80 40, 160 60 T 320 30 T 500 50" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" />

                      <path d="M 0 65 Q 90 20, 180 45 T 360 15 T 500 35 L 500 110 L 0 110 Z" fill="url(#liveWaveGrad)" />
                      <path d="M 0 65 Q 90 20, 180 45 T 360 15 T 500 35" stroke="#00D5F2" strokeWidth="2.4" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px #00D5F2)' }} />

                      <circle cx="180" cy="45" r="4" fill="#ffffff" stroke="#00D5F2" strokeWidth="2" />
                      <circle cx="360" cy="15" r="4.5" fill="#ffffff" stroke="#00D5F2" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Future Integration Prompt Banner */}
                <div 
                  onClick={onWatchDemo || (() => {
                    const el = document.getElementById('dashboards');
                    if (el) {
                      const yOffset = -70;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  })}
                  className="relative z-10 flex items-center justify-between p-3 rounded-xl border border-dashed border-cyan-400/40 bg-cyan-950/20 hover:bg-cyan-950/40 text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 text-cyan-200">
                    <LayoutDashboard className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-mono text-[11px]">
                      Future Live Dashboard Canvas Placeholder
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30">
                    Ready for Integration
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
