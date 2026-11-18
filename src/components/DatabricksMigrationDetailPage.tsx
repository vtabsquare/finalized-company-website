import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Layers,
  Download
} from 'lucide-react';
import { DatabricksMigrationHero } from './DatabricksMigrationHero';
import { DatabricksLiveSandbox } from './DatabricksLiveSandbox';
import { DatabricksWorkflowSection } from './DatabricksWorkflowSection';
import { DatabricksFeatureShowcase } from './DatabricksFeatureShowcase';
import { DatabricksZigzagFeatures } from './DatabricksZigzagFeatures';
import { DatabricksEditionsSection } from './DatabricksEditionsSection';
import { DatabricksFinalCTA } from './DatabricksFinalCTA';

interface DatabricksMigrationDetailPageProps {
  onBack: () => void;
  onScheduleDemo: (interestArea?: string) => void;
  isLightMode?: boolean;
}

export const DatabricksMigrationDetailPage: React.FC<DatabricksMigrationDetailPageProps> = ({
  onBack,
  onScheduleDemo,
  isLightMode = false,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Databricks Migration AI Studio | Enterprise Lakehouse Modernization';
  }, []);

  const scrollToSandbox = () => {
    const el = document.getElementById('interactive-sandbox');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full min-h-screen font-sans selection:bg-cyan-500 selection:text-white transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#030612] text-slate-100'
    }`}>

      {/* ── 1. FIXED FLOATING TOP NAVIGATION BAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b py-3 px-4 sm:px-8 ${
        isLightMode
          ? 'bg-white/90 border-slate-200/80 shadow-sm'
          : 'bg-[#030712]/85 border-white/10 shadow-2xl'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back to Homepage + Product Brand Indicator */}
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
                DATABRICKS MIGRATION AI STUDIO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-cyan-400/40 bg-cyan-950/60 text-cyan-300">
                v2.5.0 STABLE
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={scrollToSandbox}
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isLightMode
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-[#071328]/90 hover:bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.15)]'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-cyan-300 text-cyan-300" />
              <span>Try Demo</span>
            </button>

            <button
              onClick={() => onScheduleDemo('Databricks Migration AI Studio')}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:shadow-[0_0_28px_rgba(0,210,255,0.85)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Schedule Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── 2. HERO SECTION: 3D ENTERPRISE MIGRATION EXPERIENCE ── */}
      <DatabricksMigrationHero
        onScheduleDemo={onScheduleDemo}
        onWatchDemo={scrollToSandbox}
        isLightMode={isLightMode}
      />

      {/* ── 3. LIVE INTERACTIVE SANDBOX IFRAME ── */}
      <DatabricksLiveSandbox
        onScheduleDemo={onScheduleDemo}
        isLightMode={isLightMode}
      />

      {/* ── 4. END-TO-END PIPELINE ARCHITECTURE (WORKFLOW) ── */}
      <DatabricksWorkflowSection />

      {/* ── 5. STUDIO CAPABILITIES (INTERACTIVE TABBED SHOWCASE) ── */}
      <DatabricksFeatureShowcase />

      {/* ── 6. IMMERSIVE ZIGZAG ARCHITECTURAL DEEP-DIVE (4 LAYERS) ── */}
      <DatabricksZigzagFeatures />

      {/* ── 7. DEPLOYMENT ECOSYSTEM (DUAL CARDS) ── */}
      <DatabricksEditionsSection
        onScheduleDemo={onScheduleDemo}
      />

      {/* ── 8. FINAL CALL TO ACTION ── */}
      <DatabricksFinalCTA
        onScheduleDemo={onScheduleDemo}
      />

    </div>
  );
};
