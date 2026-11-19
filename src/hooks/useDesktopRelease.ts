import { useState, useEffect } from 'react';
import { fetchLatestDesktopRelease, getCachedRelease } from '../utils/githubRelease';

export function useDesktopRelease() {
  const ENV_DOWNLOAD_URL = (import.meta.env.VITE_REPORTING_TOOL_DOWNLOAD_URL as string | undefined)?.trim() || '';
  const ENV_VERSION = (import.meta.env.VITE_REPORTING_TOOL_VERSION as string | undefined)?.trim() || '';
  const ENV_REPO = (import.meta.env.VITE_REPORTING_TOOL_GITHUB_REPO as string | undefined)?.trim() || 'vtabsquare/Reporting-tool-desktop-releases';

  const DEFAULT_PAGE = ENV_DOWNLOAD_URL || `https://github.com/${ENV_REPO}/releases/latest`;
  const cached = getCachedRelease();

  const [version, setVersion] = useState<string>(cached.version || ENV_VERSION || 'v6.0.0');
  const [downloadUrl, setDownloadUrl] = useState<string>(
    (ENV_DOWNLOAD_URL && ENV_DOWNLOAD_URL.toLowerCase().endsWith('.exe'))
      ? ENV_DOWNLOAD_URL
      : (cached.downloadUrl || DEFAULT_PAGE)
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRelease() {
      try {
        const result = await fetchLatestDesktopRelease(ENV_REPO, ENV_VERSION || 'v6.0.0', DEFAULT_PAGE);
        if (isMounted) {
          setVersion(result.version);
          if (ENV_DOWNLOAD_URL && ENV_DOWNLOAD_URL.toLowerCase().endsWith('.exe')) {
            setDownloadUrl(ENV_DOWNLOAD_URL);
          } else {
            setDownloadUrl(result.downloadUrl);
          }
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRelease();

    return () => {
      isMounted = false;
    };
  }, [ENV_REPO, ENV_VERSION, DEFAULT_PAGE, ENV_DOWNLOAD_URL]);

  return { version, downloadUrl, loading };
}
