import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: 'My-Portfolio', // 🔁 Replace with your actual GitHub repo name
  plugins: [tailwindcss()],
})
