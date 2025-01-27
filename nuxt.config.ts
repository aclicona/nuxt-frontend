// nuxt.config.ts
const pathtostatic = process.env.CDN_STATIC_HOST || ''
const serverPort: number = parseInt(process.env.PORT as string, 10) || 3000
export default defineNuxtConfig({
  devServer: {
    port: serverPort
  },
  // Server configuration
  nitro: {
    devProxy: {
      '/graphql': {
        target: process.env.BACKEND_API_URL || 'http://localhost:8000/graphql',
        changeOrigin: true
      }
    }
  },

  // App configuration
  app: {
    head: {
      titleTemplate: `%s - ${process.env.SITE_NAME}`,
      title: process.env.SITE_NAME || 'Nombre del sitio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: process.env.SITE_DESCRIPTION || '' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${pathtostatic}/favicon.png` },
        { rel: 'shortcut icon', type: 'image/png', href: `${pathtostatic}/favicon.png` },
        { rel: 'apple-touch-icon', type: 'image/png', href: `${pathtostatic}/favicon.png` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,600;0,900;1,800&display=swap',
          rel: 'stylesheet'
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700&display=swap',
          rel: 'stylesheet'
        }
      ]
    }
  },

  // CSS configuration
  css: ['~/assets/css/tailwind.css'],

  // Plugins configuration
  plugins: [
    '~/plugins/persistedState.client',
    '~/plugins/user/login',
    '~/plugins/user/logout',
    '~/plugins/user/userInfo',
    '~/plugins/currency',
    '~/plugins/header/menuTree',
    '~/plugins/vue-plugins',
    '~/plugins/contactenos',
    '~/plugins/descargables',
    '~/plugins/tarifas',
    '~/plugins/pqrs',
    '~/plugins/gestion-documental',
    '~/plugins/vacancy',
    '~/plugins/blog',
    '~/plugins/empresa',
    '~/plugins/cita',
    '~/plugins/cremacion'],

  // Modules configuration
  modules: [
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-gmaps'
  ],

  // Runtime configuration
  runtimeConfig: {
    public: {
      apiBaseUrl: (process.env.BACKEND_API_URL as string) || 'http://localhost:8000/graphql',
      siteName: process.env.SITE_NAME,
      siteDescription: process.env.SITE_DESCRIPTION,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  },

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // Build configuration
  build: {
    transpile: ['@fawmi/vue-google-maps']
  },

  // Vite configuration
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name) {
              if (assetInfo.name.endsWith('.css')) {
                return 'css/[name].[hash].[ext]'
              }
              if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
                return 'img/[name].[hash].[ext]'
              }
              if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
                return 'fonts/[name].[hash].[ext]'
              }
              if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
                return 'media/[name].[hash].[ext]'
              }
            }
            return '[name].[hash].[ext]'
          }
        }
      }
    }
  }
})