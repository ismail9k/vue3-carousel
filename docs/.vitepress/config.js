module.exports = {
  lang: 'en-US',
  title: 'Vue3-carousel',
  description: 'Vue.js 3 carousel component',

  themeConfig: {
    repo: 'ismail9k/vue3-carousel',
    docsRepo: 'ismail9k/vue3-carousel',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,

    nav: [{ text: 'Guide', link: '/getting-started' }],

    socialLinks: [{ icon: 'github', link: 'https://github.com/ismail9k/vue3-carousel' }],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Config', link: '/config' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Methods', link: '/api/methods' },
          { text: 'Data', link: '/api/data' },
          { text: 'Events', link: '/api/events' },
        ],
      },
    ],

    editLink: {
      pattern: 'https://github.com/ismail9k/vue3-carousel/edit/master/docs/:path',
    },
  },

  head: [
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-37DX3WR4T0',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-37DX3WR4T0');",
    ],
  ],
}
