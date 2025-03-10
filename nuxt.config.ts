// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import process from 'node:process'

const sw = process.env.SW === 'true'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: 'logo.png' }
      ]
    }
  }, 

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@vite-pwa/nuxt'],

  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxt Vite PWA',
      short_name: 'NuxtVitePWA',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo.png',
          sizes: '516x516',
          type: 'image/png',
        },
        {
          src: 'logo.png',
          sizes: '516x516',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  }
})