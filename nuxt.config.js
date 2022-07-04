module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Manage English Course',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#ff6500' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/rhpteam.min.css', '~/assets/css/external.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@plugins/core-component.js', '@/plugins/modals/v-modal.js'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/vuetify',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '@nuxtjs/dotenv',
    '@nuxtjs/bootstrap-vue',
    'nuxt-user-agent'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.BASE_API_URL ||
      'https://nuxt-first-app-342d9-default-rtdb.asia-southeast1.firebasedatabase.app/'
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    baseApi:
      process.env.BASE_API_URL ||
      'https://nuxt-first-app-342d9-default-rtdb.asia-southeast1.firebasedatabase.app/',
    API_KEY: 'AIzaSyCvQXRWFjhfrC4GT0PoOnEXvnl97a0HY1M'
  },

  router: {
    middleware: ['check-auth']
  }
}
