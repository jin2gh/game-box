import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import importToCDN from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/game-box/',
  // build: {
  //   rollupOptions: {
  //     external: ['vue','vue-router'],
  //     plugins: [
  //       externalGlobals({
  //         vue: 'Vue',
  //         'vue-router': 'VueRouter'
  //       })
  //     ]
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: `https://cdn.jsdelivr.net/npm/vue@3.2.38/dist/vue.global.min.js`,
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: `https://cdn.jsdelivr.net/npm/vue-router@4.1.5/dist/vue-router.global.min.js`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
})
