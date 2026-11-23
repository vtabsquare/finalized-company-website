import { supabase } from '../lib/supabaseClient';

export interface BannerThemeConfig {
  id: string;
  name: string;
  bgGradient: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  badgePulseColor: string;
  highlightGradient: string;
  ctaGradient: string;
  ctaShadow: string;
  topBorderGradient: string;
  bottomBorderGradient: string;
  glowGradient: string;
}

export const BANNER_THEMES: Record<string, BannerThemeConfig> = {
  'cyan-purple': {
    id: 'cyan-purple',
    name: 'Cyan & Purple (VTAB Classic)',
    bgGradient:
      'linear-gradient(103deg, rgba(6, 36, 84, 0.40) 0%, rgba(4, 20, 47, 0.35) 31%, rgba(4, 22, 49, 0.35) 58%, rgba(16, 26, 81, 0.45) 79%, rgba(60, 21, 93, 0.50) 100%)',
    badgeBorderClass: 'border-cyan-400/70',
    badgeBgClass: 'bg-[#031c45]/50',
    badgePulseColor: 'bg-cyan-300',
    highlightGradient: 'from-[#17c8fd] via-[#539bfc] to-[#e668e9]',
    ctaGradient: 'from-[#00aaf4] via-[#477ffc] to-[#db4ce7]',
    ctaShadow: 'shadow-[0_0_22px_rgba(112,84,247,.38)] hover:shadow-[0_0_30px_rgba(160,75,243,.6)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(0,229,255,.12) 0%, #00dfff 16%, #3895ff 47%, #986bff 74%, #f060e8 94%, rgba(240,96,232,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(0,229,255,.15) 0%, #05cbf6 20%, #4777ff 52%, #b75dff 79%, #ee67dd 96%, rgba(240,96,232,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(0,225,255,.25), rgba(55,134,255,.50) 47%, rgba(223,72,244,.48))'
  },
  'cyan-emerald': {
    id: 'cyan-emerald',
    name: 'Cyan & Emerald (Databricks Medallion)',
    bgGradient:
      'linear-gradient(103deg, rgba(2, 26, 56, 0.40) 0%, rgba(4, 23, 56, 0.35) 28%, rgba(3, 43, 73, 0.38) 55%, rgba(5, 59, 88, 0.45) 78%, rgba(9, 74, 76, 0.50) 100%)',
    badgeBorderClass: 'border-emerald-400/70',
    badgeBgClass: 'bg-[#032e3b]/50',
    badgePulseColor: 'bg-emerald-300',
    highlightGradient: 'from-[#22d3ee] via-[#38bdf8] to-[#34d399]',
    ctaGradient: 'from-[#0284c7] via-[#0ea5e9] to-[#059669]',
    ctaShadow: 'shadow-[0_0_22px_rgba(14,165,233,.45)] hover:shadow-[0_0_30px_rgba(52,211,153,.65)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(34,211,238,.12) 0%, #06b6d4 16%, #0ea5e9 47%, #10b981 74%, #34d399 94%, rgba(52,211,153,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(34,211,238,.15) 0%, #06b6d4 20%, #0284c7 52%, #059669 79%, #34d399 96%, rgba(52,211,153,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(6,182,212,.28), rgba(14,165,233,.50) 47%, rgba(16,185,129,.48))'
  },
  'blue-indigo': {
    id: 'blue-indigo',
    name: 'Blue & Indigo (Enterprise Cloud)',
    bgGradient:
      'linear-gradient(103deg, rgba(3, 18, 54, 0.45) 0%, rgba(8, 28, 72, 0.40) 30%, rgba(14, 28, 92, 0.40) 58%, rgba(28, 22, 98, 0.45) 80%, rgba(42, 28, 114, 0.50) 100%)',
    badgeBorderClass: 'border-blue-400/70',
    badgeBgClass: 'bg-[#031d48]/50',
    badgePulseColor: 'bg-blue-300',
    highlightGradient: 'from-[#38bdf8] via-[#60a5fa] to-[#818cf8]',
    ctaGradient: 'from-[#0284c7] via-[#2563eb] to-[#4f46e5]',
    ctaShadow: 'shadow-[0_0_22px_rgba(37,99,235,.40)] hover:shadow-[0_0_30px_rgba(79,70,229,.6)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(56,189,248,.12) 0%, #38bdf8 16%, #3b82f6 47%, #6366f1 74%, #818cf8 94%, rgba(129,140,248,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(56,189,248,.15) 0%, #38bdf8 20%, #3b82f6 52%, #6366f1 79%, #818cf8 96%, rgba(129,140,248,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(56,189,248,.28), rgba(59,130,246,.50) 47%, rgba(99,102,241,.48))'
  },
  'amber-orange': {
    id: 'amber-orange',
    name: 'Amber & Flame Orange (Innovation Hub)',
    bgGradient:
      'linear-gradient(103deg, rgba(46, 26, 4, 0.45) 0%, rgba(54, 32, 6, 0.40) 30%, rgba(68, 38, 8, 0.40) 58%, rgba(84, 42, 10, 0.45) 80%, rgba(98, 48, 12, 0.50) 100%)',
    badgeBorderClass: 'border-amber-400/70',
    badgeBgClass: 'bg-[#3a2205]/50',
    badgePulseColor: 'bg-amber-300',
    highlightGradient: 'from-[#fbbf24] via-[#f59e0b] to-[#f97316]',
    ctaGradient: 'from-[#d97706] via-[#ea580c] to-[#c2410c]',
    ctaShadow: 'shadow-[0_0_22px_rgba(234,88,12,.40)] hover:shadow-[0_0_30px_rgba(245,158,11,.6)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(251,191,36,.12) 0%, #fbbf24 16%, #f59e0b 47%, #ea580c 74%, #f97316 94%, rgba(249,115,22,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(251,191,36,.15) 0%, #fbbf24 20%, #f59e0b 52%, #ea580c 79%, #f97316 96%, rgba(249,115,22,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(251,191,36,.28), rgba(245,158,11,.50) 47%, rgba(234,88,12,.48))'
  },
  'rose-fuchsia': {
    id: 'rose-fuchsia',
    name: 'Rose & Fuchsia (Creative AI)',
    bgGradient:
      'linear-gradient(103deg, rgba(48, 8, 42, 0.45) 0%, rgba(56, 10, 52, 0.40) 30%, rgba(72, 14, 68, 0.40) 58%, rgba(86, 18, 82, 0.45) 80%, rgba(98, 20, 94, 0.50) 100%)',
    badgeBorderClass: 'border-rose-400/70',
    badgeBgClass: 'bg-[#3b0832]/50',
    badgePulseColor: 'bg-rose-300',
    highlightGradient: 'from-[#fb7185] via-[#f43f5e] to-[#ec4899]',
    ctaGradient: 'from-[#e11d48] via-[#db2777] to-[#c026d3]',
    ctaShadow: 'shadow-[0_0_22px_rgba(225,29,72,.40)] hover:shadow-[0_0_30px_rgba(236,72,153,.6)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(251,113,133,.12) 0%, #fb7185 16%, #f43f5e 47%, #ec4899 74%, #d946ef 94%, rgba(217,70,239,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(251,113,133,.15) 0%, #fb7185 20%, #f43f5e 52%, #ec4899 79%, #d946ef 96%, rgba(217,70,239,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(251,113,133,.28), rgba(244,63,94,.50) 47%, rgba(217,70,239,.48))'
  }
};

export interface AnnouncementItem {
  id: string;
  productId: string;
  badgeText: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  ctaText: string;
  ctaMobileText: string;
  backgroundImage?: string;
  bgGradient: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  badgePulseColor: string;
  highlightGradient: string;
  ctaGradient: string;
  ctaShadow: string;
  topBorderGradient?: string;
  bottomBorderGradient?: string;
  glowGradient?: string;
}

export const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'vtab-reporting',
    productId: 'ai-reporting-platform',
    badgeText: 'New Application',
    headlinePrefix: 'Meet',
    headlineHighlight: 'VTAB Reporting',
    description: 'Turn complex data into clear, actionable insights.',
    ctaText: 'Explore Reporting Tool',
    ctaMobileText: 'Explore',
    backgroundImage: '/media/vtab-reporting-analytics-bg.png',
    bgGradient:
      'linear-gradient(103deg, rgba(6, 36, 84, 0.40) 0%, rgba(4, 20, 47, 0.35) 31%, rgba(4, 22, 49, 0.35) 58%, rgba(16, 26, 81, 0.45) 79%, rgba(60, 21, 93, 0.50) 100%)',
    badgeBorderClass: 'border-cyan-400/70',
    badgeBgClass: 'bg-[#031c45]/50',
    badgePulseColor: 'bg-cyan-300',
    highlightGradient: 'from-[#17c8fd] via-[#539bfc] to-[#e668e9]',
    ctaGradient: 'from-[#00aaf4] via-[#477ffc] to-[#db4ce7]',
    ctaShadow: 'shadow-[0_0_22px_rgba(112,84,247,.38)] hover:shadow-[0_0_30px_rgba(160,75,243,.6)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(0,229,255,.12) 0%, #00dfff 16%, #3895ff 47%, #986bff 74%, #f060e8 94%, rgba(240,96,232,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(0,229,255,.15) 0%, #05cbf6 20%, #4777ff 52%, #b75dff 79%, #ee67dd 96%, rgba(240,96,232,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(0,225,255,.25), rgba(55,134,255,.50) 47%, rgba(223,72,244,.48))'
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
    backgroundImage: '/media/sql-to-databricks-migration-flow.jpg',
    bgGradient:
      'linear-gradient(103deg, rgba(2, 26, 56, 0.40) 0%, rgba(4, 23, 56, 0.35) 28%, rgba(3, 43, 73, 0.38) 55%, rgba(5, 59, 88, 0.45) 78%, rgba(9, 74, 76, 0.50) 100%)',
    badgeBorderClass: 'border-emerald-400/70',
    badgeBgClass: 'bg-[#032e3b]/50',
    badgePulseColor: 'bg-emerald-300',
    highlightGradient: 'from-[#22d3ee] via-[#38bdf8] to-[#34d399]',
    ctaGradient: 'from-[#0284c7] via-[#0ea5e9] to-[#059669]',
    ctaShadow: 'shadow-[0_0_22px_rgba(14,165,233,.45)] hover:shadow-[0_0_30px_rgba(52,211,153,.65)]',
    topBorderGradient:
      'linear-gradient(90deg, rgba(34,211,238,.12) 0%, #06b6d4 16%, #0ea5e9 47%, #10b981 74%, #34d399 94%, rgba(52,211,153,.2) 100%)',
    bottomBorderGradient:
      'linear-gradient(90deg, rgba(34,211,238,.15) 0%, #06b6d4 20%, #0284c7 52%, #059669 79%, #34d399 96%, rgba(52,211,153,.18) 100%)',
    glowGradient:
      'linear-gradient(90deg, rgba(6,182,212,.28), rgba(14,165,233,.50) 47%, rgba(16,185,129,.48))'
  }
];

function mapDashboardRowToAnnouncement(row: any): AnnouncementItem {
  let meta: Record<string, any> = {};
  if (typeof row.metrics === 'object' && row.metrics !== null && !Array.isArray(row.metrics)) {
    meta = row.metrics;
  } else if (typeof row.metrics === 'string') {
    try { meta = JSON.parse(row.metrics); } catch {}
  }

  const themeKey = meta.themePreset || 'cyan-purple';
  const themeDefaults = BANNER_THEMES[themeKey] || BANNER_THEMES['cyan-purple'];

  return {
    id: meta.bannerId || row.id,
    productId: row.product_id || 'ai-reporting-platform',
    badgeText: row.badge || meta.badgeText || 'New Application',
    headlinePrefix: meta.headlinePrefix || 'Meet',
    headlineHighlight: meta.headlineHighlight || row.title || 'New Announcement',
    description: row.subtitle || meta.description || '',
    ctaText: row.report_type || meta.ctaText || 'Explore Now',
    ctaMobileText: row.timeframe || meta.ctaMobileText || 'Explore',
    backgroundImage: row.embed_url || meta.backgroundImage || '',
    bgGradient: meta.bgGradient || themeDefaults.bgGradient,
    badgeBorderClass: meta.badgeBorderClass || themeDefaults.badgeBorderClass,
    badgeBgClass: meta.badgeBgClass || themeDefaults.badgeBgClass,
    badgePulseColor: meta.badgePulseColor || themeDefaults.badgePulseColor,
    highlightGradient: meta.highlightGradient || themeDefaults.highlightGradient,
    ctaGradient: meta.ctaGradient || themeDefaults.ctaGradient,
    ctaShadow: meta.ctaShadow || themeDefaults.ctaShadow,
    topBorderGradient: themeDefaults.topBorderGradient,
    bottomBorderGradient: themeDefaults.bottomBorderGradient,
    glowGradient: themeDefaults.glowGradient
  };
}

function mapBannerRowToAnnouncement(row: any): AnnouncementItem {
  const themeKey = row.theme_preset || 'cyan-purple';
  const themeDefaults = BANNER_THEMES[themeKey] || BANNER_THEMES['cyan-purple'];

  return {
    id: row.id,
    productId: row.product_id || 'ai-reporting-platform',
    badgeText: row.badge_text || 'New Application',
    headlinePrefix: row.headline_prefix || 'Meet',
    headlineHighlight: row.headline_highlight || 'New Announcement',
    description: row.description || '',
    ctaText: row.cta_text || 'Explore Now',
    ctaMobileText: row.cta_mobile_text || 'Explore',
    backgroundImage: row.background_image || '',
    bgGradient: row.bg_gradient || themeDefaults.bgGradient,
    badgeBorderClass: row.badge_border_class || themeDefaults.badgeBorderClass,
    badgeBgClass: row.badge_bg_class || themeDefaults.badgeBgClass,
    badgePulseColor: row.badge_pulse_color || themeDefaults.badgePulseColor,
    highlightGradient: row.highlight_gradient || themeDefaults.highlightGradient,
    ctaGradient: row.cta_gradient || themeDefaults.ctaGradient,
    ctaShadow: row.cta_shadow || themeDefaults.ctaShadow,
    topBorderGradient: themeDefaults.topBorderGradient,
    bottomBorderGradient: themeDefaults.bottomBorderGradient,
    glowGradient: themeDefaults.glowGradient
  };
}

export async function fetchLiveAnnouncementBanners(): Promise<AnnouncementItem[]> {
  try {
    // 1. Try dedicated announcement_banners table
    const { data: bData, error: bErr } = await supabase
      .from('announcement_banners')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!bErr && bData && bData.length > 0) {
      return bData.map(mapBannerRowToAnnouncement);
    }

    // 2. Fallback to product_dashboards where category = 'announcement_banner'
    const { data: dData, error: dErr } = await supabase
      .from('product_dashboards')
      .select('*')
      .eq('category', 'announcement_banner')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!dErr && dData && dData.length > 0) {
      return dData.map(mapDashboardRowToAnnouncement);
    }
  } catch (err) {
    console.warn('Error fetching live announcement banners:', err);
  }

  // 3. Fallback to bundled defaults
  return DEFAULT_ANNOUNCEMENTS;
}
