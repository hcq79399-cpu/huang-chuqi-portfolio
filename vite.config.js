import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/huang-chuqi-portfolio/',
  plugins: [react()],
  server: {
    allowedHosts: [
      'worship-telescope-prep-close.trycloudflare.com',
    ],
  },
});
