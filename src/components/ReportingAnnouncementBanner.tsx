import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ReportingAnnouncementBannerProps {
  onExploreReporting: () => void;
  isLightMode?: boolean;
}

export const ReportingAnnouncementBanner: React.FC<ReportingAnnouncementBannerProps> = ({
  onExploreReporting,
  isLightMode = false,
}) => {
  const bannerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const banner = bannerRef.current;
    if (!banner) return;
    const rect = banner.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    banner.style.setProperty('--spotlight-x', `${x}px`);
    banner.style.setProperty('--spotlight-y', `${y}px`);
    banner.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    const banner = bannerRef.current;
    if (!banner) return;
    banner.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <aside
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="New Application Announcement"
      className={`group/banner relative w-full h-[112px] min-h-[112px] max-h-[112px] overflow-hidden border-y transition-all duration-500 flex items-center select-none ${
        isLightMode
          ? 'border-cyan-400/40 hover:border-cyan-400/60 bg-gradient-to-r from-slate-950 via-[#071d49] to-slate-950 text-white shadow-[0_4px_30px_rgba(6,182,212,0.18)]'
          : 'border-cyan-500/25 hover:border-cyan-400/45 bg-gradient-to-r from-[#020617] via-[#041232] to-[#020617] text-white shadow-[0_4px_24px_-2px_rgba(0,242,254,0.12),0_12px_32px_0_rgba(2,6,23,0.85)]'
      }`}
    >
      {/* ── Dynamic Interactive Cursor Spotlight (Linear/Vercel Aesthetic) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-[2]"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background: `radial-gradient(
            circle 440px at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
            rgba(0, 242, 254, 0.18),
            rgba(14, 165, 233, 0.08) 45%,
            transparent 75%
          )`
        }}
      />

      {/* Dynamic Cursor Top-Border Illumination Highlight */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] pointer-events-none transition-opacity duration-500 ease-out z-[3]"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background: `radial-gradient(
            320px circle at var(--spotlight-x, 50%) 0px,
            rgba(0, 242, 254, 0.95),
            rgba(14, 165, 233, 0.4) 50%,
            transparent 80%
          )`
        }}
      />
      {/* ── 1. Full-Width Top & Bottom Ambient Edge Sheen + Moving Shimmer Highlight ── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f2fe]/40 to-transparent pointer-events-none"
      />
      {/* Moving highlight beam along top edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent pointer-events-none banner-beam-sweep opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff]/25 to-transparent pointer-events-none"
      />

      {/* ── 2. Atmospheric Cyan Volumetric Glow Behind Dashboard ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 w-[720px] h-32 bg-[radial-gradient(ellipse_at_center,_rgba(0,242,254,0.22),_rgba(37,99,235,0.14),_transparent_70%)] blur-2xl pointer-events-none transition-opacity duration-500 group-hover/banner:opacity-95 opacity-80"
      />

      {/* ── 3. Flowing Cyber-Wave Ribbons (Energy Trails from Reference) ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-75"
        preserveAspectRatio="none"
        viewBox="0 0 1600 112"
      >
        <defs>
          <linearGradient id="cyberWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="25%" stopColor="#00f2fe" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cyberWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
            <stop offset="30%" stopColor="#00d2ff" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cyberWaveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="35%" stopColor="#00f2fe" stopOpacity="0.35" />
            <stop offset="65%" stopColor="#0ea5e9" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </linearGradient>
          <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Multi-layered flowing wave filaments with distinct drift rates */}
        <path
          className="banner-trail-drift-1"
          d="M 380,74 C 540,20 720,102 920,54 C 1120,8 1300,78 1500,44"
          fill="none"
          stroke="url(#cyberWaveGrad1)"
          strokeWidth="1.8"
          filter="url(#waveGlow)"
        />
        <path
          className="banner-trail-drift-2"
          d="M 420,80 C 580,32 760,92 960,58 C 1160,22 1340,72 1540,48"
          fill="none"
          stroke="url(#cyberWaveGrad2)"
          strokeWidth="1.3"
        />
        <path
          className="banner-trail-drift-3"
          d="M 400,66 C 560,14 740,110 940,50 C 1140,-4 1320,86 1520,40"
          fill="none"
          stroke="url(#cyberWaveGrad3)"
          strokeWidth="1"
        />
      </svg>

      {/* ── 4. Main Horizontal Content Row ── */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between gap-4 lg:gap-6 relative z-10 banner-entrance-anim">
        
        {/* ── REGION 1 & 2 (LEFT): Badge + Divider + Product Messaging ── */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 min-w-0 shrink-0">
          {/* NEW APPLICATION Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border bg-[#06183a]/75 backdrop-blur-md shrink-0 banner-badge-breathe transition-all duration-300 hover:border-cyan-300/80">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f2fe] banner-dot-pulse" />
            </span>
            <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.14em] uppercase text-cyan-200 whitespace-nowrap">
              NEW APPLICATION
            </span>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block w-[1px] h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent shrink-0" />

          {/* Product Headline and Tagline */}
          <div className="text-left min-w-0">
            <h2 className="text-base sm:text-lg lg:text-[22px] font-bold text-white tracking-tight leading-tight flex items-center gap-1.5 sm:gap-2">
              <span>Meet</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#38bdf8] to-[#0ea5e9] font-extrabold filter drop-shadow(0 0 10px rgba(0,242,254,0.4))">
                VTAB Reporting
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs lg:text-[13.5px] text-slate-300 font-normal leading-snug mt-0.5 truncate">
              Turn complex data into clear, actionable insights.
            </p>
          </div>
        </div>

        {/* ── REGION 3 (CENTER-RIGHT): High-Fidelity Enterprise Analytics Dashboard Visual ── */}
        <div
          aria-hidden="true"
          className="hidden lg:flex items-center justify-center shrink-0 select-none relative banner-dashboard-float"
        >
          {/* Ambient atmospheric cyan volumetric glow behind dashboard */}
          <div className="absolute -inset-3 bg-[radial-gradient(ellipse_at_center,_rgba(0,242,254,0.35),_rgba(14,165,233,0.18),_transparent_75%)] blur-xl pointer-events-none transition-opacity duration-300 group-hover/banner:opacity-100 opacity-80" />

          {/* High-Resolution Enterprise Analytics Dashboard Preview */}
          <div className="relative flex items-center justify-center">
            <img
              src="/media/vtab-reporting-dashboard.png"
              alt="VTAB Reporting Application Interface Preview"
              className="h-[76px] xl:h-[80px] w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] drop-shadow-[0_0_22px_rgba(0,242,254,0.35)] block transition-all duration-300 group-hover/banner:drop-shadow-[0_0_28px_rgba(0,242,254,0.45)]"
              loading="eager"
            />
          </div>
        </div>

        {/* ── REGION 4 (RIGHT): Call To Action Button ── */}
        <div className="shrink-0 flex items-center justify-end">
          <button
            onClick={onExploreReporting}
            className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-[13px] text-white tracking-wide bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#00d2ff] hover:from-[#2563eb] hover:via-[#1d4ed8] hover:to-[#38bdf8] shadow-[0_0_18px_rgba(0,210,255,0.35)] hover:shadow-[0_0_28px_rgba(0,210,255,0.6)] focus-visible:shadow-[0_0_28px_rgba(0,210,255,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030919] transition-all duration-200 ease-out cursor-pointer active:scale-[0.98] whitespace-nowrap shrink-0"
            id="explore-reporting-tool-btn"
          >
            <span className="whitespace-nowrap">Explore Reporting Tool</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
