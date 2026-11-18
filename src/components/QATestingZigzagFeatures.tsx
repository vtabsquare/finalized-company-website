import React from 'react';
import {
  Sparkles,
  Terminal,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Play,
  Server,
  FileText
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';
import { qaTestingArchitectureLayers } from '../data/qaTestingData';

export const QATestingZigzagFeatures: React.FC = () => {
  const layer1 = qaTestingArchitectureLayers[0];
  const layer23 = qaTestingArchitectureLayers[1];
  const layer4 = qaTestingArchitectureLayers[2];

  return (
    <section id="deep-dive" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden">
      {/* Subtle background radial pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 lg:space-y-36">
        {/* Main Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/20 text-indigo-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Engineered layer by layer for unmatched speed and precision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Every tier of the QA-AI Testing Engine is purpose-built to eliminate flakiness, bridge web and native desktop surfaces, and provide verifiable execution truth.
          </p>
        </div>

        {/* ============================================================ */}
        {/* SCREEN 3: Layer 01 - Zero-Hallucination Test Contract Engine */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                {layer1.sectionTag}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                {layer1.headline}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-2">
                {layer1.description}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {layer1.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-sm text-slate-200 font-sans leading-relaxed">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {layer1.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/40 border border-indigo-800/40 text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Console Box */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-indigo-500/30 bg-[#0B0F19]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-2xl shadow-indigo-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-indigo-400 block">
                    {layer1.rightBoxTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    {layer1.rightBoxSubtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYNC ACTIVE
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 font-mono text-xs">
                {layer1.rightBoxItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 flex items-center justify-between"
                  >
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-emerald-400 text-[11px] font-semibold">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400 leading-relaxed">
                <span className="text-indigo-400 font-semibold">Target Status: </span>
                Zero-hallucination buffer active. 100% of AI-generated steps verified against actual UI contract specs.
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCREEN 4: Top Section - Layer 02 & 03 Enterprise Assertion & Trace Observability */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Console Box */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl border border-indigo-500/30 bg-[#0B0F19]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-2xl shadow-indigo-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-indigo-400 block">
                    {layer23.rightBoxTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    {layer23.rightBoxSubtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  VERIFIED
                </div>
              </div>

              {/* Data Flow Diagram / Items */}
              <div className="space-y-3 font-mono text-xs">
                {layer23.rightBoxItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 flex items-center justify-between"
                  >
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-indigo-400 text-[11px] font-semibold">
                      ──────▶ {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400 leading-relaxed">
                <span className="text-indigo-400 font-semibold">Status: </span>
                No unverified clicks, unhandled timeouts, or uninspected exceptions permitted.
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                {layer23.sectionTag}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                {layer23.headline}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-2">
                {layer23.description}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {layer23.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-sm text-slate-200 font-sans leading-relaxed">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {layer23.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/40 border border-indigo-800/40 text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCREEN 4: Bottom Section - Layer 04 Dual-Surface Hybrid Engine */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                {layer4.sectionTag}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-sans">
                {layer4.headline}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed pt-2">
                {layer4.description}
              </p>
            </div>

            {/* Bullets */}
            <div className="space-y-3 pt-2">
              {layer4.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <span className="text-sm text-slate-200 font-sans leading-relaxed">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {layer4.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-indigo-950/40 border border-indigo-800/40 text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Console Box */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-indigo-500/30 bg-[#0B0F19]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-2xl shadow-indigo-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-indigo-400 block">
                    {layer4.rightBoxTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    {layer4.rightBoxSubtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DUAL-RUNNER
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 font-mono text-xs">
                {layer4.rightBoxItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 flex items-center justify-between"
                  >
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-emerald-400 text-[11px] font-semibold">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400 leading-relaxed">
                <span className="text-indigo-400 font-semibold">Runner Topology: </span>
                Playwright Chromium bundled with native Windows UIA COM tree discovery and FFmpeg Y4M virtual biometric camera streamer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
