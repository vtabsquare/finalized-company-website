import React, { useState } from 'react';
import { Product } from '../types';
import { ScrollReveal } from './animations/ScrollReveal';
import { getValidImageUrl, handleImageError } from '../utils/imageFallback';
import {
  BarChart3,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface BiDashboardsSectionProps {
  onSelectProduct: (product: Product) => void;
  onScheduleDemo: (productTitle?: string) => void;
  isLightMode?: boolean;
  products: Product[];
  loading: boolean;
}

export const BiDashboardsSection: React.FC<BiDashboardsSectionProps> = ({
  onSelectProduct,
  onScheduleDemo,
  isLightMode = false,
  products: allProducts,
  loading,
}) => {
  const [selectedSubfilter, setSelectedSubfilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all BI dashboards products (exclude AI Marketing agent and Sentinel Server Room)
  const biProducts = allProducts.filter((p) => {
    const id = p.id.toLowerCase();
    const title = p.title.toLowerCase();

    // Explicitly exclude AI Marketing Agent, Sentinel, AI Reporting Platform (in Applications), and duplicate Vtab Reporting tool
    if (
      id.includes('marketing') ||
      title.includes('marketing') ||
      id.includes('sentinel') ||
      title.includes('sentinel') ||
      id.includes('ai-reporting-platform') ||
      title.includes('ai reporting') ||
      id === 'insight-ai' ||
      title.includes('vtab reporting tool')
    ) {
      return false;
    }

    return (
      p.category === 'BI dashboards' ||
      p.category.toLowerCase().includes('dashboard') ||
      (p.category.toLowerCase().includes('bi') && !p.category.toLowerCase().includes('enterprise'))
    );
  });

  // Available subfilters (e.g. All, Analytics, Billing)
  const subfilters = [
    'All',
    ...Array.from(
      new Set(
        biProducts
          .map((p) => p.subcategory)
          .filter((sub): sub is string => Boolean(sub))
      )
    ).sort(),
  ];

  const filteredProducts = biProducts.filter((product) => {
    const matchesSub =
      selectedSubfilter === 'All' || product.subcategory === selectedSubfilter;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSub && matchesSearch;
  });

  return (
    <section
      id="bi-dashboards-section"
      className={`py-24 relative overflow-hidden transition-colors duration-300 border-t ${
        isLightMode
          ? 'bg-gradient-to-b from-white via-slate-50 to-blue-50/30 text-slate-900 border-slate-200'
          : 'bg-[#030712] text-white border-white/10'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Master Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                isLightMode
                  ? 'bg-blue-100 border border-blue-300 text-blue-800'
                  : 'bg-blue-950/70 border border-blue-500/40 text-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Our Solutions • Business Intelligence</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Enterprise{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                BI Dashboards
              </span>
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${
                isLightMode ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              Production-tested business intelligence systems, interactive telemetry dashboards, and automated executive reporting solutions built for high-scale enterprise decisions.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter and Search Bar */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div
            className={`p-3 rounded-2xl border backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 ${
              isLightMode
                ? 'bg-white/80 border-slate-200 shadow-sm'
                : 'bg-slate-900/60 border-white/10 shadow-xl'
            }`}
          >
            {/* Subfilter buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span
                className={`text-xs font-mono uppercase tracking-wider px-2 ${
                  isLightMode ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Filters:
              </span>
              {subfilters.map((sub) => {
                const isActive = selectedSubfilter === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubfilter(sub)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white shadow-md shadow-blue-900/30'
                        : isLightMode
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                  >
                    {sub === 'All' ? 'All BI Dashboards' : sub}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isLightMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dashboards..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs outline-none transition-all border ${
                  isLightMode
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500 focus:bg-white'
                    : 'bg-black/40 border-white/10 text-white placeholder-slate-500 focus:border-cyan-400/50'
                }`}
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Dashboard Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Sparkles className="w-7 h-7 text-cyan-400 animate-spin" />
            <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              Loading BI Dashboards...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={0.1}>
                <div
                  className={`group relative rounded-2xl md:rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
                    isLightMode
                      ? 'bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-400'
                      : 'bg-[#060D1E]/90 border-white/10 shadow-2xl hover:border-cyan-500/40 hover:shadow-[0_10px_35px_rgba(0,213,242,0.15)]'
                  }`}
                >
                  {/* Top neon illuminated laser */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  {/* Image Viewport */}
                  <div className="relative h-48 w-full overflow-hidden shrink-0 bg-black">
                    <img
                      src={getValidImageUrl(
                        product.imageUrl,
                        product.category,
                        product.title,
                        product.id
                      )}
                      onError={handleImageError(
                        product.category,
                        product.title,
                        product.id
                      )}
                      alt={product.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-black/30 to-transparent" />
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between relative z-10 space-y-4">
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`p-1.5 rounded-lg border shadow-sm ${
                            isLightMode
                              ? 'bg-blue-50 border-blue-200 text-blue-600'
                              : 'bg-black/50 border-white/10 text-cyan-400'
                          }`}
                        >
                          <BarChart3 className="w-5 h-5" />
                        </div>

                        {product.impactMetric && (
                          <span
                            className={`text-[9px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 border ${
                              isLightMode
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-black/50 text-cyan-300 border-cyan-500/30'
                            }`}
                          >
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            {product.impactMetric}
                          </span>
                        )}
                      </div>

                      {/* Category & Subcategory Pill */}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider block ${
                          isLightMode ? 'text-blue-700' : 'text-cyan-400 font-mono'
                        }`}
                      >
                        {product.category}
                        {product.subcategory ? ` • ${product.subcategory}` : ''}
                      </span>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold tracking-tight transition-colors ${
                          isLightMode
                            ? 'text-slate-900 group-hover:text-blue-700'
                            : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {product.title}
                      </h3>

                      {/* Short Description */}
                      <p
                        className={`text-xs leading-relaxed line-clamp-3 ${
                          isLightMode ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {product.shortDescription}
                      </p>

                      {/* Tags */}
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
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
                      )}
                    </div>

                    {/* Action Footer */}
                    <div
                      className={`pt-4 border-t flex items-center justify-between gap-2 ${
                        isLightMode ? 'border-slate-200' : 'border-white/10'
                      }`}
                    >
                      <button
                        onClick={() => onSelectProduct(product)}
                        className={`text-xs font-extrabold flex items-center gap-1 transition-all cursor-pointer group/btn ${
                          isLightMode
                            ? 'text-blue-700 hover:text-blue-900'
                            : 'text-cyan-400 hover:text-cyan-300'
                        }`}
                      >
                        <span>Explore Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => onScheduleDemo(product.title)}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 rounded-lg transition-all cursor-pointer shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105"
                      >
                        Book Demo
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Empty state when searching */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-white/10 bg-slate-900/40">
            <p className="text-slate-400 text-sm">
              No BI dashboards found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedSubfilter('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-cyan-400 underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
