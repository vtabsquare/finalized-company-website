import React from 'react';
import { InvoiceHero3DExperience } from './InvoiceHero3DExperience';
import { InvoiceWorkflowSection } from './InvoiceWorkflowSection';
import { InvoiceFeatureShowcase } from './InvoiceFeatureShowcase';
import { InvoiceZigzagFeatures } from './InvoiceZigzagFeatures';
import { InvoiceEditionsSection } from './InvoiceEditionsSection';

interface InvoiceFlowDetailPageProps {
  onScheduleDemo?: () => void;
  pptUrl?: string;
  videoUrl?: string;
}

export const InvoiceFlowDetailPage: React.FC<InvoiceFlowDetailPageProps> = ({
  onScheduleDemo,
  pptUrl,
  videoUrl,
}) => {
  const scrollToSpecs = () => {
    const el = document.getElementById('pipeline-architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Screen 1: Top Bar & Hero Experience with 3D Parallax Tilt */}
      <InvoiceHero3DExperience
        onScheduleDemo={onScheduleDemo}
        onExploreSpecs={scrollToSpecs}
        pptUrl={pptUrl}
        videoUrl={videoUrl}
      />

      {/* Screen 1 (cont.): End-to-End Pipeline Architecture (4 stages) */}
      <InvoiceWorkflowSection />

      {/* Screen 2: Interactive Studio Capabilities (6 interactive tabs + specs) */}
      <InvoiceFeatureShowcase />

      {/* Screens 3 & 4: Architectural Deep-Dive (Layers 01, 02 & 03, 04) */}
      <InvoiceZigzagFeatures />

      {/* Screen 5: Deployment Ecosystem (Two-panel architecture: Workspace + Cloud Dispatch) */}
      <InvoiceEditionsSection onScheduleDemo={onScheduleDemo} />

      {/* Final Action Bar */}
      <div className="border-t border-slate-800/80 bg-[#05070F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to streamline corporate billing and eliminate invoice discrepancies?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Schedule an architectural walkthrough with our financial engineering team and explore automated GST calculation and cloud ledger sync live.
          </p>
          <div className="pt-2">
            <button
              onClick={onScheduleDemo}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-bold font-sans text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Schedule Technical Demo</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
