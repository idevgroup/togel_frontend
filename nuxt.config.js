import webpack from 'webpack'
require('dotenv').config()
export default {
    mode: 'spa',

    /*
     ** Headers of the page
     */
    head: {
        title: process.env.APP_NAME || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
            },
        ],
        script: [
            { src: 'https://www.google.com/recaptcha/api.js' },
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
            },
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
            },
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [
        '~/assets/media/slide/style.css',
        '~/assets/corporate/css/style.css',
        '~/assets/corporate/css/style-responsive.css',
        '~/assets/corporate/css/custom.css',
        '~/assets/media/css/style.css',
    ],

    /*
     ** Plugins to load before mounting the App
     */
    router: {
        middleware: ['frontendconfig', 'mobile'],
        linkActiveClass: 'active',
    },
    plugins: [
        '~/plugins/mixins/user.js',
        '~/plugins/axios.js',
        '~/plugins/vee-validate.js',
        '~/plugins/swal.js',
        '~/plugins/vue2-filters.js',
        '~/plugins/modal.js',
        '~/plugins/mixins/corefunction.js',
        { src: '~/plugins/jquery.js', ssr: false },
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
        '@nuxtjs/dotenv',
        '@nuxtjs/moment',
    ],

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: process.env.APP_URL,
    },

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'member/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    logout: { url: 'member/logout', method: 'post' },
                    user: {
                        url: 'member/refresh',
                        method: 'get',
                        propertyName: 'user',
                        resetOnFail: true,
                    },
                },
                tokenRequired: true,
                tokenType: 'bearer',
            },
        },
        redirect: {
            home: '/',
        },
        watchLoggedIn: true,
        rewriteRedirects: false,
        resetOnError: true,
    },

    /*
     ** Build configuration
     */
    build: {
        vendor: ['vee-validate', 'moment', 'jquery'],
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                _: 'lodash',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),
        ],
        /*
         ** You can extend webpack config here
         */
        extractCSS: true,
        extend(config, { isDev, isClient }) {
            // Run ESLint on save
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                })

                config.module.rules.push({
                    test: /\.modernizrrc\.js$/,
                    loader: 'webpack-modernizr-loader',
                })

                config.resolve.alias['modernizr'] = '/.modernizrrc.js'
                console.log('this: ', config) // eslint-disable-line
            }
        },
    },
}