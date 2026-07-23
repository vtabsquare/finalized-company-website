import React, { useEffect } from 'react';
import { Product } from '../types';
import { 
  ArrowLeft, 
  Target, 
  Zap,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Construction
} from 'lucide-react';
import { ScrollReveal } from './animations/ScrollReveal';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onScheduleDemo: (productTitle: string) => void;
  isLightMode?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onScheduleDemo,
  isLightMode = false,
}) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const detail = product.detailContent;

  const bgClass = isLightMode ? 'bg-white' : 'bg-[#030712]';
  const textPrimary = isLightMode ? 'text-slate-900' : 'text-white';
  const textMuted = isLightMode ? 'text-slate-600' : 'text-slate-300';
  const dividerClass = isLightMode ? 'border-slate-100' : 'border-[#1e293b]';
  const tagBgClass = isLightMode ? 'bg-slate-100 text-slate-800' : 'bg-white/5 text-slate-200 border border-white/10';
  
  return (
    <div className={`relative w-full min-h-screen font-sans animate-in fade-in duration-700 ${bgClass}`}>
      
      {/* Absolute Back Button (Top Left) */}
      <div className="absolute top-8 left-8 z-50">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-xl transition-all hover:-translate-x-1 cursor-pointer ${
            isLightMode 
              ? 'bg-white/90 text-slate-900 hover:bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]' 
              : 'bg-black/50 text-white hover:bg-black/80 border border-white/10 shadow-xl'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>
      </div>

      {/* VIDEO HEADER: Clean separation, no text on top */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden bg-[#020617]">
        {detail?.videoUrl ? (
          <video
            src={detail.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80'} 
            className="w-full h-full object-cover" 
            alt="Hero background" 
          />
        )}
      </div>

      {/* CONTENT BODY: Clean Whitespace, Reduced Gaps */}
      <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-16 md:space-y-24">

        {/* UNDER CONSTRUCTION BANNER */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="w-full flex items-center gap-4 p-4 md:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
            <div className="p-3 rounded-full bg-amber-500/20 shrink-0">
              <Construction className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold tracking-tight">Under Construction</h3>
              <p className="text-xs md:text-sm font-medium opacity-80 mt-1">This architecture deep-dive is currently being documented. Some details may be placeholders.</p>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Title & Description (Moved down here) */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500">
              {product.category}
            </p>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter font-heading leading-tight ${textPrimary}`}>
              {product.title}
            </h1>
            
            <p className={`text-lg md:text-xl font-light leading-relaxed max-w-2xl ${textMuted}`}>
              {product.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {product.techStack.map((tech, idx) => (
                <span key={idx} className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full ${tagBgClass}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* The Challenge */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">The Challenge</p>
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${textPrimary}`}>
                Why this was built
              </h2>
            </div>
            
            <div className="space-y-4">
              {detail?.challenge && detail.challenge.length > 0 ? (
                detail.challenge.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 group-hover:scale-150 transition-transform" />
                    <p className={`text-lg md:text-xl font-light leading-relaxed ${textMuted}`}>
                      {point}
                    </p>
                  </div>
                ))
              ) : (
                <p className={`text-lg md:text-xl font-light leading-relaxed ${textMuted}`}>No challenge data available.</p>
              )}
            </div>
          </section>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* The Approach */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">The Approach</p>
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${textPrimary}`}>
                Engineering a solution
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className={`text-lg md:text-xl font-light leading-relaxed ${textMuted}`}>
                {detail?.approach || product.fullDescription}
              </p>
            </div>
          </section>
        </ScrollReveal>

        <hr className={`w-full border-t ${dividerClass}`} />

        {/* Key Capabilities */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <section className="space-y-12">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500">Capabilities</p>
              <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${textPrimary}`}>
                What it can do
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {detail?.features && detail.features.length > 0 ? (
                detail.features.map((feature, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-2xl">
                      {feature.emoji}
                    </div>
                    <div className="space-y-2">
                      <h3 className={`text-xl font-bold tracking-tight ${textPrimary}`}>{feature.title}</h3>
                      <p className={`text-base font-light leading-relaxed ${textMuted}`}>{feature.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                product.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className={`text-lg font-medium tracking-tight ${textPrimary}`}>{feat}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </ScrollReveal>

      </div>

      {/* CALL TO ACTION BOTTOM */}
      <div className={`w-full ${isLightMode ? 'bg-slate-50 border-t border-slate-100' : 'bg-[#050b1a] border-t border-[#1e293b]'}`}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center space-y-10">
          
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-500 mb-2">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-500">Core Impact</p>
              <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight ${textPrimary}`}>
                {product.impactMetric}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="max-w-sm mx-auto pt-4">
              <button 
                onClick={() => onScheduleDemo(product.title)}
                className={`w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  isLightMode
                    ? 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-900/20'
                    : 'bg-white text-black hover:bg-slate-100 shadow-xl shadow-white/10'
                }`}
              >
                <span>Schedule a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

        </div>
      </div>
      
    </div>
  );
};

export default ProductDetailPage;
