import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag,
  TrendingUp, 
  DollarSign, 
  Globe2, 
  Activity, 
  Filter, 
  Calendar, 
  Download, 
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Eye,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { DASHBOARD_GALLERY } from '../data/reportingProductData';
import type { DashboardData } from '../typesReporting';

const icons: Record<string, React.ElementType> = {
  'Retail Performance Analysis': ShoppingBag,
  'Sales Analytics': TrendingUp,
  'Financial Analytics': DollarSign,
  'Geographic Intelligence': Globe2,
  'Healthcare Reporting': Activity,
};

export const DashboardGallery: React.FC = () => {
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>('retail-performance-analysis');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Last 7 Days' | 'Last 30 Days' | 'Quarterly' | 'FY 2026'>('Quarterly');
  const [selectedRegion, setSelectedRegion] = useState<'Global' | 'North America' | 'EMEA' | 'APAC'>('Global');
  const [performanceThreshold, setPerformanceThreshold] = useState<number>(85);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [galleryItems, setGalleryItems] = useState<DashboardData[]>(DASHBOARD_GALLERY);

  const fetchLiveDashboards = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('product_dashboards')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: DashboardData[] = data.map((item: any) => {
          let parsedMetrics = item.metrics;
          if (typeof parsedMetrics === 'string') {
            try { parsedMetrics = JSON.parse(parsedMetrics); } catch { parsedMetrics = []; }
          }
          return {
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || '',
            category: item.category || 'Retail Performance Analysis',
            timeframe: item.timeframe || 'Live Production Model',
            reportType: item.report_type || 'Interactive BI Report',
            badge: item.badge || 'LIVE BI',
            embedUrl: item.embed_url || undefined,
            isLiveEmbed: Boolean(item.is_live_embed && item.embed_url),
            keyDimensions: ['Store Region', 'Product Category', 'Payment Mode', 'Fulfillment'],
            metrics: Array.isArray(parsedMetrics) && parsedMetrics.length > 0 ? parsedMetrics : [
              { label: 'Total Revenue', value: '$10.0M', change: '+15.2%', trend: 'up', subtext: 'Annualized' }
            ]
          };
        });
        setGalleryItems(mapped);
      }
    } catch (err) {
      console.warn('Using fallback static dashboards:', err);
    }
  }, []);

  useEffect(() => {
    fetchLiveDashboards();

    // Realtime listener for live additions / edits from Admin Dashboard
    const channel = supabase
      .channel('public:product_dashboards_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'product_dashboards' },
        () => {
          fetchLiveDashboards();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLiveDashboards]);


  const filteredDashboards = galleryItems.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.reportType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDashboard = 
    filteredDashboards.find((d) => d.id === selectedDashboardId) || 
    galleryItems.find((d) => d.id === selectedDashboardId) || 
    galleryItems[0];

  const handleNext = () => {
    const list = filteredDashboards.length > 0 ? filteredDashboards : galleryItems;
    const currentIndex = list.findIndex((d) => d.id === activeDashboard.id);
    const nextIndex = (currentIndex + 1) % list.length;
    setSelectedDashboardId(list[nextIndex].id);
    if (list[nextIndex].isLiveEmbed) setIframeLoading(true);
  };

  const handlePrev = () => {
    const list = filteredDashboards.length > 0 ? filteredDashboards : galleryItems;
    const currentIndex = list.findIndex((d) => d.id === activeDashboard.id);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    setSelectedDashboardId(list[prevIndex].id);
    if (list[prevIndex].isLiveEmbed) setIframeLoading(true);
  };

  return (
    <section id="dashboards" className="relative py-24 lg:py-32 border-t border-slate-800/80 bg-[#060812] overflow-hidden">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-cyan-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>LIVE DASHBOARD GALLERY · PRODUCTION TEMPLATES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-pretty">
              Tailored analytical dashboards.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Explore publication-ready templates built natively in VTAB Reporting Studio. 
              Each template demonstrates coordinated filtering, responsive slicers, and sub-millisecond aggregations.
            </p>
          </div>

          {/* Quick Search & Carousel Navigation */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 shadow-inner"
              />
            </div>
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 shadow-sm">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous dashboard template"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next dashboard template"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Selectable Category Cards with Strong Glowing Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {galleryItems.map((dash) => {
            const Icon = icons[dash.title] || ShoppingBag;
            const isSelected = dash.id === activeDashboard.id;

            return (
              <button
                key={dash.id}
                type="button"
                onClick={() => {
                  setSelectedDashboardId(dash.id);
                  if (dash.isLiveEmbed) setIframeLoading(true);
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#0F172A] to-[#0B0F1E] border-cyan-400 shadow-[0_0_35px_-10px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400/50'
                    : 'bg-[#090D1A]/80 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg transition-colors ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {dash.isLiveEmbed ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      LIVE BI
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{dash.reportType}</span>
                  )}
                </div>

                <div className="text-sm font-bold text-white truncate">
                  {dash.title}
                </div>
                <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                  {dash.timeframe}
                </div>
              </button>
            );
          })}
        </div>

        {/* Large Immersive Dashboard Preview Container with Glowing Border */}
        <div className={`rounded-2xl border border-cyan-500/30 bg-[#090D1A] shadow-[0_0_80px_-15px_rgba(6,182,212,0.25)] overflow-hidden relative transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto flex flex-col' : ''
        }`}>
          {activeDashboard.isLiveEmbed ? (
            <div className="flex flex-col flex-1">
              {/* Live Iframe Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-[#070A14] border-b border-slate-800 gap-3 text-xs select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>LIVE REPORT STREAM</span>
                  </div>
                  <span className="font-bold text-white text-sm sm:text-base">{activeDashboard.title}</span>
                  <span className="text-slate-600 hidden md:inline">|</span>
                  <span className="text-slate-400 text-xs hidden md:inline">{activeDashboard.subtitle}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIframeLoading(true);
                      setIframeKey((k) => k + 1);
                    }}
                    title="Reload live report frame"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <a
                    href={activeDashboard.embedUrl || 'https://reportservices.vtabsquare.com/?workspace=1&report=8682b28d-7505-4fcf-a377-3df8664f6369'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open live dashboard in independent portal"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 hover:text-cyan-200 transition-colors text-xs font-medium"
                  >
                    <span>Full Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title={isFullscreen ? 'Exit full frame' : 'Maximize to full frame'}
                    className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                    aria-label="Toggle full frame"
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Live Iframe Body with Loading Overlay */}
              <div className={`relative w-full ${isFullscreen ? 'flex-1 min-h-[calc(100vh-140px)]' : 'h-[640px] sm:h-[720px] lg:h-[800px]'} bg-[#050711] overflow-hidden`}>
                {iframeLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070A14]/95 backdrop-blur-sm space-y-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin flex items-center justify-center" />
                      <Sparkles className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto" />
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-sm font-bold text-white tracking-wide">Connecting to VTAB Reporting Server...</div>
                      <div className="text-xs text-slate-400">Loading live DirectLake model & Retail Sales canvas</div>
                    </div>
                  </div>
                )}

                <iframe
                  key={iframeKey}
                  src={activeDashboard.embedUrl || 'https://reportservices.vtabsquare.com/?workspace=1&report=8682b28d-7505-4fcf-a377-3df8664f6369'}
                  title="VTAB Reporting Services - Retail Sales Analysis Live Dashboard"
                  onLoad={() => setIframeLoading(false)}
                  className="w-full h-full border-0 bg-[#070A14]"
                  allow="fullscreen; clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals"
                />
              </div>

              {/* Bottom Telemetry Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-[#070A14] border-t border-slate-800 text-xs text-slate-400 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-slate-300">Live Workspace:</span>
                  <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">WS-1</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">Report: 8682b28d-7505-4fcf-a377-3df8664f6369</span>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span className="text-slate-400 hidden md:inline">Pages: Home · Retail Performance · Geographic Insights</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 60 FPS Hardware Vector Engine
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Top Frame Slicer & Controls Ribbon */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-[#070A14] border-b border-slate-800 gap-3 text-xs text-slate-300 select-none">
                {/* Title & Status */}
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-bold text-white text-sm">{activeDashboard.title}</span>
                  <span className="text-slate-600 hidden sm:inline">|</span>
                  <span className="text-slate-400 text-xs hidden md:inline">{activeDashboard.subtitle}</span>
                </div>

                {/* Interactive Slicers */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  {/* Timeframe Slicer */}
                  <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                    {(['Last 7 Days', 'Last 30 Days', 'Quarterly', 'FY 2026'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeframe(t)}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          selectedTimeframe === t
                            ? 'bg-blue-600 text-white font-semibold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Region Slicer */}
                  <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                    {(['Global', 'North America', 'EMEA', 'APAC'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRegion(r)}
                        className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          selectedRegion === r
                            ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Toggle full frame"
                  >
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Interactive Visual Canvas Container */}
              <div className="p-5 sm:p-7 lg:p-8 bg-[#060810] space-y-6">
                {/* KPI Cards Strip with Neon Accents */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {activeDashboard.metrics.map((metric, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gradient-to-b from-[#0E1426] to-[#0A0E1A] border border-cyan-500/20 shadow-md shadow-cyan-950/20">
                      <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                      <div className="text-2xl font-black text-white tracking-tight tabular-nums mt-1 font-sans">
                        {metric.value}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-xs">
                        <span className="text-emerald-400 font-semibold font-mono">{metric.change}</span>
                        <span className="text-[11px] text-slate-400 truncate max-w-[130px]">{metric.subtext}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Threshold Interactive Slider */}
                <div className="p-3.5 rounded-xl bg-[#090D1A] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white">Interactive Target Benchmark Threshold:</span>
                    <span className="text-cyan-300 font-mono font-bold tabular-nums text-sm">
                      {performanceThreshold}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-64">
                    <span className="text-[10px] text-slate-500 font-mono">50%</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={performanceThreshold}
                      onChange={(e) => setPerformanceThreshold(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">100%</span>
                  </div>
                </div>

                {/* Dashboard-Specific Detailed Mockup Panels */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDashboard.id + selectedTimeframe + selectedRegion}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeDashboard.id === 'sales-analytics' && (
                      <SalesDashboardView threshold={performanceThreshold} region={selectedRegion} />
                    )}
                    {activeDashboard.id === 'financial-analytics' && (
                      <FinancialDashboardView threshold={performanceThreshold} />
                    )}
                    {activeDashboard.id === 'geographic-intelligence' && (
                      <GeographicDashboardView region={selectedRegion} />
                    )}
                    {activeDashboard.id === 'healthcare-reporting' && (
                      <HealthcareDashboardView threshold={performanceThreshold} />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Dimensions Slicer Tags & Footer Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-slate-300">Active Multi-Dimensional Slicers:</span>
                    <div className="flex flex-wrap gap-1.5 ml-1">
                      {activeDashboard.keyDimensions.map((dim) => (
                        <span key={dim} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono">
                          {dim}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>60 FPS Hardware Vector Engine · Ready for Production</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// 1. Sales Analytics Detailed Mockup
const SalesDashboardView: React.FC<{ threshold: number; region: string }> = ({ threshold, region }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Revenue Trend Area */}
      <div className="lg:col-span-8 p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-4 shadow-inner">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white text-sm">Pipeline Conversion & Quota Attainment ({region})</span>
            <p className="text-[11px] text-slate-400">Aggregated via In-Memory DirectLake cache</p>
          </div>
          <span className="text-cyan-400 font-mono text-[11px]">Benchmark: {threshold}%</span>
        </div>
        <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 px-2">
          {[
            { label: 'Enterprise Accounts', actual: 92, quota: 80 },
            { label: 'Strategic Tech', actual: 104, quota: 85 },
            { label: 'Commercial Core', actual: 76, quota: 70 },
            { label: 'Government & Public', actual: 115, quota: 95 },
            { label: 'Global Channels', actual: 88, quota: 82 },
          ].map((item) => {
            const meetsThreshold = item.actual >= threshold;
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[10px] font-mono tabular-nums text-slate-300 mb-1">
                  ${item.actual}M
                </div>
                <div className="relative w-full max-w-[48px] h-full flex items-end justify-center">
                  <div 
                    className={`w-full rounded-t-md transition-all shadow-md ${
                      meetsThreshold
                        ? 'bg-gradient-to-t from-blue-700 via-sky-500 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                        : 'bg-gradient-to-t from-slate-700 to-slate-500'
                    }`}
                    style={{ height: `${(item.actual / 130) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 text-center truncate w-full mt-2 font-mono">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slicers and Cohort Mini-List */}
      <div className="lg:col-span-4 p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-3 shadow-inner">
        <span className="font-bold text-white text-xs block">Segment Cohort Distribution</span>
        <div className="space-y-2.5 pt-1">
          {[
            { title: 'Tier 1 Enterprise', pct: '48%', delta: '+12%', color: 'bg-cyan-400' },
            { title: 'Mid-Market Scale', pct: '32%', delta: '+4%', color: 'bg-blue-500' },
            { title: 'Emerging Startups', pct: '20%', delta: '-2%', color: 'bg-slate-600' },
          ].map((c) => (
            <div key={c.title} className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>{c.title}</span>
                <span className="font-mono text-cyan-300">{c.pct}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${c.color} rounded-full`} style={{ width: c.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Financial Analytics Detailed Mockup
const FinancialDashboardView: React.FC<{ threshold: number }> = ({ threshold }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-7 p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-4 shadow-inner">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white text-sm">EBITDA Reconciliation Waterfall</span>
            <p className="text-[11px] text-slate-400">Audited trailing GAAP adjustments</p>
          </div>
          <span className="text-emerald-400 font-mono text-[11px]">Target Margin: 28%</span>
        </div>
        <div className="h-48 flex items-center justify-around gap-2 pt-6">
          {[
            { name: 'Gross Rev', val: '+$64M', pos: true },
            { name: 'COGS', val: '-$18M', pos: false },
            { name: 'R&D', val: '-$12M', pos: false },
            { name: 'G&A', val: '-$6M', pos: false },
            { name: 'Net EBITDA', val: '+$28M', pos: true },
          ].map((bar) => (
            <div key={bar.name} className="flex flex-col items-center gap-1.5 flex-1">
              <span className={`text-[11px] font-mono font-bold ${bar.pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                {bar.val}
              </span>
              <div className={`w-10 rounded-md shadow-md ${bar.pos ? 'bg-gradient-to-t from-emerald-600 to-teal-400 h-28' : 'bg-gradient-to-t from-rose-600 to-amber-500 h-16'}`} />
              <span className="text-[10px] text-slate-400 font-mono mt-1 text-center truncate w-full">{bar.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-4 shadow-inner">
        <span className="font-bold text-white text-xs block">Operating Cash Flow Health</span>
        <div className="space-y-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Working Capital Turnover</span>
            <span className="font-mono text-emerald-400 font-bold">8.4x</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Days Sales Outstanding (DSO)</span>
            <span className="font-mono text-cyan-400 font-bold">34.2 Days</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Cash Conversion Cycle</span>
            <span className="font-mono text-white font-bold">21.8 Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Geographic Intelligence Detailed Mockup
const GeographicDashboardView: React.FC<{ region: string }> = ({ region }) => {
  return (
    <div className="p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-4 shadow-inner">
      <div className="flex items-center justify-between text-xs">
        <div>
          <span className="font-bold text-white text-sm">Spatial Distribution & Node Latency ({region})</span>
          <p className="text-[11px] text-slate-400">Edge aggregation across 184 active fulfillment hubs</p>
        </div>
        <span className="text-cyan-400 font-mono text-[11px]">Geo-Mesh Active</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {[
          { hub: 'Frankfurt Central (EU-1)', status: 'Optimal', ping: '12ms', load: '64%' },
          { hub: 'Northern Virginia (US-East)', status: 'Optimal', ping: '9ms', load: '78%' },
          { hub: 'Tokyo Megacore (AP-1)', status: 'Optimal', ping: '14ms', load: '52%' },
        ].map((node) => (
          <div key={node.hub} className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>{node.hub}</span>
              <span className="text-emerald-400 text-[10px] font-mono">● {node.status}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <span>Round-trip</span>
              <span className="font-mono text-cyan-300">{node.ping}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Compute Load</span>
              <span className="font-mono text-slate-200">{node.load}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Healthcare Reporting Detailed Mockup
const HealthcareDashboardView: React.FC<{ threshold: number }> = ({ threshold }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-4 shadow-inner">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-white text-sm">Inpatient Acuity & Departmental Bed Census</span>
            <p className="text-[11px] text-slate-400">HL7 / FHIR live telemetry stream</p>
          </div>
          <span className="text-cyan-400 font-mono text-[11px]">Threshold: {threshold}%</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          {[
            { dept: 'Critical Care (ICU)', cap: '94%', beds: '47/50', crit: true },
            { dept: 'Cardiology', cap: '86%', beds: '69/80', crit: false },
            { dept: 'Emergency Dept', cap: '78%', beds: '94/120', crit: false },
            { dept: 'General Surgery', cap: '72%', beds: '58/80', crit: false },
          ].map((d) => (
            <div key={d.dept} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-200 block truncate">{d.dept}</span>
              <div className="text-lg font-bold font-mono text-white">{d.cap}</div>
              <div className="text-[10px] text-slate-400 font-mono">{d.beds} occupied</div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${d.crit ? 'bg-rose-500' : 'bg-cyan-400'}`}
                  style={{ width: d.cap }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 p-5 rounded-xl bg-[#090D1A] border border-slate-800 space-y-3 shadow-inner">
        <span className="font-bold text-white text-xs block">Quality & Compliance Benchmarks</span>
        <div className="space-y-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Door-to-Balloon Time</span>
            <span className="font-mono text-emerald-400 font-bold">52 min</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
            <span className="text-slate-400">CAUTI Standard Ratio</span>
            <span className="font-mono text-cyan-400 font-bold">0.68</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Patient HCAHPS Score</span>
            <span className="font-mono text-white font-bold">91.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
