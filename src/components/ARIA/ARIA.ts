import { defineComponent, h, inject } from 'vue'

import { DEFAULT_CLASS_PREFIX, injectCarousel } from '@/shared'
import { i18nFormatter } from '@/utils'

export const ARIA = defineComponent({
  name: 'CarouselAria',
  setup() {
    const carousel = inject(injectCarousel)

    if (!carousel) {
      return () => ''
    }

    return () => {
      const prefix = carousel.config.classPrefix || DEFAULT_CLASS_PREFIX

      return h(
        'div',
        {
          class: [`${prefix}__liveregion`, `${prefix}__sr-only`],
          'aria-live': 'polite',
          'aria-atomic': 'true',
        },
        i18nFormatter(carousel.config.i18n['itemXofY'], {
          currentSlide: carousel.currentSlide + 1,
          slidesCount: carousel.slidesCount,
        })
      )
    }
  },
})
