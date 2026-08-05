import React, { useEffect } from 'react';
import { Product } from '../types';
import { getValidImageUrl } from '../utils/imageFallback';
import { 
  ArrowLeft, 
  Target, 
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Download
} from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

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
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const detail = product.detailContent;

  const bgClass = isLightMode ? 'bg-white' : 'bg-[#030712]';
  const textPrimary = isLightMode ? 'text-slate-900' : 'text-white';
  const textMuted = isLightMode ? 'text-slate-600' : 'text-slate-300';
  const dividerClass = isLightMode ? 'border-slate-100' : 'border-[#1e293b]';
  const tagBgClass = isLightMode ? 'bg-slate-100 text-slate-800' : 'bg-white/5 text-slate-200 border border-white/10';
  
  return (
    <div className={`relative w-full min-h-screen font-sans animate-in fade-in duration-700 ${bgClass}`}>
      
      {/* Absolute Back Button (Top Left) */}
      <div className="absolute top-8 left-8 z-50">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl transition-all hover:-translate-x-1 cursor-pointer ${
            isLightMode 
              ? 'bg-white/90 text-slate-900 hover:bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]' 
              : 'bg-black/50 text-white hover:bg-black/80 border border-white/10 shadow-xl'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>
      </div>

      {/* HERO SECTION: Obsidian Cybernetic Canvas with Radial LED Light Sources */}
      <div className="dark-hero-canvas relative w-full pt-20 pb-12 px-4 sm:px-8 bg-gradient-to-b from-[#020617] via-[#050d26] to-[#030712] overflow-hidden border-b border-white/10">
        {/* Subtle Cybernetic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Animated LED Backlight Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none opacity-40" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[140px] pointer-events-none opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          
          {/* AT THE TOP ONLY: PROJECT TITLE & SUMMARY */}
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-xl">
                <Sparkles className="w-4 h-4 animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
                <span className="text-xs font-extrabold tracking-widest uppercase">Enterprise Telemetry • {product.category}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent font-heading leading-tight drop-shadow-2xl">
                {product.title}
              </h1>
              
              <p className="text-base md:text-lg font-light leading-relaxed text-slate-300 max-w-3xl mx-auto">
                {product.shortDescription}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {product.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-b from-white/15 to-white/5 text-cyan-300 border border-white/20 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:border-cyan-400/50 hover:scale-105 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* BELOW THAT: MASTER 2-COLUMN SHOWCASE (VIDEO LEFT + DETAILS RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            
            {/* Left Column (7 cols): Floating Video Frame */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 bg-slate-950/80 shadow-xl transition-all duration-700 group">
                
                {/* Video Stream Viewport */}
                <div className="relative w-full aspect-video bg-slate-950 overflow-hidden">
                  <ProductVideoStreamingPlayer
                    productId={product.id}
                    productTitle={product.title}
                    imageUrl={getValidImageUrl(product.imageUrl, product.category, product.title, product.id)}
                    videoUrl={detail?.videoUrl || (product.demoSnippet as any)?.videoUrl}
                    compactMode={false}
                  />
                </div>
              </div>

              {/* Tabletop Surface Reflection */}
              <div className="w-[85%] mx-auto h-4 bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent blur-xl pointer-events-none opacity-70" />
            </div>

            {/* Right Column (5 cols): Comprehensive Project Details & Overview HUD */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Executive Cyber Console Card */}
              <div className="relative p-6 md:p-8 rounded-3xl bg-slate-900/85 border border-white/15 backdrop-blur-sm shadow-2xl space-y-6 overflow-hidden">
                {/* Illuminated Top Neon Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cyan-400">System Architecture</p>
                    <h3 className="text-xl font-extrabold text-white">Project Overview & Specs</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Zap className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Interactive Telemetry Status Pill */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-black/50 border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400 font-mono tracking-wide">STATUS: OPERATIONAL</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    99.99% SYNC
                  </span>
                </div>

                {/* Detailed Explanation / Approach */}
                <p className="text-sm md:text-base text-slate-200 font-light leading-relaxed">
                  {detail?.approach || product.fullDescription}
                </p>

                {/* Key Capabilities Highlights */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span>Core System Capabilities</span>
                  </p>
                  <div className="space-y-2.5">
                    {(detail?.features ? detail.features.map(f => f.title) : product.keyFeatures).slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]">✓</div>
                        <span className="text-sm text-slate-200 font-medium leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLA Benchmarks Mini-Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {(detail?.benchmarks || [
                    { val: '< 15 ms', label: 'API Latency' },
                    { val: '99.99%', label: 'Uptime SLA' }
                  ]).slice(0, 2).map((bm: any, idx: number) => {
                    const col = idx === 0 ? 'text-cyan-400' : 'text-emerald-400';
                    const bgCol = idx === 0 ? 'from-cyan-500/5' : 'from-emerald-500/5';
                    return (
                      <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-0.5 relative overflow-hidden group/box">
                        <div className={`absolute inset-0 bg-gradient-to-br ${bgCol} to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity`} />
                        <div className={`text-xl font-extrabold ${col} font-heading`}>{bm.val}</div>
                        <div className="text-[11px] font-bold text-slate-300">{bm.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button 
                    onClick={() => onScheduleDemo(product.title)}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] border border-cyan-400/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>Schedule Technical Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  {product.detailContent?.pptUrl && (
                    <a 
                      href={product.detailContent.pptUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 px-6 mt-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                        isLightMode 
                          ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm'
                          : 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 border border-slate-600/50'
                      }`}
                    >
                      <span>Download Presentation</span>
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* INTERACTIVE SCROLL FOR DEEP-DIVE INDICATOR */}
          <div className="flex justify-center pt-6 pb-2">
            <button
              onClick={() => {
                const element = document.getElementById('architecture-details-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/90 hover:bg-black border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 cursor-pointer animate-bounce"
            >
              <span className="text-xs font-extrabold tracking-widest uppercase">Scroll for Deep-Dive Architecture Specifications</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* CONTENT BODY: Clean Whitespace, Reduced Gaps */}
      <div id="architecture-details-section" className="w-full max-w-4xl mx-auto px-6 py-10 md:py-14 space-y-12 md:space-y-20">

        {/* EXECUTIVE BENTO GRID: Challenge & Approach */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bento Card 1: The Challenge */}
            <div className={`p-8 rounded-3xl border relative overflow-hidden space-y-6 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(245,158,11,0.15)] hover:-translate-y-1.5 group ${isLightMode ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 backdrop-blur-xl shadow-xl'}`}>
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
                    `Eliminating manual operational bottlenecks and data silos without disrupting existing legacy database workflows.`,
                    `Ensuring end-to-end security, regulatory compliance, and audit-ready data lineage across the entire engineering pipeline.`
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
            <div className={`p-8 rounded-3xl border relative overflow-hidden space-y-6 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1.5 group ${isLightMode ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 backdrop-blur-xl shadow-xl'}`}>
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
                  {detail?.approach || `${product.fullDescription} To architect this at an enterprise scale, our engineering team implemented a decoupled, cloud-native microservices topology. By integrating real-time event ingestion with asynchronous vector computation and distributed caching, the platform guarantees high throughput, resilient fault-tolerance, and seamless bidirectional data synchronization across all client endpoints.`}
                </p>
              </div>
            </div>

          </div>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* Bento Grid: Key Capabilities */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-8">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">Capabilities Matrix</p>
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${textPrimary}`}>
                System Intelligence & Features
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {detail?.features && detail.features.length > 0 ? (
                detail.features.map((feature, idx) => (
                  <div key={idx} className={`p-6 md:p-8 rounded-3xl border relative overflow-hidden space-y-4 transition-all duration-500 hover:-translate-y-1.5 group ${isLightMode ? 'bg-white border-slate-200 shadow-lg hover:border-emerald-500/50' : 'bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 backdrop-blur-xl shadow-2xl hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]'}`}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                      {feature.emoji}
                    </div>
                    <div className="space-y-2 relative z-10">
                      <h3 className={`text-xl font-extrabold tracking-tight ${textPrimary} group-hover:text-emerald-400 transition-colors`}>{feature.title}</h3>
                      <p className={`text-sm md:text-base font-light leading-relaxed ${textMuted}`}>{feature.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                product.keyFeatures.map((feat, idx) => (
                  <div key={idx} className={`p-6 md:p-8 rounded-3xl border relative overflow-hidden space-y-4 transition-all duration-500 hover:-translate-y-1.5 group ${isLightMode ? 'bg-white border-slate-200 shadow-lg hover:border-emerald-500/50' : 'bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 backdrop-blur-xl shadow-2xl hover:border-emerald-500/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]'}`}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <p className={`text-lg font-extrabold tracking-tight ${textPrimary} relative z-10 group-hover:text-emerald-400 transition-colors`}>{feat}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* Architecture Specifications & Benchmarks - 100% Constructed */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-10">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">System Performance</p>
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
                  { text: 'text-cyan-500' },
                  { text: 'text-emerald-500' },
                  { text: 'text-purple-500' }
                ];
                const col = colors[idx % colors.length];
                return (
                  <div key={idx} className={`p-6 rounded-2xl border space-y-2 transition-all hover:-translate-y-1 ${isLightMode ? 'bg-slate-50 border-slate-200 shadow-sm' : 'bg-white/5 border-white/10 backdrop-blur-xl shadow-xl'}`}>
                    <div className={`text-2xl md:text-3xl font-extrabold ${col.text} font-heading`}>{bm.val}</div>
                    <div className={`text-sm font-bold ${textPrimary}`}>{bm.label}</div>
                    <div className={`text-xs ${textMuted}`}>{bm.desc || ''}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

      </div>

      {/* CALL TO ACTION BOTTOM */}
      <div className={`w-full ${isLightMode ? 'bg-slate-50 border-t border-slate-100' : 'bg-[#050b1a] border-t border-[#1e293b]'}`}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center space-y-10">
          
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-500 mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">Core Impact</p>
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight ${textPrimary}`}>
                {product.impactMetric}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="max-w-sm mx-auto pt-4">
              <button 
                onClick={() => onScheduleDemo(product.title)}
                className="w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] border border-cyan-400/30"
              >
                <span>Schedule a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailPage;
