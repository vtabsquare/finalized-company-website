import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Maximize2, 
  Layers, 
  TrendingUp, 
  Calendar,
  ChevronDown,
  RefreshCw,
  HardDrive,
  CheckCircle2,
  Sliders,
  Sparkles,
  BarChart3,
  Activity,
  Flame
} from 'lucide-react';

interface ProductPreviewFrameProps {
  onOpenDemo?: () => void;
  className?: string;
}

export const ProductPreviewFrame: React.FC<ProductPreviewFrameProps> = ({ 
  onOpenDemo,
  className = '' 
}) => {
  const [activeTimeRange, setActiveTimeRange] = useState<'Q4' | 'YTD' | 'Trailing 12M'>('Q4');
  const [activePage, setActivePage] = useState<'Executive' | 'Regional' | 'Cohorts'>('Executive');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(4);
  const [liveStreamActive, setLiveStreamActive] = useState(true);
  const [streamTick, setStreamTick] = useState(0);

  // Simulated live data pulse every 3s
  useEffect(() => {
    if (!liveStreamActive) return;
    const interval = setInterval(() => {
      setStreamTick((t) => (t + 1) % 100);
    }, 2800);
    return () => clearInterval(interval);
  }, [liveStreamActive]);

  const baseBars = [
    { month: 'Jul', val: 56, target: 50 },
    { month: 'Aug', val: 70, target: 60 },
    { month: 'Sep', val: 78, target: 70 },
    { month: 'Oct', val: 89, target: 78 },
    { month: 'Nov', val: 104, target: 85 },
    { month: 'Dec', val: 118, target: 92 },
  ];

  return (
    <div className={`relative rounded-2xl border border-cyan-500/30 bg-[#090D1A]/95 shadow-[0_0_80px_-15px_rgba(6,182,212,0.35)] backdrop-blur-2xl overflow-hidden transition-all duration-300 group ${className}`}>
      {/* Outer ambient glow halo layer */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-blue-500/20 rounded-2xl blur-xl -z-10 opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Desktop App Window Chrome Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#070A14] border-b border-slate-800/90 text-xs text-slate-400 select-none">
        {/* Left: Window Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40 shadow-xs shadow-rose-500/30" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40 shadow-xs shadow-amber-500/30" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40 shadow-xs shadow-emerald-500/30" />
          </div>
          <span className="h-3.5 w-[1px] bg-slate-800 ml-1.5" />
          <span className="text-xs font-semibold text-slate-200 truncate max-w-[240px] sm:max-w-xs">
            VTAB Studio — Executive_Revenue_Cockpit.vtmodel
          </span>
        </div>

        {/* Center: Live Environment Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-[10px] text-cyan-300 font-mono shadow-xs shadow-cyan-500/20">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>DirectLake In-Memory · 4.8M Rows</span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2.5 text-slate-400">
          {onOpenDemo && (
            <button 
              type="button"
              onClick={onOpenDemo}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 rounded-md transition-all shadow-xs shadow-cyan-500/20 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Full Demo</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setLiveStreamActive(!liveStreamActive)}
            title="Toggle live telemetry stream simulation"
            className={`p-1 rounded transition-colors ${liveStreamActive ? 'text-emerald-400' : 'text-slate-500'}`}
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Application Toolbar & Ribbon */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0B0F1E] border-b border-slate-800/80 text-xs text-slate-300">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5 text-white font-semibold">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Canvas</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-cyan-400/90 font-medium cursor-pointer">Model Graph</span>
            <span className="text-slate-400 hover:text-slate-200 cursor-pointer hidden sm:inline">DAX Formula</span>
            <span className="text-slate-400 hover:text-slate-200 cursor-pointer hidden md:inline">Data Pipelines</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Time Slicer Toggle */}
          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            {(['Q4', 'YTD', 'Trailing 12M'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setActiveTimeRange(range)}
                className={`px-2.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                  activeTimeRange === range 
                    ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/40' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button 
            type="button" 
            aria-label="Refresh data model"
            onClick={() => setStreamTick((t) => t + 1)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400 hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Inner Application Workspace */}
      <div className="grid grid-cols-12 min-h-[400px] bg-[#060810]">
        {/* Left Side: Fields & Model Explorer */}
        <div className="hidden lg:block lg:col-span-3 border-r border-slate-800/80 bg-[#080B15] p-3.5 text-xs space-y-3.5">
          <div className="flex items-center justify-between text-slate-400 font-medium pb-2 border-b border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">Semantic Schema</span>
            <span className="text-[10px] text-cyan-400 font-mono">5 Entities</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-white bg-blue-950/40 px-2.5 py-1.5 rounded-lg border border-blue-800/50">
              <span className="font-bold text-cyan-300">Fact_Sales</span>
              <span className="text-[10px] text-slate-400 tabular-nums font-mono">4.8M rows</span>
            </div>
            <div className="pl-3.5 space-y-1 text-slate-300 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">∑</span>
                <span>Revenue_USD</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">∑</span>
                <span>Gross_Margin_Pct</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-slate-500 text-[10px]">#</span>
                <span>Order_Quantity</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-300 hover:bg-slate-800/30 px-2.5 py-1 rounded">
              <span>Dim_Customer</span>
              <span className="text-[10px] text-slate-500 tabular-nums font-mono">142K</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 hover:bg-slate-800/30 px-2.5 py-1 rounded">
              <span>Dim_Product</span>
              <span className="text-[10px] text-slate-500 tabular-nums font-mono">1.2K</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 hover:bg-slate-800/30 px-2.5 py-1 rounded">
              <span>Dim_Calendar</span>
              <span className="text-[10px] text-slate-500 tabular-nums font-mono">7.3K</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">Active Slicers</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] bg-cyan-950/70 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded-md font-mono">
                Region: Global
              </span>
              <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md font-mono">
                Tier: Enterprise
              </span>
            </div>
          </div>
        </div>

        {/* Center & Right: Report Design Canvas */}
        <div className="col-span-12 lg:col-span-9 p-4 sm:p-5 space-y-4">
          {/* Top KPI Cards Row with Glow & Tabular Figures */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-b from-[#0E1426] to-[#0A0E1A] border border-cyan-500/20 shadow-md shadow-cyan-950/30">
              <div className="text-[11px] text-slate-400 font-medium">Total Net Revenue</div>
              <div className="text-xl font-extrabold text-white tabular-nums tracking-tight mt-1">
                ${(48.24 + (streamTick % 3) * 0.12).toFixed(2)}M
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1 font-mono">
                <span>+18.4%</span>
                <span className="text-slate-500 font-normal font-sans">vs target</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#0E1426] to-[#0A0E1A] border border-slate-800/90 shadow-md">
              <div className="text-[11px] text-slate-400 font-medium">Gross Margin</div>
              <div className="text-xl font-extrabold text-white tabular-nums tracking-tight mt-1">
                68.2%
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1 font-mono">
                <span>+2.4 pts</span>
                <span className="text-slate-500 font-normal font-sans">expansion</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#0E1426] to-[#0A0E1A] border border-slate-800/90 shadow-md">
              <div className="text-[11px] text-slate-400 font-medium">Pipeline Velocity</div>
              <div className="text-xl font-extrabold text-white tabular-nums tracking-tight mt-1">
                24.2d
              </div>
              <div className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1 mt-1 font-mono">
                <span>-3.8 days</span>
                <span className="text-slate-500 font-normal font-sans">faster close</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-b from-[#0E1426] to-[#0A0E1A] border border-slate-800/90 shadow-md">
              <div className="text-[11px] text-slate-400 font-medium">Quota Attainment</div>
              <div className="text-xl font-extrabold text-white tabular-nums tracking-tight mt-1">
                106.2%
              </div>
              <div className="text-[10px] text-cyan-300 font-semibold flex items-center gap-1 mt-1 font-mono">
                <span>38 / 42 reps</span>
                <span className="text-slate-500 font-normal font-sans">above plan</span>
              </div>
            </div>
          </div>

          {/* Interactive Chart & Breakdown Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Primary Multi-Series Bar & Run-rate Visual */}
            <div className="md:col-span-2 p-4 rounded-xl bg-[#090D1A] border border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-white">Monthly Revenue vs Quota Target</span>
                  <p className="text-[10px] text-slate-400">Vectorized calculation via VTAB Measure Engine</p>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="w-2.5 h-2 rounded-xs bg-cyan-400 shadow-xs shadow-cyan-400/50" /> Actual
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="w-2.5 h-0.5 bg-indigo-400" /> Quota
                  </span>
                </div>
              </div>

              {/* SVG Chart visualization */}
              <div className="relative h-36 w-full flex items-end justify-between gap-3 pt-4 px-2">
                {/* Horizontal reference grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-b border-dashed border-slate-700 w-full" />
                  <div className="border-b border-dashed border-slate-700 w-full" />
                  <div className="border-b border-dashed border-slate-700 w-full" />
                </div>

                {baseBars.map((item, idx) => {
                  const isHovered = hoveredBarIndex === idx;
                  const currentVal = item.val + (idx === 5 ? (streamTick % 3) * 2 : 0);
                  const heightPct = (currentVal / 130) * 100;
                  const targetPct = (item.target / 130) * 100;

                  return (
                    <div 
                      key={item.month} 
                      className="flex-1 flex flex-col items-center h-full justify-end group/bar cursor-pointer"
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                    >
                      {/* Floating tooltip on active item */}
                      {isHovered && (
                        <div className="text-[10px] font-mono tabular-nums text-cyan-300 bg-slate-900/95 border border-cyan-500/40 px-1.5 py-0.5 rounded shadow-xl -translate-y-1 mb-1 transition-all z-20">
                          ${currentVal}M
                        </div>
                      )}
                      <div className="relative w-full max-w-[36px] h-full flex items-end justify-center">
                        {/* Target line indicator */}
                        <div 
                          className="absolute w-full h-[2px] bg-indigo-400/90 z-10"
                          style={{ bottom: `${targetPct}%` }}
                        />
                        {/* Bar */}
                        <div 
                          className={`w-full rounded-t-md transition-all duration-300 ${
                            isHovered 
                              ? 'bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]' 
                              : 'bg-gradient-to-t from-blue-700/80 to-cyan-500/80 hover:from-blue-600 hover:to-cyan-400 shadow-sm'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-300 font-mono mt-1.5 font-medium">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Segment Mix Glowing Donut Breakdown */}
            <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Segment Mix</span>
                <span className="text-[10px] text-cyan-400 font-mono">100% Attained</span>
              </div>

              {/* Donut representation with glowing filter */}
              <div className="flex items-center justify-center py-2">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#1E293B" strokeWidth="4.5" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#06B6D4" strokeWidth="4.5" strokeDasharray="54 100" strokeDashoffset="0" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#3B82F6" strokeWidth="4.5" strokeDasharray="30 100" strokeDashoffset="-54" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#6366F1" strokeWidth="4.5" strokeDasharray="16 100" strokeDashoffset="-84" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-sm font-extrabold text-white tabular-nums">54%</span>
                    <span className="text-[9px] text-cyan-300 block font-medium">Enterprise</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-cyan-400" /> Enterprise ($26M)
                  </span>
                  <span className="text-cyan-300 font-mono font-bold">54%</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-blue-500" /> Mid-Market ($14.5M)
                  </span>
                  <span className="text-slate-300 font-mono">30%</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500" /> Commercial ($7.7M)
                  </span>
                  <span className="text-slate-300 font-mono">16%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Window Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#060810] border-t border-slate-800 text-[10px] text-slate-400 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready · DirectLake Active</span>
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cache Response: 12ms</span>
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
          <span>Row count: 4,821,904</span>
          <span>·</span>
          <span className="text-cyan-400">VTAB Engine v5.0.22</span>
        </div>
      </div>
    </div>
  );
};
