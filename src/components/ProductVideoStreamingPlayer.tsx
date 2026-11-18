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

// Verified dedicated video streams for products that have actual demo videos:
const DEDICATED_VIDEOS: Record<string, string> = {
  'ai-reporting-platform': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/Reporting%20tool.mp4',
  'qlik-to-powerbi-migration': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qlik-to-powerbi-demo.mp4',
  'qlik-to-powerbi': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qlik-to-powerbi-demo.mp4',
  'postgresql-to-sqlserver-migration': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/postgres-to-sqlserver-demo.mp4',
  'postgres-to-sql': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/postgres-to-sqlserver-demo.mp4',
  'ai-migration-factory-databricks-control-plane': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/SQL%20Server%20To%20Databricks.mp4',
  'sql-server-databricks-migration-platform': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/SQL%20Server%20To%20Databricks.mp4',
  'qa-ai-autonomous-testing-platform': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qa-testing-demo.mp4',
  'qa-testing-application': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qa-testing-demo.mp4',
  'qa-testing': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/qa-testing-demo.mp4',
  'ai-l1-support-agent': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/L1%20Automation%20Demo%20Video.mp4',
  'l1-automation': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/L1%20Automation%20Demo%20Video.mp4',
  'buildsmart-estimator': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/Buildsmart%20Demo%20Video.mp4',
  'buildsmart-360-civil-estimator': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/Buildsmart%20Demo%20Video.mp4',
  'buildsmart': 'https://pxkwgedplrygvqxbckxf.supabase.co/storage/v1/object/public/videos/Buildsmart%20Demo%20Video.mp4',
  'faceauth': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/faceauth-web.mp4',
  'gbti-smart-home-builder': '/media/videos/ai_smart_home_web.mp4',
  'packaging-optimization-platform': '/media/videos/ai_logistics_web.mp4',
  // Verified Power BI Dashboards
  'all-phase-dashboard': '/media/videos/powerbi/all-phase-dashboard-web.mp4',
  'application-analysis-report': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/application-analysis-report-web.mp4',
  'e-grow-analysis-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/e-grow-analysis-dashboard-web.mp4',
  'google-analytics-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/google-analytics-dashboard-web.mp4',
  'hva-score-analysis-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/hva-score-analysis-dashboard-web.mp4',
  'final-quality-inspection-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/final-quality-inspection-dashboard-web.mp4',
  'food-inspection-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/food-inspection-dashboard-web.mp4',
  'energy-consumption-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/energy-consumption-dashboard-web.mp4',
  'hr-analytics-dashboard': 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media/powerbi/hr-analytics-dashboard-web.mp4',
};

const getVideoForProduct = (id: string, title?: string, customUrl?: string): string => {
  // 1. If explicit valid customUrl provided, use it (ignore decommissioned doazlhotvvzmsngjbfne host)
  if (customUrl && customUrl.trim() !== '' && !customUrl.includes('doazlhotvvzmsngjbfne')) {
    return customUrl.trim();
  }

  const cleanId = (id || '').toLowerCase().trim();
  if (DEDICATED_VIDEOS[cleanId]) {
    return DEDICATED_VIDEOS[cleanId];
  }

  // 2. Exact/keyword lookup ONLY for products with real dedicated videos:
  const text = `${cleanId} ${title || ''}`.toLowerCase();
  if (text.includes('qlik') && text.includes('power bi')) {
    return DEDICATED_VIDEOS['qlik-to-powerbi-migration'];
  }
  if (text.includes('postgres') && text.includes('sql server')) {
    return DEDICATED_VIDEOS['postgresql-to-sqlserver-migration'];
  }
  if (text.includes('databricks') && (text.includes('migration') || text.includes('sql server'))) {
    return DEDICATED_VIDEOS['ai-migration-factory-databricks-control-plane'];
  }
  if (text.includes('qa-ai') || text.includes('autonomous testing') || (text.includes('qa') && text.includes('testing'))) {
    return DEDICATED_VIDEOS['qa-ai-autonomous-testing-platform'];
  }
  if (text.includes('l1') && (text.includes('automation') || text.includes('support agent'))) {
    return DEDICATED_VIDEOS['ai-l1-support-agent'];
  }
  if (text.includes('buildsmart')) {
    return DEDICATED_VIDEOS['buildsmart-estimator'];
  }
  if (text.includes('faceauth')) {
    return DEDICATED_VIDEOS['faceauth'];
  }
  if (text.includes('homescape') || text.includes('smart home')) {
    return DEDICATED_VIDEOS['gbti-smart-home-builder'];
  }
  if (text.includes('packaging optimization') || text.includes('logistics')) {
    return DEDICATED_VIDEOS['packaging-optimization-platform'];
  }
  if (text.includes('reporting tool') || text.includes('reporting studio') || text.includes('ai reporting')) {
    return DEDICATED_VIDEOS['ai-reporting-platform'];
  }

  // 3. For any application WITHOUT a dedicated video (e.g. Invoice Flow, AI Marketing Agent, Insight AI),
  // NEVER guess or assign a random/unrelated video! Return empty string.
  return '';
};

interface ProductVideoStreamingPlayerProps {
  productId: string;
  productTitle: string;
  imageUrl?: string;
  videoUrl?: string;
  compactMode?: boolean;
  isCinematic?: boolean;
  onToggleCinematic?: () => void;
  isActive?: boolean; // When false, stops playback (useful in slideshows)
  onVideoEnded?: () => void; // If provided, the video will not loop and will call this when ended
}

export const ProductVideoStreamingPlayer: React.FC<ProductVideoStreamingPlayerProps> = ({ 
  productId, 
  productTitle, 
  imageUrl,
  videoUrl,
  compactMode = false,
  isCinematic = false,
  onToggleCinematic,
  isActive = true,
  onVideoEnded
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffered, setIsBuffered] = useState(false);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const userPausedRef = useRef(false);

  // Sync HTML5 video element muted state with React isMuted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-mute/unmute when scrolling in and out of view
  useEffect(() => {
    if (!isActive) {
      // If the slide is inactive, make sure it's muted and paused
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const video = videoRef.current;
      if (!video) return;

      if (!entry.isIntersecting) {
        // Scrolled out of view -> pause to save resources
        video.pause();
        setIsPlaying(false);
      }
    }, { threshold: 0.5 }); // Trigger when 50% of the video is visible

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  // Reset buffered state whenever the video source changes (slide switch)
  useEffect(() => {
    setIsBuffered(false);
  }, [productId, videoUrl]);

  // Play/pause based on isActive prop
  useEffect(() => {
    if (!isActive) {
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
        userPausedRef.current = true;
        videoRef.current.pause();
      } else {
        userPausedRef.current = false;
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

  // If no dedicated video exists for this product, render the high-res project showcase image cleanly (no video player, no buffering indicator, no random fallback video)
  if (!videoSource) {
    return (
      <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-slate-950 select-none flex items-center justify-center group/image">
        {/* Main High-Res Showcase Image */}
        <img
          src={getValidImageUrl(imageUrl, undefined, productTitle, productId)}
          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
          alt={productTitle}
        />

        {/* Ambient Blurred Glow */}
        <img
          src={getValidImageUrl(imageUrl, undefined, productTitle, productId)}
          className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 pointer-events-none scale-110"
          alt=""
          aria-hidden="true"
        />

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-20" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-slate-950 select-none group/video flex items-center justify-center">
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
          <div className="flex items-center gap-2 bg-slate-950/75 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-40" />
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
        autoPlay={true}
        loop={!onVideoEnded}
        onEnded={onVideoEnded}
        muted={isMuted}
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration) && isFinite(videoRef.current.duration)) {
            setDuration(Math.min(30, videoRef.current.duration));
          }
          if (videoRef.current && !userPausedRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        onCanPlay={() => {
          setIsBuffered(true);
          if (videoRef.current && !userPausedRef.current) {
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
        <div className="absolute top-6 left-6 z-40 flex items-center gap-3 bg-slate-950/90 border border-white/15 px-4 py-2.5 rounded-2xl shadow-2xl">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-40"></span>
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
      <div className="absolute bottom-4 inset-x-4 z-40 opacity-100 md:opacity-0 group-hover/video:opacity-100 transition-opacity duration-500">
        <div className="bg-slate-950/85 border border-white/[0.08] rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-2">
          
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
};

export default ProductVideoStreamingPlayer;
