import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
  plugins: [reactRefresh()],
  build: {
    brotliSize: false,
    polyfillDynamicImport: false,
  },
})
