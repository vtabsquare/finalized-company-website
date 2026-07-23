import React from 'react';
import { Sparkles, ShieldCheck, Zap, Wrench, Brain, Layers, Play } from 'lucide-react';
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

  const deliverySteps = ['Consulting', 'Architecture', 'Development', 'Deployment', 'Support'];

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
            <ScrollReveal key={idx} animation="fade-up" delay={0.1 * idx} className={getBentoClasses(idx)}>
              <div
                className={`group relative overflow-hidden rounded-3xl border backdrop-blur-2xl p-8 shadow-2xl transition-all duration-500 h-full w-full flex ${
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
          <div className={`w-full border backdrop-blur-2xl rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group transition-all duration-500 ${
            isLightMode ? 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border-slate-200 hover:border-blue-300' : 'bg-gradient-to-r from-blue-900/10 via-black/40 to-purple-900/10 border-white/5 hover:border-blue-500/20'
          }`}>
            <div className={`absolute top-0 right-0 p-8 opacity-10 ${isLightMode ? 'text-blue-600' : 'text-blue-500'}`}>
              <Play className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 lg:mb-12">
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Our End-to-End AI Lifecycle</h3>
                <p className={`font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>From strategic audit to 24/7 managed model monitoring.</p>
              </div>
              
              <button onClick={onScheduleDemo} className={`shrink-0 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg backdrop-blur-md cursor-pointer ${
                isLightMode ? 'bg-blue-600 hover:bg-blue-700 text-white border-transparent' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}>
                Start Your Journey
              </button>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-4 lg:gap-0">
              {/* Connecting line */}
              <div className={`hidden sm:block absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0 ${
                isLightMode ? 'bg-gradient-to-r from-blue-200/0 via-blue-300 to-blue-200/0' : 'bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0'
              }`} />
              
              {deliverySteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`relative z-10 flex items-center sm:flex-col gap-4 sm:gap-3 p-4 sm:p-0 rounded-2xl sm:rounded-none border sm:border-none group/step cursor-default ${
                    isLightMode ? 'bg-white/50 sm:bg-transparent border-slate-200' : 'bg-black/50 sm:bg-transparent border-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center font-bold text-sm sm:text-base group-hover/step:bg-blue-600 group-hover/step:border-blue-500 group-hover/step:text-white transition-all duration-300 ${
                    isLightMode ? 'bg-white border-slate-300 text-slate-500 group-hover/step:shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-400 group-hover/step:shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  }`}>
                    0{idx + 1}
                  </div>
                  <span className={`font-semibold transition-colors ${
                    isLightMode ? 'text-slate-700 group-hover/step:text-blue-700' : 'text-slate-300 group-hover/step:text-blue-300'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
