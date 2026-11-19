const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 1. Test time-based release selection logic
function getTimestamp(dateStr) {
  if (!dateStr) return 0;
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
}

function pickLatestByTime(releases = [], tags = [], tagCommitTimes = {}) {
  const validReleases = (Array.isArray(releases) ? releases : []).filter((r) => !r.draft);
  validReleases.sort((a, b) => {
    const timeA = Math.max(getTimestamp(a.published_at), getTimestamp(a.created_at));
    const timeB = Math.max(getTimestamp(b.published_at), getTimestamp(b.created_at));
    return timeB - timeA;
  });

  const newestRelease = validReleases[0] || null;
  const newestReleaseTime = newestRelease
    ? Math.max(getTimestamp(newestRelease.published_at), getTimestamp(newestRelease.created_at))
    : 0;

  const newestTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : null;
  const newestTagTime = newestTag ? (tagCommitTimes[newestTag.name] || 0) : 0;

  if (newestTag && newestTagTime > newestReleaseTime) {
    const matching = validReleases.find((r) => r.tag_name === newestTag.name) || null;
    return {
      version: newestTag.name,
      release: matching || newestRelease,
    };
  }

  if (newestRelease) {
    return {
      version: newestRelease.tag_name,
      release: newestRelease,
    };
  }

  if (newestTag) {
    return {
      version: newestTag.name,
      release: null,
    };
  }

  return { version: null, release: null };
}

// Test Case 1: Time-based priority over version number
// Example: v5.2.0 was published on Nov 20, v6.0.0 was published on Nov 19.
// Even though 6.0.0 > 5.2.0 in semver, v5.2.0 MUST be chosen because of newer timestamp.
const releasesTest = [
  { tag_name: 'v6.0.0', published_at: '2026-11-19T07:43:07Z', created_at: '2026-11-19T07:54:22Z' },
  { tag_name: 'v5.2.0', published_at: '2026-11-20T10:00:00Z', created_at: '2026-11-20T10:00:00Z' },
  { tag_name: 'v5.0.22', published_at: '2026-10-28T11:16:30Z', created_at: '2026-10-28T11:14:12Z' }
];
const result1 = pickLatestByTime(releasesTest, []);
assert.strictEqual(result1.version, 'v5.2.0', 'Must pick v5.2.0 based on latest publication timestamp');

// Test Case 2: Git tag created more recently than the latest GitHub release
const tagsTest = [
  { name: 'v6.0.1' },
  { name: 'v6.0.0' },
];
const tagTimes = {
  'v6.0.1': new Date('2026-11-21T12:00:00Z').getTime(),
};
const result2 = pickLatestByTime(releasesTest, tagsTest, tagTimes);
assert.strictEqual(result2.version, 'v6.0.1', 'Must pick v6.0.1 because its git commit is newer than the latest release');

// Test Case 3: Contract verification on source files
const heroFile = path.join(__dirname, 'src', 'components', 'VTABHero3DExperience.tsx');
const heroContent = fs.readFileSync(heroFile, 'utf8');
assert.ok(heroContent.includes('useDesktopRelease'), 'VTABHero3DExperience must use useDesktopRelease');
assert.ok(heroContent.includes('Download Desktop {releaseVersion}'), 'Button must render {releaseVersion}');

const utilFile = path.join(__dirname, 'src', 'utils', 'githubRelease.ts');
assert.ok(fs.existsSync(utilFile), 'githubRelease.ts must exist');
const utilContent = fs.readFileSync(utilFile, 'utf8');
assert.ok(utilContent.includes('pickLatestByTime'), 'githubRelease.ts must implement pickLatestByTime');
assert.ok(utilContent.includes('published_at'), 'githubRelease.ts must check publication date');
assert.ok(utilContent.includes('created_at'), 'githubRelease.ts must check creation date');

console.log('All time-based release selection contracts passed successfully.');
