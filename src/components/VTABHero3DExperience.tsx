import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  FileText,
  Zap,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { useDesktopRelease } from '../hooks/useDesktopRelease';


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

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Desktop Release: dynamically fetched from GitHub Tags & Releases ──
  const { version: releaseVersion, downloadUrl: releaseUrl } = useDesktopRelease();

  // ── Reporting PPT URL from Supabase ──
  const ENV_PPT_URL = (import.meta.env.VITE_REPORTING_TOOL_PPT_URL as string | undefined)?.trim() || '';
  const [reportingPptUrl, setReportingPptUrl] = useState(ENV_PPT_URL);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const fetchPpt = () => {
      Promise.resolve(
        supabase
          .from('products')
          .select('demo_snippet, detail_content')
          .eq('id', 'ai-reporting-platform')
          .single()
      )
        .then(({ data }) => {
          const ppt = (data?.demo_snippet as { pptUrl?: string } | null)?.pptUrl 
                   || (data?.detail_content as { pptUrl?: string } | null)?.pptUrl 
                   || '';
          if (ppt) setReportingPptUrl(ppt);
        })
        .catch(() => {});
    };

    fetchPpt();
    window.addEventListener('focus', fetchPpt);
    return () => window.removeEventListener('focus', fetchPpt);
  }, []);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false);

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
          0. AI PORTFOLIO-STYLE FULL-BLEED BACKGROUND VIDEO
             Application demo video plays directly across the right background
             with dark gradient masks, expanding full-width in cinematic view.
         ───────────────────────────────────────────────────────────── */}
      <div 
        className="absolute inset-0 z-0 flex justify-end overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left & Bottom Gradient Masks to ensure text readability */}
        <div 
          className={`absolute inset-0 z-10 w-full lg:w-2/3 transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-r from-[#020611] via-[#020611]/95 to-transparent pointer-events-none`} 
        />
        
        <div 
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-t from-[#020611] via-[#020611]/60 to-transparent pointer-events-none`} 
        />

        {/* Video Player pushed to the right (65%) or expanded full-width */}
        <div 
          className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isCinematic 
              ? 'w-full opacity-100 z-10' 
              : 'w-full lg:w-[65%] opacity-85 z-0'
          }`}
          style={{
            maskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
            WebkitMaskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 18%, black 100%)',
          }}
        >
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
              className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity z-20 pointer-events-auto"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,213,242,0.6)] transform hover:scale-110 active:scale-95 transition-transform cursor-pointer">
                <Play className="w-7 h-7 fill-white ml-1 text-white" />
              </div>
            </div>
          )}

          {/* Floating Scrubber Bar on hover or pause or cinematic */}
          <div 
            className={`absolute bottom-4 right-6 left-6 lg:left-auto lg:w-[460px] p-3 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-xl transition-all duration-300 z-30 pointer-events-auto ${
              isHovered || !isPlaying || isCinematic ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            {/* Scrubber track */}
            <div 
              onClick={handleSeek}
              className="relative w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer mb-2 transition-all group/scrubber"
            >
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-0 group-hover/scrubber:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-200 hover:text-cyan-300 transition cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
                <span className="font-mono text-[11px] text-slate-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          1. TOP-RIGHT VIDEO CONTROLS (MATCHES AI PORTFOLIO SHOWCASE)
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute top-6 right-6 lg:right-10 z-40 flex items-center gap-2.5">
        {/* Expand Video / Show Text */}
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

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={togglePlay}
          className="px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400 fill-current" />}
          <span className="hidden sm:inline text-xs font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        {/* Mute / Unmute Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          className="w-10 h-10 rounded-2xl border transition-all flex items-center justify-center cursor-pointer shadow-xl backdrop-blur-md bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING HERO CONTENT (LEFT 54% - MATCHES AI PORTFOLIO SHOWCASE)
         ───────────────────────────────────────────────────────────── */}
      <div className={`relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center min-h-[640px] ${
        isCinematic ? 'pointer-events-none' : ''
      }`}>
        <div className={`w-full lg:w-[54%] space-y-6 transition-all duration-700 ease-out fill-mode-both ${
          isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}>

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

          {/* Action Buttons: Download Desktop + Interactive Demo + PPT */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href={releaseUrl}
              download
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#00D5F2] hover:brightness-105 shadow-[0_4px_16px_rgba(99,102,241,0.22)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] border border-white/15 transition-all duration-300 cursor-pointer active:scale-95 no-underline"
            >
              <Download className="w-4 h-4" />
              <span>
                Download Desktop {releaseVersion}
              </span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                Win 64-bit
              </span>
            </a>

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

            <a
              href={reportingPptUrl || '#'}
              download={Boolean(reportingPptUrl)}
              target={reportingPptUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!reportingPptUrl) {
                  e.preventDefault();
                  alert('Presentation deck (PPT) has not been configured yet. You can upload or link the PPT in the Admin Dashboard > Live Dashboards section.');
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#071426]/90 hover:bg-[#0c1f3d] border border-slate-700/80 hover:border-purple-400/50 shadow-lg transition-all duration-300 cursor-pointer active:scale-95 no-underline"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Download PPT</span>
            </a>
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
      </div>

    </section>
  );
};
