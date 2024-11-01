import { defineComponent, inject, ref, h, reactive } from 'vue'

import { defaultConfig } from '@/partials/defaults'
import { i18nFormatter } from '@/utils/i18nFormater'

import { CarouselConfig } from '../types'

export default defineComponent({
  name: 'ARIA',
  setup() {
    const config: CarouselConfig = inject('config', reactive({ ...defaultConfig }))
    const currentSlide = inject('currentSlide', ref(0))
    const slidesCount = inject('slidesCount', ref(0))

    return () =>
      h(
        'div',
        {
          class: ['carousel__liveregion', 'carousel__sr-only'],
          'aria-live': 'polite',
          'aria-atomic': 'true',
        },
        i18nFormatter(config.i18n['itemXofY'], {
          currentSlide: currentSlide.value + 1,
          slidesCount: slidesCount.value,
        })
      )
  },
})
