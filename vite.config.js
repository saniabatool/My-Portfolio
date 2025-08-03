import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is the crucial part for GitHub Pages deployment.
  // It sets the base path for all assets, ensuring they are correctly
  // referenced relative to the repository name.
  base: '/My-Portfolio/',
});
