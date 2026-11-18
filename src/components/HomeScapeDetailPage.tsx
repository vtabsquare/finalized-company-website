import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { HomeScapeHero3DExperience } from './HomeScapeHero3DExperience';
import { HomeScapeWorkflowSection } from './HomeScapeWorkflowSection';
import { HomeScapeFeatureShowcase } from './HomeScapeFeatureShowcase';
import { HomeScapeZigzagFeatures } from './HomeScapeZigzagFeatures';
import { HomeScapeEditionsSection } from './HomeScapeEditionsSection';
import { HOMESCAPE_CONFIG } from '../data/homeScapeData';

interface HomeScapeDetailPageProps {
  onBack: () => void;
  onScheduleDemo: (interestArea?: string) => void;
  isLightMode?: boolean;
}

export const HomeScapeDetailPage: React.FC<HomeScapeDetailPageProps> = ({
  onBack,
  onScheduleDemo,
  isLightMode = false,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'HomeScape 360 | Modular Architecture & 3D Configurator Suite';
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
                HOMESCAPE360 ARCHITECTURE SUITE
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                AI VISION & 3D COMPUTING
              </span>
            </div>
          </div>

          {/* Right: Schedule Demo Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onScheduleDemo(HOMESCAPE_CONFIG.name)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-300 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] group hover:scale-[1.02]"
            >
              <span>SCHEDULE DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Presentation Layout - 5 Consecutive Full-Width Screens */}
      <main className="w-full">
        {/* Screen 1: Top Bar & Hero Experience with 3D Parallax Tilt */}
        <HomeScapeHero3DExperience
          onScheduleDemo={onScheduleDemo}
          onExploreCapabilities={scrollToCapabilities}
          isLightMode={isLightMode}
        />

        {/* Screen 1 (Extended): End-to-End Pipeline Architecture (4 Stages) */}
        <HomeScapeWorkflowSection />

        {/* Screen 2: Interactive Studio Capabilities (6 Tabs) */}
        <HomeScapeFeatureShowcase />

        {/* Screens 3 & 4: Architectural Deep-Dive (Layers 01, 02&03, 04) */}
        <HomeScapeZigzagFeatures />

        {/* Screen 5: Deployment Ecosystem (Configurator & Design Suite + Sales Intelligence Hub) */}
        <HomeScapeEditionsSection
          onScheduleDemo={onScheduleDemo}
        />
      </main>

    </div>
  );
};
