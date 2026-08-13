import React from 'react';

export const DEFAULT_AI_IMAGES = [
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
];

/**
 * Returns a high-resolution, category-matched default enterprise AI image URL
 * when a project has no image or when an image fails to load.
 */
export const getDefaultProjectImage = (category?: string, title?: string, id?: string | number): string => {
  const cat = (category || '').toLowerCase();
  const text = `${cat} ${(title || '')}`.toLowerCase();

  if (cat.includes('analytic') || cat.includes('bi') || text.includes('report') || text.includes('data') || text.includes('dashboard') || text.includes('chart')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
  }
  if (cat.includes('vision') || cat.includes('construct') || text.includes('build') || text.includes('architect') || text.includes('blueprint') || text.includes('cctv')) {
    return 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80';
  }
  if (cat.includes('database') || cat.includes('migrat') || text.includes('sql') || text.includes('cloud') || text.includes('server') || text.includes('qlik') || text.includes('oracle')) {
    return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';
  }
  if (cat.includes('automat') || cat.includes('nlp') || text.includes('agent') || text.includes('bot') || text.includes('support') || text.includes('assist') || text.includes('chat')) {
    return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
  }
  if (cat.includes('logist') || cat.includes('supply') || text.includes('warehouse') || text.includes('shipping') || text.includes('inventor') || text.includes('fleet')) {
    return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80';
  }
  if (cat.includes('health') || cat.includes('medic') || text.includes('patient') || text.includes('clinical') || text.includes('doctor') || text.includes('pharma')) {
    return 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80';
  }
  if (cat.includes('secur') || cat.includes('auth') || text.includes('biomet') || text.includes('face') || text.includes('cyber') || text.includes('shield')) {
    return 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80';
  }

  // Deterministic fallback based on title or ID so it remains stable across renders
  const str = String(id || title || category || 'default-ai-project');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % DEFAULT_AI_IMAGES.length;
  return DEFAULT_AI_IMAGES[index];
};

/**
 * Validates an image URL and returns a fallback if missing, null, empty, or whitespace.
 */
export const getValidImageUrl = (imageUrl?: string | null, category?: string, title?: string, id?: string | number): string => {
  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim().length > 0) {
    return imageUrl.trim();
  }
  return getDefaultProjectImage(category, title, id);
};

/**
 * React onError handler for image elements. Replaces broken or missing images with category-matched fallbacks.
 */
export const handleImageError = (category?: string, title?: string, id?: string | number) => (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const fallback = getDefaultProjectImage(category, title, id);
  if (e.currentTarget.src !== fallback) {
    e.currentTarget.src = fallback;
  }
};
