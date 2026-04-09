import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const LANGS = ['en', 'it'] as const;
const SECTIONS = ['experience', 'capabilities', 'selected-works', 'contact'] as const;
const PROJECT_SLUGS = [
  'emozione3',
  'pam-panorama',
  'europlan',
  'hotel-caesius',
  'kalika-skincare',
  'il-marmo',
  'hotel-nettuno',
  'personal-website',
] as const;

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },

    ssgOptions: {
      dirStyle: 'nested',
      includedRoutes() {
        const routes: string[] = ['/'];
        for (const lang of LANGS) {
          routes.push(`/${lang}/`);
          for (const section of SECTIONS) {
            routes.push(`/${lang}/${section}`);
          }
          for (const slug of PROJECT_SLUGS) {
            routes.push(`/${lang}/selected-works/${slug}`);
          }
        }
        return routes;
      },
    },
  };
});
