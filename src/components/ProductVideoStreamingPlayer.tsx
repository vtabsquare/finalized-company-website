import React, { useState, useRef, useEffect } from 'react';
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
}

// High quality tech/AI video loops
const SUPABASE_MEDIA = 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media';

const STREAMING_VIDEOS: Record<string, string> = {
  'ai-reporting-platform': 'https://assets.mixkit.co/videos/preview/mixkit-technological-hud-interface-with-data-and-graphs-42846-large.mp4',
  'qlik-to-powerbi-migration': `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  'gbti-smart-home-builder': 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-42838-large.mp4',
  'buildsmart-estimator': `${SUPABASE_MEDIA}/buildsmart.mp4`,
  'faceauth': `${SUPABASE_MEDIA}/faceauth.mp4`,
  'packaging-optimization-platform': 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-42838-large.mp4',
  'ai-l1-support-agent': `${SUPABASE_MEDIA}/l1_agent.mp4`,
  'postgresql-to-sqlserver-migration': 'https://assets.mixkit.co/videos/preview/mixkit-technological-hud-interface-with-data-and-graphs-42846-large.mp4',
  'all-phase-dashboard': `${SUPABASE_MEDIA}/powerbi/all-phase-dashboard.mp4`,
  'application-analysis-report': `${SUPABASE_MEDIA}/powerbi/application-analysis-report.mp4`,
  'e-grow-analysis-dashboard': `${SUPABASE_MEDIA}/powerbi/e-grow-analysis-dashboard.mp4`,
  'google-analytics-dashboard': `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`,
  'hva-score-analysis-dashboard': `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`,
  'final-quality-inspection-dashboard': `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`,
  'food-inspection-dashboard': `${SUPABASE_MEDIA}/powerbi/food-inspection-dashboard.mp4`,
  'energy-consumption-dashboard': `${SUPABASE_MEDIA}/powerbi/energy-consumption-dashboard.mp4`,
  'hr-analytics-dashboard': 'https://assets.mixkit.co/videos/preview/mixkit-technological-hud-interface-with-data-and-graphs-42846-large.mp4',
};

export const ProductVideoStreamingPlayer: React.FC<ProductVideoStreamingPlayerProps> = ({
  productId,
  productTitle,
  imageUrl,
  compactMode = false,
  onVideoEnd,
  isCinematic = false,
  onToggleCinematic,
  videoUrl
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [timecode, setTimecode] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30); // 30 second video demo loop
  const [streamLatency, setStreamLatency] = useState<number>(14);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync HTML5 video element muted state with React isMuted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Sync actual video duration and timecode from video element
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleTimeUpdate = () => {
      setTimecode(vid.currentTime);
      if (vid.duration && !isNaN(vid.duration)) {
        setDuration(vid.duration);
      }
    };

    vid.addEventListener('timeupdate', handleTimeUpdate);
    return () => vid.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

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
      setTimecode(0);
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const videoSource = videoUrl || STREAMING_VIDEOS[productId] || STREAMING_VIDEOS['ai-reporting-platform'];

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950 select-none group/video">
      {/* Video Stream Element */}
      <video
        ref={videoRef}
        src={videoSource}
        poster={imageUrl}
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={onVideoEnd}
        onTimeUpdate={() => {
          if (videoRef.current && videoRef.current.duration) {
            setDuration(Math.min(30, videoRef.current.duration));
          }
        }}
        className="w-full h-full object-cover object-center opacity-90 group-hover/video:opacity-100 transition-opacity"
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
        <div className="bg-black/70 backdrop-blur-3xl border border-white/[0.08] rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-2">
          
          {/* Interactive Seeking Progress Bar */}
          <div 
            onClick={(e) => {
              if (videoRef.current && videoRef.current.duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                videoRef.current.currentTime = pos * videoRef.current.duration;
                setTimecode(pos * videoRef.current.duration);
              }
            }}
            className="w-full bg-white/[0.08] h-1 rounded-full overflow-visible cursor-pointer relative group/progress hover:h-1.5 transition-all"
          >
            <div 
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-100 relative"
              style={{ width: `${(timecode / Math.max(duration, 1)) * 100}%` }}
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
              <span className="text-[11px] text-slate-400 font-mono tabular-nums tracking-wide">
                {formatTime(timecode)} <span className="text-white/20">/</span> {formatTime(duration)}
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

