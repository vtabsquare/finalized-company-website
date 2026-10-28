import React, { useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

interface ReportingAnnouncementBannerProps {
  onExploreReporting: () => void;
  isLightMode?: boolean;
  isVisible?: boolean;
  onDismiss?: () => void;
}

/**
 * VTAB Reporting Announcement Banner
 *
 * Uses the high-impact cyber neon banner artwork (Futuristic Neon Analytics Dashboard Banner.png)
 * on desktop with pixel-aligned interactive CTA button, and responsive vector UI on mobile.
 */
export const ReportingAnnouncementBanner: React.FC<
  ReportingAnnouncementBannerProps
> = ({ onExploreReporting, isLightMode = false, isVisible = true, onDismiss }) => {
  const bannerRef = useRef<HTMLElement>(null);

  if (isVisible === false) {
    return null;
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const element = bannerRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
    element.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    bannerRef.current?.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <aside
      ref={bannerRef}
      aria-label="VTAB Reporting — New Application Announcement"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExploreReporting}
      className={`group/banner relative isolate flex h-[112px] min-h-[112px] w-full items-center overflow-hidden border-y select-none bg-[#010c1f] text-white transition-[border-color,box-shadow] duration-300 cursor-pointer ${
        isLightMode
          ? 'border-cyan-400/35 shadow-[0_4px_28px_rgba(6,182,212,0.18)]'
          : 'border-cyan-500/20 shadow-[0_4px_24px_rgba(0,15,40,0.55)]'
      }`}
    >
      {/*
        ── DESKTOP DISPLAY (>= 1024px) ──
        Exact high-impact cyber analytics artwork provided by user.
        Cropped with zero padding for full-bleed edge-to-edge display.
      */}
      <img
        src="/media/Futuristic Neon Analytics Dashboard Banner.png"
        alt="Meet VTAB Reporting Announcement"
        aria-hidden="true"
        draggable={false}
        loading="eager"
        className="pointer-events-none absolute inset-0 hidden h-full w-full select-none lg:block"
        style={{ objectFit: 'fill' }}
      />

      {/* Screen reader announcement for assistive technologies */}
      <div className="sr-only lg:block">
        New application. Meet VTAB Reporting. Turn complex data into clear,
        actionable insights.
      </div>

      {/*
        ── DESKTOP INTERACTIVE BUTTON OVERLAY ──
        Calibrated to the exact position of the "Explore Reporting Tool ↗" button in the artwork.
        Includes hover glow, cursor pointer, and keyboard accessibility.
      */}
      <button
        id="explore-reporting-tool-btn"
        type="button"
        aria-label="Explore Reporting Tool"
        onClick={(e) => {
          e.stopPropagation();
          onExploreReporting();
        }}
        className="absolute right-[1.95%] top-[31%] z-20 hidden h-[58%] w-[13.4%] min-w-[170px] cursor-pointer rounded-full border border-transparent bg-transparent transition-all duration-200 hover:border-cyan-300/40 hover:bg-white/[0.05] hover:shadow-[0_0_24px_rgba(0,210,255,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 active:scale-[0.98] lg:block"
        title="Explore VTAB Reporting Tool"
      />

      {/*
        ── TABLET & MOBILE DISPLAY (< 1024px) ──
        High-clarity native UI with glowing cyber backdrop from the artwork.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(90deg, #001526 0%, #020b22 42%, #031a38 75%, #001126 100%)',
        }}
      />
      <img
        src="/media/Futuristic Neon Analytics Dashboard Banner.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-3/4 max-w-none object-cover object-right opacity-70 lg:hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 45%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 45%, black 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(90deg, rgba(1,9,25,0.85) 0%, rgba(1,9,25,0.65) 45%, rgba(1,9,25,0.15) 75%, transparent 100%)',
        }}
      />

      {/* Interactive cursor spotlight effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-500"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background:
            'radial-gradient(circle 380px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(0,242,254,0.10), transparent 75%)',
        }}
      />

      {/* Native typography and interactive CTA for touch screens */}
      <div className="relative z-10 mx-auto flex h-full w-full items-center justify-between gap-3 px-3 sm:px-5 lg:px-7 lg:hidden">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-cyan-400/80 bg-[#031a39]/80 px-2.5 py-1.5 shadow-[0_0_12px_rgba(0,220,255,0.15)] sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-[#00e8f6] shadow-[0_0_10px_#00e8f6]" />
            <span className="whitespace-nowrap text-[9px] sm:text-[10px] font-bold tracking-[0.14em] text-cyan-200">
              NEW APPLICATION
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="flex flex-wrap items-center gap-x-1.5 text-[13px] sm:text-[16px] leading-tight font-bold tracking-tight">
              <span>Meet</span>
              <span className="bg-gradient-to-r from-[#00eaf3] to-[#24b5fa] bg-clip-text font-extrabold text-transparent">
                VTAB Reporting
              </span>
            </h2>
            <p className="mt-0.5 sm:mt-1 max-w-[340px] text-[10px] sm:text-xs leading-snug text-slate-200/90 truncate sm:whitespace-normal">
              Turn complex data into clear, actionable insights.
            </p>
          </div>
        </div>

        <button
          id="explore-reporting-tool-btn-mobile"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExploreReporting();
          }}
          className="group/cta relative inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2355e5] to-[#00c8ec] px-3 py-2 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(0,210,255,0.35)] transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 active:scale-[0.98] sm:px-4 sm:py-2.5 sm:text-xs"
        >
          <span className="sm:hidden">Explore</span>
          <span className="hidden whitespace-nowrap sm:inline">Explore Reporting Tool</span>
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </button>
      </div>

      {/* Optional dismiss button if dismissal is supported */}
      {onDismiss && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="absolute top-2 right-2 z-30 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </aside>
  );
};
