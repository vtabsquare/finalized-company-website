import React, { useState } from 'react';
import { Product } from '../types';
import { useProjects } from '../hooks/useProjects';
import { ProductSlideshow } from './ProductSlideshow';
import { ScrollReveal } from './animations/ScrollReveal';
import { getValidImageUrl, handleImageError } from '../utils/imageFallback';
import { 
  BarChart3, 
  ArrowLeftRight, 
  Home, 
  Calculator, 
  ScanFace, 
  PackageCheck, 
  Headphones, 
  DatabaseZap, 
  Search, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProduct: (product: Product) => void;
  onScheduleDemo: (productTitle?: string) => void;
  isLightMode?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProduct,
  onScheduleDemo,
  isLightMode = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { projects: products, loading } = useProjects();

  const categories = [
    'All',
    'Analytics & BI',
    'Enterprise Automation',
    'Database & Migration',
    'AI Vision & Construction',
    'Logistics'
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-blue-400" />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight className="w-6 h-6 text-purple-400" />;
      case 'Home':
        return <Home className="w-6 h-6 text-cyan-400" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-emerald-400" />;
      case 'ScanFace':
        return <ScanFace className="w-6 h-6 text-amber-400" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6 text-indigo-400" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-rose-400" />;
      case 'DatabaseZap':
        return <DatabaseZap className="w-6 h-6 text-teal-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section 
      id="ai-portfolio" 
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${
        isLightMode 
          ? 'bg-gradient-to-b from-slate-50 via-blue-50/50 to-indigo-50/30 text-slate-900' 
          : 'bg-slate-950/80 text-white'
      }`}
    >
      {/* Background orbs */}
      <div className="glow-orb-purple top-20 right-10 opacity-30" />
      <div className="glow-orb-blue bottom-10 left-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isLightMode 
                ? 'bg-blue-100/80 border border-blue-300 text-blue-800' 
                : 'bg-blue-950/80 border border-blue-500/30 text-blue-300'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Proven AI Solutions</span>
            </div>

            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              Our AI <span className="text-gradient-primary">Portfolio</span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Enterprise-grade AI products engineered to transform operations, automate reporting, and scale your organization.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Product Showcase Carousel with 30-Second Video Player */}
        <ScrollReveal animation="fade-up" delay={0.2}>
        {loading ? (
          <div className="w-full h-[650px] lg:h-[700px] flex items-center justify-center border-y border-slate-200/20">
             <div className={`animate-pulse flex flex-col items-center gap-4 ${isLightMode ? 'text-blue-600' : 'text-blue-400'}`}>
               <Sparkles className="w-8 h-8 animate-spin-slow" />
               <span className="text-sm font-semibold tracking-widest uppercase">Loading AI Portfolio...</span>
             </div>
          </div>
        ) : (
          <ProductSlideshow 
            products={products} 
            onSelectProduct={onSelectProduct} 
            onScheduleDemo={onScheduleDemo} 
            isLightMode={isLightMode}
          />
        )}
        </ScrollReveal>

        {/* Filters and Search Bar */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16 lg:mt-24 mb-8 bg-slate-900/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30'
                      : isLightMode
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                  id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isLightMode ? 'text-slate-400' : 'text-slate-400'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or tags..."
                className={`w-full pl-10 pr-4 py-1.5 rounded-xl text-xs transition-all ${
                  isLightMode
                    ? 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none shadow-sm'
                    : 'bg-slate-900/90 border border-slate-800 focus:border-blue-500 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                }`}
              />
            </div>

          </div>
        </ScrollReveal>

        {/* Portfolio Cards Grid strictly showing Product Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => {
            return (
              <ScrollReveal key={product.id} animation="fade-up" delay={0.05 * (idx % 3)}>
                <div
                  className={`backdrop-blur-xl h-full rounded-2xl shadow-2xl flex flex-col justify-between group relative overflow-hidden transition-all duration-500 border hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] ${
                    isLightMode
                      ? 'bg-white/95 border-slate-200/90 hover:border-blue-500/80 shadow-slate-200/60'
                      : 'bg-gradient-to-b from-white/[0.05] to-white/[0.01] border-white/10 hover:border-cyan-500/50 shadow-black/60'
                  }`}
                >
                  {/* Illuminated Top Neon Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  {/* Product Picture Header */}
                  <div className={`relative h-48 w-full overflow-hidden ${
                    isLightMode ? 'bg-slate-900 text-white' : 'bg-black/80'
                  }`}>
                    <div className="relative w-full h-full">
                      <img
                        src={getValidImageUrl(product.imageUrl, product.category, product.title, product.id)}
                        onError={handleImageError(product.category, product.title, product.id)}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/30 to-transparent" />
                    </div>

                    {/* Top Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <div className="p-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 shadow-lg pointer-events-auto group-hover:scale-110 transition-transform">
                        {renderIcon(product.iconName)}
                      </div>

                      <span className="text-[9px] text-cyan-300 uppercase font-extrabold tracking-wider px-2.5 py-1 bg-black/80 backdrop-blur-md border border-cyan-500/40 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        {product.impactMetric}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 pt-4 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      {/* Category Pill */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                        isLightMode ? 'text-blue-700' : 'text-cyan-400'
                      }`}>
                        {product.category}
                      </span>

                      {/* Title */}
                      <h3 className={`text-xl font-black transition-colors mb-2 ${
                        isLightMode ? 'text-slate-900 group-hover:text-blue-700' : 'text-white group-hover:text-cyan-300'
                      }`}>
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                        isLightMode ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {product.shortDescription}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {product.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded border font-mono transition-colors ${
                              isLightMode
                                ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-semibold group-hover:border-blue-300'
                                : 'bg-white/5 border-white/10 text-slate-300 group-hover:border-white/20 group-hover:bg-white/10'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className={`pt-4 border-t flex items-center justify-between gap-2 ${
                      isLightMode ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <button
                        onClick={() => onSelectProduct(product)}
                        className={`text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer group/btn ${
                          isLightMode ? 'text-blue-700 hover:text-blue-900' : 'text-cyan-400 hover:text-cyan-300'
                        }`}
                        id={`view-details-${product.id}`}
                      >
                        <span>Explore Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => onScheduleDemo(product.title)}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 rounded-lg transition-all cursor-pointer shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
                        id={`demo-${product.id}`}
                      >
                        Book Demo
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No AI products found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-400 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};


