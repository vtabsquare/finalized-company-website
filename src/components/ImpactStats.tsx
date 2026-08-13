import React, { useState, useEffect } from 'react';
import { IMPACT_NUMBERS } from '../data/contentData';
import { TrendingUp, Award, Zap, Shield, Sparkles } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface ImpactStatsProps {
  isLightMode?: boolean;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({ isLightMode = false }) => {
  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 border-t ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'}`}>
      {/* Background Orbs */}
      <div className="glow-orb-blue top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${isLightMode ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'}`}>
              <TrendingUp className={`w-3.5 h-3.5 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span>Measurable Enterprise Outcomes</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Impact <span className="text-gradient-primary">By The Numbers</span>
            </h2>
            <p className={`text-sm ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Quantifiable velocity and cost reduction delivered across client deployments.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {IMPACT_NUMBERS.map((stat, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={0.1 * idx}>
              <div
                className={`backdrop-blur-xl border rounded-2xl p-4 sm:p-6 text-center shadow-2xl relative group overflow-hidden transition-all h-full ${
                  isLightMode ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'bg-white/[0.03] border-white/10 hover:border-blue-500/40'
                }`}
              >
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full transition-all ${isLightMode ? 'bg-blue-50 group-hover:bg-blue-100' : 'bg-blue-500/5 group-hover:bg-blue-500/15'}`} />

                <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 tracking-tight font-mono ${isLightMode ? 'text-blue-600' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400'}`}>
                  {stat.value}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold mb-1 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>
                  {stat.label}
                </h3>

                <p className={`text-[10px] sm:text-xs ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
