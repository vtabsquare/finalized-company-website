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

const HERO_VIDEO_SRC = '/media/videos/company-overview-web.mp4';

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
      className="dark-hero-canvas relative min-h-[100svh] flex flex-col justify-end sm:justify-center overflow-hidden text-white"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Mobile Gradient Fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-slate-900 to-black sm:hidden" />
        
        {/* Desktop Video */}
        {!isMobile && (
          <>
            {/* Static poster shown until video is fully buffered */}
            <img
              src="/media/videos/company-overview-poster.jpg"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoReady ? 'opacity-0' : 'opacity-60'
              }`}
              alt=""
            />
            {/* Ken-burns wrapper — keeps animation off the video compositor layer */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}>
              <video
                ref={videoRef}
                className="hero-video-bg absolute inset-0 w-full h-full object-cover"
                src={HERO_VIDEO_SRC}
                loop
                muted
                playsInline
                preload="auto"
                onCanPlayThrough={() => {
                  setIsVideoReady(true);
                  videoRef.current?.play().catch(() => {});
                }}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          </>
        )}
        <div className="hero-cinematic-overlay absolute inset-0 hidden sm:block" />
        <div className="hero-film-grain absolute inset-0" />
        <div className="hero-vignette absolute inset-0 hidden sm:block" />
      </div>

      {/* Sound Toggle Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-28 right-6 sm:top-32 sm:right-8 z-30 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-all duration-300 shadow-xl"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 md:pt-36 md:pb-16 lg:pb-20">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-[42rem] space-y-5 sm:space-y-6 md:space-y-7 text-left">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
          >
            <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full">
              <span className="hero-badge-dot" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] font-bold text-slate-200">
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
            className="text-[0.95rem] sm:text-base md:text-lg text-slate-300/90 max-w-md sm:max-w-lg leading-relaxed"
          >
            We build next-generation AI applications that automate work, accelerate decision-making, and transform businesses through intelligent software.
          </motion.p>

          {/* Mobile Video Container */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.48, ease: easeOut }}
              className="sm:hidden w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl relative my-4"
            >
              <img 
                src="/media/videos/company-overview-poster.jpg" 
                className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40 scale-110"
                alt="" 
              />
              <video
                ref={videoRef}
                className="w-full h-full object-cover relative z-10"
                src={HERO_VIDEO_SRC}
                poster="/media/videos/company-overview-poster.jpg"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#030712]/80 to-transparent pointer-events-none" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: easeOut }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
          >
            <button
              onClick={onExploreProducts}
              className="hero-btn-primary group"
              id="hero-explore-products-btn"
            >
              <span className="relative z-10 tracking-wide">Explore AI Accelerators</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={() => onScheduleDemo()}
              className="hero-btn-secondary group"
              id="hero-schedule-demo-btn"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20 group-hover:scale-110 transition-transform duration-300" />
              <span className="tracking-wide">Schedule a Demo</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
            {STATS.map((stat, idx) => (
              <HeroStatCard key={stat.label} stat={stat} index={idx} animate={statsVisible} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full pb-6 sm:pb-8 md:pb-10 mt-auto overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5">
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
              <div key={`${logo.id}-${idx}`} className="hero-logo-item">
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
