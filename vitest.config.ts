import { mergeConfig, defineConfig } from 'vite'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({}))
