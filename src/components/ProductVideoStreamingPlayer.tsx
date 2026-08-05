import React, { useState, useRef, useEffect } from 'react';
import { getValidImageUrl } from '../utils/imageFallback';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Radio, 
  Activity, 
  ShieldCheck, 
  Sparkles,
  RotateCcw,
  Zap,
  Minimize2
} from 'lucide-react';

interface ProductVideoStreamingPlayerProps {
  productId: string;
  productTitle: string;
  imageUrl?: string;
  compactMode?: boolean;
  onVideoEnd?: () => void;
  isCinematic?: boolean;
  onToggleCinematic?: () => void;
  videoUrl?: string;
  isActive?: boolean;
}

// High quality tech/AI video loops
const SUPABASE_MEDIA = 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media';

const STREAMING_VIDEOS: Record<string, string> = {
  'ai-reporting-platform': `${SUPABASE_MEDIA}/powerbi/application-analysis-report.mp4`,
  'qlik-to-powerbi-migration': `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  'gbti-smart-home-builder': '/media/videos/ai_smart_home_web.mp4',
  'buildsmart-estimator': `${SUPABASE_MEDIA}/buildsmart.mp4`,
  'faceauth': `${SUPABASE_MEDIA}/faceauth.mp4`,
  'packaging-optimization-platform': '/media/videos/ai_logistics_web.mp4',
  'ai-l1-support-agent': `${SUPABASE_MEDIA}/l1_agent.mp4`,
  'postgresql-to-sqlserver-migration': `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  'all-phase-dashboard': '/media/videos/powerbi/all-phase-dashboard-web.mp4',
  'application-analysis-report': `${SUPABASE_MEDIA}/powerbi/application-analysis-report.mp4`,
  'e-grow-analysis-dashboard': `${SUPABASE_MEDIA}/powerbi/e-grow-analysis-dashboard.mp4`,
  'google-analytics-dashboard': `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`,
  'hva-score-analysis-dashboard': `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`,
  'final-quality-inspection-dashboard': `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`,
  'food-inspection-dashboard': `${SUPABASE_MEDIA}/powerbi/food-inspection-dashboard.mp4`,
  'energy-consumption-dashboard': `${SUPABASE_MEDIA}/powerbi/energy-consumption-dashboard.mp4`,
  'hr-analytics-dashboard': '/media/videos/powerbi/hr-analytics-dashboard.mp4',
};

const DEFAULT_VIDEO_POOL = [
  `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/e-grow-analysis-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/food-inspection-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/energy-consumption-dashboard.mp4`,
  `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  `${SUPABASE_MEDIA}/buildsmart.mp4`,
  '/media/videos/ai_logistics_web.mp4',
  '/media/videos/ai_smart_home_web.mp4',
];

const getVideoForProduct = (id: string, title?: string, customUrl?: string): string => {
  if (customUrl && customUrl.trim() !== '') return customUrl;
  
  const cleanId = (id || '').toLowerCase().trim();
  if (STREAMING_VIDEOS[cleanId]) return STREAMING_VIDEOS[cleanId];

  const text = `${cleanId} ${title || ''}`.toLowerCase();
  if (text.includes('sql') || text.includes('db') || text.includes('database') || text.includes('migration')) {
    return `${SUPABASE_MEDIA}/qlik2powerbi.mp4`;
  }
  if (text.includes('home') || text.includes('energy') || text.includes('builder') || text.includes('smart')) {
    return '/media/videos/ai_smart_home.mp4';
  }
  if (text.includes('packaging') || text.includes('logistics') || text.includes('shipping') || text.includes('supply')) {
    return '/media/videos/ai_logistics.mp4';
  }
  if (text.includes('inspection') || text.includes('quality') || text.includes('food')) {
    return `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`;
  }
  if (text.includes('analytics') || text.includes('marketing') || text.includes('sales') || text.includes('customer') || text.includes('sample')) {
    return `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`;
  }
  if (text.includes('score') || text.includes('hr') || text.includes('employee') || text.includes('support')) {
    return `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`;
  }

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % DEFAULT_VIDEO_POOL.length;
  return DEFAULT_VIDEO_POOL[index];
};

export const ProductVideoStreamingPlayer: React.FC<ProductVideoStreamingPlayerProps> = React.memo(({
  productId,
  productTitle,
  imageUrl,
  compactMode = false,
  onVideoEnd,
  isCinematic = false,
  onToggleCinematic,
  videoUrl,
  isActive = true
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(isActive);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(30);
  const [isBuffered, setIsBuffered] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>();

  // Reset buffered state whenever the video source changes (slide switch)
  useEffect(() => {
    setIsBuffered(false);
  }, [productId, videoUrl]);

  // Play/pause based on isActive prop
  useEffect(() => {
    if (isActive) {
      setIsPlaying(true);
      videoRef.current?.play().catch(() => {});
    } else {
      setIsPlaying(false);
      videoRef.current?.pause();
    }
  }, [isActive]);

  // Sync HTML5 video element muted state with React isMuted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // High-performance DOM update loop for progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const updateProgress = () => {
      const vid = videoRef.current;
      if (vid && progressRef.current && timecodeRef.current) {
        const current = vid.currentTime;
        const dur = Math.max(vid.duration && !isNaN(vid.duration) && isFinite(vid.duration) ? vid.duration : duration, 1);
        
        // Mutate DOM directly to prevent React re-renders 60x/sec
        progressRef.current.style.width = `${(current / dur) * 100}%`;
        timecodeRef.current.textContent = `${formatTime(current)} / ${formatTime(dur)}`;
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleToggleCinematic = () => {
    if (!isCinematic) {
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    }
    if (onToggleCinematic) onToggleCinematic();
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      if (progressRef.current) progressRef.current.style.width = '0%';
      if (timecodeRef.current) timecodeRef.current.textContent = `00:00 / ${formatTime(duration)}`;
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const videoSource = getVideoForProduct(productId, productTitle, videoUrl);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 select-none group/video flex items-center justify-center">
      {/* Poster shown while buffering - instant image, no flicker */}
      <img
        src={getValidImageUrl(imageUrl, undefined, productTitle, productId)}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-20 transition-opacity duration-700 ${
          isBuffered ? 'opacity-0' : 'opacity-100'
        }`}
        alt=""
      />

      {/* Ambient Blurred Background */}
      <img
        src={getValidImageUrl(imageUrl, undefined, productTitle, productId)}
        className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40 pointer-events-none scale-110"
        alt="Ambient background"
      />

      {/* Loading pulse indicator - only while buffering */}
      {!isBuffered && (
        <div className="absolute inset-0 z-30 flex items-end justify-start p-4 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">Buffering...</span>
          </div>
        </div>
      )}

      {/* Main Video Stream Element */}
      <video
        ref={videoRef}
        src={videoSource}
        autoPlay={isActive}
        loop
        muted={isMuted}
        playsInline
        preload={isActive ? "auto" : "none"}
        onLoadedMetadata={() => {
          if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
            setDuration(Math.min(30, videoRef.current.duration));
          }
        }}
        onCanPlayThrough={() => {
          setIsBuffered(true);
          if (isActive && videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        className={`relative z-10 w-full h-full object-contain transition-opacity duration-700 ${
          isBuffered ? 'opacity-100' : 'opacity-0'
        }`}
      />



      {/* Expanded Cinematic Title Badge Overlay */}
      {isCinematic && (
        <div className="absolute top-6 left-6 z-40 flex items-center gap-3 bg-slate-950/85 backdrop-blur-2xl border border-white/15 px-4 py-2.5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <div>
            <span className="text-[9px] font-extrabold tracking-[0.2em] text-cyan-400 block uppercase font-sans">
              DEMO SHOWCASE
            </span>
            <h4 className="text-sm sm:text-base font-heading font-extrabold text-white tracking-tight font-sans">
              {productTitle}
            </h4>
          </div>
        </div>
      )}

      {/* Bottom Floating Glass Control HUD — Premium Design */}
      <div className="absolute bottom-4 inset-x-4 z-40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-500">
        <div className="bg-black/70 backdrop-blur-md border border-white/[0.08] rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-2">
          
          {/* Interactive Seeking Progress Bar */}
          <div 
            onClick={(e) => {
              if (videoRef.current && videoRef.current.duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                videoRef.current.currentTime = pos * videoRef.current.duration;
                // Force an immediate DOM update for responsiveness
                if (progressRef.current) progressRef.current.style.width = `${pos * 100}%`;
                if (timecodeRef.current) timecodeRef.current.textContent = `${formatTime(pos * videoRef.current.duration)} / ${formatTime(duration)}`;
              }
            }}
            className="w-full bg-white/[0.08] h-1 rounded-full overflow-visible cursor-pointer relative group/progress hover:h-1.5 transition-all"
          >
            <div 
              ref={progressRef}
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-100 relative"
              style={{ width: '0%' }}
            >
              {/* Scrub dot */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)] opacity-0 group-hover/progress:opacity-100 transition-opacity scale-75 group-hover/progress:scale-100" />
            </div>
          </div>

          {/* Control Buttons & Indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/[0.12] hover:bg-white/[0.2] text-white transition-all cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                className={`w-8 h-8 rounded-full transition-all cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95 ${
                  !isMuted
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              {/* Divider */}
              <div className="w-px h-4 bg-white/[0.08] mx-0.5" />

              {/* Timecode */}
              <span ref={timecodeRef} className="text-[11px] text-slate-400 font-mono tabular-nums tracking-wide">
                00:00 <span className="text-white/20">/</span> {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Product title label */}
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest hidden lg:inline-block font-sans">
                {productTitle}
              </span>

              {/* Divider */}
              <div className="w-px h-4 bg-white/[0.08] mx-0.5 hidden sm:block" />

              {onToggleCinematic && (
                <button
                  onClick={handleToggleCinematic}
                  className={`w-8 h-8 rounded-full transition-all cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95 ${
                    isCinematic 
                      ? 'bg-amber-500/20 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)]' 
                      : 'bg-white/[0.06] hover:bg-white/[0.15] text-slate-400 hover:text-white'
                  }`}
                  title={isCinematic ? 'Exit Full View' : 'Expand Video'}
                >
                  {isCinematic ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default ProductVideoStreamingPlayer;
