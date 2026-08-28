import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, ExternalLink, Layers, Database, Cpu, Bot, TestTube,
  BarChart3, X, ChevronLeft, ChevronRight, Volume2, VolumeX,
  Maximize, RotateCcw, Loader2, CheckCircle2, ArrowUpRight, Sparkles,
} from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';
import { useDemoVideos, type DemoProduct } from '../hooks/useDemoVideos';
import { useIsMobile } from '../hooks/useIsMobile';

const DEMO_APP_URL = 'https://vibrant-foundation.onrender.com';

// ─── Fallback data ─────────────────────────────────────────────────────────────
const FALLBACK_PRODUCTS: DemoProduct[] = [
  { id: 'qlik-to-powerbi',    name: 'Qlik to Power BI Migration Tool',    category: 'Migration Tools',       description: 'Automates the conversion of Qlik Sense applications to Power BI. Maps dashboards, charts, and data models automatically to reduce manual migration effort.',                                                              tags: ['Qlik','Power BI','Migration','Automation'],       videoUrl: 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qlik-to-powerbi-demo.mp4',           accent: 'blue',    Icon: Database },
  { id: 'tableau-to-powerbi', name: 'Tableau to Power BI Migration Tool', category: 'Migration Tools',       description: 'AI-powered migration solution that converts Tableau workbooks, data models, calculations, dashboards, and data connections into Power BI-compatible components.',                                                         tags: ['Tableau','Power BI','Migration','AI'],            videoUrl: 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/tableau-to-powerbi-demo.mp4',        accent: 'indigo',  Icon: Layers   },
  { id: 'pg-to-sql',          name: 'PostgreSQL to SQL Server Migration', category: 'Migration Tools',       description: 'Seamlessly migrate schemas, stored procedures, and data from PostgreSQL to SQL Server with minimal downtime and automated datatype mapping.',                                                                           tags: ['Migration','SQL','ETL','PostgreSQL'],             videoUrl: 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/postgres-to-sqlserver-demo.mp4',    accent: 'violet',  Icon: Database },
  { id: 'buildsmart',         name: 'BuildSmart Application',            category: 'Construction',          description: 'AI-driven computer vision platform for construction sites. Monitors safety compliance, tracks project progress, and detects PPE violations in real-time.',                                                               tags: ['Estimation','ML','Planning','Computer Vision'],   videoUrl: 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/Buildsmart%20Demo%20Video.mp4',      accent: 'amber',   Icon: Cpu      },
  { id: 'l1-automation',      name: 'L1 Automation Tool',               category: 'Enterprise Automation', description: 'Intelligent IT service desk automation that resolves Level 1 support tickets without human intervention using advanced natural language processing.',                                                                    tags: ['AI','Automation','Support','NLP'],                videoUrl: 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/L1%20Automation%20Demo%20Video.mp4', accent: 'cyan',    Icon: Bot      },
  { id: 'qa-testing',         name: 'QA Testing Application',           category: 'Quality Assurance',     description: 'End-to-end automated testing suite for enterprise applications. Generates test cases, executes cross-browser tests, and provides visual regression analysis.',                                                          tags: ['QA','Testing','Automation','CI/CD'],              videoUrl: 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qa-testing-demo.mp4',               accent: 'emerald', Icon: TestTube },
];

// ─── Accent colours ────────────────────────────────────────────────────────────
const ACCENTS: Record<string, { glow: string; badge: string; icon: string; btn: string; line: string; gradient: string }> = {
  blue:    { glow: 'rgba(59,130,246,0.35)',   badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',        icon: 'text-blue-400',    btn: 'bg-blue-600 hover:bg-blue-500',       line: 'bg-blue-500',    gradient: 'from-blue-950/80 via-blue-900/40 to-transparent'    },
  indigo:  { glow: 'rgba(99,102,241,0.35)',   badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',  icon: 'text-indigo-400',  btn: 'bg-indigo-600 hover:bg-indigo-500',   line: 'bg-indigo-500',  gradient: 'from-indigo-950/80 via-indigo-900/40 to-transparent' },
  violet:  { glow: 'rgba(139,92,246,0.35)',   badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',  icon: 'text-violet-400',  btn: 'bg-violet-600 hover:bg-violet-500',   line: 'bg-violet-500',  gradient: 'from-violet-950/80 via-violet-900/40 to-transparent' },
  amber:   { glow: 'rgba(245,158,11,0.35)',   badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',     icon: 'text-amber-400',   btn: 'bg-amber-600 hover:bg-amber-500',     line: 'bg-amber-500',   gradient: 'from-amber-950/80 via-amber-900/40 to-transparent'   },
  cyan:    { glow: 'rgba(6,182,212,0.35)',    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',        icon: 'text-cyan-400',    btn: 'bg-cyan-600 hover:bg-cyan-500',       line: 'bg-cyan-500',    gradient: 'from-cyan-950/80 via-cyan-900/40 to-transparent'     },
  emerald: { glow: 'rgba(16,185,129,0.35)',   badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', icon: 'text-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-500', line: 'bg-emerald-500', gradient: 'from-emerald-950/80 via-emerald-900/40 to-transparent' },
};
const c = (accent: string) => ACCENTS[accent] ?? ACCENTS.blue;

// ─── Slide thumbnail (animated gradient + floating icon) ──────────────────────
const SlideThumbnail: React.FC<{ product: DemoProduct; isLightMode: boolean }> = ({ product, isLightMode }) => {
  const colors = c(product.accent);
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Animated glow orb */}
      <div className="absolute inset-0 flex items-center justify-end pr-12 lg:pr-20">
        <div
          className="w-[420px] h-[420px] rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)` }}
        />
      </div>
      {/* Floating icon centred in the right half */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-32">
        <div
          className={`w-36 h-36 lg:w-48 lg:h-48 rounded-3xl flex items-center justify-center border backdrop-blur-sm ${
            isLightMode ? 'bg-white/30 border-white/40' : 'bg-white/5 border-white/10'
          }`}
          style={{ boxShadow: `0 0 60px ${colors.glow}` }}
        >
          <product.Icon className={`w-16 h-16 lg:w-20 lg:h-20 ${colors.icon}`} />
        </div>
      </div>
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

// ─── Inline video modal ────────────────────────────────────────────────────────
interface VideoModalProps {
  product: DemoProduct;
  allProducts: DemoProduct[];
  onClose: () => void;
  onNavigate: (p: DemoProduct) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ product, allProducts, onClose, onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [isMuted, setIsMuted]         = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [isLoading, setIsLoading]     = useState(true);
  const [hasError, setHasError]       = useState(false);
  const [showCtrl, setShowCtrl]       = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idx    = allProducts.findIndex(p => p.id === product.id);
  const colors = c(product.accent);

  useEffect(() => {
    setIsPlaying(false); setCurrentTime(0); setDuration(0);
    setIsLoading(true);  setHasError(false);
    videoRef.current?.load();
  }, [product.id]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const resetTimer = useCallback(() => {
    setShowCtrl(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowCtrl(false), 3000);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) v.play().then(() => setIsPlaying(true)).catch(() => {});
    else { v.pause(); setIsPlaying(false); }
    resetTimer();
  }, [resetTimer]);

  const seek = (d: number) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + d));
    resetTimer();
  };

  const prev = () => { if (idx > 0) onNavigate(allProducts[idx - 1]); };
  const next = () => { if (idx < allProducts.length - 1) onNavigate(allProducts[idx + 1]); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); seek(-10); }
      if (e.key === 'ArrowRight') { e.preventDefault(); seek(10); }
      if (e.key === 'ArrowUp')   prev();
      if (e.key === 'ArrowDown') next();
      if (e.key === 'm') setIsMuted(m => !m);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const fmt = (t: number) => (!t || isNaN(t)) ? '0:00' : `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl bg-[#080e1a] border border-white/10"
        onClick={e => e.stopPropagation()}
        onMouseMove={resetTimer}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300" style={{ opacity: showCtrl ? 1 : 0 }}>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${colors.badge}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Demo Showcase
            </div>
            <span className="text-white font-semibold text-sm truncate max-w-xs hidden sm:block">{product.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 hidden sm:block">{idx + 1} / {allProducts.length}</span>
            <button onClick={prev} disabled={idx === 0} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors" title="Prev (↑)"><ChevronLeft className="w-4 h-4 text-white" /></button>
            <button onClick={next} disabled={idx === allProducts.length - 1} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 transition-colors" title="Next (↓)"><ChevronRight className="w-4 h-4 text-white" /></button>
            <a href={`${DEMO_APP_URL}?product=${product.id}`} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white/80 transition-colors"><ExternalLink className="w-3.5 h-3.5" />Open App</a>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/70 transition-colors"><X className="w-4 h-4 text-white" /></button>
          </div>
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-black cursor-pointer" onClick={togglePlay}>
          {isLoading && !hasError && <div className="absolute inset-0 flex items-center justify-center z-10"><Loader2 className="w-10 h-10 text-cyan-400 animate-spin" /></div>}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
              <span className="text-4xl">⚠️</span>
              <p className="text-white/70 text-sm">Video unavailable</p>
              <a href={`${DEMO_APP_URL}?product=${product.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-white text-sm hover:bg-cyan-400 transition-colors"><ExternalLink className="w-4 h-4" />Open Demo App</a>
            </div>
          )}
          <video ref={videoRef} src={product.videoUrl} className="w-full h-full object-contain" playsInline muted={isMuted}
            onCanPlay={() => { setIsLoading(false); videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => {}); }}
            onTimeUpdate={() => { if (videoRef.current) setCurrentTime(videoRef.current.currentTime); }}
            onLoadedMetadata={() => { if (videoRef.current) setDuration(videoRef.current.duration); }}
            onEnded={() => { setIsPlaying(false); next(); }}
            onError={() => { setIsLoading(false); setHasError(true); }}
            onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}
          />
          {!isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300" style={{ opacity: showCtrl && !isPlaying ? 1 : 0 }}>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <Play className="w-7 h-7 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-[68px] left-0 right-0 z-20 px-5 pb-3 pt-8 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300" style={{ opacity: showCtrl ? 1 : 0 }}>
          <div className="relative w-full h-1 bg-white/20 rounded-full mb-3 group/bar cursor-pointer"
            onClick={e => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); if (videoRef.current) videoRef.current.currentTime = ((e.clientX - r.left) / r.width) * (duration || 0); resetTimer(); }}>
            <div className={`h-full rounded-full ${colors.line}`} style={{ width: `${progress}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" style={{ left: `calc(${progress}% - 6px)` }} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">{isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}</button>
              <button onClick={() => seek(-10)} className="text-white/60 hover:text-white transition-colors"><RotateCcw className="w-4 h-4" /></button>
              <button onClick={() => setIsMuted(m => !m)} className="text-white/60 hover:text-white transition-colors">{isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</button>
              <span className="text-xs text-white/50 font-mono">{fmt(currentTime)} / {fmt(duration)}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              {allProducts.map((p, i) => (
                <button key={p.id} onClick={() => onNavigate(p)} title={p.name}
                  className={`rounded-full transition-all duration-300 ${i === idx ? `w-5 h-2 ${colors.line}` : 'w-2 h-2 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
            <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white/60 hover:text-white transition-colors"><Maximize className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Info strip */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between gap-4 bg-[#0a1020]">
          <div className="min-w-0">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.icon}`}>{product.category}</span>
            <h3 className="text-white font-semibold text-sm truncate">{product.name}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {idx > 0 && <button onClick={prev} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/30 transition-colors"><ChevronLeft className="w-3.5 h-3.5" /> Prev</button>}
            {idx < allProducts.length - 1 && <button onClick={next} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors ${colors.btn}`}>Next <ChevronRight className="w-3.5 h-3.5" /></button>}
          </div>
        </div>
        <p className="text-center text-[10px] text-white/20 py-1.5">Space — play/pause · ← → seek · ↑ ↓ switch demo · Esc close</p>
      </div>
    </div>
  );
};

// ─── Skeleton slide ────────────────────────────────────────────────────────────
const SkeletonSlide: React.FC<{ isLightMode: boolean }> = ({ isLightMode }) => (
  <div className={`w-full min-h-[600px] flex items-center animate-pulse ${isLightMode ? 'bg-slate-100' : 'bg-[#030712]'}`}>
    <div className="w-full lg:w-1/2 px-8 lg:px-16 space-y-5">
      <div className="h-5 w-32 bg-slate-700/50 rounded-full" />
      <div className="h-12 w-3/4 bg-slate-700/50 rounded-xl" />
      <div className="h-4 w-full bg-slate-700/30 rounded" />
      <div className="h-4 w-5/6 bg-slate-700/30 rounded" />
      <div className="flex gap-3 mt-4">
        <div className="h-11 w-36 bg-slate-700/50 rounded-xl" />
        <div className="h-11 w-36 bg-slate-700/30 rounded-xl" />
      </div>
    </div>
  </div>
);

// ─── Main section ─────────────────────────────────────────────────────────────
interface Props { isLightMode?: boolean; }

export const DemoShowcaseSection: React.FC<Props> = ({ isLightMode = false }) => {
  const { products, loading } = useDemoVideos(FALLBACK_PRODUCTS);
  const isMobile = useIsMobile(1024);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey]           = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalProduct, setModalProduct] = useState<DemoProduct | null>(null);

  // Build category list dynamically from DB
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filtered   = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  // Clamp index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setAnimKey(k => k + 1);
  }, [activeCategory]);

  const current = filtered[currentIndex] ?? filtered[0];
  const colors  = current ? c(current.accent) : c('blue');

  const goTo = (i: number) => { setCurrentIndex(i); setAnimKey(k => k + 1); };
  const prev = () => goTo((currentIndex - 1 + filtered.length) % filtered.length);
  const next = () => goTo((currentIndex + 1) % filtered.length);

  // Keyboard nav for the slideshow (when modal is closed)
  useEffect(() => {
    if (modalProduct) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  return (
    <>
      {modalProduct && (
        <VideoModal
          product={modalProduct}
          allProducts={products}
          onClose={() => setModalProduct(null)}
          onNavigate={setModalProduct}
        />
      )}

      <section id="demo-showcase" className={`relative overflow-hidden transition-colors duration-300 ${isLightMode ? 'bg-gradient-to-b from-slate-50 via-blue-50/30 to-indigo-50/20' : 'bg-[#030712]'}`}>

        {/* ── Section header ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center space-y-3 mb-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isLightMode ? 'bg-cyan-100/80 border border-cyan-300 text-cyan-800' : 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-300'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Live Product Demos</span>
              </div>
              <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                See Our AI in{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Action</span>
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Real-world demonstrations of our enterprise applications — each showcasing end-to-end capabilities deployed in production.
              </p>
            </div>
          </ScrollReveal>

          {/* Category pills */}
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className={`inline-flex flex-wrap gap-2 justify-center w-full p-2 rounded-2xl border backdrop-blur-md mb-0 ${
              isLightMode ? 'bg-white/60 border-slate-200' : 'bg-slate-900/60 border-white/10'
            }`}>
              {categories.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                        : isLightMode
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}>
                    {cat}
                    {cat !== 'All' && (
                      <span className={`ml-1.5 ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                        ({products.filter(p => p.category === cat).length})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Slideshow ── */}
        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className={`relative w-full border-y transition-colors duration-300 ${isLightMode ? 'border-slate-200/80' : 'border-white/5'}`}>

            {loading ? (
              <SkeletonSlide isLightMode={isLightMode} />
            ) : !current ? null : (

              /* ── MOBILE LAYOUT ── */
              isMobile ? (
                <div className="flex flex-col">
                  {/* Thumbnail top */}
                  <div className={`relative w-full h-56 overflow-hidden ${isLightMode ? 'bg-gradient-to-br from-slate-100 to-slate-200' : 'bg-slate-900'}`}>
                    <SlideThumbnail product={current} isLightMode={isLightMode} />
                    {/* Play button centred */}
                    <button
                      onClick={() => setModalProduct(current)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </button>
                    <div className={`absolute inset-x-0 bottom-0 h-16 ${isLightMode ? 'bg-gradient-to-t from-slate-50' : 'bg-gradient-to-t from-[#030712]'}`} />
                  </div>

                  {/* Content */}
                  <div key={animKey} className="px-5 py-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-xl shrink-0 ${isLightMode ? 'bg-gradient-to-br from-cyan-700 to-blue-600 border-cyan-500/20 text-white' : 'bg-black/60 border-white/15'}`}>
                        <current.Icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-0.5 ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`}>{current.category}</span>
                        <h3 className={`text-xl font-heading font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{current.name}</h3>
                      </div>
                    </div>
                    <p className={`text-sm leading-relaxed line-clamp-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>{current.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {current.tags.map(t => (
                        <span key={t} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${isLightMode ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/80 text-slate-400 border-slate-700/60'}`}>{t}</span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <button onClick={() => setModalProduct(current)} className={`w-full px-5 py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all ${colors.btn} shadow-lg`}>
                        <Play className="w-4 h-4 fill-white" /> Watch Demo
                      </button>
                      <a href={`${DEMO_APP_URL}?product=${current.id}`} target="_blank" rel="noopener noreferrer"
                        className={`w-full px-5 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl flex items-center justify-center gap-2 transition-all ${isLightMode ? 'text-slate-800 bg-white/90 border-slate-200' : 'text-slate-100 bg-slate-900/80 border-white/15'}`}>
                        <ExternalLink className="w-4 h-4" /> Open Demo App
                      </a>
                    </div>
                  </div>

                  {/* Mobile dot nav */}
                  <div className={`flex items-center justify-between px-4 py-3 border-t ${isLightMode ? 'border-slate-200 bg-white/60' : 'border-white/5 bg-black/40'}`}>
                    <button onClick={prev} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-slate-300'}`}><ChevronLeft className="w-5 h-5" /></button>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-xl ${isLightMode ? 'bg-white/80 border-slate-300' : 'bg-black/40 border-white/10'}`}>
                      {filtered.map((p, i) => (
                        <button key={p.id} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex ? `w-6 h-2 ${colors.line} shadow-[0_0_12px_rgba(99,102,241,0.5)]` : isLightMode ? 'w-2 h-2 bg-slate-400' : 'w-2 h-2 bg-white/20'}`} />
                      ))}
                    </div>
                    <button onClick={next} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-slate-300'}`}><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              ) : (

              /* ── DESKTOP LAYOUT ── */
              <div className="relative min-h-[680px]">
                {/* Full-bleed background — right half is the animated thumbnail */}
                <div className="absolute inset-0 z-0 flex justify-end">
                  {/* Left gradient fade */}
                  <div className={`absolute inset-0 z-10 w-2/3 ${isLightMode ? 'bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent' : 'bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent'}`} />
                  {/* Bottom gradient fade */}
                  <div className={`absolute inset-0 z-10 ${isLightMode ? 'bg-gradient-to-t from-slate-50 via-transparent to-transparent' : 'bg-gradient-to-t from-[#030712] via-transparent to-transparent'}`} />
                  {/* Animated thumbnail fills right 65% */}
                  <div className="relative w-full lg:w-[65%] h-full opacity-70 z-0">
                    <SlideThumbnail product={current} isLightMode={isLightMode} />
                  </div>
                </div>

                {/* Floating text content — left 50% */}
                <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-16 py-14 flex flex-col justify-center min-h-[680px]">
                  {/* "Featured" badge */}
                  <div className="mb-6">
                    <span className={`px-4 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md ${isLightMode ? 'bg-cyan-50/80 border-cyan-200/80 text-cyan-700' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                      Featured Demo Showcase
                    </span>
                  </div>

                  {/* Animated slide content */}
                  <div key={animKey} className="w-full lg:w-[52%] space-y-5 animate-in fade-in slide-in-from-left-8 duration-700">

                    {/* Icon + title */}
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-xl shrink-0 ${isLightMode ? 'bg-gradient-to-br from-cyan-700 to-blue-600 border-cyan-500/20 text-white' : 'bg-black/60 border-white/15'}`}>
                        <current.Icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-1 ${isLightMode ? 'text-cyan-700' : 'text-cyan-400'}`}>{current.category}</span>
                        <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{current.name}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm sm:text-base leading-relaxed max-w-xl font-medium line-clamp-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>{current.description}</p>

                    {/* Tag features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                      {current.tags.map(tag => (
                        <div key={tag} className={`flex items-center gap-2.5 border px-3.5 py-2.5 rounded-xl backdrop-blur-md transition-all ${isLightMode ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-800 hover:border-cyan-300' : 'bg-black/40 border-white/5 text-slate-200'}`}>
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
                          <span className="text-xs font-semibold">{tag}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setModalProduct(current)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl cursor-pointer ${colors.btn} shadow-lg`}
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Watch Demo
                      </button>
                      <a
                        href={`${DEMO_APP_URL}?product=${current.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl flex items-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer ${isLightMode ? 'text-slate-800 bg-white/90 border-slate-200 hover:border-slate-300' : 'text-slate-100 bg-slate-900/80 border-white/15 hover:border-white/30'}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Demo App
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Play button overlay — centered on the right thumbnail area */}
                <button
                  onClick={() => setModalProduct(current)}
                  className="absolute z-[25] right-[22%] top-1/2 -translate-y-1/2 group/play flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/40 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover/play:scale-110 group-hover/play:bg-white/20 shadow-2xl"
                    style={{ boxShadow: `0 0 40px ${colors.glow}, 0 0 80px ${colors.glow}` }}
                  >
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <span className="text-xs font-semibold text-white/70 tracking-widest uppercase opacity-0 group-hover/play:opacity-100 transition-opacity duration-200">
                    Play Demo
                  </span>
                </button>

                {/* Desktop top-right nav controls */}
                <div className="absolute top-8 right-8 lg:right-12 z-30 hidden lg:flex items-center gap-2">
                  <button onClick={prev} className={`w-11 h-11 shrink-0 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-md ${isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'}`}><ChevronLeft className="w-5 h-5" /></button>
                  <button onClick={next} className={`w-11 h-11 shrink-0 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-md ${isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'}`}><ChevronRight className="w-5 h-5" /></button>
                </div>

                {/* Desktop dot nav — bottom center */}
                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-2.5 p-2.5 rounded-full border backdrop-blur-xl shadow-2xl ${isLightMode ? 'bg-white/80 border-slate-300' : 'bg-black/40 border-white/10'}`}>
                  {filtered.map((p, i) => (
                    <button key={p.id} onClick={() => goTo(i)} title={p.name}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentIndex
                          ? `w-6 h-2 ${colors.line} shadow-[0_0_12px_rgba(99,102,241,0.6)]`
                          : isLightMode ? 'w-2 h-2 bg-slate-400 hover:bg-slate-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Bottom CTA ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className={`rounded-2xl border p-7 flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-gradient-to-r from-slate-900/80 to-slate-900/50 border-slate-800/60 backdrop-blur-sm'
            }`}>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Full Demo Library</span>
                </div>
                <h3 className={`font-heading font-bold text-xl mb-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Want the full-screen experience?</h3>
                <p className={`text-sm ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Visit our dedicated showcase app to browse every demo with immersive full-screen playback.</p>
              </div>
              <button onClick={() => window.open(DEMO_APP_URL, '_blank', 'noopener,noreferrer')}
                className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5">
                <ExternalLink className="w-4 h-4" /> Open Demo Showcase <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>

      </section>
    </>
  );
};
