import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import { getValidImageUrl } from '../utils/imageFallback';
import {
  ExternalLink,
  ArrowLeft,
  ArrowUpRight,
  Target,
  Zap,
  ShieldCheck,
  ChevronDown,
  Download,
  RotateCcw,
  Loader2,
  Globe,
  Play,
  FileText,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';
import { VTABReportingDetailPage } from './VTABReportingDetailPage';
import { DatabricksMigrationDetailPage } from './DatabricksMigrationDetailPage';
import { MarketingAgentDetailPage } from './MarketingAgentDetailPage';
import { L1AutomationAgentDetailPage } from './L1AutomationAgentDetailPage';
import { FaceAuthDetailPage } from './FaceAuthDetailPage';
import { HomeScapeDetailPage } from './HomeScapeDetailPage';
import { QlikMigrationDetailPage } from './QlikMigrationDetailPage';
import { PostgresMigrationDetailPage } from './PostgresMigrationDetailPage';
import { BuildsmartEstimatorDetailPage } from './BuildsmartEstimatorDetailPage';
import { InvoiceFlowDetailPage } from './InvoiceFlowDetailPage';
import { QATestingDetailPage } from './QATestingDetailPage';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onScheduleDemo: (productTitle: string) => void;
  isLightMode?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onScheduleDemo,
  isLightMode = false,
}) => {
  const liveUrls: Record<string, string> = {
    'vtab-meetscribe-ai': 'https://ai-meetscribewebsite-frontend.onrender.com/',
    'qa-ai-autonomous-testing-platform': 'https://qa-testing-application-new-1.onrender.com/'
  };
  const effectiveEmbedUrl =
    product.embedUrl ||
    product.detailContent?.embedUrl ||
    (product.demoSnippet as any)?.embedUrl ||
    liveUrls[product.id] ||
    '';
  if (product.id === 'ai-reporting-platform') {
    return (
      <VTABReportingDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (product.id === 'ai-migration-factory-databricks-control-plane') {
    return (
      <DatabricksMigrationDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'ai-marketing-manager-agent' ||
    product.id === 'ai-marketing-agent-application' ||
    product.id === 'ai-marketing-agent' ||
    product.id === 'ai-marketing-agent-' ||
    product.id.startsWith('ai-marketing') ||
    product.title.toLowerCase().includes('marketing agent')
  ) {
    return (
      <MarketingAgentDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'ai-l1-support-agent' ||
    product.id === 'l1-automation-agent' ||
    product.id.startsWith('ai-l1') ||
    product.id.startsWith('l1-') ||
    product.title.toLowerCase().includes('l1 automation') ||
    product.title.toLowerCase().includes('l1 support') ||
    product.title.toLowerCase().includes('l1 agent')
  ) {
    return (
      <L1AutomationAgentDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'faceauth' ||
    product.id === 'faceauth-enterprise' ||
    product.id.startsWith('faceauth') ||
    product.title.toLowerCase().includes('faceauth')
  ) {
    return (
      <FaceAuthDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'gbti-smart-home-builder' ||
    product.id === 'homescape360' ||
    product.id.includes('homescape') ||
    product.id.includes('gbti') ||
    product.title.toLowerCase().includes('homescape') ||
    product.title.toLowerCase().includes('smart home builder')
  ) {
    return (
      <HomeScapeDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'qlik-to-powerbi-migration' ||
    product.id === 'qlik-to-power-bi-migration' ||
    product.id.includes('qlik') ||
    product.title.toLowerCase().includes('qlik')
  ) {
    return (
      <QlikMigrationDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        embedUrl={effectiveEmbedUrl}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'postgresql-to-sqlserver-migration' ||
    product.id === 'postgres-to-sqlserver-migration' ||
    product.id.includes('postgresql') ||
    product.id.includes('postgres') ||
    product.title.toLowerCase().includes('postgresql') ||
    product.title.toLowerCase().includes('postgres')
  ) {
    return (
      <PostgresMigrationDetailPage
        onBack={onBack}
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />
    );
  }

  if (
    product.id === 'buildsmart-estimator' ||
    product.id === 'buildsmart-360-civil-estimator' ||
    product.id.includes('buildsmart') ||
    product.title.toLowerCase().includes('buildsmart') ||
    product.title.toLowerCase().includes('civil estimator')
  ) {
    return (
      <BuildsmartEstimatorDetailPage
        onScheduleDemo={() => onScheduleDemo(product.title)}
      />
    );
  }

  if (
    product.id === 'smart-invoice-management-system' ||
    product.id === 'invoice-flow' ||
    product.id === 'vtab-invoice' ||
    product.id.includes('invoice') ||
    product.title.toLowerCase().includes('invoice')
  ) {
    return (
      <InvoiceFlowDetailPage
        onScheduleDemo={() => onScheduleDemo(product.title)}
      />
    );
  }

  if (
    product.id === 'qa-ai-autonomous-testing-platform' ||
    product.id === 'qa-testing-application' ||
    product.id.includes('qa-') ||
    product.id.includes('qa-testing') ||
    product.title.toLowerCase().includes('qa-ai') ||
    product.title.toLowerCase().includes('qa testing') ||
    product.title.toLowerCase().includes('autonomous testing')
  ) {
    return (
      <QATestingDetailPage
        onScheduleDemo={() => onScheduleDemo(product.title)}
      />
    );
  }

  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isCinematic, setIsCinematic] = useState(false);

  const heroRootRef = useRef<HTMLElement>(null);
  const heroTarget = useRef({ x: 0, y: 0 });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${product.title} | VTAB Enterprise Intelligence`;
  }, [product.title]);

  // Subtle 3D cursor tilt on the hero
  useEffect(() => {
    const root = heroRootRef.current;
    if (!root || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    let raf = 0, cx = 0, cy = 0;
    const tick = () => {
      const { x, y } = heroTarget.current;
      if (Math.abs(x - cx) > 0.001 || Math.abs(y - cy) > 0.001) {
        cx += (x - cx) * 0.06;
        cy += (y - cy) * 0.06;
        root.style.setProperty('--mx', cx.toFixed(3));
        root.style.setProperty('--my', cy.toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onHeroMouseMove = (e: React.PointerEvent) => {
    heroTarget.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    };
  };

  const detail = product.detailContent;
  const pptUrl = detail?.pptUrl;
  const videoUrl = detail?.videoUrl || (product.demoSnippet as any)?.videoUrl;

  const bgClass = isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#06080F] text-slate-100';
  const textPrimary = isLightMode ? 'text-slate-900' : 'text-white';
  const textMuted = isLightMode ? 'text-slate-600' : 'text-slate-300';
  const dividerClass = isLightMode ? 'border-slate-200' : 'border-white/10';

  return (
    <div className={`relative w-full min-h-screen font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-300 ${bgClass}`}>
      
      {/* ── 1. FIXED FLOATING TOP NAVIGATION BAR (Exact Reporting Tool Pattern) ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b py-3 px-4 sm:px-8 ${
        isLightMode
          ? 'bg-white/90 border-slate-200/80 shadow-sm'
          : 'bg-[#030712]/85 border-white/10 shadow-2xl'
      }`}>
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
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-cyan-400">
                VTAB Enterprise Suite
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-cyan-400/40 bg-cyan-950/60 text-cyan-300">
                {product.category || 'AI Solution'}
              </span>
            </div>
          </div>

          {/* Right Action: Schedule Demo (Omitted Try Demo & Download Desktop as requested) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
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

      {/* ── 2. HERO SECTION: 2-COLUMN STAGE (MATCHING REPORTING TOOL HERO LAYOUT) ── */}
      <section
        ref={heroRootRef}
        onPointerMove={onHeroMouseMove}
        onPointerLeave={() => (heroTarget.current = { x: 0, y: 0 })}
        className="relative overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24 min-h-[720px] flex items-center border-b border-white/10"
        style={{ background: '#020611' }}
      >
        {/* Background Radial LED Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[130px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute top-[40%] left-[30%] w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[140px]" />
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

        {/* Full-Bleed Cinematic Background (Matches AI Portfolio Showcase & L1 Agent) */}
        <div className="absolute inset-0 z-10 flex justify-end overflow-hidden">
          {/* Left & Bottom Gradient Masks to ensure text readability */}
          <div className={`absolute inset-0 z-20 w-full lg:w-[50%] transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-r from-[#020611] via-[#020611]/90 to-transparent pointer-events-none`} />
          
          <div className={`absolute inset-0 z-20 transition-opacity duration-700 ${
            isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } bg-gradient-to-t from-[#020611] via-[#020611]/50 to-transparent pointer-events-none`} />
          
          {/* Video / Media Player pushed to the right (65%) or expanded full-width */}
          <div className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center ${
            isCinematic 
              ? 'w-full opacity-100 z-10' 
              : 'w-full lg:w-[65%] opacity-100 z-10'
          }`}
            style={{
              maskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: isCinematic ? 'none' : 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
            }}
          >
            <ProductVideoStreamingPlayer
              productId={product.id}
              productTitle={product.title}
              imageUrl={getValidImageUrl(product.imageUrl, product.category, product.title, product.id)}
              videoUrl={videoUrl}
              compactMode={false}
              isCinematic={isCinematic}
              onToggleCinematic={() => setIsCinematic(!isCinematic)}
              isActive={true}
            />
          </div>
        </div>

        {/* Top-Right Video Controls (Matches AI Portfolio Showcase) */}
        <div className="absolute top-24 lg:top-28 right-6 lg:right-10 z-40 flex items-center gap-2.5">
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
        </div>

        {/* Floating Hero Content (Left 54% - Matches AI Portfolio Showcase) */}
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
                ENTERPRISE SOLUTION · {product.category.toUpperCase()}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight leading-[1.14] text-pretty">
              {product.title}
            </h1>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              {product.fullDescription || product.shortDescription}
            </p>

            {/* Impact Callout with Zap */}
            {product.impactMetric && (
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cyan-300 font-medium">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{product.impactMetric}</span>
              </div>
            )}

            {/* Action Buttons: Schedule Demo + (Optional PPT / Sandbox Link) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onScheduleDemo(product.title)}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#00D5F2] hover:brightness-105 shadow-[0_4px_16px_rgba(99,102,241,0.22)] hover:shadow-[0_6px_22px_rgba(99,102,241,0.35)] border border-white/15 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span>Schedule Technical Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {effectiveEmbedUrl && (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('live-demo-interactive');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#071426]/90 hover:bg-[#0c1f3d] border border-slate-700/80 hover:border-cyan-400/50 shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Live Interactive Sandbox</span>
                </button>
              )}

              {pptUrl && (
                <a
                  href={pptUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-[#071426]/90 hover:bg-[#0c1f3d] border border-slate-700/80 hover:border-purple-400/50 shadow-lg transition-all duration-300 cursor-pointer active:scale-95 no-underline"
                >
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Download PPT</span>
                </a>
              )}
            </div>

            {/* Tech Stack Pills Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              {product.techStack.map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1 rounded-full text-[11px] font-medium text-slate-300 border border-slate-700/70 bg-[#081224]/75 backdrop-blur-md"
                >
                  {badge}
                </span>
              ))}
            </div>

          </div>

          {/* Interactive Scroll For Architecture Deep-Dive */}
          <div className="flex justify-center pt-8 pb-2">
            <button
              onClick={() => {
                const element = document.getElementById('architecture-details-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/90 hover:bg-black border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <span className="text-xs font-extrabold tracking-widest uppercase">Scroll for Architecture Specifications</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* ── 3. INTERACTIVE LIVE APPLICATION / SANDBOX (IF EMBED URL AVAILABLE) ── */}
      {effectiveEmbedUrl && (
        <section id="live-demo-interactive" className="relative w-full py-16 px-4 sm:px-8 border-b border-white/10 overflow-hidden bg-[#020716]">
          {/* Ambient Lighting Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-[1520px] w-full mx-auto space-y-6">
            
            {/* Header / Title Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-950/70 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Live Interactive Sandbox
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Experience {product.title} in Real Time
                </h2>
                <p className="text-sm text-slate-300 font-light max-w-2xl mt-1.5 leading-relaxed">
                  Direct live application telemetry deployed from our production cluster. Interact with features, filters, and real-time processing below.
                </p>
              </div>

              {/* Action Buttons: Refresh + Fullscreen / Open external */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIframeLoading(true);
                    setIframeKey(k => k + 1);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 shadow-lg transition-all cursor-pointer active:scale-95"
                  title="Reload sandbox"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Refresh View</span>
                </button>

                <a
                  href={effectiveEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-400/30 transition-all cursor-pointer active:scale-95"
                >
                  <span>Open Full Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Obsidian Glass Console Frame with Iframe */}
            <div className="relative rounded-2xl md:rounded-3xl border border-cyan-500/35 bg-[#030919] shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.15)] overflow-hidden">
              
              {/* Top Browser Console Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#051126] border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400 text-[11px] truncate max-w-xs sm:max-w-md">
                    {effectiveEmbedUrl}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    CONNECTED
                  </span>
                </div>
              </div>

              {/* Iframe Viewport Stage with Loading Spinner */}
              <div className="relative w-full h-[750px] sm:h-[850px] lg:h-[920px] bg-black flex items-center justify-center">
                {iframeLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#020717]/95 backdrop-blur-sm gap-3">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <p className="text-xs font-mono text-cyan-300 tracking-wider uppercase">Connecting to live environment...</p>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  src={effectiveEmbedUrl}
                  title={`${product.title} Live Interactive Demo`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setIframeLoading(false)}
                />
              </div>

            </div>

          </div>
        </section>
      )}

      {/* ── 4. CONTENT BODY: EXECUTIVE BENTO GRID (THE CHALLENGE & THE APPROACH) ── */}
      <div id="architecture-details-section" className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-16 md:py-24 space-y-16 md:space-y-24">

        {/* EXECUTIVE BENTO GRID */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bento Card 1: The Challenge */}
            <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden space-y-6 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(245,158,11,0.15)] hover:-translate-y-1.5 group ${
              isLightMode ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 shadow-xl'
            }`}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-amber-500/20 transition-all" />
              
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-500">Problem Statement</p>
                  <h2 className={`text-2xl font-extrabold tracking-tight ${textPrimary}`}>The Challenge</h2>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {detail?.challenge && detail.challenge.length > 0 ? (
                  detail.challenge.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="mt-2 w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-[0_0_10px_rgba(245,158,11,1)]" />
                      <p className={`text-base font-light leading-relaxed ${textMuted}`}>{point}</p>
                    </div>
                  ))
                ) : (
                  [
                    `Processing unstructured enterprise data at scale while maintaining strict SLA sub-second latency across distributed systems.`,
                    `Eliminating manual operational bottlenecks and data silos without disrupting existing legacy workflows.`,
                    `Ensuring end-to-end security, regulatory compliance, and audit-ready data lineage across the entire pipeline.`
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="mt-2 w-2 h-2 rounded-full bg-amber-500 shrink-0 shadow-[0_0_10px_rgba(245,158,11,1)]" />
                      <p className={`text-base font-light leading-relaxed ${textMuted}`}>{point}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bento Card 2: The Approach */}
            <div className={`p-8 sm:p-10 rounded-3xl border relative overflow-hidden space-y-6 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1.5 group ${
              isLightMode ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 shadow-xl'
            }`}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-blue-500/20 transition-all" />
              
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25)] group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-500">Technical Solution</p>
                  <h2 className={`text-2xl font-extrabold tracking-tight ${textPrimary}`}>The Approach</h2>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <p className={`text-base font-light leading-relaxed ${textMuted}`}>
                  {detail?.approach || `${product.fullDescription || product.shortDescription} To architect this at an enterprise scale, our engineering team implemented a decoupled, cloud-native microservices topology. By integrating real-time event ingestion with asynchronous processing and distributed caching, the platform guarantees high throughput, resilient fault-tolerance, and seamless bidirectional data synchronization across all client endpoints.`}
                </p>
              </div>
            </div>

          </div>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* ── 5. CAPABILITIES MATRIX: SYSTEM INTELLIGENCE & FEATURES ── */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-10">
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Capabilities Matrix</p>
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${textPrimary}`}>
                System Intelligence & Features
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {detail?.features && detail.features.length > 0 ? (
                detail.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden space-y-4 transition-all duration-500 hover:-translate-y-1.5 group ${
                      isLightMode
                        ? 'bg-white border-slate-200 shadow-lg hover:border-emerald-500/50'
                        : 'bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 shadow-2xl hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]'
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                      {feature.emoji ? feature.emoji : <ShieldCheck className="w-6 h-6" />}
                    </div>
                    <div className="space-y-2 relative z-10">
                      <h3 className={`text-lg font-extrabold tracking-tight ${textPrimary} group-hover:text-emerald-400 transition-colors`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm font-light leading-relaxed ${textMuted}`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                product.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden space-y-4 transition-all duration-500 hover:-translate-y-1.5 group ${
                      isLightMode
                        ? 'bg-white border-slate-200 shadow-lg hover:border-emerald-500/50'
                        : 'bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 shadow-2xl hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]'
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className={`text-base font-extrabold tracking-tight ${textPrimary} relative z-10 group-hover:text-emerald-400 transition-colors`}>
                      {feat}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* ── 6. ARCHITECTURE SPECIFICATIONS & BENCHMARKS ── */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-10">
            <div className="space-y-3 text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">System Performance</p>
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${textPrimary}`}>
                Architecture Specifications & Benchmarks
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(detail?.benchmarks || [
                { val: '< 15 ms', label: 'API Query Latency', desc: '99th percentile response time across distributed edge nodes.' },
                { val: '99.99%', label: 'System Uptime SLA', desc: 'Multi-region active-active replication with automated failover.' },
                { val: '10x', label: 'Throughput Scaling', desc: 'Auto-scaling worker pods handling burst data ingestion spikes.' }
              ]).slice(0, 3).map((bm: any, idx: number) => {
                const colors = [
                  { text: 'text-cyan-400' },
                  { text: 'text-emerald-400' },
                  { text: 'text-purple-400' }
                ];
                const col = colors[idx % colors.length];
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border space-y-2 transition-all hover:-translate-y-1 ${
                      isLightMode ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-white/5 border-white/10 shadow-xl'
                    }`}
                  >
                    <div className={`text-2xl md:text-3xl font-extrabold ${col.text} font-mono`}>{bm.val}</div>
                    <div className={`text-sm font-bold ${textPrimary}`}>{bm.label}</div>
                    <div className={`text-xs ${textMuted}`}>{bm.desc || ''}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

      </div>

      {/* ── 7. FINAL CALL TO ACTION (MATCHING REPORTING TOOL FOOTER BANNER) ── */}
      <section className="relative w-full py-20 px-4 sm:px-8 overflow-hidden border-t border-white/10" style={{ background: '#030712' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ENTERPRISE READINESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to integrate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">{product.title}</span> into your workflows?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Speak with our enterprise solutions team for a deep technical walkthrough, live cluster benchmarking, or tailored pilot deployment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onScheduleDemo(product.title)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-extrabold tracking-wider uppercase bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-[0_0_25px_rgba(0,210,255,0.6)] hover:shadow-[0_0_35px_rgba(0,210,255,0.85)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Schedule Technical Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductDetailPage;
