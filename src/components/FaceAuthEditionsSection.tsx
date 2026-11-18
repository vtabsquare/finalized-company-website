import React from 'react';
import {
  UserCheck,
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { FACEAUTH_EDITIONS_INFO } from '../data/faceAuthData';

interface FaceAuthEditionsSectionProps {
  onScheduleDemo: (interestArea?: string) => void;
}

export const FaceAuthEditionsSection: React.FC<FaceAuthEditionsSectionProps> = ({
  onScheduleDemo,
}) => {
  const portal = FACEAUTH_EDITIONS_INFO.portal;
  const admin = FACEAUTH_EDITIONS_INFO.admin;

  return (
    <section id="deployment-ecosystem" className="relative py-20 lg:py-28 border-t border-slate-800/80 bg-[#060810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-14 space-y-3">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono">
            DEPLOYMENT ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-pretty">
            Self-service employee touchpoints. Centralized cloud administration.
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            A unified two-tier ecosystem combining responsive client web dashboards for clock-ins, breaks, and profile verification with comprehensive cloud-managed administrative oversight.
          </p>
        </div>

        {/* 2-Panel Deployment Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Employee Workspace & Punch Interface */}
          <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between space-y-6 overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            {/* Top Laser Border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-sky-400" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {portal.badge}
                </span>
                <div className="p-2 rounded-lg bg-blue-950/80 border border-blue-500/30 text-cyan-400">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {portal.name}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {portal.description}
              </p>

              {/* Console Box (Local Workstation Execution) */}
              <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs space-y-2">
                <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
                  <span>{portal.consoleTitle}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">ACTIVE</span>
                </div>
                {portal.consoleLines.map((line, lIdx) => (
                  <div key={lIdx} className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-300 gap-1 border-b border-white/5 pb-1">
                    <span className="text-slate-400">{line.label}</span>
                    <span className={`font-semibold ${line.highlight ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-2.5 pt-2">
                {portal.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onScheduleDemo('FaceAuth Employee Portal')}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group/btn"
              >
                <span>{portal.actionLabel}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Administrative Control & Security Suite */}
          <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between space-y-6 overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            {/* Top Laser Border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 to-cyan-400" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  {admin.badge}
                </span>
                <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {admin.name}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {admin.description}
              </p>

              {/* Console Box (Cloud Services Endpoint) */}
              <div className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs space-y-2">
                <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
                  <span>{admin.consoleTitle}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30">CONNECTED</span>
                </div>
                {admin.consoleLines.map((line, lIdx) => (
                  <div key={lIdx} className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-300 gap-1 border-b border-white/5 pb-1">
                    <span className="text-slate-400">{line.label}</span>
                    <span className={`font-semibold ${line.highlight ? 'text-cyan-300 truncate max-w-[280px]' : 'text-slate-200'}`}>
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-2.5 pt-2">
                {admin.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => onScheduleDemo('FaceAuth Central Command')}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:from-blue-500 hover:via-sky-400 hover:to-cyan-300 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] flex items-center justify-center gap-2 group/btn"
              >
                <span>{admin.actionLabel}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
