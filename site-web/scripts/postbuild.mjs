// Static hosts serve /404.html for unknown URLs: copy the prerendered not-found page there.
import { copyFileSync, existsSync } from 'node:fs';

const dir = 'dist/site-web/browser';
const src = `${dir}/introuvable/index.html`;
if (!existsSync(src)) {
  console.error(`postbuild: ${src} is missing; was the /introuvable route prerendered?`);
  process.exit(1);
}
copyFileSync(src, `${dir}/404.html`);
console.log('postbuild: wrote 404.html');
