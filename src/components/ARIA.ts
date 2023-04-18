import { defineComponent, inject, ref, h, reactive } from 'vue'
import { CarouselConfig } from '../types'
import { defaultConfigs } from '@/partials/defaults'

export default defineComponent({
  name: 'ARIA',
  setup() {
    const config: CarouselConfig = inject('config', reactive({ ...defaultConfigs }))
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
        config.labels?.itemXofY
          ?.replace('${0}', (currentSlide.value + 1).toString())
          .replace('${1}', (slidesCount.value).toString())
      )
  },
})
