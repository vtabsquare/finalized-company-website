import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Play
} from 'lucide-react';
import { VTABHero3DExperience } from './VTABHero3DExperience';
import { WorkflowSection } from './WorkflowSection';
import { FeatureShowcase } from './FeatureShowcase';
import { ZigzagFeatures } from './ZigzagFeatures';
import { DashboardGallery } from './DashboardGallery';
import { EditionsSection } from './EditionsSection';
import { FinalCTA } from './FinalCTA';
import { DownloadModal } from './DownloadModal';

interface VTABReportingDetailPageProps {
  onBack: () => void;
  onScheduleDemo: (interestArea?: string) => void;
  isLightMode?: boolean;
}

export const VTABReportingDetailPage: React.FC<VTABReportingDetailPageProps> = ({
  onBack,
  onScheduleDemo,
  isLightMode = false,
}) => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'VTAB Reporting | Next-Generation Enterprise Analytics & Reporting Platform';
  }, []);

  const scrollToPillars = (pillar: 'studio' | 'services' | 'admin') => {
    const targetId = pillar === 'services' ? 'editions' : 'workflow';
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDashboards = () => {
    const el = document.getElementById('dashboards');
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

      {/* ── 1. FIXED FLOATING TOP NAVIGATION BAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b py-3 px-4 sm:px-8 ${
        isLightMode
          ? 'bg-white/90 border-slate-200/80 shadow-sm'
          : 'bg-[#030712]/85 border-white/10 shadow-2xl'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back Button */}
          <button
            onClick={onBack}
            className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              isLightMode
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 hover:-translate-x-1'
                : 'bg-[#07101f]/90 hover:bg-[#0c1830] text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:-translate-x-1'
            }`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5 text-cyan-400" />
            <span>Back to Portfolio</span>
          </button>

          {/* Central Product Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">
              VTAB Analytics Suite
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-cyan-400/40 bg-cyan-950/60 text-cyan-300">
              v2.4.1 Stable
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={scrollToDashboards}
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
              onClick={() => onScheduleDemo('VTAB Reporting Platform')}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:shadow-[0_0_28px_rgba(0,210,255,0.85)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Schedule Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── 2. HERO SECTION: 3D ENTERPRISE ANALYTICS EXPERIENCE ── */}
      <VTABHero3DExperience
        onScheduleDemo={onScheduleDemo}
        onOpenDownload={() => setDownloadModalOpen(true)}
        scrollToPillars={scrollToPillars}
        onWatchDemo={scrollToDashboards}
        isLightMode={isLightMode}
      />

      {/* ── 3. LIVE DASHBOARD SHOWCASE GALLERY ── */}
      <DashboardGallery />

      {/* ── 4. PRODUCT WORKFLOW OVERVIEW ── */}
      <WorkflowSection />

      {/* ── 5. INTERACTIVE FEATURES TABBED SHOWCASE ── */}
      <FeatureShowcase />

      {/* ── 6. IMMERSIVE ZIGZAG ARCHITECTURAL DEEP-DIVE ── */}
      <ZigzagFeatures />

      {/* ── 7. DESKTOP & REPORTING SERVICES ECOSYSTEM ── */}
      <EditionsSection onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* ── 8. FINAL CALL TO ACTION ── */}
      <FinalCTA onOpenDownload={() => setDownloadModalOpen(true)} />

      {/* ── 9. DOWNLOAD MODAL (MANAGER'S NEW MODAL) ── */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

    </div>
  );
};
