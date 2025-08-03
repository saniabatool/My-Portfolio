import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // The base path MUST start and end with a slash for GitHub Pages.
  // This tells Vite to look for assets in the correct sub-directory.
  base: '/My-Portfolio/',
  plugins: [
    // This plugin is essential for Vite to work with React.
    react(),
    // Keep your Tailwind CSS plugin as well.
    tailwindcss()
  ],
});
