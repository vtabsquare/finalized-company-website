import React from 'react';
import { BuildsmartHero3DExperience } from './BuildsmartHero3DExperience';
import { BuildsmartWorkflowSection } from './BuildsmartWorkflowSection';
import { BuildsmartFeatureShowcase } from './BuildsmartFeatureShowcase';
import { BuildsmartZigzagFeatures } from './BuildsmartZigzagFeatures';
import { BuildsmartEditionsSection } from './BuildsmartEditionsSection';

interface BuildsmartEstimatorDetailPageProps {
  onScheduleDemo?: () => void;
}

export const BuildsmartEstimatorDetailPage: React.FC<BuildsmartEstimatorDetailPageProps> = ({
  onScheduleDemo
}) => {
  const scrollToSpecs = () => {
    const el = document.getElementById('pipeline-architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Screen 1: Top Bar & Hero Experience with 3D Parallax Tilt */}
      <BuildsmartHero3DExperience
        onScheduleDemo={onScheduleDemo}
        onExploreSpecs={scrollToSpecs}
      />

      {/* Screen 1 (cont.): End-to-End Pipeline Architecture (4 stages) */}
      <BuildsmartWorkflowSection />

      {/* Screen 2: Interactive Studio Capabilities (6 interactive tabs + specs) */}
      <BuildsmartFeatureShowcase />

      {/* Screens 3 & 4: Architectural Deep-Dive (Layers 01, 02 & 03, 04) */}
      <BuildsmartZigzagFeatures />

      {/* Screen 5: Deployment Ecosystem (Two-panel architecture: Builder Studio + Cloud Control) */}
      <BuildsmartEditionsSection onScheduleDemo={onScheduleDemo} />

      {/* Final Action Bar */}
      <div className="border-t border-slate-800/80 bg-[#05070F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to standardize civil estimation and eliminate contractor cost slippage?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Schedule an architectural walkthrough with our civil technology specialists and review dynamic BOQ formulation live.
          </p>
          <div className="pt-2">
            <button
              onClick={onScheduleDemo}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold font-sans text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer inline-flex items-center gap-2"
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
