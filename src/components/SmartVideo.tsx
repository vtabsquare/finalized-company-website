import React from 'react';
import { getYouTubeEmbedUrl, isYouTubeUrl } from '../utils/youtube';

interface SmartVideoProps {
  src: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  poster?: string;
}

export const SmartVideo: React.FC<SmartVideoProps> = ({
  src,
  title = 'Video Player',
  className = 'w-full h-full object-cover',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
  poster,
}) => {
  if (isYouTubeUrl(src)) {
    const embedUrl = getYouTubeEmbedUrl(src, {
      autoplay: autoPlay,
      mute: muted,
      loop,
      controls,
    });
    if (embedUrl) {
      return (
        <iframe
          src={embedUrl}
          title={title}
          className={`${className} border-0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline={playsInline}
      className={className}
    />
  );
};
