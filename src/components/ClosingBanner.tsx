import React from 'react';
import { Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface ClosingBannerProps {
  onScheduleDemo: (interest?: string) => void;
  onOpenSandbox: () => void;
  isLightMode?: boolean;
}

const SALES_INTELLIGENCE_URL = 'https://sales.vtabsquare.com';

export const ClosingBanner: React.FC<ClosingBannerProps> = ({
  onScheduleDemo,
  isLightMode = false
}) => {
  const openSalesIntelligence = () => {
    window.open(SALES_INTELLIGENCE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Persistent launcher so the live application is reachable directly from www.vtabsquare.com */}
      <button
        type="button"
        onClick={openSalesIntelligence}
        aria-label="Open VTAB AI Sales Intelligence"
        title="Open VTAB AI Sales Intelligence"
        className={`fixed right-5 bottom-5 sm:right-7 sm:bottom-7 z-40 group flex items-center gap-3 rounded-full border px-4 py-3 sm:px-5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
          isLightMode
            ? 'bg-white/95 border-blue-200 text-slate-950 shadow-blue-900/15 hover:border-blue-400'
            : 'bg-slate-950/95 border-cyan-400/30 text-white shadow-cyan-950/40 hover:border-cyan-300/60'
        }`}
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-blue-900/30">
          <Sparkles className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-500">Live Application</span>
          <span className="text-sm font-bold">AI Sales Intelligence</span>
        </span>
        <ExternalLink className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      <section className={`py-24 relative overflow-hidden transition-colors duration-300 border-t ${isLightMode ? 'bg-gradient-to-b from-slate-50 via-white to-slate-50 border-slate-200' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800'}`}>
        <div className="glow-orb-blue top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-full w-fit mx-auto ${isLightMode ? 'bg-blue-100 border-blue-300' : 'bg-blue-500/10 border-blue-500/20'}`}>
              <span className={`flex h-2 w-2 rounded-full animate-pulse ${isLightMode ? 'bg-blue-600' : 'bg-blue-500'}`} />
              <span className={`text-[10px] uppercase tracking-widest font-bold ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>Transform Your Business Today</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className={`text-4xl sm:text-6xl font-bold tracking-tight leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">Build the Future</span>?
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Explore our live AI Sales Intelligence application or talk to our team about building governed AI solutions for your business.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={openSalesIntelligence}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-semibold rounded-xl shadow-xl shadow-blue-900/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="open-sales-intelligence-btn"
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-base">Open AI Sales Intelligence</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={() => onScheduleDemo()}
                className={`w-full sm:w-auto px-8 py-4 font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isLightMode
                    ? 'bg-white border-slate-300 text-slate-900 hover:border-blue-400 hover:text-blue-700'
                    : 'bg-white/[0.04] border-white/15 text-white hover:bg-white/[0.08] hover:border-cyan-400/40'
                }`}
                id="closing-book-demo-btn"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-base">Schedule a Demo</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
