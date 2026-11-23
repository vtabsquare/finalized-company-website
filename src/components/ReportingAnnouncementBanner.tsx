import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import {
  fetchLiveAnnouncementBanners,
  DEFAULT_ANNOUNCEMENTS,
  type AnnouncementItem
} from '../services/bannerService';

export type { AnnouncementItem };
export const ANNOUNCEMENT_ITEMS = DEFAULT_ANNOUNCEMENTS;

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
  const [items, setItems] = useState<AnnouncementItem[]>(DEFAULT_ANNOUNCEMENTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  // Load live banners from Supabase
  const loadBanners = useCallback(async () => {
    try {
      const live = await fetchLiveAnnouncementBanners();
      if (live && live.length > 0) {
        setItems(live);
        setCurrentIndex(prev => (prev >= live.length ? 0 : prev));
      }
    } catch (e) {
      console.warn('Could not load live banners:', e);
    }
  }, []);

  useEffect(() => {
    loadBanners();

    // Re-check on window focus (e.g. after editing in admin dashboard in another tab)
    const handleFocus = () => {
      loadBanners();
    };
    window.addEventListener('focus', handleFocus);

    // Subscribe to realtime updates if enabled
    const channel1 = supabase
      .channel('public:announcement_banners_live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'announcement_banners' },
        () => {
          loadBanners();
        }
      )
      .subscribe();

    const channel2 = supabase
      .channel('public:product_dashboards_banners')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'product_dashboards' },
        () => {
          loadBanners();
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('focus', handleFocus);
      supabase.removeChannel(channel1);
      supabase.removeChannel(channel2);
    };
  }, [loadBanners]);

  // Auto-rotate every 5 seconds (5000ms), paused on hover
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const currentItem = items[currentIndex] || items[0] || DEFAULT_ANNOUNCEMENTS[0];

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
    if (
      currentItem.productId?.startsWith('http://') ||
      currentItem.productId?.startsWith('https://')
    ) {
      window.open(currentItem.productId, '_blank', 'noopener,noreferrer');
      return;
    }

    if (onSelectProduct) {
      onSelectProduct(currentItem.productId);
    } else if (onExploreReporting) {
      onExploreReporting();
    }
  };

  // Fallback border gradients if not set
  const topBorder =
    currentItem.topBorderGradient ||
    'linear-gradient(90deg, rgba(0,229,255,.12) 0%, #00dfff 16%, #3895ff 47%, #986bff 74%, #f060e8 94%, rgba(240,96,232,.2) 100%)';
  const bottomBorder =
    currentItem.bottomBorderGradient ||
    'linear-gradient(90deg, rgba(0,229,255,.15) 0%, #05cbf6 20%, #4777ff 52%, #b75dff 79%, #ee67dd 96%, rgba(240,96,232,.18) 100%)';
  const glow =
    currentItem.glowGradient ||
    'linear-gradient(90deg, rgba(0,225,255,.25), rgba(55,134,255,.50) 47%, rgba(223,72,244,.48))';

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
      {items.map((item, idx) => (
        <div
          key={`bg-grad-${item.id}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{
            background: item.bgGradient,
            opacity: idx === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Layered Background Graphics / Images */}
      {items.map((item, idx) => {
        if (!item.backgroundImage) return null;
        const isCurrent = idx === currentIndex;
        const isAnalytics = item.backgroundImage.includes('analytics-bg');
        return (
          <div
            key={`bg-img-${item.id}`}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[36%] right-[14%] top-0 z-0 hidden sm:block transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: `url('${item.backgroundImage}')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center 50%',
              backgroundSize: isAnalytics ? '100% 100%' : 'cover',
              filter: isAnalytics ? 'blur(0px)' : 'blur(1.5px)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 25%, #000 80%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 25%, #000 80%, transparent 100%)',
              opacity: isCurrent ? (isAnalytics ? 0.75 : 0.82) : 0,
              transform: isCurrent ? 'scale(1)' : 'scale(0.97)',
            }}
          />
        );
      })}

      {/* Contrast Overlay for Text Legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to right, rgba(2,11,32,.25) 0%, rgba(2,11,32,.12) 42%, transparent 72%)',
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
        style={{ background: topBorder }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-glow pointer-events-none absolute inset-x-0 -top-[8px] z-[4] h-[20px] blur-[9px] transition-all duration-700"
        style={{ background: glow }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[2px] transition-all duration-700"
        style={{ background: bottomBorder }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-glow pointer-events-none absolute -bottom-[9px] inset-x-0 z-[4] h-[21px] blur-[9px] transition-all duration-700"
        style={{
          background: glow,
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
          {/* Carousel Dots / Progress Pills */}
          {items.length > 1 && (
            <div className="hidden lg:flex items-center gap-1.5 bg-black/40 px-2.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {items.map((item, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={`dot-${item.id}-${idx}`}
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
          )}

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
