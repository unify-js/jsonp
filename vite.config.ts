import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

import packagejson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: Object.keys(packagejson.peerDependencies)
    }
  }
})
