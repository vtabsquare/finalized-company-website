import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Check,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Zap,
  Layers,
  Server,
  Activity,
  Database,
  Cpu,
  Sparkles,
  Terminal,
  FileText,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Download,
  Lock,
  ExternalLink,
  RotateCcw,
  Sparkle
} from 'lucide-react';
import { Product } from '../types';
import { FiveScreenArchitectureData } from '../types/architecture';
import { LiveApplicationSandbox } from './LiveApplicationSandbox';
import { SmartVideo } from './SmartVideo';

interface DynamicArchitectureDetailPageProps {
  product: Product;
  architectureData: FiveScreenArchitectureData;
  onBack: () => void;
  onScheduleDemo: (interestArea?: string) => void;
  embedUrl?: string;
  isLightMode?: boolean;
}

export const DynamicArchitectureDetailPage: React.FC<DynamicArchitectureDetailPageProps> = ({
  product,
  architectureData,
  onBack,
  onScheduleDemo,
  embedUrl,
  isLightMode = false,
}) => {
  const stages = architectureData.pipelineStages || [];
  const capabilities = architectureData.capabilities || [];
  const layers = architectureData.deepDiveLayers || [];
  const editions = architectureData.editions || [];

  const [activeStageId, setActiveStageId] = useState<string>(stages[0]?.id || 'stage-1');
  const [activeCapId, setActiveCapId] = useState<string>(capabilities[0]?.id || 'cap-1');
  const [isMuted, setIsMuted] = useState(true);
  const [isCinematic, setIsCinematic] = useState(false);

  const heroRootRef = useRef<HTMLElement>(null);
  const heroTarget = useRef({ x: 0, y: 0 });

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];
  const activeCap = capabilities.find((c) => c.id === activeCapId) || capabilities[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${product.title} | VTAB Enterprise Architecture`;
  }, [product.title]);

  // Subtle 3D cursor tilt on the hero
  useEffect(() => {
    const root = heroRootRef.current;
    if (!root) return;

    let rafId: number;
    let currX = 0;
    let currY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      heroTarget.current = { x: nx, y: ny };
    };

    const onPointerLeave = () => {
      heroTarget.current = { x: 0, y: 0 };
    };

    const loop = () => {
      currX += (heroTarget.current.x - currX) * 0.08;
      currY += (heroTarget.current.y - currY) * 0.08;
      root.style.setProperty('--cursor-tilt-x', `${currX * 5}deg`);
      root.style.setProperty('--cursor-tilt-y', `${-currY * 5}deg`);
      rafId = requestAnimationFrame(loop);
    };

    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const videoUrl = product.detailContent?.videoUrl || (product as any).videoUrl;
  const pptUrl = product.detailContent?.pptUrl;

  return (
    <div
      className={`relative w-full min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300 ${
        isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#030712] text-slate-100'
      }`}
    >
      {/* ── 1. FIXED FLOATING TOP NAVIGATION BAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b py-3 px-4 sm:px-8 ${
          isLightMode
            ? 'bg-white/90 border-slate-200/80 shadow-sm'
            : 'bg-[#030712]/90 border-white/10 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Back to Home + Product Indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80 hover:border-cyan-400/50'
              }`}
              aria-label="Back to Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-cyan-400">
                {architectureData.topBadge || product.title}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-cyan-400/40 bg-cyan-950/60 text-cyan-300">
                ENTERPRISE STABLE
              </span>
            </div>
          </div>

          {/* Right Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {embedUrl && (
              <button
                onClick={() => scrollToSection('interactive-sandbox')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-[#071328]/90 hover:bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.15)]'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-cyan-300 text-cyan-300" />
                <span>Try Demo</span>
              </button>
            )}

            <button
              onClick={() => onScheduleDemo(product.title)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:shadow-[0_0_28px_rgba(0,210,255,0.85)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Schedule Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO SECTION: 3D ENTERPRISE EXPERIENCE ── */}
      <section
        ref={heroRootRef}
        className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Ambient atmospheric glows */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-cyan-500/20 via-blue-600/15 to-transparent blur-[140px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute top-[30%] -left-[10%] w-[600px] h-[500px] bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Narrative Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="uppercase font-semibold">
                  {architectureData.eyebrow || `ENTERPRISE SOLUTION · ${product.category || 'ARCHITECTURE'}`}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-sans leading-[1.1]">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl">
                {product.fullDescription || product.shortDescription || architectureData.pipelineDescription}
              </p>

              {/* Impact Metric (if present) */}
              {product.impactMetric && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{product.impactMetric}</span>
                </div>
              )}

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onScheduleDemo(product.title)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white font-bold font-sans text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Schedule Technical Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {stages.length > 0 && (
                  <button
                    onClick={() => scrollToSection('pipeline-architecture')}
                    className="px-6 py-3.5 rounded-xl border border-slate-700 hover:border-cyan-400/60 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 hover:text-white font-semibold font-sans text-sm transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Explore Specifications</span>
                    <Layers className="w-4 h-4 text-cyan-400" />
                  </button>
                )}

                {pptUrl && (
                  <a
                    href={pptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-950/60 text-slate-300 hover:text-white font-mono text-xs transition-all inline-flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download PPT</span>
                  </a>
                )}
              </div>

              {/* Tech Stack Pills */}
              {product.techStack && product.techStack.length > 0 && (
                <div className="pt-4 flex flex-wrap gap-2">
                  {product.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Visual Console Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-cyan-500/30 bg-[#070D1B]/90 backdrop-blur-xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden group">
                
                {/* Console Chrome Top Bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 text-xs font-mono text-slate-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                      {product.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {videoUrl && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    )}
                    <button
                      onClick={() => setIsCinematic(true)}
                      className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Expand Preview"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Media Stage: Video or Image */}
                <div className="relative rounded-xl overflow-hidden bg-black/90 aspect-video flex items-center justify-center">
                  {videoUrl ? (
                    <SmartVideo
                      src={videoUrl}
                      title={product.title}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <Cpu className="w-12 h-12 text-cyan-400/60 animate-pulse" />
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                        Interactive Architecture Topology
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1B]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Live Console Footer */}
                <div className="mt-3 px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">CLUSTER STATUS</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">ONLINE · 99.98% SLA</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. LIVE APPLICATION SANDBOX (IF EMBED URL CONFIGURED) ── */}
      {embedUrl && (
        <LiveApplicationSandbox
          embedUrl={embedUrl}
          productTitle={product.title}
          subtitle="Direct live application telemetry deployed from our production cluster. Test workspace and application capabilities in real time below."
          themeColor="cyan"
          isLightMode={isLightMode}
        />
      )}

      {/* ── 4. SCREEN 1 (CONT.): END-TO-END PIPELINE ARCHITECTURE (4 STAGES) ── */}
      {stages.length > 0 && (
        <section
          id="pipeline-architecture"
          className="relative py-20 lg:py-28 bg-[#070A14] border-t border-slate-800/80 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>{architectureData.eyebrow || 'PIPELINE ARCHITECTURE'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                {architectureData.pipelineHeadline || 'Engineered for seamless enterprise workflows.'}
              </h2>
              {architectureData.pipelineDescription && (
                <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                  {architectureData.pipelineDescription}
                </p>
              )}
            </div>

            {/* Pipeline Stage Tabs */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(stages.length, 4)} gap-3 mb-10`}>
              {stages.map((stage) => {
                const isActive = stage.id === activeStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'border-cyan-400/80 bg-gradient-to-b from-cyan-950/40 to-slate-900/80 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-mono font-semibold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                        STAGE {stage.stageNumber}
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                    </div>
                    <div className="text-sm font-semibold text-white font-sans">
                      {stage.stageHeadline}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {stage.stageTag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Display */}
            {activeStage && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Details Card */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                      {activeStage.stageTag}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                      {activeStage.stageHeadline}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1">
                      {activeStage.stageDescription}
                    </p>
                  </div>

                  {/* Execution Bullets */}
                  {activeStage.bullets && activeStage.bullets.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {activeStage.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <span className="text-sm text-slate-200 font-sans leading-relaxed">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Badges */}
                  {activeStage.bottomBadges && activeStage.bottomBadges.length > 0 && (
                    <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                      {activeStage.bottomBadges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-800/50 text-cyan-300"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Live Stream Box */}
                <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-[#0A0E1A]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-xl shadow-cyan-500/5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                        ACTIVE NODE: {activeStage.activeNode || 'GATEWAY'}
                      </span>
                    </div>
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </div>

                  {/* Stream Telemetry list */}
                  {activeStage.streamStates && activeStage.streamStates.length > 0 && (
                    <div className="space-y-3 font-mono text-xs">
                      {activeStage.streamStates.map((st, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/70 flex items-center justify-between"
                        >
                          <span className="text-slate-300">{st.name}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                            {st.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Filter Status */}
                  {activeStage.filterStatus && (
                    <div className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-300/90 leading-relaxed">
                      {activeStage.filterStatus}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. SCREEN 2: INTERACTIVE STUDIO CAPABILITIES (6 TABS) ── */}
      {capabilities.length > 0 && (
        <section
          id="capabilities"
          className="relative py-20 lg:py-28 bg-[#050811] border-t border-slate-800/80 overflow-hidden"
        >
          {/* Radial glow */}
          <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STUDIO CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                {architectureData.capabilitiesHeadline || 'Interactive System Capabilities'}
              </h2>
              {architectureData.capabilitiesDescription && (
                <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                  {architectureData.capabilitiesDescription}
                </p>
              )}
            </div>

            {/* Capability Tabs */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(capabilities.length, 6)} gap-2 sm:gap-3 mb-10`}>
              {capabilities.map((cap) => {
                const isActive = cap.id === activeCapId;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveCapId(cap.id)}
                    className={`p-3 sm:p-4 rounded-xl text-left border transition-all cursor-pointer relative ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />
                    )}
                    <div className={`text-xs font-mono font-bold mb-1 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {cap.shortName || cap.name}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white font-sans line-clamp-2">
                      {cap.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Capability Display Grid */}
            {activeCap && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
                {/* Left Details Box */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-mono bg-cyan-950/50 border border-cyan-800/60 text-cyan-300">
                      {activeCap.categoryTag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                      {activeCap.headline}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-1">
                      {activeCap.description}
                    </p>
                  </div>

                  {/* Bullets */}
                  {activeCap.bullets && activeCap.bullets.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {activeCap.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <span className="text-sm text-slate-200 font-sans leading-relaxed">
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Specs Grid */}
                  {activeCap.specs && activeCap.specs.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
                      {activeCap.specs.map((spec, i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                          <div className="text-[11px] font-mono text-slate-400">{spec.label}</div>
                          <div className="text-xs sm:text-sm font-semibold font-mono text-cyan-300 mt-1">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Box: Architecture Telemetry Console */}
                <div className="lg:col-span-5 rounded-2xl border border-cyan-500/30 bg-[#0A0E1A]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-xl shadow-cyan-500/5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                        COMPLIANCE & MODULES
                      </span>
                      <span className="text-sm font-semibold text-white font-sans">
                        Active Engines: {capabilities.length} of {capabilities.length} Verified
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      ALL MODULES HEALTHY
                    </span>
                  </div>

                  {/* Active capabilities list */}
                  <div className="space-y-3 font-mono text-xs">
                    {capabilities.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/70 flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <div className="text-slate-200 font-medium">{c.name}</div>
                          <div className="text-[11px] text-emerald-400">STATUS: ACTIVE · ZERO-TRUST ENFORCED</div>
                        </div>
                        <span className="text-xs text-slate-400">99.9%</span>
                      </div>
                    ))}
                  </div>

                  {/* Security Notice */}
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 text-xs font-mono text-slate-400 leading-relaxed">
                    <span className="text-cyan-400 font-semibold">Security Notice: </span>
                    Automatic TLS 1.3 encryption, PBKDF2 credential verification, and zero-retention data residency active.
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Metadata Strip */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">PROTOCOLS:</span>
                <span className="text-cyan-400">REST API, JSON Schema, Brevo SMTP, PostgREST</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">VELOCITY:</span>
                <span className="text-cyan-400">Instant Real-Time Execution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">SECURITY:</span>
                <span className="text-emerald-400">SOC-2 Type II · ISO/IEC 27001 · Zero-Trust RBAC Enforced</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. SCREENS 3 & 4: ARCHITECTURAL DEEP-DIVE (LAYERS 01 - 04) ── */}
      {layers.length > 0 && (
        <section
          id="deep-dive"
          className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
            
            {/* Section Header */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL DEEP-DIVE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                {architectureData.deepDiveHeadline || 'Engineered layer by layer for unmatched precision.'}
              </h2>
              {architectureData.deepDiveDescription && (
                <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                  {architectureData.deepDiveDescription}
                </p>
              )}
            </div>

            {/* Zigzag Layers */}
            {layers.map((layer, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                        {layer.sectionTag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                        {layer.headline}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-2">
                        {layer.description}
                      </p>
                    </div>

                    {/* Bullets */}
                    {layer.bullets && layer.bullets.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {layer.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-cyan-400" />
                            </div>
                            <span className="text-sm text-slate-200 font-sans leading-relaxed">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {layer.tags && layer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4">
                        {layer.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Console Box Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="rounded-2xl border border-cyan-500/30 bg-[#0A0E1A]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-xl shadow-cyan-500/5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                        <div>
                          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider block">
                            {layer.rightBoxTitle || 'LAYER METRICS'}
                          </span>
                          <span className="text-sm font-semibold text-white font-sans">
                            {layer.rightBoxSubtitle || 'Engine Performance Telemetry'}
                          </span>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      </div>

                      {/* Right Box Items */}
                      {layer.rightBoxItems && layer.rightBoxItems.length > 0 && (
                        <div className="space-y-3 font-mono text-xs">
                          {layer.rightBoxItems.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/70 flex items-center justify-between"
                            >
                              <div className="space-y-0.5">
                                <span className="text-slate-300 font-medium">{item.label}</span>
                                {item.detail && (
                                  <div className="text-[11px] text-slate-400">{item.detail}</div>
                                )}
                              </div>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                                {item.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── 7. SCREEN 5: DEPLOYMENT ECOSYSTEM (EDITIONS) ── */}
      {editions.length > 0 && (
        <section
          id="deployment-ecosystem"
          className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800/80 overflow-hidden"
        >
          {/* Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="max-w-3xl mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
                <Server className="w-3.5 h-3.5" />
                <span>DEPLOYMENT ECOSYSTEM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
                {architectureData.editionsHeadline || 'Developer workstation efficiency. Enterprise cloud governance.'}
              </h2>
              {architectureData.editionsDescription && (
                <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
                  {architectureData.editionsDescription}
                </p>
              )}
            </div>

            {/* Deployment Architecture Cards */}
            <div className={`grid grid-cols-1 ${editions.length > 1 ? 'lg:grid-cols-2' : ''} gap-8 items-stretch`}>
              {editions.map((edition, idx) => {
                const isFeatured = idx === 1 || editions.length === 1;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all flex flex-col justify-between p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden ${
                      isFeatured
                        ? 'border-cyan-500/40 bg-gradient-to-b from-[#0E1526] to-[#080C17] shadow-xl shadow-cyan-500/5'
                        : 'border-slate-800 bg-[#0A0E1A]/80 hover:border-slate-700'
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300" />
                    )}

                    <div className="space-y-6">
                      {/* Card Header */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                          {edition.cardTag}
                        </span>
                        {edition.badge && (
                          <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                            {edition.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white font-sans">
                          {edition.title}
                        </h3>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed mt-2">
                          {edition.subtitle}
                        </p>
                      </div>

                      {/* Console Box */}
                      {edition.consoleItems && edition.consoleItems.length > 0 && (
                        <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/80 space-y-2.5 font-mono text-xs">
                          <div className="text-slate-400 font-semibold pb-1.5 border-b border-slate-800/60 flex items-center justify-between">
                            <span>{edition.consoleTitle}</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          {edition.consoleItems.map((item, cIdx) => (
                            <div key={cIdx} className="flex items-start justify-between gap-2">
                              <span className="text-slate-400">{item.label}:</span>
                              <span className="text-slate-200 text-right">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bullets */}
                      {edition.bullets && edition.bullets.length > 0 && (
                        <div className="space-y-2.5 pt-2">
                          {edition.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-300 font-sans">{b}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Specs */}
                      {edition.specs && edition.specs.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/60 font-mono text-xs">
                          {edition.specs.map((s, sIdx) => (
                            <div key={sIdx}>
                              <div className="text-slate-400 text-[11px]">{s.label}</div>
                              <div className="text-slate-200 font-semibold mt-0.5">{s.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-6 mt-6 border-t border-slate-800/60">
                      <button
                        onClick={() => onScheduleDemo(edition.title)}
                        className={`w-full py-3 rounded-xl font-bold font-sans text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isFeatured
                            ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-lg shadow-cyan-500/20'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <span>{edition.primaryCtaText || 'Schedule Technical Demo'}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. FINAL ACTION BAR ── */}
      <section className="border-t border-slate-800/80 bg-[#05070F] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Ready to standardize enterprise architecture and deploy with zero trust?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            Schedule an architectural walkthrough with our technology specialists to explore custom integration, automated pipelines, and enterprise deployment.
          </p>
          <div className="pt-3">
            <button
              onClick={() => onScheduleDemo(product.title)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white font-bold font-sans text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
            >
              <span>Schedule Technical Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC FULLSCREEN MODAL ── */}
      {isCinematic && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setIsCinematic(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 bg-black shadow-2xl">
            {videoUrl ? (
              <SmartVideo
                src={videoUrl}
                title={product.title}
                controls
                autoPlay
                muted={false}
                className="w-full h-full object-contain"
              />
            ) : product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
