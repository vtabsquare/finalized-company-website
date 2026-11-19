export interface GitHubTag {
  name: string;
  zipball_url?: string;
  tarball_url?: string;
  commit?: { sha: string; url: string };
  node_id?: string;
}

export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  content_type?: string;
  size?: number;
}

export interface GitHubRelease {
  id?: number;
  tag_name: string;
  name?: string;
  created_at: string;
  published_at?: string;
  draft?: boolean;
  prerelease?: boolean;
  html_url?: string;
  assets?: GitHubReleaseAsset[];
}

const STORAGE_PREFIX = 'vtab_desktop_release_';
const CACHE_TTL_MS = 60 * 1000; // 60s cache TTL matching GitHub API max-age

function getTimestamp(dateStr?: string | null): number {
  if (!dateStr) return 0;
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
}

/**
 * Given releases and tags, pick the latest release strictly based on TIME
 * (publication / creation date), NOT based on version number.
 */
export function pickLatestByTime(
  releases: GitHubRelease[] = [],
  tags: GitHubTag[] = [],
  tagCommitTimes: Record<string, number> = {}
): { version: string | null; release: GitHubRelease | null } {
  // Filter non-draft releases and sort strictly by publication/creation timestamp descending
  const validReleases = (Array.isArray(releases) ? releases : []).filter((r) => !r.draft);
  validReleases.sort((a, b) => {
    const timeA = Math.max(getTimestamp(a.published_at), getTimestamp(a.created_at));
    const timeB = Math.max(getTimestamp(b.published_at), getTimestamp(b.created_at));
    return timeB - timeA;
  });

  const newestRelease = validReleases[0] || null;
  const newestReleaseTime = newestRelease
    ? Math.max(getTimestamp(newestRelease.published_at), getTimestamp(newestRelease.created_at))
    : 0;

  // The first tag returned by GitHub /tags is the most recently created tag in the repository
  const newestTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : null;
  const newestTagTime = newestTag ? (tagCommitTimes[newestTag.name] || 0) : 0;

  // If the newest git tag was created more recently than the newest release, use that tag
  if (newestTag && newestTagTime > newestReleaseTime) {
    const matching = validReleases.find((r) => r.tag_name === newestTag.name) || null;
    return {
      version: newestTag.name,
      release: matching || newestRelease,
    };
  }

  if (newestRelease) {
    return {
      version: newestRelease.tag_name,
      release: newestRelease,
    };
  }

  if (newestTag) {
    return {
      version: newestTag.name,
      release: null,
    };
  }

  return { version: null, release: null };
}

export function getCachedRelease(): { version: string | null; downloadUrl: string | null } {
  try {
    if (typeof window === 'undefined') return { version: null, downloadUrl: null };
    const savedTime = parseInt(sessionStorage.getItem(`${STORAGE_PREFIX}time`) || localStorage.getItem(`${STORAGE_PREFIX}time`) || '0', 10);
    if (!savedTime || Date.now() - savedTime > CACHE_TTL_MS) {
      return { version: null, downloadUrl: null };
    }
    const version = sessionStorage.getItem(`${STORAGE_PREFIX}version`) || localStorage.getItem(`${STORAGE_PREFIX}version`);
    const downloadUrl = sessionStorage.getItem(`${STORAGE_PREFIX}url`) || localStorage.getItem(`${STORAGE_PREFIX}url`);
    return { version, downloadUrl };
  } catch {
    return { version: null, downloadUrl: null };
  }
}

export function setCachedRelease(version: string, downloadUrl?: string): void {
  try {
    if (typeof window === 'undefined') return;
    const now = Date.now().toString();
    sessionStorage.setItem(`${STORAGE_PREFIX}time`, now);
    localStorage.setItem(`${STORAGE_PREFIX}time`, now);
    if (version) {
      sessionStorage.setItem(`${STORAGE_PREFIX}version`, version);
      localStorage.setItem(`${STORAGE_PREFIX}version`, version);
    }
    if (downloadUrl) {
      sessionStorage.setItem(`${STORAGE_PREFIX}url`, downloadUrl);
      localStorage.setItem(`${STORAGE_PREFIX}url`, downloadUrl);
    }
  } catch {
    // Ignore storage exceptions
  }
}

/**
 * Fetches the latest desktop release strictly based on TIME (most recent publication / creation),
 * rather than sorting by version number.
 */
export async function fetchLatestDesktopRelease(
  repo: string = 'vtabsquare/Reporting-tool-desktop-releases',
  fallbackVersion: string = 'v6.0.0',
  fallbackUrl: string = 'https://github.com/vtabsquare/Reporting-tool-desktop-releases/releases/latest'
): Promise<{ version: string; downloadUrl: string }> {
  let resolvedVersion = fallbackVersion;
  let resolvedUrl = fallbackUrl;

  const headers = { Accept: 'application/vnd.github.v3+json' };

  try {
    // Query both releases and tags in parallel
    const [releasesRes, tagsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}/releases?per_page=15`, { headers }).catch(() => null),
      fetch(`https://api.github.com/repos/${repo}/tags?per_page=10`, { headers }).catch(() => null),
    ]);

    const releases: GitHubRelease[] = (releasesRes && releasesRes.ok) ? await releasesRes.json() : [];
    const tags: GitHubTag[] = (tagsRes && tagsRes.ok) ? await tagsRes.json() : [];

    // Check creation/commit date for the newest tag if present
    const tagCommitTimes: Record<string, number> = {};
    const newestTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : null;
    if (newestTag?.commit?.url) {
      try {
        const commitRes = await fetch(newestTag.commit.url, { headers });
        if (commitRes.ok) {
          const commitData = await commitRes.json();
          const dStr = commitData.commit?.committer?.date || commitData.commit?.author?.date;
          if (dStr) {
            tagCommitTimes[newestTag.name] = new Date(dStr).getTime();
          }
        }
      } catch {
        // Fall back to releases / tags order
      }
    }

    const { version, release } = pickLatestByTime(releases, tags, tagCommitTimes);

    if (version) {
      resolvedVersion = version.startsWith('v') ? version : `v${version}`;
    }

    // Resolve download asset (.exe installer) for the chosen version
    const targetRelease = release || releases.find((r) => r.tag_name === resolvedVersion);
    if (targetRelease && Array.isArray(targetRelease.assets)) {
      const exeAsset = targetRelease.assets.find(
        (a) => typeof a.name === 'string' && a.name.toLowerCase().endsWith('.exe')
      );
      if (exeAsset?.browser_download_url) {
        resolvedUrl = exeAsset.browser_download_url;
      } else if (targetRelease.html_url) {
        resolvedUrl = targetRelease.html_url;
      }
    } else {
      resolvedUrl = `https://github.com/${repo}/releases/tag/${resolvedVersion}`;
    }
  } catch (error) {
    console.warn('[githubRelease] Failed to fetch latest release by time from GitHub:', error);
  }

  setCachedRelease(resolvedVersion, resolvedUrl);
  return { version: resolvedVersion, downloadUrl: resolvedUrl };
}
