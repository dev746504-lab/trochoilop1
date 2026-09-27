import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Multi-page build: the landing page at "/" plus the React game under "/game2/".
// The other game (public/game1/index.html) is a fully static, self-contained
// file, so it needs no entry here — Vite just copies public/ as-is into dist/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        game2: resolve(import.meta.dirname, 'game2/index.html'),
      },
    },
  },
})
