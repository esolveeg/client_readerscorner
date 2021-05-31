import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  devServer: {
    proxy: 'http://34.89.53.209/rcapi/public'
  },
  api: {
    baseURL: ''
  },
  head: {
    title: 'readerscorner',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-agile.js',
      // ssr: true,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  pwa: {
    manifest: {
      name: 'Readerscorner',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-agile'],
    loaders:  {
      vue: {
         prettify: false
      }
    }
  },
  router: {
    linkActiveClass: 'active'
  },
  server: {
    host:  process.env.APP_URL
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primaryColor: '#68097c',
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },  
  axios: {
    proxy: false // Can be also an object with default options
  },
  // server :{
  //   host : '192.168.43.213'
  // },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
        redirect: {
            login: '/auth',
            logout: '/',
            callback: '/auth',
            home: '/'
        },
        watchLoggedIn:false,
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {   
          login: { url: `${process.env.API_URL}login`, method: `post` },
          logout: { url: `${process.env.API_URL}user/logout`, method: `post` },
          user: { url: `${process.env.API_URL}user`, method: `get` }
        }
      }
    }
  },
}
