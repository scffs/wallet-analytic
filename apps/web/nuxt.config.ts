export default defineNuxtConfig({
  compatibilityDate: '2025-07-24',
  devtools: { enabled: true },
  vite: {
    server: {
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 5174,
  },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    [
      '@nuxtjs/i18n',
      {
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        detectBrowserLanguage: false,
        locales: [
          { code: 'ru', name: 'Русский', iso: 'ru-RU', file: 'ru.json' },
          { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
        ],
        lazy: true,
        langDir: 'locales',
      },
    ],
  ],
  css: ['~/assets/css/main.css'],
})
