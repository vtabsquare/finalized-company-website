import React from 'react';
import { QATestingHero3DExperience } from './QATestingHero3DExperience';
import { QATestingWorkflowSection } from './QATestingWorkflowSection';
import { QATestingFeatureShowcase } from './QATestingFeatureShowcase';
import { QATestingZigzagFeatures } from './QATestingZigzagFeatures';
import { QATestingEditionsSection } from './QATestingEditionsSection';

interface QATestingDetailPageProps {
  onScheduleDemo?: () => void;
}

export const QATestingDetailPage: React.FC<QATestingDetailPageProps> = ({
  onScheduleDemo
}) => {
  const scrollToSpecs = () => {
    const el = document.getElementById('pipeline-architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Screen 1: Top Bar & Hero Experience with 3D Parallax Tilt */}
      <QATestingHero3DExperience
        onScheduleDemo={onScheduleDemo}
        onExploreSpecs={scrollToSpecs}
      />

      {/* Screen 1 (cont.): End-to-End Pipeline Architecture (4 stages) */}
      <QATestingWorkflowSection />

      {/* Screen 2: Interactive Studio Capabilities (6 interactive tabs + specs) */}
      <QATestingFeatureShowcase />

      {/* Screens 3 & 4: Architectural Deep-Dive (Layers 01, 02 & 03, 04) */}
      <QATestingZigzagFeatures />

      {/* Screen 5: Deployment Ecosystem (Two-panel architecture: Desktop Studio + Cloud Hub) */}
      <QATestingEditionsSection onScheduleDemo={onScheduleDemo} />

      {/* Final Action Bar */}
      <div className="border-t border-slate-800/80 bg-[#05070F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ready to eliminate test maintenance debt and accelerate release velocity?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Schedule an architectural walkthrough with our QA automation engineers and witness multimodal video synthesis and dual-runner execution live.
          </p>
          <div className="pt-2">
            <button
              onClick={onScheduleDemo}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold font-sans text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer inline-flex items-center gap-2"
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
