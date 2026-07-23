import React from 'react';
import { Eye, Target, CheckCircle2, User, Building2, ShieldCheck, Lightbulb, RefreshCw, Cpu } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface VisionMissionProps {
  isLightMode?: boolean;
}

export const VisionMission: React.FC<VisionMissionProps> = ({ isLightMode = false }) => {

  return (
    <section className={`py-16 lg:py-20 relative overflow-hidden transition-colors duration-300 ${
      isLightMode ? 'bg-slate-50 border-y border-slate-200' : 'bg-slate-950/60 border-y border-slate-800/80'
    }`}>
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        
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

        {/* Asymmetric Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Vision Card (Cols 1-4) */}
          <div className="lg:col-span-4 h-full">
            <ScrollReveal animation="fade-right" delay={0.1} className="h-full">
              <div className={`h-full rounded-3xl p-8 group border backdrop-blur-2xl relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 ${
                isLightMode 
                  ? 'bg-white/80 border-slate-200/80 hover:border-blue-400/50 hover:shadow-blue-500/10 shadow-slate-200/50' 
                  : 'bg-white/[0.02] border-white/10 hover:border-blue-500/40 hover:shadow-blue-500/20 shadow-black/50'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-inner mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-7 h-7" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Empowering People Through AI
                </h3>
                
                <div className={`text-sm leading-relaxed mb-8 space-y-4 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  <p>We believe Artificial Intelligence should not replace people—it should empower them.</p>
                  <p>Our vision is to build intelligent systems that eliminate repetitive work, improve decision making, and allow organizations to focus on innovation instead of operations. We envision a future where every business, regardless of size, has access to enterprise-grade AI solutions that are simple, scalable, and affordable.</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-2">
                  {['Zero Job Displacement', 'Scalable & Affordable'].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      <span className={`text-xs font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* AI Core Visualization (Cols 5-8) */}
          <div className="lg:col-span-4 flex items-center justify-center py-8 lg:py-0 relative min-h-[300px]">
            <ScrollReveal animation="scale-up" delay={0.2}>
              <div className="relative flex items-center justify-center w-full h-full group">
                {/* Central Glowing Core */}
                <div className="absolute z-20 w-24 h-24 bg-blue-600/20 rounded-full blur-xl animate-pulse" />
                <div className={`absolute z-30 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border backdrop-blur-md transition-all duration-700 group-hover:rotate-180 ${
                  isLightMode ? 'bg-white/90 border-blue-200' : 'bg-slate-900/90 border-blue-500/30'
                }`}>
                  <Cpu className="w-8 h-8 text-blue-500" />
                </div>

                {/* Orbiting Rings */}
                <div className={`absolute w-[280px] h-[280px] rounded-full border border-dashed transition-all duration-1000 animate-[spin_30s_linear_infinite] ${
                  isLightMode ? 'border-slate-300' : 'border-slate-700'
                }`} />
                <div className={`absolute w-[380px] h-[380px] rounded-full border border-dotted transition-all duration-1000 animate-[spin_45s_linear_infinite_reverse] ${
                  isLightMode ? 'border-slate-200' : 'border-slate-800'
                }`} />
                
                {/* Floating Nodes */}
                <div className="absolute w-[280px] h-[280px] animate-[spin_30s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                </div>
                <div className="absolute w-[380px] h-[380px] animate-[spin_45s_linear_infinite_reverse]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Mission Card (Cols 9-12) */}
          <div className="lg:col-span-4 h-full">
            <ScrollReveal animation="fade-left" delay={0.3} className="h-full">
              <div className={`h-full rounded-3xl p-8 group border backdrop-blur-2xl relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 ${
                isLightMode 
                  ? 'bg-white/80 border-slate-200/80 hover:border-indigo-400/50 hover:shadow-indigo-500/10 shadow-slate-200/50' 
                  : 'bg-white/[0.02] border-white/10 hover:border-indigo-500/40 hover:shadow-indigo-500/20 shadow-black/50'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shadow-inner mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-7 h-7" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  Practical AI, Not Experimental
                </h3>
                
                <div className={`text-sm leading-relaxed mb-8 space-y-4 ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  <p>At VTab Square, we are building practical AI—not experimental AI.</p>
                  <p>Our mission is to create intelligent applications that solve real-world business challenges through automation, machine learning, natural language processing, and data intelligence. We convert complex enterprise data and manual bottlenecks into seamless automated pipelines.</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-2">
                  {['Real-world Problem Solving', 'Production-grade ROI'].map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                      <span className={`text-xs font-semibold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Enterprise Values Row */}
        <div className="pt-8">
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
                  <div className={`group h-full relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                    isLightMode ? 'bg-white shadow-sm hover:shadow-md border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    {/* Hover Glow */}
                    <div className={`absolute -inset-x-0 -bottom-10 h-24 bg-gradient-to-t ${value.innerGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center border transition-colors ${
                      isLightMode ? `${value.lightBg} ${value.lightBorder} ${value.lightText}` : `${value.darkBg} ${value.darkBorder} ${value.darkText}`
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <h4 className={`text-lg font-bold mb-2 transition-colors ${
                      isLightMode ? 'text-slate-900' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {value.title}
                    </h4>
                    
                    <p className={`text-sm leading-relaxed ${
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
