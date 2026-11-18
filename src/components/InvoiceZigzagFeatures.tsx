import React from 'react';
import {
  Sparkles,
  Receipt,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  FileCode,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  Server,
  FileText
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';
import { invoiceFlowArchitectureLayers } from '../data/invoiceFlowData';

export const InvoiceZigzagFeatures: React.FC = () => {
  const layer1 = invoiceFlowArchitectureLayers[0];
  const layer23 = invoiceFlowArchitectureLayers[1];
  const layer4 = invoiceFlowArchitectureLayers[2];

  return (
    <section id="deep-dive" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden">
      {/* Subtle background radial pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 lg:space-y-36">
        {/* Main Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans">
            Engineered layer by layer for unmatched accuracy and compliance.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Every tier of the VTAB Invoice Platform is purpose-built to eliminate bottlenecks between billing requests, tax calculations, and customer settlements.
          </p>
        </div>

        {/* ============================================================ */}
        {/* SCREEN 3: Layer 01 - Universal Ledger & Data Federation */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
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
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
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
                  className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-800/40 text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Console Box */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#0B0F19]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-2xl shadow-cyan-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 block">
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
                <span className="text-cyan-400 font-semibold">Target Status: </span>
                Zero-error arithmetic buffer active. 100% of line items and tax splits verified against source ledgers.
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCREEN 4: Top Section - Layer 02 & 03 Invoice Validation & Tax Integrity */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Console Box */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#0B0F19]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-2xl shadow-cyan-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 block">
                    {layer23.rightBoxTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    {layer23.rightBoxSubtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
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
                    <span className="text-cyan-400 text-[11px] font-semibold">
                      ──▶ {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 text-xs font-mono text-slate-400 leading-relaxed">
                <span className="text-cyan-400 font-semibold">Status: </span>
                No unverified calculations or missing tax fields permitted.
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
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
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
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
                  className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-800/40 text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SCREEN 4: Bottom Section - Layer 04 Code-Rendered Hybrid Compositor */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
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
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
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
                  className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 border border-cyan-800/40 text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Console Box */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#0B0F19]/90 backdrop-blur-xl p-6 sm:p-7 space-y-5 shadow-2xl shadow-cyan-500/5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 block">
                    {layer4.rightBoxTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    {layer4.rightBoxSubtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VECTOR ENGINE
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
                <span className="text-cyan-400 font-semibold">Compositor Standard: </span>
                Vector A4 layout with razor-sharp typography, automated page breaks, and embedded cryptographic signatures.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
