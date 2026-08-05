import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductVideoStreamingPlayer } from './ProductVideoStreamingPlayer';
import { getValidImageUrl } from '../utils/imageFallback';
import { useIsMobile } from '../hooks/useIsMobile';
import { 
  BarChart3, 
  ArrowLeftRight, 
  Home, 
  Calculator, 
  ScanFace, 
  PackageCheck, 
  Headphones, 
  DatabaseZap, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  Pause, 
  CheckCircle2,
  Activity,
  Maximize2,
  Minimize2,
  Download
} from 'lucide-react';

interface ProductSlideshowProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onScheduleDemo: (productTitle?: string) => void;
  isLightMode?: boolean;
}

export const ProductSlideshow: React.FC<ProductSlideshowProps> = ({
  products,
  onSelectProduct,
  onScheduleDemo,
  isLightMode = false
}) => {
  const isMobile = useIsMobile(1024);
  const isDesktop = !isMobile;

  const featuredProducts = products.filter(p => p.featured === true);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedId = sessionStorage.getItem('last_selected_product_id');
    if (savedId && featuredProducts.length > 0) {
      const idx = featuredProducts.findIndex(p => p.id === savedId);
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCinematic, setIsCinematic] = useState(false);

  useEffect(() => {
    const savedId = sessionStorage.getItem('last_selected_product_id');
    if (savedId && featuredProducts.length > 0) {
      const idx = featuredProducts.findIndex(p => p.id === savedId);
      if (idx !== -1 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  }, [featuredProducts.length]);

  useEffect(() => {
    if (featuredProducts.length > 0 && featuredProducts[currentIndex]) {
      sessionStorage.setItem('last_selected_product_id', featuredProducts[currentIndex].id);
    }
  }, [currentIndex, featuredProducts]);

  // Restart animation key when slide changes
  const [animationKey, setAnimationKey] = useState(0);

  // Auto-advance timer
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setTimeout(() => {
      handleNext();
    }, 8000); // 8 seconds per slide

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, featuredProducts.length, animationKey]);

  if (featuredProducts.length === 0) return null;

  const currentProduct = featuredProducts[currentIndex];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-blue-400" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="w-6 h-6 text-purple-400" />;
      case 'Home': return <Home className="w-6 h-6 text-cyan-400" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-emerald-400" />;
      case 'ScanFace': return <ScanFace className="w-6 h-6 text-amber-400" />;
      case 'PackageCheck': return <PackageCheck className="w-6 h-6 text-indigo-400" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-rose-400" />;
      case 'DatabaseZap': return <DatabaseZap className="w-6 h-6 text-teal-400" />;
      default: return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    setAnimationKey(k => k + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    setAnimationKey(k => k + 1);
  };

  return (
    <div className={`relative w-full overflow-hidden flex flex-col border-y transition-colors duration-300 ${isLightMode ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border-slate-200/80 shadow-xl' : 'bg-[#030712] border-white/5'}`}>
      
      {/* ─── MOBILE / TABLET LAYOUT (< lg) ─── */}
      {!isDesktop && (
      <div className="flex flex-col">
        {/* Video on top */}
        <div className="relative w-full aspect-video overflow-hidden">
          <ProductVideoStreamingPlayer
            key={currentProduct.id + '-mobile'}
            productId={currentProduct.id}
            productTitle={currentProduct.title}
            imageUrl={getValidImageUrl(currentProduct.imageUrl, currentProduct.category, currentProduct.title, currentProduct.id)}
            videoUrl={currentProduct.detailContent?.videoUrl || (currentProduct.demoSnippet as any)?.videoUrl}
            compactMode={false}
            isCinematic={false}
            onToggleCinematic={() => {}}
            isActive={!isDesktop}
          />
          {/* Gradient overlay bottom */}
          <div className={`absolute inset-x-0 bottom-0 h-16 ${isLightMode ? 'bg-gradient-to-t from-slate-50' : 'bg-gradient-to-t from-[#030712]'}`} />
        </div>

        {/* Content below video */}
        <div key={animationKey} className="px-4 py-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl border shadow-lg backdrop-blur-xl shrink-0 ${isLightMode ? 'bg-gradient-to-br from-blue-700 to-blue-600 border-blue-500/20 text-white' : 'bg-black/60 border-white/15 text-blue-400'}`}>
              {renderIcon(currentProduct.iconName)}
            </div>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-0.5 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`}>
                {currentProduct.category}{currentProduct.subcategory ? ` • ${currentProduct.subcategory}` : ''}
              </span>
              <h3 className={`text-xl font-heading font-extrabold tracking-tight leading-tight line-clamp-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {currentProduct.title}
              </h3>
            </div>
          </div>

          <p className={`text-sm leading-relaxed font-medium line-clamp-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            {currentProduct.fullDescription}
          </p>

          {/* Features - 1 col on mobile */}
          <div className="grid grid-cols-1 gap-2">
            {currentProduct.keyFeatures.slice(0, 3).map((feat, idx) => (
              <div key={idx} className={`flex items-start gap-2 border px-3 py-2 rounded-xl backdrop-blur-md ${isLightMode ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-800' : 'bg-black/40 border-white/5 text-slate-200'}`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLightMode ? 'text-blue-600' : 'text-emerald-400'}`} />
                <span className="text-xs font-semibold leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>

          {/* Impact badge */}
          <div className={`inline-flex px-4 py-2 border rounded-xl backdrop-blur-md ${isLightMode ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/80 shadow-sm' : 'bg-blue-500/10 border-blue-500/20'}`}>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-[0.15em] block mb-0.5 ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>Impact Delivered</span>
              <span className={`text-base font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{currentProduct.impactMetric}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={() => onSelectProduct(currentProduct)}
              className="w-full px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 shadow-xl shadow-blue-600/25 border border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="tracking-wide">Explore Architecture & Specs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onScheduleDemo(currentProduct.title)}
              className={`w-full px-5 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isLightMode
                  ? 'text-slate-800 bg-white/90 border-slate-200/90'
                  : 'text-slate-100 bg-slate-900/80 border-white/15'
              }`}
            >
              <Activity className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span className="tracking-wide">Book Live Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile nav: dots + arrows in a bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-t ${isLightMode ? 'border-slate-200 bg-white/60' : 'border-white/5 bg-black/40'}`}>
          <button onClick={handlePrev} className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-slate-300'}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-xl ${isLightMode ? 'bg-white/80 border-slate-300' : 'bg-black/40 border-white/10'}`}>
            {featuredProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => { setCurrentIndex(idx); setIsPlaying(false); setAnimationKey(k => k + 1); }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                    : isLightMode ? 'w-2 h-2 bg-slate-400' : 'w-2 h-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          <button onClick={handleNext} className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md ${isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-black/40 border-white/10 text-slate-300'}`}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      )}

      {/* ─── DESKTOP LAYOUT (lg+) ─── */}
      {isDesktop && (
      <div className="relative min-h-[700px]">
      {/* Luminous Ambient Background Glows for Light Mode */}
      {isLightMode && (
        <>
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Full-Bleed Cinematic Background */}
      <div className="absolute inset-0 z-0 flex justify-end">
        {/* Left & Bottom Gradient Masks to ensure text readability */}
        <div className={`absolute inset-0 z-10 w-full lg:w-2/3 transition-opacity duration-700 ${
          isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${isLightMode ? 'bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent' : 'bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent'}`} />
        
        <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${
          isCinematic ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${isLightMode ? 'bg-gradient-to-t from-slate-50 via-transparent to-transparent' : 'bg-gradient-to-t from-[#030712] via-transparent to-transparent'}`} />
        
        {/* Video Player pushed to the right or expanded */}
        <div className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCinematic 
            ? 'w-full opacity-100 mix-blend-normal z-30' 
            : isLightMode
              ? 'w-full lg:w-[65%] opacity-95 mix-blend-normal shadow-2xl rounded-2xl overflow-hidden border border-slate-200/80 z-0'
              : 'w-full lg:w-[65%] opacity-70 mix-blend-screen z-0'
        }`}>
          <ProductVideoStreamingPlayer
            key={currentProduct.id}
            productId={currentProduct.id}
            productTitle={currentProduct.title}
            imageUrl={getValidImageUrl(currentProduct.imageUrl, currentProduct.category, currentProduct.title, currentProduct.id)}
            videoUrl={currentProduct.detailContent?.videoUrl || (currentProduct.demoSnippet as any)?.videoUrl}
            compactMode={false}
            isCinematic={isCinematic}
            onToggleCinematic={() => setIsCinematic(!isCinematic)}
            isActive={isDesktop}
          />
        </div>
      </div>

      {/* Floating Content Foreground */}
      <div className={`relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-8 py-8 h-full flex flex-col justify-center ${
        isCinematic ? 'pointer-events-none' : ''
      }`}>
        
        {/* Tagline */}
        <div className={`mb-6 transition-all duration-700 ${isCinematic ? 'opacity-0 -translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
          <span className={`px-4 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md ${isLightMode ? 'bg-blue-50/80 border-blue-200/80 text-blue-700' : 'bg-white/5 border-white/10 text-slate-300'}`}>
            Featured Platform Showcase
          </span>
        </div>

        {/* Dynamic Content - re-renders with animation when key changes */}
        <div 
          key={animationKey} 
          className={`w-full lg:w-[55%] space-y-5 transition-all duration-700 ease-out fill-mode-both ${
            isCinematic 
              ? 'opacity-0 -translate-x-12 pointer-events-none' 
              : 'opacity-100 translate-x-0 animate-in fade-in slide-in-from-left-8 duration-700'
          }`}
        >
          
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl border shadow-xl backdrop-blur-xl ${isLightMode ? 'bg-gradient-to-br from-blue-700 to-blue-600 border-blue-500/20 text-white shadow-blue-500/20' : 'bg-black/60 border-white/15 text-blue-400'}`}>
              {renderIcon(currentProduct.iconName)}
            </div>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-[0.2em] block mb-1 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`}>
                {currentProduct.category}{currentProduct.subcategory ? ` • ${currentProduct.subcategory}` : ''}
              </span>
              <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight line-clamp-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                {currentProduct.title}
              </h3>
            </div>
          </div>

          <p className={`text-sm sm:text-base leading-relaxed max-w-2xl font-medium line-clamp-3 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            {currentProduct.fullDescription}
          </p>

          {/* Key Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {currentProduct.keyFeatures.map((feat, idx) => (
              <div key={idx} className={`flex items-start gap-2.5 border px-3.5 py-2.5 rounded-xl backdrop-blur-md transition-all ${isLightMode ? 'bg-white/90 border-slate-200/90 shadow-sm text-slate-800 hover:border-blue-300' : 'bg-black/40 border-white/5 text-slate-200'}`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isLightMode ? 'text-blue-600' : 'text-emerald-400'}`} />
                <span className="text-xs font-semibold leading-relaxed line-clamp-2">{feat}</span>
              </div>
            ))}
          </div>

          {/* Metrics & Impact Badge */}
          <div className="flex flex-wrap items-center gap-4 max-w-2xl">
            <div className={`px-5 py-3 border rounded-xl backdrop-blur-md ${isLightMode ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/80 shadow-sm' : 'bg-blue-500/10 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]'}`}>
              <span className={`text-[10px] uppercase font-bold tracking-[0.15em] block mb-1 ${isLightMode ? 'text-blue-700' : 'text-blue-400'}`}>Impact Delivered</span>
              <span className={`text-lg font-extrabold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{currentProduct.impactMetric}</span>
            </div>

            <div className={`px-5 py-3 border rounded-xl backdrop-blur-md ${isLightMode ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'}`}>
              <span className={`text-[10px] uppercase font-bold tracking-[0.15em] block mb-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Tech Stack</span>
              <div className="flex gap-2">
                {currentProduct.techStack.slice(0, 3).map((st, i) => (
                  <span key={i} className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isLightMode ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-cyan-500/10 text-cyan-300'}`}>
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectProduct(currentProduct)}
              className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-500 hover:to-cyan-500 shadow-xl shadow-blue-600/25 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
            >
              <span className="tracking-wide">Explore Architecture & Specs</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onScheduleDemo(currentProduct.title)}
              className={`px-6 py-3 rounded-xl text-sm font-bold border backdrop-blur-xl transition-all flex items-center gap-2.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] ${
                isLightMode 
                  ? 'text-slate-800 bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-lg' 
                  : 'text-slate-100 bg-slate-900/80 hover:bg-slate-800/90 border-white/15 hover:border-white/30 hover:shadow-xl'
              }`}
            >
              <Activity className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span className="tracking-wide">Book Live Demo</span>
            </button>
          </div>

        </div>
      </div>

      {/* Top Right Controls (Play/Pause, Expand Video & Nav Arrows) */}
      <div className="absolute top-3 right-3 sm:top-8 sm:right-8 lg:right-12 z-30 hidden lg:flex flex-wrap items-center gap-2 max-w-[calc(100%-1.5rem)] justify-end">
        <button
          onClick={() => setIsCinematic(!isCinematic)}
          className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
            isCinematic
              ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 hover:border-amber-400'
              : isLightMode
                ? 'bg-white hover:bg-blue-50/80 border-blue-200 text-blue-600 shadow-md hover:border-blue-300'
                : 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 border-cyan-400/50 text-cyan-300 animate-pulse'
          }`}
          title={isCinematic ? 'Exit Full View (Show Text)' : 'Expand Video (Hide Text)'}
        >
          {isCinematic ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4 text-blue-600" />}
          <span className="hidden sm:inline text-sm font-bold">{isCinematic ? 'Show Text' : 'Expand Video'}</span>
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md ${
            isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'
          }`}
          title={isPlaying ? 'Pause Slideshow' : 'Autoplay Slideshow'}
        >
          {isPlaying ? <Pause className={`w-4 h-4 ${isLightMode ? 'text-amber-600' : 'text-amber-400'}`} /> : <Play className={`w-4 h-4 ${isLightMode ? 'text-emerald-600' : 'text-emerald-400'}`} />}
          <span className="hidden sm:inline text-sm font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button onClick={handlePrev} className={`w-11 h-11 shrink-0 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-md ${
          isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'
        }`}>
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button onClick={handleNext} className={`w-11 h-11 shrink-0 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer shadow-xl backdrop-blur-md ${
          isLightMode ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 shadow-md' : 'bg-black/40 hover:bg-black/60 border-white/10 text-slate-300 hover:text-white'
        }`}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Apple-Style Minimalist Dot Navigation */}
      <div className={`absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-2.5 p-2.5 rounded-full border backdrop-blur-xl shadow-2xl ${
        isLightMode ? 'bg-white/80 border-slate-300' : 'bg-black/40 border-white/10'
      }`}>
        {featuredProducts.map((p, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={p.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
                setAnimationKey(k => k + 1);
              }}
              title={p.title}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'w-6 h-2 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                  : isLightMode ? 'w-2 h-2 bg-slate-400 hover:bg-slate-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          );
        })}
      </div>

      </div>
      )}
    </div>
  );
};
