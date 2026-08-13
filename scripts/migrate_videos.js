import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = 'product-media';

async function migrateVideos() {
  console.log('Starting video migration...');

  // 1. Ensure bucket exists and is public
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) throw bucketError;

  const bucketExists = buckets.some(b => b.name === BUCKET_NAME);
  if (!bucketExists) {
    console.log(`Creating public bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    if (createError) throw createError;
  } else {
    console.log(`Bucket '${BUCKET_NAME}' already exists.`);
  }

  // 2. Fetch all products
  const { data: products, error: prodError } = await supabase.from('products').select('*');
  if (prodError) throw prodError;
  console.log(`Found ${products.length} products in DB.`);

  // 3. Find all local video files in public/media/videos
  const videosDir = path.join(process.cwd(), 'public', 'media', 'videos');
  
  function getFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        files.push(...getFiles(fullPath));
      } else if (item.name.endsWith('.mp4') || item.name.endsWith('.webm')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  const localVideos = getFiles(videosDir);
  console.log(`Found ${localVideos.length} local video files.`);

  // 4. Upload and update
  for (const videoPath of localVideos) {
    const relativePath = path.relative(videosDir, videoPath).replace(/\\/g, '/');
    const fileName = path.basename(videoPath);
    console.log(`Uploading ${fileName}...`);

    const fileBuffer = fs.readFileSync(videoPath);
    const contentType = videoPath.endsWith('.webm') ? 'video/webm' : 'video/mp4';

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(relativePath, fileBuffer, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      console.error(`Failed to upload ${fileName}:`, uploadError);
      continue;
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(relativePath);
    console.log(`Uploaded to: ${publicUrl}`);

    // Update DB
    for (const product of products) {
      if (product.detailContent && product.detailContent.videoUrl) {
        // If the DB videoUrl contains the filename, we update it
        if (product.detailContent.videoUrl.includes(fileName)) {
          const newDetailContent = {
            ...product.detailContent,
            videoUrl: publicUrl
          };
          
          console.log(`Updating product '${product.title}' with new video URL...`);
          const { error: updateError } = await supabase
            .from('products')
            .update({ detailContent: newDetailContent })
            .eq('id', product.id);
            
          if (updateError) {
            console.error(`Failed to update product ${product.title}:`, updateError);
          } else {
            console.log(`Product '${product.title}' updated successfully.`);
          }
        }
      }
    }
  }

  console.log('Migration complete!');
}

migrateVideos().catch(console.error);
