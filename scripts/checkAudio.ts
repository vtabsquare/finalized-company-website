import fs from 'fs';
import path from 'path';

function checkAudio(filePath: string) {
  try {
    const buffer = fs.readFileSync(filePath);
    const str = buffer.toString('binary', 0, Math.min(buffer.length, 500000));
    const hasAudio = str.includes('mp4a') || str.includes('soun') || str.includes('Audio') || str.includes('aac ');
    console.log(`${path.basename(filePath)} has audio markers:`, hasAudio);
  } catch (err) {
    console.error(err);
  }
}

checkAudio('c:/Work/vtab-square---ai-innovation-company/public/media/videos/faceauth.mp4');
checkAudio('c:/Work/vtab-square---ai-innovation-company/public/media/videos/l1_agent.mp4');
checkAudio('c:/Work/vtab-square---ai-innovation-company/public/media/videos/buildsmart.mp4');
checkAudio('c:/Work/vtab-square---ai-innovation-company/public/media/videos/qlik2powerbi.mp4');
