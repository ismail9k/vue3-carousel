module.exports = {
  lang: 'en-US',
  title: 'Vue3-carousel',
  description:
    'A highly customizable, lightweight Vue 3 carousel component for your next awesome project.',

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
      {
        text: 'Addons',
        link: '/addons',
      },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/ismail9k/vue3-carousel/edit/master/docs/:path',
    },

    carbonAds: {
      code: 'CW7IT23W',
      placement: 'vue3-carouselismail9kcom',
      format: 'cover',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
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
