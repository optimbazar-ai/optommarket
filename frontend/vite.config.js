import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.svg', 'robots.txt', 'apple-touch-icon.svg'],
      manifest: {
        name: 'OptoMarket.uz - Optom Savdo Platformasi',
        short_name: 'OptoMarket',
        description: 'O\'zbekistondagi eng yirik optom savdo platformasi. 10,000+ mahsulotlar, raqobatbardosh narxlar va tez yetkazib berish.',
        theme_color: '#2563EB',
        background_color: '#FFFFFF',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '32x32',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        categories: ['shopping', 'business', 'productivity'],
        shortcuts: [
          {
            name: 'Mahsulotlar',
            short_name: 'Products',
            description: 'Barcha mahsulotlarni ko\'rish',
            url: '/products',
            icons: [{ src: '/icon-192.svg', sizes: '192x192' }]
          },
          {
            name: 'Kategoriyalar',
            short_name: 'Categories',
            description: 'Mahsulot kategoriyalari',
            url: '/categories',
            icons: [{ src: '/icon-192.svg', sizes: '192x192' }]
          },
          {
            name: 'Savatcha',
            short_name: 'Cart',
            description: 'Xarid savatchasi',
            url: '/cart',
            icons: [{ src: '/icon-192.svg', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.optommarket\.uz\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    port: 3000,
    open: false
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'chart-vendor': ['recharts']
        }
      }
    }
  }
})
