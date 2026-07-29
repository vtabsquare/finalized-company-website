import React from 'react';
import { Sparkles, ShieldCheck, Zap, Wrench, Brain, Layers, Play, Code2, Rocket, ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/contentData';
import { ScrollReveal } from './animations/ScrollReveal';

interface WhyChooseUsProps {
  onScheduleDemo: () => void;
  isLightMode?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onScheduleDemo, isLightMode = false }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkle':
        return <Sparkles className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6" />;
      case 'Brain':
        return <Brain className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const lifecycleSteps = [
    {
      title: 'Consulting',
      desc: 'Strategic audit & feasibility analysis.',
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: 'Architecture',
      desc: 'System design & data pipeline mapping.',
      icon: <Layers className="w-5 h-5" />
    },
    {
      title: 'Development',
      desc: 'Model training & agent synthesis.',
      icon: <Code2 className="w-5 h-5" />
    },
    {
      title: 'Deployment',
      desc: 'Sandboxed testing & cloud rollout.',
      icon: <Rocket className="w-5 h-5" />
    },
    {
      title: 'Support',
      desc: '24/7 managed model monitoring.',
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  const getBentoClasses = (idx: number) => {
    switch (idx) {
      case 0:
        return 'md:col-span-2 md:row-span-1 h-full';
      case 1:
        return 'md:col-span-1 md:row-span-2 h-full';
      case 4:
        return 'md:col-span-1 h-full';
      case 5:
        return 'md:col-span-2 h-full';
      default:
        return 'md:col-span-1 h-full';
    }
  };

  return (
    <section className={`py-24 lg:py-32 relative overflow-hidden transition-colors duration-300 border-t ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#030712] border-white/5'}`}>
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md ${isLightMode ? 'bg-blue-100/50 border-blue-300 text-blue-700' : 'bg-blue-950/30 border-blue-500/20 text-blue-400'}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Competitive Advantage</span>
            </div>

            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">VTab Square</span>
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              We don't deliver generic software services. We engineer production-grade AI applications built specifically for your domain.
            </p>
          </div>
        </ScrollReveal>

        {/* Asymmetric Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-auto md:auto-rows-[minmax(220px,auto)] mb-4 lg:mb-6">
          
          {WHY_CHOOSE_US.map((item, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={0.05 * idx} className={getBentoClasses(idx)}>
              <div
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-2xl p-5 sm:p-8 shadow-2xl transition-all duration-500 h-full w-full flex ${
                  idx === 0 ? `flex-col sm:flex-row items-start sm:items-center gap-6 ${isLightMode ? 'bg-gradient-to-br from-blue-50 to-white hover:border-blue-300 border-slate-200 shadow-sm' : 'bg-gradient-to-br from-blue-900/20 to-black/40 hover:border-blue-500/30 border-white/5'}` :
                  idx === 1 ? `flex-col justify-between ${isLightMode ? 'bg-gradient-to-b from-emerald-50 to-white hover:border-emerald-300 border-slate-200 shadow-sm' : 'bg-gradient-to-b from-emerald-900/20 to-black/40 hover:border-blue-500/30 border-white/5'}` :
                  idx === 4 ? `flex-col ${isLightMode ? 'bg-gradient-to-tr from-purple-50 to-white hover:border-purple-300 border-slate-200 shadow-sm' : 'bg-gradient-to-tr from-purple-900/20 to-black/40 hover:border-blue-500/30 border-white/5'}` :
                  idx === 5 ? `flex-col sm:flex-row-reverse items-start sm:items-center gap-6 ${isLightMode ? 'bg-gradient-to-bl from-rose-50 to-white hover:border-rose-300 border-slate-200 shadow-sm' : 'bg-gradient-to-bl from-rose-900/20 to-black/40 hover:border-blue-500/30 border-white/5'}` :
                  `flex-col ${isLightMode ? 'bg-white hover:border-slate-300 border-slate-200 shadow-sm' : 'bg-black/40 hover:border-blue-500/30 border-white/5'}`
                }`}
              >
                {/* Subtle hover gradient follow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 sm:mb-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${
                  idx === 0 ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 sm:mr-2 sm:mb-0' :
                  idx === 1 ? (isLightMode ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 mb-6' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6') :
                  idx === 2 ? (isLightMode ? 'bg-amber-100 text-amber-600 border border-amber-200 mb-6' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6') :
                  idx === 3 ? (isLightMode ? 'bg-cyan-100 text-cyan-600 border border-cyan-200 mb-6' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6') :
                  idx === 4 ? (isLightMode ? 'bg-purple-100 text-purple-600 border border-purple-200 mb-6' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6') :
                  (isLightMode ? 'bg-rose-100 text-rose-600 border border-rose-200 sm:ml-2 sm:mb-0' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 sm:ml-2 sm:mb-0')
                }`}>
                  {renderIcon(item.icon)}
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className={`text-xl lg:text-2xl font-bold mb-3 tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm lg:text-base leading-relaxed font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Decorative background element for the tall card (Enterprise Ready) */}
                {idx === 1 && (
                  <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                    <ShieldCheck className="w-64 h-64" />
                  </div>
                )}
                {/* Decorative background element for AI First */}
                {idx === 0 && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                    <Sparkles className="w-48 h-48" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}

        </div>

        {/* Timeline Bento Card */}
        {/* Timeline Bento Card */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className={`w-full border backdrop-blur-2xl rounded-3xl p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden group transition-all duration-500 ${
            isLightMode ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50/50 border-slate-200' : 'bg-gradient-to-br from-slate-900/40 via-black/40 to-blue-900/10 border-white/5'
          }`}>
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/10 to-transparent blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 to-transparent blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border ${
                  isLightMode ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>The VTab Methodology</span>
                </div>
                <h3 className={`text-3xl font-extrabold mb-3 tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  End-to-End <span className={isLightMode ? 'text-blue-600' : 'text-blue-400'}>AI Lifecycle</span>
                </h3>
                <p className={`font-medium text-sm md:text-base leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  We don't just build models; we engineer intelligent systems. From the initial strategic audit to 24/7 managed monitoring, our proven methodology ensures risk-free enterprise deployment.
                </p>
              </div>
              
              <button onClick={onScheduleDemo} className={`shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer group/btn ${
                isLightMode ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30' : 'bg-white hover:bg-slate-100 text-slate-900 shadow-white/10'
              }`}>
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 mt-8">
              {/* Desktop Connecting Line */}
              <div className={`hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] z-0 ${
                isLightMode ? 'bg-slate-100' : 'bg-slate-800'
              }`}>
                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 w-full opacity-50" />
              </div>

              {lifecycleSteps.map((step, idx) => (
                <div key={idx} className="relative z-10 group/step cursor-default">
                  {/* Icon Node */}
                  <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center border-2 shadow-lg mb-4 transition-all duration-300 transform group-hover/step:-translate-y-2 group-hover/step:scale-110 ${
                    isLightMode 
                      ? 'bg-white border-slate-100 text-slate-400 group-hover/step:border-blue-500 group-hover/step:text-blue-600 group-hover/step:shadow-[0_8px_20px_rgba(37,99,235,0.15)]' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 group-hover/step:border-blue-500 group-hover/step:text-blue-400 group-hover/step:shadow-[0_8px_20px_rgba(37,99,235,0.25)]'
                  }`}>
                    {step.icon}
                  </div>
                  
                  {/* Content Card */}
                  <div className={`p-5 rounded-2xl border text-center transition-all duration-300 transform group-hover/step:-translate-y-1 h-full ${
                    isLightMode
                      ? 'bg-white/60 border-slate-200 group-hover/step:bg-white group-hover/step:border-blue-200 group-hover/step:shadow-xl'
                      : 'bg-black/40 border-white/5 group-hover/step:bg-slate-900 group-hover/step:border-white/10 group-hover/step:shadow-2xl'
                  }`}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50">Step 0{idx + 1}</div>
                    <h4 className={`text-sm font-bold mb-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{step.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
