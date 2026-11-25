import { useState, useEffect } from 'react';
import { Database, Layers, Cpu, Bot, TestTube } from 'lucide-react';
import type { ElementType } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// ─── Raw shape returned from Supabase ─────────────────────────────────────────
export interface DemoVideoRow {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  video_url: string;
  accent: string;
  display_order: number;
  is_active: boolean;
}

// ─── Shape used by DemoShowcaseSection (includes mapped React icon) ────────────
export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  videoUrl: string;
  accent: string;
  Icon: ElementType;
}

// ─── Map id/category → icon component ────────────────────────────────────────
function resolveIcon(id: string, category: string): ElementType {
  const lower = id.toLowerCase();
  if (lower.includes('tableau'))                              return Layers;
  if (lower.includes('l1') || lower.includes('automation'))  return Bot;
  if (lower.includes('qa') || lower.includes('testing'))     return TestTube;
  if (lower.includes('build') || lower.includes('smart'))    return Cpu;
  if (category === 'Enterprise Automation')                  return Bot;
  if (category === 'Quality Assurance')                      return TestTube;
  if (category === 'Construction')                           return Cpu;
  return Database; // default — migration, SQL, BI
}

// ─── Convert DB row → DemoProduct ─────────────────────────────────────────────
function rowToProduct(row: DemoVideoRow): DemoProduct {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    tags: row.tags ?? [],
    videoUrl: row.video_url,
    accent: row.accent ?? 'blue',
    Icon: resolveIcon(row.id, row.category),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
interface UseDemoVideosResult {
  products: DemoProduct[];
  loading: boolean;
  error: string | null;
}

export function useDemoVideos(fallback: DemoProduct[]): UseDemoVideosResult {
  const [products, setProducts] = useState<DemoProduct[]>(fallback);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    supabase
      .from('products')
      .select('id, title, category, short_description, tags, detail_content, demo_snippet')
      .order('id', { ascending: true })
      .then(({ data, error: sbErr }) => {
        if (cancelled) return;
        if (sbErr) {
          setError(sbErr.message);
          setLoading(false);
          return;
        }
        const withVideos: DemoProduct[] = (data || [])
          .map((row: any) => {
            const videoUrl =
              row.detail_content?.videoUrl ||
              row.demo_snippet?.videoUrl ||
              '';
            if (!videoUrl) return null;
            return {
              id: row.id,
              name: row.title,
              category: row.category || 'Enterprise AI',
              description: row.short_description || '',
              tags: Array.isArray(row.tags) ? row.tags : [],
              videoUrl,
              accent: 'cyan',
              Icon: resolveIcon(row.id, row.category || ''),
            } as DemoProduct;
          })
          .filter(Boolean) as DemoProduct[];

        if (withVideos.length > 0) {
          setProducts(withVideos);
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
