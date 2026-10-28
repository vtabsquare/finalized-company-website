import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
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

  // ── Live Video Player State ──
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = pct * duration;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

          {/* ── RIGHT COLUMN: LIVE APPLICATION VIDEO STAGE ── */}
          <div className="lg:col-span-5 relative">

            {/* Ambient Backlight Glow behind Video Stage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-2xl rounded-3xl pointer-events-none" />

            {/* Obsidian Glass Console Container */}
            <div 
              className="relative rounded-2xl border border-cyan-500/40 bg-[#050c1e]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,213,242,0.2)] overflow-hidden group hover:border-cyan-400/70 transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* Top Console Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#07132a]/95 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-200 text-[11px] font-semibold tracking-wide">
                    VTAB Reporting Studio · Live Interactive Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Video
                  </span>
                </div>
              </div>

              {/* Video Player Stage */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  src="/media/Reporting Tool AV.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Center Play Indicator when paused */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,213,242,0.6)] transform hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                      <Play className="w-7 h-7 fill-white ml-1 text-white" />
                    </div>
                  </div>
                )}

                {/* Floating Interactive Video Controls Overlay */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-opacity duration-300 z-20 ${
                    isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Progress Scrubber */}
                  <div 
                    onClick={handleSeek}
                    className="relative w-full h-1.5 bg-white/20 hover:h-2.5 rounded-full cursor-pointer mb-2.5 transition-all group/scrubber"
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-0 group-hover/scrubber:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition cursor-pointer"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      {/* Sound Mute/Unmute */}
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition cursor-pointer"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                      </button>

                      {/* Time Code */}
                      <span className="font-mono text-[11px] text-slate-300">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Replay */}
                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
                        title="Replay from start"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Fullscreen */}
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="px-4 py-2.5 border-t border-white/10 bg-[#060e22]/95 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Real-Time Interaction Engine</span>
                </span>
                <span className="text-cyan-400 font-semibold">1080p · 60 FPS</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
