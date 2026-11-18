import React, { useRef, useState } from 'react';
import { Sparkles, ArrowRight, Shield, Layers, FileText } from 'lucide-react';
import { buildsmartEstimatorHero } from '../data/buildsmartEstimatorData';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';

interface BuildsmartHero3DExperienceProps {
  onScheduleDemo?: () => void;
  onExploreSpecs?: () => void;
}

export const BuildsmartHero3DExperience: React.FC<BuildsmartHero3DExperienceProps> = ({
  onScheduleDemo,
  onExploreSpecs
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
      {/* Top Breadcrumb & Status Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>←</span> Back to Home
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {buildsmartEstimatorHero.badge}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Information & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                ENTERPRISE SOLUTION · CIVIL ENGINEERING & ESTIMATION
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans">
                BuildSmart <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Estimator</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans pt-2">
                {buildsmartEstimatorHero.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {buildsmartEstimatorHero.metrics.map((metric, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
                  <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs (No download buttons, strictly demo & explore) */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onScheduleDemo}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-semibold font-sans text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{buildsmartEstimatorHero.primaryAction}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreSpecs}
                className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800/50 text-slate-200 font-medium font-sans text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{buildsmartEstimatorHero.secondaryAction}</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Technology Tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              {buildsmartEstimatorHero.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/80 border border-slate-800 text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Parallax Media Console */}
          <div className="lg:col-span-6">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: '1000px'
              }}
              className="relative w-full"
            >
              <div
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="relative rounded-2xl border border-amber-500/30 bg-[#0B0F19]/90 shadow-2xl shadow-amber-500/10 backdrop-blur-xl overflow-hidden group"
              >
                {/* Console Header Bar */}
                <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      BuildSmart 360 Estimator · Structural Console
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                      OPERATIONAL
                    </span>
                  </div>
                </div>

                {/* Console Media Preview / Video Player */}
                <div className="relative aspect-video min-h-[340px] sm:min-h-[420px] w-full overflow-hidden bg-slate-950">
                  <ProductVideoStreamingPlayer
                    productId="buildsmart-estimator"
                    productTitle={buildsmartEstimatorHero.title}
                    imageUrl={buildsmartEstimatorHero.mediaImage}
                    compactMode={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
