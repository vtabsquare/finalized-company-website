import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabaseClient';
import { ProductSlideshow } from './ProductSlideshow';
import { ScrollReveal } from './animations/ScrollReveal';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        const mappedProducts: Product[] = data.map(item => {
          let demoSnippet = item.demo_snippet;
          let detailContent = undefined;

          if (demoSnippet && demoSnippet.type === 'detailContent') {
            detailContent = { ...demoSnippet };
            delete detailContent.type;
            demoSnippet = undefined;
          }

          return {
            id: item.id,
            title: item.title,
            shortDescription: item.short_description,
            fullDescription: item.full_description,
            category: item.category,
            tags: item.tags || [],
            impactMetric: item.impact_metric,
            keyFeatures: item.key_features || [],
            techStack: item.tech_stack || [],
            iconName: item.icon_name,
            featured: item.featured,
            imageUrl: item.image_url,
            demoSnippet,
            detailContent
          };
        });
        
        setProducts(mappedProducts);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
              <ScrollReveal key={product.id} animation="fade-up" delay={0.1 * (idx % 6)}>
                <div
                  className={`backdrop-blur-xl h-full rounded-2xl shadow-2xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border ${
                    isLightMode
                      ? 'bg-white/95 border-slate-200/90 hover:border-blue-400/80 shadow-slate-200/60'
                      : 'bg-white/[0.03] border-white/10 hover:border-blue-500/50 shadow-black/60'
                  }`}
                >
                  {/* Product Picture Header */}
                  <div className={`relative h-48 w-full overflow-hidden ${
                    isLightMode ? 'bg-slate-900 text-white' : 'bg-black/80'
                  }`}>
                    <div className="relative w-full h-full">
                      <img
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-black/30 to-transparent" />
                    </div>

                    {/* Top Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <div className="p-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 shadow-lg pointer-events-auto">
                        {renderIcon(product.iconName)}
                      </div>

                      <span className="text-[9px] text-blue-300 uppercase font-extrabold tracking-wider px-2.5 py-1 bg-black/80 backdrop-blur-md border border-blue-500/40 rounded-full flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        {product.impactMetric}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Pill */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                        isLightMode ? 'text-blue-700' : 'text-cyan-400'
                      }`}>
                        {product.category}
                      </span>

                      {/* Title */}
                      <h3 className={`text-xl font-black transition-colors mb-2 ${
                        isLightMode ? 'text-slate-900 group-hover:text-blue-700' : 'text-white group-hover:text-blue-400'
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
                            className={`text-[10px] px-2 py-0.5 rounded border font-mono ${
                              isLightMode
                                ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-semibold'
                                : 'bg-white/5 border-white/10 text-slate-300'
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
                        className={`text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          isLightMode ? 'text-blue-700 hover:text-blue-900' : 'text-blue-400 hover:text-blue-300'
                        }`}
                        id={`view-details-${product.id}`}
                      >
                        <span>Explore Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => onScheduleDemo(product.title)}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all cursor-pointer shadow-md shadow-blue-600/20"
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


