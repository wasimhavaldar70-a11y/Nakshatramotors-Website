import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const BASE_URL = 'https://www.nakshatramotors.com';
const today = new Date().toISOString().split('T')[0];

// Static public pages
const staticPages = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/scooters', changefreq: 'daily', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.4' },
  { path: '/terms', changefreq: 'yearly', priority: '0.4' },
];

// Extract dynamic scooter slugs from src/data/seedData.ts
function getScooterSlugs() {
  try {
    const seedDataPath = path.join(projectRoot, 'src', 'data', 'seedData.ts');
    const content = fs.readFileSync(seedDataPath, 'utf8');
    const slugMatches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
    const slugs = [...new Set(slugMatches.map((m) => m[1]))];
    if (slugs.length > 0) return slugs;
  } catch (err) {
    console.warn('Could not parse seedData.ts, using fallback slugs:', err.message);
  }
  return ['hestur-dyno', 'hestur-dyno-160', 'hestur-werewolf', 'hestur-werewolf-plus'];
}

function buildXmlSitemap() {
  const scooterSlugs = getScooterSlugs();
  const scooterPages = scooterSlugs.map((slug) => ({
    path: `/scooters/${slug}`,
    changefreq: 'weekly',
    priority: '0.85',
  }));

  const allPages = [...staticPages, ...scooterPages];

  const urlsXml = allPages
    .map(
      (p) => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;
}

function buildRobotsTxt() {
  return `# Nakshatra Motors - Robots.txt
# https://www.nakshatramotors.com

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

export function generate() {
  const publicDir = path.join(projectRoot, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapXml = buildXmlSitemap();
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`✓ Generated ${sitemapPath} (${sitemapXml.length} bytes)`);

  const robotsTxt = buildRobotsTxt();
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log(`✓ Generated ${robotsPath} (${robotsTxt.length} bytes)`);
}

generate();

