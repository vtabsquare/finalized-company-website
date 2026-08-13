import React from 'react';
import { Eye, Target, CheckCircle2, ArrowRight, User, Building2, ShieldCheck, Lightbulb, RefreshCw } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';
import { NeuralNetworkAnimation } from './animations/NeuralNetworkAnimation';

interface VisionMissionProps {
  isLightMode?: boolean;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ isLightMode = false }) => {

  return (
    <section className={`py-16 lg:py-24 relative overflow-hidden transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50 border-y border-slate-200' : 'bg-slate-950/60 border-y border-slate-800/80'
    }`}>
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Editorial Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-colors shadow-sm"
                 style={{
                   borderColor: isLightMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)',
                   backgroundColor: isLightMode ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.1)',
                   color: isLightMode ? '#2563eb' : '#60a5fa'
                 }}>
              Guiding Principles
            </div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight transition-colors flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              <span>Vision</span>
              <span className="hidden md:block font-sans font-light text-slate-300 dark:text-slate-700">•</span>
              <span>Mission</span>
              <span className="hidden md:block font-sans font-light text-slate-300 dark:text-slate-700">•</span>
              <span>Values</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* AI Network Layout — one connected system */}
        <div className="relative flex items-center justify-center min-h-[720px] lg:min-h-[560px]">

          {/* Far plane: distant, defocused network running behind the cards */}
          <div className="absolute inset-0 -mx-6 lg:-mx-8 z-0">
            <NeuralNetworkAnimation isLightMode={isLightMode} layer="far" />
          </div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center lg:gap-[240px]">

          {/* Vision Card */}
          <div className="w-full lg:w-[420px] shrink-0">
            <ScrollReveal animation="fade-right" delay={0.1}>
              <div className={`rounded-[28px] p-8 group border backdrop-blur-3xl shadow-[0_20px_60px_rgba(37,99,235,0.08)] relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${
                isLightMode 
                  ? 'bg-white/80 border-slate-200/80 hover:border-blue-400/50' 
                  : 'bg-white/[0.03] border-white/10 hover:border-blue-500/40 shadow-black/50'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-7 h-7" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Empowering People Through AI
                </h3>
                
                <p className={`text-[13px] leading-relaxed mb-7 font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Intelligent systems that remove repetitive work and sharpen decision making—so teams focus on innovation, not operations.
                </p>

                <div className={`h-px w-full mb-6 ${isLightMode ? 'bg-slate-200/80' : 'bg-white/10'}`} />

                <div className="flex flex-col gap-3">
                  {['Zero Job Displacement', 'Scalable & Affordable'].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className={`text-[13px] font-semibold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{bullet}</span>
                    </div>
                  ))}
                </div>

                <a href="#ai-portfolio" className={`mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-tight transition-colors ${
                  isLightMode ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                }`}>
                  Our approach
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Vertical breathing room for the AI Core on mobile */}
          <div className="h-[300px] lg:hidden" aria-hidden="true" />

          {/* Mission Card */}
          <div className="w-full lg:w-[420px] shrink-0">
            <ScrollReveal animation="fade-left" delay={0.3}>
              <div className={`rounded-[28px] p-8 group border backdrop-blur-3xl shadow-[0_20px_60px_rgba(99,102,241,0.08)] relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${
                isLightMode 
                  ? 'bg-white/80 border-slate-200/80 hover:border-indigo-400/50' 
                  : 'bg-white/[0.03] border-white/10 hover:border-indigo-500/40 shadow-black/50'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-7 h-7" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Practical AI, Not Experimental
                </h3>
                
                <p className={`text-[13px] leading-relaxed mb-7 font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Production-ready applications built on automation, machine learning and data intelligence—solving real business problems, not demos.
                </p>

                <div className={`h-px w-full mb-6 ${isLightMode ? 'bg-slate-200/80' : 'bg-white/10'}`} />

                <div className="flex flex-col gap-3">
                  {['Real-world Problem Solving', 'Production-grade ROI'].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span className={`text-[13px] font-semibold ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{bullet}</span>
                    </div>
                  ))}
                </div>

                <a href="#ai-portfolio" className={`mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-tight transition-colors ${
                  isLightMode ? 'text-indigo-600 hover:text-indigo-700' : 'text-indigo-400 hover:text-indigo-300'
                }`}>
                  See it in production
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          </div>

          {/* Near plane: cluster, packets, energy pulse and the AI Core sit above the cards */}
          <div className="absolute inset-0 -mx-6 lg:-mx-8 z-20 pointer-events-none">
            <NeuralNetworkAnimation isLightMode={isLightMode} layer="near" />
          </div>
        </div>

        {/* Enterprise Values Row */}
        <div className="pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                icon: User, title: 'Human First', desc: 'Designed to augment human capability, not replace it.', 
                lightBg: 'bg-blue-50', lightBorder: 'border-blue-200', lightText: 'text-blue-600', 
                darkBg: 'bg-blue-500/10', darkBorder: 'border-blue-500/30', darkText: 'text-blue-400',
                glowColor: 'via-blue-500', innerGlow: 'from-blue-500/10'
              },
              { 
                icon: Building2, title: 'Enterprise Grade', desc: 'Architected for massive scale and reliability.', 
                lightBg: 'bg-indigo-50', lightBorder: 'border-indigo-200', lightText: 'text-indigo-600', 
                darkBg: 'bg-indigo-500/10', darkBorder: 'border-indigo-500/30', darkText: 'text-indigo-400',
                glowColor: 'via-indigo-500', innerGlow: 'from-indigo-500/10'
              },
              { 
                icon: ShieldCheck, title: 'Security by Design', desc: 'Bank-grade encryption and privacy controls.', 
                lightBg: 'bg-emerald-50', lightBorder: 'border-emerald-200', lightText: 'text-emerald-600', 
                darkBg: 'bg-emerald-500/10', darkBorder: 'border-emerald-500/30', darkText: 'text-emerald-400',
                glowColor: 'via-emerald-500', innerGlow: 'from-emerald-500/10'
              },
              { 
                icon: Lightbulb, title: 'Practical Innovation', desc: 'Focusing on tools that deliver real ROI today.', 
                lightBg: 'bg-amber-50', lightBorder: 'border-amber-200', lightText: 'text-amber-600', 
                darkBg: 'bg-amber-500/10', darkBorder: 'border-amber-500/30', darkText: 'text-amber-400',
                glowColor: 'via-amber-500', innerGlow: 'from-amber-500/10'
              },
              { 
                icon: RefreshCw, title: 'Continuous Improvement', desc: 'Self-learning systems that evolve with you.', 
                lightBg: 'bg-purple-50', lightBorder: 'border-purple-200', lightText: 'text-purple-600', 
                darkBg: 'bg-purple-500/10', darkBorder: 'border-purple-500/30', darkText: 'text-purple-400',
                glowColor: 'via-purple-500', innerGlow: 'from-purple-500/10'
              },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={idx} animation="fade-up" delay={0.1 * idx} className="h-full">
                  <div className={`group h-full relative overflow-hidden rounded-[24px] border p-6 transition-all duration-500 hover:-translate-y-2 ${
                    isLightMode ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border-slate-200/80' : 'bg-white/[0.02] shadow-black/50 hover:shadow-black/70 border-white/10'
                  }`}>
                    {/* Hover Glow */}
                    <div className={`absolute -inset-x-0 -bottom-10 h-24 bg-gradient-to-t ${value.innerGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center border transition-colors ${
                      isLightMode ? `${value.lightBg} ${value.lightBorder} ${value.lightText}` : `${value.darkBg} ${value.darkBorder} ${value.darkText}`
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <h4 className={`text-lg font-bold mb-3 tracking-tight transition-colors ${
                      isLightMode ? 'text-slate-900' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {value.title}
                    </h4>
                    
                    <p className={`text-sm font-medium leading-relaxed ${
                      isLightMode ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {value.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
