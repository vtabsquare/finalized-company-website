// Audits which video URL each product actually serves.
// The DB demo_snippet.videoUrl takes priority over the code map in
// ProductVideoStreamingPlayer, so this is the source of truth.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('products').select('id, title, demo_snippet');
  if (error) {
    console.error(error.message);
    process.exit(1);
  }

  const counts = {};
  for (const p of data) {
    const url = p.demo_snippet && p.demo_snippet.videoUrl ? p.demo_snippet.videoUrl : '(none - falls back to code map)';
    console.log(`${p.id}\n    ${url}`);
    counts[url] = (counts[url] || 0) + 1;
  }

  console.log(`\nTotal products: ${data.length}`);
  console.log(`Distinct video URLs: ${Object.keys(counts).length}`);
}

run();
