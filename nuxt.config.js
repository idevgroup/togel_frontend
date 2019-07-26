require('dotenv').config();
export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.APP_NAME || '',
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
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
      }
    ],
    script: [{ src: 'https://www.google.com/recaptcha/api.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/corporate/css/style.css',
    '~/assets/corporate/css/style-responsive.css',
    '~/assets/corporate/css/custom.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  router: {
    middleware: ['frontendconfig'],
    linkActiveClass: 'active'
  },
  plugins: [
    // '~/plugins/mixins/validation.js',
    '~/plugins/mixins/user.js',
    // '~/plugins/mixins/config.js',
    '~/plugins/axios.js',
    '~/plugins/vee-validate.js',
    '~/plugins/swal.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.APP_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'member/login', method: 'post', propertyName: 'token' },
          logout: { url: 'member/logout', method: 'post' },
          user: {
            url: 'member/refresh',
            method: 'get',
            propertyName: 'user',
            resetOnFail: true
          }
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    },
    redirect: {
      home: '/'
    },
    plugins: ['~/plugins/auth.js'],
    watchLoggedIn: true,
    rewriteRedirects: false,
    resetOnError: true
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['vee-validate'],
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    extend(config, ctx) {}
  }
};