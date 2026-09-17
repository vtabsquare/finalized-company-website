import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';
import { ScrollReveal } from './animations/ScrollReveal';
import {
  Wifi, ChevronLeft, ChevronRight, CheckCircle2, Activity,
  Maximize2, Minimize2, Play, Pause, Sparkles, Server,
  Cpu, BarChart2, Zap, Shield, Eye, Thermometer, Radio
} from 'lucide-react';

interface IoTCapability {
  icon: string;
  title: string;
  description: string;
}

interface IoTSignal {
  icon: string;
  label: string;
  detail: string;
  color: string;
}

interface IoTContent {
  id: string;
  header_badge: string;
  header_title: string;
  header_highlight: string;
  header_description: string;
  reference_app_badge: string;
  reference_app_title: string;
  benefits: string[];
  capabilities: IoTCapability[];
  signals: IoTSignal[];
  demo_video_url?: string | null;
  updated_at?: string;
}

interface IoTSectionProps {
  onScheduleDemo: (interest?: string) => void;
  isLightMode?: boolean;
}

const SUPABASE_MEDIA = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-media`;

function renderCapabilityIcon(name: string) {
  const cls = 'w-5 h-5';
  switch (name) {
    case 'Server':      return <Server className={cls} />;
    case 'Cpu':         return <Cpu className={cls} />;
    case 'BarChart2':   return <BarChart2 className={cls} />;
    case 'Zap':         return <Zap className={cls} />;
    case 'Shield':      return <Shield className={cls} />;
    case 'Eye':         return <Eye className={cls} />;
    case 'Thermometer': return <Thermometer className={cls} />;
    case 'Radio':       return <Radio className={cls} />;
    case 'Wifi':        return <Wifi className={cls} />;
    default:            return <Sparkles className={cls} />;
  }
}

export const IoTSection: React.FC<IoTSectionProps> = ({ onScheduleDemo, isLightMode = false }) => {
  const [content, setContent] = useState<IoTContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCinematic, setIsCinematic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCapIdx, setActiveCapIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    supabase
      .from('iot_content')
      .select('*')
      .limit(1)
      .single()
      .then(({ data, error }) => {
        if (data && !error) setContent(data as IoTContent);
        setLoading(false);
      });
  }, []);

  const capabilities = content?.capabilities || [];
  const activeCap = capabilities[activeCapIdx];

  const handlePrev = () => {
    setActiveCapIdx(i => (i - 1 + capabilities.length) % capabilities.length);
    setAnimKey(k => k + 1);
  };
  const handleNext = () => {
    setActiveCapIdx(i => (i + 1) % capabilities.length);
    setAnimKey(k => k + 1);
  };

  const videoUrl = content?.demo_video_url || `${SUPABASE_MEDIA}/custom/iot-videos/demo.mp4`;

  return (
    <section
      id="iot-section"
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        isLightMode
          ? 'bg-gradient-to-b from-slate-50 via-cyan-50/30 to-teal-50/20'
          : 'bg-slate-950/80'
      }`}
    >
      {/* Background glows */}
      <div className="glow-orb-blue top-20 right-10 opacity-20 absolute" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl bg-cyan-500/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isLightMode
                ? 'bg-cyan-100/80 border border-cyan-300 text-cyan-800'
                : 'bg-cyan-950/80 border border-cyan-500/30 text-cyan-300'
            }`}>
              <Wifi className="w-3.5 h-3.5 text-cyan-500" />
              <span>{loading ? 'Industrial IoT & Edge AI' : content?.header_badge || 'Industrial IoT & Edge AI'}</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              {loading ? 'AI-powered IoT for ' : content?.header_title || 'AI-powered IoT for '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                {loading ? 'real-time operations' : content?.header_highlight || 'real-time operations'}
              </span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              {loading
                ? 'VTab Square engineers intelligent IoT applications that connect physical infrastructure with AI—helping industrial teams monitor health, identify risks, and act on live operational signals.'
                : content?.header_description}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Featured Showcase (Video Carousel) ── */}
        <ScrollReveal animation="fade-up" delay={0.15}>
          {loading ? (
            <div className={`w-full h-[600px] flex items-center justify-center border-y ${isLightMode ? 'border-slate-200' : 'border-white/5'}`}>
              <div className={`animate-pulse flex flex-col items-center gap-4 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
                <Wifi className="w-8 h-8" />
                <span className="text-sm font-semibold tracking-widest uppercase">Loading IoT Showcase...</span>
              </div>
            </div>
          ) : capabilities.length > 0 ? (
            <div className={`relative w-full overflow-hidden flex flex-col border-y transition-colors duration-300 rounded-2xl ${
              isLightMode
                ? 'bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/20 border-slate-200/80 shadow-xl'
                : 'bg-[#030712] border-white/5'
            }`}>

              {/* Desktop layout */}
              <div className="relative min-h-[600px] hidden lg:block">

                {/* Gradient masks over video */}
                <div className="absolute inset-0 z-0 flex justify-end">
                  <div className={`absolute inset-0 z-10 w-2/3 transition-opacity duration-700 ${
                    isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  } ${isLightMode
                      ? 'bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent'
                      : 'bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent'
                  }`} />
                  <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${
                    isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  } ${isLightMode
                      ? 'bg-gradient-to-t from-slate-50 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[#030712] via-transparent to-transparent'
                  }`} />

                  {/* Video player */}
                  <div className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCinematic
                      ? 'w-full opacity-100 mix-blend-normal z-30'
                      : isLightMode
                        ? 'w-full lg:w-[65%] opacity-95 mix-blend-normal shadow-2xl rounded-r-2xl overflow-hidden border-l border-slate-200/80 z-0'
                        : 'w-full lg:w-[65%] opacity-70 mix-blend-screen z-0'
                  }`}>
                    <ProductVideoStreamingPlayer
                      key={`iot-video-${activeCapIdx}`}
                      productId="iot-showcase"
                      productTitle={activeCap?.title || 'IoT Demo'}
                      imageUrl=""
                      videoUrl={videoUrl}
                      compactMode={false}
                      isCinematic={isCinematic}
                      onToggleCinematic={() => setIsCinematic(!isCinematic)}
                      isActive={true}
                      onVideoEnded={() => { if (isPlaying) handleNext(); }}
                    />
                  </div>
                </div>

                {/* Left text content */}
                <div className={`relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-8 py-8 h-full flex flex-col justify-center ${
                  isCinematic ? 'pointer-events-none' : ''
                }`}>
                  <div className={`mb-6 transition-all duration-700 ${isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100'}`}>
                    <span className={`px-4 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md ${
                      isLightMode
                        ? 'bg-cyan-50/80 border-cyan-200/80 text-cyan-700'
                        : 'bg-white/5 border-white/10 text-slate-300'
                    }`}>
                      IoT Capability Showcase
                    </span>
                  </div>

                  <div key={animKey} className={`w-full lg:w-[55%] space-y-5 transition-all duration-700 ease-out fill-mode-both ${
                    isCinematic
                      ? 'opacity-0 -translate-x-12 pointer-events-none'
                      : 'opacity-100 translate-x-0 animate-in fade-in slide-in-from-left-8 duration-700'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-xl ${
                        isLightMode
                          ? 'bg-gradient-to-br from-cyan-700 to-teal-600 border-cyan-500/20 text-white shadow-cyan-500/20'
                          : 'bg-black/60 border-white/15 text-cyan-400'
                      }`}>
                        {renderCapabilityIcon(activeCap?.icon || 'Wifi')}
                      </div>
                      <div>
                        <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-1 ${
                          isLightMode ? 'text-cyan-600' : 'text-cyan-400'
                        }`}>
                          Industrial IoT & Edge AI
                        </span>
                        <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                          isLightMode ? 'text-slate-900' : 'text-white'
                        }`}>
                          {activeCap?.title || 'AI Server Health'}
                        </h3>
                      </div>
                    </div>

                    <p className={`text-sm sm:text-base leading-relaxed max-w-2xl font-medium ${
                      isLightMode ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {activeCap?.description}
                    </p>

                    {/* Signal indicators */}
                    {content?.signals && content.signals.length > 0 && (
                      <div className={`p-4 rounded-2xl border backdrop-blur-md max-w-lg ${
                        isLightMode
                          ? 'bg-white/90 border-slate-200 shadow-sm'
                          : 'bg-black/40 border-white/10'
                      }`}>
                        <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${isLightMode ? 'border-slate-100' : 'border-white/5'}`}>
                          <span className={`text-[9px] uppercase font-bold tracking-[0.2em] ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
                            {content?.reference_app_badge || 'Reference Application'}
                          </span>
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ml-auto" />
                          <span className={`text-[9px] font-bold ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`}>LIVE</span>
                        </div>
                        <div className="space-y-2">
                          {content.signals.slice(0, 3).map((sig, i) => (
                            <div key={i} className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-lg ${
                              isLightMode ? 'bg-slate-50' : 'bg-white/5'
                            }`}>
                              <span className={`font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                                {sig.label}
                              </span>
                              <span className={`text-[10px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                {sig.detail}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                sig.color.includes('emerald') ? 'bg-emerald-500/15 text-emerald-400' :
                                sig.color.includes('cyan') ? 'bg-cyan-500/15 text-cyan-400' :
                                'bg-blue-500/15 text-blue-400'
                              }`}>CONNECTED</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    {content?.benefits && content.benefits.filter(Boolean).length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                        {content.benefits.filter(Boolean).map((benefit, idx) => (
                          <div key={idx} className={`flex items-start gap-2.5 border px-3.5 py-2.5 rounded-xl backdrop-blur-md transition-all ${
                            isLightMode
                              ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-800 hover:border-cyan-300'
                              : 'bg-black/40 border-white/5 text-slate-200'
                          }`}>
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLightMode ? 'text-cyan-600' : 'text-emerald-400'}`} />
                            <span className="text-xs font-semibold leading-relaxed">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => onScheduleDemo('IoT & Edge AI')}
                        className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 hover:from-cyan-500 hover:via-teal-500 hover:to-cyan-600 shadow-xl shadow-cyan-600/25 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
                      >
                        <span className="tracking-wide">Request IoT Demo</span>
                        <Activity className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onScheduleDemo('IoT Solution Blueprint')}
                        className={`px-6 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl transition-all flex items-center gap-2.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                          isLightMode
                            ? 'text-slate-800 bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-lg'
                            : 'text-slate-100 bg-slate-900/80 hover:bg-slate-800/90 border-white/15 hover:border-white/30 hover:shadow-xl'
                        }`}
                      >
                        <Wifi className={`w-4 h-4 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
                        <span className="tracking-wide">Get Solution Blueprint</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Top right controls */}
                <div className="absolute top-3 right-3 sm:top-8 sm:right-8 lg:right-12 z-30 hidden lg:flex flex-wrap items-center gap-2 max-w-[calc(100%-1.5rem)] justify-end">
                  <button
                    onClick={() => setIsCinematic(!isCinematic)}
                    className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
                      isCinematic
                        ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 hover:border-amber-400'
                        : isLightMode
                          ? 'bg-white hover:bg-cyan-50/80 border-cyan-200 text-cyan-600 shadow-md hover:border-cyan-300'
                          : 'bg-gradient-to-r from-cyan-600/30 to-teal-500/30 hover:from-cyan-600/50 hover:to-teal-500/50 border-cyan-400/50 text-cyan-300 animate-pulse'
                    }`}
                    title={isCinematic ? 'Show Text' : 'Expand Video'}
                  >
                    {isCinematic ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-cyan-500" />}
                    <span className="hidden sm:inline text-sm font-bold">{isCinematic ? 'Show Text' : 'Expand Video'}</span>
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
                      isLightMode
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-md'
                        : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    {isPlaying
                      ? <Pause className={`w-4 h-4 ${isLightMode ? 'text-amber-600' : 'text-amber-400'}`} />
                      : <Play className={`w-4 h-4 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />}
                    <span className="hidden sm:inline text-sm font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button onClick={handlePrev} className={`w-11 h-11 shrink-0 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-md ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'
                  }`}>
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={handleNext} className={`w-11 h-11 shrink-0 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-md ${
                    isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'
                  }`}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Dot Navigation */}
                <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-2.5 p-2.5 rounded-full border backdrop-blur-xl shadow-2xl ${
                  isLightMode ? 'bg-white/80 border-slate-300' : 'bg-black/40 border-white/10'
                }`}>
                  {capabilities.map((cap, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveCapIdx(idx); setIsPlaying(false); setAnimKey(k => k + 1); }}
                      title={cap.title}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeCapIdx
                          ? 'w-6 h-2 bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                          : isLightMode ? 'w-2 h-2 bg-slate-400 hover:bg-slate-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile layout */}
              <div className="flex flex-col lg:hidden">
                <div className="relative w-full aspect-video overflow-hidden">
                  <ProductVideoStreamingPlayer
                    key={`iot-mobile-${activeCapIdx}`}
                    productId="iot-showcase-mobile"
                    productTitle={activeCap?.title || 'IoT Demo'}
                    imageUrl=""
                    videoUrl={videoUrl}
                    compactMode={false}
                    isCinematic={false}
                    onToggleCinematic={() => {}}
                    isActive={true}
                    onVideoEnded={() => { if (isPlaying) handleNext(); }}
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-16 ${isLightMode ? 'bg-gradient-to-t from-slate-50' : 'bg-gradient-to-t from-[#030712]'}`} />
                </div>

                <div key={animKey} className="px-4 py-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-xl shrink-0 ${
                      isLightMode ? 'bg-gradient-to-br from-cyan-700 to-teal-600 border-cyan-500/20 text-white' : 'bg-black/60 border-white/15 text-cyan-400'
                    }`}>
                      {renderCapabilityIcon(activeCap?.icon || 'Wifi')}
                    </div>
                    <div>
                      <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-0.5 ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
                        Industrial IoT & Edge AI
                      </span>
                      <h3 className={`text-xl font-extrabold tracking-tight leading-tight line-clamp-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {activeCap?.title}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed font-medium line-clamp-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                    {activeCap?.description}
                  </p>

                  {content?.benefits?.filter(Boolean).slice(0, 3).map((b, i) => (
                    <div key={i} className={`flex items-start gap-2 border px-3 py-2 rounded-xl backdrop-blur-md ${
                      isLightMode ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-800' : 'bg-black/40 border-white/5 text-slate-200'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLightMode ? 'text-cyan-600' : 'text-emerald-400'}`} />
                      <span className="text-xs font-semibold leading-relaxed">{b}</span>
                    </div>
                  ))}

                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      onClick={() => onScheduleDemo('IoT & Edge AI')}
                      className="w-full px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 shadow-xl shadow-cyan-600/25 border border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span className="tracking-wide">Request IoT Demo</span>
                      <Activity className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile nav bar */}
                <div className={`flex items-center justify-between px-4 py-3 border-t ${isLightMode ? 'border-slate-200 bg-white/60' : 'border-white/5 bg-black/40'}`}>
                  <button onClick={handlePrev} className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-slate-300'}`}>
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-xl ${isLightMode ? 'bg-white/80 border-slate-300' : 'bg-black/40 border-white/10'}`}>
                    {capabilities.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setActiveCapIdx(idx); setIsPlaying(false); setAnimKey(k => k + 1); }}
                        className={`rounded-full transition-all duration-300 cursor-pointer ${
                          idx === activeCapIdx
                            ? 'w-6 h-2 bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                            : isLightMode ? 'w-2 h-2 bg-slate-400' : 'w-2 h-2 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <button onClick={handleNext} className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-slate-300'}`}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </ScrollReveal>

        {/* ── Capabilities Grid Cards ── */}
        {!loading && capabilities.length > 0 && (
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {capabilities.map((cap, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveCapIdx(idx); setAnimKey(k => k + 1); document.getElementById('iot-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={`text-left backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col p-6 group relative overflow-hidden transition-all duration-500 border hover:-translate-y-2 cursor-pointer ${
                    isLightMode
                      ? 'bg-white/95 border-slate-200/90 hover:border-cyan-500/80 shadow-slate-200/60 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]'
                      : `bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 hover:border-cyan-500/50 shadow-black/60 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] ${activeCapIdx === idx ? 'border-cyan-500/50' : ''}`
                  }`}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-all ${
                    isLightMode
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-600'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  }`}>
                    {renderCapabilityIcon(cap.icon)}
                  </div>

                  <h3 className={`text-base font-bold mb-2 transition-colors ${
                    isLightMode ? 'text-slate-900 group-hover:text-cyan-700' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {cap.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    {cap.description}
                  </p>

                  <div className={`mt-4 pt-4 border-t flex items-center justify-between ${isLightMode ? 'border-slate-100' : 'border-white/10'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isLightMode ? 'text-cyan-600' : 'text-cyan-400'}`}>
                      Watch Demo
                    </span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isLightMode ? 'bg-cyan-100 text-cyan-600' : 'bg-cyan-500/10 text-cyan-400'}`}>
                      <Play className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
