// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui",'@pinia/nuxt','vue-yandex-maps/nuxt'],
  yandexMaps: {
    apikey: '57e95a23-8693-4fca-8f7b-b858ad223884',
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
  }
})