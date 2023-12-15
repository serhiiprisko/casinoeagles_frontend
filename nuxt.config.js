import i18n from './config/i18n'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  publicRuntimeConfig: {
    SERVER_BASE_URL: process.env.SERVER_URL || 'http://127.0.0.1:8080',
    SOCKET_BASE_URL: process.env.SOCKET_URL, //|| 'http://127.0.0.1:2053',
    IS_DEV: process.env.NODE_ENV || 'development'
  },
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: 3001
  },
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  head: {
    title: 'Casinoeagle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: '/chat.js'
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/filters',
    { src: '~/plugins/breakpoint.js', mode: 'client' },
    { src: '~/plugins/country-flag.js', mode: 'client' },
    { src: '~/plugins/vue-flux.js', mode: 'client' },
    { src: '~/plugins/vue-select.js' },
    { src: '~/plugins/infinite-loading.js' },
    { src: '~/plugins/v-calendar.js', mode: 'client' },
    { src: '~/plugins/spinner.js' },
    { src: '~/plugins/mq.js' },
    { src: '~/plugins/socket.io.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-i18n', {
      strategy: 'prefix_except_default',
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          name: 'English',
          iso: 'en-US'
        },
        {
          code: 'fr',
          name: 'Français',
          iso: 'fr-FR'
        },
        {
          code: 'fi',
          name: 'Suomi',
          iso: 'fi-FI'
        },
        {
          code: 'de',
          name: 'Deutsch',
          iso: 'de-DE'
        },
        {
          code: 'it',
          name: 'Italiano',
          iso: 'it-IT'
        },
        {
          code: 'se',
          name: 'Svenska',
          iso: 'se-SE'
        },
        {
          code: 'no',
          name: 'Norsk',
          iso: 'no-NO'
        },
        {
          code: 'in',
          name: 'Indian',
          iso: 'in-IN'
        },
        {
          code: 'cn',
          name: '中文',
          iso: 'cn-CN'
        },
        {
          code: 'ru',
          name: 'русский',
          iso: 'ru-RU'
        },
        {
          code: 'tr',
          name: 'Türk',
          iso: 'tr-TR'
        }
      ],
      vueI18n: i18n
    }],
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  styleResources: {
    scss: '~/assets/scss/_variables.scss'
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
    prefix: '/api'
  },
  proxy: {
    '/api/front': {
      target: process.env.SERVER_URL || 'http://127.0.0.1:8080'
      // target: 'http://192.168.8.118:8080'
    },
    '/api/payment': {
      target: process.env.SERVER_URL || 'http://127.0.0.1:8080'
    },
    '/api/geolocation': {
      target: 'https://geolocation-db.com/json'
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/front/auth/login/', method: 'post', propertyName: 'accessToken' },
          logout: false,
          user: { url: '/front/auth/player', method: 'get', propertyName: false }
        }
        // tokenRequired: false,
        // tokenType: false
      }
    },
    cookie: {
      prefix: 'front.',
      options: {
        path: '/'
      }
    },
    redirect: false
    // token: {
    //   prefix: 'front.'
    // }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      compact: true
    }
  }
}
