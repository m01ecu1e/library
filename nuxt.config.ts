// https://nuxt.com/docs/api/configuration/nuxt-config
import { initCronJobs } from './server/cron'
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    ['@pinia/nuxt',
      {
        autoImports: ['defineStore',],
      },
    ],
    'vue-yandex-maps/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  

  yandexMaps: {
    apikey: process.env.YANDEX_MAPS_API_KEY,
  },
  colorMode: {
    preference: 'dark'
  },
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: true
      }
    }
  },
  hooks: {
    'listen': () => {
      if (process.env.NODE_ENV !== 'production') {
        initCronJobs()
      }
    }
  },
  css: [
    '~/assets/css/main.css'
  ],

})