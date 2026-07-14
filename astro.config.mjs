// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://luribeirocachos.com.br',
  adapter: vercel(),
  integrations: [react(), markdoc(), keystatic()],
  // Permite abrir o site por um link de túnel (ex.: *.trycloudflare.com) no preview
  vite: {
    server: {
      allowedHosts: ['.trycloudflare.com', '.loca.lt'],
    },
  },
});
