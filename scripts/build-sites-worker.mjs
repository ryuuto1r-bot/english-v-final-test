import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const serverDir = path.join(distDir, 'server');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function collectFiles(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'server') continue;
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath, relativePath));
    } else {
      files.push({ fullPath, relativePath });
    }
  }

  return files;
}

const assets = {};
for (const file of await collectFiles(distDir)) {
  const body = await readFile(file.fullPath);
  assets[`/${file.relativePath}`] = {
    body: body.toString('base64'),
    type: mimeTypes[path.extname(file.relativePath).toLowerCase()] || 'application/octet-stream',
  };
}

const worker = `const assets = ${JSON.stringify(assets)};

function decode(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);
    const asset = assets[pathname] || assets[pathname.replace(/\\/$/, '/index.html')] || assets['/index.html'];
    const headers = new Headers({
      'Content-Type': asset.type,
      'X-Content-Type-Options': 'nosniff',
    });

    if (pathname.startsWith('/assets/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      headers.set('Cache-Control', 'no-cache');
    }

    return new Response(request.method === 'HEAD' ? null : decode(asset.body), {
      status: 200,
      headers,
    });
  },
};
`;

await mkdir(serverDir, { recursive: true });
await writeFile(path.join(serverDir, 'index.js'), worker);

console.log(`Sites worker generated with ${Object.keys(assets).length} static assets.`);
