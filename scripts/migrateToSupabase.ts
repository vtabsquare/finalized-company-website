import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS_DATA, INNOVATIONS_DATA, AI_EMPLOYEES } from '../src/data/contentData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImage(localPath: string): Promise<string> {
  try {
    if (!localPath.startsWith('/src/assets/images/')) {
      return localPath; // Already a full URL (like unsplash)
    }

    const fullPath = path.join(__dirname, '..', localPath);
    const fileName = path.basename(localPath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      return localPath;
    }

    const fileBuffer = fs.readFileSync(fullPath);
    
    const { data, error } = await supabase
      .storage
      .from('media')
      .upload(`images/${fileName}`, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${fileName}:`, error.message);
      return localPath;
    }

    const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(`images/${fileName}`);
    console.log(`Uploaded ${fileName} to ${publicUrlData.publicUrl}`);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Exception during upload:', err);
    return localPath;
  }
}

async function migrateData() {
  console.log('Starting migration...');

  // Migrate Products
  console.log('Migrating PRODUCTS_DATA...');
  for (const product of PRODUCTS_DATA) {
    const publicUrl = await uploadImage(product.imageUrl);
    
    const { error } = await supabase.from('products').upsert({
      id: product.id,
      title: product.title,
      short_description: product.shortDescription,
      full_description: product.fullDescription,
      category: product.category,
      tags: product.tags,
      impact_metric: product.impactMetric,
      key_features: product.keyFeatures,
      tech_stack: product.techStack,
      icon_name: product.iconName,
      featured: product.featured || false,
      image_url: publicUrl,
      demo_snippet: product.demoSnippet
    });

    if (error) console.error(`Error inserting product ${product.id}:`, error.message);
    else console.log(`Inserted product: ${product.id}`);
  }

  // Migrate Innovations
  console.log('Migrating INNOVATIONS_DATA...');
  for (const innovation of INNOVATIONS_DATA) {
    const { error } = await supabase.from('innovations').upsert({
      id: innovation.id,
      title: innovation.title,
      tagline: innovation.tagline,
      description: innovation.description,
      icon: innovation.icon,
      status: innovation.status,
      highlights: innovation.highlights
    });

    if (error) console.error(`Error inserting innovation ${innovation.id}:`, error.message);
    else console.log(`Inserted innovation: ${innovation.id}`);
  }

  // Migrate AI Employees
  console.log('Migrating AI_EMPLOYEES...');
  for (const employee of AI_EMPLOYEES) {
    const { error } = await supabase.from('ai_employees').upsert({
      id: employee.id,
      title: employee.title,
      role: employee.role,
      description: employee.description,
      icon: employee.icon,
      badge: employee.badge,
      capabilities: employee.capabilities,
      sample_prompt: employee.samplePrompt,
      sample_output: employee.sampleOutput
    });

    if (error) console.error(`Error inserting AI Employee ${employee.id}:`, error.message);
    else console.log(`Inserted AI Employee: ${employee.id}`);
  }

  console.log('Migration completed.');
}

migrateData().catch(console.error);
