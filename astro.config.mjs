import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

import vue from '@astrojs/vue'

import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // vite: defineConfig({
  //   ssr: {
  //     external: ['tailwind.config.cjs']
  //   }
  // }),
  vite: {
    plugins: [
      viteCommonjs({ include: ['tailwind.config.cjs'] })
    ]
    // optimizeDeps: {
    //   esbuildOptions: {
    //     plugins: [

    //     ]
    //   }
    // }
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false
      }
    }),
    mdx(),
    vue()]
})
