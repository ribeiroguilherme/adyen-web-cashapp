import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/payments/session': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
