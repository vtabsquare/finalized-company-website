import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadVideo(fileName: string) {
  const fullPath = path.join(__dirname, '..', 'media', fileName);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }

  const fileBuffer = fs.readFileSync(fullPath);
  
  const { data, error } = await supabase
    .storage
    .from('media')
    .upload(`videos/${fileName}`, fileBuffer, {
      contentType: 'video/mp4',
      upsert: true
    });

  if (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
  } else {
    const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(`videos/${fileName}`);
    console.log(`Uploaded ${fileName}: ${publicUrlData.publicUrl}`);
  }
}

async function run() {
  await uploadVideo('buildsmart.mp4');
  await uploadVideo('qlik2powerbi.mp4');
}

run();
