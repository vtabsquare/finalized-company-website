import React from 'react';
import { Calendar, Bot, Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface ClosingBannerProps {
  onScheduleDemo: (interest?: string) => void;
  onOpenSandbox: () => void;
  isLightMode?: boolean;
}

export const ClosingBanner: React.FC<ClosingBannerProps> = ({
  onScheduleDemo,
  onOpenSandbox,
  isLightMode = false
}) => {
  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-300 border-t ${isLightMode ? 'bg-gradient-to-b from-slate-50 via-white to-slate-50 border-slate-200' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800'}`}>
      {/* Background Orbs */}
      <div className="glow-orb-blue top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Badge */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-full w-fit mx-auto ${isLightMode ? 'bg-blue-100 border-blue-300' : 'bg-blue-500/10 border-blue-500/20'}`}>
            <span className={`flex h-2 w-2 rounded-full animate-pulse ${isLightMode ? 'bg-blue-600' : 'bg-blue-500'}`} />
            <span className={`text-[10px] uppercase tracking-widest font-bold ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>Transform Your Business Today</span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <h2 className={`text-4xl sm:text-6xl font-bold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">Build the Future</span>?
          </h2>
        </ScrollReveal>

        {/* Subtext */}
        <ScrollReveal animation="fade-up" delay={0.3}>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
            Let's create intelligent applications that transform the way your business works.
          </p>
        </ScrollReveal>

        {/* Dual CTAs */}
        <ScrollReveal animation="fade-up" delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onScheduleDemo()}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="closing-book-demo-btn"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onScheduleDemo('Talk to Our AI Experts')}
              className={`w-full sm:w-auto px-8 py-4 border font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLightMode ? 'border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 bg-white shadow-sm' : 'border-slate-700 hover:border-slate-500 text-slate-200'
              }`}
              id="closing-talk-experts-btn"
            >
              <Bot className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>Contact Experts</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
