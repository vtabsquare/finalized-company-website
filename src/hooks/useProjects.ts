import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/contentData';
import { getValidImageUrl } from '../utils/imageFallback';

export function useProjects() {
  const [projects, setProjects] = useState<Product[]>(() =>
    PRODUCTS_DATA.map(p => ({
      ...p,
      imageUrl: getValidImageUrl(p.imageUrl, p.category, p.title, p.id)
    }))
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true }); 

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const formattedData: Product[] = data.map((item: any) => {
            let demoSnippet: any = item.demo_snippet || item.demoSnippet;
            if (typeof demoSnippet === 'string') {
              try { demoSnippet = JSON.parse(demoSnippet); } catch(e) {}
            }

            let detailContent: any = item.detail_content || item.detailContent;
            if (typeof detailContent === 'string') {
              try { detailContent = JSON.parse(detailContent); } catch(e) {}
            }

            // Extract detailContent from demoSnippet if it was stored there
            if (!detailContent && demoSnippet && demoSnippet.type === 'detailContent') {
              detailContent = { ...demoSnippet };
              delete detailContent.type;
              demoSnippet = undefined;
            }

            return {
              id: item.id,
              title: item.title,
              shortDescription: item.short_description || item.shortDescription || '',
              fullDescription: item.full_description || item.fullDescription || '',
              category: item.category,
              tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags || [],
              impactMetric: item.impact_metric || item.impactMetric || '',
              keyFeatures: typeof item.key_features === 'string' ? JSON.parse(item.key_features) : item.keyFeatures || item.key_features || [],
              techStack: typeof item.tech_stack === 'string' ? JSON.parse(item.tech_stack) : item.techStack || item.tech_stack || [],
              iconName: item.icon_name || item.iconName || 'Package',
              featured: item.featured ?? true,
              imageUrl: getValidImageUrl(item.image_url || item.imageUrl, item.category, item.title, item.id),
              demoSnippet,
              detailContent
            };
          });
          setProjects(formattedData);
        }
      } catch (err: any) {
        console.error('Error fetching projects from Supabase:', err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, payload => {
        console.log('Realtime update received:', payload);
        fetchProjects();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return { projects, loading, error };
}
