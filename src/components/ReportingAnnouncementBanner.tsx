import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface AnnouncementItem {
  id: string;
  productId: string;
  badgeText: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  ctaText: string;
  ctaMobileText: string;
  bgGradient: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  badgePulseColor: string;
  highlightGradient: string;
  ctaGradient: string;
  ctaShadow: string;
}

const ANNOUNCEMENT_ITEMS: AnnouncementItem[] = [
  {
    id: 'vtab-reporting',
    productId: 'ai-reporting-platform',
    badgeText: 'New Application',
    headlinePrefix: 'Meet',
    headlineHighlight: 'VTAB Reporting',
    description: 'Turn complex data into clear, actionable insights.',
    ctaText: 'Explore Reporting Tool',
    ctaMobileText: 'Explore',
    bgGradient:
      'linear-gradient(103deg, rgba(6, 36, 84, 0.40) 0%, rgba(4, 20, 47, 0.35) 31%, rgba(4, 22, 49, 0.35) 58%, rgba(16, 26, 81, 0.45) 79%, rgba(60, 21, 93, 0.50) 100%)',
    badgeBorderClass: 'border-cyan-400/70',
    badgeBgClass: 'bg-[#031c45]/50',
    badgePulseColor: 'bg-cyan-300',
    highlightGradient: 'from-[#17c8fd] via-[#539bfc] to-[#e668e9]',
    ctaGradient: 'from-[#00aaf4] via-[#477ffc] to-[#db4ce7]',
    ctaShadow: 'shadow-[0_0_22px_rgba(112,84,247,.38)] hover:shadow-[0_0_30px_rgba(160,75,243,.6)]',
  },
  {
    id: 'databricks-migration',
    productId: 'ai-migration-factory-databricks-control-plane',
    badgeText: 'New Application',
    headlinePrefix: 'Meet',
    headlineHighlight: 'AI Databricks Migration',
    description: 'Automate SQL Server to Databricks Lakehouse with 3-tier Medallion pipelines.',
    ctaText: 'Explore Migration Factory',
    ctaMobileText: 'Explore',
    bgGradient:
      'linear-gradient(103deg, rgba(2, 26, 56, 0.40) 0%, rgba(4, 23, 56, 0.35) 28%, rgba(3, 43, 73, 0.38) 55%, rgba(5, 59, 88, 0.45) 78%, rgba(9, 74, 76, 0.50) 100%)',
    badgeBorderClass: 'border-emerald-400/70',
    badgeBgClass: 'bg-[#032e3b]/50',
    badgePulseColor: 'bg-emerald-300',
    highlightGradient: 'from-[#22d3ee] via-[#38bdf8] to-[#34d399]',
    ctaGradient: 'from-[#0284c7] via-[#0ea5e9] to-[#059669]',
    ctaShadow: 'shadow-[0_0_22px_rgba(14,165,233,.45)] hover:shadow-[0_0_30px_rgba(52,211,153,.65)]',
  },
];

interface ReportingAnnouncementBannerProps {
  onExploreReporting?: () => void;
  onSelectProduct?: (productId: string) => void;
  isLightMode?: boolean;
  isVisible?: boolean;
  onDismiss?: () => void;
}

export const ReportingAnnouncementBanner: React.FC<
  ReportingAnnouncementBannerProps
> = ({
  onExploreReporting,
  onSelectProduct,
  isLightMode = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  // Auto-rotate every 5 seconds (5000ms), paused on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENT_ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = ANNOUNCEMENT_ITEMS[currentIndex];

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const banner = bannerRef.current;
    if (!banner) return;

    const bounds = banner.getBoundingClientRect();
    banner.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    banner.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
    banner.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    bannerRef.current?.style.setProperty('--spotlight-opacity', '0');
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleCtaClick = () => {
    if (onSelectProduct) {
      onSelectProduct(currentItem.productId);
    } else if (onExploreReporting) {
      onExploreReporting();
    }
  };

  return (
    <aside
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`New application announcement: ${currentItem.headlineHighlight}`}
      className={`group/banner relative isolate flex h-[112px] min-h-[112px] w-full items-center overflow-hidden border-y text-white backdrop-blur-xl transition-all duration-700 ${
        isLightMode ? 'border-cyan-300/30' : 'border-cyan-400/20'
      }`}
      style={{
        backgroundColor: 'rgba(4, 19, 48, 0.35)',
        boxShadow:
          '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 -2px 16px rgba(0, 199, 255, .12), 0 3px 18px rgba(148, 65, 255, .12), inset 0 1px 0 rgba(120, 231, 255, .20), inset 0 -1px 0 rgba(225, 100, 255, .16)',
      }}
    >
      <style>{`
        @keyframes vtabBorderSweep {
          from { transform: translateX(0); }
          to   { transform: translateX(390%); }
        }
        @keyframes vtabBorderBreathe {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 0.78; }
        }
        .vtab-banner-border-beam {
          animation: vtabBorderSweep 8s linear infinite;
          will-change: transform;
        }
        .vtab-banner-border-glow {
          animation: vtabBorderBreathe 4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .vtab-banner-border-beam,
          .vtab-banner-border-glow { animation: none; }
        }
      `}</style>

      {/* Layered Animated Backgrounds for each item */}
      {ANNOUNCEMENT_ITEMS.map((item, idx) => (
        <div
          key={item.id}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: item.bgGradient,
            opacity: idx === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Color atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background:
            currentIndex === 0
              ? 'radial-gradient(ellipse 44% 115% at -5% 0%, rgba(0,176,255,.16), transparent 73%), radial-gradient(ellipse 35% 130% at 100% -24%, rgba(218,69,252,.16), transparent 78%)'
              : 'radial-gradient(ellipse 44% 115% at -5% 0%, rgba(6,182,212,.18), transparent 73%), radial-gradient(ellipse 35% 130% at 100% -24%, rgba(16,185,129,.18), transparent 78%)',
        }}
      />

      {/* Slide 1: Reporting Visual Analytics Chart Graphic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[39%] right-[15%] top-0 z-0 hidden sm:block transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: "url('/media/vtab-reporting-analytics-bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 54%',
          backgroundSize: '100% 100%',
          filter: 'blur(0px)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 29%, #000 82%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 29%, #000 82%, transparent 100%)',
          opacity: currentIndex === 0 ? 0.75 : 0,
        }}
      />

      {/* Slide 2: Databricks Migration Medallion Architecture Background Illustration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[36%] right-[14%] top-0 z-0 hidden sm:block transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: "url('/media/sql-to-databricks-migration-flow.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 50%',
          backgroundSize: 'cover',
          filter: 'blur(1.5px)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 25%, #000 80%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 25%, #000 80%, transparent 100%)',
          opacity: currentIndex === 1 ? 0.82 : 0,
          transform: currentIndex === 1 ? 'scale(1)' : 'scale(0.97)',
        }}
      />

      {/* Keep the heading sharp and legible over both backgrounds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to right, rgba(2,11,32,.20) 0%, rgba(2,11,32,.10) 42%, transparent 72%)',
        }}
      />

      {/* Interactive cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background:
            'radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(91,153,255,.12), transparent 70%)',
        }}
      />

      {/* Neon Top and Bottom Borders with glowing pulse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[2px] transition-all duration-700"
        style={{
          background:
            currentIndex === 0
              ? 'linear-gradient(90deg, rgba(0,229,255,.12) 0%, #00dfff 16%, #3895ff 47%, #986bff 74%, #f060e8 94%, rgba(240,96,232,.2) 100%)'
              : 'linear-gradient(90deg, rgba(34,211,238,.12) 0%, #06b6d4 16%, #0ea5e9 47%, #10b981 74%, #34d399 94%, rgba(52,211,153,.2) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-glow pointer-events-none absolute inset-x-0 -top-[8px] z-[4] h-[20px] blur-[9px]"
        style={{
          background:
            currentIndex === 0
              ? 'linear-gradient(90deg, rgba(0,225,255,.25), rgba(55,134,255,.50) 47%, rgba(223,72,244,.48))'
              : 'linear-gradient(90deg, rgba(6,182,212,.28), rgba(14,165,233,.50) 47%, rgba(16,185,129,.48))',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[2px]"
        style={{
          background:
            currentIndex === 0
              ? 'linear-gradient(90deg, rgba(0,229,255,.15) 0%, #05cbf6 20%, #4777ff 52%, #b75dff 79%, #ee67dd 96%, rgba(240,96,232,.18) 100%)'
              : 'linear-gradient(90deg, rgba(34,211,238,.15) 0%, #06b6d4 20%, #0284c7 52%, #059669 79%, #34d399 96%, rgba(52,211,153,.18) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-glow pointer-events-none absolute -bottom-[9px] inset-x-0 z-[4] h-[21px] blur-[9px]"
        style={{
          background:
            currentIndex === 0
              ? 'linear-gradient(90deg, rgba(0,225,255,.28), rgba(78,124,255,.48) 47%, rgba(223,72,244,.48))'
              : 'linear-gradient(90deg, rgba(6,182,212,.28), rgba(2,132,199,.48) 47%, rgba(16,185,129,.48))',
          animationDelay: '-2s',
        }}
      />

      {/* Border Glint Sweepers */}
      <div
        aria-hidden="true"
        className="vtab-banner-border-beam pointer-events-none absolute -left-[35%] top-0 z-[6] h-[2px] w-[35%]"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,.08) 17%, rgba(255,255,255,.95) 50%, rgba(255,255,255,.08) 83%, transparent)',
          boxShadow: '0 0 10px rgba(91,206,255,.45)',
        }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-beam pointer-events-none absolute -left-[35%] bottom-0 z-[6] h-[2px] w-[35%]"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,.06) 17%, rgba(255,255,255,.85) 50%, rgba(255,255,255,.06) 83%, transparent)',
          boxShadow: '0 0 10px rgba(181,107,255,.45)',
          animationDelay: '-4s',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1840px] items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-7 lg:px-10">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5 lg:gap-6">
          
          {/* Badge */}
          <div
            className={`hidden shrink-0 items-center gap-2.5 rounded-full border ${currentItem.badgeBorderClass} ${currentItem.badgeBgClass} px-3.5 py-2 shadow-[0_0_15px_rgba(0,187,255,.09)] backdrop-blur-sm md:inline-flex transition-all duration-500`}
          >
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span
                className={`absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full opacity-40 ${currentItem.badgePulseColor} motion-reduce:animate-none`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${currentItem.badgePulseColor} shadow-[0_0_9px_currentColor]`}
              />
            </span>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[.16em] text-cyan-200 lg:text-[11px]">
              {currentItem.badgeText}
            </span>
          </div>

          {/* Headline and Description */}
          <div className="min-w-0">
            <h2 className="flex flex-wrap items-baseline gap-x-1.5 text-[18px] font-bold leading-tight tracking-tight text-white sm:text-[20px] lg:text-[23px] xl:text-[25px] transition-all duration-500">
              <span>{currentItem.headlinePrefix}</span>
              <span
                className={`whitespace-nowrap bg-gradient-to-r ${currentItem.highlightGradient} bg-clip-text font-extrabold text-transparent`}
              >
                {currentItem.headlineHighlight}
              </span>
            </h2>
            <p className="mt-1 hidden max-w-[620px] text-[11px] leading-snug text-slate-200/90 sm:block lg:text-[12.5px] truncate transition-all duration-500">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Right CTA and Rotation Indicators */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Subtle Carousel Dots / Progress Pills */}
          <div className="hidden lg:flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {ANNOUNCEMENT_ITEMS.map((item, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={`dot-${item.id}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    active
                      ? 'w-6 h-1.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Switch to ${item.headlineHighlight}`}
                  title={item.headlineHighlight}
                />
              );
            })}
          </div>

          <button
            id="explore-reporting-tool-btn"
            type="button"
            onClick={handleCtaClick}
            aria-label={`Explore ${currentItem.headlineHighlight}`}
            className={`group/cta relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r ${currentItem.ctaGradient} ${currentItem.ctaShadow} px-3.5 py-2.5 text-[12px] font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041330] active:translate-y-0 active:scale-[.98] sm:px-5 sm:py-3 sm:text-[13px] lg:px-6`}
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-70" />
            <span className="relative hidden whitespace-nowrap sm:inline">
              {currentItem.ctaText}
            </span>
            <span className="relative whitespace-nowrap sm:hidden">
              {currentItem.ctaMobileText}
            </span>
            <ArrowUpRight className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
