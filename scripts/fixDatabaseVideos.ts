import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

const SUPABASE_MEDIA = 'https://jqxqujrldlutwgkaqwkb.supabase.co/storage/v1/object/public/product-media';

const CORRECT_MAPPINGS: Record<string, string> = {
  'ai-reporting-platform': `${SUPABASE_MEDIA}/powerbi/application-analysis-report.mp4`,
  'qlik-to-powerbi-migration': `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  'gbti-smart-home-builder': '/media/videos/ai_smart_home.mp4',
  'buildsmart-estimator': `${SUPABASE_MEDIA}/buildsmart.mp4`,
  'faceauth': `${SUPABASE_MEDIA}/faceauth.mp4`,
  'packaging-optimization-platform': '/media/videos/ai_logistics.mp4',
  'ai-l1-support-agent': `${SUPABASE_MEDIA}/l1_agent.mp4`,
  'postgresql-to-sqlserver-migration': `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  'all-phase-dashboard': '/media/videos/powerbi/all-phase-dashboard.mp4',
  'application-analysis-report': `${SUPABASE_MEDIA}/powerbi/application-analysis-report.mp4`,
  'e-grow-analysis-dashboard': `${SUPABASE_MEDIA}/powerbi/e-grow-analysis-dashboard.mp4`,
  'google-analytics-dashboard': `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`,
  'hva-score-analysis-dashboard': `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`,
  'final-quality-inspection-dashboard': `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`,
  'food-inspection-dashboard': `${SUPABASE_MEDIA}/powerbi/food-inspection-dashboard.mp4`,
  'energy-consumption-dashboard': `${SUPABASE_MEDIA}/powerbi/energy-consumption-dashboard.mp4`,
  'hr-analytics-dashboard': '/media/videos/powerbi/hr-analytics-dashboard.mp4',
};

const DEFAULT_POOL = [
  `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/e-grow-analysis-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/food-inspection-dashboard.mp4`,
  `${SUPABASE_MEDIA}/powerbi/energy-consumption-dashboard.mp4`,
  `${SUPABASE_MEDIA}/qlik2powerbi.mp4`,
  `${SUPABASE_MEDIA}/buildsmart.mp4`,
  '/media/videos/ai_logistics.mp4',
  '/media/videos/ai_smart_home.mp4',
];

async function run() {
  console.log('Connecting to Supabase...');
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products.`);

  for (const item of products) {
    let demoSnippet: any = item.demo_snippet || item.demoSnippet;
    if (typeof demoSnippet === 'string') {
      try { demoSnippet = JSON.parse(demoSnippet); } catch(e) {}
    }

    let detailContent: any = item.detail_content || item.detailContent;
    if (typeof detailContent === 'string') {
      try { detailContent = JSON.parse(detailContent); } catch(e) {}
    }

    const id = item.id;
    const title = item.title || '';
    
    let targetVideo = CORRECT_MAPPINGS[id];
    if (!targetVideo) {
      const text = `${id} ${title}`.toLowerCase();
      if (text.includes('sql') || text.includes('db') || text.includes('database') || text.includes('migration')) {
        targetVideo = `${SUPABASE_MEDIA}/qlik2powerbi.mp4`;
      } else if (text.includes('home') || text.includes('energy') || text.includes('builder') || text.includes('smart')) {
        targetVideo = '/media/videos/ai_smart_home.mp4';
      } else if (text.includes('packaging') || text.includes('logistics') || text.includes('shipping') || text.includes('supply')) {
        targetVideo = '/media/videos/ai_logistics.mp4';
      } else if (text.includes('inspection') || text.includes('quality') || text.includes('food')) {
        targetVideo = `${SUPABASE_MEDIA}/powerbi/final-quality-inspection-dashboard.mp4`;
      } else if (text.includes('analytics') || text.includes('marketing') || text.includes('sales') || text.includes('customer') || text.includes('sample')) {
        targetVideo = `${SUPABASE_MEDIA}/powerbi/google-analytics-dashboard.mp4`;
      } else if (text.includes('score') || text.includes('hr') || text.includes('employee') || text.includes('support')) {
        targetVideo = `${SUPABASE_MEDIA}/powerbi/hva-score-analysis-dashboard.mp4`;
      } else if (text.includes('report') || text.includes('bi') || text.includes('platform')) {
        targetVideo = `${SUPABASE_MEDIA}/powerbi/application-analysis-report.mp4`;
      } else {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
          hash = (hash << 5) - hash + text.charCodeAt(i);
          hash |= 0;
        }
        const index = Math.abs(hash) % DEFAULT_POOL.length;
        targetVideo = DEFAULT_POOL[index];
      }
    }

    console.log(`Updating [${id}] "${title}" -> ${targetVideo}`);

    if (demoSnippet && typeof demoSnippet === 'object') {
      demoSnippet.videoUrl = targetVideo;
    }
    if (detailContent && typeof detailContent === 'object') {
      detailContent.videoUrl = targetVideo;
    }

    const updates: any = {};
    if (item.demo_snippet !== undefined) updates.demo_snippet = demoSnippet;
    if (item.demoSnippet !== undefined) updates.demoSnippet = demoSnippet;
    if (item.detail_content !== undefined) updates.detail_content = detailContent;
    if (item.detailContent !== undefined) updates.detailContent = detailContent;

    const { error: updateError } = await supabase.from('products').update(updates).eq('id', id);
    if (updateError) {
      console.error(`Failed to update product ${id}:`, updateError.message);
    }
  }
  console.log('Finished updating database video mappings!');
}

run();
