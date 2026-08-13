// Re-encodes every product video to a low-bitrate, stream-friendly profile and
// repoints the DB at the optimized copy.
//
// Why: audit showed 11 of 18 products served videos at 4.6-7.9 Mbps. A viewer
// must sustain throughput above the bitrate or playback stalls, which is why
// detail-page videos buffered while the ~2 Mbps slideshow clip did not.
//
// Profile: H.264 main, <=1280 wide, 24fps, CRF 28 with a hard 1000k ceiling,
// +faststart so playback can begin before the file finishes downloading.
// Screen recordings land far below the ceiling; real footage hits it.
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const FFMPEG = 'C:\\Users\\Aakaash Padhmanaban\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe';
const BUCKET = 'product-media';
const PUBLIC_PREFIX = '/storage/v1/object/public/' + BUCKET + '/';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vidopt-'));

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    proc.stderr.on('data', (d) => { err += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.split('\n').slice(-15).join('\n')));
    });
    proc.on('error', reject);
  });
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function encode(input, output) {
  await run(FFMPEG, [
    '-y', '-i', input,
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-crf', '28',
    '-maxrate', '1000k',
    '-bufsize', '2000k',
    '-preset', 'medium',
    '-vf', "scale='min(1280,iw)':-2,fps=24",
    '-c:a', 'aac', '-b:a', '64k', '-ac', '2',
    output,
  ]);
}

async function processProduct(product) {
  const snippet = product.demo_snippet || {};
  const url = snippet.videoUrl;

  if (!url) return { id: product.id, status: 'skipped (no videoUrl)' };
  if (!url.includes(PUBLIC_PREFIX)) return { id: product.id, status: 'skipped (not a Supabase object)' };

  const storagePath = decodeURIComponent(url.split(PUBLIC_PREFIX)[1]);
  if (storagePath.endsWith('-web.mp4')) return { id: product.id, status: 'skipped (already optimized)' };

  const webPath = storagePath.replace(/\.mp4$/i, '-web.mp4');
  const localIn = path.join(tmpDir, 'in-' + path.basename(storagePath));
  const localOut = path.join(tmpDir, 'out-' + path.basename(webPath));

  process.stdout.write(`\n${product.id}\n  downloading ${storagePath} ... `);
  const inSize = await download(url, localIn);
  process.stdout.write(`${mb(inSize)}MB\n  encoding ... `);

  await encode(localIn, localOut);
  const outSize = fs.statSync(localOut).size;
  const pct = (100 - (outSize / inSize) * 100).toFixed(1);
  process.stdout.write(`${mb(outSize)}MB (-${pct}%)\n  uploading ${webPath} ... `);

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(webPath, fs.readFileSync(localOut), { contentType: 'video/mp4', upsert: true });
  if (upErr) throw new Error('upload: ' + upErr.message);

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(webPath);
  const { error: dbErr } = await supabase
    .from('products')
    .update({ demo_snippet: { ...snippet, videoUrl: pub.publicUrl } })
    .eq('id', product.id);
  if (dbErr) throw new Error('db: ' + dbErr.message);

  process.stdout.write('done\n');
  fs.unlinkSync(localIn);
  fs.unlinkSync(localOut);

  return { id: product.id, status: `${mb(inSize)}MB -> ${mb(outSize)}MB (-${pct}%)` };
}

async function main() {
  const { data, error } = await supabase.from('products').select('id, demo_snippet');
  if (error) throw error;

  const results = [];
  for (const product of data) {
    try {
      results.push(await processProduct(product));
    } catch (e) {
      console.error(`\n  FAILED ${product.id}: ${e.message}`);
      results.push({ id: product.id, status: 'FAILED: ' + e.message.split('\n')[0] });
    }
  }

  console.log('\n\n===== SUMMARY =====');
  for (const r of results) console.log(`${r.id.padEnd(40)} ${r.status}`);

  fs.rmSync(tmpDir, { recursive: true, force: true });
}

main();
