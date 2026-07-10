import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to repo name for GitHub Pages deployment.
// For local dev, run: vite --base=/
export default defineConfig({
  plugins: [react()],
  base: '/sbgst-reminder-studio/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
