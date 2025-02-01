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
    logo: {
      alt: 'Vue3-carousel',
      dark: './vue3-carousel-logo-dark.svg',
      light: './vue3-carousel-logo-light.svg',
    },

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
        text: 'Components',
        items: [
          { text: 'Slide', link: '/components/slide' },
          { text: 'Navigation', link: '/components/navigation' },
          { text: 'Pagination', link: '/components/pagination' },
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

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Abdelrahman Ismail',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // Add social sharing image meta tags
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vue3-carousel.ismail9k.com/social-image.png',
      },
    ],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vue3-carousel.ismail9k.com/social-image.png',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
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
