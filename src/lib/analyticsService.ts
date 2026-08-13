/**
 * analyticsService.ts
 *
 * Silently tracks visitors on www.vtabsquare.com → writes to Supabase.
 * Uses plain fetch() against the Supabase REST API directly —
 * avoids the CORS credentials conflict that the Supabase JS client causes.
 *
 * Data is NEVER shown on the main website.
 * All insights display only on admin.vtabsquare.com.
 */

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const ANALYTICS_ENABLED = Boolean(SUPA_URL && SUPA_KEY);

/** Headers used for every Supabase REST call */
const H: Record<string, string> = {
  'Content-Type':  'application/json',
  'apikey':        SUPA_KEY,
  'Authorization': `Bearer ${SUPA_KEY}`,
  'Prefer':        'return=minimal',
};

/** Low-level POST to Supabase REST */
async function sbInsert(table: string, body: object, prefer = 'return=minimal'): Promise<void> {
  if (!ANALYTICS_ENABLED) return;
  try {
    await fetch(`${SUPA_URL}/rest/v1/${table}`, {
      method:      'POST',
      credentials: 'omit',           // ← fixes CORS wildcard issue
      headers:     { ...H, Prefer: prefer },
      body:        JSON.stringify(body),
    });
  } catch { /* silently ignore network errors */ }
}

/** Low-level PATCH to Supabase REST */
async function sbUpdate(table: string, filter: string, body: object): Promise<void> {
  if (!ANALYTICS_ENABLED) return;
  try {
    await fetch(`${SUPA_URL}/rest/v1/${table}?${filter}`, {
      method:      'PATCH',
      credentials: 'omit',
      headers:     H,
      body:        JSON.stringify(body),
    });
  } catch { /* silently ignore */ }
}

/** Call a Supabase RPC function */
async function sbRpc(fn: string, args: object): Promise<void> {
  if (!ANALYTICS_ENABLED) return;
  try {
    await fetch(`${SUPA_URL}/rest/v1/rpc/${fn}`, {
      method:      'POST',
      credentials: 'omit',
      headers:     H,
      body:        JSON.stringify(args),
    });
  } catch { /* silently ignore */ }
}

// ─── Visitor & Session IDs ────────────────────────────────────────────────────

function getVisitorId(): string {
  let id = localStorage.getItem('_vs_vid');
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('_vs_vid', id); }
  return id;
}

function getSessionId(): string {
  let id = sessionStorage.getItem('_vs_sid');
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('_vs_sid', id); }
  return id;
}

export const visitorId = getVisitorId();
export const sessionId = getSessionId();

// ─── Internal State ───────────────────────────────────────────────────────────

let _initialized     = false;
let _heartbeatTimer: ReturnType<typeof setInterval> | null = null;
let _currentPage     = 'home';
let _pageEnteredAt   = Date.now();
let _currentPageViewId: string | null = null;

// ─── GeoIP ────────────────────────────────────────────────────────────────────

async function fetchGeoIp() {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return null;
  try {
    const r = await fetch('https://get.geojs.io/v1/ip/geo.json', { 
      signal: AbortSignal.timeout(4000), 
      credentials: 'omit' 
    });
    if (!r.ok) return null;
    const data = await r.json();
    return {
      ip_address: data.ip,
      country: data.country,
      country_code: data.country_code,
      region: data.region,
      city: data.city,
      timezone: data.timezone,
    };
  } catch {
    return null;
  }
}

// ─── Browser / OS / Device ───────────────────────────────────────────────────

function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('Edg/'))     return { browser: 'Edge',    browser_version: ua.match(/Edg\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('OPR/'))     return { browser: 'Opera',   browser_version: ua.match(/OPR\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Chrome/'))  return { browser: 'Chrome',  browser_version: ua.match(/Chrome\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Firefox/')) return { browser: 'Firefox', browser_version: ua.match(/Firefox\/([\d.]+)/)?.[1] || '' };
  if (ua.includes('Safari/') && !ua.includes('Chrome'))
    return { browser: 'Safari', browser_version: ua.match(/Version\/([\d.]+)/)?.[1] || '' };
  return { browser: 'Other', browser_version: '' };
}

function detectOS() {
  const ua = navigator.userAgent;
  if (ua.includes('Windows NT')) return 'Windows';
  if (ua.includes('Mac OS X'))   return 'macOS';
  if (ua.includes('Android'))    return 'Android';
  if (/iPad|iPhone|iPod/.test(ua)) return 'iOS';
  if (ua.includes('Linux'))      return 'Linux';
  return 'Other';
}

function detectDevice() {
  const ua = navigator.userAgent;
  if (/iPad/.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua))) return 'Tablet';
  if (/Mobi|Android|iPhone|iPod/.test(ua)) return 'Mobile';
  return 'Desktop';
}

function detectSource() {
  const ref = document.referrer;
  if (!ref) return 'Direct';
  try {
    const h = new URL(ref).hostname.toLowerCase();
    if (h.includes('google'))   return 'Google';
    if (h.includes('bing'))     return 'Bing';
    if (h.includes('linkedin')) return 'LinkedIn';
    if (h.includes('twitter') || h.includes('x.com')) return 'Twitter / X';
    if (h.includes('facebook')) return 'Facebook';
    if (h.includes('instagram'))return 'Instagram';
    if (h.includes('youtube'))  return 'YouTube';
    return 'Referral';
  } catch { return 'Referral'; }
}

// ─── Init Session ─────────────────────────────────────────────────────────────

export async function initSession(landingPage = 'home'): Promise<void> {
  if (_initialized) return;
  _initialized   = true;
  _currentPage   = landingPage;
  _pageEnteredAt = Date.now();

  const geo = await fetchGeoIp();
  const { browser, browser_version } = detectBrowser();

  const sessionData = {
    visitor_id: visitorId, session_id: sessionId,
    browser, browser_version,
    os:           detectOS(),
    device_type:  detectDevice(),
    screen_width: window.innerWidth, screen_height: window.innerHeight,
    language:        navigator.language,
    traffic_source:  detectSource(),
    referrer:        document.referrer || null,
    landing_page:    landingPage,
    page_count:      1,
    duration_seconds: 0,
    ...(geo || {}),
  };

  // Upsert: insert or update on conflict with session_id
  await fetch(`${SUPA_URL}/rest/v1/visitor_sessions?on_conflict=session_id`, {
    method:      'POST',
    credentials: 'omit',
    headers:     { ...H, Prefer: 'return=minimal,resolution=merge-duplicates' },
    body:        JSON.stringify(sessionData),
  }).then(r => {
    if (r.ok) {
      console.log('[Analytics] ✅ Session created:', sessionId.slice(0, 8));
    } else {
      r.text().then(t => console.warn('[Analytics] ❌ Session failed:', r.status, t));
    }
  }).catch(e => console.warn('[Analytics] ❌ Network error:', e.message));

  await _insertPageView(landingPage);

  _heartbeatTimer = setInterval(_heartbeat, 30_000);
  window.addEventListener('visibilitychange', _onVisChange);
  window.addEventListener('beforeunload', _onUnload);
}

// ─── Page Views ───────────────────────────────────────────────────────────────

async function _insertPageView(pageName: string): Promise<void> {
  const id = crypto.randomUUID();
  _currentPageViewId = id;
  _pageEnteredAt = Date.now();
  await sbInsert('page_views', {
    id, session_id: sessionId, visitor_id: visitorId,
    page_name: pageName, page_title: document.title,
    entered_at: new Date().toISOString(),
  });
}

export async function trackPageView(pageName: string): Promise<void> {
  if (!_initialized) return;
  if (_currentPageViewId) {
    const timeOnPage = Math.round((Date.now() - _pageEnteredAt) / 1000);
    await sbUpdate('page_views', `id=eq.${_currentPageViewId}`,
      { exited_at: new Date().toISOString(), time_on_page: timeOnPage });
  }
  _currentPage = pageName;
  await _insertPageView(pageName);
  await sbRpc('increment_session_page_count', { p_session_id: sessionId });
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function trackEvent(eventName: string, eventData?: Record<string, unknown>): Promise<void> {
  if (!_initialized) return;
  await sbInsert('analytics_events', {
    session_id: sessionId, visitor_id: visitorId,
    event_name: eventName, event_data: eventData ?? null, page_name: _currentPage,
  });
}

// ─── Heartbeat ────────────────────────────────────────────────────────────────

async function _heartbeat(): Promise<void> {
  const dur = Math.round((Date.now() - performance.timeOrigin) / 1000);
  await sbUpdate('visitor_sessions', `session_id=eq.${sessionId}`,
    { last_seen: new Date().toISOString(), duration_seconds: dur });
}

// ─── End Session ──────────────────────────────────────────────────────────────

function _finalUpdate(): void {
  const dur = Math.round((Date.now() - performance.timeOrigin) / 1000);
  const body = JSON.stringify({ ended_at: new Date().toISOString(), duration_seconds: dur, last_seen: new Date().toISOString() });
  // keepalive fetch — reliable on tab close
  void fetch(`${SUPA_URL}/rest/v1/visitor_sessions?session_id=eq.${sessionId}`, {
    method: 'PATCH', keepalive: true, credentials: 'omit', headers: H, body,
  });
}

function _onVisChange(): void { if (document.visibilityState === 'hidden') _finalUpdate(); }
function _onUnload(): void { _finalUpdate(); }

export function stopHeartbeat(): void {
  if (_heartbeatTimer) { clearInterval(_heartbeatTimer); _heartbeatTimer = null; }
  window.removeEventListener('visibilitychange', _onVisChange);
  window.removeEventListener('beforeunload', _onUnload);
}

// ─── Scroll Depth Tracking ────────────────────────────────────────────────────
// Fires an event at 25 / 50 / 75 / 90 / 100% scroll milestones

export function initScrollTracking(): () => void {
  const milestones = [25, 50, 75, 90, 100];
  const fired = new Set<number>();

  const onScroll = () => {
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    if (docH <= 0) return;
    const pct = Math.round((window.scrollY / docH) * 100);
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        void trackEvent('scroll_depth', { percent: m, page: _currentPage });
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

// ─── Section Time Tracking ────────────────────────────────────────────────────
// Track how long each section stays in view (uses IntersectionObserver).
// Usage: trackSectionTime('hero-section', 'Hero')

export function trackSectionTime(elementId: string, sectionLabel: string): () => void {
  const el = document.getElementById(elementId);
  if (!el) return () => {};

  let enteredAt: number | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && enteredAt === null) {
          enteredAt = Date.now();
          void trackEvent('section_enter', { section: sectionLabel });
        } else if (!entry.isIntersecting && enteredAt !== null) {
          const secs = Math.round((Date.now() - enteredAt) / 1000);
          void trackEvent('section_exit', { section: sectionLabel, seconds_spent: secs });
          enteredAt = null;
        }
      }
    },
    { threshold: 0.4 }   // 40% of section must be visible
  );

  observer.observe(el);
  return () => observer.disconnect();
}

// ─── Click Tracker ────────────────────────────────────────────────────────────
// Attach this to any button/link to track exactly what was clicked.
// Usage: onClick={() => trackClick('hero_demo_button', { label: 'Schedule a Demo' })}

export function trackClick(
  elementId: string,
  extra?: Record<string, unknown>
): void {
  void trackEvent('click', { element: elementId, page: _currentPage, ...extra });
}
