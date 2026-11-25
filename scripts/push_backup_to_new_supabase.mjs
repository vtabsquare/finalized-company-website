import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BACKUP_PATH = process.env.BACKUP_JSON_PATH || 'C:/Users/Aakaash Padhmanaban/.gemini/antigravity/brain/739c5201-f88c-4a19-b265-35ce63d16130/scratch/old_db_backup.json';

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY);

const LOCAL_IMAGE_MAP = {
  'qlik-to-powerbi-migration': '/media/qlik-to-powerbi-console.png',
  'gbti-smart-home-builder': '/media/homescape360-hero.jpg',
  'faceauth': '/media/faceauth-biometric-hero.jpg',
  'buildsmart-estimator': '/media/buildsmart-estimator-console.png',
  'postgresql-to-sqlserver-migration': '/media/postgres-to-sqlserver-console.png',
  'ai-l1-support-agent': '/media/ai-l1-automation-agent-hero.png',
  'smart-invoice-management-system': '/media/invoice-flow-console.png',
  'ai-migration-factory-databricks-control-plane': '/media/ai-migration-factory-showcase.png',
  'ai-marketing-agent-': '/media/ai-marketing-control-room.png',
  'ai-reporting-platform': '/media/vtab-reporting-dashboard-hd.png',
  'qa-ai-autonomous-testing-platform': '/media/qa-ai-testing-console.png',
};

function stripOldVideoUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (
    url.includes('wclpchjxdglhinoazxmr.supabase.co') ||
    url.includes('doazlhotvvzmsngjbfne.supabase.co') ||
    url.includes('jqxqujrldlutwgkaqwkb.supabase.co')
  ) {
    return '';
  }
  return url;
}

function cleanProductRow(row) {
  const cleaned = { ...row };
  if (LOCAL_IMAGE_MAP[row.id]) {
    cleaned.image_url = LOCAL_IMAGE_MAP[row.id];
  } else if (cleaned.image_url && cleaned.image_url.includes('.supabase.co')) {
    cleaned.image_url = '';
  }

  if (cleaned.detail_content && typeof cleaned.detail_content === 'object') {
    cleaned.detail_content = {
      ...cleaned.detail_content,
      videoUrl: stripOldVideoUrl(cleaned.detail_content.videoUrl),
    };
  }
  if (cleaned.demo_snippet && typeof cleaned.demo_snippet === 'object') {
    cleaned.demo_snippet = {
      ...cleaned.demo_snippet,
      videoUrl: stripOldVideoUrl(cleaned.demo_snippet.videoUrl),
    };
  }
  return cleaned;
}

async function run() {
  const backup = JSON.parse(fs.readFileSync(BACKUP_PATH, 'utf-8'));

  const tableOrder = [
    'products',
    'product_dashboards',
    'ai_employees',
    'innovations',
    'career_roles',
    'iot_content',
    'demo_requests',
    'contact_inquiries',
    'subscribers',
    'career_applications',
    'visitor_sessions',
    'page_views',
    'analytics_events',
  ];

  for (const table of tableOrder) {
    let rows = backup[table] || [];
    if (rows.length === 0) {
      console.log(`[SKIP] ${table}: 0 rows`);
      continue;
    }

    if (table === 'products') {
      rows = rows.map(cleanProductRow);
    } else if (table === 'iot_content') {
      rows = rows.map(r => ({ ...r, demo_video_url: stripOldVideoUrl(r.demo_video_url) }));
    }

    const chunkSize = 500;
    let inserted = 0;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await sb.from(table).upsert(chunk, { onConflict: 'id' });
      if (error) {
        console.error(`[ERROR] ${table} chunk ${i}:`, error.message);
        break;
      }
      inserted += chunk.length;
    }
    console.log(`[OK] ${table}: ${inserted}/${rows.length} rows migrated`);
  }
}

run();
