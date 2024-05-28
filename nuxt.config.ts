// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui",'@pinia/nuxt','vue-yandex-maps/nuxt'],
  yandexMaps: {
    apikey: process.env.YANDEX_MAPS_API_KEY,
  },
  colorMode: {
    preference: 'light'
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
  }
})