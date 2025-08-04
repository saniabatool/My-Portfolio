import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/My-Portfolio/', // 🔁 Must match your GitHub repo name
  plugins: [react(), tailwindcss()],
})
