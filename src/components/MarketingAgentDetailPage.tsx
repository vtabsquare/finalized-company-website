import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { MarketingHero3DExperience } from './MarketingHero3DExperience';
import { MarketingWorkflowSection } from './MarketingWorkflowSection';
import { MarketingFeatureShowcase } from './MarketingFeatureShowcase';
import { MarketingZigzagFeatures } from './MarketingZigzagFeatures';
import { MarketingEditionsSection } from './MarketingEditionsSection';
import { MARKETING_AGENT_CONFIG } from '../data/marketingAgentData';

interface MarketingAgentDetailPageProps {
  onBack: () => void;
  onScheduleDemo: (interestArea?: string) => void;
  isLightMode?: boolean;
}

export const MarketingAgentDetailPage: React.FC<MarketingAgentDetailPageProps> = ({
  onBack,
  onScheduleDemo,
  isLightMode = false,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'AI Marketing Agent Application | VTAB Revenue Intelligence Suite';
  }, []);

  const scrollToCapabilities = () => {
    const el = document.getElementById('studio-capabilities');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full min-h-screen font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#06080F] text-slate-100'
    }`}>

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
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-cyan-400 font-mono">
                VTAB REVENUE INTELLIGENCE SUITE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 font-mono">
                V2.4.1 STABLE
              </span>
            </div>
          </div>

          {/* Right Action: Schedule Demo (No Try Demo / No .exe download) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => onScheduleDemo('VTAB Marketing & Lead Suite')}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:shadow-[0_0_28px_rgba(0,210,255,0.85)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Schedule Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── 2. HERO SECTION: 3D ENTERPRISE MARKETING AGENT EXPERIENCE ── */}
      <MarketingHero3DExperience
        onScheduleDemo={onScheduleDemo}
        onExploreCapabilities={scrollToCapabilities}
        isLightMode={isLightMode}
      />

      {/* ── 3. SCREEN 1: END-TO-END PIPELINE ARCHITECTURE (WORKFLOW) ── */}
      <MarketingWorkflowSection />

      {/* ── 4. SCREEN 2: INTERACTIVE STUDIO CAPABILITIES ── */}
      <MarketingFeatureShowcase />

      {/* ── 5. SCREEN 3 & 4: ARCHITECTURAL DEEP-DIVE (LAYERS 01, 02, 03, 04) ── */}
      <MarketingZigzagFeatures />

      {/* ── 6. SCREEN 5: DEPLOYMENT ECOSYSTEM ── */}
      <MarketingEditionsSection onScheduleDemo={onScheduleDemo} />

      {/* ── 7. FINAL CALL TO ACTION (MATCHING REPORTING TOOL FOOTER BANNER) ── */}
      <section className="relative w-full py-24 lg:py-32 overflow-hidden border-t border-slate-800/80 bg-[#060810]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-cyan-500/15 via-blue-600/10 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRODUCTION-GRADE REVENUE INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-pretty">
            Start scaling demand with VTAB Marketing Agent.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Explore a complete environment for buyer intent harvesting, multi-agent campaign synthesis, and automated omni-channel distribution.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onScheduleDemo('VTAB Marketing & Lead Suite')}
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
