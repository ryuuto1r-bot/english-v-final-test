import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/test-prep-site/',
  plugins: [react()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
});
