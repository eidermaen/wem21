export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: true,
  },

  proxy: {
    '/api': {
      pathRewrite: {
        '^/api': '/.netlify/functions'
      }
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'WEM | Jona Ittermann',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/toast'},
  ],

  pwa: {
    manifest: {
      name: 'Jona Ittermann WEM',
      short_name: 'WEM',
      description: 'Hausarbeit WEM Wintersemester 2021 von Jona Ittermann',
      lang: 'de',
      useWebmanifestExtension: false
    },
    workbox: {
      pagesURLPattern: '/*',
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // Composition API
    '@nuxtjs/composition-api/module',
    //https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        [
          'prismjs',
          {
            'languages': ['javascript', 'css', 'go', 'sql'],
            "plugins": [
              "toolbar",
              "line-numbers",
              "autolinker",
              "line-highlight",
              "copy-to-clipboard",
              "highlight-keywords",
              "show-language",
              "normalize-whitespace"
            ],
            "theme": "tomorrow",
            "css": true
          }
        ]
      ]
    },
  },

  storybook: {
    stories: ['~/stories/**/*.stories.@(js|ts)'],
  },
}
