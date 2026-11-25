import { useState, useEffect } from 'react';
import { Database, Layers, Cpu, Bot, TestTube } from 'lucide-react';
import type { ElementType } from 'react';

// ─── Demo app's Supabase — public anon key (read-only, safe to expose) ─────────
const DEMO_SB_URL = 'https://pxkwgedplrygvqxbckxf.supabase.co';
const DEMO_SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4a3dnZWRwbHJ5Z3ZxeGJja3hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MjEzMDMsImV4cCI6MjEwMzM5NzMwM30.eGbb6fAhcT1EExswyq1r8ihVB3xhqoMFz-CEU_DrI7g';

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
    const controller = new AbortController();

    fetch(
      `${DEMO_SB_URL}/rest/v1/demo_videos?select=*&is_active=eq.true&order=display_order.asc`,
      {
        headers: {
          apikey: DEMO_SB_ANON,
          Authorization: `Bearer ${DEMO_SB_ANON}`,
        },
        signal: controller.signal,
      }
    )
      .then(res => {
        if (!res.ok) throw new Error(`Supabase returned HTTP ${res.status}`);
        return res.json() as Promise<DemoVideoRow[]>;
      })
      .then(rows => {
        if (rows.length > 0) setProducts(rows.map(rowToProduct));
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        console.warn('[useDemoVideos] Falling back to local list:', err.message);
        setError(err.message);
        setLoading(false); // fallback already set as initial state
      });

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
