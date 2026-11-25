export function isYouTubeUrl(url?: string | null): boolean {
  if (!url) return false;
  return /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)/i.test(url);
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const regex of patterns) {
    const match = url.match(regex);
    if (match && match[1]) return match[1];
  }
  return null;
}

export interface YouTubeEmbedOptions {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function getYouTubeEmbedUrl(
  url?: string | null,
  opts: YouTubeEmbedOptions = {}
): string | null {
  if (!url || !isYouTubeUrl(url)) return null;
  const id = extractYouTubeId(url);
  if (!id) return null;

  const {
    autoplay = true,
    mute = true,
    loop = true,
    controls = true,
  } = opts;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
    autoplay: autoplay ? '1' : '0',
    mute: mute ? '1' : '0',
    controls: controls ? '1' : '0',
  });

  if (loop) {
    params.set('loop', '1');
    params.set('playlist', id);
  }

  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
