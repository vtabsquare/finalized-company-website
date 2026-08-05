import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Zap, ArrowRight, Layers, User, ShieldCheck, BarChart2, Triangle, Cloud, Volume2, VolumeX } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import TypewriterHeadline from './TypewriterHeadline';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onScheduleDemo: (interest?: string) => void;
  onOpenSandbox: () => void;
  isLightMode?: boolean;
}

const HERO_VIDEO_SRC = '/media/videos/company-overview-web.mp4?v=2';

interface Headline {
  lines: [string, string];
  gradientWords: string[];
}

const HEADLINES: Headline[] = [
  {
    lines: ['Engineering the Future with', 'Artificial Intelligence'],
    gradientWords: ['Future', 'Artificial', 'Intelligence'],
  },
  {
    lines: ['Building AI That Solves', 'Real Business Problems'],
    gradientWords: ['AI', 'Real', 'Business', 'Problems'],
  },
  {
    lines: ['From Ideas to', 'Intelligent Applications'],
    gradientWords: ['Intelligent', 'Applications'],
  },
];

const STATS = [
  { icon: Layers, value: 100, suffix: '+', label: 'Processes Automated', color: 'blue' as const },
  { icon: User, value: 95, suffix: '%', label: 'Manual Effort Saved', color: 'purple' as const },
  { icon: ShieldCheck, value: 24, suffix: '/7', label: 'AI Availability & Support', color: 'emerald' as const },
];

const TRUSTED_LOGOS = [
  { id: 'qlik', label: 'Qlik', icon: <span className="text-xl font-black">Q</span> },
  { id: 'powerbi', label: 'Power BI', icon: <BarChart2 className="w-5 h-5 text-yellow-400" /> },
  { id: 'aws', label: 'aws', icon: null },
  { id: 'azure', label: 'Azure', icon: <Triangle className="w-5 h-5 text-blue-400" /> },
  { id: 'gcp', label: 'Google Cloud', icon: <Cloud className="w-5 h-5 text-red-400" /> },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value;
}

function renderLineWords(line: string, gradientWords: string[]) {
  const normalizedGradient = gradientWords.map(w => w.toLowerCase());

  return line.split(' ').map((word, idx) => {
    const isGradient = normalizedGradient.includes(word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()) ||
      normalizedGradient.includes(word.toLowerCase());

    return (
      <React.Fragment key={`${word}-${idx}`}>
        <span
          className={
            isGradient
              ? 'hero-gradient-text'
              : undefined
          }
        >
          {word}
        </span>
        {idx < line.split(' ').length - 1 && ' '}
      </React.Fragment>
    );
  });
}

function HeroStatCard({
  stat,
  index,
  animate,
}: {
  stat: (typeof STATS)[number];
  index: number;
  animate: boolean;
}) {
  const count = useCountUp(stat.value, 1600 + index * 200, animate);
  const Icon = stat.icon;

  const colorMap = {
    blue: 'hero-stat-blue',
    purple: 'hero-stat-purple',
    emerald: 'hero-stat-emerald',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.85 + index * 0.12, ease: easeOut }}
      className={`hero-stat-card ${colorMap[stat.color]} group`}
    >
      <div className="hero-stat-icon">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-2xl sm:text-[1.65rem] font-black text-white tabular-nums tracking-tight">
          {count}{stat.suffix}
        </div>
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-400 leading-snug mt-0.5">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onScheduleDemo,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);



  return (
    <section
      className="dark-hero-canvas relative min-h-[100svh] flex flex-col overflow-hidden text-white bg-[#030712]"
      aria-label="Hero"
    >
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] opacity-40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 md:pt-36">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-12 lg:gap-16 min-h-[500px]">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="w-full lg:w-[45%] space-y-6 sm:space-y-7 text-left flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            >
              <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
                <span className="hero-badge-dot bg-blue-400" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-bold text-blue-100">
                  Innovating Beyond Software
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: easeOut }}
              className="hero-headline-block"
            >
              <TypewriterHeadline headlines={HEADLINES} renderLineWords={renderLineWords} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: easeOut }}
              className="text-[0.95rem] sm:text-base md:text-lg text-slate-300/90 max-w-md sm:max-w-xl leading-relaxed"
            >
              We build next-generation AI applications that automate work, accelerate decision-making, and transform businesses through intelligent software.
            </motion.p>

            {/* Mobile Video Container (shown only on small screens) */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.48, ease: easeOut }}
                className="w-full aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative my-6"
              >
                <img 
                  src="/media/videos/company-overview-poster.jpg" 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    isVideoReady ? 'opacity-0' : 'opacity-60'
                  }`}
                  alt="" 
                />
                <div className={`absolute inset-0 transition-opacity duration-1000 ${
                  isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={HERO_VIDEO_SRC}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={() => {
                      setIsVideoReady(true);
                      videoRef.current?.play().catch(() => {});
                    }}
                  />
                </div>
                {/* Sound Toggle Button (Mobile) */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-all shadow-xl"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: easeOut }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onExploreProducts}
                className="hero-btn-primary group w-full sm:w-auto justify-center"
                id="hero-explore-products-btn"
              >
                <span className="relative z-10 tracking-wide">Explore AI Accelerators</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => onScheduleDemo()}
                className="hero-btn-secondary group w-full sm:w-auto justify-center"
                id="hero-schedule-demo-btn"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20 group-hover:scale-110 transition-transform duration-300" />
                <span className="tracking-wide">Schedule a Demo</span>
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/5 mt-8"
            >
              {STATS.map((stat, idx) => (
                <HeroStatCard key={stat.label} stat={stat} index={idx} animate={statsVisible} />
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Desktop Video Card */}
          {!isMobile && (
            <div className="hidden lg:block w-[55%] h-full min-h-[480px]">
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: easeOut }}
                className="relative w-full h-full min-h-[480px] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                {/* Decorative border glow */}
                <div className="absolute inset-0 rounded-[2rem] border border-blue-500/20 pointer-events-none group-hover:border-blue-400/40 transition-colors duration-500 z-20" />
                
                {/* Static poster shown until video is fully buffered */}
                <img
                  src="/media/videos/company-overview-poster.jpg"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    isVideoReady ? 'opacity-0' : 'opacity-60'
                  }`}
                  alt=""
                />
                
                {/* Video Container */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${
                  isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={HERO_VIDEO_SRC}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    onCanPlay={() => {
                      setIsVideoReady(true);
                      videoRef.current?.play().catch(() => {});
                    }}
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none" />
                </div>

                {/* Sound Toggle Button (Desktop) - Top Right */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 shadow-2xl opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </motion.div>
            </div>
          )}

        </div>
      </div>

      <div className="relative z-10 w-full pb-6 sm:pb-8 md:pb-10 mt-auto overflow-hidden border-t border-white/5 bg-black/20 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-left text-[10px] sm:text-xs font-semibold text-slate-500 tracking-[0.18em] uppercase"
          >
            Trusted by forward-thinking teams worldwide
          </motion.p>
        </div>

        <div className="hero-logo-marquee relative">
          <div className="hero-logo-track">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, idx) => (
              <div key={`${logo.id}-${idx}`} className="hero-logo-item opacity-60 hover:opacity-100 transition-opacity">
                {logo.icon}
                <span className={logo.id === 'aws' ? 'text-xl font-black tracking-tighter' : ''}>{logo.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
