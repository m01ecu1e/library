// https://nuxt.com/docs/api/configuration/nuxt-config
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
    'ready': async () => {
      await import('./server/init')
    }
  },
  css: [
    '~/assets/css/main.css'
  ],

})