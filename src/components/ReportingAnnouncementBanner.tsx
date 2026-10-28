import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ReportingAnnouncementBannerProps {
  onExploreReporting: () => void;
  isLightMode?: boolean;
}

/**
 * VTAB Reporting announcement banner.
 * Background asset: public/media/vtab-reporting-analytics-bg (1).png
 * The headline, badge and CTA remain real React elements.
 */
export const ReportingAnnouncementBanner: React.FC<
  ReportingAnnouncementBannerProps
> = ({ onExploreReporting, isLightMode = false }) => {
  const bannerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const banner = bannerRef.current;
    if (!banner) return;

    const bounds = banner.getBoundingClientRect();
    banner.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`);
    banner.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`);
    banner.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    bannerRef.current?.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <aside
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="New application announcement: VTAB Reporting"
      className={`group/banner relative isolate flex h-[112px] min-h-[112px] w-full items-center overflow-hidden border-y text-white ${
        isLightMode ? 'border-cyan-300/30' : 'border-cyan-400/25'
      }`}
      style={{
        backgroundColor: '#041330',
        // Outer glow is intentionally restrained so it still looks like a premium SaaS UI.
        boxShadow:
          '0 -2px 16px rgba(0, 199, 255, .20), 0 3px 18px rgba(148, 65, 255, .20), 0 0 0 1px rgba(45, 170, 255, .10), inset 0 1px 0 rgba(120, 231, 255, .16), inset 0 -1px 0 rgba(225, 100, 255, .14)',
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

      {/* Background: navy on left, violet on right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(103deg, #062454 0%, #04142f 31%, #041631 58%, #101a51 79%, #3c155d 100%)',
        }}
      />

      {/* Color atmosphere to frame the main copy and the CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 44% 115% at -5% 0%, rgba(0,176,255,.27), transparent 73%), radial-gradient(ellipse 35% 130% at 100% -24%, rgba(218,69,252,.27), transparent 78%)',
        }}
      />

      {/* Subtle dashboard visual, faded at the left and right edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[39%] right-[15%] top-0 z-0 hidden opacity-75 sm:block"
        style={{
          // Clean URL-safe image filename
          backgroundImage: "url('/media/vtab-reporting-analytics-bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 54%',
          backgroundSize: '100% 100%',
          filter: 'blur(0px)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 29%, #000 82%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 29%, #000 82%, transparent 100%)',
        }}
      />

      {/* Keep the heading readable over the analytics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to right, rgba(2,11,32,.16) 0%, rgba(2,11,32,.15) 39%, transparent 66%)',
        }}
      />

      {/* Subtle cursor glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        style={{
          opacity: 'var(--spotlight-opacity, 0)',
          background:
            'radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(91,153,255,.12), transparent 70%)',
        }}
      />

      {/* NEON BORDER SYSTEM: crisp gradients + blurred spill + moving highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,229,255,.12) 0%, #00dfff 16%, #3895ff 47%, #986bff 74%, #f060e8 94%, rgba(240,96,232,.2) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-glow pointer-events-none absolute inset-x-0 -top-[8px] z-[4] h-[20px] blur-[9px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,225,255,.25), rgba(55,134,255,.50) 47%, rgba(223,72,244,.48))',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,229,255,.15) 0%, #05cbf6 20%, #4777ff 52%, #b75dff 79%, #ee67dd 96%, rgba(240,96,232,.18) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="vtab-banner-border-glow pointer-events-none absolute -bottom-[9px] inset-x-0 z-[4] h-[21px] blur-[9px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,225,255,.28), rgba(78,124,255,.48) 47%, rgba(223,72,244,.48))',
          animationDelay: '-2s',
        }}
      />

      {/* One slim glint sweeps each border without flashing the content */}
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

      {/* Foreground content remains unchanged and clickable */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1840px] items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-7 lg:px-10">
        <div className="flex min-w-0 items-center gap-4 sm:gap-5 lg:gap-6">
          <div className="hidden shrink-0 items-center gap-2.5 rounded-full border border-cyan-400/70 bg-[#031c45]/50 px-3.5 py-2 shadow-[0_0_15px_rgba(0,187,255,.09)] backdrop-blur-sm md:inline-flex">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-cyan-300/30 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_9px_rgba(34,211,238,.8)]" />
            </span>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[.16em] text-cyan-200 lg:text-[11px]">
              New Application
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="flex flex-wrap items-baseline gap-x-1.5 text-[18px] font-bold leading-tight tracking-tight text-white sm:text-[20px] lg:text-[23px] xl:text-[25px]">
              <span>Meet</span>
              <span className="whitespace-nowrap bg-gradient-to-r from-[#17c8fd] via-[#539bfc] to-[#e668e9] bg-clip-text font-extrabold text-transparent">
                VTAB Reporting
              </span>
            </h2>
            <p className="mt-1 hidden max-w-[500px] text-[11px] leading-snug text-slate-200/90 sm:block lg:text-[12.5px]">
              Turn complex data into clear, actionable insights.
            </p>
          </div>
        </div>

        <button
          id="explore-reporting-tool-btn"
          type="button"
          onClick={onExploreReporting}
          aria-label="Explore VTAB Reporting Tool"
          className="group/cta relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r from-[#00aaf4] via-[#477ffc] to-[#db4ce7] px-3.5 py-2.5 text-[12px] font-semibold text-white shadow-[0_0_22px_rgba(112,84,247,.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(160,75,243,.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#041330] active:translate-y-0 active:scale-[.98] sm:px-5 sm:py-3 sm:text-[13px] lg:px-6"
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-70" />
          <span className="relative hidden whitespace-nowrap sm:inline">
            Explore Reporting Tool
          </span>
          <span className="relative whitespace-nowrap sm:hidden">Explore</span>
          <ArrowUpRight className="relative h-4 w-4 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </button>
      </div>
    </aside>
  );
};