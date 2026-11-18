import React from 'react';
import {
  Sparkles,
  Database,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  FileText,
  Lock,
  ArrowRight
} from 'lucide-react';
import { AmbientGlow } from './AmbientGlow';

export const MarketingZigzagFeatures: React.FC = () => {
  return (
    <section id="deep-dive" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#05070E] overflow-hidden">
      {/* Subtle background radial pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 lg:space-y-36">
        
        {/* Section Master Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHITECTURAL DEEP-DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-pretty">
            Engineered layer by layer for unmatched speed and precision.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every tier of VTAB Marketing & Lead Platform is purpose-built to eliminate bottlenecks between market buyer intent, campaign creation, and executive decisions.
          </p>
        </div>

        {/* ── ROW 1: Layer 01 - Universal Knowledge Base Federation (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-cyan-400 font-mono">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>01 · UNIVERSAL KNOWLEDGE BASE FEDERATION</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Grounded across documents with zero hallucinations.
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect enterprise websites, product PDFs, and technical whitepapers through native vector retrieval. Every generated copy and visual claim is strictly validated against verified source chunks without synthetic hallucination.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Direct knowledge base grounding with real-time vector chunk indexing',
                'Verifiable claim sources tracking back to brief, PDF docs, or live website',
                'Automatic content drift detection with continuous schema synchronization'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">120+ Verified Connectors</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Source Traceability</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">TLS 1.3 Strict</span>
            </div>
          </div>

          {/* Right Visual Console: Active Knowledge Ingestion Mesh */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#060B18] shadow-2xl p-6 sm:p-7 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold text-sm">Active Knowledge Ingestion Mesh</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30">
                  HEALTHY
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {[
                  { label: 'Snowflake & Databricks Docs', status: 'Connected', mode: 'DirectQuery Active' },
                  { label: 'Company Website (vtabsquare.com)', status: 'Connected', mode: 'Live Vectors' },
                  { label: 'Product Whitepapers & Specs', status: 'Connected', mode: 'In-Memory Chunks' },
                  { label: 'Executive Leadership Profiles', status: 'Connected', mode: 'Live Cache' }
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-300">{row.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-cyan-400">{row.mode}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Target Status: Zero-hallucination buffer active. 100% of stats and dates verified against uploaded sources.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Layer 02 & 03 - Enterprise Claim Validation (Visual Left, Text Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-violet" />

          {/* Left Visual: Unified Model Topology */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl border border-purple-500/30 bg-[#0A0716] shadow-2xl p-6 sm:p-7 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-bold text-sm">Unified Model Topology</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold text-purple-300 bg-purple-950/60 border border-purple-500/30">
                  ENFORCED
                </span>
              </div>

              {/* Visual Flow Topology */}
              <div className="p-4 rounded-xl bg-[#04020c] border border-white/5 space-y-3">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 text-slate-200">
                  <span>Brief Input</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-purple-300 font-bold">Fact Extraction Engine</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 text-slate-200">
                  <span>Claim Sources</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300 font-bold">Visual Compositor</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 text-slate-200">
                  <span>Human Review</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">Omni-Channel Dispatch</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Status: No unverified claims or ambiguous facts permitted across published pipelines.</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-purple-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>02 & 03 · INTEGRITY ENFORCEMENT & CLAIM VALIDATION</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise claim validation with verified integrity.
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ensure every number, metric, date, and venue claim on your marketing creative is 100% traceable to source documents. Drop unverified stats, enforce brand design rules, and eliminate risky inaccuracies before publishing.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Multi-source claim validation tagging each fact as Campaign Brief, Knowledge Base, or User Input',
                'Strict metric integrity dropping any auto-invented percentages or multipliers',
                'Granular human-in-the-loop review and approval workflows'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-purple-300">Verified Claims</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Fact Grounded</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Human Review Enforced</span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Layer 04 - Code-Rendered Hybrid Compositor (Text Left, Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          <AmbientGlow variant="zigzag-cyan" />
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400 font-mono">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>04 · CODE-RENDERED HYBRID COMPOSITOR</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              High-precision Chromium execution rendering to master assets.
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience marketing poster generation without blurry AI text or deformed visuals. VTAB uses generative diffusion models strictly for ambient 3D backdrops while headlines, logos, UI screenshots, and glowing CTA buttons are rendered crisply in code.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Sub-second visual generation with Playwright Chromium rendering engine',
                'Gemini Vision OCR check catching stray text, watermarks, or anatomical defects',
                'Fully dynamic 3D infographic showcase templates with custom icons and live charts'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-300">Playwright Chromium</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Vision OCR Verified</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Vector SVG Charts</span>
            </div>
          </div>

          {/* Right Visual: Master Asset Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-[#06120F] shadow-2xl p-6 sm:p-7 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold text-sm">Chromium Canvas Execution</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30">
                  SUB-SECOND
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 aspect-video bg-black flex items-center justify-center">
                <img
                  src="/media/ai-marketing-control-room.png"
                  alt="High-precision Chromium execution rendering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[10px] text-emerald-400">
                  4K Crisp Output · 0 Blur
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dual-layer rendering combines generative aesthetic lighting with razor-sharp code-driven typography.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
